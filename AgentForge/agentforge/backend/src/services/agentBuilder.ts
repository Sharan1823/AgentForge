import { AgentDefinitionSchema, type AgentDefinition } from "@agentforge/shared";
import { ChatOllama } from "@langchain/ollama";
import { envOptional } from "../env";

const VALID_ACTIONS = [
  "READ_EMAIL","SEND_EMAIL","POST_SLACK","READ_SHEET","WRITE_SHEET",
  "SEARCH_WEB","CLASSIFY","SUMMARISE","DRAFT","UPDATE_CRM",
  "READ_TICKETS","REPLY_TICKET","ESCALATE",
] as const;

const ACTION_MAP: Record<string, string> = {
  SCREEN_RESUME:   "CLASSIFY",
  SCREEN_RESUMES:  "CLASSIFY",
  SEND_INVITE:     "SEND_EMAIL",
  SEND_INVITES:    "SEND_EMAIL",
  SEND_EMAILS:     "SEND_EMAIL",
  ANSWER_FAQ:      "REPLY_TICKET",
  ANSWER_FAQS:     "REPLY_TICKET",
  READ_RESUME:     "READ_EMAIL",
  SHORTLIST:       "CLASSIFY",
  SCORE:           "CLASSIFY",
  RANK:            "CLASSIFY",
  NOTIFY:          "SEND_EMAIL",
  POST_MESSAGE:    "POST_SLACK",
  WRITE_CRM:       "UPDATE_CRM",
  CREATE_SUMMARY:  "SUMMARISE",
  GENERATE_DRAFT:  "DRAFT",
  FILTER:          "CLASSIFY",
  EVALUATE:        "CLASSIFY",
  REVIEW:          "CLASSIFY",
  SCHEDULE:        "SEND_EMAIL",
  INTERVIEW:       "SEND_EMAIL",
  FOLLOW_UP:       "SEND_EMAIL",
  ESCALATE_TICKET: "ESCALATE",
  CLOSE_TICKET:    "REPLY_TICKET",
  LOG:             "UPDATE_CRM",
  RECORD:          "UPDATE_CRM",
  GENERATE_REPORT: "SUMMARISE",
  GENERATE_PDF:    "SUMMARISE",
  SCHEDULE_POST:   "POST_SLACK",
  POST_SOCIAL:     "POST_SLACK",
  CAPTION:         "DRAFT",
  GENERATE_CAPTION: "DRAFT",
};

const VALID_TOOLS = ["gmail", "slack", "sheets", "hubspot", "freshdesk", "llm"] as const;
const INTEGRATION_TOOLS = ["gmail", "slack", "sheets", "hubspot", "freshdesk"];
const VALID_DEPARTMENTS = ["SALES", "HR", "MARKETING", "FINANCE", "SUPPORT"];

const TOOL_MAP: Record<string, string> = {
  email:           "gmail",
  mail:            "gmail",
  google:          "sheets",
  spreadsheet:     "sheets",
  "google sheets": "sheets",
  crm:             "hubspot",
  ticket:          "freshdesk",
  tickets:         "freshdesk",
  support:         "freshdesk",
  helpdesk:        "freshdesk",
  ai:              "llm",
  ollama:          "llm",
  vision:          "llm",
  image:           "llm",
  pdf:             "llm",
  report:          "llm",
  "":              "llm",
  none:            "llm",
  null:            "llm",
  undefined:       "llm",
};

function normalizeAction(action: string): string {
  const upper = String(action ?? "").toUpperCase().trim();
  if ((VALID_ACTIONS as readonly string[]).includes(upper)) return upper;
  return ACTION_MAP[upper] ?? "DRAFT";
}

function normalizeTool(tool: string): string {
  const lower = String(tool ?? "").toLowerCase().trim();
  if ((VALID_TOOLS as readonly string[]).includes(lower)) return lower;
  return TOOL_MAP[lower] ?? "llm";
}

function normalizeTrigger(trigger: any): any {
  if (!trigger) {
    return { type: "MANUAL", cronSchedule: null, humanReadable: "Run manually" };
  }
  const type = trigger.type ?? "MANUAL";
  return {
    type,
    cronSchedule: trigger.cronSchedule ?? null,
    humanReadable: trigger.humanReadable ?? (type === "MANUAL" ? "Run manually" : "Scheduled"),
  };
}

function normalizeGuardrails(guardrails: any): any {
  if (!guardrails) {
    return {
      requireApprovalBefore: [],
      dataAccessScope: [],
      maxActionsPerRun: 10,
      confirmationMessage: "Are you sure you want to proceed?",
    };
  }
  return {
    requireApprovalBefore: Array.isArray(guardrails.requireApprovalBefore)
      ? guardrails.requireApprovalBefore
      : [],
    dataAccessScope: Array.isArray(guardrails.dataAccessScope)
      ? guardrails.dataAccessScope
          .map((d: any) => String(d).toUpperCase().trim())
          .filter((d: string) => VALID_DEPARTMENTS.includes(d))
      : [],
    maxActionsPerRun:
      typeof guardrails.maxActionsPerRun === "number" ? guardrails.maxActionsPerRun : 10,
    confirmationMessage:
      guardrails.confirmationMessage ?? "Are you sure you want to proceed?",
  };
}

