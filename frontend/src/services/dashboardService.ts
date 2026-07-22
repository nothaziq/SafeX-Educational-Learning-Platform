import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fallbackDashboard, type DashboardResponse } from "../types/dashboard";

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api" });

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
