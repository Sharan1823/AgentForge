import { useState } from "react";
import { api, normalizeApiError, type ApiError } from "../lib/api";

export function KnowledgeBaseUpload({ token, agentId, onDone }: { token: string; agentId: string; onDone: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function upload() {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      await api.post(`/api/knowledge/${agentId}/upload`, fd, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDone();
      setFile(null);
    } catch (e) {
      setError(normalizeApiError(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="font-display text-lg">Knowledge base</div>
      <div className="text-white/60 text-sm mt-1">Upload PDF/DOCX/CSV to power RAG during execution.</div>
      <div className="mt-4 flex flex-col gap-3">
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button
          type="button"
          onClick={() => void upload()}
          disabled={!file || loading}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition disabled:opacity-50 w-fit"
        >
          {loading ? "Uploading…" : "Upload"}
        </button>
        {error ? <div className="text-red-200/90 text-sm">Error: {error.message}</div> : null}
      </div>
    </div>
  );
}

