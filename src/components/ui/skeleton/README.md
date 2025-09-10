# Skeleton Loading Components

A comprehensive collection of skeleton loading components designed to improve user experience during data loading states across the restaurant application.

## Overview

This skeleton system provides:

- **Base Components**: Fundamental building blocks for all skeleton elements
- **Card Components**: Skeleton versions of common card layouts
- **Form Components**: Skeleton versions of forms and input fields
- **Table Components**: Skeleton versions of data tables
- **List Components**: Skeleton versions of lists and collections
- **Page Components**: Complete page-level skeleton layouts

## Base Components

### SkeletonBase

The root component that provides the pulse animation.

```tsx
import { SkeletonBase } from "@/components/ui/skeleton";

<SkeletonBase className="custom-class">
  <div>Your content here</div>
</SkeletonBase>;
```

### SkeletonBox

A simple rectangular skeleton element.

```tsx
import { SkeletonBox } from "@/components/ui/skeleton";

<SkeletonBox width={200} height={40} rounded="lg" className="bg-gray-200" />;
```

### SkeletonText

Multi-line text skeleton with customizable line count.

```tsx
import { SkeletonText } from "@/components/ui/skeleton";

<SkeletonText lines={3} lineHeight="md" lastLineWidth="75%" />;
```

### SkeletonImage

Image placeholder with icon.

```tsx
import { SkeletonImage } from "@/components/ui/skeleton";

<SkeletonImage width={300} height={200} rounded="lg" />;
```

## Card Components

### SkeletonMenuItemCard

Skeleton for menu item cards.

```tsx
import { SkeletonMenuItemCard } from "@/components/ui/skeleton";

<SkeletonMenuItemCard />;
```

### SkeletonOrderCard

Skeleton for order cards.

```tsx
import { SkeletonOrderCard } from "@/components/ui/skeleton";

<SkeletonOrderCard />;
```

### SkeletonKPICard

Skeleton for KPI/metric cards.

```tsx
import { SkeletonKPICard } from "@/components/ui/skeleton";

<SkeletonKPICard />;
```

## Form Components

### SkeletonCheckoutForm

Complete checkout form skeleton.

```tsx
import { SkeletonCheckoutForm } from "@/components/ui/skeleton";

<SkeletonCheckoutForm />;
```

### SkeletonPaymentForm

Payment form skeleton.

```tsx
import { SkeletonPaymentForm } from "@/components/ui/skeleton";

<SkeletonPaymentForm />;
```

## Table Components

### SkeletonOrdersTable

Orders table skeleton.

```tsx
import { SkeletonOrdersTable } from "@/components/ui/skeleton";

<SkeletonOrdersTable rows={5} />;
```

### SkeletonMenuTable

Menu items table skeleton.

```tsx
import { SkeletonMenuTable } from "@/components/ui/skeleton";

<SkeletonMenuTable rows={8} />;
```

## List Components

### SkeletonMenuCategories

Menu categories with items skeleton.

```tsx
import { SkeletonMenuCategories } from "@/components/ui/skeleton";

<SkeletonMenuCategories categoriesCount={3} itemsPerCategory={4} />;
```

### SkeletonOrderItemsList

Order items list skeleton.

```tsx
import { SkeletonOrderItemsList } from "@/components/ui/skeleton";

<SkeletonOrderItemsList itemsCount={5} />;
```

## Page Components

### SkeletonMenuPage

Complete menu page skeleton.

```tsx
import { SkeletonMenuPage } from "@/components/ui/skeleton";

<SkeletonMenuPage />;
```

### SkeletonOrdersPage

Complete orders page skeleton.

```tsx
import { SkeletonOrdersPage } from "@/components/ui/skeleton";

<SkeletonOrdersPage />;
```

### SkeletonAdminDashboard

Admin dashboard skeleton.

```tsx
import { SkeletonAdminDashboard } from "@/components/ui/skeleton";

<SkeletonAdminDashboard />;
```

## Usage Examples

### Replacing Loading States in Pages

```tsx
// Before
if (loading) {
  return <PageLoadingState message="Loading menu..." />;
}

// After
if (loading) {
  return <SkeletonMenuPage />;
}
```

### Replacing Loading States in Components

```tsx
// Before
{
  loading ? (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ) : (
    <MenuItemsList items={items} />
  );
}

// After
{
  loading ? (
    <SkeletonMenuCategories categoriesCount={2} itemsPerCategory={4} />
  ) : (
    <MenuItemsList items={items} />
  );
}
```

### Custom Skeleton Combinations

```tsx
import {
  SkeletonBase,
  SkeletonText,
  SkeletonImage,
  SkeletonButton,
} from "@/components/ui/skeleton";

function CustomSkeleton() {
  return (
    <SkeletonBase className="bg-white rounded-lg p-4">
      <div className="flex space-x-4">
        <SkeletonImage width={80} height={80} rounded="lg" />
        <div className="flex-1 space-y-2">
          <SkeletonText lines={2} />
          <div className="flex justify-between items-center">
            <SkeletonText lines={1} className="w-20" />
            <SkeletonButton size="sm" className="w-24" />
          </div>
        </div>
      </div>
    </SkeletonBase>
  );
}
```

## Styling

All skeleton components use Tailwind CSS classes and can be customized with additional className props. The base animation is provided by the `animate-pulse` class.

### Color Variants

- Default: `bg-gray-200`
- Success: `bg-emerald-100`
- Warning: `bg-yellow-100`
- Error: `bg-red-100`
- Info: `bg-blue-100`

### Size Variants

- Small: `h-3`, `h-4`
- Medium: `h-4`, `h-5`
- Large: `h-5`, `h-6`

## Best Practices

1. **Match Content Structure**: Ensure skeleton components match the actual content layout
2. **Use Appropriate Sizes**: Match skeleton dimensions to expected content
3. **Consistent Spacing**: Use the same spacing as actual components
4. **Progressive Loading**: Show skeleton for the most important content first
5. **Accessibility**: Skeleton components are screen reader friendly

## Performance

All skeleton components are memoized using `React.memo` to prevent unnecessary re-renders and improve performance.
