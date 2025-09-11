import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { PrimaryButton } from "@/components/ui/buttons";

interface PaymentStatusMessagesProps {
  paymentStatus: string;
  paymentError?: string;
  onRetryPayment: () => void;
}

export function PaymentStatusMessages({ 
  paymentStatus, 
  paymentError, 
  onRetryPayment 
}: PaymentStatusMessagesProps) {
  if (paymentStatus === "success") {
    return (
      <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center mb-3">
          <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
          <h3 className="text-lg font-semibold text-green-800">Payment Successful!</h3>
        </div>
        <p className="text-green-700 mb-4">
          Your payment has been processed successfully. Redirecting to order confirmation...
        </p>
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div className="mb-6 p-6 bg-red-50 border border-red-200 rounded-xl">
        <div className="flex items-center mb-3">
          <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
          <h3 className="text-lg font-semibold text-red-800">Payment Failed</h3>
        </div>
        <p className="text-red-700 mb-4">
          {paymentError || "Your payment could not be processed. Please try again."}
        </p>
        <PrimaryButton
          onClick={onRetryPayment}
          variant="solid"
          className="bg-red-600 hover:bg-red-700"
        >
          Try Again
        </PrimaryButton>
      </div>
    );
  }

  return null;
}
