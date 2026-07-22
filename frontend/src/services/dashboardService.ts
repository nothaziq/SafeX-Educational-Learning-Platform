import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { DashboardResponse } from "../types/dashboard";

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api" });

async function fetchDashboard(): Promise<DashboardResponse> {
  const { data } = await api.get<DashboardResponse>("/dashboard");
  return data;
}

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    refetchInterval: 60_000,
  });
}
