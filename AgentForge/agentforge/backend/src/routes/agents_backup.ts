import { Router } from "express";
import { z } from "zod";
import { auth } from "../middleware/auth";
import { validateBody } from "../validation";
import { prisma } from "../db/prisma";
import { HttpError } from "../errors";
import { logger } from "../logger";

export const agentsRouter = Router();

agentsRouter.get("/", auth, async (req, res, next) => {
  try {
    const u = req.user!;
    const agents = await prisma.agent.findMany({
      where: { companyId: u.companyId, isPublic: false },
      include: {
        runs: {
          orderBy: { startedAt: 'desc' },
          take: 1,
        },
        _count: {
          select: { runs: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    // Transform the data to match frontend expectations
    const transformedAgents = agents.map(agent => ({
      id: agent.id,
      name: agent.name,
      description: agent.description,
      department: agent.department,
      status: agent.status,
      createdAt: agent.createdAt,
      updatedAt: agent.updatedAt,
      trigger: agent.trigger,
      tools: Array.isArray(agent.tools) ? agent.tools : [],
      runCount: agent._count.runs,
      lastRun: agent.runs[0] ? {
        id: agent.runs[0].id,
        status: agent.runs[0].status,
        startedAt: agent.runs[0].startedAt,
        endedAt: agent.runs[0].endedAt,
      } : undefined,
    }));

    res.json({ agents: transformedAgents });
  } catch (e) {
    next(e);
  }
});

agentsRouter.get("/:id", auth, async (req, res, next) => {
  try {
    const u = req.user!;
    const agent = await prisma.agent.findUnique({ 
      where: { id: String(req.params.id) },
      include: {
        runs: {
          orderBy: { startedAt: 'desc' },
          take: 5,
        },
        _count: {
          select: { runs: true },
        },
      },
    });
    if (!agent) throw new HttpError(404, "NOT_FOUND", "Agent not found");
    if (u.role !== "ADMIN" && agent.companyId !== u.companyId) {
      throw new HttpError(403, "FORBIDDEN", "Cross-company access denied");
    }

    const transformedAgent = {
      id: agent.id,
      name: agent.name,
      description: agent.description,
      department: agent.department,
      status: agent.status,
      createdAt: agent.createdAt,
      updatedAt: agent.updatedAt,
      trigger: agent.trigger,
      tools: Array.isArray(agent.tools) ? agent.tools : [],
      definition: agent.definition,
      guardrails: agent.guardrails,
      memoryEnabled: agent.memoryEnabled,
      knowledgeNeeded: agent.knowledgeNeeded,
      cronSchedule: agent.cronSchedule,
      runCount: agent._count.runs,
      runs: agent.runs.map(run => ({
        id: run.id,
        status: run.status,
        startedAt: run.startedAt,
        endedAt: run.endedAt,
      })),
    };

    res.json({ agent: transformedAgent });
  } catch (e) {
    next(e);
  }
});

agentsRouter.get("/:id/runs", auth, async (req, res, next) => {
  try {
    const u = req.user!;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const agent = await prisma.agent.findUnique({ 
      where: { id: String(req.params.id) } 
    });
    if (!agent) throw new HttpError(404, "NOT_FOUND", "Agent not found");
    if (u.role !== "ADMIN" && agent.companyId !== u.companyId) {
      throw new HttpError(403, "FORBIDDEN", "Cross-company access denied");
    }

    const runs = await prisma.agentRun.findMany({
      where: { agentId: agent.id },
      orderBy: { startedAt: 'desc' },
      take: limit,
      skip: offset,
    });

    res.json({ runs });
  } catch (e) {
    next(e);
  }
});

agentsRouter.post("/:id/run", auth, async (req, res, next) => {
  try {
    const u = req.user!;
    const agent = await prisma.agent.findUnique({ 
      where: { id: String(req.params.id) } 
    });
    if (!agent) throw new HttpError(404, "NOT_FOUND", "Agent not found");
    if (u.role !== "ADMIN" && agent.companyId !== u.companyId) {
      throw new HttpError(403, "FORBIDDEN", "Cross-company access denied");
    }

    if (agent.status !== 'ACTIVE') {
      throw new HttpError(400, "BAD_REQUEST", "Agent must be active to run");
    }

    // Create a new run
    const run = await prisma.agentRun.create({
      data: {
        agentId: agent.id,
        status: 'PENDING' as any, // Temporary fix for type issue
        logs: [], // Add missing required field
        triggeredBy: u.id,
      },
    });

    logger.info('agent_run_started', { 
      agentId: agent.id, 
      runId: run.id, 
      userId: u.id 
    });

    // TODO: Queue the agent for execution
    // This would integrate with your existing agent execution system

    res.json({ 
      success: true, 
      runId: run.id,
      message: 'Agent execution started' 
    });
  } catch (e) {
    next(e);
  }
});

agentsRouter.post("/:id/clone", auth, async (req, res, next) => {
  try {
    const u = req.user!;
    const agent = await prisma.agent.findUnique({ 
      where: { id: String(req.params.id) } 
    });
    if (!agent) throw new HttpError(404, "NOT_FOUND", "Agent not found");
    if (u.role !== "ADMIN" && agent.companyId !== u.companyId) {
      throw new HttpError(403, "FORBIDDEN", "Cross-company access denied");
    }

    // Create a cloned version
    const clonedAgent = await prisma.agent.create({
      data: {
        name: `${agent.name} (Clone)`,
        description: agent.description,
        department: agent.department,
        definition: agent.definition as any, // Cast to any to bypass type check
        status: 'DRAFT',
        trigger: agent.trigger,
        cronSchedule: agent.cronSchedule,
        tools: agent.tools as any, // Cast to any to bypass type check
        guardrails: agent.guardrails as any, // Cast to any to bypass type check
        memoryEnabled: agent.memoryEnabled,
        knowledgeNeeded: agent.knowledgeNeeded,
        isPublic: false,
        userId: u.id,
        companyId: u.companyId,
      },
    });

    logger.info('agent_cloned', { 
      originalAgentId: agent.id, 
      clonedAgentId: clonedAgent.id, 
      userId: u.id 
    });

    const transformedAgent = {
      id: clonedAgent.id,
      name: clonedAgent.name,
      description: clonedAgent.description,
      department: clonedAgent.department,
      status: clonedAgent.status,
      createdAt: clonedAgent.createdAt,
      updatedAt: clonedAgent.updatedAt,
      trigger: clonedAgent.trigger,
      tools: Array.isArray(clonedAgent.tools) ? clonedAgent.tools : [],
      runCount: 0,
    };

    res.json({ agent: transformedAgent });
  } catch (e) {
    next(e);
  }
});

agentsRouter.patch(
  "/:id",
  auth,
  validateBody(
    z
      .object({
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        status: z.enum(["DRAFT", "ACTIVE", "PAUSED"]).optional(),
        cronSchedule: z.string().nullable().optional(),
        tools: z.array(z.string()).optional(),
        guardrails: z.unknown().optional(),
        memoryEnabled: z.boolean().optional(),
        knowledgeNeeded: z.boolean().optional(),
      })
      .refine((o) => Object.keys(o).length > 0, { message: "No updates provided" }),
  ),
  async (req, res, next) => {
    try {
      const u = req.user!;
      const agent = await prisma.agent.findUnique({ where: { id: String(req.params.id) } });
      if (!agent) throw new HttpError(404, "NOT_FOUND", "Agent not found");
      if (u.role !== "ADMIN" && agent.companyId !== u.companyId) {
        throw new HttpError(403, "FORBIDDEN", "Cross-company access denied");
      }

    const agent: any = await prisma.agent.findUnique({ 
      where: { id: agentId },
      include: {
        runs: true,
        _count: {
          select: { runs: true },
        },
      },
    });
    
    if (!agent) {
      logger.warn('agent_delete_not_found', { 
        agentId, 
        userId: user.id 
      });
      return res.status(404).json({ 
        error: 'Agent not found' 
      });
    }
    
    if (user.role !== "ADMIN" && agent.companyId !== user.companyId) {
      logger.warn('agent_delete_access_denied', { 
        agentId, 
        userId: user.id,
        userRole: user.role,
        agentCompanyId: agent.companyId 
      });
      return res.status(403).json({ 
        error: 'Cross-company access denied' 
      });
    }

    // Delete related runs first
    if (agent._count.runs > 0) {
      try {
        await prisma.agentRun.deleteMany({
          where: { agentId: agent.id },
        });
        logger.info('agent_runs_deleted', { 
          agentId, 
          runCount: agent._count.runs 
        });
      } catch (runError: any) {
        logger.error('agent_runs_delete_failed', { 
          error: runError instanceof Error ? runError.message : String(runError),
          agentId 
        });
        // Continue with agent deletion even if runs deletion fails
      }
    }

    // Delete the agent
    try {
      await prisma.agent.delete({ where: { id: agent.id } });
      
      logger.info('agent_deleted', { 
        agentId, 
        runCount: agent._count.runs,
        userId: user.id 
      });

      res.json({ ok: true });
    } catch (deleteError: any) {
      logger.error('agent_delete_failed', { 
        error: deleteError instanceof Error ? deleteError.message : String(deleteError),
        agentId,
        userId: user.id 
      });
      
      res.status(500).json({ 
        error: 'Failed to delete agent' 
      });
    }
  } catch (e: any) {
  } catch (e) {
    logger.error('agent_delete_error', { 
      error: e instanceof Error ? e.message : String(e),
      agentId: String(req.params.id),
      userId: req.user?.id 
    });
    
    next(e);
  }
});
