"use client";

import { MenuItem as MenuItemType } from "@/types/menu";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart?: (item: MenuItemType) => void;
}

export function MenuItem({ item, onAddToCart }: MenuItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {item.image && (
        <div className="relative h-48 w-full">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {item.featured && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Star className="h-3 w-3" />
              Featured
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <span className="text-lg font-bold text-green-600">
            {item.formattedPrice}
          </span>
        </div>
        
        {item.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
        )}
        
        {item.optionGroups.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Options available:</p>
            <div className="flex flex-wrap gap-1">
              {item.optionGroups.map((group) => (
                <span
                  key={group.id}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {group.name}
                  {group.required && " *"}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={() => onAddToCart?.(item)}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}



