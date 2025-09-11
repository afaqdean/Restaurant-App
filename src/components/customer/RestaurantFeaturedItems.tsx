"use client";

import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { PrimaryButton, NavigationButton, CartActionButton } from "@/components/ui/buttons";
import { ImageWithFallback } from "@/components/ui";
import { useCarousel } from "@/hooks/useCarousel";
import { RestaurantFeaturedItemsProps } from "@/types/customer-components";
import { MenuItem } from "@/types/menu";

export default function RestaurantFeaturedItems({ featuredItems }: RestaurantFeaturedItemsProps) {
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [maxVisibleItems, setMaxVisibleItems] = useState(3);
  const { addToCart } = useCart();
  const router = useRouter();

  // Calculate max visible items based on screen width
  useEffect(() => {
    const updateMaxVisibleItems = () => {
      const width = window.innerWidth;
      if (width >= 2560) {
        setMaxVisibleItems(6);
      } else if (width >= 1920) {
        setMaxVisibleItems(5);
      } else if (width >= 1536) {
        setMaxVisibleItems(4);
      } else if (width >= 1024) {
        setMaxVisibleItems(3);
      } else if (width >= 768) {
        setMaxVisibleItems(2);
      } else {
        setMaxVisibleItems(1);
      }
    };

    updateMaxVisibleItems();
    window.addEventListener('resize', updateMaxVisibleItems);
    return () => window.removeEventListener('resize', updateMaxVisibleItems);
  }, []);

  const {
    currentIndex: currentSlide,
    next: nextSlide,
    prev: prevSlide,
    goTo: goToSlide,
    pause,
  } = useCarousel({
    itemCount: featuredItems.length,
    autoPlayInterval: 3000,
    maxVisibleItems,
    isPaused: !!addingToCart,
  });

  const handleAddToCart = async (item: MenuItem) => {
    try {
      setAddingToCart(item.id);
      // Pause auto-playing when adding to cart
      pause();
      
      // Wait for API response before redirecting
      await addToCart(item.id, 1);
      
      // Only redirect after successful API response
      router.push('/cart');
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      // You could add a toast notification here
    } finally {
      setAddingToCart(null);
      // Resume auto-playing after a short delay
      setTimeout(() => {
        // Auto-playing will resume automatically when addingToCart becomes null
      }, 2000);
    }
  };

  return (
    <section className="py-[clamp(2rem,4vw,5rem)] bg-white w-full">
      <div className="w-full px-[clamp(1rem,2vw,2rem)]">
        <div className="text-center mb-[clamp(2rem,4vw,4rem)]">
          <p className="text-emerald-500 text-[clamp(0.75rem,1.2vw,0.875rem)] font-semibold uppercase tracking-wider mb-[clamp(0.75rem,1.5vw,1rem)]" data-aos="fade-up">
            FEATURED DISHES
          </p>
          <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] font-bold text-gray-900 mb-[clamp(1rem,2vw,1.5rem)] leading-tight" data-aos="fade-up" data-aos-delay="100">
            Our Signature Creations
          </h2>
          <p className="text-[clamp(0.875rem,2vw,1.25rem)] text-gray-600 max-w-4xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Discover our most popular dishes crafted with passion and the finest ingredients
          </p>
        </div>

        {featuredItems.length > 0 ? (
          <div className="relative" data-aos="fade-up" data-aos-delay="300">
            {/* Slider Container */}
            <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,2rem)]">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / maxVisibleItems)}%)` 
                }}
              >
                {featuredItems.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0 px-[clamp(0.25rem,0.5vw,0.5rem)]" style={{ width: `${100 / maxVisibleItems}%` }}>
                    <div className="bg-white rounded-[clamp(1rem,2vw,2rem)] shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col border border-gray-100">
                      <div className="relative h-[clamp(12rem,25vw,18rem)] overflow-hidden">
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
                        <div className="absolute top-[clamp(0.5rem,1vw,0.75rem)] right-[clamp(0.5rem,1vw,0.75rem)] bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.25rem,0.5vw,0.5rem)] rounded-full text-[clamp(0.625rem,1vw,0.75rem)] font-semibold flex items-center gap-1">
                          <Star className="h-[clamp(0.75rem,1.2vw,1rem)] w-[clamp(0.75rem,1.2vw,1rem)]" />
                          Featured
                        </div>
                      </div>
                      
                      <div className="p-[clamp(0.75rem,1.5vw,1.5rem)] flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-[clamp(0.5rem,1vw,0.75rem)]">
                          <h3 className="text-[clamp(0.875rem,1.8vw,1.25rem)] font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 flex-1 mr-2">
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
                            onClick={() => handleAddToCart(item)}
                            disabled={addingToCart === item.id}
                            action="add"
                            variant="icon-text"
                            size="md"
                            isLoading={addingToCart === item.id}
                            loadingText="Adding..."
                            className="text-[clamp(0.625rem,1vw,0.75rem)] py-[clamp(0.25rem,0.5vw,0.5rem)] px-[clamp(0.5rem,1vw,0.75rem)]"
                          >
                            Order Now
                          </CartActionButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {featuredItems.length > maxVisibleItems && (
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
            {featuredItems.length > maxVisibleItems && (
              <div className="flex justify-center mt-[clamp(1.5rem,3vw,2rem)] space-x-[clamp(0.25rem,0.5vw,0.5rem)]">
                {Array.from({ length: Math.max(1, featuredItems.length - maxVisibleItems + 1) }).map((_, index) => (
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
        ) : (
          <div className="text-center py-[clamp(2rem,4vw,3rem)]" data-aos="fade-up">
            <div className="text-gray-400 mb-[clamp(0.75rem,1.5vw,1rem)]">
              <Star className="h-[clamp(3rem,6vw,4rem)] w-[clamp(3rem,6vw,4rem)] mx-auto" />
            </div>
            <h3 className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-semibold text-gray-600 mb-[clamp(0.5rem,1vw,0.75rem)]">
              No Featured Items Yet
            </h3>
            <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-gray-500">
              Check back soon for our signature dishes!
            </p>
          </div>
        )}

        <div className="text-center mt-[clamp(2rem,3vw,3rem)]" data-aos="fade-up" data-aos-delay="400">
          <Link href="/menu">
            <PrimaryButton
              size="sm"
              icon={<ArrowRight className="h-[clamp(0.875rem,1.2vw,1rem)] w-[clamp(0.875rem,1.2vw,1rem)]" />}
              className="shadow-xs text-[clamp(0.75rem,1.2vw,0.875rem)] py-[clamp(0.5rem,1vw,0.75rem)] px-[clamp(1rem,2vw,1.5rem)]"
            >
              View Full Menu
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
