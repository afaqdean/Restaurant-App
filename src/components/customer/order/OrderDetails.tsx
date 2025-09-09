import { OrderDetailsProps } from "@/types/components";
import { OrderStatusCard } from "./OrderStatusCard";
import { OrderItemsList } from "./OrderItemsList";
import { CustomerInfoCard } from "./CustomerInfoCard";

export function OrderDetails({ order, formatPrice }: OrderDetailsProps) {
  return (
    <div className="lg:col-span-2 space-y-6" data-aos="fade-up" data-aos-delay="200">
      <OrderStatusCard order={order} />
      <OrderItemsList items={order.items} formatPrice={formatPrice} />
      <CustomerInfoCard 
        customerName={order.customerName}
        customerEmail={order.customerEmail}
        customerPhone={order.customerPhone}
        notes={order.notes}
      />
    </div>
  );
}
