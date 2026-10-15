import { Ollama } from "ollama";
import { envOptional } from "../env";
import { logger } from "../logger";

const ollama = new Ollama({
  host: envOptional("OLLAMA_BASE_URL") || "http://127.0.0.1:11434",
});

const TEXT_MODEL = envOptional("OLLAMA_MODEL") || "deepseek-r1:7b";
const VISION_MODEL = envOptional("OLLAMA_VISION_MODEL") || "llava";

// ─── Parse agent intent from plain English ────────────────────────────────────
export async function parseAgentIntent(userPrompt: string) {
  try {
    const response = await ollama.chat({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an AI agent builder. When a user describes what they need, 
extract a structured agent config as JSON with these fields:
{
  "name": "short agent name",
  "description": "what it does in one sentence",
  "department": "SALES | HR | MARKETING | FINANCE | SUPPORT",
  "summary": "one clear sentence of what this agent does",
  "steps": [
    {
      "stepNumber": 1,
      "action": "READ_EMAIL | SEND_EMAIL | SUMMARISE | CLASSIFY | DRAFT | GENERATE_REPORT | POST_SLACK | READ_SHEET | WRITE_SHEET | UPDATE_CRM | READ_TICKETS | REPLY_TICKET | ESCALATE",
      "tool": "gmail | slack | sheets | hubspot | freshdesk | llm",
      "description": "what this step does in plain English",
      "config": {}
    }
  ],
  "tools": ["gmail", "slack", "sheets", "hubspot", "freshdesk", "llm"],
  "trigger": "MANUAL | SCHEDULED | WEBHOOK",
  "knowledgeBaseNeeded": true or false,
  "guardrails": {
    "requireApprovalBefore": [],
    "dataAccessScope": ["SALES"],
    "confirmationMessage": "message shown before sensitive action"
  }
}
Respond with ONLY the JSON object, no explanation, no markdown.`,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      options: { temperature: 0.2 },
    });

    const raw = response.message.content.trim();
    try {
      return JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
      throw new Error("LLM did not return valid JSON");
    }
  } catch (error) {
    logger.error("parse_agent_intent_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

// ─── Execute a single agent step ─────────────────────────────────────────────
export async function executeAgentStep(
  agentName: string,
  step: string,
  context: Record<string, unknown>
) {
  try {
    const response = await ollama.chat({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an AI agent called "${agentName}". 
Execute the given step and return a realistic result as JSON:
{
  "status": "done | failed | needs_input",
  "output": "what you did or produced",
  "data": {}
}
Respond with ONLY the JSON object, no explanation.`,
        },
        {
          role: "user",
          content: `Step to execute: ${step}\nContext: ${JSON.stringify(context)}`,
        },
      ],
      options: { temperature: 0.3 },
    });

    const raw = response.message.content.trim();
    try {
      return JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
      return { status: "done", output: raw, data: {} };
    }
  } catch (error) {
    logger.error("execute_agent_step_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return { status: "failed", output: String(error), data: {} };
  }
}

