"use client";

import { memo } from "react";
import Image from "next/image";
import { Star} from "lucide-react";
import { CartActionButton } from "@/components/ui/buttons";
import { MenuItemCardProps } from "@/types/customer-components";

export const MenuItemCard = memo(function MenuItemCard({ 
  item, 
  onAddToCart, 
  onItemClick,
  addingToCart = false,
  showFeatured = false,
  className = "",
  'data-aos': dataAos,
  'data-aos-delay': dataAosDelay
}: MenuItemCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col border border-gray-100 ${className}`} 
      data-aos={dataAos || "fade-up"} 
      data-aos-delay={dataAosDelay || "100"}
    >
      {item.image ? (
        <div 
          className="relative h-48 sm:h-52 lg:h-56 overflow-hidden cursor-pointer"
          onClick={handleItemClick}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {(item.featured || showFeatured) && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              Featured
            </div>
          )}
        </div>
      ) : (
        <div 
          className="relative h-48 sm:h-52 lg:h-56 bg-gradient-to-br from-emerald-100 to-teal-200 flex items-center justify-center cursor-pointer"
          onClick={handleItemClick}
        >
          <div className="text-center text-emerald-600">
            <div className="text-4xl sm:text-5xl mb-2">🍽️</div>
            <p className="text-sm font-medium">No Image</p>
          </div>
          {(item.featured || showFeatured) && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              Featured
            </div>
          )}
        </div>
      )}
      
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 
            className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 flex-1 mr-2 cursor-pointer"
            onClick={handleItemClick}
          >
            {item.name}
          </h3>
          <span className="text-xl sm:text-2xl font-bold text-emerald-600 flex-shrink-0">
            {item.formattedPrice}
          </span>
        </div>
        
        {item.description && (
          <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2 flex-1">
            {item.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {item.category.name}
          </span>
          <CartActionButton
            onClick={handleAddToCart}
            disabled={addingToCart}
            action="add"
            variant="icon-text"
            size="md"
            isLoading={addingToCart}
            loadingText="Adding..."
            className="whitespace-nowrap"
          >
            Order Now
          </CartActionButton>
        </div>
      </div>
    </div>
  );
});
