"use client";

import { useFeaturedItems } from "@/hooks/useMenu";
import RestaurantFeaturedItems from "./RestaurantFeaturedItems";
import { Loader2 } from "lucide-react";

export function HomePageContent() {
  const { data: featuredData, isLoading: featuredLoading } = useFeaturedItems();

  if (featuredLoading) {
    return (
      <div className="py-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-yellow-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading delicious content...</p>
        </div>
      </div>
    );
  }

  return (
    <RestaurantFeaturedItems featuredItems={featuredData?.items || []} />
  );
}
