"use client";

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

const sampleReviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'The flavors are incredible and the presentation is simply beautiful. This is dining at its finest.',
    date: '2024-01-15',
    avatar: 'SJ'
  },
  {
    id: '2',
    name: 'Michael Chen',
    rating: 5,
    comment: 'Amazing food quality and exceptional service. The steak was cooked to perfection and the ambiance was wonderful.',
    date: '2024-01-10',
    avatar: 'MC'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    rating: 5,
    comment: 'Best restaurant in town! Fresh ingredients, creative dishes, and friendly staff. Highly recommended!',
    date: '2024-01-08',
    avatar: 'ER'
  },
  {
    id: '4',
    name: 'David Thompson',
    rating: 5,
    comment: 'Outstanding culinary experience. Every dish tells a story of flavor and quality. Will definitely come back!',
    date: '2024-01-05',
    avatar: 'DT'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    rating: 5,
    comment: 'The attention to detail in every aspect of the meal was remarkable. Truly exceptional dining experience.',
    date: '2024-01-03',
    avatar: 'LW'
  }
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === sampleReviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === sampleReviews.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sampleReviews.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToReview = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-slate-400'
        }`}
      />
    ));
  };

  const currentReview = sampleReviews[currentIndex];

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
                  Don't just take our word for it - hear from our satisfied customers
                </p>
              </div>

              {/* Review Carousel */}
              <div className="relative" data-aos="fade-up" data-aos-anchor="[data-aos-id-2]" data-aos-delay="200">
                {/* Navigation Buttons */}
                <button
                  onClick={prevReview}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/20"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>

                <button
                  onClick={nextReview}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/20"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>

                {/* Review Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 md:p-16 mx-12 border border-white/10 shadow-2xl">
                  {/* Stars */}
                  <div className="flex justify-center mb-8">
                    {renderStars(currentReview.rating)}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-2xl md:text-3xl text-white mb-12 leading-relaxed font-medium">
                    "{currentReview.comment}"
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
                  {sampleReviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToReview(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-emerald-400 scale-125 shadow-lg shadow-emerald-400/50'
                          : 'bg-slate-500 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                    />
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
