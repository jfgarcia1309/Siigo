import { useQuery } from "@tanstack/react-query";
import { api, type ManagersListResponse, type TeamStats } from "@shared/routes";

// GET /api/managers - List of all managers with their performance data
export function useManagers() {
  return useQuery({
    queryKey: [api.managers.list.path],
    queryFn: async () => {
      const res = await fetch(api.managers.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch managers");
      return api.managers.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/stats - Aggregated team statistics
export function useTeamStats() {
  return useQuery({
    queryKey: [api.managers.stats.path],
    queryFn: async () => {
      const res = await fetch(api.managers.stats.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch team stats");
      // Note: We're manually casting/parsing here since we defined the route but maybe not the exact response schema in shared yet
      // In a real scenario, use api.managers.stats.responses[200].parse(...)
      const data = await res.json();
      return data as TeamStats;
    },
  });
}
