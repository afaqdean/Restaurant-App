import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  MenuResponse,
  MenuQueryParams,
  MenuItem,
  Category,
  ApiError,
} from "@/types/menu";

// API functions
async function fetchMenu(params?: MenuQueryParams): Promise<MenuResponse> {
  const searchParams = new URLSearchParams();

  if (params?.category) searchParams.append("category", params.category);
  if (params?.featured !== undefined)
    searchParams.append("featured", String(params.featured));
  if (params?.search) searchParams.append("search", params.search);
  if (params?.limit) searchParams.append("limit", String(params.limit));
  if (params?.sort) searchParams.append("sort", params.sort);

  const queryString = searchParams.toString();
  const url = `/api/menu${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || "Failed to fetch menu");
  }

  return response.json();
}

async function fetchCategories(): Promise<{ categories: Category[] }> {
  const response = await fetch("/api/menu/categories");

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || "Failed to fetch categories");
  }

  return response.json();
}

async function fetchFeaturedItems(): Promise<{ items: MenuItem[] }> {
  const response = await fetch("/api/menu/featured");

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || "Failed to fetch featured items");
  }

  return response.json();
}

async function fetchMenuItem(id: string): Promise<{ item: MenuItem }> {
  const response = await fetch(`/api/menu/${id}`);

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || "Failed to fetch menu item");
  }

  return response.json();
}

// Query keys
export const menuKeys = {
  all: ["menu"] as const,
  lists: () => [...menuKeys.all, "list"] as const,
  list: (params?: MenuQueryParams) => [...menuKeys.lists(), params] as const,
  categories: () => [...menuKeys.all, "categories"] as const,
  featured: () => [...menuKeys.all, "featured"] as const,
  details: () => [...menuKeys.all, "detail"] as const,
  detail: (id: string) => [...menuKeys.details(), id] as const,
};

// Custom hooks
export function useMenu(
  params?: MenuQueryParams,
  options?: Omit<UseQueryOptions<MenuResponse, Error>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: menuKeys.list(params),
    queryFn: () => fetchMenu(params),
    ...options,
  });
}

export function useCategories(
  options?: Omit<
    UseQueryOptions<{ categories: Category[] }, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: menuKeys.categories(),
    queryFn: fetchCategories,
    ...options,
  });
}

export function useFeaturedItems(
  options?: Omit<
    UseQueryOptions<{ items: MenuItem[] }, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: menuKeys.featured(),
    queryFn: fetchFeaturedItems,
    ...options,
  });
}

export function useMenuItem(
  id: string,
  options?: Omit<
    UseQueryOptions<{ item: MenuItem }, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: menuKeys.detail(id),
    queryFn: () => fetchMenuItem(id),
    enabled: !!id,
    ...options,
  });
}

// Utility hooks for common use cases
export function useMenuByCategory(categoryId: string) {
  return useMenu({ category: categoryId });
}

export function useMenuSearch(searchTerm: string) {
  return useMenu(
    { search: searchTerm },
    {
      enabled: searchTerm.length > 2, // Only search if term is longer than 2 characters
    }
  );
}



