import { Category } from "@/types/menu";
import { MenuItemCard } from "../MenuItemCard";

interface MenuCategorySliderProps {
  category: Category;
  sliderPosition: number;
  onGoToSlide: (direction: 'prev' | 'next') => void;
  onItemClick: (item: any) => void;
  onAddToCart: (item: any) => void;
  addingToCart: boolean;
  className?: string;
}

export function MenuCategorySlider({
  category,
  sliderPosition,
  onGoToSlide,
  onItemClick,
  onAddToCart,
  addingToCart,
  className = "",
}: MenuCategorySliderProps) {
  const itemsPerView = typeof window !== 'undefined' 
    ? (window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)
    : 4;
  
  const maxSlides = Math.max(0, category.items.length - itemsPerView);
  const canGoPrev = sliderPosition > 0;
  const canGoNext = sliderPosition < maxSlides;

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
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${sliderPosition * 100}%)`
              }}
            >
              {category.items.map((item, index) => (
                <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-3">
                  <MenuItemCard
                    item={item}
                    onAddToCart={onAddToCart}
                    onItemClick={onItemClick}
                    addingToCart={addingToCart}
                    data-aos="fade-up"
                    data-aos-delay={`${300 + (index * 100)}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {category.items.length > 4 && (
            <>
              <button
                onClick={() => onGoToSlide('prev')}
                disabled={!canGoPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                <span className="text-2xl text-gray-600">‹</span>
              </button>
              <button
                onClick={() => onGoToSlide('next')}
                disabled={!canGoNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                <span className="text-2xl text-gray-600">›</span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
