import { PrimaryButton } from "@/components/ui/buttons";
import { MenuEmptyStateProps } from "@/types/customer-components";

export function MenuEmptyState({
  searchQuery,
  selectedCategory,
  onClearFilters,
  className = "",
}: MenuEmptyStateProps) {
  const hasFilters = searchQuery || selectedCategory !== "all";

  return (
    <section className={`py-20 bg-gray-50 ${className}`} data-aos="fade-up">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center bg-white rounded-2xl shadow-lg p-12">
          <div className="text-emerald-500 mb-6" data-aos="zoom-in" data-aos-delay="100">
            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" data-aos="fade-up" data-aos-delay="200">
            No Items Found
          </h2>
          <p className="text-gray-600 mb-6" data-aos="fade-up" data-aos-delay="300">
            {searchQuery 
              ? `No items match your search for "${searchQuery}"`
              : "No items available in the selected category."
            }
          </p>
          {hasFilters && (
            <PrimaryButton
              onClick={onClearFilters}
              className="shadow-lg"
              data-aos="fade-up" 
              data-aos-delay="400"
            >
              Clear Filters
            </PrimaryButton>
          )}
        </div>
      </div>
    </section>
  );
}
