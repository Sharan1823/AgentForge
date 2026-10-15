import { z } from "zod";

export const DepartmentSchema = z.enum(["SALES", "HR", "MARKETING", "FINANCE", "SUPPORT"]);
export type Department = z.infer<typeof DepartmentSchema>;

export const RoleSchema = z.enum(["EMPLOYEE", "MANAGER", "ADMIN"]);
export type Role = z.infer<typeof RoleSchema>;

export const AgentStatusSchema = z.enum(["DRAFT", "ACTIVE", "PAUSED"]);
export type AgentStatus = z.infer<typeof AgentStatusSchema>;

export const TriggerTypeSchema = z.enum(["MANUAL", "SCHEDULED", "WEBHOOK"]);
export type TriggerType = z.infer<typeof TriggerTypeSchema>;

export const RunStatusSchema = z.enum(["RUNNING", "SUCCESS", "FAILED", "WAITING_APPROVAL"]);
export type RunStatus = z.infer<typeof RunStatusSchema>;

export const ToolSchema = z.enum(["gmail", "slack", "sheets", "hubspot", "freshdesk"]);
export type Tool = z.infer<typeof ToolSchema>;

export const StepActionSchema = z.enum([
  "READ_EMAIL",
  "SEND_EMAIL",
  "POST_SLACK",
  "READ_SHEET",
  "WRITE_SHEET",
  "SEARCH_WEB",
  "CLASSIFY",
  "SUMMARISE",
  "DRAFT",
  "UPDATE_CRM",
  "READ_TICKETS",
  "REPLY_TICKET",
  "ESCALATE",
]);
export type StepAction = z.infer<typeof StepActionSchema>;

export const StepToolSchema = z.enum(["gmail", "slack", "sheets", "hubspot", "freshdesk", "llm"]);
export type StepTool = z.infer<typeof StepToolSchema>;

export const TriggerSchema = z.object({
  type: TriggerTypeSchema,
  cronSchedule: z.string().nullable(),
  humanReadable: z.string(),
});
export type Trigger = z.infer<typeof TriggerSchema>;

export const GuardrailsSchema = z.object({
  requireApprovalBefore: z.array(StepActionSchema),
  dataAccessScope: z.array(DepartmentSchema),
  maxActionsPerRun: z.number().int().positive(),
  confirmationMessage: z.string(),
});
export type Guardrails = z.infer<typeof GuardrailsSchema>;

export const AgentStepSchema = z.object({
  stepNumber: z.number().int().positive(),
  action: StepActionSchema,
  tool: StepToolSchema,
  description: z.string(),
  config: z.record(z.string(), z.unknown()),
});
export type AgentStep = z.infer<typeof AgentStepSchema>;

export const AgentDefinitionSchema = z.object({
  agentName: z.string(),
  department: DepartmentSchema,
  summary: z.string(),
  trigger: TriggerSchema,
  tools: z.array(ToolSchema),
  steps: z.array(AgentStepSchema).min(1),
  knowledgeBaseNeeded: z.boolean(),
  guardrails: GuardrailsSchema,
  clarifyingQuestions: z.array(z.string()),
  readyToDeploy: z.boolean(),
});
export type AgentDefinition = z.infer<typeof AgentDefinitionSchema>;

export type AgentRunLogEntry = {
  timestamp: string;
  stepNumber?: number;
  action?: StepAction;
  tool?: StepTool;
  message: string;
  data?: unknown;
};

