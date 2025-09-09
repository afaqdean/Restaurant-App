import { useQuery } from "@tanstack/react-query";

export interface AuditLog {
  id: string;
  orderId?: string;
  action: string;
  oldValue?: string;
  newValue?: string;
  userId?: string;
  createdAt: string;
}

export function useAuditLogs(filters?: {
  orderId?: string;
  limit?: number;
  offset?: number;
}) {
  return useQuery<{ logs: AuditLog[] }>({
    queryKey: ["admin", "audit-logs", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.orderId) params.append("orderId", filters.orderId);
      if (filters?.limit) params.append("limit", filters.limit.toString());
      if (filters?.offset) params.append("offset", filters.offset.toString());

      const url = `/api/admin/audit-logs${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch audit logs");
      }
      return response.json();
    },
  });
}
