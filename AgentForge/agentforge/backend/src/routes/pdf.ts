import { Router } from 'express';
import { auth } from '../middleware/auth';
import { logger } from '../logger';
import { PDFService, type AgentOutput } from '../services/pdfService';
import { prisma } from '../db/prisma';
import path from 'path';
import fs from 'fs';

const router = Router();

// ─── DOWNLOAD GENERATED FILE (PDF or JSON) ────────────────────────────────────
router.get('/download/:filename', auth, (req, res) => {
  try {
    const filename = req.params.filename;

    // Security — prevent path traversal
    const safeName = path.basename(filename);
    const filePath = path.join(__dirname, '../../uploads/reports', safeName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const ext = path.extname(safeName).toLowerCase();

    if (ext === '.json') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${safeName}"`);
    } else if (ext === '.pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${safeName}"`);
    } else {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${safeName}"`);
    }

    logger.info('file_download', { filename: safeName, userId: (req as any).user?.id });
    fs.createReadStream(filePath).pipe(res);

  } catch (error) {
    logger.error('file_download_error', { error: error instanceof Error ? error.message : String(error) });
    res.status(500).json({ error: 'Failed to download file' });
  }
});

// ─── GENERATE PDF FOR SPECIFIC AGENT RUN ─────────────────────────────────────
router.post('/agent/:runId', auth, async (req, res) => {
  try {
    const { runId } = req.params;
    const user = (req as any).user;

    const run = await prisma.agentRun.findUnique({
      where: { id: runId },
      include: { agent: true },
    }) as any;

    if (!run) return res.status(404).json({ error: 'Agent run not found' });
    if (run.agent?.companyId !== user.companyId && user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const logs = Array.isArray(run.logs) ? run.logs : [];

    const collectStrings = (value: unknown, out: string[], depth: number = 0) => {
      if (depth > 4) return;
      if (typeof value === 'string') {
        const s = value.trim();
        if (s.length > 0) out.push(s);
        return;
      }
      if (!value || typeof value !== 'object') return;
      if (Array.isArray(value)) {
        for (const v of value) collectStrings(v, out, depth + 1);
        return;
      }
      for (const v of Object.values(value as Record<string, unknown>)) {
        collectStrings(v, out, depth + 1);
      }
    };

    const aiTextParts: string[] = [];
    for (const log of logs) {
      const data: any = log?.data;

      const preferredCandidates: unknown[] = [
        data?.content,
        data?.summaryContent,
        data?.analysisText,
        data?.captions,
        data?.outcome?.content,
      ];

      const preferred = preferredCandidates.find((c) => typeof c === 'string' && c.trim().length > 0) as string | undefined;
      if (preferred) {
        aiTextParts.push(preferred.trim());
        continue;
      }

      const allStrings: string[] = [];
      collectStrings(data, allStrings);

      const filtered = allStrings.filter((s) => {
        const lower = s.toLowerCase();
        if (lower.startsWith('http://') || lower.startsWith('https://')) return false;
        if (lower.includes('downloadurl')) return false;
        if (lower.endsWith('.pdf') || lower.endsWith('.json')) return false;
        if (lower.includes('completed ') && lower.includes(' steps successfully')) return false;
        return s.trim().length >= 20;
      });

      if (filtered.length > 0) {
        const first = filtered[0];
        if (first) aiTextParts.push(first.trim());
      }
    }

    const aiText = [...new Set(aiTextParts)].join('\n\n---\n\n').trim();
    logger.info('agent_pdf_ai_extraction', {
      runId,
      agentId: run.agent?.id,
      userId: user.id,
      logsCount: logs.length,
      aiParts: aiTextParts.length,
      aiLength: aiText.length,
    });

    if (aiText.length > 0) {
      const pdfBuffer = PDFService.generateCustomReportPDF(
        `${run.agent?.name || 'Agent'} — AI Output`,
        [{ title: 'EXECUTIVE SUMMARY', content: aiText, type: 'text' }]
      );

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${(run.agent?.name || 'agent').replace(/[^a-z0-9]/gi, '_')}_ai_output_${new Date().toISOString().split('T')[0]}.pdf"`
      );
      res.setHeader('Content-Length', pdfBuffer.length);

      logger.info('agent_pdf_generated', { runId, agentId: run.agent?.id, userId: user.id, mode: 'ai_content' });
      return res.send(pdfBuffer);
    }

    const agentOutput: AgentOutput = {
      agentName: run.agent?.name || 'Unknown Agent',
      department: run.agent?.department || 'SUPPORT',
      timestamp: run.startedAt,
      summary: run.output || 'No summary available',
      results: logs.filter((log: any) => log.data?.outcome) || [],
      steps: logs.map((log: any, index: number) => ({
        stepNumber: log.stepNumber || index + 1,
        action: log.action || 'Unknown',
        tool: log.tool || 'Unknown',
        description: log.message || 'No description',
        outcome: log.data?.outcome,
        timestamp: new Date(log.timestamp),
      })),
      metadata: {
        runId: run.id,
        userId: user.id,
        duration: run.endedAt ? run.endedAt.getTime() - run.startedAt.getTime() : 0,
        success: run.status === 'SUCCESS',
      },
    };

    const pdfBuffer = PDFService.generateAgentReportPDF(agentOutput);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${(run.agent?.name || 'agent').replace(/[^a-z0-9]/gi, '_')}_report_${new Date().toISOString().split('T')[0]}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    logger.info('agent_pdf_generated', { runId, agentId: run.agent?.id, userId: user.id });
    res.send(pdfBuffer);

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    logger.error('agent_pdf_error', { error: errMsg, runId: req.params.runId });
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// ─── GENERATE DEPARTMENT REPORT ───────────────────────────────────────────────
router.post('/department/:department', auth, async (req, res) => {
  try {
    const { department } = req.params;
    const { startDate, endDate } = req.body;
    const user = (req as any).user;

    const validDepts = ['SALES', 'HR', 'MARKETING', 'FINANCE', 'SUPPORT'];
    if (!validDepts.includes(department.toUpperCase())) {
      return res.status(400).json({ error: 'Invalid department' });
    }

    const whereClause: any = {
      agent: { companyId: user.companyId, department: department.toUpperCase() },
    };
    if (startDate || endDate) {
      whereClause.startedAt = {};
      if (startDate) whereClause.startedAt.gte = new Date(startDate);
      if (endDate) whereClause.startedAt.lte = new Date(endDate);
    }

    const runs = await prisma.agentRun.findMany({
      where: whereClause,
      include: { agent: true },
      orderBy: { startedAt: 'desc' },
      take: 100,
    }) as any[];

    const agentOutputs: AgentOutput[] = runs.map(run => ({
      agentName: run.agent?.name || 'Unknown Agent',
      department: run.agent?.department || 'SUPPORT',
      timestamp: run.startedAt,
      summary: run.output || 'No summary available',
      results: [],
      steps: Array.isArray(run.logs) ? run.logs.map((log: any, i: number) => ({
        stepNumber: log.stepNumber || i + 1,
        action: log.action || 'Unknown',
        tool: log.tool || 'Unknown',
        description: log.message || 'No description',
        outcome: log.data?.outcome,
        timestamp: new Date(log.timestamp),
      })) : [],
      metadata: {
        runId: run.id,
        userId: user.id,
        duration: run.endedAt ? run.endedAt.getTime() - run.startedAt.getTime() : 0,
        success: run.status === 'SUCCESS',
      },
    }));

    const pdfBuffer = PDFService.generateDepartmentReportPDF(agentOutputs, department);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${department.toLowerCase()}_report_${new Date().toISOString().split('T')[0]}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    logger.info('department_pdf_generated', { department, runCount: runs.length, userId: user.id });
    res.send(pdfBuffer);

  } catch (error) {
    logger.error('department_pdf_error', { error: error instanceof Error ? error.message : String(error) });
    res.status(500).json({ error: 'Failed to generate department PDF' });
  }
});

// ─── GENERATE CUSTOM PDF ──────────────────────────────────────────────────────
router.post('/custom', auth, async (req, res) => {
  try {
    const { title, content, metadata } = req.body;
    const user = (req as any).user;

    if (!title || !content || !Array.isArray(content)) {
      return res.status(400).json({ error: 'Title and content array are required' });
    }

    const pdfBuffer = PDFService.generateCustomReportPDF(title, content, {
      ...metadata,
      userId: user.id,
      generatedAt: new Date().toISOString(),
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${title.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    logger.info('custom_pdf_generated', { title, userId: user.id });
    res.send(pdfBuffer);

  } catch (error) {
    logger.error('custom_pdf_error', { error: error instanceof Error ? error.message : String(error) });
    res.status(500).json({ error: 'Failed to generate custom PDF' });
  }
});

// ─── LIST GENERATED REPORTS ───────────────────────────────────────────────────
router.get('/reports', auth, (req, res) => {
  try {
    const reportsDir = path.join(__dirname, '../../uploads/reports');
    if (!fs.existsSync(reportsDir)) return res.json({ reports: [] });

    const files = fs.readdirSync(reportsDir).map(filename => {
      const filePath = path.join(reportsDir, filename);
      const stats = fs.statSync(filePath);
      const port = process.env.PORT || 4000;
      return {
        filename,
        size: `${Math.round(stats.size / 1024)}KB`,
        createdAt: stats.birthtime.toISOString(),
        downloadUrl: `http://localhost:${port}/api/pdf/download/${filename}`,
        type: path.extname(filename).toLowerCase() === '.json' ? 'JSON' : 'PDF',
      };
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({ reports: files });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list reports' });
  }
});

// ─── PDF TEMPLATES ────────────────────────────────────────────────────────────
router.get('/templates', auth, (req, res) => {
  res.json({
    templates: [
      { id: 'agent_report', name: 'Agent Execution Report', endpoint: '/api/pdf/agent/{runId}' },
      { id: 'department_summary', name: 'Department Summary', endpoint: '/api/pdf/department/{department}' },
      { id: 'custom_report', name: 'Custom Report', endpoint: '/api/pdf/custom' },
    ],
  });
});

export default router;