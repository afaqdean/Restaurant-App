import { User } from "lucide-react";
import { CheckoutFormProps } from "@/types/components";
import { ErrorState } from "@/components/ui/StandardStates";
import { AuthButton } from "@/components/auth/AuthButton";
import { CardHeader } from "@/components/ui";
import { CustomerInfoSection } from "./CustomerInfoSection";
import { PaymentMethodSection } from "./PaymentMethodSection";
import { OrderNotesSection } from "./OrderNotesSection";

export function CheckoutForm({
  formData,
  onInputChange,
  onSubmit,
  loading,
  error,
}: CheckoutFormProps) {
  return (
    <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="200">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <CardHeader
          title="Order Information"
          icon={<User className="w-6 h-6 text-emerald-600" />}
        />
        
        <div className="p-6">
          <form onSubmit={onSubmit} className="space-y-8">
            <CustomerInfoSection 
              formData={formData}
              onInputChange={onInputChange}
            />
            
            <PaymentMethodSection 
              paymentMethod={formData.paymentMethod}
              onInputChange={onInputChange}
            />
            
            <OrderNotesSection 
              notes={formData.notes}
              onInputChange={onInputChange}
            />
            
            {/* Error Message */}
            {error && (
              <ErrorState
                title="Checkout Error"
                message={error}
                className="mb-6"
                fullScreen={false}
              />
            )}
            
            {/* Submit Button */}
            <AuthButton
              type="submit"
              disabled={loading}
              isLoading={loading}
              loadingText="Processing..."
              className="py-4 px-6 text-lg"
            >
              Place Order
            </AuthButton>
          </form>
        </div>
      </div>
    </div>
  );
}
