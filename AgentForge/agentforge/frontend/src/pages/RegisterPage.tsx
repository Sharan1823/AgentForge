import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, normalizeApiError, type ApiError } from "../lib/api";
import { useAuthStore } from "../store/authStore";
import { DepartmentSelector, type Department } from "../components/DepartmentSelector";

export default function RegisterPage() {
  const nav = useNavigate();
  const doLogin = useAuthStore((s) => s.login);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [department, setDepartment] = useState<Department>("SALES");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const canSubmit = useMemo(
    () => name.trim() && email.trim() && password.length >= 8 && companyName.trim(),
    [name, email, password, companyName],
  );

  async function submit() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/api/auth/register", { name, email, password, department, companyName });
      const { user, token } = res.data as { user: unknown; token: string };
      doLogin(user as never, token);
      nav("/");
    } catch (e) {
      setError(normalizeApiError(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg glass rounded-3xl p-8">
        <div className="font-display text-3xl">Create account</div>
        <div className="text-white/60 mt-1">Runs fully offline on your machine.</div>

        <div className="mt-6 space-y-3">
          <input
            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-accent/40"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-accent/40"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-accent/40"
            placeholder="Password (min 8 chars)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-accent/40"
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <div>
            <div className="text-white/60 text-sm mb-2">Department</div>
            <DepartmentSelector value={department} onChange={setDepartment} />
          </div>
        </div>

        {error ? <div className="mt-4 text-red-200/90 text-sm">Error: {error.message}</div> : null}

        <button
          type="button"
          onClick={() => void submit()}
          disabled={!canSubmit || loading}
          className="mt-6 w-full px-4 py-3 rounded-2xl bg-accent hover:bg-accent/90 disabled:opacity-50 transition"
        >
          {loading ? "Creating…" : "Register"}
        </button>

        <div className="mt-4 text-sm text-white/60">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

