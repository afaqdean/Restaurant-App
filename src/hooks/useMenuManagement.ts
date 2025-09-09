import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    name: string;
    active: boolean;
  }>;
}

export interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  active: boolean;
  featured: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
  optionGroups: Array<{
    id: string;
    name: string;
    required: boolean;
    multiple: boolean;
    options: Array<{
      id: string;
      name: string;
      price: number;
    }>;
  }>;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  image?: string;
  sortOrder?: number;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  image?: string;
  active?: boolean;
  sortOrder?: number;
}

export interface CreateItemData {
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: string;
  featured?: boolean;
}

export interface UpdateItemData {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  categoryId?: string;
  active?: boolean;
  featured?: boolean;
}

// Categories hooks
export function useCategories() {
  return useQuery<{ categories: Category[] }>({
    queryKey: ["admin", "categories"],
    queryFn: async () => {
      const response = await fetch("/api/admin/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
  });
}

export function useCategory(id: string) {
  return useQuery<{ category: Category & { items: Item[] } }>({
    queryKey: ["admin", "categories", id],
    queryFn: async () => {
      const response = await fetch(`/api/admin/categories/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch category");
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCategoryData) => {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create category");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category created successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCategoryData;
    }) => {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update category");
      }
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "categories", id] });
      toast.success("Category updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete category");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Items hooks
export function useItems(categoryId?: string) {
  return useQuery<{ items: Item[] }>({
    queryKey: ["admin", "items", categoryId],
    queryFn: async () => {
      const url = categoryId
        ? `/api/admin/items?categoryId=${categoryId}`
        : "/api/admin/items";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      return response.json();
    },
  });
}

export function useItem(id: string) {
  return useQuery<{ item: Item }>({
    queryKey: ["admin", "items", id],
    queryFn: async () => {
      const response = await fetch(`/api/admin/items/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch item");
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateItemData) => {
      const response = await fetch("/api/admin/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create item");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "items"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Item created successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateItemData }) => {
      const response = await fetch(`/api/admin/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update item");
      }
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "items"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "items", id] });
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Item updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete item");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "items"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Item deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
