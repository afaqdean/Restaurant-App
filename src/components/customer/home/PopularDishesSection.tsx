"use client";

import { MenuItem } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import toast from "react-hot-toast";

interface PopularDishesSectionProps {
  featuredItems: MenuItem[];
}

export function PopularDishesSection({ featuredItems }: PopularDishesSectionProps) {
  const { addToCart } = useCart();

  const handleAddToCart = async (item: MenuItem) => {
    try {
      await addToCart(item.id, 1);
      toast.success(`${item.name} added to cart!`);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Popular Dishes
            <div className="w-16 h-1 bg-red-500 mx-auto mt-2"></div>
          </h2>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredItems.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-4xl">🍽️</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating and Likes */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">4.5</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-600">1.5k</span>
                  </div>
                </div>

                {/* Dish Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description || "We will deliver your food within 30 minutes in your town, If we would"}
                </p>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{item.formattedPrice}</span>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            See All Dishes
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}



