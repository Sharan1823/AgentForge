export type Run = {
  id: string;
  status: string;
  startedAt: string;
  endedAt: string | null;
  output: string | null;
  logs: unknown[];
  pendingAction?: unknown;
};

export function RunHistory({ runs, onApprove, onDeny }: { runs: Run[]; onApprove: (runId: string) => void; onDeny: (runId: string) => void }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="font-display text-lg">Run history</div>
      <div className="text-white/60 text-sm mt-1">Latest runs with logs and approval status.</div>
      {runs.length === 0 ? (
        <div className="mt-4 text-white/60">No runs yet.</div>
      ) : (
        <div className="mt-4 space-y-3">
          {runs.map((r) => (
            <div key={r.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm">
                    <span className="font-display">{r.status}</span>{" "}
                    <span className="text-white/60">• {new Date(r.startedAt).toLocaleString()}</span>
                  </div>
                  {r.output ? <div className="text-white/70 text-sm mt-1">{r.output}</div> : null}
                </div>
                {r.status === "WAITING_APPROVAL" ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-accent/20 border border-accent/40 text-sm"
                      onClick={() => onApprove(r.id)}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-sm"
                      onClick={() => onDeny(r.id)}
                    >
                      Deny
                    </button>
                  </div>
                ) : null}
              </div>
              <details className="mt-3">
                <summary className="cursor-pointer text-white/60 text-sm">Logs</summary>
                <pre className="mt-2 text-xs bg-black/30 border border-white/10 rounded-2xl p-3 overflow-auto">
                  {JSON.stringify(r.logs, null, 2)}
                </pre>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