// ─── Generate AI reply to an email ───────────────────────────────────────────
export async function generateEmailReply(options: {
  fromEmail: string;
  subject: string;
  emailBody: string;
  agentDescription: string;
  ragContext: string[];
  department: string;
}): Promise<string> {
  try {
    const response = await ollama.chat({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a professional ${options.department} assistant at a company.
You read incoming emails and write natural, helpful replies.
Rules:
- Reply directly to what the sender asked or wrote
- Use company context from the knowledge base to answer accurately  
- Be warm, professional, and concise
- Sign off as "${options.department} Team"
- Write ONLY the email body — no Subject, From, To headers
- Never use templates or fixed responses
- Make it feel like a real human wrote it`,
        },
        {
          role: "user",
          content: [
            `From: ${options.fromEmail}`,
            `Subject: ${options.subject}`,
            `Email content:\n${options.emailBody}`,
            options.ragContext.length > 0
              ? `\nCompany knowledge base context:\n${options.ragContext.join("\n")}`
              : "",
          ]
            .filter(Boolean)
            .join("\n\n"),
        },
      ],
      options: { temperature: 0.7 },
    });

    let content = response.message.content.trim();

    // Remove any headers the model accidentally added
    content = content
      .replace(/^(Subject|From|To|CC|BCC):.+\n/gim, "")
      .replace(/^Re:.+\n/gim, "")
      .trim();

    return content;
  } catch (error) {
    logger.error("generate_email_reply_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

// ─── Generate image captions using vision model ───────────────────────────────
export async function generateImageCaptions(options: {
  imageBase64: string;
  mimeType: string;
  agentDescription: string;
  ragContext: string[];
  brandName?: string;
}): Promise<string> {
  try {
    const response = await ollama.chat({
      model: VISION_MODEL,
      messages: [
        {
          role: "user",
          content: `You are a professional social media marketing expert and copywriter.

Analyze this image carefully and generate 5 unique, creative social media captions.

${options.brandName ? `Brand: ${options.brandName}` : ""}
${options.agentDescription ? `Context: ${options.agentDescription}` : ""}
${options.ragContext.length > 0 ? `Brand guidelines:\n${options.ragContext.join("\n")}` : ""}

Generate exactly 5 captions in this format:

INSTAGRAM:
[Creative caption with 5-8 relevant hashtags, max 2200 chars, engaging and visual]

LINKEDIN:
[Professional tone, business insight, thought leadership angle, no hashtags]

TWITTER:
[Punchy, under 280 characters, 2-3 hashtags, conversational]

FACEBOOK:
[Conversational, storytelling tone, encourages comments and shares]

ADVERTISEMENT:
[Compelling ad copy with headline, benefit, and strong call to action]`,
          images: [options.imageBase64],
        },
      ],
      options: { temperature: 0.8 },
    });

    return response.message.content.trim();
  } catch (error) {
    logger.error("generate_image_captions_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

// ─── Generate financial analysis summary ─────────────────────────────────────
export async function generateFinancialSummary(
  financialData: string,
  agentDescription: string
): Promise<string> {
  try {
    const response = await ollama.chat({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a senior financial analyst. Analyze financial data and produce clear, structured summaries.
Always use actual numbers from the data provided. Never make up figures.
Structure your response with clear section headers in CAPS.`,
        },
        {
          role: "user",
          content: `FINANCIAL DATA:
${financialData}

TASK: ${agentDescription}

Produce a comprehensive financial summary with these exact sections:

EXECUTIVE SUMMARY
[2-3 sentences about overall financial health]

KEY METRICS
Total Revenue: [figure]
Total Expenses: [figure]
Net Profit: [figure]
Profit Margin: [percentage]

REVENUE ANALYSIS
[Each revenue stream with amount and % of total]

EXPENSE ANALYSIS
[Each expense category with amount and % of total]

PROFIT AND LOSS SUMMARY
Gross Profit: [figure]
Operating Profit: [figure]
Net Profit: [figure]

BALANCE SHEET HIGHLIGHTS
Total Assets: [figure]
Total Liabilities: [figure]
Shareholders Equity: [figure]

CASH FLOW SUMMARY
Operating Cash Flow: [figure]
Net Cash Position: [figure]

KEY FINANCIAL INSIGHTS
[4-5 specific observations based on actual numbers]

RECOMMENDATIONS
[3 specific actionable recommendations]`,
        },
      ],
      options: { temperature: 0.3 },
    });

    return response.message.content.trim();
  } catch (error) {
    logger.error("generate_financial_summary_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

// ─── Generate personalized sales outreach email ───────────────────────────────
export async function generateSalesOutreach(options: {
  leadName: string;
  company: string;
  role: string;
  industry: string;
  painPoints: string;
  ragContext: string[];
}): Promise<string> {
  try {
    const response = await ollama.chat({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert B2B sales copywriter who writes highly personalized cold outreach emails.
Your emails are concise, relevant, and get replies because they show genuine research.
Never use generic templates. Always reference specific details about the prospect.
Write ONLY the email body — no Subject line, no headers.`,
        },
        {
          role: "user",
          content: `Write a personalized cold outreach email for this lead:

Name: ${options.leadName}
Company: ${options.company}
Role: ${options.role}
Industry: ${options.industry}
Pain Points: ${options.painPoints}

Our company context:
${options.ragContext.join("\n")}

The email should:
- Open with something specific about their company or industry
- Connect their specific pain points to our solution
- Be under 150 words
- Have a clear single call to action
- Feel like it was written specifically for them
- Sign off as "Sales Team"`,
        },
      ],
      options: { temperature: 0.7 },
    });

    return response.message.content.trim();
  } catch (error) {
    logger.error("generate_sales_outreach_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

// ─── Score resume against job description ────────────────────────────────────
export async function scoreResume(options: {
  resumeText: string;
  jobDescription: string;
}): Promise<{
  score: number;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}> {
  try {
    const response = await ollama.chat({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert HR recruiter. Score resumes against job descriptions.
Return ONLY a JSON object with no explanation.`,
        },
        {
          role: "user",
          content: `Score this resume against the job description.

JOB DESCRIPTION:
${options.jobDescription}

RESUME:
${options.resumeText}

Return JSON:
{
  "score": number between 0 and 100,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "gaps": ["gap 1", "gap 2"],
  "recommendation": "SHORTLIST | REJECT | MAYBE",
  "summary": "one sentence summary"
}`,
        },
      ],
      options: { temperature: 0.2 },
    });

    const raw = response.message.content.trim();
    try {
      return JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
      return {
        score: 50,
        strengths: ["Could not parse response"],
        gaps: [],
        recommendation: "MAYBE",
      };
    }
  } catch (error) {
    logger.error("score_resume_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

// ─── Classify support ticket ──────────────────────────────────────────────────
export async function classifyTicket(ticketContent: string): Promise<{
  category: string;
  priority: string;
  sentiment: string;
  suggestedReply: string;
  shouldEscalate: boolean;
}> {
  try {
    const response = await ollama.chat({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a customer support AI. Classify incoming support tickets.
Return ONLY a JSON object.`,
        },
        {
          role: "user",
          content: `Classify this support ticket:

"${ticketContent}"

Return JSON:
{
  "category": "BUG | BILLING | FEATURE_REQUEST | GENERAL | ACCOUNT | COMPLAINT",
  "priority": "LOW | MEDIUM | HIGH | URGENT",
  "sentiment": "POSITIVE | NEUTRAL | NEGATIVE | ANGRY",
  "suggestedReply": "a professional reply to this ticket",
  "shouldEscalate": true or false,
  "escalationReason": "reason if shouldEscalate is true"
}`,
        },
      ],
      options: { temperature: 0.2 },
    });

    const raw = response.message.content.trim();
    try {
      return JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
      return {
        category: "GENERAL",
        priority: "MEDIUM",
        sentiment: "NEUTRAL",
        suggestedReply: raw,
        shouldEscalate: false,
      };
    }
  } catch (error) {
    logger.error("classify_ticket_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

// ─── Detect department from chat conversation ─────────────────────────────────
export async function detectDepartmentFromChat(messages: Array<{ role: string; content: string }>): Promise<{
  department: string | null;
  intent: string | null;
  agentDescription: string | null;
  confidence: number;
  shouldRedirect: boolean;
  redirectMessage: string;
}> {
  try {
    const conversationText = messages.map(m => `${m.role}: ${m.content}`).join('\n');

    const response = await ollama.chat({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content: `Analyze this conversation and detect the business department and automation task.
Return ONLY a JSON object:
{
  "department": "SALES | HR | MARKETING | FINANCE | SUPPORT | null",
  "intent": "brief description of what they want to automate",
  "agentDescription": "clear description for building an AI agent",
  "confidence": 0.0 to 1.0,
  "shouldRedirect": true if enough info to build agent,
  "redirectMessage": "message shown before redirecting to builder"
}

Department rules:
- SALES: leads, outreach, CRM, pipeline, deals, prospects
- HR: resumes, candidates, interviews, hiring, onboarding
- MARKETING: campaigns, social media, content, captions, posts
- FINANCE: invoices, payments, expenses, reports, budget
- SUPPORT: tickets, customer issues, help desk, escalations`,
        },
        {
          role: "user",
          content: `Conversation:\n${conversationText}`,
        },
      ],
      options: { temperature: 0.1 },
    });

    const raw = response.message.content.trim();
    try {
      return JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
      return {
        department: null,
        intent: null,
        agentDescription: null,
        confidence: 0,
        shouldRedirect: false,
        redirectMessage: "",
      };
    }
  } catch (error) {
    logger.error("detect_department_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return {
      department: null,
      intent: null,
      agentDescription: null,
      confidence: 0,
      shouldRedirect: false,
      redirectMessage: "",
    };
  }
}

// ─── General chat response ────────────────────────────────────────────────────
export async function generateChatResponse(
  messages: Array<{ role: string; content: string }>,
  systemPrompt: string
): Promise<string> {
  try {
    const response = await ollama.chat({
      model: TEXT_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
      ],
      options: { temperature: 0.7 },
    });

    return response.message.content.trim();
  } catch (error) {
    logger.error("generate_chat_response_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

// ─── Summarise text ───────────────────────────────────────────────────────────
export async function summariseText(
  text: string,
  context: string = ""
): Promise<string> {
  try {
    const response = await ollama.chat({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert at summarising content clearly and concisely. Extract the most important points.",
        },
        {
          role: "user",
          content: `Summarise the following${context ? ` (context: ${context})` : ""}:\n\n${text}`,
        },
      ],
      options: { temperature: 0.3 },
    });

    return response.message.content.trim();
  } catch (error) {
    logger.error("summarise_text_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}