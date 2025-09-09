"use client";

import { MenuItem } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface FeaturedItemsSectionProps {
  featuredItems: MenuItem[];
}

export function FeaturedItemsSection({ featuredItems }: FeaturedItemsSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  
  // Auto-slide functionality - move one card at a time
  useEffect(() => {
    if (!isAutoPlaying || featuredItems.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (featuredItems.length - 2));
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredItems.length]);

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

  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-500 text-sm font-semibold uppercase tracking-wider mb-4">
            FEATURED DISHES
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Our Signature Creations
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover our most popular dishes crafted with passion and the finest ingredients
          </p>
        </div>

        {featuredItems.length > 0 ? (
          <div className="relative">
            {/* Slider Container */}
            <div className="relative overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
              >
                {featuredItems.map((item) => (
                  <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-4">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col">
                      {item.image ? (
                        <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute top-3 right-3 bg-amber-500 text-slate-900 px-2 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                            Featured
                          </div>
                        </div>
                      ) : (
                        <div className="relative h-48 sm:h-52 lg:h-56 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                          <div className="text-center text-amber-600">
                            <div className="text-4xl sm:text-5xl mb-2">🍽️</div>
                            <p className="text-sm font-medium">No Image</p>
                          </div>
                          <div className="absolute top-3 right-3 bg-amber-500 text-slate-900 px-2 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                            Featured
                          </div>
                        </div>
                      )}
                      
                      <div className="p-4 sm:p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-500 transition-colors line-clamp-2 flex-1 mr-2">
                            {item.name}
                          </h3>
                          <span className="text-xl sm:text-2xl font-bold text-amber-500 flex-shrink-0">
                            {item.formattedPrice}
                          </span>
                        </div>
                        
                        {item.description && (
                          <p className="text-sm sm:text-base text-slate-600 mb-4 line-clamp-2 flex-1">
                            {item.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs sm:text-sm text-slate-500 bg-amber-100 px-2 py-1 rounded-full">
                            {item.category.name}
                          </span>
                          <Link
                            href="/menu"
                            className="text-amber-500 hover:text-amber-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all text-sm sm:text-base"
                          >
                            Order Now
                            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Link>
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
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
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
                        ? 'bg-amber-500 scale-125'
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Star className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-600 mb-2">
              No Featured Items Yet
            </h3>
            <p className="text-slate-500">
              Check back soon for our signature dishes!
            </p>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
          >
            View Full Menu
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
