import { Router } from "express";
import { z } from "zod";
import { register, login, getUserFromToken } from "../services/authService";
import { DepartmentSchema } from "@agentforge/shared";

export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    // #region agent log
    try {
      globalThis
        .fetch?.("http://127.0.0.1:7366/ingest/665fa03a-1caf-4192-ab18-5ca6348340d5", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "0641d8" },
          body: JSON.stringify({
            sessionId: "0641d8",
            runId: "pre-fix",
            hypothesisId: "H1",
            location: "backend/src/routes/auth.ts:register:entry",
            message: "auth register request received",
            data: {
              hasBody: !!req.body,
              bodyKeys: req.body && typeof req.body === "object" ? Object.keys(req.body) : null,
            },
            timestamp: Date.now(),
          }),
        })
        .catch(() => {});
    } catch {}
    // #endregion agent log

    const body = z
      .object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1),
        department: DepartmentSchema,
        companyName: z.string().min(1),
      })
      .parse(req.body);

    // #region agent log
    try {
      globalThis
        .fetch?.("http://127.0.0.1:7366/ingest/665fa03a-1caf-4192-ab18-5ca6348340d5", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "0641d8" },
          body: JSON.stringify({
            sessionId: "0641d8",
            runId: "pre-fix",
            hypothesisId: "H2",
            location: "backend/src/routes/auth.ts:register:validated",
            message: "auth register request validated",
            data: {
              nameLen: body.name.length,
              companyNameLen: body.companyName.length,
              department: body.department,
              passwordLen: body.password.length,
            },
            timestamp: Date.now(),
          }),
        })
        .catch(() => {});
    } catch {}
    // #endregion agent log

    const result = await register(body);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const body = z.object({ email: z.string().email(), password: z.string().min(1) }).parse(req.body);
    const result = await login(body);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

authRouter.get("/me", async (req, res, next) => {
  try {
    const token = req.header("authorization")?.replace("Bearer ", "") ?? req.cookies?.token;
    if (!token) return res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "No token" } });
    const user = await getUserFromToken(token);
    res.json({ user });
  } catch (e) {
    next(e);
  }
});

authRouter.post("/logout", (_req, res) => {
  res.json({ success: true });
});

