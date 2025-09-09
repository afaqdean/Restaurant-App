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
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Split</h3>
      
      <div className="space-y-4">
        {/* Stripe */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-blue-600" />
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
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Banknote className="w-4 h-4 text-green-600" />
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
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="flex h-2 rounded-full">
              <div 
                className="bg-blue-500 h-2 rounded-l-full" 
                style={{ width: `${stripeOrderPercentage}%` }}
              />
              <div 
                className="bg-green-500 h-2 rounded-r-full" 
                style={{ width: `${codOrderPercentage}%` }}
              />
            </div>
          </div>
          
          {/* Revenue bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="flex h-2 rounded-full">
              <div 
                className="bg-blue-500 h-2 rounded-l-full" 
                style={{ width: `${stripeRevenuePercentage}%` }}
              />
              <div 
                className="bg-green-500 h-2 rounded-r-full" 
                style={{ width: `${codRevenuePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
