"use client";

import { useFeaturedItems } from "@/hooks/useMenu";
import RestaurantFeaturedItems from "./RestaurantFeaturedItems";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function HomePageContent() {
  const { data: featuredData, isLoading: featuredLoading } = useFeaturedItems();

  if (featuredLoading) {
    return (
      <div className="py-20 bg-white">
        <LoadingSpinner 
          size="xl" 
          text="Loading delicious content..." 
          className="py-20"
        />
      </div>
    );
  }

  return (
    <RestaurantFeaturedItems featuredItems={featuredData?.items || []} />
  );
}
