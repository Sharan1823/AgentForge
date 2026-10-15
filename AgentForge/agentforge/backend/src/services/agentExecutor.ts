import { RunStatus } from "../../generated/prisma-client";
import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { AgentDefinitionSchema, type AgentRunLogEntry } from "@agentforge/shared";
import { envOptional } from "../env";
import { prisma } from "../db/prisma";
import { logger } from "../logger";
import { loadMemory, saveMemory } from "./memoryService";
import { checkGuardrail, waitForApproval } from "./guardrailService";
import { query as queryRag } from "./ragService";
import { assertToolAllowedForUser } from "../middleware/rbac";
import { sendEmail } from "./emailService";
import { PDFService, parsePaymentsFromText } from "./pdfService";
import { linkedinService } from "./linkedinService";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function nowIso() {
  return new Date().toISOString();
}

function extractAllEmailsFromText(text: string): string[] {
  const emails: string[] = [];
  const standardRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const standardMatches = text.match(standardRegex) || [];
  emails.push(...standardMatches);
  const markdownRegex = /\[([^\]]+@[^\]]+)\]\(mailto:([^)]+)\)/g;
  let match;
  while ((match = markdownRegex.exec(text)) !== null) {
    emails.push(match[1].trim());
    emails.push(match[2].trim());
  }
  const mailtoRegex = /mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  while ((match = mailtoRegex.exec(text)) !== null) {
    emails.push(match[1].trim());
  }
  return [...new Set(emails)].filter(
    (email) =>
      email.includes("@") &&
      !email.includes("agentforge") &&
      !email.includes("noreply") &&
      !email.includes("no-reply") &&
      !email.includes("messageId") &&
      !email.includes("example.com")
  );
}

function needsPDFGeneration(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("pdf") ||
    lower.includes("report") ||
    lower.includes("overdue") ||
    lower.includes("payment") ||
    lower.includes("financial") ||
    lower.includes("statement") ||
    lower.includes("invoice")
  );
}

function needsSchedulePost(agent: any, text: string): boolean {
  const lower = text.toLowerCase();
  return (
    agent.department === "MARKETING" &&
    (
      lower.includes("schedule") ||
      lower.includes("post") ||
      lower.includes("publish") ||
      lower.includes("social media") ||
      lower.includes("instagram") ||
      lower.includes("facebook") ||
      lower.includes("twitter") ||
      lower.includes("linkedin")
    )
  );
}

function needsImageCaption(agent: any, text: string): boolean {
  const lower = text.toLowerCase();
  return (
    agent.department === "MARKETING" &&
    (
      lower.includes("caption") ||
      lower.includes("image")
    )
  );
}

function getStepTitle(action: string, department: string): string {
  const titles: Record<string, string> = {
    SUMMARISE: "Summary",
    CLASSIFY: "Classification Results",
    DRAFT: "Drafted Content",
    REPLY_TICKET: "Ticket Reply",
    ESCALATE: "Escalation Report",
    SEND_EMAIL: "Email Content",
    READ_EMAIL: "Email Analysis",
    UPDATE_CRM: "CRM Update Summary",
    POST_SLACK: "Slack Message",
    READ_SHEET: "Spreadsheet Analysis",
    WRITE_SHEET: "Data Written",
    SEARCH_WEB: "Search Results",
    READ_TICKETS: "Ticket Summary",
  };
  return titles[action] || `${department} Agent Output`;
}

function extractSection(text: string, section: string): string {
  const sections = ["INSTAGRAM", "LINKEDIN", "TWITTER", "FACEBOOK", "ADVERTISEMENT"];
  const idx = sections.indexOf(section);
  const start = text.indexOf(section + ":");
  if (start === -1) return "Not available";
  const nextSection = sections.slice(idx + 1).find(s => text.indexOf(s + ":") > start);
  const end = nextSection ? text.indexOf(nextSection + ":") : text.length;
  return text.substring(start + section.length + 1, end).trim();
}

function getOptimalPostTime(platform: string): Date {
  const hours: Record<string, number> = {
    INSTAGRAM: 9, FACEBOOK: 9, LINKEDIN: 8, TWITTER: 12, TIKTOK: 19,
  };
  const d = new Date();
  d.setHours(hours[platform.toUpperCase()] || 9, 0, 0, 0);
  if (d < new Date()) d.setDate(d.getDate() + 1);
  return d;
}

function parsePostsFromText(text: string): any[] {
  const posts: any[] = [];
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  for (const line of lines) {
    if (line.toLowerCase().startsWith("platform") || line.startsWith("#") || line.startsWith("---")) continue;
    const parts = line.split(",").map(p => p.trim());
    if (parts.length >= 4) {
      posts.push({
        platform: parts[0]?.toUpperCase() || "INSTAGRAM",
        topic: parts[1] || "",
        content: parts[2] || "",
        scheduledTime: parts[3] || "",
        status: parts[4]?.toUpperCase() || "PENDING",
      });
    }
  }
  return posts;
}

function getReportsDir(): string {
  try {
    return path.join(__dirname, "../../uploads/reports");
  } catch {
    return path.join(process.cwd(), "uploads/reports");
  }
}

function getUploadsDir(): string {
  try {
    return path.join(__dirname, "../../uploads");
  } catch {
    return path.join(process.cwd(), "uploads");
  }
}

async function appendLog(runId: string, entry: AgentRunLogEntry) {
  try {
    await prisma.agentRun.update({
      where: { id: runId },
      data: { logs: { push: entry } },
    });
  } catch (error) {
    logger.error("append_log_failed", { runId, error, entry });
  }
}

