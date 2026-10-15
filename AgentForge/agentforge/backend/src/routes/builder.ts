import { Router } from "express";
import { z } from "zod";
import { auth } from "../middleware/auth";
import { validateBody } from "../validation";
import { interpretDescription } from "../services/agentBuilder";
import { prisma } from "../db/prisma";

export const builderRouter = Router();

builderRouter.post(
  "/interpret",
  auth,
  validateBody(
    z.object({
      description: z.string().min(1),
      answers: z.array(z.string()).optional(),
    }),
  ),
  async (req, res, next) => {
    try {
      const { description, answers } = req.body as { description: string; answers?: string[] };
      const definition = await interpretDescription(description, answers);
      res.json({ definition });
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({
          code: "VALIDATION_ERROR",
          error: e.issues,
        });
      }
      next(e);
    }
  },
);

builderRouter.post(
  "/deploy",
  auth,
  validateBody(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      department: z.enum(["SALES", "HR", "MARKETING", "FINANCE", "SUPPORT"]),
      definition: z.unknown(),
      trigger: z.enum(["MANUAL", "SCHEDULED", "WEBHOOK"]),
      cronSchedule: z.string().nullable().optional(),
      tools: z.array(z.string()).default([]),
      guardrails: z.unknown(),
      knowledgeNeeded: z.boolean().default(false),
    }),
  ),
  async (req, res, next) => {
    try {
      const u = req.user!;
      const body = req.body as {
        name: string;
        description: string;
        department: "SALES" | "HR" | "MARKETING" | "FINANCE" | "SUPPORT";
        definition: unknown;
        trigger: "MANUAL" | "SCHEDULED" | "WEBHOOK";
        cronSchedule?: string | null;
        tools: string[];
        guardrails: unknown;
        knowledgeNeeded: boolean;
      };

      const agent = await prisma.agent.upsert({
        where: {
          companyId_name_isPublic: {
            companyId: u.companyId,
            name: body.name,
            isPublic: false,
          },
        },
        update: {
          description: body.description,
          department: body.department,
          definition: body.definition as never,
          status: "ACTIVE",
          trigger: body.trigger,
          cronSchedule: body.cronSchedule ?? null,
          tools: body.tools as never,
          guardrails: body.guardrails as never,
          memoryEnabled: true,
          knowledgeNeeded: body.knowledgeNeeded,
          userId: u.id,
        },
        create: {
          name: body.name,
          description: body.description,
          department: body.department,
          definition: body.definition as never,
          status: "ACTIVE",
          trigger: body.trigger,
          cronSchedule: body.cronSchedule ?? null,
          tools: body.tools as never,
          guardrails: body.guardrails as never,
          memoryEnabled: true,
          knowledgeNeeded: body.knowledgeNeeded,
          isPublic: false,
          userId: u.id,
          companyId: u.companyId,
        },
      });

      res.json({ agent });
    } catch (e) {
      next(e);
    }
  },
);

