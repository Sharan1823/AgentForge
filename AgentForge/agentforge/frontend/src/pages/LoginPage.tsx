import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, normalizeApiError, type ApiError } from "../lib/api";
import { useAuthStore } from "../store/authStore";

const departments = ["Sales", "HR", "Marketing", "Finance", "Support"] as const;

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg width="38" height="38" viewBox="0 0 64 64" aria-hidden="true">
        <path
          d="M32 4 55 17v30L32 60 9 47V17L32 4Z"
          fill="none"
          stroke="rgba(108,99,255,0.9)"
          strokeWidth="3"
        />
        <path
          d="M32 12 48 21v22L32 52 16 43V21l16-9Z"
          fill="rgba(108,99,255,0.12)"
          stroke="rgba(108,99,255,0.55)"
          strokeWidth="2"
        />
      </svg>
      <div className="leading-tight">
        <div className="font-display text-2xl tracking-tight">AgentForge</div>
        <div className="text-xs text-white/60">No-code AI agents</div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [pillIdx, setPillIdx] = useState(0);
  const nav = useNavigate();
  const doLogin = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setPillIdx((p) => (p + 1) % departments.length), 1700);
    return () => window.clearInterval(id);
  }, []);

  const pills = useMemo(
    () =>
      departments.map((d, idx) => ({
        label: d,
        active: idx === pillIdx,
      })),
    [pillIdx]
  );

  return (
    <div className="min-h-screen bg-bg text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh" />

      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="glass rounded-3xl p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">
              <Logo />
              <div className="mt-10">
                <div className="font-display text-4xl leading-tight">
                  Build AI agents.
                  <br />
                  No code. No limits.
                </div>
                <div className="mt-3 text-white/60 max-w-md">
                  Describe your workflow in plain English and deploy an agent that runs with guardrails, logs, and
                  department-aware permissions.
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {pills.map((p) => (
                  <motion.span
                    key={p.label}
                    animate={{
                      opacity: p.active ? 1 : 0.55,
                      scale: p.active ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.35 }}
                    className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm"
                  >
                    {p.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="glass rounded-3xl p-8 lg:p-10"
          >
            <div className="text-white/80 text-sm mb-4">Sign in to continue</div>

            <div className="space-y-3">
              <input
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-accent/40"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-accent/40"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error ? <div className="mt-4 text-red-200/90 text-sm">Error: {error.message}</div> : null}

            <button
              type="button"
              className="mt-5 w-full px-4 py-3 rounded-2xl bg-accent hover:bg-accent/90 disabled:opacity-50 transition"
              disabled={loading || !email.trim() || !password}
              onClick={() => {
                void (async () => {
                  setLoading(true);
                  setError(null);
                  try {
                    const res = await api.post("/api/auth/login", { email, password });
                    const { user, token } = res.data as { user: unknown; token: string };
                    doLogin(user as never, token);
                    nav("/");
                  } catch (e) {
                    setError(normalizeApiError(e));
                  } finally {
                    setLoading(false);
                  }
                })();
              }}
            >
              {loading ? "Signing in…" : "Login"}
            </button>

            <div className="mt-4 text-sm text-white/60">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-white hover:underline">
                Register
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .mesh {
          background:
            radial-gradient(900px 600px at 20% 10%, rgba(108,99,255,0.22), transparent 60%),
            radial-gradient(800px 500px at 90% 30%, rgba(67,232,176,0.14), transparent 55%),
            radial-gradient(700px 600px at 40% 90%, rgba(255,101,132,0.12), transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
          filter: saturate(1.05);
          animation: drift 18s ease-in-out infinite alternate;
        }
        @keyframes drift {
          from { transform: translate3d(0,0,0) scale(1); }
          to   { transform: translate3d(-18px, 12px, 0) scale(1.03); }
        }
      `}</style>
    </div>
  );
}

