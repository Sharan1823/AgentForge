import { Queue, Worker } from "bullmq";
import { env } from "../env";
import { logger } from "../logger";
import { executeAgent } from "./agentExecutor";

function connection() {
  return { url: env("REDIS_URL") };
}

function getQueue() {
  return new Queue("agentforge-agent-runs", { connection: connection() });
}

export async function ensureWorker() {
  const worker = new Worker(
    "agentforge-agent-runs",
    async (job) => {
      const agentId = String(job.data.agentId);
      const trigger = String(job.data.trigger ?? "schedule");
      await executeAgent(agentId, trigger);
    },
    { connection: connection() },
  );

  worker.on("completed", (job) => logger.info("job_completed", { id: job.id, name: job.name }));
  worker.on("failed", (job, err) =>
    logger.error("job_failed", { id: job?.id, name: job?.name, error: err?.message }),
  );

  return worker;
}

export async function scheduleAgent(agentId: string, cron: string) {
  const agentQueue = getQueue();
  await agentQueue.add(
    "run",
    { agentId, trigger: "schedule" },
    {
      repeat: { pattern: cron },
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
    },
  );
}

export async function unscheduleAgent(agentId: string) {
  const agentQueue = getQueue();
  const repeats = await agentQueue.getRepeatableJobs();
  const toRemove = repeats.filter((r) => (r.id ?? "").includes(agentId) || (r.name ?? "").includes(agentId));
  for (const r of toRemove) {
    // eslint-disable-next-line no-await-in-loop
    await agentQueue.removeRepeatableByKey(r.key);
  }
}