function normalizeSteps(steps: any[]): any[] {
  return steps.map((step: any, index: number) => ({
    stepNumber: typeof step.stepNumber === "number" ? step.stepNumber : index + 1,
    action: normalizeAction(step.action),
    tool: normalizeTool(step.tool),
    description: step.description ?? "",
    config: step.config && typeof step.config === "object" ? step.config : {},
  }));
}

// ─── FIX: Sanitize clarifyingQuestions — always string[] ─────────────────────
function normalizeClarifyingQuestions(questions: any): string[] {
  if (!Array.isArray(questions)) return [];
  return questions
    .map((q: any) => {
      if (typeof q === "string") return q.trim();
      if (typeof q === "object" && q !== null) {
        // Handle {question: "..."}, {text: "..."}, {content: "..."} etc.
        return String(
          q.question ?? q.text ?? q.content ?? q.value ?? q.q ?? JSON.stringify(q)
        ).trim();
      }
      return String(q).trim();
    })
    .filter((q) => q.length > 0);
}

const SYSTEM_PROMPT = `
You are AgentForge Builder. Convert a user's natural language description into a strict JSON object.

CRITICAL RULES:
1. steps[].action MUST be exactly one of:
   READ_EMAIL | SEND_EMAIL | POST_SLACK | READ_SHEET | WRITE_SHEET | SEARCH_WEB | CLASSIFY | SUMMARISE | DRAFT | UPDATE_CRM | READ_TICKETS | REPLY_TICKET | ESCALATE

2. steps[].tool MUST be exactly one of:
   gmail | slack | sheets | hubspot | freshdesk | llm

3. trigger.cronSchedule must be a cron string like "0 9 * * 1" or null
4. trigger.humanReadable must be a plain English string
5. guardrails.maxActionsPerRun must be a number
6. guardrails.dataAccessScope must only contain: SALES | HR | MARKETING | FINANCE | SUPPORT
7. tools array must only contain: gmail | slack | sheets | hubspot | freshdesk
8. clarifyingQuestions MUST be an array of plain strings only — like ["question 1", "question 2"]
   NEVER use objects like [{question: "..."}] — only plain strings

Output schema:
{
  "agentName": string,
  "department": "SALES"|"HR"|"MARKETING"|"FINANCE"|"SUPPORT",
  "summary": string,
  "trigger": {
    "type": "MANUAL"|"SCHEDULED"|"WEBHOOK",
    "cronSchedule": null,
    "humanReadable": "Run manually"
  },
  "tools": ["gmail"|"slack"|"sheets"|"hubspot"|"freshdesk"],
  "steps": [
    {
      "stepNumber": 1,
      "action": "CLASSIFY",
      "tool": "llm",
      "description": "what this step does",
      "config": {}
    }
  ],
  "knowledgeBaseNeeded": false,
  "guardrails": {
    "requireApprovalBefore": [],
    "dataAccessScope": [],
    "maxActionsPerRun": 10,
    "confirmationMessage": "Are you sure you want to proceed?"
  },
  "clarifyingQuestions": ["plain string question 1", "plain string question 2"],
  "readyToDeploy": true
}

Return ONLY valid JSON. No markdown. No explanation. No code blocks.
`.trim();

export async function interpretDescription(
  description: string,
  answers?: string[]
): Promise<AgentDefinition> {
  const llm = new ChatOllama({
    baseUrl: envOptional("OLLAMA_BASE_URL") ?? "http://localhost:11434",
    model: envOptional("OLLAMA_MODEL") ?? "deepseek-r1:7b",
    temperature: 0.2,
    format: "json",
  });

  const userContent =
    answers && answers.length > 0
      ? `User description:\n${description}\n\nAdditional answers:\n${answers.map((a, i) => `${i + 1}. ${a}`).join("\n")}`
      : `User description:\n${description}`;

  const resp = await llm.invoke([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userContent },
  ]);

  const text = String(resp.content).trim();

  let raw: any;
  try {
    raw = JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("LLM did not return valid JSON");
    raw = JSON.parse(match[0]);
  }

  // Normalize all fields
  if (Array.isArray(raw.steps)) {
    raw.steps = normalizeSteps(raw.steps);
  } else {
    raw.steps = [];
  }

  raw.trigger = normalizeTrigger(raw.trigger);
  raw.guardrails = normalizeGuardrails(raw.guardrails);
  raw.guardrails.dataAccessScope = [];

  raw.tools = Array.isArray(raw.tools)
    ? raw.tools
        .map((t: any) => normalizeTool(String(t)))
        .filter((t: string) => INTEGRATION_TOOLS.includes(t))
    : [];

  // ─── FIX: Always sanitize clarifyingQuestions to string[] ────────────────
  raw.clarifyingQuestions = normalizeClarifyingQuestions(raw.clarifyingQuestions);

  raw.knowledgeBaseNeeded = raw.knowledgeBaseNeeded ?? false;
  raw.readyToDeploy = raw.readyToDeploy ?? false;
  raw.agentName = raw.agentName ?? "Unnamed Agent";
  raw.summary = raw.summary ?? description.substring(0, 100);
  raw.department = VALID_DEPARTMENTS.includes(raw.department) ? raw.department : "SALES";

  const parsed = AgentDefinitionSchema.parse(raw);
  return parsed;
}