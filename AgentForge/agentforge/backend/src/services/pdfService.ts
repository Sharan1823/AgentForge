import { jsPDF } from 'jspdf';
import { logger } from '../logger';

export interface AgentOutput {
  agentName: string;
  department: string;
  timestamp: Date;
  summary: string;
  results: any[];
  steps: Array<{
    stepNumber: number;
    action: string;
    tool: string;
    description: string;
    outcome?: any;
    timestamp: Date;
  }>;
  metadata?: {
    runId?: string;
    userId?: string;
    duration?: number;
    success?: boolean;
  };
}

export interface PaymentRecord {
  invoiceId: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  dueDate: string;
  status: string;
  daysOverdue: number;
}

// ─── Parse payment records from RAG context CSV text ─────────────────────────
export function parsePaymentsFromText(text: string): {
  overduePayments: PaymentRecord[];
  pendingPayments: PaymentRecord[];
} {
  const overduePayments: PaymentRecord[] = [];
  const pendingPayments: PaymentRecord[] = [];

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  for (const line of lines) {
    if (
      line.toLowerCase().startsWith('invoice id') ||
      line.toLowerCase().startsWith('invoice,') ||
      line.startsWith('#') ||
      line.startsWith('---') ||
      line.startsWith('=')
    ) continue;

    const parts = line.split(',').map(p => p.trim());
    if (parts.length < 6) continue;

    const status = parts[5]?.toUpperCase().replace(/[^A-Z]/g, '');
    if (status !== 'OVERDUE' && status !== 'PENDING') continue;

    const record: PaymentRecord = {
      invoiceId: parts[0] || 'N/A',
      clientName: parts[1] || 'N/A',
      clientEmail: parts[2] || 'N/A',
      amount: parseFloat(parts[3]?.replace(/[^0-9.]/g, '') || '0'),
      dueDate: parts[4] || 'N/A',
      status,
      daysOverdue: parseInt(parts[6]?.replace(/[^0-9]/g, '') || '0'),
    };

    if (status === 'OVERDUE') overduePayments.push(record);
    else pendingPayments.push(record);
  }

  return { overduePayments, pendingPayments };
}

export class PDFService {

