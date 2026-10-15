import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";
import { envOptional } from "../env";
import { HttpError } from "../errors";
import type { Department } from "../../generated/prisma-client";

const JWT_SECRET = envOptional("JWT_SECRET") ?? "agentforge-local-secret";

export type SafeUser = {
  id: string;
  email: string;
  name: string;
  department: Department;
  role: "EMPLOYEE" | "MANAGER" | "ADMIN";
  company: { id: string; name: string };
  createdAt: Date;
};

function signToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

function toSafeUser(user: {
  id: string;
  email: string;
  name: string;
  department: Department;
  role: "EMPLOYEE" | "MANAGER" | "ADMIN";
  company: { id: string; name: string };
  createdAt: Date;
}): SafeUser {
  return user;
}

export async function register(params: {
  email: string;
  password: string;
  name: string;
  department: Department;
  companyName: string;
}) {
  const { email, password, name, department, companyName } = params;

  // #region agent log
  try {
    globalThis
      .fetch?.("http://127.0.0.1:7366/ingest/665fa03a-1caf-4192-ab18-5ca6348340d5", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "0641d8" },
        body: JSON.stringify({
          sessionId: "0641d8",
          runId: "pre-fix",
          hypothesisId: "H3",
          location: "backend/src/services/authService.ts:register:begin",
          message: "authService.register begin",
          data: { department, nameLen: name.length, companyNameLen: companyName.length, passwordLen: password.length },
          timestamp: Date.now(),
        }),
      })
      .catch(() => {});
  } catch {}
  // #endregion agent log

  let existing: { id: string } | null = null;
  try {
    existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  } catch (err) {
    // #region agent log
    try {
      globalThis
        .fetch?.("http://127.0.0.1:7366/ingest/665fa03a-1caf-4192-ab18-5ca6348340d5", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "0641d8" },
          body: JSON.stringify({
            sessionId: "0641d8",
            runId: "pre-fix",
            hypothesisId: "H4",
            location: "backend/src/services/authService.ts:register:findUnique:error",
            message: "prisma.user.findUnique threw",
            data: { name: (err as any)?.name, code: (err as any)?.code, message: String((err as any)?.message ?? err) },
            timestamp: Date.now(),
          }),
        })
        .catch(() => {});
    } catch {}
    // #endregion agent log
    throw err;
  }
  if (existing) throw new HttpError(400, "EMAIL_EXISTS", "Email already registered");

  const company =
    (await prisma.company.findFirst({ where: { name: companyName } })) ??
    (await prisma.company.create({ data: { name: companyName } }));

  const hashed = await bcrypt.hash(password, 12);
  let user: any;
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        department,
        companyId: company.id,
      },
      include: { company: { select: { id: true, name: true } } },
    });
  } catch (err) {
    // #region agent log
    try {
      globalThis
        .fetch?.("http://127.0.0.1:7366/ingest/665fa03a-1caf-4192-ab18-5ca6348340d5", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "0641d8" },
          body: JSON.stringify({
            sessionId: "0641d8",
            runId: "pre-fix",
            hypothesisId: "H5",
            location: "backend/src/services/authService.ts:register:createUser:error",
            message: "prisma.user.create threw",
            data: { name: (err as any)?.name, code: (err as any)?.code, message: String((err as any)?.message ?? err) },
            timestamp: Date.now(),
          }),
        })
        .catch(() => {});
    } catch {}
    // #endregion agent log
    throw err;
  }

  const token = signToken(user.id);
  return { user: toSafeUser(user), token };
}

export async function login(params: { email: string; password: string }) {
  const { email, password } = params;
  const user = await prisma.user.findUnique({
    where: { email },
    include: { company: { select: { id: true, name: true } } },
  });
  if (!user) throw new HttpError(401, "NO_ACCOUNT", "No account found with this email");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new HttpError(401, "BAD_PASSWORD", "Incorrect password");

  const token = signToken(user.id);
  return { user: toSafeUser(user), token };
}

export async function getUserFromToken(token: string): Promise<SafeUser> {
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    include: { company: { select: { id: true, name: true } } },
  });
  if (!user) throw new HttpError(401, "USER_NOT_FOUND", "User not found");
  return toSafeUser(user);
}

