# 🍽️ Restaurant Management & Ordering System

A comprehensive, production-ready restaurant management and online ordering platform. This full-stack application provides seamless ordering experiences for customers while giving restaurant owners powerful tools for operations management, analytics, and business intelligence.

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your database and Stripe keys

# 3. Setup database
npm run db:push
npm run db:seed  # Optional: load sample data

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🎯 Key Features

### 👥 Customer Features

- ✅ **User Authentication** - Secure signup/signin with email & password
- ✅ **Menu Browsing** - Browse items by category with detailed descriptions
- ✅ **Item Customization** - Add options, sizes, toppings with dynamic pricing
- ✅ **Shopping Cart** - Full cart management with real-time calculations
- ✅ **Checkout** - Streamlined checkout with delivery info & special notes
- ✅ **Multiple Payments** - Stripe card payments or Cash on Delivery
- ✅ **Order Tracking** - Real-time order status updates (PENDING → IN_KITCHEN → READY → COMPLETED)
- ✅ **Digital Receipts** - Download and print PDF receipts
- ✅ **Order History** - Complete record of all past orders

### 📊 Admin Dashboard

- ✅ **Real-time KPIs** - Today's orders, revenue, AOV, completion time
- ✅ **Menu Management** - Create/edit categories and items with images
- ✅ **Order Management** - View, update status, and manage all orders
- ✅ **Payment Tracking** - Monitor Stripe and COD transactions
- ✅ **Expense Tracking** - Log expenses by category with receipt storage
- ✅ **Advanced Reports** - Revenue, profit, and order analytics with CSV export
- ✅ **Audit Logs** - Full change history for compliance
- ✅ **System Settings** - Configure restaurant info, taxes, fees, and policies

### 🔧 Technical Highlights

- ✅ **Type-Safe** - Full TypeScript implementation
- ✅ **API Documentation** - Interactive Swagger/Scalar UI at `/api-docs`
- ✅ **Secure Auth** - NextAuth.js with role-based access control
- ✅ **Payment Processing** - Integrated Stripe with webhooks
- ✅ **Database** - PostgreSQL with Prisma ORM
- ✅ **Responsive UI** - Mobile-first design with Tailwind CSS
- ✅ **Real-time Updates** - React Query for data synchronization

---

## 📦 Tech Stack

| Category     | Technology                           |
| ------------ | ------------------------------------ |
| **Frontend** | Next.js 15, React 19, TypeScript     |
| **Styling**  | Tailwind CSS, Radix UI, Lucide Icons |
| **Forms**    | React Hook Form, Zod validation      |
| **State**    | TanStack Query (React Query)         |
| **Database** | PostgreSQL, Prisma ORM               |
| **Auth**     | NextAuth.js v4                       |
| **Payments** | Stripe API                           |
| **PDF**      | PDFMake, jsPDF, html2canvas          |
| **3D**       | Three.js, @react-three/fiber         |
| **Dev**      | ESLint, TypeScript Strict Mode       |

---

## 📂 Project Structure

```
restaurant-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (customer)/         # Customer routes
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── menu/
│   │   │   ├── orders/
│   │   │   └── payment/
│   │   ├── admin/              # Admin dashboard
│   │   │   ├── dashboard/
│   │   │   ├── menu/
│   │   │   ├── orders/
│   │   │   ├── expenses/
│   │   │   ├── reports/
│   │   │   ├── audit/
│   │   │   └── settings/
│   │   └── api/                # RESTful API endpoints
│   ├── components/             # React components
│   │   ├── admin/
│   │   ├── customer/
│   │   ├── auth/
│   │   └── ui/
│   ├── hooks/                  # Custom React hooks
│   ├── lib/
│   │   ├── services/           # Business logic
│   │   ├── validations/        # Zod schemas
│   │   └── auth.ts
│   ├── types/                  # TypeScript types
│   └── contexts/               # React contexts
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Sample data
├── public/
│   ├── openapi.json            # API spec
│   └── images/
└── package.json
```

---

## 📋 Available Scripts

### Development

```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Database Management

```bash
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes to DB
npm run db:studio        # Open Prisma Studio GUI
npm run db:seed          # Load sample data
npm run db:reset         # Reset DB and reseed (CAUTION!)
```

### Stripe Integration

```bash
npm run stripe:listen    # Listen for Stripe webhooks locally
```

### Utilities

```bash
npm run clean            # Clear build cache
npm run postinstall      # Auto-run on npm install
```

---

## 🔐 Authentication & Authorization

### User Roles

- **ADMIN** - Full system access including dashboard, menu, orders, reports
- **STAFF** - Limited access (kitchen staff, delivery partners)
- **CUSTOMER** - Customer ordering functionality only

### Security Features

- 🔒 Passwords hashed with bcryptjs
- 🔒 Secure session management via NextAuth.js
- 🔒 CSRF protection on all forms
- 🔒 Role-based access control (RBAC)
- 🔒 Input validation with Zod schemas
- 🔒 Stripe PCI compliance (no direct card storage)

---

## 💳 Payment Integration

### Stripe Setup

1. Get API keys from [Stripe Dashboard](https://dashboard.stripe.com)
2. Set `STRIPE_PUBLIC_KEY` and `STRIPE_SECRET_KEY` in `.env.local`
3. Configure webhook in Stripe Dashboard → Webhooks
4. Point webhook to: `https://yourdomain.com/api/stripe/webhook`

