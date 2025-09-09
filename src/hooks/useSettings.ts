import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export interface Settings {
  // Business Information
  businessName?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessEmail?: string;
  businessWebsite?: string;

  // Tax and Fees
  taxRate?: number; // percentage (e.g., 8.5 for 8.5%)
  serviceFee?: number; // percentage (e.g., 3.0 for 3%)
  currency?: string; // e.g., "USD"

  // Business Hours
  businessHours?: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };

  // Stripe Configuration
  stripePublishableKey?: string;
  stripeSecretKey?: string;
  stripeWebhookSecret?: string;

  // Other Settings
  orderPrefix?: string;
  autoAcceptOrders?: boolean;
  requireCustomerInfo?: boolean;
}

export function useSettings() {
  return useQuery<{ settings: Settings }>({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const response = await fetch("/api/admin/settings");
      if (!response.ok) {
        throw new Error("Failed to fetch settings");
      }
      return response.json();
    },
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Partial<Settings>) => {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update settings");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
      toast.success("Settings updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
