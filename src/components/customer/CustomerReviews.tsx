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
    <section data-aos-id-2="" className="w-full">
      <div className="relative w-full">
        {/* Bg */}
        <div className="absolute inset-0 rounded-tr-[clamp(50px,8vw,100px)] mb-[clamp(2rem,6vw,6rem)] lg:mb-0 bg-slate-900 pointer-events-none -z-10" aria-hidden="true" />

        <div className="w-full px-[clamp(1rem,2vw,2rem)]">
          <div className="pt-[clamp(2rem,4vw,5rem)] pb-[clamp(2rem,4vw,5rem)]">
            {/* Section content */}
            <div className="relative w-full text-center">
              
              {/* Header */}
              <div className="mb-[clamp(2rem,4vw,4rem)]" data-aos="fade-up" data-aos-anchor="[data-aos-id-2]" data-aos-delay="100">
                <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] font-bold text-white mb-[clamp(1rem,2vw,1.5rem)] leading-tight">
                  What Our Customers Say
                </h2>
                <p className="text-[clamp(0.875rem,2vw,1.25rem)] text-slate-300 max-w-2xl mx-auto leading-relaxed">
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[clamp(1rem,2vw,2rem)] z-10 w-[clamp(3rem,4vw,4rem)] h-[clamp(3rem,4vw,4rem)] bg-white/90 hover:bg-white text-slate-800 hover:text-slate-900 border-2 border-white/30 hover:border-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
                  label="Previous review"
                >
                  ←
                </NavigationButton>

                <NavigationButton
                  direction="next"
                  variant="carousel"
                  size="lg"
                  onClick={nextReview}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[clamp(1rem,2vw,2rem)] z-10 w-[clamp(3rem,4vw,4rem)] h-[clamp(3rem,4vw,4rem)] bg-white/90 hover:bg-white text-slate-800 hover:text-slate-900 border-2 border-white/30 hover:border-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
                  label="Next review"
                >
                  →
                </NavigationButton>

                {/* Review Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-[clamp(1.5rem,3vw,3rem)] p-[clamp(2rem,4vw,4rem)] mx-[clamp(1rem,2vw,3rem)] border border-white/10 shadow-2xl">
                  {/* Stars */}
                  <div className="flex justify-center mb-[clamp(1.5rem,3vw,2rem)]">
                    <StarRating rating={currentReview.rating} />
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-[clamp(1.125rem,2.5vw,2rem)] text-white mb-[clamp(2rem,4vw,3rem)] leading-relaxed font-medium">
                    &quot;{currentReview.comment}&quot;
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center justify-center space-x-[clamp(1rem,2vw,1.5rem)]">
                    {/* Avatar */}
                    <div className="w-[clamp(4rem,5vw,5rem)] h-[clamp(4rem,5vw,5rem)] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-[clamp(1.125rem,2vw,1.5rem)] shadow-lg">
                      {currentReview.avatar}
                    </div>
                    
                    {/* Name and Date */}
                    <div className="text-left">
                      <div className="text-white font-semibold text-[clamp(1rem,2vw,1.25rem)] mb-1">
                        {currentReview.name}
                      </div>
                      <div className="text-slate-300 text-[clamp(0.75rem,1.5vw,1rem)]">
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
                <div className="flex justify-center space-x-[clamp(0.5rem,1vw,0.75rem)] mt-[clamp(2rem,3vw,3rem)]">
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
