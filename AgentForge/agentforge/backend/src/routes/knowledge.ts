import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { auth } from "../middleware/auth";
import { prisma } from "../db/prisma";
import { HttpError } from "../errors";
import { uploadDocument } from "../services/ragService";

export const knowledgeRouter = Router();

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

knowledgeRouter.post("/:agentId/upload", auth, upload.single("file"), async (req, res, next) => {
  try {
    const u = req.user!;
    const agent = await prisma.agent.findUnique({ where: { id: String(req.params.agentId) } });
    if (!agent) throw new HttpError(404, "NOT_FOUND", "Agent not found");
    if (u.role !== "ADMIN" && agent.companyId !== u.companyId) {
      throw new HttpError(403, "FORBIDDEN", "Cross-company access denied");
    }
    if (!req.file) throw new HttpError(400, "MISSING_FILE", "Missing file upload");

    const upsert = await uploadDocument(agent.id, req.file.path, req.file.originalname);

    const kb = await prisma.knowledgeBase.create({
      data: {
        agentId: agent.id,
        fileName: req.file.originalname,
        fileUrl: req.file.path,
        vectorNamespace: `agent-${agent.id}`,
      },
    });

    await prisma.agent.update({ where: { id: agent.id }, data: { knowledgeNeeded: true } });

    res.json({ knowledgeBase: kb, upsert });
  } catch (e) {
    next(e);
  }
});

knowledgeRouter.get("/:agentId", auth, async (req, res, next) => {
  try {
    const u = req.user!;
    const agent = await prisma.agent.findUnique({ where: { id: String(req.params.agentId) } });
    if (!agent) throw new HttpError(404, "NOT_FOUND", "Agent not found");
    if (u.role !== "ADMIN" && agent.companyId !== u.companyId) {
      throw new HttpError(403, "FORBIDDEN", "Cross-company access denied");
    }

    const knowledgeBases = await prisma.knowledgeBase.findMany({
      where: { agentId: agent.id },
      orderBy: { createdAt: "desc" },
    });
    res.json({ knowledgeBases });
  } catch (e) {
    next(e);
  }
});

