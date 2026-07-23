import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fallbackDashboard, type DashboardResponse } from "../types/dashboard";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "/api";
const api = axios.create({ baseURL });

// DEV-ONLY: fetches a real JWT for a seeded Admin user via DevAuthController so
// /api/dashboard (which requires the Admin role) can be tested before the Auth
// teammate's login flow is merged in. This endpoint 404s outside Development,
// so it fails harmlessly (falling back to demo data) in any real deployment.
// Uses a plain axios call (not the `api` instance) to avoid the interceptor
// below recursively trying to attach a token to its own token request.
let cachedToken: string | null = null;
let tokenPromise: Promise<string | null> | null = null;

async function getDevToken(): Promise<string | null> {
  if (cachedToken) return cachedToken;
  if (!tokenPromise) {
    tokenPromise = axios
      .post<{ token: string }>(`${baseURL}/dev/token`)
      .then((res) => {
        cachedToken = res.data.token;
        return cachedToken;
      })
      .catch(() => null);
  }
  return tokenPromise;
}

api.interceptors.request.use(async (config) => {
  const token = await getDevToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function fetchDashboard(): Promise<DashboardResponse> {
  try {
    const { data } = await api.get<DashboardResponse>("/dashboard");
    return data;
  } catch {
    return fallbackDashboard;
  }
}

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}
