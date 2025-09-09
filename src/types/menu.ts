export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number; // in cents
  formattedPrice: string; // formatted as currency
  image: string | null;
  active: boolean;
  featured: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    active: boolean;
    sortOrder: number;
  };
  optionGroups: ItemOptionGroup[];
}

export interface ItemOptionGroup {
  id: string;
  name: string;
  required: boolean;
  multiple: boolean;
  itemId: string;
  options: ItemOption[];
}

export interface ItemOption {
  id: string;
  name: string;
  price: number; // additional price in cents
  formattedPrice: string; // formatted as currency
  groupId: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  items: MenuItem[];
}

export interface MenuResponse {
  categories: Category[];
  items: MenuItem[];
}

export interface MenuQueryParams {
  category?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
  sort?: "name" | "price" | "createdAt";
}

export interface ApiError {
  error: string;
  details?: Record<string, unknown>;
}



