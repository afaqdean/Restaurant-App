"use client";

import { memo } from "react";
import { Star} from "lucide-react";
import { CartActionButton } from "@/components/ui/buttons";
import { ImageWithFallback } from "@/components/ui";
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
      className={`bg-white rounded-[clamp(1rem,2vw,2rem)] shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col border border-gray-100 ${className}`} 
      data-aos={dataAos || "fade-up"} 
      data-aos-delay={dataAosDelay || "100"}
    >
      <div 
        className="relative h-[clamp(12rem,25vw,18rem)] overflow-hidden cursor-pointer"
        onClick={handleItemClick}
      >
        <ImageWithFallback
          src={item.image || "/images/placeholder.png"}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, (max-width: 1920px) 25vw, 20vw"
          fallbackElement={
            <div className="h-full bg-gradient-to-br from-emerald-100 to-teal-200 flex items-center justify-center">
              <div className="text-center text-emerald-600">
                <div className="text-[clamp(2rem,4vw,3rem)] mb-2">🍽️</div>
                <p className="text-[clamp(0.75rem,1.2vw,0.875rem)] font-medium">No Image</p>
              </div>
            </div>
          }
        />
        {(item.featured || showFeatured) && (
          <div className="absolute top-[clamp(0.5rem,1vw,0.75rem)] right-[clamp(0.5rem,1vw,0.75rem)] bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.25rem,0.5vw,0.5rem)] rounded-full text-[clamp(0.625rem,1vw,0.75rem)] font-semibold flex items-center gap-1">
            <Star className="h-[clamp(0.75rem,1.2vw,1rem)] w-[clamp(0.75rem,1.2vw,1rem)]" />
            Featured
          </div>
        )}
      </div>
      
      <div className="p-[clamp(0.75rem,1.5vw,1.5rem)] flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-[clamp(0.5rem,1vw,0.75rem)]">
          <h3 
            className="text-[clamp(0.875rem,1.8vw,1.25rem)] font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 flex-1 mr-2 cursor-pointer"
            onClick={handleItemClick}
          >
            {item.name}
          </h3>
          <span className="text-[clamp(1rem,2vw,1.5rem)] font-bold text-emerald-600 flex-shrink-0">
            {item.formattedPrice}
          </span>
        </div>
        
        {item.description && (
          <p className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-600 mb-[clamp(0.75rem,1.5vw,1rem)] line-clamp-2 flex-1 leading-relaxed">
            {item.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[clamp(0.625rem,1vw,0.75rem)] text-gray-500 bg-gray-100 px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.25rem,0.5vw,0.5rem)] rounded-full">
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
            className="whitespace-nowrap text-[clamp(0.625rem,1vw,0.75rem)] py-[clamp(0.25rem,0.5vw,0.5rem)] px-[clamp(0.5rem,1vw,0.75rem)]"
          >
            Order Now
          </CartActionButton>
        </div>
      </div>
    </div>
  );
});
