"use client";

import { NavigationButton } from '@/components/ui/buttons';
import { StarRating } from '@/components/ui/StarRating';
import { useCarousel } from '@/hooks/useCarousel';
import { SAMPLE_REVIEWS } from '@/constants/customer';

export default function CustomerReviews() {
  const {
    currentIndex,
    next: nextReview,
    prev: prevReview,
    goTo: goToReview,
  } = useCarousel({
    itemCount: SAMPLE_REVIEWS.length,
    autoPlayInterval: 6000,
  });

  const currentReview = SAMPLE_REVIEWS[currentIndex];

  return (
    <section data-aos-id-2="">
      <div className="relative max-w-7xl mx-auto">
        {/* Bg */}
        <div className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 bg-slate-900 pointer-events-none -z-10" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-16 md:pt-20 pb-16 md:pb-24">
            {/* Section content */}
            <div className="relative max-w-5xl mx-auto text-center">
              
              {/* Header */}
              <div className="mb-16" data-aos="fade-up" data-aos-anchor="[data-aos-id-2]" data-aos-delay="100">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  What Our Customers Say
                </h2>
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                  Don&apos;t just take our word for it - hear from our satisfied customers
                </p>
              </div>

              {/* Review Carousel */}
              <div className="relative" data-aos="fade-up" data-aos-anchor="[data-aos-id-2]" data-aos-delay="200">
                {/* Navigation Buttons */}
                <NavigationButton
                  direction="prev"
                  variant="carousel"
                  size="lg"
                  onClick={prevReview}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20"
                  label="Previous review"
                >
                  ←
                </NavigationButton>

                <NavigationButton
                  direction="next"
                  variant="carousel"
                  size="lg"
                  onClick={nextReview}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20"
                  label="Next review"
                >
                  →
                </NavigationButton>

                {/* Review Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 md:p-16 mx-12 border border-white/10 shadow-2xl">
                  {/* Stars */}
                  <div className="flex justify-center mb-8">
                    <StarRating rating={currentReview.rating} />
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-2xl md:text-3xl text-white mb-12 leading-relaxed font-medium">
                    &quot;{currentReview.comment}&quot;
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center justify-center space-x-6">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {currentReview.avatar}
                    </div>
                    
                    {/* Name and Date */}
                    <div className="text-left">
                      <div className="text-white font-semibold text-xl mb-1">
                        {currentReview.name}
                      </div>
                      <div className="text-slate-300 text-base">
                        {new Date(currentReview.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center space-x-3 mt-12">
                  {SAMPLE_REVIEWS.map((_, index) => (
                    <NavigationButton
                      key={index}
                      direction="next"
                      variant="dots"
                      size="md"
                      onClick={() => goToReview(index)}
                      isActive={index === currentIndex}
                      label={`Go to review ${index + 1}`}
                    >
                      •
                    </NavigationButton>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
