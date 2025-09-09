import { CreditCard } from "lucide-react";

interface PaymentMethodSectionProps {
  paymentMethod: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function PaymentMethodSection({ paymentMethod, onInputChange }: PaymentMethodSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
          <CreditCard className="w-4 h-4 text-emerald-600" />
        </div>
        Payment Method
      </h3>
      
      <div className="space-y-4">
        <label className="flex items-center space-x-4 cursor-pointer p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200">
          <input
            type="radio"
            name="paymentMethod"
            value="CARD"
            checked={paymentMethod === "CARD"}
            onChange={onInputChange}
            className="text-emerald-600 focus:ring-emerald-500 w-4 h-4"
          />
          <div className="flex-1">
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-emerald-600 mr-2" />
              <span className="text-sm font-semibold text-gray-900">Credit/Debit Card</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Pay securely with Stripe</p>
          </div>
        </label>
        
        <label className="flex items-center space-x-4 cursor-pointer p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200">
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={onInputChange}
            className="text-emerald-600 focus:ring-emerald-500 w-4 h-4"
          />
          <div className="flex-1">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-emerald-100 rounded flex items-center justify-center mr-2">
                <span className="text-emerald-600 font-bold text-xs">$</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">Cash on Delivery</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Pay when your order arrives</p>
          </div>
        </label>
      </div>
    </div>
  );
}
