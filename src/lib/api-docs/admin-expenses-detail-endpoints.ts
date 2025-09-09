export const adminExpensesDetailEndpoints = {
  "/api/admin/expenses/{id}": {
    get: {
      summary: "Get expense by ID (admin)",
      description: "Retrieve a specific expense (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Expense ID",
        },
      ],
      responses: {
        "200": {
          description: "Expense retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  expense: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      amount: { type: "number" },
                      description: { type: "string" },
                      category: { type: "string" },
                      vendor: { type: "string" },
                      receipt: { type: "string" },
                      paid: { type: "boolean" },
                      paidAt: { type: "string", format: "date-time" },
                      notes: { type: "string" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Expense not found",
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
      summary: "Update expense",
      description: "Update an expense (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Expense ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                amount: {
                  type: "number",
                  minimum: 0,
                  description: "Expense amount",
                },
                description: {
                  type: "string",
                  minLength: 1,
                  description: "Expense description",
                },
                category: {
                  type: "string",
                  enum: [
                    "FOOD",
                    "UTILITIES",
                    "RENT",
                    "SUPPLIES",
                    "MARKETING",
                    "OTHER",
                  ],
                  description: "Expense category",
                },
                vendor: {
                  type: "string",
                  description: "Vendor name",
                },
                receipt: {
                  type: "string",
                  description: "Receipt URL or reference",
                },
                paid: {
                  type: "boolean",
                  description: "Whether expense is paid",
                },
                notes: {
                  type: "string",
                  description: "Additional notes",
                },
              },
            },
            example: {
              amount: 175.0,
              description: "Updated monthly rent payment",
              category: "RENT",
              vendor: "Property Management Co.",
              paid: true,
              notes: "January 2024 rent - paid via bank transfer",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Expense updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  expense: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      amount: { type: "number" },
                      description: { type: "string" },
                      category: { type: "string" },
                      vendor: { type: "string" },
                      receipt: { type: "string" },
                      paid: { type: "boolean" },
                      paidAt: { type: "string", format: "date-time" },
                      notes: { type: "string" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" },
                    },
                  },
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
          description: "Expense not found",
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
    delete: {
      summary: "Delete expense",
      description: "Delete an expense (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Expense ID",
        },
      ],
      responses: {
        "200": {
          description: "Expense deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                },
              },
            },
          },
        },
        "404": {
          description: "Expense not found",
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
};
