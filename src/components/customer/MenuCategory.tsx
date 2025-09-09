"use client";

import { Category } from "@/types/menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";

interface MenuCategoryProps {
  category: Category;
  onAddToCart?: (item: any) => void;
}

export function MenuCategory({ category, onAddToCart }: MenuCategoryProps) {
  if (category.items.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        {category.image && (
          <div className="relative h-16 w-16 rounded-lg overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
          {category.description && (
            <p className="text-gray-600 mt-1">{category.description}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}



