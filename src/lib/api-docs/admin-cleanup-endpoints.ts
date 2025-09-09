export const adminCleanupEndpoints = {
  "/api/admin/cleanup-carts": {
    post: {
      summary: "Cleanup abandoned carts",
      description:
        "Remove abandoned carts older than specified days (admin only)",
      tags: ["Admin"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                daysOld: {
                  type: "number",
                  minimum: 1,
                  maximum: 365,
                  description: "Number of days old carts to cleanup",
                },
                dryRun: {
                  type: "boolean",
                  description:
                    "If true, only count carts without deleting them",
                },
              },
            },
            example: {
              daysOld: 7,
              dryRun: false,
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Cart cleanup completed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                  deletedCount: { type: "number" },
                  totalCount: { type: "number" },
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
};