async function generateAiReply(
  model: ChatOllama,
  options: {
    candidateEmail: string;
    emailSubject?: string;
    emailBody?: string;
    agentDescription: string;
    ragContext: string[];
  }
): Promise<string> {
  const hasEmailContent = options.emailBody || options.emailSubject;
  const prompt = hasEmailContent
    ? `You are a professional assistant. A person has sent the following email and you need to reply.

From: ${options.candidateEmail}
Subject: ${options.emailSubject || "No subject"}
Email Content: ${options.emailBody || "No content"}

Context:
${options.ragContext.join("\n")}

Write a professional, helpful, and natural reply.
- Address exactly what they asked
- Be warm and professional
- Sign off as "Team"
- Write ONLY the email body text — no headers`
    : `You are a professional assistant. Write a professional email.

To: ${options.candidateEmail}
Task: ${options.agentDescription}

Context:
${options.ragContext.join("\n")}

Write a professional and natural email. Sign off as "Team". Write ONLY the body text.`;

  const response = await model.invoke(prompt);
  let content = typeof response.content === "string" ? response.content : JSON.stringify(response.content);

  try {
    const parsed = JSON.parse(content);
    content = parsed.reply || parsed.body || parsed.content || parsed.text || content;
  } catch {}

  return content
    .replace(/^(Subject|From|To|CC|BCC):.+\n/gim, "")
    .replace(/^Re:.+\n/gim, "")
    .trim();
}

async function generateAndSavePDF(
  runId: string,
  stepNumber: number,
  agent: any,
  ragContext: string[],
  model: ChatOllama,
  definition: any
): Promise<{ downloadUrl: string; filename: string } | null> {
  try {
    const ragText = ragContext.join("\n");
    const reportsDir = getReportsDir();
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

    const filename = `report_${Date.now()}.pdf`;
    const outputPath = path.join(reportsDir, filename);
    const port = process.env.PORT || 8080;
    const downloadUrl = `http://localhost:${port}/api/pdf/download/${filename}`;

    let pdfBuffer: Buffer | null = null;

    const { overduePayments, pendingPayments } = parsePaymentsFromText(ragText);

    // Debug: Log what we found in RAG data
    await appendLog(runId, {
      timestamp: nowIso(),
      stepNumber,
      message: "RAG Data Analysis",
      data: { 
        ragLength: ragText.length,
        overdueCount: overduePayments.length,
        pendingCount: pendingPayments.length,
        hasPaymentData: overduePayments.length > 0 || pendingPayments.length > 0,
        ragPreview: ragText.substring(0, 300) + (ragText.length > 300 ? "..." : "")
      }
    });

    if (overduePayments.length > 0 || pendingPayments.length > 0) {
      await appendLog(runId, {
        timestamp: nowIso(),
        stepNumber,
        message: `Generating payment report PDF`,
        data: { overdueCount: overduePayments.length, pendingCount: pendingPayments.length },
      });

      const paymentSummaryPrompt = `You are a senior finance analyst. Write an EXECUTIVE SUMMARY for the following payment status data.

CONTEXT (raw data):
${ragText}

COUNTS:
- Overdue invoices: ${overduePayments.length}
- Pending invoices: ${pendingPayments.length}

TASK:
- Summarize what this means for cash flow and risk
- Highlight the most urgent items
- Provide 3 concrete next steps to improve collections

Write the output as plain text (no JSON).`;

      const paymentSummaryResp = await model.invoke(paymentSummaryPrompt);
      const paymentSummaryText = typeof (paymentSummaryResp as any).content === "string"
        ? String((paymentSummaryResp as any).content).trim()
        : JSON.stringify((paymentSummaryResp as any).content);

      await appendLog(runId, {
        timestamp: nowIso(),
        stepNumber,
        message: "AI Payment Summary Generated",
        data: {
          content: paymentSummaryText,
          contentLength: paymentSummaryText.length,
        },
      });

      // Generate a PDF that contains the AI executive summary text.
      // This ensures the downloadable Agent Run PDF can extract real AI content.
      pdfBuffer = PDFService.generateCustomReportPDF(
        `Payment Summary — ${agent.name}`,
        [{ title: "EXECUTIVE SUMMARY", content: paymentSummaryText, type: "text" }],
        {
          Agent: agent.name,
          Department: agent.department,
          Generated: new Date().toLocaleString("en-IN"),
        }
      );
    } else {
      await appendLog(runId, {
        timestamp: nowIso(),
        stepNumber,
        message: `Analyzing financial data with Ollama...`,
        data: { ragLength: ragText.length },
      });

      const analysisPrompt = `You are a senior financial analyst. Analyze this financial data and write a comprehensive summary.

FINANCIAL DATA:
${ragText}

TASK: ${definition.summary || agent.description}

Write a comprehensive financial summary report using these exact CAPS section headers:

EXECUTIVE SUMMARY
KEY METRICS
REVENUE ANALYSIS
EXPENSE ANALYSIS
PROFIT AND LOSS SUMMARY
BALANCE SHEET HIGHLIGHTS
CASH FLOW SUMMARY
KEY FINANCIAL INSIGHTS
RECOMMENDATIONS

IMPORTANT: 
- Use actual numbers from the data above
- Do not make up numbers
- If no financial data found, say "No financial data available"
- Be specific and detailed
- Write at least 2-3 sentences per section

Format your response exactly like this:

EXECUTIVE SUMMARY
[Your analysis here...]

KEY METRICS
[Metrics here...]

REVENUE ANALYSIS
[Revenue analysis here...]

And so on for all sections.`;

      const aiResponse = await model.invoke(analysisPrompt);
      const analysisText = typeof aiResponse.content === "string"
        ? aiResponse.content
        : JSON.stringify(aiResponse.content);

      // Debug: Log AI content being generated
      await appendLog(runId, {
        timestamp: nowIso(),
        stepNumber,
        message: "AI Analysis Generated",
        data: { 
          contentLength: analysisText.length,
          contentPreview: analysisText.substring(0, 200) + (analysisText.length > 200 ? "..." : ""),
          hasContent: analysisText.trim().length > 0
        }
      });

      await appendLog(runId, {
        timestamp: nowIso(),
        stepNumber,
        message: "Financial analysis completed by Ollama",
        data: { preview: analysisText.substring(0, 200) },
      });

      pdfBuffer = PDFService.generateFinancialSummaryPDF(analysisText, agent.name, ragText);
    }

    if (pdfBuffer) {
      fs.writeFileSync(outputPath, pdfBuffer);
      logger.info("pdf_saved", { outputPath, size: pdfBuffer.length });
      return { downloadUrl, filename };
    }
    return null;
  } catch (error) {
    logger.error("pdf_generation_error", { error: error instanceof Error ? error.message : String(error) });
    return null;
  }
}

