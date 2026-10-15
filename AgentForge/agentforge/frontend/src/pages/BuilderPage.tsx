import { useEffect, useMemo, useState } from "react";
import { BuilderChat } from "../components/BuilderChat";
import { WorkflowVisualizer } from "../components/WorkflowVisualizer";
import { DepartmentSelector, type Department } from "../components/DepartmentSelector";
import { api, normalizeApiError, type ApiError } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function BuilderPage() {
  const token = useAuthStore((s) => s.token);
  const [definition, setDefinition] = useState<unknown>(null);
  const [department, setDepartment] = useState<Department>("SALES");
  const [name, setName] = useState("New Agent");
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const nav = useNavigate();

  const canDeploy = useMemo(() => Boolean(token && definition && name.trim().length > 0), [token, definition, name]);

  async function deploy() {
    if (!token || !definition) return;
    setDeploying(true);
    setError(null);
    try {
      const res = await api.post(
        "/api/builder/deploy",
        {
          name,
          description: "Built with AgentForge Builder",
          department,
          definition,
          trigger: "MANUAL",
          cronSchedule: null,
          tools: [],
          guardrails: (definition as { guardrails?: unknown })?.guardrails ?? {},
          knowledgeNeeded: (definition as { knowledgeBaseNeeded?: boolean })?.knowledgeBaseNeeded ?? false,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const agentId = (res.data as { agent: { id: string } }).agent.id;
      nav(`/agents/${agentId}`);
    } catch (e) {
      setError(normalizeApiError(e));
    } finally {
      setDeploying(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-display text-3xl">Builder</div>
            <div className="text-white/60 mt-1">Describe → interpret → confirm → deploy.</div>
          </div>
          <Link to="/" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            Back to dashboard
          </Link>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="font-display text-lg">Confirm</div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-white/60 text-sm">Agent name</div>
              <input
                className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-accent/40"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div className="text-white/60 text-sm">Department</div>
              <div className="mt-2">
                <DepartmentSelector value={department} onChange={setDepartment} />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => void deploy()}
              disabled={!canDeploy || deploying}
              className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/90 disabled:opacity-50 transition"
            >
              {deploying ? "Deploying…" : "Deploy"}
            </button>
            {error ? <div className="text-red-200/90 text-sm">Error: {error.message}</div> : null}
          </div>
        </div>

        {token ? <BuilderChat token={token} onDefinition={setDefinition} /> : <div className="text-white/60">Loading…</div>}
        {definition ? <WorkflowVisualizer definition={definition} /> : null}
      </div>
    </div>
  );
}

