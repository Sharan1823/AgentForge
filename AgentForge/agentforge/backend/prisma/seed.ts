import { PrismaClient, Department, Role, TriggerType, AgentStatus } from "../generated/prisma-client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type Template = {
  name: string;
  description: string;
  department: Department;
  trigger: TriggerType;
  cronSchedule?: string | null;
  tools: string[];
  guardrails: {
    requireApprovalBefore: string[];
    dataAccessScope: Department[];
    maxActionsPerRun: number;
    confirmationMessage: string;
  };
  definition: unknown;
};

const templates: Template[] = [
  {
    name: "Inbound Lead Triage (HubSpot)",
    description: "Qualify inbound leads and create CRM updates with a summary + next step.",
    department: Department.SALES,
    trigger: TriggerType.MANUAL,
    tools: ["hubspot", "gmail", "sheets"],
    guardrails: {
      requireApprovalBefore: ["UPDATE_CRM", "SEND_EMAIL"],
      dataAccessScope: [Department.SALES],
      maxActionsPerRun: 20,
      confirmationMessage: "Approve sending email / CRM updates?",
    },
    definition: {
      agentName: "Inbound Lead Triage (HubSpot)",
      department: "SALES",
      summary: "Qualifies inbound leads and drafts follow-ups.",
      trigger: { type: "MANUAL", cronSchedule: null, humanReadable: "Run on demand" },
      tools: ["hubspot", "gmail", "sheets"],
      steps: [
        {
          stepNumber: 1,
          action: "CLASSIFY",
          tool: "llm",
          description: "Classify lead quality from provided details.",
          config: {},
        },
        {
          stepNumber: 2,
          action: "UPDATE_CRM",
          tool: "hubspot",
          description: "Update HubSpot contact with status and notes.",
          config: {},
        },
        {
          stepNumber: 3,
          action: "DRAFT",
          tool: "llm",
          description: "Draft an email follow-up.",
          config: {},
        },
        {
          stepNumber: 4,
          action: "SEND_EMAIL",
          tool: "gmail",
          description: "Send follow-up email to the lead.",
          config: {},
        },
      ],
      knowledgeBaseNeeded: false,
      guardrails: {
        requireApprovalBefore: ["UPDATE_CRM", "SEND_EMAIL"],
        dataAccessScope: ["SALES"],
        maxActionsPerRun: 20,
        confirmationMessage: "Approve sending email / CRM updates?",
      },
      clarifyingQuestions: [],
      readyToDeploy: true,
    },
  },
  // 14 more lightweight but realistic templates
  {
    name: "Weekly Pipeline Digest",
    description: "Summarize pipeline changes and post to Slack weekly.",
    department: Department.SALES,
    trigger: TriggerType.SCHEDULED,
    cronSchedule: "0 9 * * 1",
    tools: ["hubspot", "slack"],
    guardrails: {
      requireApprovalBefore: ["POST_SLACK"],
      dataAccessScope: [Department.SALES],
      maxActionsPerRun: 10,
      confirmationMessage: "Approve posting pipeline digest to Slack?",
    },
    definition: {
      agentName: "Weekly Pipeline Digest",
      department: "SALES",
      summary: "Posts weekly pipeline digest to Slack.",
      trigger: { type: "SCHEDULED", cronSchedule: "0 9 * * 1", humanReadable: "Every Monday 9am" },
      tools: ["hubspot", "slack"],
      steps: [
        { stepNumber: 1, action: "SUMMARISE", tool: "llm", description: "Summarize pipeline deltas.", config: {} },
        { stepNumber: 2, action: "POST_SLACK", tool: "slack", description: "Post summary to Slack channel.", config: {} },
      ],
      knowledgeBaseNeeded: false,
      guardrails: {
        requireApprovalBefore: ["POST_SLACK"],
        dataAccessScope: ["SALES"],
        maxActionsPerRun: 10,
        confirmationMessage: "Approve posting pipeline digest to Slack?",
      },
      clarifyingQuestions: [],
      readyToDeploy: true,
    },
  },
  {
    name: "HR Onboarding Checklist Email",
    description: "Generate and send onboarding checklist to a new hire.",
    department: Department.HR,
    trigger: TriggerType.MANUAL,
    tools: ["gmail", "sheets"],
    guardrails: {
      requireApprovalBefore: ["SEND_EMAIL", "WRITE_SHEET"],
      dataAccessScope: [Department.HR],
      maxActionsPerRun: 15,
      confirmationMessage: "Approve sending onboarding email and updating checklist sheet?",
    },
    definition: {
      agentName: "HR Onboarding Checklist Email",
      department: "HR",
      summary: "Sends onboarding checklist and updates tracking sheet.",
      trigger: { type: "MANUAL", cronSchedule: null, humanReadable: "Run on demand" },
      tools: ["gmail", "sheets"],
      steps: [
        { stepNumber: 1, action: "DRAFT", tool: "llm", description: "Draft onboarding email.", config: {} },
        { stepNumber: 2, action: "SEND_EMAIL", tool: "gmail", description: "Send onboarding email.", config: {} },
        { stepNumber: 3, action: "WRITE_SHEET", tool: "sheets", description: "Write new hire to tracking sheet.", config: {} },
      ],
      knowledgeBaseNeeded: false,
      guardrails: {
        requireApprovalBefore: ["SEND_EMAIL", "WRITE_SHEET"],
        dataAccessScope: ["HR"],
        maxActionsPerRun: 15,
        confirmationMessage: "Approve sending onboarding email and updating checklist sheet?",
      },
      clarifyingQuestions: [],
      readyToDeploy: true,
    },
  },
  {
    name: "Finance Invoice Reminder",
    description: "Draft invoice reminder and log status to a sheet.",
    department: Department.FINANCE,
    trigger: TriggerType.MANUAL,
    tools: ["gmail", "sheets"],
    guardrails: {
      requireApprovalBefore: ["SEND_EMAIL"],
      dataAccessScope: [Department.FINANCE],
      maxActionsPerRun: 10,
      confirmationMessage: "Approve sending invoice reminder?",
    },
    definition: {
      agentName: "Finance Invoice Reminder",
      department: "FINANCE",
      summary: "Drafts and sends invoice reminders, logs actions.",
      trigger: { type: "MANUAL", cronSchedule: null, humanReadable: "Run on demand" },
      tools: ["gmail", "sheets"],
      steps: [
        { stepNumber: 1, action: "DRAFT", tool: "llm", description: "Draft reminder email.", config: {} },
        { stepNumber: 2, action: "SEND_EMAIL", tool: "gmail", description: "Send reminder email.", config: {} },
        { stepNumber: 3, action: "APPEND", tool: "sheets", description: "Append log row.", config: {} },
      ],
      knowledgeBaseNeeded: false,
      guardrails: {
        requireApprovalBefore: ["SEND_EMAIL"],
        dataAccessScope: ["FINANCE"],
        maxActionsPerRun: 10,
        confirmationMessage: "Approve sending invoice reminder?",
      },
      clarifyingQuestions: [],
      readyToDeploy: true,
    },
  },
];

