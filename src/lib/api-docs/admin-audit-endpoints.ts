export const adminAuditEndpoints = {
  "/api/admin/audit-logs": {
    get: {
      summary: "Get audit logs",
      description: "Retrieve audit logs for system activities (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "query",
          name: "action",
          schema: { type: "string" },
          description: "Filter by action type",
        },
        {
          in: "query",
          name: "userId",
          schema: { type: "string" },
          description: "Filter by user ID",
        },
        {
          in: "query",
          name: "startDate",
          schema: { type: "string", format: "date" },
          description: "Filter logs from this date",
        },
        {
          in: "query",
          name: "endDate",
          schema: { type: "string", format: "date" },
          description: "Filter logs until this date",
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
          description: "Audit logs retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  logs: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        action: { type: "string" },
                        entityType: { type: "string" },
                        entityId: { type: "string" },
                        userId: { type: "string" },
                        userEmail: { type: "string" },
                        details: { type: "object" },
                        ipAddress: { type: "string" },
                        userAgent: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
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
};
