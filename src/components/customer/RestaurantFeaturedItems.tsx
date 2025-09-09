"use client";

import { MenuItem } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useAddToCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

interface RestaurantFeaturedItemsProps {
  featuredItems: MenuItem[];
}

export default function RestaurantFeaturedItems({ featuredItems }: RestaurantFeaturedItemsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const addToCartMutation = useAddToCart();
  const router = useRouter();

  // Auto-slide functionality - move one card at a time
  useEffect(() => {
    if (!isAutoPlaying || featuredItems.length <= 3 || addingToCart) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (featuredItems.length - 2));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredItems.length, addingToCart]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (featuredItems.length - 2));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (featuredItems.length - 2)) % (featuredItems.length - 2));
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleAddToCart = async (item: MenuItem) => {
    try {
      setAddingToCart(item.id);
      // Pause auto-playing when adding to cart
      setIsAutoPlaying(false);
      
      // Wait for API response before redirecting
      await addToCartMutation.mutateAsync({
        itemId: item.id,
        quantity: 1,
      });
      
      // Only redirect after successful API response
      router.push('/cart');
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      // You could add a toast notification here
    } finally {
      setAddingToCart(null);
      // Resume auto-playing after a short delay
      setTimeout(() => {
        setIsAutoPlaying(true);
      }, 2000);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-emerald-500 text-sm font-semibold uppercase tracking-wider mb-4" data-aos="fade-up">
            FEATURED DISHES
          </p>
          <h2 className="h2 text-gray-900 mb-6" data-aos="fade-up" data-aos-delay="100">
            Our Signature Creations
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Discover our most popular dishes crafted with passion and the finest ingredients
          </p>
        </div>

        {featuredItems.length > 0 ? (
          <div className="relative" data-aos="fade-up" data-aos-delay="300">
            {/* Slider Container */}
            <div className="relative overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
              >
                {featuredItems.map((item, index) => (
                  <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-4">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col border border-gray-100">
                      {item.image ? (
                        <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                            Featured
                          </div>
                        </div>
                      ) : (
                        <div className="relative h-48 sm:h-52 lg:h-56 bg-gradient-to-br from-emerald-100 to-teal-200 flex items-center justify-center">
                          <div className="text-center text-emerald-600">
                            <div className="text-4xl sm:text-5xl mb-2">🍽️</div>
                            <p className="text-sm font-medium">No Image</p>
                          </div>
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                            Featured
                          </div>
                        </div>
                      )}
                      
                      <div className="p-4 sm:p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 flex-1 mr-2">
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
                          <button
                            onClick={() => handleAddToCart(item)}
                            disabled={addingToCart === item.id}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {addingToCart === item.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                                Adding...
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                                Order Now
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {featuredItems.length > 3 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Slide Indicators */}
            {featuredItems.length > 3 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: featuredItems.length - 2 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-emerald-500 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12" data-aos="fade-up">
            <div className="text-gray-400 mb-4">
              <Star className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No Featured Items Yet
            </h3>
            <p className="text-gray-500">
              Check back soon for our signature dishes!
            </p>
          </div>
        )}

        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <Link
            href="/menu"
            className="btn-sm inline-flex items-center text-white bg-gradient-to-tr from-emerald-500 hover:bg-emerald-600 group shadow-xs"
          >
            View Full Menu
            <span className="tracking-normal text-emerald-100 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
