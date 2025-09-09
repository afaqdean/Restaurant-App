"use client";

import { Category } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Get top 3 categories with most items
  const topCategories = categories
    .sort((a, b) => (b._count?.items || 0) - (a._count?.items || 0))
    .slice(0, 3);

  const categoryLabels = ["QUALITY STARTER", "MID-QUARTER", "HEAVY DISH"];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-amber-100 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-500 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-amber-600 rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-12 h-12 bg-amber-500 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-amber-500 text-sm font-semibold uppercase tracking-wider mb-4">
            POPULAR CATEGORY
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Explore Our Menu Categories
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From appetizers to main courses, discover the perfect dish for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topCategories.map((category, index) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative h-64 overflow-hidden">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <span className="text-white text-6xl font-bold">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {categoryLabels[index] || "FEATURED"}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-500 transition-colors">
                  {category.name}
                </h3>
                
                {category.description && (
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    {category._count?.items || 0} items available
                  </span>
                  <Link
                    href={`/menu?category=${category.id}`}
                    className="text-amber-500 hover:text-amber-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    OUR MENU
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categories.length > 3 && (
          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
            >
              View All Categories
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
