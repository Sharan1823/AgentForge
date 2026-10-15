import axios, { AxiosError } from "axios";
import { useAuthStore } from "../store/authStore";

export type ApiError = { code: string; message: string; issues?: unknown };

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      useAuthStore.getState().logout();
      if (window.location.pathname !== "/login") window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

export function isAxiosError(e: unknown): e is AxiosError {
  return Boolean(e) && typeof e === "object" && (e as { isAxiosError?: boolean }).isAxiosError === true;
}

export function normalizeApiError(e: unknown): ApiError {
  if (isAxiosError(e)) {
    const data = e.response?.data as { error?: ApiError } | undefined;
    if (data?.error) return data.error;
    const maybe = e.response?.data as { error?: unknown } | undefined;
    if (typeof maybe?.error === "string") return { code: "API_ERROR", message: maybe.error };
    return { code: "HTTP_ERROR", message: e.message };
  }
  return { code: "UNKNOWN", message: e instanceof Error ? e.message : "Unknown error" };
}