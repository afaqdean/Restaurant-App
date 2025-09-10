import { memo } from "react";
import { SkeletonBase, SkeletonBox, SkeletonText, SkeletonImage, SkeletonButton } from "./SkeletonBase";
import { 
  SkeletonMenuItemCard, 
  SkeletonOrderCard, 
  SkeletonKPICard,
  SkeletonCartItemCard,
  SkeletonPaymentSplitCard,
  SkeletonRecentOrdersCard
} from "./SkeletonCards";
import { 
  SkeletonCheckoutForm, 
  SkeletonPaymentForm, 
  SkeletonSettingsForm 
} from "./SkeletonForms";
import { 
  SkeletonOrdersTable, 
  SkeletonAuditTable, 
  SkeletonMenuTable,
  SkeletonExpensesTable 
} from "./SkeletonTables";
import { 
  SkeletonMenuCategories, 
  SkeletonOrderItemsList,
  SkeletonCartItemsList,
  SkeletonFilterControls,
  SkeletonPagination
} from "./SkeletonLists";

interface SkeletonMenuPageProps {
  className?: string;
}

export const SkeletonMenuPage = memo(function SkeletonMenuPage({
  className = ""
}: SkeletonMenuPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <SkeletonText lines={1} lineHeight="lg" className="w-96 mx-auto text-4xl" />
          <SkeletonText lines={1} lineHeight="md" className="w-80 mx-auto text-xl mt-4" />
        </div>

        {/* Filter Controls */}
        <SkeletonFilterControls className="mb-8" />

        {/* Menu Categories */}
        <SkeletonMenuCategories categoriesCount={3} itemsPerCategory={4} />
      </div>
    </SkeletonBase>
  );
});

interface SkeletonOrdersPageProps {
  className?: string;
}

export const SkeletonOrdersPage = memo(function SkeletonOrdersPage({
  className = ""
}: SkeletonOrdersPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className="w-64 text-4xl" />
          <SkeletonText lines={1} lineHeight="md" className="w-80 text-xl mt-2" />
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <SkeletonButton size="md" className="w-32" />
        </div>

        {/* Filter Controls */}
        <SkeletonFilterControls className="mb-8" />

        {/* Orders List */}
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonOrderCard key={index} />
          ))}
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonOrderDetailsPageProps {
  className?: string;
}

