import { Package } from "lucide-react";
import { CardHeader, PriceDisplay, ImageWithFallback } from "@/components/ui";
import { formatPrice } from "@/lib/utils/formatting";

interface OrderItemsListProps {
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    notes?: string;
    options: Array<{
      option: {
        name: string;
        price: number;
      };
    }>;
    item: {
      name: string;
      image?: string;
    };
  }>;
  formatPrice: (cents: number) => string;
}

export function OrderItemsList({ items, formatPrice }: OrderItemsListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <CardHeader
        title={`Order Items (${items.length})`}
        icon={<Package className="w-4 h-4 text-emerald-600" />}
      />
      
      <div className="p-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                <ImageWithFallback
                  src={item.item.image || "/images/placeholder.png"}
                  alt={item.item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-lg"
                  fallbackElement={
                    <span className="text-xs text-gray-500">IMG</span>
                  }
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">{item.item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Quantity: {item.quantity}</p>
                {item.notes && (
                  <p className="text-sm text-gray-600 mb-2">Note: {item.notes}</p>
                )}
                {item.options.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">Customizations:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {item.options.map((option, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span>•</span>
                          <span>{option.option.name} {option.option.price > 0 && `(+${formatPrice(option.option.price)})`}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <PriceDisplay amount={item.price * item.quantity} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
