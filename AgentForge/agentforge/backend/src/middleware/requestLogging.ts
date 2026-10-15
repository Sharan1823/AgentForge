import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { logger } from "../logger";

export function requestLogging(req: Request, res: Response, next: NextFunction) {
  const requestId = req.header("x-request-id") ?? randomUUID();
  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  const start = Date.now();
  res.on("finish", () => {
    const durationMs = Date.now() - start;
    logger.info("http_request", {
      requestId,
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs,
      userId: req.user?.id,
    });
  });

  next();
}

