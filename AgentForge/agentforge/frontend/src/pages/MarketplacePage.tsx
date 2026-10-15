import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, normalizeApiError, type ApiError } from "../lib/api";

type Template = {
  id: string;
  name: string;
  description: string;
  department: string;
  tools: string[];
};

export default function MarketplacePage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/api/marketplace");
        setTemplates((res.data as { templates: Template[] }).templates);
      } catch (e) {
        setError(normalizeApiError(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-display text-3xl">Marketplace</div>
            <div className="text-white/60 mt-1">Public agent templates seeded into the database.</div>
          </div>
          <Link to="/" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            Back
          </Link>
        </div>

        {loading ? (
          <div className="text-white/60">Loading…</div>
        ) : error ? (
          <div className="text-red-200/90">Error: {error.message}</div>
        ) : templates.length === 0 ? (
          <div className="text-white/60">No templates found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((t) => (
              <div key={t.id} className="glass rounded-2xl p-5">
                <div className="font-display text-lg">{t.name}</div>
                <div className="text-white/60 text-sm mt-1">{t.description}</div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
                  <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">{t.department}</span>
                  {t.tools.map((tool) => (
                    <span key={tool} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

