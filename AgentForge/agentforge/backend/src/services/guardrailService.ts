import { PendingActionStatus, RunStatus } from "../../generated/prisma-client";
import { HttpError } from "../errors";
import { prisma } from "../db/prisma";

export type GuardrailDecision =
  | { allowed: true; needsApproval: false }
  | { allowed: true; needsApproval: true; pendingActionId: string }
  | { allowed: false; needsApproval: false; reason: string };

export async function checkGuardrail(opts: {
  runId: string;
  action: string;
  message: string;
  requireApprovalBefore: string[];
}): Promise<GuardrailDecision> {
  const { runId, action, message, requireApprovalBefore } = opts;
  const needsApproval = requireApprovalBefore.includes(action);
  if (!needsApproval) return { allowed: true, needsApproval: false };

  const pending = await prisma.pendingAction.upsert({
    where: { runId },
    update: { action, message, status: PendingActionStatus.PENDING },
    create: { runId, action, message, status: PendingActionStatus.PENDING },
  });

  await prisma.agentRun.update({
    where: { id: runId },
    data: { status: RunStatus.WAITING_APPROVAL },
  });

  return { allowed: true, needsApproval: true, pendingActionId: pending.id };
}

export async function approveAction(runId: string): Promise<void> {
  const pending = await prisma.pendingAction.findUnique({ where: { runId } });
  if (!pending) throw new HttpError(404, "NOT_FOUND", "No pending action for run");

  await prisma.pendingAction.update({
    where: { id: pending.id },
    data: { status: PendingActionStatus.APPROVED },
  });
}

export async function denyAction(runId: string): Promise<void> {
  const pending = await prisma.pendingAction.findUnique({ where: { runId } });
  if (!pending) throw new HttpError(404, "NOT_FOUND", "No pending action for run");

  await prisma.pendingAction.update({
    where: { id: pending.id },
    data: { status: PendingActionStatus.DENIED },
  });
}

export async function waitForApproval(runId: string, pollMs = 1500, timeoutMs = 5 * 60 * 1000) {
  const start = Date.now();
  // Simple polling (executor-side). In prod this could be websockets.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const pending = await prisma.pendingAction.findUnique({ where: { runId } });
    if (!pending) return { status: "missing" as const };
    if (pending.status === PendingActionStatus.APPROVED) return { status: "approved" as const };
    if (pending.status === PendingActionStatus.DENIED) return { status: "denied" as const };

    if (Date.now() - start > timeoutMs) return { status: "timeout" as const };
    await new Promise((r) => setTimeout(r, pollMs));
  }
}

