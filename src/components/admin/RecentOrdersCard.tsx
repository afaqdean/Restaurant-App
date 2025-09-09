import { Clock, User, CreditCard, Banknote } from "lucide-react";
import { RecentOrder } from "@/hooks/useDashboard";

interface RecentOrdersCardProps {
  orders: RecentOrder[];
  className?: string;
}

export function RecentOrdersCard({ orders, className = "" }: RecentOrdersCardProps) {
  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-800";
      case "ACCEPTED": return "bg-blue-100 text-blue-800";
      case "IN_KITCHEN": return "bg-orange-100 text-orange-800";
      case "READY": return "bg-green-100 text-green-800";
      case "COMPLETED": return "bg-green-100 text-green-800";
      case "CANCELLED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentIcon = (method: string) => {
    return method === "CARD" ? CreditCard : Banknote;
  };

  const getPaymentColor = (method: string) => {
    return method === "CARD" ? "text-blue-600" : "text-green-600";
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="max-h-96 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent orders</p>
        ) : (
          orders.map((order) => {
            const PaymentIcon = getPaymentIcon(order.paymentMethod);
            
            return (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      #{order.orderNumber}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">
                        {order.customer?.name || "Guest"}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <PaymentIcon className={`w-3 h-3 ${getPaymentColor(order.paymentMethod)}`} />
                      <span className="text-xs text-gray-600">
                        {order.paymentMethod === "CARD" ? "Card" : "COD"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatPrice(order.total)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
