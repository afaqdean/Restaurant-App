"use client";

import { ItemCustomizationModal } from "@/components/ui/ItemCustomizationModal";
import { useCartPage } from "@/hooks/useCartPage";
import { PageLoadingState, PageErrorState, CartEmptyState } from "@/components/ui/StandardStates";
import {
  CartHero,
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

  if (state.initialLoading) {
    return <PageLoadingState message="Loading your cart..." />;
  }

  if (state.error) {
    return (
      <PageErrorState 
        message={state.error} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  if (!state.cart || state.cart.items.length === 0) {
    return (
      <CartEmptyState 
        onBrowseMenu={() => window.location.href = '/menu'}
        onGoHome={() => window.location.href = '/'}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <CartHero
          title={
            <>
              Your <span className="text-emerald-600">Shopping Cart</span>
            </>
          }
          subtitle="Review your order and proceed to checkout when you&apos;re ready"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          <CartItemsList
            items={state.cart.items}
            notes={notes}
            isLoading={state.loading}
            onQuantityChange={handleQuantityChange}
            onNotesChange={handleNotesChange}
            onOpenCustomization={handleOpenCustomization}
            onRemove={removeFromCart}
            formatPrice={formatPrice}
          />
          
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
        </div>
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
    </div>
  );
}
