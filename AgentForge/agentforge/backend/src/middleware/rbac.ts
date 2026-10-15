import type { NextFunction, Request, Response } from "express";
import type { Department, Role } from "../../generated/prisma-client";
import { HttpError } from "../errors";

const TOOL_ACCESS: Record<Department, Set<string>> = {
  SALES: new Set(["gmail", "sheets", "hubspot", "slack", "llm"]),
  HR: new Set(["gmail", "sheets", "slack", "llm"]),
  MARKETING: new Set(["gmail", "sheets", "slack", "llm"]),
  FINANCE: new Set(["gmail", "sheets", "slack", "llm"]),
  SUPPORT: new Set(["freshdesk", "slack", "gmail", "sheets", "llm"]),
};

export function requireDepartment(dept: Department) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const u = req.user;
    if (!u) return next(new HttpError(401, "UNAUTHENTICATED", "Missing user"));
    if (u.role === "ADMIN") return next();
    if (u.department !== dept) {
      return next(new HttpError(403, "FORBIDDEN", "Cross-department access denied"));
    }
    next();
  };
}

export function requireRole(roles: Role[]) {
  const allowed = new Set(roles);
  return (req: Request, _res: Response, next: NextFunction) => {
    const u = req.user;
    if (!u) return next(new HttpError(401, "UNAUTHENTICATED", "Missing user"));
    if (allowed.has(u.role)) return next();
    next(new HttpError(403, "FORBIDDEN", "Insufficient role"));
  };
}

export function assertToolAllowedForUser(user: { department: Department; role: Role }, tool: string) {
  if (user.role === "ADMIN") return;
  const allowed = TOOL_ACCESS[user.department];
  if (!allowed?.has(tool)) {
    throw new HttpError(403, "TOOL_FORBIDDEN", `Tool not allowed for department: ${tool}`, {
      department: user.department,
      tool,
    });
  }
}

