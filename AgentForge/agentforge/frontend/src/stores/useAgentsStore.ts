import { create } from "zustand";
import { api, normalizeApiError, type ApiError } from "../lib/api";

export type Agent = {
  id: string;
  name: string;
  description: string;
  department: string;
  status: string;
  trigger: string;
  updatedAt: string;
};

type AgentsState = {
  agents: Agent[];
  loading: boolean;
  error: ApiError | null;
  fetchAgents: (token: string) => Promise<void>;
};

export const useAgentsStore = create<AgentsState>((set) => ({
  agents: [],
  loading: false,
  error: null,
  fetchAgents: async (token) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/agents", { headers: { Authorization: `Bearer ${token}` } });
      set({ agents: (res.data as { agents: Agent[] }).agents, loading: false });
    } catch (e) {
      set({ error: normalizeApiError(e), loading: false });
    }
  },
}));