  // ─── PAYMENT REPORT — Overdue + Pending sections ─────────────────────────
  static generatePaymentReportPDF(
    overduePayments: PaymentRecord[],
    pendingPayments: PaymentRecord[],
    agentName: string = 'Payment Status Report'
  ): Buffer {
    try {
      const doc = new jsPDF();
      const totalOverdue = overduePayments.reduce((s, p) => s + p.amount, 0);
      const totalPending = pendingPayments.reduce((s, p) => s + p.amount, 0);
      const grandTotal = totalOverdue + totalPending;
      const now = new Date();

      // Dark header bar
      doc.setFillColor(26, 26, 46);
      doc.rect(0, 0, 210, 45, 'F');
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('Payment Status Report', 15, 20);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(180, 180, 200);
      doc.text(`Finance Department  |  Generated: ${now.toLocaleString()}`, 15, 32);
      doc.text(`Agent: ${agentName}`, 15, 40);

      // Summary cards
      doc.setTextColor(30, 30, 50);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('Executive Summary', 15, 57);

      const drawCard = (x: number, y: number, w: number, h: number, label: string, value: string, r: number, g: number, b: number) => {
        doc.setFillColor(r, g, b);
        doc.roundedRect(x, y, w, h, 2, 2, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.text(label.toUpperCase(), x + 4, y + 9);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(value, x + 4, y + 20);
      };

      drawCard(15, 62, 42, 26, 'Overdue Count', `${overduePayments.length}`, 200, 50, 60);
      drawCard(60, 62, 55, 26, 'Overdue Amount', `Rs.${totalOverdue.toLocaleString('en-IN')}`, 180, 40, 50);
      drawCard(118, 62, 40, 26, 'Pending Count', `${pendingPayments.length}`, 50, 100, 180);
      drawCard(161, 62, 34, 26, 'Pending Amt', `Rs.${totalPending.toLocaleString('en-IN')}`, 40, 90, 160);

      // Grand total
      doc.setFillColor(26, 26, 46);
      doc.roundedRect(15, 92, 180, 12, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`GRAND TOTAL OUTSTANDING: Rs.${grandTotal.toLocaleString('en-IN')}`, 105, 100, { align: 'center' });

      // ── SECTION 1: OVERDUE ────────────────────────────────────────────────
      let y = 114;

      doc.setFillColor(200, 50, 60);
      doc.rect(15, y, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`SECTION 1 — OVERDUE PAYMENTS  (${overduePayments.length} invoices)`, 18, y + 5.5);
      y += 11;

      // Table header
      doc.setFillColor(50, 50, 80);
      doc.rect(15, y, 180, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.text('Invoice ID', 17, y + 5);
      doc.text('Client Name', 42, y + 5);
      doc.text('Email', 80, y + 5);
      doc.text('Amount (INR)', 118, y + 5);
      doc.text('Due Date', 148, y + 5);
      doc.text('Days OD', 174, y + 5);
      y += 9;

      const sortedOverdue = [...overduePayments].sort((a, b) => b.daysOverdue - a.daysOverdue);

      sortedOverdue.forEach((p, i) => {
        if (y > 265) { doc.addPage(); y = 20; }
        if (i % 2 === 0) {
          doc.setFillColor(255, 235, 238);
          doc.rect(15, y - 1, 180, 7, 'F');
        }
        doc.setTextColor(30, 30, 50);
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.text(p.invoiceId, 17, y + 4);
        doc.setFont('helvetica', 'normal');
        doc.text(p.clientName.substring(0, 20), 42, y + 4);
        doc.text(p.clientEmail.substring(0, 24), 80, y + 4);
        doc.setFont('helvetica', 'bold');
        doc.text(`Rs.${p.amount.toLocaleString('en-IN')}`, 118, y + 4);
        doc.setFont('helvetica', 'normal');
        doc.text(p.dueDate, 148, y + 4);
        doc.setTextColor(200, 40, 50);
        doc.setFont('helvetica', 'bold');
        doc.text(`${p.daysOverdue}d`, 174, y + 4);
        y += 7;
      });

      // Overdue total
      doc.setFillColor(200, 40, 50);
      doc.rect(15, y, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.text('TOTAL OVERDUE', 17, y + 5.5);
      doc.text(`Rs.${totalOverdue.toLocaleString('en-IN')}`, 118, y + 5.5);
      doc.text(`${overduePayments.length} invoices`, 165, y + 5.5);
      y += 16;

      // ── SECTION 2: PENDING ────────────────────────────────────────────────
      if (y > 230) { doc.addPage(); y = 20; }

      doc.setFillColor(50, 100, 180);
      doc.rect(15, y, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`SECTION 2 — PENDING PAYMENTS  (${pendingPayments.length} invoices)`, 18, y + 5.5);
      y += 11;

      doc.setFillColor(50, 50, 80);
      doc.rect(15, y, 180, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.text('Invoice ID', 17, y + 5);
      doc.text('Client Name', 42, y + 5);
      doc.text('Email', 80, y + 5);
      doc.text('Amount (INR)', 118, y + 5);
      doc.text('Due Date', 150, y + 5);
      doc.text('Status', 178, y + 5);
      y += 9;

      pendingPayments.forEach((p, i) => {
        if (y > 265) { doc.addPage(); y = 20; }
        if (i % 2 === 0) {
          doc.setFillColor(219, 234, 254);
          doc.rect(15, y - 1, 180, 7, 'F');
        }
        doc.setTextColor(30, 30, 50);
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.text(p.invoiceId, 17, y + 4);
        doc.setFont('helvetica', 'normal');
        doc.text(p.clientName.substring(0, 20), 42, y + 4);
        doc.text(p.clientEmail.substring(0, 24), 80, y + 4);
        doc.setFont('helvetica', 'bold');
        doc.text(`Rs.${p.amount.toLocaleString('en-IN')}`, 118, y + 4);
        doc.setFont('helvetica', 'normal');
        doc.text(p.dueDate, 150, y + 4);
        doc.setTextColor(40, 90, 160);
        doc.setFont('helvetica', 'bold');
        doc.text('PENDING', 178, y + 4);
        y += 7;
      });

      // Pending total
      doc.setFillColor(50, 100, 180);
      doc.rect(15, y, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.text('TOTAL PENDING', 17, y + 5.5);
      doc.text(`Rs.${totalPending.toLocaleString('en-IN')}`, 118, y + 5.5);
      doc.text(`${pendingPayments.length} invoices`, 165, y + 5.5);
      y += 16;

      // Grand total summary
      if (y > 255) { doc.addPage(); y = 20; }
      doc.setFillColor(26, 26, 46);
      doc.rect(15, y, 180, 16, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('GRAND TOTAL OUTSTANDING', 17, y + 7);
      doc.text(`Rs.${grandTotal.toLocaleString('en-IN')}`, 17, y + 13);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(180, 180, 200);
      doc.text(`${overduePayments.length + pendingPayments.length} total invoices`, 140, y + 10);

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setDrawColor(150, 150, 150);
        doc.line(15, 280, 195, 280);
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, 105, 287, { align: 'center' });
        doc.text(`Generated by AgentForge Finance Agent  |  ${now.toLocaleDateString()}`, 105, 292, { align: 'center' });
      }

      return Buffer.from(doc.output('arraybuffer'));
    } catch (error) {
      logger.error('payment_pdf_failed', { error: error instanceof Error ? error.message : String(error) });
      throw error;
    }
  }

  // ─── FINANCIAL SUMMARY REPORT ─────────────────────────────────────────────
  static generateFinancialSummaryPDF(
    analysisText: string,
    agentName: string = 'Financial Summary',
    rawData: string = ''
  ): Buffer {
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = 20;

      // Header
      doc.setFillColor(26, 32, 53);
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(`${agentName} — Financial Summary`, margin, 22);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, margin, 34);
      y = 55;

      // Parse sections from analysisText by CAPS headers
      const sectionHeaders = [
        'EXECUTIVE SUMMARY', 'KEY METRICS', 'REVENUE ANALYSIS',
        'EXPENSE ANALYSIS', 'PROFIT AND LOSS SUMMARY', 'BALANCE SHEET HIGHLIGHTS',
        'CASH FLOW SUMMARY', 'KEY FINANCIAL INSIGHTS', 'RECOMMENDATIONS',
      ];

      // Split text into labelled sections
      const parsedSections: Array<{ title: string; content: string }> = [];

      for (let i = 0; i < sectionHeaders.length; i++) {
        const header = sectionHeaders[i];
        if (!header) continue;
        const startIdx = analysisText.indexOf(header);
        if (startIdx === -1) continue;
        const contentStart = startIdx + header.length;
        // Find next header
        let contentEnd = analysisText.length;
        for (let j = i + 1; j < sectionHeaders.length; j++) {
          const nextIdx = analysisText.indexOf(sectionHeaders[j] || '');
          if (nextIdx > startIdx) { contentEnd = nextIdx; break; }
        }
        const content = analysisText.substring(contentStart, contentEnd).replace(/^\s*\n/, '').trim();
        if (content) parsedSections.push({ title: header || 'Unknown', content });
      }

      // If no sections parsed, dump whole text
      if (parsedSections.length === 0) {
        parsedSections.push({ title: 'FINANCIAL ANALYSIS', content: analysisText });
      }

      // Write each section
      for (const section of parsedSections) {
        if (y > pageHeight - 40) { doc.addPage(); y = 20; }

        // Section heading
        doc.setFillColor(44, 52, 80);
        doc.rect(margin, y, contentWidth, 9, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(section.title, margin + 3, y + 6.5);
        y += 14;

        // Content
        doc.setTextColor(30, 30, 30);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(section.content, contentWidth);
        for (const line of lines) {
          if (y > pageHeight - 20) { doc.addPage(); y = 20; }
          doc.text(line, margin, y);
          y += 6;
        }
        y += 8;
      }

      // Footer
      const totalPages = (doc.internal as any).getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFillColor(240, 240, 245);
        doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');
        doc.setTextColor(120, 120, 140);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(`AgentForge — Financial Report`, margin, pageHeight - 4);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 4, { align: 'right' });
      }

      return Buffer.from(doc.output('arraybuffer'));
    } catch (error) {
      logger.error('financial_summary_pdf_failed', { error: error instanceof Error ? error.message : String(error) });
      throw error;
    }
  }

  // ─── GENERIC AGENT REPORT ─────────────────────────────────────────────────
  static generateAgentReportPDF(agentOutput: AgentOutput): Buffer {
    try {
      const doc = new jsPDF();
      const now = agentOutput.timestamp;

      doc.setFillColor(26, 26, 46);
      doc.rect(0, 0, 210, 45, 'F');
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(agentOutput.agentName, 15, 20);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(180, 180, 200);
      doc.text(`${agentOutput.department} Department  |  Generated: ${now.toLocaleString()}`, 15, 32);

      let y = 55;

      // Summary
      doc.setFillColor(50, 50, 80);
      doc.rect(15, y, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('EXECUTIVE SUMMARY', 18, y + 5.5);
      y += 12;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 80);
      const summaryLines = doc.splitTextToSize(agentOutput.summary, 175);
      for (const line of summaryLines) {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(line, 15, y);
        y += 5.5;
      }
      y += 8;

      // Steps
      doc.setFillColor(50, 50, 80);
      doc.rect(15, y, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('EXECUTION STEPS', 18, y + 5.5);
      y += 12;

      agentOutput.steps.forEach((step) => {
        if (y > 255) { doc.addPage(); y = 20; }

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(69, 123, 157);
        doc.text(`Step ${step.stepNumber}: ${step.action} (${step.tool})`, 15, y);
        y += 6;

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 80);
        const descLines = doc.splitTextToSize(step.description, 175);
        for (const line of descLines) {
          if (y > 270) { doc.addPage(); y = 20; }
          doc.text(line, 18, y);
          y += 5;
        }
        y += 4;
      });

      // Metadata
      if (agentOutput.metadata) {
        if (y > 240) { doc.addPage(); y = 20; }
        doc.setFillColor(50, 50, 80);
        doc.rect(15, y, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('METADATA', 18, y + 5.5);
        y += 12;

        const meta = [
          `Run ID: ${agentOutput.metadata.runId || 'N/A'}`,
          `Duration: ${agentOutput.metadata.duration ? Math.round(agentOutput.metadata.duration / 1000) + 's' : 'N/A'}`,
          `Status: ${agentOutput.metadata.success ? 'Success' : 'Failed'}`,
        ];
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 80);
        for (const m of meta) {
          doc.text(m, 18, y);
          y += 6;
        }
      }

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setDrawColor(150, 150, 150);
        doc.line(15, 280, 195, 280);
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, 105, 287, { align: 'center' });
        doc.text(`Generated by AgentForge  |  ${now.toLocaleDateString()}`, 105, 292, { align: 'center' });
      }

      return Buffer.from(doc.output('arraybuffer'));
    } catch (error) {
      logger.error('pdf_generation_failed', { error: error instanceof Error ? error.message : String(error) });
      throw error;
    }
  }

  // ─── CUSTOM REPORT ────────────────────────────────────────────────────────
  static generateCustomReportPDF(
    title: string,
    sections: Array<{ title: string; content: string; type?: string }>,
    metadata?: Record<string, string>
  ): Buffer {
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = 20;

      // ── Header bar ──────────────────────────────────────────────────────────
      doc.setFillColor(26, 32, 53);
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin, 25);
      
      if (metadata) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const metaStr = Object.entries(metadata).map(([k, v]) => `${k}: ${v}`).join('  |  ');
        doc.text(metaStr, margin, 35);
      }

      y = 55;

      // ── Sections ─────────────────────────────────────────────────────────────
      for (const section of sections) {
        // Check page space
        if (y > pageHeight - 40) {
          doc.addPage();
          y = 20;
        }

        // Section heading bar
        doc.setFillColor(44, 52, 80);
        doc.rect(margin, y, contentWidth, 9, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(section.title, margin + 3, y + 6.5);
        y += 14;

        // Section content text
        doc.setTextColor(30, 30, 30);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        const content = section.content || 'No content available';

        // Split long text into lines that fit page width
        const lines = doc.splitTextToSize(content, contentWidth);

        for (const line of lines) {
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, margin, y);
          y += 6;
        }

        y += 8; // gap between sections
      }

      // ── Footer ────────────────────────────────────────────────────────────────
      const totalPages = (doc.internal as any).getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFillColor(240, 240, 245);
        doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');
        doc.setTextColor(120, 120, 140);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(`AgentForge — Generated ${new Date().toLocaleString('en-IN')}`, margin, pageHeight - 4);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 4, { align: 'right' });
      }

      return Buffer.from(doc.output('arraybuffer'));
    } catch (error) {
      logger.error('custom_pdf_failed', { error: error instanceof Error ? error.message : String(error) });
      throw error;
    }
  }

  // ─── DEPARTMENT REPORT ────────────────────────────────────────────────────
  static generateDepartmentReportPDF(reports: AgentOutput[], department: string): Buffer {
    const summary: AgentOutput = {
      agentName: `${department} Department Report`,
      department,
      timestamp: new Date(),
      summary: `Department report covering ${reports.length} agents. Generated on ${new Date().toLocaleString()}.`,
      results: reports.map(r => ({ name: r.agentName, success: r.metadata?.success })),
      steps: [],
      metadata: { success: true },
    };
    return this.generateAgentReportPDF(summary);
  }
}