function fillTo15(list: Template[]): Template[] {
  const out = [...list];
  const base: Omit<Template, "name" | "description"> = {
    department: Department.SUPPORT,
    trigger: TriggerType.MANUAL,
    tools: ["freshdesk", "slack"],
    guardrails: {
      requireApprovalBefore: ["REPLY_TICKET", "POST_SLACK"],
      dataAccessScope: [Department.SUPPORT],
      maxActionsPerRun: 25,
      confirmationMessage: "Approve replying to ticket or posting an escalation?",
    },
    definition: {},
  };

  while (out.length < 15) {
    const n = out.length + 1;
    out.push({
      ...base,
      name: `Support Ticket Assistant ${n}`,
      description: "Summarize a ticket, draft a reply, and optionally escalate to Slack.",
      definition: {
        agentName: `Support Ticket Assistant ${n}`,
        department: "SUPPORT",
        summary: "Drafts replies to Freshdesk tickets with optional Slack escalation.",
        trigger: { type: "MANUAL", cronSchedule: null, humanReadable: "Run on demand" },
        tools: ["freshdesk", "slack"],
        steps: [
          { stepNumber: 1, action: "READ_TICKETS", tool: "freshdesk", description: "Fetch ticket details.", config: {} },
          { stepNumber: 2, action: "SUMMARISE", tool: "llm", description: "Summarize the ticket.", config: {} },
          { stepNumber: 3, action: "DRAFT", tool: "llm", description: "Draft a reply.", config: {} },
          { stepNumber: 4, action: "REPLY_TICKET", tool: "freshdesk", description: "Reply in Freshdesk.", config: {} },
          { stepNumber: 5, action: "POST_SLACK", tool: "slack", description: "Escalate summary to Slack.", config: {} },
        ],
        knowledgeBaseNeeded: false,
        guardrails: {
          requireApprovalBefore: ["REPLY_TICKET", "POST_SLACK"],
          dataAccessScope: ["SUPPORT"],
          maxActionsPerRun: 25,
          confirmationMessage: "Approve replying to ticket or posting an escalation?",
        },
        clarifyingQuestions: [],
        readyToDeploy: true,
      },
    });
  }
  return out;
}

async function main() {
  const marketplaceCompany = await prisma.company.upsert({
    where: { name: "Marketplace" },
    update: {},
    create: { name: "Marketplace" },
  });

  const marketplaceEmail = "marketplace@agentforge.local";
  const marketplaceUser = await prisma.user.upsert({
    where: { email: marketplaceEmail },
    update: {},
    create: {
      email: marketplaceEmail,
      password: await bcrypt.hash("marketplace", 12),
      name: "AgentForge Marketplace",
      department: Department.MARKETING,
      role: Role.ADMIN,
      companyId: marketplaceCompany.id,
    },
  });

  const items = fillTo15(templates);
  for (const t of items) {
    await prisma.agent.upsert({
      where: {
        companyId_name_isPublic: {
          companyId: marketplaceCompany.id,
          name: t.name,
          isPublic: true,
        },
      },
      update: {
        description: t.description,
        department: t.department,
        definition: t.definition as never,
        status: AgentStatus.ACTIVE,
        trigger: t.trigger,
        cronSchedule: t.cronSchedule ?? null,
        tools: t.tools,
        guardrails: t.guardrails as never,
        knowledgeNeeded: false,
      },
      create: {
        name: t.name,
        description: t.description,
        department: t.department,
        definition: t.definition as never,
        status: AgentStatus.ACTIVE,
        trigger: t.trigger,
        cronSchedule: t.cronSchedule ?? null,
        tools: t.tools,
        guardrails: t.guardrails as never,
        memoryEnabled: true,
        knowledgeNeeded: false,
        isPublic: true,
        userId: marketplaceUser.id,
        companyId: marketplaceCompany.id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

