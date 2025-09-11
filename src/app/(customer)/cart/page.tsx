"use client";

import { ItemCustomizationModal } from "@/components/ui/ItemCustomizationModal";
import { useCartPage } from "@/hooks/useCartPage";
import { CartEmptyState } from "@/components/ui/StandardStates";
import { PageWrapper, PageStateHandler, PageHeader } from "@/components/ui/layout";
import { SkeletonCartPage } from "@/components/ui/skeleton";
import {
  CartItemsList,
  OrderSummary,
} from "@/components/customer/cart";

export default function CartPage() {
  const {
    state,
    session,
    couponCode,
    notes,
    customizationModal,
    setCouponCode,
    handleQuantityChange,
    handleNotesChange,
    handleApplyCoupon,
    handleOpenCustomization,
    handleCloseCustomization,
    handleSaveCustomization,
    removeFromCart,
    removeCoupon,
    clearCart,
    formatPrice,
  } = useCartPage();

  const emptyState = !state.cart || state.cart.items.length === 0 ? (
    <CartEmptyState 
      onBrowseMenu={() => window.location.href = '/menu'}
      onGoHome={() => window.location.href = '/'}
    />
  ) : null;

  if (state.initialLoading) {
    return <SkeletonCartPage />;
  }

  return (
    <PageWrapper>
      <PageStateHandler
        loading={false}
        error={state.error}
        loadingMessage="Loading your cart..."
        onRetry={() => window.location.reload()}
        showEmptyState={!state.cart || state.cart.items.length === 0}
        emptyState={emptyState}
      >
        <PageHeader
          title={
            <>
              Your <span className="text-emerald-600">Shopping Cart</span>
            </>
          }
          subtitle="Review your order and proceed to checkout when you're ready"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          <CartItemsList
            items={state.cart?.items || []}
            notes={notes}
            isLoading={state.loading}
            onQuantityChange={handleQuantityChange}
            onNotesChange={handleNotesChange}
            onOpenCustomization={handleOpenCustomization}
            onRemove={removeFromCart}
            formatPrice={formatPrice}
          />
          
          {state.cart && (
            <OrderSummary
              cart={state.cart}
              couponCode={couponCode}
              onCouponCodeChange={setCouponCode}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={removeCoupon}
              onClearCart={clearCart}
              formatPrice={formatPrice}
              isAuthenticated={!!session?.user}
            />
          )}
        </div>

        {/* Customization Modal */}
        {customizationModal.item && (
          <ItemCustomizationModal
            isOpen={customizationModal.isOpen}
            onClose={handleCloseCustomization}
            item={customizationModal.item}
            onSave={handleSaveCustomization}
          />
        )}
      </PageStateHandler>
    </PageWrapper>
  );
}
