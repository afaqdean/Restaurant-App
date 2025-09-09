export const adminEndpoints = {
  "/api/admin/dashboard": {
    get: {
      summary: "Get admin dashboard data",
      description: "Retrieve dashboard KPIs and metrics (admin only)",
      tags: ["Admin"],
      responses: {
        "200": {
          description: "Dashboard data retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  kpis: {
                    type: "object",
                    properties: {
                      todaysOrders: { type: "number" },
                      todaysRevenue: { type: "number" },
                      averageOrderValue: { type: "number" },
                      openOrders: { type: "number" },
                      stripeOrders: { type: "number" },
                      codOrders: { type: "number" },
                      stripeRevenue: { type: "number" },
                      codRevenue: { type: "number" },
                    },
                  },
                  recentOrders: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        orderNumber: { type: "string" },
                        customerName: { type: "string" },
                        status: { type: "string" },
                        paymentMethod: { type: "string" },
                        total: { type: "number" },
                        createdAt: { type: "string", format: "date-time" },
                      },
                    },
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
  },
  "/api/admin/orders": {
    get: {
      summary: "Get all orders (admin)",
      description: "Retrieve all orders with filtering options (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "query",
          name: "status",
          schema: { type: "string" },
          description: "Filter by order status",
        },
        {
          in: "query",
          name: "paymentMethod",
          schema: { type: "string" },
          description: "Filter by payment method",
        },
        {
          in: "query",
          name: "startDate",
          schema: { type: "string", format: "date" },
          description: "Filter orders from this date",
        },
        {
          in: "query",
          name: "endDate",
          schema: { type: "string", format: "date" },
          description: "Filter orders until this date",
        },
        {
          in: "query",
          name: "limit",
          schema: { type: "integer", maximum: 100 },
          description: "Limit number of results",
        },
        {
          in: "query",
          name: "offset",
          schema: { type: "integer", minimum: 0 },
          description: "Number of results to skip",
        },
      ],
      responses: {
        "200": {
          description: "Orders retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  orders: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        orderNumber: { type: "string" },
                        customerName: { type: "string" },
                        customerEmail: { type: "string" },
                        status: { type: "string" },
                        paymentMethod: { type: "string" },
                        paymentStatus: { type: "string" },
                        total: { type: "number" },
                        createdAt: { type: "string", format: "date-time" },
                        items: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              quantity: { type: "number" },
                              price: { type: "number" },
                              item: { $ref: "#/components/schemas/MenuItem" },
                            },
                          },
                        },
                      },
                    },
                  },
                  total: { type: "number" },
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
  },
  "/api/admin/orders/{id}/status": {
    put: {
      summary: "Update order status",
      description: "Update the status of an order (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Order ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  enum: [
                    "PENDING",
                    "ACCEPTED",
                    "IN_KITCHEN",
                    "READY",
                    "COMPLETED",
                    "CANCELLED",
                  ],
                  description: "New order status",
                },
              },
            },
            example: {
              status: "ACCEPTED",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Order status updated successfully",
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
          description: "Order not found",
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
  "/api/admin/categories": {
    get: {
      summary: "Get all categories (admin)",
      description: "Retrieve all menu categories (admin only)",
      tags: ["Admin"],
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
      summary: "Create new category",
      description: "Create a new menu category (admin only)",
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
                sortOrder: {
                  type: "number",
                  description: "Sort order",
                },
              },
            },
            example: {
              name: "Desserts",
              description: "Sweet treats to end your meal",
              image: "https://example.com/desserts.jpg",
              sortOrder: 5,
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Category created successfully",
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
  "/api/admin/expenses": {
    get: {
      summary: "Get all expenses (admin)",
      description: "Retrieve all expenses with filtering options (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "query",
          name: "category",
          schema: { type: "string" },
          description: "Filter by expense category",
        },
        {
          in: "query",
          name: "paid",
          schema: { type: "boolean" },
          description: "Filter by paid status",
        },
      ],
      responses: {
        "200": {
          description: "Expenses retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  expenses: {
                    type: "array",
                    items: {
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
      summary: "Create new expense",
      description: "Create a new expense (admin only)",
      tags: ["Admin"],
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
                notes: {
                  type: "string",
                  description: "Additional notes",
                },
              },
            },
            example: {
              amount: 150.0,
              description: "Monthly rent payment",
              category: "RENT",
              vendor: "Property Management Co.",
              notes: "January 2024 rent",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Expense created successfully",
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
  "/api/admin/reports": {
    get: {
      summary: "Get financial reports",
      description:
        "Retrieve financial reports including revenue, expenses, and net profit (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "query",
          name: "startDate",
          schema: { type: "string", format: "date" },
          description: "Start date for the report (YYYY-MM-DD)",
        },
        {
          in: "query",
          name: "endDate",
          schema: { type: "string", format: "date" },
          description: "End date for the report (YYYY-MM-DD)",
        },
        {
          in: "query",
          name: "format",
          schema: { type: "string", enum: ["json", "csv"] },
          description: "Response format",
        },
      ],
      responses: {
        "200": {
          description: "Reports retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  summary: {
                    type: "object",
                    properties: {
                      totalRevenue: { type: "number" },
                      stripeRevenue: { type: "number" },
                      codRevenue: { type: "number" },
                      totalExpenses: { type: "number" },
                      netProfit: { type: "number" },
                      totalOrders: { type: "number" },
                      stripeOrders: { type: "number" },
                      codOrders: { type: "number" },
                    },
                  },
                  dailyData: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        date: { type: "string" },
                        revenue: { type: "number" },
                        expenses: { type: "number" },
                        netProfit: { type: "number" },
                        orders: { type: "number" },
                      },
                    },
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
  },
};
