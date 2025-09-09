"use client";

import { MenuItem, Category } from "@/types/menu";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MenuPreviewSectionProps {
  featuredItems: MenuItem[];
  categories: Category[];
}

export function MenuPreviewSection({ featuredItems, categories }: MenuPreviewSectionProps) {
  // Group featured items by category for the menu preview
  const menuPreview = categories.slice(0, 2).map(category => {
    const categoryItems = featuredItems.filter(item => item.categoryId === category.id);
    return {
      category,
      items: categoryItems.slice(0, 4) // Show max 4 items per category
    };
  });

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-500 text-sm font-semibold uppercase tracking-wider mb-4">
            ASSORTED MENU
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-amber-50 mb-6">
            Famous Dishes & Specialties
          </h2>
          <p className="text-xl text-slate-100 max-w-3xl mx-auto">
            Discover our most popular dishes across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {menuPreview.map(({ category, items }) => (
            <div key={category.id} className="space-y-8">
              <div className="text-center lg:text-left">
                <p className="text-amber-500 text-sm font-semibold uppercase tracking-wider mb-2">
                  {category.name.toUpperCase()}
                </p>
                <h3 className="text-3xl font-bold text-amber-50 mb-4">
                  {category.name}
                </h3>
              </div>

              <div className="space-y-4">
                {items.length > 0 ? (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group"
                    >
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-amber-50 group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h4>
                        {item.description && (
                          <p className="text-slate-400 text-sm mt-1 line-clamp-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <span className="text-xl font-bold text-amber-500">
                          {item.formattedPrice}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-400">No featured items in this category yet</p>
                  </div>
                )}
              </div>

              <div className="text-center lg:text-left">
                <Link
                  href={`/menu?category=${category.id}`}
                  className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-semibold transition-colors"
                >
                  View All {category.name}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
          >
            View Complete Menu
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
