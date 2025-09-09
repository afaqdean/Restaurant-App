export const adminItemsEndpoints = {
  "/api/admin/items": {
    get: {
      summary: "Get all items (admin)",
      description: "Retrieve all menu items (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "query",
          name: "categoryId",
          schema: { type: "string" },
          description: "Filter by category ID",
        },
      ],
      responses: {
        "200": {
          description: "Items retrieved successfully",
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
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "403": {
          description: "Admin access required",
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
    post: {
      summary: "Create new item",
      description: "Create a new menu item (admin only)",
      tags: ["Admin"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  minLength: 1,
                  maxLength: 100,
                  description: "Item name",
                },
                description: {
                  type: "string",
                  maxLength: 500,
                  description: "Item description",
                },
                price: {
                  type: "number",
                  minimum: 0,
                  description: "Item price in cents",
                },
                image: {
                  type: "string",
                  description: "Item image URL",
                },
                categoryId: {
                  type: "string",
                  description: "Category ID",
                },
                featured: {
                  type: "boolean",
                  description: "Whether item is featured",
                },
                active: {
                  type: "boolean",
                  description: "Whether item is active",
                },
              },
            },
            example: {
              name: "Grilled Salmon",
              description: "Fresh Atlantic salmon grilled to perfection",
              price: 2499,
              image: "https://example.com/salmon.jpg",
              categoryId: "cat_123",
              featured: true,
              active: true,
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Item created successfully",
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
        "400": {
          description: "Invalid request data",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "403": {
          description: "Admin access required",
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
  "/api/admin/items/{id}": {
    get: {
      summary: "Get item by ID (admin)",
      description: "Retrieve a specific menu item (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Item ID",
        },
      ],
      responses: {
        "200": {
          description: "Item retrieved successfully",
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
          description: "Item not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "403": {
          description: "Admin access required",
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
    put: {
      summary: "Update item",
      description: "Update a menu item (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Item ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  minLength: 1,
                  maxLength: 100,
                  description: "Item name",
                },
                description: {
                  type: "string",
                  maxLength: 500,
                  description: "Item description",
                },
                price: {
                  type: "number",
                  minimum: 0,
                  description: "Item price in cents",
                },
                image: {
                  type: "string",
                  description: "Item image URL",
                },
                categoryId: {
                  type: "string",
                  description: "Category ID",
                },
                featured: {
                  type: "boolean",
                  description: "Whether item is featured",
                },
                active: {
                  type: "boolean",
                  description: "Whether item is active",
                },
              },
            },
            example: {
              name: "Updated Grilled Salmon",
              description:
                "Fresh Atlantic salmon grilled to perfection with herbs",
              price: 2699,
              featured: false,
              active: true,
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Item updated successfully",
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
        "400": {
          description: "Invalid request data",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "403": {
          description: "Admin access required",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "404": {
          description: "Item not found",
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
