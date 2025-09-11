"use client";

import { Suspense } from "react";
import { OrderDetails, OrderSummary } from "@/components/customer/order";
import { PageWrapper, PageStateHandler, PageHeader, GridLayout } from "@/components/ui/layout";
import { PageLoadingState } from "@/components/ui/StandardStates";
import { SkeletonOrderDetailsPage } from "@/components/ui/skeleton";
import { CheckCircle, DollarSign } from "lucide-react";
import { useOrderPage } from "@/hooks/useOrderPage";

function OrderPageContent() {
  const {
    order,
    loading,
    error,
    paymentType,
    refetch,
    formatPrice,
  } = useOrderPage();

  if (loading) {
    return <SkeletonOrderDetailsPage />;
  }

  return (
    <PageWrapper>
      <PageStateHandler
        loading={false}
        error={error || (!order ? "Order not found" : null)}
        loadingMessage="Loading order..."
        onRetry={refetch}
      >
        <PageHeader
          title={
            <>
              Order <span className="text-emerald-600">Confirmation</span>
            </>
          }
          subtitle={order ? `Order #${order.orderNumber} - Thank you for your order!` : "Loading order details..."}
        />

        {/* Payment Status Messages */}
        {paymentType === "success" && (
          <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center mb-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 mr-3" />
              <h2 className="text-lg font-semibold text-emerald-800">Payment Successful!</h2>
            </div>
            <p className="text-emerald-700">
              Your payment has been processed successfully. You will receive a confirmation email shortly.
            </p>
          </div>
        )}

        {/* COD Confirmation */}
        {paymentType === "cod" && (
          <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center mb-3">
              <DollarSign className="w-6 h-6 text-yellow-600 mr-3" />
              <h2 className="text-lg font-semibold text-yellow-800">Cash on Delivery</h2>
            </div>
            <p className="text-yellow-700">
              Your order has been placed successfully. Please have the exact amount ready when your order arrives.
            </p>
          </div>
        )}

        {order && (
          <GridLayout columns={3} className="pb-12">
            <OrderDetails
              order={order}
              formatPrice={formatPrice}
            />
            
            <OrderSummary
              order={order}
              formatPrice={formatPrice}
            />
          </GridLayout>
        )}
      </PageStateHandler>
    </PageWrapper>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<PageLoadingState message="Loading order..." />}>
      <OrderPageContent />
    </Suspense>
  );
}
