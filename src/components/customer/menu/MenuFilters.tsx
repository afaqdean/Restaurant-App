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
    <section className={`py-[clamp(1rem,2vw,2rem)] ${className}`}>
      <div className="w-full px-[clamp(1rem,2vw,2rem)]">
        {/* Search Bar */}
        <div className="w-full max-w-4xl mx-auto mb-[clamp(1.5rem,3vw,2.5rem)]" data-aos="fade-up" data-aos-delay="100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-[clamp(1rem,2vw,1.5rem)] pr-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.875rem,1.8vw,1.125rem)] border-2 border-gray-200 rounded-[clamp(1rem,2vw,2rem)] focus:outline-none focus:border-emerald-500 transition-colors bg-white"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-[clamp(0.5rem,1vw,1rem)] mb-[clamp(1.5rem,3vw,2.5rem)]" data-aos="fade-up" data-aos-delay="200">
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
