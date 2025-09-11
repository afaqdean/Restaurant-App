import { formatPrice } from "@/lib/utils/formatting";
import { MenuItem } from "@/types/menu";
import { ImageWithFallback } from "@/components/ui";

interface ItemDetailsProps {
  item: MenuItem;
}

export function ItemDetails({ item }: ItemDetailsProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-start space-x-4">
        <ImageWithFallback
          src={item.image || "/images/placeholder.png"}
          alt={item.name}
          width={96}
          height={96}
          className="w-24 h-24 object-cover rounded-xl shadow-sm"
          fallbackElement={
            <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-xs text-gray-500">IMG</span>
            </div>
          }
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
          <p className="text-sm text-emerald-600 font-medium mb-2">{item.category.name}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-600">{formatPrice(item.price)}</p>
          <p className="text-sm text-gray-500">base price</p>
        </div>
      </div>
    </div>
  );
}
