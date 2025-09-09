export const adminSettingsEndpoints = {
  "/api/admin/settings": {
    get: {
      summary: "Get application settings",
      description: "Retrieve application settings (admin only)",
      tags: ["Admin"],
      responses: {
        "200": {
          description: "Settings retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  settings: {
                    type: "object",
                    properties: {
                      taxRate: { type: "number" },
                      serviceFeeRate: { type: "number" },
                      currency: { type: "string" },
                      businessName: { type: "string" },
                      businessAddress: { type: "string" },
                      businessPhone: { type: "string" },
                      businessEmail: { type: "string" },
                      operatingHours: { type: "string" },
                      stripePublishableKey: { type: "string" },
                      stripeSecretKey: { type: "string" },
                      stripeWebhookSecret: { type: "string" },
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
    put: {
      summary: "Update application settings",
      description: "Update application settings (admin only)",
      tags: ["Admin"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                taxRate: {
                  type: "number",
                  minimum: 0,
                  maximum: 1,
                  description: "Tax rate (0-1)",
                },
                serviceFeeRate: {
                  type: "number",
                  minimum: 0,
                  maximum: 1,
                  description: "Service fee rate (0-1)",
                },
                currency: {
                  type: "string",
                  description: "Currency code (e.g., USD, EUR)",
                },
                businessName: {
                  type: "string",
                  description: "Business name",
                },
                businessAddress: {
                  type: "string",
                  description: "Business address",
                },
                businessPhone: {
                  type: "string",
                  description: "Business phone number",
                },
                businessEmail: {
                  type: "string",
                  format: "email",
                  description: "Business email",
                },
                operatingHours: {
                  type: "string",
                  description: "Operating hours",
                },
                stripePublishableKey: {
                  type: "string",
                  description: "Stripe publishable key",
                },
                stripeSecretKey: {
                  type: "string",
                  description: "Stripe secret key",
                },
                stripeWebhookSecret: {
                  type: "string",
                  description: "Stripe webhook secret",
                },
              },
            },
            example: {
              taxRate: 0.08,
              serviceFeeRate: 0.03,
              currency: "USD",
              businessName: "My Restaurant",
              businessAddress: "123 Main St, City, State 12345",
              businessPhone: "+1-555-123-4567",
              businessEmail: "info@myrestaurant.com",
              operatingHours: "Mon-Sun: 11:00 AM - 10:00 PM",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Settings updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  settings: {
                    type: "object",
                    properties: {
                      taxRate: { type: "number" },
                      serviceFeeRate: { type: "number" },
                      currency: { type: "string" },
                      businessName: { type: "string" },
                      businessAddress: { type: "string" },
                      businessPhone: { type: "string" },
                      businessEmail: { type: "string" },
                      operatingHours: { type: "string" },
                      stripePublishableKey: { type: "string" },
                      stripeSecretKey: { type: "string" },
                      stripeWebhookSecret: { type: "string" },
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
};
