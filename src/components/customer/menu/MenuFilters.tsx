import { FilterButton } from "@/components/ui/buttons";
import { MenuFiltersProps } from "@/types/customer-components";

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
          <FilterButton
            onClick={() => onCategoryChange("all")}
            isActive={selectedCategory === "all"}
            variant="category"
          >
            All Items
          </FilterButton>
          {categories.map((category) => (
            <FilterButton
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              isActive={selectedCategory === category.id}
              variant="category"
            >
              {category.name}
            </FilterButton>
          ))}
        </div>
      </div>
    </section>
  );
}
