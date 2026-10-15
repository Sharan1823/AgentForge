import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, normalizeApiError, type ApiError } from "../lib/api";
import { KnowledgeBaseUpload } from "../components/KnowledgeBaseUpload";
import { RunHistory, type Run } from "../components/RunHistory";
import { useAuthStore } from "../store/authStore";

type Agent = {
  id: string;
  name: string;
  description: string;
  status: string;
  department: string;
  definition: unknown;
  guardrails: unknown;
};

export default function AgentDetailPage() {
  const { id } = useParams();
  const token = useAuthStore((s) => s.token);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  async function refresh() {
    if (!token || !id) return;
    setLoading(true);
    setError(null);
    try {
      const [a, r] = await Promise.all([
        api.get(`/api/agents/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
        api.get(`/api/execute/${id}/runs`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setAgent((a.data as { agent: Agent }).agent);
      setRuns((r.data as { runs: Run[] }).runs);
    } catch (e) {
      setError(normalizeApiError(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, id]);

  async function runNow() {
    if (!token || !id) return;
    await api.post(`/api/execute/${id}/run`, { triggeredBy: "manual" }, { headers: { Authorization: `Bearer ${token}` } });
    await refresh();
  }

  async function approve(runId: string) {
    if (!token) return;
    await api.post(`/api/execute/runs/${runId}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } });
    await refresh();
  }

  async function deny(runId: string) {
    if (!token) return;
    await api.post(`/api/execute/runs/${runId}/deny`, {}, { headers: { Authorization: `Bearer ${token}` } });
    await refresh();
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="text-white/70 hover:text-white transition">
            ← Back
          </Link>
          {token && id ? (
            <button onClick={() => void runNow()} className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/90 transition">
              Run now
            </button>
          ) : null}
        </div>

        {loading ? (
          <div className="text-white/60">Loading…</div>
        ) : error ? (
          <div className="text-red-200/90">Error: {error.message}</div>
        ) : agent ? (
          <>
            <div className="glass rounded-2xl p-6">
              <div className="font-display text-3xl">{agent.name}</div>
              <div className="text-white/60 mt-1">{agent.description}</div>
              <pre className="mt-5 text-xs bg-black/30 border border-white/10 rounded-2xl p-4 overflow-auto">
                {JSON.stringify({ department: agent.department, status: agent.status }, null, 2)}
              </pre>
            </div>
            {token ? <KnowledgeBaseUpload token={token} agentId={agent.id} onDone={() => void refresh()} /> : null}
            <RunHistory runs={runs} onApprove={approve} onDeny={deny} />
          </>
        ) : (
          <div className="text-white/60">Agent not found.</div>
        )}
      </div>
    </div>
  );
}

