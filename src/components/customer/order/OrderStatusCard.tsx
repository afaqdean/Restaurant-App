import { CheckCircle } from "lucide-react";
import { CardHeader, StatusBadge } from "@/components/ui";
import { ReceiptButton } from "@/components/ui/ReceiptButton";
import { formatDateTime } from "@/lib/utils/formatting";
import { getPaymentStatusColor } from "@/lib/utils/status";

interface OrderStatusCardProps {
  order: {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    createdAt: string;
  };
}

export function OrderStatusCard({ order }: OrderStatusCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <CardHeader
        title="Order Status"
        icon={<CheckCircle className="w-4 h-4 text-emerald-600" />}
        subtitle={
          <div className="flex items-center justify-between">
            <span></span>
            <ReceiptButton 
              orderId={order.id} 
              orderNumber={order.orderNumber}
              variant="outline"
              size="sm"
            />
          </div>
        }
      />
      
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <StatusBadge status={order.status} />
          <span className={`px-4 py-2 rounded-xl text-sm font-medium border ${getPaymentStatusColor(order.paymentStatus)}`}>
            {order.paymentStatus}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Order placed on {formatDateTime(order.createdAt)}
        </p>
      </div>
    </div>
  );
}
