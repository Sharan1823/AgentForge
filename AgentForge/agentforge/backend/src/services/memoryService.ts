import { prisma } from "../db/prisma";

export async function loadMemory(agentId: string): Promise<Record<string, string>> {
  const rows = await prisma.agentMemory.findMany({ where: { agentId } });
  const out: Record<string, string> = {};
  for (const r of rows) out[r.key] = r.value;
  return out;
}

export async function saveMemory(agentId: string, key: string, value: string): Promise<void> {
  await prisma.agentMemory.upsert({
    where: { agentId_key: { agentId, key } },
    update: { value },
    create: { agentId, key, value },
  });
}

export async function clearMemory(agentId: string): Promise<void> {
  await prisma.agentMemory.deleteMany({ where: { agentId } });
}

