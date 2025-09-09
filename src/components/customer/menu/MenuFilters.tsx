import { Category } from "@/types/menu";

interface MenuFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  categories: Category[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export function MenuFilters({
  searchQuery,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
  className = "",
}: MenuFiltersProps) {
  return (
    <section className={`py-6 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-4 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-500 transition-colors bg-white"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8" data-aos="fade-up" data-aos-delay="200">
          <button
            onClick={() => onCategoryChange("all")}
            className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
            }`}
          >
            All Items
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
