"use client";

import { Suspense } from "react";
import { PaymentForm, PaymentSummary } from "@/components/customer/payment";
import { PageWrapper, PageStateHandler, PageHeader, GridLayout } from "@/components/ui/layout";
import { PageLoadingState } from "@/components/ui/StandardStates";
import { usePaymentPage } from "@/hooks/usePaymentPage";

function PaymentPageContent() {
  const {
    order,
    loading,
    error,
    paymentStatus,
    paymentError,
    clientSecret,
    handlePaymentSuccess,
    handlePaymentError,
    handleRetryPayment,
    refetch,
    formatPrice,
  } = usePaymentPage();

  return (
    <PageWrapper>
      <PageStateHandler
        loading={loading}
        error={error || (!order || !clientSecret ? "Invalid payment session" : null)}
        loadingMessage="Loading payment..."
        onRetry={refetch}
      >
        <PageHeader
          title={
            <>
              Complete Your <span className="text-emerald-600">Payment</span>
            </>
          }
          subtitle={`Order #${order!.orderNumber} - Secure payment processing`}
        />
        
        <GridLayout columns={3} className="pb-12">
          <PaymentForm
            clientSecret={clientSecret!}
            paymentStatus={paymentStatus}
            paymentError={paymentError}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            onRetryPayment={handleRetryPayment}
          />
          
          <PaymentSummary
            order={order!}
            formatPrice={formatPrice}
          />
        </GridLayout>
      </PageStateHandler>
    </PageWrapper>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<PageLoadingState message="Loading payment..." />}>
      <PaymentPageContent />
    </Suspense>
  );
}
