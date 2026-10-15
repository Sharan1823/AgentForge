import { Link } from "react-router-dom";
import type { Agent } from "../stores/useAgentsStore";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link to={`/agents/${agent.id}`} className="glass rounded-2xl p-5 hover:bg-white/5 transition block">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-display text-lg">{agent.name}</div>
          <div className="text-white/60 text-sm mt-1 line-clamp-2">{agent.description}</div>
        </div>
        <div className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10">{agent.status}</div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-white/60">
        <div>{agent.department}</div>
        <div>{new Date(agent.updatedAt).toLocaleString()}</div>
      </div>
    </Link>
  );
}

