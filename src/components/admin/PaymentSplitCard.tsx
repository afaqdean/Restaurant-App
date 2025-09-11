import { CreditCard, Banknote } from "lucide-react";

interface PaymentSplitCardProps {
  stripeOrders: number;
  codOrders: number;
  stripeRevenue: number;
  codRevenue: number;
  className?: string;
}

export function PaymentSplitCard({ 
  stripeOrders, 
  codOrders, 
  stripeRevenue, 
  codRevenue,
  className = "" 
}: PaymentSplitCardProps) {
  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  
  const totalOrders = stripeOrders + codOrders;
  const totalRevenue = stripeRevenue + codRevenue;
  
  const stripeOrderPercentage = totalOrders > 0 ? (stripeOrders / totalOrders) * 100 : 0;
  const codOrderPercentage = totalOrders > 0 ? (codOrders / totalOrders) * 100 : 0;
  
  const stripeRevenuePercentage = totalRevenue > 0 ? (stripeRevenue / totalRevenue) * 100 : 0;
  const codRevenuePercentage = totalRevenue > 0 ? (codRevenue / totalRevenue) * 100 : 0;

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Method Split</h3>
      
      <div className="space-y-4">
        {/* Stripe */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center shadow-sm">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Card Payments</p>
              <p className="text-xs text-gray-500">{stripeOrders} orders ({stripeOrderPercentage.toFixed(1)}%)</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{formatPrice(stripeRevenue)}</p>
            <p className="text-xs text-gray-500">{stripeRevenuePercentage.toFixed(1)}% of revenue</p>
          </div>
        </div>

        {/* COD */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center shadow-sm">
              <Banknote className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Cash on Delivery</p>
              <p className="text-xs text-gray-500">{codOrders} orders ({codOrderPercentage.toFixed(1)}%)</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{formatPrice(codRevenue)}</p>
            <p className="text-xs text-gray-500">{codRevenuePercentage.toFixed(1)}% of revenue</p>
          </div>
        </div>

        {/* Progress bars */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Orders</span>
            <span>Revenue</span>
          </div>
          
          {/* Orders bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="flex h-3 rounded-full">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-l-full" 
                style={{ width: `${stripeOrderPercentage}%` }}
              />
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-r-full" 
                style={{ width: `${codOrderPercentage}%` }}
              />
            </div>
          </div>
          
          {/* Revenue bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="flex h-3 rounded-full">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-l-full" 
                style={{ width: `${stripeRevenuePercentage}%` }}
              />
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-r-full" 
                style={{ width: `${codRevenuePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
