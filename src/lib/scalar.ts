import { authEndpoints } from "./api-docs/auth-endpoints";
import { menuEndpoints } from "./api-docs/menu-endpoints";
import { paymentEndpoints } from "./api-docs/payment-endpoints";
import { cartEndpoints } from "./api-docs/cart-endpoints";
import { orderEndpoints } from "./api-docs/order-endpoints";
import { adminEndpoints } from "./api-docs/admin-endpoints";
import { adminItemsEndpoints } from "./api-docs/admin-items-endpoints";
import { adminCategoriesDetailEndpoints } from "./api-docs/admin-categories-detail-endpoints";
import { adminExpensesDetailEndpoints } from "./api-docs/admin-expenses-detail-endpoints";
import { adminSettingsEndpoints } from "./api-docs/admin-settings-endpoints";
import { adminAuditEndpoints } from "./api-docs/admin-audit-endpoints";
import { adminPaymentEndpoints } from "./api-docs/admin-payment-endpoints";
import { adminCleanupEndpoints } from "./api-docs/admin-cleanup-endpoints";

export const getApiDocs = async () => {
  // Define the OpenAPI specification directly
  const spec = {
    openapi: "3.0.0",
    info: {
      title: "Restaurant App API",
      version: "1.0.0",
      description: "API documentation for the Restaurant Management System",
      contact: {
        name: "API Support",
        email: "support@restaurant-app.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", description: "User ID" },
            name: { type: "string", description: "User full name" },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            role: {
              type: "string",
              enum: ["CUSTOMER", "ADMIN", "STAFF"],
              description: "User role",
            },
            phone: { type: "string", description: "User phone number" },
            address: { type: "string", description: "User address" },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "User creation timestamp",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              minLength: 1,
              description: "User full name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "User password (minimum 6 characters)",
            },
            phone: {
              type: "string",
              description: "User phone number (optional)",
            },
            address: {
              type: "string",
              description: "User address (optional)",
            },
          },
        },
        SignInRequest: {
          type: "object",
          required: ["email", "password", "csrfToken"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            password: {
              type: "string",
              description: "User password",
            },
            csrfToken: {
              type: "string",
              description: "CSRF token from /api/auth/csrf",
            },
            callbackUrl: {
              type: "string",
              description: "URL to redirect after successful login",
            },
          },
        },
        SignOutRequest: {
          type: "object",
          required: ["csrfToken"],
          properties: {
            csrfToken: {
              type: "string",
              description: "CSRF token from /api/auth/csrf",
            },
            callbackUrl: {
              type: "string",
              description: "URL to redirect after logout",
            },
          },
        },
        Session: {
          type: "object",
          properties: {
            user: { $ref: "#/components/schemas/User" },
            expires: {
              type: "string",
              format: "date-time",
              description: "Session expiration time",
            },
          },
        },
        CSRFResponse: {
          type: "object",
          properties: {
            csrfToken: {
              type: "string",
              description: "CSRF token for form protection",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string", description: "Error message" },
            details: {
              type: "object",
              description: "Additional error details",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            message: { type: "string", description: "Success message" },
            user: { $ref: "#/components/schemas/User" },
          },
        },
        MenuItem: {
          type: "object",
          properties: {
            id: { type: "string", description: "Menu item ID" },
            name: { type: "string", description: "Item name" },
            description: {
              type: "string",
              nullable: true,
              description: "Item description",
            },
            price: { type: "integer", description: "Price in cents" },
            formattedPrice: {
              type: "string",
              description: "Formatted price as currency",
            },
            image: {
              type: "string",
              nullable: true,
              description: "Item image URL",
            },
            active: { type: "boolean", description: "Whether item is active" },
            featured: {
              type: "boolean",
              description: "Whether item is featured",
            },
            categoryId: { type: "string", description: "Category ID" },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
            category: { $ref: "#/components/schemas/Category" },
            optionGroups: {
              type: "array",
              items: { $ref: "#/components/schemas/ItemOptionGroup" },
            },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "string", description: "Category ID" },
            name: { type: "string", description: "Category name" },
            description: {
              type: "string",
              nullable: true,
              description: "Category description",
            },
            image: {
              type: "string",
              nullable: true,
              description: "Category image URL",
            },
            active: {
              type: "boolean",
              description: "Whether category is active",
            },
            sortOrder: { type: "integer", description: "Sort order" },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/MenuItem" },
            },
          },
        },
        ItemOptionGroup: {
          type: "object",
          properties: {
            id: { type: "string", description: "Option group ID" },
            name: { type: "string", description: "Option group name" },
            required: {
              type: "boolean",
              description: "Whether selection is required",
            },
            multiple: {
              type: "boolean",
              description: "Whether multiple options allowed",
            },
            itemId: { type: "string", description: "Associated item ID" },
            options: {
              type: "array",
              items: { $ref: "#/components/schemas/ItemOption" },
            },
          },
        },
        ItemOption: {
          type: "object",
          properties: {
            id: { type: "string", description: "Option ID" },
            name: { type: "string", description: "Option name" },
            price: {
              type: "integer",
              description: "Additional price in cents",
            },
            formattedPrice: {
              type: "string",
              description: "Formatted additional price",
            },
            groupId: { type: "string", description: "Option group ID" },
          },
        },
        MenuResponse: {
          type: "object",
          properties: {
            categories: {
              type: "array",
              items: { $ref: "#/components/schemas/Category" },
            },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/MenuItem" },
            },
          },
        },
      },
    },
    security: [],
    paths: {
      // Merge all endpoint groups
      ...authEndpoints,
      ...menuEndpoints,
      ...paymentEndpoints,
      ...cartEndpoints,
      ...orderEndpoints,
      ...adminEndpoints,
      ...adminItemsEndpoints,
      ...adminCategoriesDetailEndpoints,
      ...adminExpensesDetailEndpoints,
      ...adminSettingsEndpoints,
      ...adminAuditEndpoints,
      ...adminPaymentEndpoints,
      ...adminCleanupEndpoints,
    },
  };

  return spec;
};
