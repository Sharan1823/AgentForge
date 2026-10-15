import { useState } from "react";
import { api, normalizeApiError, type ApiError } from "../lib/api";
import type { Department } from "./DepartmentSelector";

type BuilderResult = { definition: unknown } | null;

export function BuilderChat({
  token,
  onDefinition,
}: {
  token: string;
  onDefinition: (d: unknown) => void;
}) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [result, setResult] = useState<BuilderResult>(null);

  async function interpret() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post(
        "/api/builder/interpret",
        { description },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const r = res.data as { definition: unknown };
      setResult(r);
      onDefinition(r.definition);
    } catch (e) {
      setError(normalizeApiError(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="font-display text-lg">Describe your agent</div>
      <div className="text-white/60 text-sm mt-1">
        Write what you want the agent to do. We’ll interpret it into steps and guardrails.
      </div>

      <textarea
        className="mt-4 w-full min-h-[140px] rounded-2xl bg-white/5 border border-white/10 p-4 outline-none focus:border-accent/40"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Example: Every Monday, summarize new inbound leads from HubSpot and post a digest to Slack..."
      />

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => void interpret()}
          disabled={loading || description.trim().length === 0}
          className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/90 disabled:opacity-50 transition"
        >
          {loading ? "Interpreting…" : "Interpret"}
        </button>
        {error ? <div className="text-red-200/90 text-sm">Error: {error.message}</div> : null}
      </div>

      {result ? (
        <pre className="mt-5 text-xs bg-black/30 border border-white/10 rounded-2xl p-4 overflow-auto">
          {JSON.stringify(result.definition, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

export type DeployInput = {
  name: string;
  description: string;
  department: Department;
  definition: unknown;
  trigger: "MANUAL" | "SCHEDULED" | "WEBHOOK";
  cronSchedule?: string | null;
  tools: string[];
  guardrails: unknown;
  knowledgeNeeded: boolean;
};

