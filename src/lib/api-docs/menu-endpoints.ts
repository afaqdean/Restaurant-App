export const menuEndpoints = {
  "/api/menu": {
    get: {
      summary: "Get menu items with categories",
      description:
        "Returns all active menu items organized by categories with optional filtering",
      tags: ["Menu"],
      parameters: [
        {
          in: "query",
          name: "category",
          schema: { type: "string" },
          description: "Filter by category ID",
        },
        {
          in: "query",
          name: "featured",
          schema: { type: "boolean" },
          description: "Show only featured items",
        },
        {
          in: "query",
          name: "search",
          schema: { type: "string" },
          description: "Search in item names and descriptions",
        },
        {
          in: "query",
          name: "limit",
          schema: { type: "integer", maximum: 100 },
          description: "Limit number of results",
        },
        {
          in: "query",
          name: "sort",
          schema: { type: "string", enum: ["name", "price", "createdAt"] },
          description: "Sort order",
        },
      ],
      responses: {
        "200": {
          description: "Menu data retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MenuResponse" },
              example: {
                categories: [
                  {
                    id: "cat_123",
                    name: "Appetizers",
                    description: "Start your meal right",
                    image: "https://example.com/appetizers.jpg",
                    active: true,
                    sortOrder: 1,
                    createdAt: "2024-01-01T00:00:00.000Z",
                    updatedAt: "2024-01-01T00:00:00.000Z",
                    items: [],
                  },
                ],
                items: [
                  {
                    id: "item_123",
                    name: "Crispy Spring Rolls",
                    description: "Fresh vegetables wrapped in crispy pastry",
                    price: 899,
                    formattedPrice: "$8.99",
                    image: "https://example.com/spring-rolls.jpg",
                    active: true,
                    featured: true,
                    categoryId: "cat_123",
                    createdAt: "2024-01-01T00:00:00.000Z",
                    updatedAt: "2024-01-01T00:00:00.000Z",
                    category: {
                      id: "cat_123",
                      name: "Appetizers",
                      description: "Start your meal right",
                      image: "https://example.com/appetizers.jpg",
                      active: true,
                      sortOrder: 1,
                      createdAt: "2024-01-01T00:00:00.000Z",
                      updatedAt: "2024-01-01T00:00:00.000Z",
                    },
                    optionGroups: [],
                  },
                ],
              },
            },
          },
        },
        "400": {
          description: "Invalid query parameters",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },
  "/api/menu/categories": {
    get: {
      summary: "Get all menu categories",
      description: "Returns all active menu categories",
      tags: ["Menu"],
      responses: {
        "200": {
          description: "Categories retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  categories: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Category" },
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },
  "/api/menu/featured": {
    get: {
      summary: "Get featured menu items",
      description: "Returns all featured menu items across categories",
      tags: ["Menu"],
      responses: {
        "200": {
          description: "Featured items retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  items: {
                    type: "array",
                    items: { $ref: "#/components/schemas/MenuItem" },
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },
  "/api/menu/{id}": {
    get: {
      summary: "Get menu item by ID",
      description: "Returns detailed information about a specific menu item",
      tags: ["Menu"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Menu item ID",
        },
      ],
      responses: {
        "200": {
          description: "Menu item retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  item: { $ref: "#/components/schemas/MenuItem" },
                },
              },
            },
          },
        },
        "404": {
          description: "Menu item not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },
};
