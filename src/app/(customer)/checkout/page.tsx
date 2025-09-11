"use client";

import { useCheckoutPage } from "@/hooks/useCheckoutPage";
import { CartEmptyState } from "@/components/ui/StandardStates";
import { CheckoutForm, CheckoutSummary } from "@/components/customer/checkout";
import { PageWrapper, PageStateHandler, PageHeader } from "@/components/ui/layout";
import { AuthRequired } from "@/components/ui/AuthRequired";
import { SkeletonCheckoutPage } from "@/components/ui/skeleton";
import { CartSummary } from "@/types/cart";

export default function CheckoutPage() {
  const {
    state,
    formData,
    loading,
    error,
    session,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    formatPrice,
  } = useCheckoutPage();

  const emptyState = !state.cart || state.cart.items.length === 0 ? (
    <CartEmptyState 
      onBrowseMenu={() => window.location.href = '/menu'}
      onGoHome={() => window.location.href = '/'}
    />
  ) : null;

  // Show authentication required message for guest users
  if (!session?.user) {
    return (
      <PageWrapper>
        <AuthRequired
          title={
            <>
              <span className="text-emerald-600">Sign In</span> Required
            </>
          }
          subtitle="You need to sign in or create an account to proceed with checkout"
          signInUrl="/auth/signin?callbackUrl=/checkout"
          signUpUrl="/auth/signup?callbackUrl=/checkout"
          backUrl="/cart"
          backText="Back to Cart"
        />
      </PageWrapper>
    );
  }

  if (state.initialLoading) {
    return <SkeletonCheckoutPage />;
  }

  return (
    <PageWrapper>
      <PageStateHandler
        loading={false}
        error={state.error}
        loadingMessage="Loading checkout..."
        onRetry={() => window.location.reload()}
        showEmptyState={!state.cart || state.cart.items.length === 0}
        emptyState={emptyState}
      >
        <PageHeader
          title={
            <>
              Complete Your <span className="text-emerald-600">Order</span>
            </>
          }
          subtitle="Review your information and place your order"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          <CheckoutForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            loading={loading || isSubmitting}
            error={error}
            cartLoading={state.initialLoading || state.loading}
          />
          
          <CheckoutSummary
            cart={state.cart as CartSummary}
            formatPrice={formatPrice}
          />
        </div>
      </PageStateHandler>
    </PageWrapper>
  );
}
