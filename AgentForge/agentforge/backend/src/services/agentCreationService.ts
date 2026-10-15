import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { AgentDefinitionSchema, ToolSchema, StepActionSchema, StepToolSchema } from "@agentforge/shared";
import { envOptional } from "../env";
import { logger } from "../logger";

export interface AgentCreationRequest {
  description: string;
  context?: string;
  previousMessages?: Array<{role: string; content: string}>;
}

export interface AgentTemplate {
  name: string;
  description: string;
  category: "SALES" | "HR" | "MARKETING" | "FINANCE" | "SUPPORT";
  steps: AgentStepTemplate[];
  tools: string[];
  triggers: string[];
  relevance?: number;
}

export interface AgentStepTemplate {
  name: string;
  action: string;
  tool: string;
  description: string;
  config?: Record<string, any>;
}

export interface ParsedAgentDefinition {
  agentName: string;
  department: "SALES" | "HR" | "MARKETING" | "FINANCE" | "SUPPORT";
  summary: string;
  description: string;
  tools: string[];
  steps: any[];
  trigger: {
    type: "MANUAL" | "SCHEDULED" | "WEBHOOK";
    cronSchedule: string | null;
    humanReadable: string;
  };
  guardrails: {
    requireApprovalBefore: string[];
    dataAccessScope: string[];
    maxActionsPerRun: number;
    confirmationMessage: string;
  };
  knowledgeBaseNeeded: boolean;
  clarifyingQuestions: string[];
  readyToDeploy: boolean;
}

const model = new ChatOllama({
  baseUrl: envOptional("OLLAMA_BASE_URL") ?? "http://localhost:11434",
  model: envOptional("OLLAMA_MODEL") ?? "deepseek-r1:7b",
  temperature: 0.3,
});

// Agent templates for common use cases
const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    name: "Sales Lead Follow-up",
    description: "Automatically follows up with new leads, sends personalized emails, and updates CRM",
    category: "SALES",
    steps: [
      {
        name: "Research Lead",
        action: "SEARCH_WEB",
        tool: "llm",
        description: "Research lead company and contact information"
      },
      {
        name: "Compose Email",
        action: "SEND_EMAIL",
        tool: "gmail",
        description: "Draft personalized follow-up email",
        config: { template: "follow_up" }
      },
      {
        name: "Update CRM",
        action: "UPDATE_CRM",
        tool: "hubspot",
        description: "Update lead status in CRM system"
      }
    ],
    tools: ["gmail", "hubspot", "llm"],
    triggers: ["manual", "scheduled"]
  },
  {
    name: "HR Resume Screener",
    description: "Screens resumes, ranks candidates, and schedules interviews",
    category: "HR",
    steps: [
      {
        name: "Analyze Resume",
        action: "CLASSIFY",
        tool: "llm",
        description: "Analyze resume against job requirements"
      },
      {
        name: "Email Candidate",
        action: "SEND_EMAIL",
        tool: "gmail",
        description: "Send interview invitation or rejection"
      },
      {
        name: "Update ATS",
        action: "UPDATE_CRM",
        tool: "hubspot",
        description: "Update candidate status in applicant tracking"
      }
    ],
    tools: ["gmail", "hubspot", "llm"],
    triggers: ["manual"]
  },
  {
    name: "Social Media Poster",
    description: "Creates and schedules content for social media platforms",
    category: "MARKETING",
    steps: [
      {
        name: "Generate Content",
        action: "DRAFT",
        tool: "llm",
        description: "Generate social media content based on topic"
      },
      {
        name: "Post to Instagram",
        action: "POST_SLACK",
        tool: "slack",
        description: "Post content to Instagram via webhook"
      },
      {
        name: "Post to LinkedIn",
        action: "POST_SLACK", 
        tool: "slack",
        description: "Share professional content on LinkedIn"
      }
    ],
    tools: ["slack", "llm"],
    triggers: ["scheduled", "manual"]
  },
  {
    name: "Finance Invoice Processor",
    description: "Processes invoices, sends payment reminders, and updates accounting records",
    category: "FINANCE",
    steps: [
      {
        name: "Extract Invoice Data",
        action: "READ_SHEET",
        tool: "sheets",
        description: "Extract invoice details from spreadsheet"
      },
      {
        name: "Send Payment Reminder",
        action: "SEND_EMAIL",
        tool: "gmail",
        description: "Send automated payment reminder emails"
      },
      {
        name: "Update Accounting",
        action: "UPDATE_CRM",
        tool: "hubspot",
        description: "Update financial records"
      }
    ],
    tools: ["gmail", "sheets", "hubspot", "llm"],
    triggers: ["scheduled"]
  },
  {
    name: "Support Ticket Triage",
    description: "Categorizes support tickets, suggests responses, and escalates when needed",
    category: "SUPPORT",
    steps: [
      {
        name: "Analyze Ticket",
        action: "CLASSIFY",
        tool: "llm",
        description: "Analyze ticket content and categorize urgency"
      },
      {
        name: "Suggest Response",
        action: "DRAFT",
        tool: "llm",
        description: "Generate appropriate response based on ticket type"
      },
      {
        name: "Update Ticket",
        action: "UPDATE_CRM",
        tool: "freshdesk",
        description: "Update ticket status and add notes"
      },
      {
        name: "Escalate if Needed",
        action: "ESCALATE",
        tool: "freshdesk",
        description: "Escalate high-priority tickets"
      }
    ],
    tools: ["freshdesk", "llm"],
    triggers: ["manual", "webhook"]
  }
];

