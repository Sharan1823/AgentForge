export class HttpError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function asError(err: unknown): Error {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : "Unknown error");
}

