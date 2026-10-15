import { create } from "zustand";

type SessionState = {
  bearerToken: string | null;
  setBearerToken: (t: string | null) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  bearerToken: null,
  setBearerToken: (t) => set({ bearerToken: t }),
}));

