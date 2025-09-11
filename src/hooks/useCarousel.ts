import { useState, useEffect, useCallback } from "react";

interface UseCarouselProps {
  itemCount: number;
  autoPlayInterval?: number;
  isPaused?: boolean;
  maxVisibleItems?: number;
}

export function useCarousel({
  itemCount,
  autoPlayInterval = 3000,
  isPaused = false,
  maxVisibleItems = 3,
}: UseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance functionality
  useEffect(() => {
    if (!isAutoPlaying || isPaused || itemCount <= maxVisibleItems) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === itemCount - maxVisibleItems ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused, itemCount, maxVisibleItems, autoPlayInterval]);

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === itemCount - maxVisibleItems ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
  }, [itemCount, maxVisibleItems]);

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? itemCount - maxVisibleItems : prevIndex - 1
    );
    setIsAutoPlaying(false);
  }, [itemCount, maxVisibleItems]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(
        Math.max(0, Math.min(index, itemCount - maxVisibleItems))
      );
      setIsAutoPlaying(false);
    },
    [itemCount, maxVisibleItems]
  );

  const pause = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const resume = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  return {
    currentIndex,
    isAutoPlaying,
    next,
    prev,
    goTo,
    pause,
    resume,
    setIsAutoPlaying,
  };
}
