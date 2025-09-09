"use client";

import { useState } from "react";
import { useMenu, useCategories } from "@/hooks/useMenu";
import { MenuCategory } from "./MenuCategory";
import { MenuItem } from "./MenuItem";
import { Search, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/contexts/CartContext";

export function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const { addToCart } = useCart();

  // Fetch categories for filter
  const { data: categoriesData } = useCategories();

  // Fetch menu data with filters
  const { 
    data: menuData, 
    isLoading: menuLoading, 
    error: menuError 
  } = useMenu({
    category: selectedCategory || undefined,
    featured: showFeaturedOnly || undefined,
    search: searchTerm || undefined,
  });

  const handleAddToCart = async (item: { id: string; name: string }) => {
    try {
      await addToCart(item.id, 1);
      toast.success(`${item.name} added to cart!`);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled automatically by the query
  };

  if (menuError) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Failed to load menu
              </h3>
              <p className="text-gray-600">
                {menuError.message || "Something went wrong. Please try again."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Menu
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg">
            Discover our delicious dishes made with fresh ingredients
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex-1 min-w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Categories</option>
                  {categoriesData?.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Filter */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Featured only</span>
              </label>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {menuLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading menu...</p>
            </div>
          </div>
        )}

        {/* Menu Content */}
        {menuData && !menuLoading && (
          <>
            {/* Featured Items Section */}
            {!searchTerm && !selectedCategory && !showFeaturedOnly && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {menuData.items
                    .filter(item => item.featured)
                    .slice(0, 4)
                    .map((item) => (
                      <MenuItem
                        key={item.id}
                        item={item}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {!searchTerm && !showFeaturedOnly ? (
              <div className="space-y-12">
                {menuData.categories.map((category) => (
                  <MenuCategory
                    key={category.id}
                    category={category}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              /* Search Results */
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {searchTerm ? `Search Results for "${searchTerm}"` : 
                   showFeaturedOnly ? "Featured Items" : "Menu Items"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.items.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
                {menuData.items.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No items found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}



