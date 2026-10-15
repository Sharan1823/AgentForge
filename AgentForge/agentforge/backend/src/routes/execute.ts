import { Router } from "express";
import { z } from "zod";
import { auth } from "../middleware/auth";
import { validateBody } from "../validation";
import { prisma } from "../db/prisma";
import { HttpError } from "../errors";
import { executeAgent } from "../services/agentExecutor";
import { approveAction, denyAction } from "../services/guardrailService";
import { verifyEmailConfig } from "../services/emailService";

export const executeRouter = Router();

executeRouter.post(
  "/:agentId/run",
  auth,
  validateBody(z.object({ triggeredBy: z.string().default("manual") })),
  async (req, res, next) => {
    try {
      const u = req.user!;
      const agent = await prisma.agent.findUnique({ where: { id: String(req.params.agentId) } });
      if (!agent) throw new HttpError(404, "NOT_FOUND", "Agent not found");
      if (u.role !== "ADMIN" && agent.companyId !== u.companyId) {
        throw new HttpError(403, "FORBIDDEN", "Cross-company access denied");
      }

      // Fire and return the latest run after start.
      void executeAgent(agent.id, (req.body as { triggeredBy: string }).triggeredBy);
      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },
);

executeRouter.get("/:agentId/runs", auth, async (req, res, next) => {
  try {
    const u = req.user!;
    const agent = await prisma.agent.findUnique({ where: { id: String(req.params.agentId) } });
    if (!agent) throw new HttpError(404, "NOT_FOUND", "Agent not found");
    if (u.role !== "ADMIN" && agent.companyId !== u.companyId) {
      throw new HttpError(403, "FORBIDDEN", "Cross-company access denied");
    }
    const runs = await prisma.agentRun.findMany({
      where: { agentId: agent.id },
      orderBy: { startedAt: "desc" },
      take: 50,
      include: { pendingAction: true },
    });
    res.json({ runs });
  } catch (e) {
    next(e);
  }
});

executeRouter.post(
  "/runs/:runId/approve",
  auth,
  async (req, res, next) => {
    try {
      const u = req.user!;
      const run = await prisma.agentRun.findUnique({
        where: { id: String(req.params.runId) },
        include: { agent: true },
      });
      if (!run) throw new HttpError(404, "NOT_FOUND", "Run not found");
      if (u.role !== "ADMIN" && run.agent.companyId !== u.companyId) {
        throw new HttpError(403, "FORBIDDEN", "Cross-company access denied");
      }
      await approveAction(run.id);
      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },
);

executeRouter.post(
  "/runs/:runId/deny",
  auth,
  async (req, res, next) => {
    try {
      const u = req.user!;
      const run = await prisma.agentRun.findUnique({
        where: { id: String(req.params.runId) },
        include: { agent: true },
      });
      if (!run) throw new HttpError(404, "NOT_FOUND", "Run not found");
      if (u.role !== "ADMIN" && run.agent.companyId !== u.companyId) {
        throw new HttpError(403, "FORBIDDEN", "Cross-company access denied");
      }
      await denyAction(run.id);
      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },
);

// Email configuration verification endpoint
executeRouter.post("/email/verify", auth, async (req, res, next) => {
  try {
    const isValid = await verifyEmailConfig();
    res.json({ 
      valid: isValid,
      message: isValid ? "Email configuration is valid" : "Email configuration is invalid"
    });
  } catch (e) {
    next(e);
  }
});