export const SkeletonOrderDetailsPage = memo(function SkeletonOrderDetailsPage({
  className = ""
}: SkeletonOrderDetailsPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className="w-80 text-4xl" />
          <SkeletonText lines={1} lineHeight="md" className="w-96 text-xl mt-2" />
        </div>

        {/* Success Message */}
        <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <div className="flex items-center mb-3">
            <SkeletonBox width={24} height={24} rounded="full" className="bg-emerald-100" />
            <SkeletonText lines={1} lineHeight="md" className="w-48 ml-3" />
          </div>
          <SkeletonText lines={2} lineHeight="sm" className="w-full" />
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="space-y-6">
              <SkeletonText lines={1} lineHeight="lg" className="w-32" />
              <SkeletonOrderItemsList itemsCount={4} />
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <SkeletonText lines={1} lineHeight="sm" className="w-20" />
                    <SkeletonText lines={1} lineHeight="sm" className="w-16" />
                  </div>
                  <div className="flex justify-between">
                    <SkeletonText lines={1} lineHeight="sm" className="w-24" />
                    <SkeletonText lines={1} lineHeight="sm" className="w-16" />
                  </div>
                  <div className="flex justify-between font-semibold">
                    <SkeletonText lines={1} lineHeight="md" className="w-16" />
                    <SkeletonText lines={1} lineHeight="md" className="w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="space-y-6">
              <SkeletonText lines={1} lineHeight="lg" className="w-32" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <SkeletonBox width={12} height={12} rounded="full" className="bg-emerald-100" />
                    <div className="flex-1 space-y-1">
                      <SkeletonText lines={1} lineHeight="md" className="w-32" />
                      <SkeletonText lines={1} lineHeight="sm" className="w-48" />
                      <SkeletonText lines={1} lineHeight="sm" className="w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonCheckoutPageProps {
  className?: string;
}

export const SkeletonCheckoutPage = memo(function SkeletonCheckoutPage({
  className = ""
}: SkeletonCheckoutPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className="w-80 text-4xl" />
          <SkeletonText lines={1} lineHeight="md" className="w-96 text-xl mt-2" />
        </div>

        {/* Checkout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <SkeletonCheckoutForm />
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="space-y-6">
              <SkeletonText lines={1} lineHeight="lg" className="w-32" />
              <SkeletonCartItemsList itemsCount={3} />
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <SkeletonText lines={1} lineHeight="sm" className="w-20" />
                    <SkeletonText lines={1} lineHeight="sm" className="w-16" />
                  </div>
                  <div className="flex justify-between">
                    <SkeletonText lines={1} lineHeight="sm" className="w-24" />
                    <SkeletonText lines={1} lineHeight="sm" className="w-16" />
                  </div>
                  <div className="flex justify-between font-semibold">
                    <SkeletonText lines={1} lineHeight="md" className="w-16" />
                    <SkeletonText lines={1} lineHeight="md" className="w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonPaymentPageProps {
  className?: string;
}

export const SkeletonPaymentPage = memo(function SkeletonPaymentPage({
  className = ""
}: SkeletonPaymentPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className="w-80 text-4xl" />
          <SkeletonText lines={1} lineHeight="md" className="w-96 text-xl mt-2" />
        </div>

        {/* Payment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <SkeletonPaymentForm />

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="space-y-6">
              <SkeletonText lines={1} lineHeight="lg" className="w-32" />
              <SkeletonOrderItemsList itemsCount={3} />
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <SkeletonText lines={1} lineHeight="sm" className="w-20" />
                    <SkeletonText lines={1} lineHeight="sm" className="w-16" />
                  </div>
                  <div className="flex justify-between">
                    <SkeletonText lines={1} lineHeight="sm" className="w-24" />
                    <SkeletonText lines={1} lineHeight="sm" className="w-16" />
                  </div>
                  <div className="flex justify-between font-semibold">
                    <SkeletonText lines={1} lineHeight="md" className="w-16" />
                    <SkeletonText lines={1} lineHeight="md" className="w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonCartPageProps {
  className?: string;
}

export const SkeletonCartPage = memo(function SkeletonCartPage({
  className = ""
}: SkeletonCartPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className="w-64 text-4xl" />
          <SkeletonText lines={1} lineHeight="md" className="w-80 text-xl mt-2" />
        </div>

        {/* Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCartItemCard key={index} />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="space-y-6">
              <SkeletonText lines={1} lineHeight="lg" className="w-32" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <SkeletonText lines={1} lineHeight="sm" className="w-20" />
                  <SkeletonText lines={1} lineHeight="sm" className="w-16" />
                </div>
                <div className="flex justify-between">
                  <SkeletonText lines={1} lineHeight="sm" className="w-24" />
                  <SkeletonText lines={1} lineHeight="sm" className="w-16" />
                </div>
                <div className="flex justify-between font-semibold">
                  <SkeletonText lines={1} lineHeight="md" className="w-16" />
                  <SkeletonText lines={1} lineHeight="md" className="w-20" />
                </div>
              </div>
              <SkeletonButton size="lg" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonAdminDashboardProps {
  className?: string;
}

export const SkeletonAdminDashboard = memo(function SkeletonAdminDashboard({
  className = ""
}: SkeletonAdminDashboardProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className="w-80 text-4xl" />
          <SkeletonText lines={1} lineHeight="md" className="w-96 text-xl mt-2" />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonKPICard key={index} />
          ))}
        </div>

        {/* Charts and Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <SkeletonRecentOrdersCard />
          
          {/* Payment Split */}
          <SkeletonPaymentSplitCard />
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonAdminOrdersPageProps {
  className?: string;
}

export const SkeletonAdminOrdersPage = memo(function SkeletonAdminOrdersPage({
  className = ""
}: SkeletonAdminOrdersPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className="w-80 text-4xl" />
          <SkeletonText lines={1} lineHeight="md" className="w-96 text-xl mt-2" />
        </div>

        {/* Filter Button */}
        <div className="flex justify-end mb-6">
          <SkeletonButton size="md" className="w-24" />
        </div>

        {/* Orders Table */}
        <SkeletonOrdersTable rows={8} className="mb-4" />

        {/* Pagination */}
        <SkeletonPagination />
      </div>
    </SkeletonBase>
  );
});

interface SkeletonAdminMenuPageProps {
  className?: string;
}

export const SkeletonAdminMenuPage = memo(function SkeletonAdminMenuPage({
  className = ""
}: SkeletonAdminMenuPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className="w-64 text-4xl" />
          <SkeletonText lines={1} lineHeight="md" className="w-80 text-xl mt-2" />
        </div>

        {/* Add Item Button */}
        <div className="mb-6">
          <SkeletonButton size="md" className="w-32" />
        </div>

        {/* Menu Table */}
        <SkeletonMenuTable rows={8} className="mb-4" />

        {/* Pagination */}
        <SkeletonPagination />
      </div>
    </SkeletonBase>
  );
});

interface SkeletonAdminReportsPageProps {
  className?: string;
}

export const SkeletonAdminReportsPage = memo(function SkeletonAdminReportsPage({
  className = ""
}: SkeletonAdminReportsPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className="w-64 text-4xl" />
          <SkeletonText lines={1} lineHeight="md" className="w-80 text-xl mt-2" />
        </div>

        {/* Date Range Controls */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center space-x-4">
            <SkeletonBox width={200} height={40} className="bg-gray-100" />
            <SkeletonBox width={200} height={40} className="bg-gray-100" />
            <SkeletonButton size="md" className="w-24" />
            <SkeletonButton size="md" className="w-32" />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonKPICard key={index} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <SkeletonText lines={1} lineHeight="lg" className="w-48 mb-4" />
            <SkeletonBox width="100%" height={300} className="bg-gray-100" />
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <SkeletonText lines={1} lineHeight="lg" className="w-48 mb-4" />
            <SkeletonBox width="100%" height={300} className="bg-gray-100" />
          </div>
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonAdminSettingsPageProps {
  className?: string;
}

export const SkeletonAdminSettingsPage = memo(function SkeletonAdminSettingsPage({
  className = ""
}: SkeletonAdminSettingsPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className="w-48 text-4xl" />
          <SkeletonText lines={1} lineHeight="md" className="w-80 text-xl mt-2" />
        </div>

        {/* Settings Form */}
        <SkeletonSettingsForm />
      </div>
    </SkeletonBase>
  );
});