### Payment Methods

- **Card Payments** - Via Stripe for secure online payments
- **Cash on Delivery** - Traditional payment at delivery
- **Refunds** - Full refund capability through Stripe

---

## 🗄️ Database Overview

### Core Models

- **User** - Customers, admins, staff with roles
- **Category** - Menu categories
- **Item** - Menu items with pricing
- **ItemOptionGroup & ItemOption** - Customizations (sizes, toppings, etc.)
- **Order** - Customer orders with status tracking
- **OrderItem & OrderItemOption** - Order line items and selections
- **Payment** - Payment records and transactions
- **Coupon** - Discount codes and promotions
- **Expense** - Business expenses by category
- **AuditLog** - Change tracking for compliance
- **Settings** - System configuration

See [Database Schema Documentation](./README_FEATURES.md#-database-schema) for full details.

---

## 📡 API Documentation

### Access API Docs

- **Interactive UI**: http://localhost:3000/api-docs
- **OpenAPI Spec**: http://localhost:3000/public/openapi.json

### API Endpoints

#### Authentication

```
POST   /api/auth/signup          - Register new user
POST   /api/auth/signin          - Login user
POST   /api/auth/signout         - Logout user
```

#### Menu (Public)

```
GET    /api/menu                 - Get all menu items
GET    /api/menu/[id]            - Get item details
GET    /api/menu/categories      - Get categories
```

#### Orders & Cart

```
GET    /api/cart                 - Get cart
POST   /api/cart/add             - Add to cart
DELETE /api/cart/remove          - Remove from cart
POST   /api/orders               - Create order
GET    /api/orders               - Get order history
GET    /api/orders/[id]          - Get order details
```

#### Payments

```
POST   /api/payments/create-intent - Create Stripe payment intent
POST   /api/stripe/webhook       - Stripe webhook receiver
```

#### Admin Only

```
GET    /api/admin/dashboard      - Dashboard KPIs
GET    /api/admin/orders         - All orders
PUT    /api/admin/orders/[id]    - Update order status
GET    /api/admin/reports        - Generate reports
GET    /api/admin/expenses       - Expense list
POST   /api/admin/expenses       - Create expense
GET    /api/admin/audit-logs     - Audit trail
```

---

## ⚙️ Environment Variables

### Required

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/restaurant_db

# NextAuth.js Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key

# Stripe Payment Processing
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Optional

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Email (if configured)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Connect your GitHub repository to Vercel
# Automatic deployment on push
# Set environment variables in Vercel dashboard
```

### Self-Hosted

```bash
# Build
npm run build

# Set environment variables
export DATABASE_URL=...
export NEXTAUTH_SECRET=...
export STRIPE_SECRET_KEY=...

# Start
npm run start
```

---

## 🛠️ Development Guide

### Adding a New Feature

1. **Create database model** in `prisma/schema.prisma`

   ```bash
   npm run db:push
   ```

2. **Create API endpoint** in `src/app/api/...`

3. **Create custom hook** in `src/hooks/`

4. **Create components** in `src/components/`

5. **Add validation schema** in `src/lib/validations/`

6. **Add types** in `src/types/`

### Database Changes

```bash
# Edit schema.prisma
npm run db:push           # Apply changes
npm run db:studio         # Verify in GUI
```

---

## 📊 Dashboard Features

### Admin Dashboard Includes:

- 📈 Real-time KPI metrics (orders, revenue, AOV)
- 📊 Payment method breakdown (pie chart)
- 🏃 Recent orders feed
- 📅 Daily/weekly/monthly analytics
- 💰 Revenue and expense tracking
- 🎯 Profit margin calculations
- 📝 Audit trail logging
- ⚙️ System settings management

---

## 🧪 Testing

### Test Order Flow

1. Visit http://localhost:3000
2. Browse menu and add items to cart
3. Proceed to checkout
4. Use Stripe test card: `4242 4242 4242 4242`
5. Complete order
6. View in admin dashboard at http://localhost:3000/admin

### Test Admin Features

1. Login with admin account
2. Navigate to Dashboard, Orders, Menu, Reports
3. Create/edit menu items
4. Update order statuses
5. View analytics and reports

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)

---

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Verify connection string
echo $DATABASE_URL

# Reset database
npm run db:reset
```

### Stripe Webhook Not Receiving Events

```bash
# Ensure webhook is running
npm run stripe:listen

# Check webhook signing secret matches
# Dashboard → Developers → Webhooks → Signing secret
```

### Build Errors

```bash
npm run clean
npm install
npm run db:generate
npm run build
```

---

## 📄 License

This project is provided as-is for restaurant management purposes.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

---

## 📞 Support

For issues and questions, please check the project documentation or create an issue in the repository.

---

**Version:** 0.1.0  
**Last Updated:** September 2026  
**Framework:** Next.js 15 + React 19