// Convert natural language description to structured agent definition
export async function parseNaturalLanguageToAgent(request: AgentCreationRequest): Promise<ParsedAgentDefinition> {
  const systemPrompt = `You are an expert AI agent architect. Convert the user's description into a structured agent definition.

User Description: ${request.description}
${request.context ? `Additional Context: ${request.context}` : ''}

Return a JSON object with this exact structure:
{
  "agentName": "Short descriptive name",
  "department": "SALES|HR|MARKETING|FINANCE|SUPPORT",
  "summary": "One-line summary of what this agent does",
  "description": "Detailed description of agent capabilities",
  "tools": ["gmail", "sheets", "hubspot", "slack", "freshdesk", "llm"],
  "steps": [
    {
      "stepNumber": 1,
      "action": "ACTION_NAME",
      "tool": "TOOL_NAME", 
      "description": "What this step does",
      "config": {}
    }
  ],
  "trigger": {
    "type": "MANUAL|SCHEDULED|WEBHOOK",
    "cronSchedule": null or "0 9 * * 1" for weekly,
    "humanReadable": "Run manually"
  },
  "guardrails": {
    "requireApprovalBefore": ["SEND_EMAIL", "UPDATE_CRM"],
    "dataAccessScope": [],
    "maxActionsPerRun": 10,
    "confirmationMessage": "Are you sure you want to proceed?"
  },
  "knowledgeBaseNeeded": true,
  "clarifyingQuestions": [],
  "readyToDeploy": true
}

Guidelines:
- Choose the most appropriate department based on the description
- Break down complex workflows into clear, sequential steps
- Include appropriate tools for each step
- Set reasonable guardrails for the agent type
- Make steps specific and actionable
- Return ONLY valid JSON, no explanation`;

  const messages = [
    new SystemMessage(systemPrompt),
    new HumanMessage(`Create an agent based on this description: ${request.description}`)
  ];

  try {
    const response = await model.invoke(messages);
    const content = typeof response.content === "string" ? response.content : JSON.stringify(response.content);
    
    // Try to extract JSON from response
    let parsed: ParsedAgentDefinition;
    try {
      parsed = JSON.parse(content);
    } catch {
      // Look for JSON in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse agent definition from LLM response");
      }
    }

    // Validate and sanitize the parsed definition
    return {
      agentName: parsed.agentName || "New Agent",
      department: parsed.department || "SUPPORT",
      summary: parsed.summary || request.description.substring(0, 100),
      description: parsed.description || request.description,
      tools: Array.isArray(parsed.tools) 
        ? parsed.tools.map((tool: string) => {
            // Map string tools to valid ToolSchema enum values
            const validTools = ["gmail", "slack", "sheets", "hubspot", "freshdesk", "llm"];
            return validTools.includes(tool) ? tool as any : "llm";
          })
        : ["llm"],
      steps: Array.isArray(parsed.steps) 
        ? parsed.steps.map((step: any, index: number) => ({
            stepNumber: index + 1,
            action: step.action || "DRAFT",
            tool: step.tool || "llm",
            description: step.description || "Process step",
            config: step.config || {}
          }))
        : [{
            stepNumber: 1,
            action: "DRAFT",
            tool: "llm",
            description: "Process user request",
            config: {}
          }],
      trigger: {
        type: parsed.trigger?.type || "MANUAL",
        cronSchedule: parsed.trigger?.cronSchedule || null,
        humanReadable: parsed.trigger?.humanReadable || "Run manually"
      },
      guardrails: {
        requireApprovalBefore: Array.isArray(parsed.guardrails?.requireApprovalBefore) 
          ? parsed.guardrails.requireApprovalBefore.filter((action: string) => {
              // Map string actions to valid StepActionSchema enum values
              const validActions = ["READ_EMAIL", "SEND_EMAIL", "POST_SLACK", "READ_SHEET", "WRITE_SHEET", "SEARCH_WEB", "CLASSIFY", "SUMMARISE", "DRAFT", "UPDATE_CRM", "READ_TICKETS", "REPLY_TICKET", "ESCALATE"];
              return validActions.includes(action) ? action as any : "DRAFT";
            })
          : ["SEND_EMAIL"],
        dataAccessScope: Array.isArray(parsed.guardrails?.dataAccessScope) 
          ? parsed.guardrails.dataAccessScope 
          : [],
        maxActionsPerRun: typeof parsed.guardrails?.maxActionsPerRun === "number" 
          ? parsed.guardrails.maxActionsPerRun 
          : 10,
        confirmationMessage: parsed.guardrails?.confirmationMessage || "Are you sure you want to proceed?"
      },
      knowledgeBaseNeeded: Boolean(parsed.knowledgeBaseNeeded),
      clarifyingQuestions: Array.isArray(parsed.clarifyingQuestions) 
        ? parsed.clarifyingQuestions 
        : [],
      readyToDeploy: Boolean(parsed.readyToDeploy)
    };

  } catch (error) {
    logger.error("agent_creation_failed", { 
      error: error instanceof Error ? error.message : String(error),
      description: request.description 
    });
    
    // Return a basic fallback definition
    return {
      agentName: "New Agent",
      department: "SUPPORT",
      summary: request.description.substring(0, 100),
      description: request.description,
      tools: ["llm"],
      steps: [{
        stepNumber: 1,
        action: "DRAFT",
        tool: "llm",
        description: "Process user request",
        config: {}
      }],
      trigger: {
        type: "MANUAL",
        cronSchedule: null,
        humanReadable: "Run manually"
      },
      guardrails: {
        requireApprovalBefore: ["SEND_EMAIL"],
        dataAccessScope: [],
        maxActionsPerRun: 10,
        confirmationMessage: "Are you sure you want to proceed?"
      },
      knowledgeBaseNeeded: true,
      clarifyingQuestions: [],
      readyToDeploy: true
    };
  }
}

