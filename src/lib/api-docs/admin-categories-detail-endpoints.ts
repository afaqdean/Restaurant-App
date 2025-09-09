export const adminCategoriesDetailEndpoints = {
  "/api/admin/categories/{id}": {
    get: {
      summary: "Get category by ID (admin)",
      description: "Retrieve a specific menu category (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Category ID",
        },
      ],
      responses: {
        "200": {
          description: "Category retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  category: { $ref: "#/components/schemas/Category" },
                },
              },
            },
          },
        },
        "404": {
          description: "Category not found",
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
      summary: "Update category",
      description: "Update a menu category (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Category ID",
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
                  description: "Category name",
                },
                description: {
                  type: "string",
                  maxLength: 500,
                  description: "Category description",
                },
                image: {
                  type: "string",
                  description: "Category image URL",
                },
                active: {
                  type: "boolean",
                  description: "Whether category is active",
                },
                sortOrder: {
                  type: "number",
                  description: "Sort order",
                },
              },
            },
            example: {
              name: "Updated Appetizers",
              description:
                "Start your meal right with our delicious appetizers",
              image: "https://example.com/updated-appetizers.jpg",
              active: true,
              sortOrder: 1,
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Category updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  category: { $ref: "#/components/schemas/Category" },
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
          description: "Category not found",
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
