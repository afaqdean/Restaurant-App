import { CreditCard, Shield } from "lucide-react";
import { CardHeader } from "@/components/ui";
import StripePaymentForm from "@/components/ui/StripePaymentForm";

interface PaymentCardFormProps {
  clientSecret: string;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
}

export function PaymentCardForm({ 
  clientSecret, 
  onPaymentSuccess, 
  onPaymentError 
}: PaymentCardFormProps) {
  return (
    <div className="space-y-6">
      {/* Payment Info */}
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-center mb-3">
          <Shield className="w-6 h-6 text-blue-600 mr-3" />
          <h3 className="text-lg font-semibold text-blue-800">Secure Payment</h3>
        </div>
        <p className="text-blue-700 mb-4">
          Enter your card details below to complete your order securely.
        </p>
        <div className="text-sm text-blue-600 bg-blue-100 px-3 py-2 rounded-lg">
          <p>Payment Intent: {clientSecret.split('_')[1]}...</p>
        </div>
      </div>

      {/* Stripe Payment Form */}
      <div className="space-y-4">
        <CardHeader
          title="Card Details"
          icon={<CreditCard className="w-4 h-4 text-emerald-600" />}
          className="p-0 border-0"
        />
        
        <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
          <StripePaymentForm
            clientSecret={clientSecret}
            onPaymentSuccess={onPaymentSuccess}
            onPaymentError={onPaymentError}
          />
        </div>
      </div>

      {/* Security Notice */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-emerald-600" />
          <span className="text-sm text-gray-600">
            Your payment information is encrypted and secure. We use Stripe for secure payment processing.
          </span>
        </div>
      </div>
    </div>
  );
}