async function generateImageCaptions(
  imagePath: string,
  agentDescription: string,
  ragContext: string[]
): Promise<string> {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");
    const ollamaUrl = envOptional("OLLAMA_BASE_URL") || "http://localhost:11434";
    const visionModel = envOptional("OLLAMA_VISION_MODEL") || "llava";

    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: visionModel,
        prompt: `You are a social media marketing expert. Analyze this image and generate 5 unique captions:

INSTAGRAM:
[Creative caption with 5-8 hashtags]

LINKEDIN:
[Professional business caption]

TWITTER:
[Under 280 chars with 2-3 hashtags]

FACEBOOK:
[Conversational engaging caption]

ADVERTISEMENT:
[Compelling ad copy with call to action]

Context: ${agentDescription}
${ragContext.length > 0 ? `Brand context: ${ragContext.join("\n")}` : ""}`,
        images: [base64Image],
        stream: false,
      }),
    });

    const data = await response.json() as { response: string };
    return data.response || "Could not generate captions";
  } catch (error) {
    logger.error("image_caption_failed", { error: error instanceof Error ? error.message : String(error) });
    return "Failed to generate captions";
  }
}

async function schedulePostsFromRag(
  runId: string,
  stepNumber: number,
  agent: any,
  ragContext: string[],
  model: ChatOllama,
  definition: any
): Promise<any> {
  const ragText = ragContext.join("\n");
  const rawPosts = parsePostsFromText(ragText);

  if (rawPosts.length === 0) {
    return { skipped: true, reason: "No posts found in knowledge base CSV" };
  }

  await appendLog(runId, {
    timestamp: nowIso(),
    stepNumber,
    message: `Found ${rawPosts.length} posts to schedule`,
    data: { postCount: rawPosts.length },
  });

  const scheduledPosts: any[] = [];

  for (const post of rawPosts) {
    const captionPrompt = `You are a social media expert.

Platform: ${post.platform}
Topic: ${post.topic}
Original content: ${post.content}
${ragContext.length > 0 ? `Brand context: ${ragContext.join("\n")}` : ""}

Write an optimized ${post.platform} post caption.
- Instagram: visual, emotional, 5-8 hashtags
- LinkedIn: professional, insightful, no hashtags
- Twitter: punchy, under 280 chars, 2-3 hashtags
- Facebook: conversational, engaging
Return ONLY the caption text.`;

    const captionResponse = await model.invoke(captionPrompt);
    const caption = typeof captionResponse.content === "string"
      ? captionResponse.content.trim()
      : JSON.stringify(captionResponse.content);

    let scheduledTime: Date;
    if (post.scheduledTime && post.scheduledTime.trim()) {
      scheduledTime = new Date(post.scheduledTime);
      if (isNaN(scheduledTime.getTime())) scheduledTime = getOptimalPostTime(post.platform);
    } else {
      scheduledTime = getOptimalPostTime(post.platform);
    }

    const scheduledPost: any = {
      platform: post.platform,
      topic: post.topic,
      originalContent: post.content,
      optimizedCaption: caption,
      scheduledTime: scheduledTime.toISOString(),
      humanReadableTime: scheduledTime.toLocaleString("en-IN"),
      status: "SCHEDULED",
    };

    scheduledPosts.push(scheduledPost);

    // ─── LinkedIn Publishing ──────────────────────────────────────────────────
    if (post.platform === "LINKEDIN") {
      try {
        const agentRecord = await prisma.agent.findUnique({
          where: { id: agent.id },
          select: { userId: true },
        });

        if (agentRecord?.userId) {
          const isConnected = await linkedinService.isLinkedInConnected(agentRecord.userId);

          if (isConnected) {
            const linkedinResult = await linkedinService.scheduleLinkedInPublish(
              caption,
              scheduledTime,
              agentRecord.userId
            );
            scheduledPost.linkedinPostId = linkedinResult.id;
            scheduledPost.linkedinPublishedAt = linkedinResult.publishedAt;
            scheduledPost.status = "LINKEDIN_SCHEDULED";

            await appendLog(runId, {
              timestamp: nowIso(),
              stepNumber,
              message: `✅ LinkedIn post scheduled for ${scheduledTime.toLocaleString("en-IN")} — Post ID: ${linkedinResult.id}`,
              data: {
                platform: "LINKEDIN",
                postId: linkedinResult.id,
                scheduledAt: scheduledTime.toISOString(),
              },
            });
          } else {
            await appendLog(runId, {
              timestamp: nowIso(),
              stepNumber,
              message: "⚠️ LinkedIn not connected — visit /api/linkedin/auth to connect your account",
              data: { platform: "LINKEDIN", skipped: true },
            });
          }
        }
      } catch (linkedinError) {
        await appendLog(runId, {
          timestamp: nowIso(),
          stepNumber,
          message: `⚠️ LinkedIn publish failed: ${linkedinError instanceof Error ? linkedinError.message : String(linkedinError)}`,
          data: { platform: "LINKEDIN", error: String(linkedinError) },
        });
      }
    }

    await appendLog(runId, {
      timestamp: nowIso(),
      stepNumber,
      message: `✅ ${post.platform} post scheduled for ${scheduledTime.toLocaleString("en-IN")}`,
      data: {
        platform: post.platform,
        scheduledTime: scheduledTime.toISOString(),
        captionPreview: caption.substring(0, 100) + "...",
      },
    });
  }

  const reportsDir = getReportsDir();
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
  const filename = `schedule_report_${Date.now()}.json`;
  const reportPath = path.join(reportsDir, filename);
  fs.writeFileSync(reportPath, JSON.stringify({
    agentName: agent.name,
    generatedAt: new Date().toISOString(),
    totalPosts: scheduledPosts.length,
    posts: scheduledPosts,
  }, null, 2));

  const port = process.env.PORT || 8080;
  const reportUrl = `http://localhost:${port}/api/pdf/download/${filename}`;

  await appendLog(runId, {
    timestamp: nowIso(),
    stepNumber,
    message: `✅ All ${scheduledPosts.length} posts scheduled — Download schedule: ${reportUrl}`,
    data: {
      totalScheduled: scheduledPosts.length,
      reportUrl,
      schedule: scheduledPosts.map(p => ({ platform: p.platform, time: p.humanReadableTime })),
    },
  });

  return {
    success: true,
    type: "SCHEDULED_POSTS",
    totalScheduled: scheduledPosts.length,
    posts: scheduledPosts,
    reportUrl,
  };
}

