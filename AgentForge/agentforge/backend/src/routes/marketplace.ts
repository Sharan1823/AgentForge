import { Router } from "express";
import { prisma } from "../db/prisma";

export const marketplaceRouter = Router();

marketplaceRouter.get("/", async (_req, res, next) => {
  try {
    const templates = await prisma.agent.findMany({
      where: { isPublic: true },
      orderBy: { updatedAt: "desc" },
      take: 50,
    });
    res.json({ templates });
  } catch (e) {
    next(e);
  }
});

