import { Category, MenuItem } from "@/types/menu";
import { MenuItemCard } from "./MenuItemCard";
import { useCarousel } from "@/hooks/useCarousel";
import { NavigationButton } from "@/components/ui/buttons";

interface MenuCategorySliderProps {
  category: Category;
  onItemClick: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  addingToCartItemId: string | null;
  className?: string;
}

export function MenuCategorySlider({
  category,
  onItemClick,
  onAddToCart,
  addingToCartItemId,
  className = "",
}: MenuCategorySliderProps) {
  const maxVisibleItems = typeof window !== 'undefined' 
    ? (window.innerWidth >= 2560 ? 4 : window.innerWidth >= 1920 ? 3 : window.innerWidth >= 1536 ? 3 : window.innerWidth >= 1024 ? 2 : window.innerWidth >= 768 ? 2 : 1)
    : 2;

  const {
    currentIndex: currentSlide,
    next: nextSlide,
    prev: prevSlide,
    goTo: goToSlide,
  } = useCarousel({
    itemCount: category.items.length,
    autoPlayInterval: 0, // No autoplay
    maxVisibleItems,
    isPaused: true, // Always paused
  });

  return (
    <section className={`py-[clamp(1.5rem,3vw,2.5rem)] ${className}`} data-aos="fade-up">
      <div className="w-full px-[clamp(1rem,2vw,2rem)]">
        {/* Category Header */}
        <div className="text-center mb-[clamp(1.5rem,3vw,2.5rem)]" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-gray-900 mb-[clamp(0.75rem,1.5vw,1rem)] leading-tight">
            {category.name}
          </h2>
          {category.description && (
            <p className="text-[clamp(0.875rem,1.8vw,1.125rem)] text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {category.description}
            </p>
          )}
        </div>

        {/* Items Slider */}
        <div className="relative" data-aos="fade-up" data-aos-delay="200">
          {/* Slider Container */}
          <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,2rem)]">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / maxVisibleItems)}%)` }}
            >
              {category.items.map((item, index) => (
                <div key={item.id} className="w-full flex-shrink-0 px-[clamp(0.25rem,0.5vw,0.5rem)]" style={{ width: `${100 / maxVisibleItems}%` }}>
                  <MenuItemCard
                    item={item}
                    onAddToCart={onAddToCart}
                    onItemClick={onItemClick}
                    addingToCart={addingToCartItemId === item.id}
                    data-aos="fade-up"
                    data-aos-delay={`${300 + (index * 100)}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {category.items.length > maxVisibleItems && (
            <>
              <NavigationButton
                direction="prev"
                variant="carousel"
                onClick={prevSlide}
                className="absolute left-[clamp(0.5rem,1vw,1rem)] top-1/2 transform -translate-y-1/2 z-10 w-[clamp(2.5rem,3vw,3rem)] h-[clamp(2.5rem,3vw,3rem)]"
              >
                ←
              </NavigationButton>
              <NavigationButton
                direction="next"
                variant="carousel"
                onClick={nextSlide}
                className="absolute right-[clamp(0.5rem,1vw,1rem)] top-1/2 transform -translate-y-1/2 z-10 w-[clamp(2.5rem,3vw,3rem)] h-[clamp(2.5rem,3vw,3rem)]"
              >
                →
              </NavigationButton>
            </>
          )}

          {/* Slide Indicators */}
          {category.items.length > maxVisibleItems && (
            <div className="flex justify-center mt-[clamp(1.5rem,3vw,2rem)] space-x-[clamp(0.25rem,0.5vw,0.5rem)]">
              {Array.from({ length: category.items.length - maxVisibleItems + 1 }).map((_, index) => (
                <NavigationButton
                  key={index}
                  direction="next"
                  variant="dots"
                  size="sm"
                  onClick={() => goToSlide(index)}
                  isActive={index === currentSlide}
                  label={`Go to slide ${index + 1}`}
                  className="w-[clamp(0.5rem,0.8vw,0.75rem)] h-[clamp(0.5rem,0.8vw,0.75rem)]"
                >
                  •
                </NavigationButton>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
