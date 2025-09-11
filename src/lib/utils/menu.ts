/**
 * Utility functions for menu data formatting and processing
 */

/**
 * Format price from cents to currency string
 */
export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceInCents / 100);
}

/**
 * Format menu item with formatted prices
 */
export function formatMenuItem(item: {
  price: number;
  optionGroups?: Array<{ options?: Array<{ price: number }> }>;
}) {
  return {
    ...item,
    formattedPrice: formatPrice(item.price),
    optionGroups: item.optionGroups?.map(
      (group: { options?: Array<{ price: number }> }) => ({
        ...group,
        options: group.options?.map((option: { price: number }) => ({
          ...option,
          formattedPrice: formatPrice(option.price),
        })),
      })
    ),
  };
}

/**
 * Format category with formatted items
 */
export function formatCategory(category: {
  items?: Array<{
    price: number;
    optionGroups?: Array<{ options?: Array<{ price: number }> }>;
  }>;
}) {
  return {
    ...category,
    items: category.items?.map(formatMenuItem),
  };
}

/**
 * Build query string from parameters
 */
export function buildMenuQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}