export async function executeAgent(agentId: string, triggeredBy: string) {
  let runId: string | null = null;

  try {
    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      include: { user: true },
    });
    if (!agent) throw new Error(`Agent not found: ${agentId}`);

    const run = await prisma.agentRun.create({
      data: { agentId, status: RunStatus.RUNNING, logs: [], triggeredBy, startedAt: new Date() },
    });
    runId = run.id;

    await appendLog(run.id, {
      timestamp: nowIso(),
      message: "Run started",
      data: { triggeredBy, agentId, agentName: agent.name },
    });

    const definition = AgentDefinitionSchema.parse(agent.definition);

    let memory: Record<string, any> = {};
    if (agent.memoryEnabled) {
      try {
        memory = await loadMemory(agentId);
        await appendLog(run.id, { timestamp: nowIso(), message: "Memory loaded", data: { memoryKeys: Object.keys(memory) } });
      } catch (memError) {
        await appendLog(run.id, { timestamp: nowIso(), message: "Memory load failed", data: { error: memError instanceof Error ? memError.message : String(memError) } });
      }
    }

    for (const tool of definition.tools || []) {
      try {
        assertToolAllowedForUser(agent.user, tool);
      } catch (toolError) {
        throw new Error(`Tool ${tool} not allowed: ${toolError instanceof Error ? toolError.message : String(toolError)}`);
      }
    }

    let ragContext: string[] = [];
    try {
      const q = `${definition.summary || agent.description} financial data payments invoices posts schedule`;
      const res = await queryRag(agentId, q, 10);
      ragContext = res ? [res] : [];
      await appendLog(run.id, {
        timestamp: nowIso(),
        message: "Knowledge context loaded",
        data: { contextLength: ragContext.length, hasContent: ragContext.join("").length > 10 },
      });
    } catch (ragError) {
      await appendLog(run.id, {
        timestamp: nowIso(),
        message: "Knowledge context load failed",
        data: { error: ragError instanceof Error ? ragError.message : String(ragError) },
      });
    }

    const model = new ChatOllama({
      baseUrl: envOptional("OLLAMA_BASE_URL") ?? "http://localhost:11434",
      model: envOptional("OLLAMA_MODEL") ?? "deepseek-r1:7b",
      temperature: 0.7,
    });

    const steps = definition.steps || [];
    let previousStepOutput = "";

    for (const step of steps) {
      try {
        await appendLog(run.id, {
          timestamp: nowIso(),
          stepNumber: step.stepNumber,
          action: step.action,
          tool: step.tool,
          message: `Step ${step.stepNumber}: ${step.description}`,
          data: { config: step.config },
        });

        const decision = await checkGuardrail({
          runId: run.id,
          action: step.action,
          message: definition.guardrails?.confirmationMessage || "Action requires approval",
          requireApprovalBefore: Array.isArray(definition.guardrails?.requireApprovalBefore)
            ? definition.guardrails.requireApprovalBefore
            : [],
        });

        if (decision.needsApproval) {
          await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: "Waiting for approval", data: { pendingActionId: decision.pendingActionId } });
          await prisma.agentRun.update({ where: { id: run.id }, data: { status: RunStatus.WAITING_APPROVAL } });
          const result = await waitForApproval(run.id);
          await prisma.agentRun.update({ where: { id: run.id }, data: { status: RunStatus.RUNNING } });
          await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: `Approval result: ${result.status}`, data: { result } });
          if (result.status !== "approved") {
            await prisma.agentRun.update({ where: { id: run.id }, data: { status: RunStatus.FAILED, endedAt: new Date(), output: `Approval ${result.status}` } });
            return;
          }
        }

        let outcome: unknown = null;

        // ─── GMAIL ────────────────────────────────────────────────────────────
        if (step.tool === "gmail") {

          if (step.action === "SEND_EMAIL") {
            let readEmails: any[] = [];
            try {
              const prevOutput = JSON.parse(previousStepOutput);
              if (prevOutput.emails && Array.isArray(prevOutput.emails)) readEmails = prevOutput.emails;
            } catch {}

            if (readEmails.length > 0) {
              const emailResults: any[] = [];
              for (const readEmail of readEmails) {
                const fromEmail = readEmail.from?.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0];
                if (!fromEmail) continue;
                const aiBody = await generateAiReply(model, { candidateEmail: fromEmail, emailSubject: readEmail.subject, emailBody: readEmail.body || readEmail.snippet, agentDescription: definition.summary || agent.description, ragContext });
                const emailResult = await sendEmail({ to: fromEmail, subject: readEmail.subject?.startsWith("Re:") ? readEmail.subject : `Re: ${readEmail.subject || "Your message"}`, body: aiBody, html: null });
                emailResults.push({ to: fromEmail, ...emailResult });
                await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: emailResult.success ? `✅ AI reply sent to ${fromEmail}` : `❌ Failed: ${emailResult.error}`, data: emailResult });
              }
              outcome = { success: true, mode: "ai_reply", totalReplied: emailResults.filter(r => r.success).length, totalFailed: emailResults.filter(r => !r.success).length, results: emailResults };

            } else {
              let allEmails: string[] = [];
              if (step.config && typeof step.config === "object" && "to" in step.config) {
                const toValue = (step.config as any).to;
                allEmails.push(...(Array.isArray(toValue) ? toValue : [toValue]));
              }
              if (ragContext.length > 0) allEmails.push(...extractAllEmailsFromText(ragContext.join(" ")));
              if (previousStepOutput) allEmails.push(...extractAllEmailsFromText(previousStepOutput));
              allEmails = [...new Set(allEmails)].filter(e => e.includes("@") && !e.includes("agentforge") && !e.includes("noreply") && !e.includes("no-reply") && !e.includes("messageId") && !e.includes("example.com"));

              if (allEmails.length === 0) {
                outcome = { skipped: true, reason: "No email recipients found", tool: step.tool, action: step.action };
                await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: "Email step skipped — no recipients found", data: outcome });
                previousStepOutput = JSON.stringify(outcome);
                continue;
              }

              const emailResults: any[] = [];
              for (const emailTo of allEmails) {
                const aiBody = await generateAiReply(model, { candidateEmail: emailTo, agentDescription: definition.summary || agent.description, ragContext });
                const subject = (step.config && typeof step.config === "object" && "subject" in step.config && typeof (step.config as any).subject === "string")
                  ? (step.config as any).subject
                  : "Message from AgentForge";
                const emailResult = await sendEmail({ to: emailTo, subject, body: aiBody, html: null });
                emailResults.push({ to: emailTo, ...emailResult });
                await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: emailResult.success ? `✅ AI email sent to ${emailTo}` : `❌ Failed: ${emailResult.error}`, data: emailResult });
              }
              outcome = { success: true, mode: "ai_compose", totalRecipients: allEmails.length, totalSent: emailResults.filter(r => r.success).length, totalFailed: emailResults.filter(r => !r.success).length, results: emailResults };
            }

          } else if (step.action === "READ_EMAIL") {
            try {
              const { readEmailsFromSenders, readEmails } = await import("./gmailService");
              let emails: any[] = [];
              const cfg = step.config as any;
              if (ragContext.length > 0) {
                const senderEmails = extractAllEmailsFromText(ragContext.join(" "));
                emails = senderEmails.length > 0
                  ? await readEmailsFromSenders(senderEmails, cfg?.maxResults || 50)
                  : await readEmails(cfg?.query || "is:unread", cfg?.maxResults || 20);
              } else {
                emails = await readEmails(cfg?.query || "is:unread", cfg?.maxResults || 20);
              }
              outcome = { success: true, emailsFound: emails.length, emails };
              await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: `✅ Read ${emails.length} emails successfully`, data: { emailsFound: emails.length } });
            } catch (readError) {
              outcome = { skipped: true, reason: `Gmail read failed: ${readError instanceof Error ? readError.message : String(readError)}` };
              await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: "Email reading failed — check Gmail OAuth setup", data: outcome });
            }

          } else {
            outcome = { skipped: true, reason: `Unsupported Gmail action: ${step.action}` };
            await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: `Gmail action ${step.action} not supported`, data: outcome });
          }

        // ─── SLACK ────────────────────────────────────────────────────────────
        } else if (step.tool === "slack") {
          outcome = { skipped: true, reason: "Slack not configured" };
          await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: "Slack step skipped", data: outcome });

        // ─── SHEETS ───────────────────────────────────────────────────────────
        } else if (step.tool === "sheets") {
          outcome = { skipped: true, reason: "Google Sheets not configured" };
          await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: "Sheets step skipped", data: outcome });

        // ─── HUBSPOT ──────────────────────────────────────────────────────────
        } else if (step.tool === "hubspot") {
          outcome = { skipped: true, reason: "HubSpot not configured" };
          await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: "HubSpot step skipped", data: outcome });

        // ─── FRESHDESK ────────────────────────────────────────────────────────
        } else if (step.tool === "freshdesk") {
          outcome = { skipped: true, reason: "Freshdesk not configured" };
          await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: "Freshdesk step skipped", data: outcome });

        // ─── LLM ─────────────────────────────────────────────────────────────
        } else if (step.tool === "llm") {
          try {
            const stepText = step.description + " " + (definition.summary || agent.description);

            // 1. Post scheduling
            if (needsSchedulePost(agent, stepText) && ragContext.length > 0) {
              await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, message: "Post scheduling detected", data: {} });
              outcome = await schedulePostsFromRag(run.id, step.stepNumber, agent, ragContext, model, definition);

            // 2. Image caption generation
            } else if (needsImageCaption(agent, stepText)) {
              await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, message: "Image caption generation detected", data: {} });

              const uploadsDir = getUploadsDir();
              let imageFile: string | null = null;

              if (fs.existsSync(uploadsDir)) {
                const files = fs.readdirSync(uploadsDir);
                const imgFile = files.find(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
                if (imgFile) imageFile = path.join(uploadsDir, imgFile);
              }

              if (imageFile) {
                const captions = await generateImageCaptions(imageFile, definition.summary || agent.description, ragContext);

                try {
                  const reportsDir = getReportsDir();
                  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
                  const filename = `captions_${Date.now()}.pdf`;
                  const outputPath = path.join(reportsDir, filename);
                  const port = process.env.PORT || 8080;
                  const downloadUrl = `http://localhost:${port}/api/pdf/download/${filename}`;

                  const pdfBuffer = PDFService.generateCustomReportPDF(
                    `Social Media Captions — ${agent.name}`,
                    [
                      { title: "INSTAGRAM", content: extractSection(captions, "INSTAGRAM"), type: "text" },
                      { title: "LINKEDIN", content: extractSection(captions, "LINKEDIN"), type: "text" },
                      { title: "TWITTER", content: extractSection(captions, "TWITTER"), type: "text" },
                      { title: "FACEBOOK", content: extractSection(captions, "FACEBOOK"), type: "text" },
                      { title: "ADVERTISEMENT", content: extractSection(captions, "ADVERTISEMENT"), type: "text" },
                    ],
                    {
                      "Agent": agent.name,
                      "Department": agent.department,
                      "Generated": new Date().toLocaleString("en-IN"),
                      "Total Platforms": "5",
                    }
                  );

                  fs.writeFileSync(outputPath, pdfBuffer);
                  outcome = { success: true, type: "IMAGE_CAPTIONS", captions, downloadUrl, filename };
                  await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: `✅ Captions generated — Download PDF: ${downloadUrl}`, data: { type: "IMAGE_CAPTIONS", captions, downloadUrl } });
                } catch {
                  outcome = { success: true, type: "IMAGE_CAPTIONS", captions };
                  await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: `✅ Image captions generated`, data: { preview: captions.substring(0, 200) } });
                }

              } else {
                const captionResp = await model.invoke(
                  `Generate 5 creative social media captions for: ${stepText}\n\nFormat:\nINSTAGRAM:\n[caption]\n\nLINKEDIN:\n[caption]\n\nTWITTER:\n[caption]\n\nFACEBOOK:\n[caption]\n\nADVERTISEMENT:\n[caption]`
                );
                const captions = typeof captionResp.content === "string" ? captionResp.content : JSON.stringify(captionResp.content);

                try {
                  const reportsDir = getReportsDir();
                  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
                  const filename = `captions_${Date.now()}.pdf`;
                  const port = process.env.PORT || 8080;
                  const downloadUrl = `http://localhost:${port}/api/pdf/download/${filename}`;
                  const pdfBuffer = PDFService.generateCustomReportPDF(
                    `Social Media Captions — ${agent.name}`,
                    [
                      { title: "INSTAGRAM", content: extractSection(captions, "INSTAGRAM"), type: "text" },
                      { title: "LINKEDIN", content: extractSection(captions, "LINKEDIN"), type: "text" },
                      { title: "TWITTER", content: extractSection(captions, "TWITTER"), type: "text" },
                      { title: "FACEBOOK", content: extractSection(captions, "FACEBOOK"), type: "text" },
                      { title: "ADVERTISEMENT", content: extractSection(captions, "ADVERTISEMENT"), type: "text" },
                    ],
                    { "Agent": agent.name, "Department": agent.department, "Generated": new Date().toLocaleString("en-IN") }
                  );
                  fs.writeFileSync(path.join(reportsDir, filename), pdfBuffer);
                  outcome = { success: true, type: "IMAGE_CAPTIONS", captions, downloadUrl, filename };
                  await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: `✅ Captions generated — Download PDF: ${downloadUrl}`, data: { type: "IMAGE_CAPTIONS", captions, downloadUrl } });
                } catch {
                  outcome = { success: true, type: "IMAGE_CAPTIONS", captions };
                  await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: "✅ Captions generated from description", data: outcome });
                }
              }

            // 3. PDF generation (financial/payment/report)
            } else if (needsPDFGeneration(stepText) && ragContext.length > 0 && ragContext.join("").length > 20) {
              await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, message: "PDF generation detected", data: { ragLength: ragContext.join("").length } });
              const pdfResult = await generateAndSavePDF(run.id, step.stepNumber, agent, ragContext, model, definition);
              if (pdfResult) {
                outcome = { success: true, type: "PDF_REPORT", downloadUrl: pdfResult.downloadUrl, filename: pdfResult.filename };
                await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: `✅ PDF generated — Download: ${pdfResult.downloadUrl}`, data: { type: "PDF_REPORT", downloadUrl: pdfResult.downloadUrl } });
              } else {
                const sys = new SystemMessage("You are AgentForge Executor. Produce a concise outcome.");
                const user = new HumanMessage([`Agent: ${agent.name}`, `Step: ${step.description}`, `Context:\n${ragContext.join("\n")}`].join("\n\n"));
                const resp = await model.invoke([sys, user]);
                outcome = { content: resp.content };
                await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: "PDF failed — LLM fallback", data: outcome });
              }

            // 4. Dedicated SUMMARISE handler
            } else if (step.action === "SUMMARISE") {
              await appendLog(run.id, {
                timestamp: nowIso(),
                stepNumber: step.stepNumber,
                message: "Summarization started",
                data: { hasRagContext: ragContext.length > 0, hasPreviousOutput: !!previousStepOutput },
              });

              const textToSummarise = ragContext.length > 0 && ragContext.join("").length > 20
                ? ragContext.join("\n")
                : previousStepOutput || definition.summary || agent.description;

              const summaryPrompt = `You are an expert summarizer and analyst. Your task is to produce a clear, well-structured summary.

CONTENT TO SUMMARIZE:
${textToSummarise}

TASK CONTEXT: ${step.description}
AGENT: ${agent.name} (${agent.department})

Provide a comprehensive summary with the following structure:

OVERVIEW
[2-3 sentences capturing the key theme and purpose of this content]

KEY POINTS
[List the 5-7 most important points extracted from the content]

IMPORTANT FINDINGS
[Any notable data, numbers, or insights from the content]

CONCLUSION
[A brief conclusion and any recommended next steps]

Be specific, use actual details from the content, and avoid vague generalities.`;

              const summaryResp = await model.invoke(summaryPrompt);
              const summaryContent = typeof summaryResp.content === "string"
                ? summaryResp.content.trim()
                : JSON.stringify(summaryResp.content);

              // Debug: Log summary content being generated
              await appendLog(run.id, {
                timestamp: nowIso(),
                stepNumber: step.stepNumber,
                message: "Summary Content Generated",
                data: { 
                  contentLength: summaryContent.length,
                  contentPreview: summaryContent.substring(0, 200) + (summaryContent.length > 200 ? "..." : ""),
                  hasContent: summaryContent.trim().length > 0
                }
              });

              try {
                const reportsDir = getReportsDir();
                if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
                const filename = `summary_${Date.now()}.pdf`;
                const outputPath = path.join(reportsDir, filename);
                const port = process.env.PORT || 8080;
                const downloadUrl = `http://localhost:${port}/api/pdf/download/${filename}`;

                const pdfBuffer = PDFService.generateCustomReportPDF(
                  `Summary Report — ${agent.name}`,
                  [{ title: "SUMMARY", content: summaryContent, type: "text" }],
                  {
                    "Agent": agent.name,
                    "Department": agent.department,
                    "Step": step.description,
                    "Generated": new Date().toLocaleString("en-IN"),
                  }
                );
                fs.writeFileSync(outputPath, pdfBuffer);

                outcome = { content: summaryContent, type: "LLM_OUTPUT", downloadUrl, filename };
                await appendLog(run.id, {
                  timestamp: nowIso(),
                  stepNumber: step.stepNumber,
                  action: step.action,
                  tool: step.tool,
                  message: `✅ Summary generated — Download PDF: ${downloadUrl}`,
                  data: { content: summaryContent, type: "LLM_OUTPUT", downloadUrl, filename },
                });
              } catch {
                outcome = { content: summaryContent, type: "LLM_OUTPUT" };
                await appendLog(run.id, {
                  timestamp: nowIso(),
                  stepNumber: step.stepNumber,
                  action: step.action,
                  tool: step.tool,
                  message: "✅ Summary generated",
                  data: { content: summaryContent },
                });
              }

            // 5. Normal LLM step
            } else {
              const sys = new SystemMessage(
                "You are AgentForge Executor. Produce a detailed, well-structured outcome for the current step.\nNever fabricate secrets.\nIf required data is missing, say what is needed.\nBe comprehensive and include all relevant details."
              );
              const user = new HumanMessage(
                [
                  `Agent: ${definition.agentName || agent.name} (${definition.department || agent.department})`,
                  `Step: ${step.stepNumber} — ${step.action} using ${step.tool}`,
                  `Step description: ${step.description}`,
                  previousStepOutput ? `Previous step output: ${previousStepOutput}` : "",
                  `Memory: ${JSON.stringify(memory)}`,
                  ragContext.length ? `Knowledge context:\n${ragContext.join("\n---\n")}` : "Knowledge context: (none)",
                ]
                  .filter(Boolean)
                  .join("\n\n")
              );
              const resp = await model.invoke([sys, user]);
              const llmContent = typeof resp.content === "string" ? resp.content : JSON.stringify(resp.content);

              // Debug: Log the actual content being generated
              await appendLog(run.id, {
                timestamp: nowIso(),
                stepNumber: step.stepNumber,
                message: "LLM Content Generated",
                data: { 
                  contentLength: llmContent.length,
                  contentPreview: llmContent.substring(0, 200) + (llmContent.length > 200 ? "..." : ""),
                  hasContent: llmContent.trim().length > 0
                }
              });

              try {
                const reportsDir = getReportsDir();
                if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
                const filename = `output_${Date.now()}.pdf`;
                const outputPath = path.join(reportsDir, filename);
                const port = process.env.PORT || 8080;
                const downloadUrl = `http://localhost:${port}/api/pdf/download/${filename}`;

                const pdfBuffer = PDFService.generateCustomReportPDF(
                  `${definition.agentName || agent.name} — Output Report`,
                  [{ title: getStepTitle(String(step.action), String(agent.department)), content: llmContent, type: "text" }],
                  {
                    "Agent": definition.agentName || agent.name,
                    "Department": agent.department,
                    "Step": step.description,
                    "Generated": new Date().toLocaleString("en-IN"),
                  }
                );

                fs.writeFileSync(outputPath, pdfBuffer);

                outcome = { content: llmContent, type: "LLM_OUTPUT", downloadUrl, filename };
                await appendLog(run.id, {
                  timestamp: nowIso(),
                  stepNumber: step.stepNumber,
                  action: step.action,
                  tool: step.tool,
                  message: `✅ Output generated — Download PDF: ${downloadUrl}`,
                  data: { content: llmContent, type: "LLM_OUTPUT", downloadUrl, filename },
                });
              } catch (pdfErr) {
                outcome = { content: llmContent, type: "LLM_OUTPUT" };
                await appendLog(run.id, {
                  timestamp: nowIso(),
                  stepNumber: step.stepNumber,
                  action: step.action,
                  tool: step.tool,
                  message: "LLM step executed — PDF generation failed",
                  data: { content: llmContent },
                });
              }
            } // ← closes if/else chain

          } catch (llmError) {
            // ← correctly closes the try block for step.tool === "llm"
            outcome = { skipped: true, reason: `LLM error: ${llmError instanceof Error ? llmError.message : String(llmError)}` };
            await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: "LLM step failed — skipping", data: outcome });
          }

        // ─── UNKNOWN TOOL ─────────────────────────────────────────────────────
        } else {
          outcome = { skipped: true, reason: `Unknown tool: ${step.tool}` };
          await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: `Unknown tool ${step.tool} — skipping`, data: outcome });
        }

        previousStepOutput = JSON.stringify(outcome);

        if (agent.memoryEnabled) {
          try {
            await saveMemory(agentId, `step_${step.stepNumber}_result`, JSON.stringify(outcome));
          } catch (memError) {
            await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, message: "Failed to save step to memory", data: { error: memError instanceof Error ? memError.message : String(memError) } });
          }
        }

      } catch (stepError) {
        const stepErrMsg = stepError instanceof Error ? stepError.message : String(stepError);
        await appendLog(run.id, { timestamp: nowIso(), stepNumber: step.stepNumber, action: step.action, tool: step.tool, message: `Step ${step.stepNumber} error — continuing`, data: { error: stepErrMsg } });
        previousStepOutput = JSON.stringify({ error: stepErrMsg });
        if (stepErrMsg.includes("Agent not found") || stepErrMsg.includes("UNAUTHENTICATED")) throw stepError;
        continue;
      }
    } // end for loop

    await prisma.agentRun.update({
      where: { id: run.id },
      data: { status: RunStatus.SUCCESS, endedAt: new Date(), output: `Completed ${steps.length} steps successfully` },
    });
    await appendLog(run.id, { timestamp: nowIso(), message: "Run completed successfully", data: { totalSteps: steps.length } });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    const errorStack = err instanceof Error ? err.stack : undefined;
    logger.error("execute_agent_failed", { agentId, runId: runId || "unknown", error: errorMessage, stack: errorStack });

    if (runId) {
      try {
        await appendLog(runId, { timestamp: nowIso(), message: "Run failed", data: { error: { message: errorMessage, stack: errorStack }, agentId, triggeredBy } });
        await prisma.agentRun.update({ where: { id: runId }, data: { status: RunStatus.FAILED, endedAt: new Date(), output: errorMessage } });
      } catch (dbError) {
        logger.error("failed_to_update_run_status", { runId, originalError: errorMessage, dbError: dbError instanceof Error ? dbError.message : String(dbError) });
      }
    }
  }
}

export async function cleanupStuckRuns() {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const stuckRuns = await prisma.agentRun.findMany({
      where: { status: RunStatus.RUNNING, startedAt: { lt: fiveMinutesAgo } },
    });

    if (stuckRuns.length > 0) {
      logger.info("cleaning_up_stuck_runs", { count: stuckRuns.length });
      for (const run of stuckRuns) {
        try {
          await prisma.agentRun.update({
            where: { id: run.id },
            data: { status: RunStatus.FAILED, endedAt: new Date(), output: "Timed out — stuck in RUNNING for > 5 minutes" },
          });
          await appendLog(run.id, { timestamp: nowIso(), message: "Auto-marked FAILED due to timeout", data: { duration: Date.now() - run.startedAt.getTime() } });
          logger.info("stuck_run_cleaned", { runId: run.id, agentId: run.agentId });
        } catch (error) {
          logger.error("failed_to_cleanup_stuck_run", { runId: run.id, error: error instanceof Error ? error.message : String(error) });
        }
      }
    }
  } catch (error) {
    logger.error("cleanup_stuck_runs_failed", { error: error instanceof Error ? error.message : String(error) });
  }
}