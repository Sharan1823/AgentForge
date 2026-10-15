import { motion } from "framer-motion";
import { Bell, LayoutDashboard, Settings, Sparkles, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAgentsStore } from "../stores/useAgentsStore";
import { AgentCard } from "../components/AgentCard";
import { useAuthStore } from "../store/authStore";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { agents, loading, error, fetchAgents } = useAgentsStore();

  useEffect(() => {
    void (async () => {
      const t = useAuthStore.getState().token;
      if (t) await fetchAgents(t);
    })();
  }, [fetchAgents]);

  return (
    <div className="min-h-screen bg-bg text-white">
      <div className="sticky top-0 z-10 border-b border-white/10 bg-bg/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-xl tracking-tight">
            AgentForge
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
              <Bell size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="glass rounded-2xl p-4 h-fit">
          <nav className="space-y-1">
            <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5" to="/">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5" to="/build">
              <Sparkles size={18} />
              Build Agent
            </Link>
            <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5" to="/marketplace">
              <Store size={18} />
              Marketplace
            </Link>
            <Link className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5" to="/settings">
              <Settings size={18} />
              Settings
            </Link>
          </nav>
        </aside>

        <main className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="font-display text-3xl">
              Good morning, {user?.name ?? "there"}. Your agents are working.
            </div>
            <div className="text-white/60 mt-1">Manage your agents, runs, approvals, and knowledge base.</div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Agents", value: "—" },
              { label: "Runs Today", value: "—" },
              { label: "Success Rate", value: "—" },
              { label: "Time Saved", value: "—" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4">
                <div className="text-white/60 text-sm">{s.label}</div>
                <div className="font-display text-2xl mt-1">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-display text-xl">Your agents</div>
                <div className="text-white/60 mt-1 text-sm">Runs, logs, approvals, and knowledge base are per-agent.</div>
              </div>
              <Link to="/build" className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/90 transition inline-flex gap-2">
                <Sparkles size={18} />
                Build agent
              </Link>
            </div>

            {loading ? (
              <div className="mt-6 text-white/60">Loading agents…</div>
            ) : error ? (
              <div className="mt-6 text-red-200/90">Error: {error.message}</div>
            ) : agents.length === 0 ? (
              <div className="mt-6 text-white/60">No agents yet. Create one in the Builder.</div>
            ) : (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {agents.map((a) => (
                  <AgentCard key={a.id} agent={a} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