// Suggest agent templates based on user input
export async function suggestAgentTemplates(query: string): Promise<AgentTemplate[]> {
  const systemPrompt = `You are an AI assistant that suggests relevant agent templates.

User Query: ${query}

Available Templates:
${AGENT_TEMPLATES.map(t => `- ${t.name} (${t.category}): ${t.description}`).join('\n')}

Return a JSON array of template objects that best match the query. 
Include a "relevance" score (0-1) for each template.
Return ONLY the JSON array.`;

  const messages = [
    new SystemMessage(systemPrompt),
    new HumanMessage(`I need: ${query}`)
  ];

  try {
    const response = await model.invoke(messages);
    const content = typeof response.content === "string" ? response.content : JSON.stringify(response.content);
    
    let suggestions: AgentTemplate[] = [];
    try {
      suggestions = JSON.parse(content);
    } catch {
      // Fallback: return all templates with default relevance
      suggestions = AGENT_TEMPLATES.map(template => ({
        ...template,
        relevance: 0.5
      }));
    }

    return suggestions;
  } catch (error) {
    logger.error("template_suggestion_failed", { 
      error: error instanceof Error ? error.message : String(error),
      query 
    });
    return AGENT_TEMPLATES.map(template => ({
      ...template,
      relevance: 0.3
    }));
  }
}

// Get available agent templates
export function getAgentTemplates(): AgentTemplate[] {
  return AGENT_TEMPLATES;
}

// Validate agent definition
export function validateAgentDefinition(definition: ParsedAgentDefinition): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!definition.agentName || definition.agentName.trim() === '') {
    errors.push('Agent name is required');
  }
  
  if (!definition.description || definition.description.trim() === '') {
    errors.push('Agent description is required');
  }
  
  if (!definition.steps || definition.steps.length === 0) {
    errors.push('At least one step is required');
  }
  
  const validDepartments = ["SALES", "HR", "MARKETING", "FINANCE", "SUPPORT"];
  if (!validDepartments.includes(definition.department)) {
    errors.push('Invalid department');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
