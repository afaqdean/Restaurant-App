import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export interface Expense {
  id: string;
  amount: number; // in cents
  description: string;
  category: "FOOD" | "UTILITIES" | "RENT" | "SUPPLIES" | "MARKETING" | "OTHER";
  vendor?: string;
  receipt?: string;
  paid: boolean;
  paidAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseData {
  amount: number;
  description: string;
  category: "FOOD" | "UTILITIES" | "RENT" | "SUPPLIES" | "MARKETING" | "OTHER";
  vendor?: string;
  receipt?: string;
  notes?: string;
}

export interface UpdateExpenseData {
  amount?: number;
  description?: string;
  category?: "FOOD" | "UTILITIES" | "RENT" | "SUPPLIES" | "MARKETING" | "OTHER";
  vendor?: string;
  receipt?: string;
  paid?: boolean;
  notes?: string;
}

export function useExpenses(filters?: { category?: string; paid?: boolean }) {
  return useQuery<{ expenses: Expense[] }>({
    queryKey: ["admin", "expenses", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.category) params.append("category", filters.category);
      if (filters?.paid !== undefined)
        params.append("paid", filters.paid.toString());

      const url = `/api/admin/expenses${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }
      return response.json();
    },
  });
}

export function useExpense(id: string) {
  return useQuery<{ expense: Expense }>({
    queryKey: ["admin", "expenses", id],
    queryFn: async () => {
      const response = await fetch(`/api/admin/expenses/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch expense");
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateExpenseData) => {
      const response = await fetch("/api/admin/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create expense");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "expenses"] });
      toast.success("Expense created successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateExpenseData;
    }) => {
      const response = await fetch(`/api/admin/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update expense");
      }
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "expenses"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "expenses", id] });
      toast.success("Expense updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/expenses/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete expense");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "expenses"] });
      toast.success("Expense deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
