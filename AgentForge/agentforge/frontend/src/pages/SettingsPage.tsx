import { useState } from "react";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  const [dummy, setDummy] = useState(0);

  return (
    <div className="min-h-screen bg-bg text-white">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-display text-3xl">Settings</div>
            <div className="text-white/60 mt-1">Connect integrations used by your agents.</div>
          </div>
          <Link to="/" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            Back
          </Link>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="font-display text-xl">Offline mode</div>
          <div className="text-white/60 mt-1">External integrations are removed. This app runs fully offline.</div>
          <button
            type="button"
            className="mt-5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            onClick={() => setDummy((d) => d + 1)}
          >
            Check
          </button>
          <div className="text-white/60 text-sm mt-3">OK ({dummy})</div>
        </div>
      </div>
    </div>
  );
}

