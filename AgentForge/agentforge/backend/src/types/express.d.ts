import type { User } from "../../generated/prisma-client";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Request {
      user?: User;
      requestId?: string;
    }
  }
}

export {};

