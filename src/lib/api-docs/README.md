# API Documentation Structure

This directory contains modular API documentation files that are imported into the main Scalar configuration.

## File Structure

```
src/lib/api-docs/
├── README.md                           # This file
├── auth-endpoints.ts                   # Authentication endpoints
├── menu-endpoints.ts                   # Menu and category endpoints
├── payment-endpoints.ts                # Payment processing endpoints
├── cart-endpoints.ts                   # Shopping cart endpoints
├── order-endpoints.ts                  # Order management endpoints
├── admin-endpoints.ts                  # Admin panel basic endpoints
├── admin-items-endpoints.ts            # Admin menu items management
├── admin-categories-detail-endpoints.ts # Admin category detail operations
├── admin-expenses-detail-endpoints.ts  # Admin expense detail operations
├── admin-settings-endpoints.ts         # Admin settings management
├── admin-audit-endpoints.ts            # Admin audit logs
├── admin-payment-endpoints.ts          # Admin payment operations
└── admin-cleanup-endpoints.ts          # Admin cleanup operations
```

## How It Works

1. **Modular Files**: Each file exports an object containing endpoint definitions
2. **Main Import**: `scalar.ts` imports all endpoint files and merges them
3. **Automatic Updates**: Adding new endpoints to any file automatically includes them in Scalar

## Adding New Endpoints

### 1. Add to Existing File

If the endpoint belongs to an existing category, add it to the appropriate file:

```typescript
// In cart-endpoints.ts
export const cartEndpoints = {
  "/api/cart": {
    /* existing endpoints */
  },
  "/api/cart/new-endpoint": {
    // Add new endpoint here
    get: {
      summary: "New endpoint",
      // ... rest of definition
    },
  },
};
```

### 2. Create New File

For a new category, create a new file:

```typescript
// In src/lib/api-docs/new-category-endpoints.ts
export const newCategoryEndpoints = {
  "/api/new-category/endpoint": {
    get: {
      summary: "New category endpoint",
      // ... definition
    },
  },
};
```

Then import it in `scalar.ts`:

```typescript
import { newCategoryEndpoints } from "./api-docs/new-category-endpoints";

// In the paths section:
paths: {
  ...authEndpoints,
  ...menuEndpoints,
  ...paymentEndpoints,
  ...cartEndpoints,
  ...orderEndpoints,
  ...adminEndpoints,
  ...newCategoryEndpoints,  // Add here
},
```

## Benefits

- ✅ **Maintainable**: Each endpoint group is in its own file
- ✅ **Scalable**: Easy to add new endpoint categories
- ✅ **Organized**: Clear separation of concerns
- ✅ **Version Control**: Changes to specific endpoint groups are isolated
- ✅ **Team Collaboration**: Multiple developers can work on different endpoint groups

## Available Endpoints

### Authentication (`auth-endpoints.ts`)

- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signout` - User sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/csrf` - Get CSRF token

### Menu (`menu-endpoints.ts`)

- `GET /api/menu` - Get menu items with categories
- `GET /api/menu/categories` - Get all categories
- `GET /api/menu/featured` - Get featured items
- `GET /api/menu/{id}` - Get specific menu item

### Payments (`payment-endpoints.ts`)

- `POST /api/payments/cod/confirm` - Confirm COD payment
- `POST /api/payments/stripe/create-intent` - Create Stripe payment intent
- `POST /api/payments/stripe/confirm` - Confirm Stripe payment
- `POST /api/payments/stripe/webhook` - Stripe webhook handler

### Cart (`cart-endpoints.ts`)

- `GET /api/cart` - Get cart contents
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item
- `DELETE /api/cart` - Remove item from cart
- `POST /api/cart/coupon` - Apply coupon

### Orders (`order-endpoints.ts`)

- `GET /api/orders` - Get user orders
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders/{id}/receipt` - Download order receipt
- `POST /api/checkout` - Process checkout

### Admin (`admin-endpoints.ts`)

- `GET /api/admin/dashboard` - Get dashboard data
- `GET /api/admin/orders` - Get all orders (admin)
- `PUT /api/admin/orders/{id}/status` - Update order status
- `GET /api/admin/categories` - Get all categories (admin)
- `POST /api/admin/categories` - Create new category
- `GET /api/admin/expenses` - Get all expenses
- `POST /api/admin/expenses` - Create new expense
- `GET /api/admin/reports` - Get financial reports

### Admin Items (`admin-items-endpoints.ts`)

- `GET /api/admin/items` - Get all menu items (admin)
- `POST /api/admin/items` - Create new menu item
- `GET /api/admin/items/{id}` - Get item by ID (admin)
- `PUT /api/admin/items/{id}` - Update menu item

### Admin Categories Detail (`admin-categories-detail-endpoints.ts`)

- `GET /api/admin/categories/{id}` - Get category by ID (admin)
- `PUT /api/admin/categories/{id}` - Update category

### Admin Expenses Detail (`admin-expenses-detail-endpoints.ts`)

- `GET /api/admin/expenses/{id}` - Get expense by ID (admin)
- `PUT /api/admin/expenses/{id}` - Update expense
- `DELETE /api/admin/expenses/{id}` - Delete expense

### Admin Settings (`admin-settings-endpoints.ts`)

- `GET /api/admin/settings` - Get application settings
- `PUT /api/admin/settings` - Update application settings

### Admin Audit (`admin-audit-endpoints.ts`)

- `GET /api/admin/audit-logs` - Get audit logs

### Admin Payments (`admin-payment-endpoints.ts`)

- `POST /api/admin/payments/{id}/confirm` - Confirm payment (admin)
- `POST /api/admin/payments/{id}/refund` - Process refund (admin)

### Admin Cleanup (`admin-cleanup-endpoints.ts`)

- `POST /api/admin/cleanup-carts` - Cleanup abandoned carts

## Testing in Scalar

Visit `http://localhost:3000/reference` to see all documented endpoints in the Scalar UI.

Each endpoint includes:

- ✅ Request/response schemas
- ✅ Example payloads
- ✅ Error responses
- ✅ Parameter descriptions
- ✅ Authentication requirements
