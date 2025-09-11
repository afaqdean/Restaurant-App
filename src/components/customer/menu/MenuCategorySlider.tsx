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
    ? (window.innerWidth >= 1280 ? 3 : window.innerWidth >= 1024 ? 2 : window.innerWidth >= 640 ? 1 : 1)
    : 3;

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
    <section className={`py-8 ${className}`} data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Category Header */}
        <div className="text-center mb-8" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {category.name}
          </h2>
          {category.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
        </div>

        {/* Items Slider */}
        <div className="relative" data-aos="fade-up" data-aos-delay="200">
          {/* Slider Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / maxVisibleItems)}%)` }}
            >
              {category.items.map((item, index) => (
                <div key={item.id} className="w-full sm:w-3/5 lg:w-2/5 xl:w-3/10 flex-shrink-0 px-2 sm:px-4">
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
              >
                ←
              </NavigationButton>
              <NavigationButton
                direction="next"
                variant="carousel"
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
              >
                →
              </NavigationButton>
            </>
          )}

          {/* Slide Indicators */}
          {category.items.length > maxVisibleItems && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: category.items.length - maxVisibleItems + 1 }).map((_, index) => (
                <NavigationButton
                  key={index}
                  direction="next"
                  variant="dots"
                  size="sm"
                  onClick={() => goToSlide(index)}
                  isActive={index === currentSlide}
                  label={`Go to slide ${index + 1}`}
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
