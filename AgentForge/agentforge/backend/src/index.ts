process.env.OTEL_SDK_DISABLED = "true";
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { z } from "zod";
import { logger } from "./logger";
import { requestLogging } from "./middleware/requestLogging";
import { HttpError, asError } from "./errors";
import { upload } from "./upload";
import { authRouter } from "./routes/auth";
import { builderRouter } from "./routes/builder";
import { agentsRouter } from "./routes/agents";
import { executeRouter } from "./routes/execute";
import { knowledgeRouter } from "./routes/knowledge";
import { marketplaceRouter } from "./routes/marketplace";
import { suggestionsRouter } from "./routes/suggestions";
import { agentRouter } from "./routes/agent";
import chatRouter from "./routes/chat";
import agentCreatorRouter from "./routes/agentCreator";
import pdfRouter from "./routes/pdf";
import linkedinRouter from "./routes/linkedin";
import { cleanupStuckRuns } from "./services/agentExecutor";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:5173";
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (origin === FRONTEND_URL) return cb(null, true);
      if (/^http:\/\/localhost:\d+$/.test(origin)) return cb(null, true);
      if (/^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogging);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRouter);
app.use("/api/builder", builderRouter);
app.use("/api/agents", agentsRouter);
app.use("/api/execute", executeRouter);
app.use("/api/knowledge", knowledgeRouter);
app.use("/api/marketplace", marketplaceRouter);
app.use("/api/suggestions", suggestionsRouter);
app.use("/api/agent", agentRouter);
app.use("/api/chat", chatRouter);
app.use("/api/agent-creator", agentCreatorRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/linkedin", linkedinRouter);

app.use((req, _res, next) => {
  next(new HttpError(404, "NOT_FOUND", `No route for ${req.method} ${req.path}`));
});

app.use((err: unknown, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const e = err instanceof HttpError ? err : null;
  const status = e?.status ?? 500;
  const code = e?.code ?? "INTERNAL_ERROR";
  const message = e?.message ?? "Internal server error";
  const details = e?.details;

  const extra =
    err instanceof z.ZodError
      ? { issues: err.issues }
      : details
        ? { details }
        : undefined;

  logger.error("http_error", {
    requestId: req.requestId,
    status,
    code,
    message,
    extra,
    error: asError(err).message,
  });

  res.status(status).json({ error: { code, message, ...extra } });
});

const port = Number(process.env.PORT ?? 8080);

app.listen(port, "0.0.0.0", async () => {
  logger.info("backend_listening", { port, frontendUrl: FRONTEND_URL });
  try {
    await cleanupStuckRuns();
  } catch (error) {
    logger.error("startup_cleanup_failed", { error: error instanceof Error ? error.message : String(error) });
  }
});