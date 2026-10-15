import { Router } from "express";
import { auth } from "../middleware/auth";
import { prisma } from "../db/prisma";
import { validateBody } from "../validation";
import { z } from "zod";

export const suggestionsRouter = Router();

suggestionsRouter.get("/", auth, async (req, res, next) => {
  try {
    const u = req.user!;
    const suggestions = await prisma.suggestion.findMany({
      where: { companyId: u.companyId, dismissed: false },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    res.json({ suggestions });
  } catch (e) {
    next(e);
  }
});

suggestionsRouter.post(
  "/:id/dismiss",
  auth,
  validateBody(z.object({ dismissed: z.boolean().default(true) })),
  async (req, res, next) => {
    try {
      const u = req.user!;
      const s = await prisma.suggestion.findUnique({ where: { id: String(req.params.id) } });
      if (!s) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Suggestion not found" } });
      if (s.companyId !== u.companyId) return res.status(403).json({ error: { code: "FORBIDDEN", message: "Forbidden" } });
      const updated = await prisma.suggestion.update({
        where: { id: s.id },
        data: { dismissed: (req.body as { dismissed: boolean }).dismissed },
      });
      res.json({ suggestion: updated });
    } catch (e) {
      next(e);
    }
  },
);

