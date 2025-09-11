import { CreditCard } from "lucide-react";
import { PaymentFormProps } from "@/types/components";
import { CardHeader } from "@/components/ui";
import { PaymentStatusMessages } from "./PaymentStatusMessages";
import { PaymentCardForm } from "./PaymentCardForm";

export function PaymentForm({
  clientSecret,
  paymentStatus,
  paymentError,
  onPaymentSuccess,
  onPaymentError,
  onRetryPayment,
}: PaymentFormProps) {
  return (
    <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="200">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <CardHeader
          title="Payment Information"
          icon={<CreditCard className="w-6 h-6 text-emerald-600" />}
        />
        
        <div className="p-6">
          <PaymentStatusMessages
            paymentStatus={paymentStatus}
            paymentError={paymentError}
            onRetryPayment={onRetryPayment}
          />

          {paymentStatus === "processing" && (
            <PaymentCardForm
              clientSecret={clientSecret}
              onPaymentSuccess={onPaymentSuccess}
              onPaymentError={onPaymentError}
            />
          )}
        </div>
      </div>
    </div>
  );
}
