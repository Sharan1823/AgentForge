import { Router } from "express";
import { z } from "zod";
import { parseAgentIntent, executeAgentStep } from "../services/llmService";
import { auth } from "../middleware/auth";

export const agentRouter = Router();

agentRouter.post("/build", auth, async (req, res, next) => {
  try {
    const { prompt } = z.object({ prompt: z.string().min(5) }).parse(req.body);
    const agentConfig = await parseAgentIntent(prompt);
    res.json({ agent: agentConfig });
  } catch (e) {
    next(e);
  }
});

agentRouter.post("/run", auth, async (req, res, next) => {
  try {
    const { agentName, step, context } = z
      .object({
        agentName: z.string(),
        step: z.string(),
        context: z.record(z.unknown()).default({}),
      })
      .parse(req.body);

    const result = await executeAgentStep(agentName, step, context);
    res.json({ result });
  } catch (e) {
    next(e);
  }
});

