import { useQuery } from "@tanstack/react-query";

export interface ReportSummary {
  totalRevenue: number;
  stripeRevenue: number;
  codRevenue: number;
  totalExpenses: number;
  netProfit: number;
  totalOrders: number;
  stripeOrders: number;
  codOrders: number;
}

export interface DailyData {
  date: string;
  revenue: number;
  expenses: number;
  netProfit: number;
  orders: number;
}

export interface ReportsData {
  summary: ReportSummary;
  dailyData: DailyData[];
}

export function useReports(startDate?: string, endDate?: string) {
  return useQuery<ReportsData>({
    queryKey: ["admin", "reports", startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const url = `/api/admin/reports${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }
      return response.json();
    },
  });
}

export function downloadCSVReport(startDate?: string, endDate?: string) {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  params.append("format", "csv");

  const url = `/api/admin/reports?${params.toString()}`;

  // Create a temporary link to download the CSV
  const link = document.createElement("a");
  link.href = url;
  link.download = `financial-report-${startDate || "start"}-to-${
    endDate || "end"
  }.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
