import { PrismaClient } from "../../generated/prisma-client";

declare global {
  // eslint-disable-next-line no-var
  var __prismaClient: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  globalThis.__prismaClient ??
  new PrismaClient({
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalThis.__prismaClient = prisma;

