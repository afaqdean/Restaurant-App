import { z } from "zod";

// Query parameter validation
export const menuQuerySchema = z.object({
  category: z.string().optional(),
  featured: z.boolean().optional(),
  search: z.string().optional(),
  limit: z.number().int().positive().max(100).optional(),
  sort: z.enum(["name", "price", "createdAt"]).optional(),
});

// Menu item validation
export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().int().positive(),
  image: z.string().nullable(),
  active: z.boolean(),
  featured: z.boolean(),
  categoryId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Category validation
export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  active: z.boolean(),
  sortOrder: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Option group validation
export const itemOptionGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  required: z.boolean(),
  multiple: z.boolean(),
  itemId: z.string(),
});

// Option validation
export const itemOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().int().min(0),
  groupId: z.string(),
});

// Complete menu item with relations
export const menuItemWithRelationsSchema = menuItemSchema.extend({
  category: categorySchema,
  optionGroups: z.array(
    itemOptionGroupSchema.extend({
      options: z.array(itemOptionSchema),
    })
  ),
});

// Menu response validation
export const menuResponseSchema = z.object({
  categories: z.array(
    categorySchema.extend({
      items: z.array(menuItemWithRelationsSchema),
    })
  ),
  items: z.array(menuItemWithRelationsSchema),
});

// API error validation
export const apiErrorSchema = z.object({
  error: z.string(),
  details: z.record(z.string(), z.unknown()).optional(),
});

export type MenuQueryParams = z.infer<typeof menuQuerySchema>;
export type MenuItem = z.infer<typeof menuItemWithRelationsSchema>;
export type Category = z.infer<typeof categorySchema>;
export type ItemOptionGroup = z.infer<typeof itemOptionGroupSchema>;
export type ItemOption = z.infer<typeof itemOptionSchema>;
export type MenuResponse = z.infer<typeof menuResponseSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
