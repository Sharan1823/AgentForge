import { api, normalizeApiError, type ApiError } from "../lib/api";
import { useState } from "react";

export function IntegrationConnector({
  token,
  title,
  description,
  onConnect,
  children,
}: {
  token: string;
  title: string;
  description: string;
  onConnect: () => Promise<void>;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-display text-lg">{title}</div>
          <div className="text-white/60 text-sm mt-1">{description}</div>
        </div>
        <button
          type="button"
          onClick={() => {
            void (async () => {
              setLoading(true);
              setError(null);
              try {
                await onConnect();
              } catch (e) {
                setError(normalizeApiError(e));
              } finally {
                setLoading(false);
              }
            })();
          }}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition disabled:opacity-50"
        >
          {loading ? "Opening…" : "Connect"}
        </button>
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
      {error ? <div className="mt-4 text-red-200/90 text-sm">Error: {error.message}</div> : null}
    </div>
  );
}

export async function startGoogle(token: string, kind: "gmail" | "sheets") {
  const res = await api.get(`/api/integrations/google/start?kind=${kind}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const url = (res.data as { url: string }).url;
  window.location.href = url;
}

export async function startSlack(token: string) {
  const res = await api.get(`/api/integrations/slack/start`, { headers: { Authorization: `Bearer ${token}` } });
  const url = (res.data as { url: string }).url;
  window.location.href = url;
}

export async function connectHubSpot(token: string, apiKey: string) {
  await api.post(
    "/api/integrations/hubspot/connect",
    { apiKey },
    { headers: { Authorization: `Bearer ${token}` } },
  );
}

export async function connectFreshdesk(token: string, domain: string, apiKey: string) {
  await api.post(
    "/api/integrations/freshdesk/connect",
    { domain, apiKey },
    { headers: { Authorization: `Bearer ${token}` } },
  );
}

