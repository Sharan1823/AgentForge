import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";
import { envOptional } from "../env";
import { HttpError } from "../errors";

const JWT_SECRET = envOptional("JWT_SECRET") ?? "agentforge-local-secret";

function tokenFromRequest(req: Request): string | null {
  const header = req.header("authorization")?.replace("Bearer ", "");
  if (header) return header;
  const cookieToken = req.cookies?.token;
  return typeof cookieToken === "string" ? cookieToken : null;
}

export async function auth(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = tokenFromRequest(req);
    if (!token) throw new HttpError(401, "UNAUTHENTICATED", "Unauthorized — no token provided");

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) throw new HttpError(401, "UNAUTHENTICATED", "User not found");

    req.user = user;
    next();
  } catch (_e) {
    next(new HttpError(401, "UNAUTHENTICATED", "Invalid or expired token"));
  }
}

