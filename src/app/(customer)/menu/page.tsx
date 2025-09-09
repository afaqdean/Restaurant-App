"use client";

import { useMenuPage } from "@/hooks/useMenuPage";
import { ItemCustomizationModal } from "@/components/ui/ItemCustomizationModal";
import { PageLoadingState, PageErrorState } from "@/components/ui/StandardStates";
import {
  MenuHero,
  MenuFilters,
  MenuCategorySlider,
  MenuEmptyState,
} from "@/components/customer/menu";


export default function MenuPage() {
  const {
    // Data
    menuData,
    filteredCategories,
    selectedItem,
    
    // State
    selectedCategory,
    searchQuery,
    sliderPositions,
    isModalOpen,
    loading,
    error,
    addingToCart,
    
    // Actions
    handleAddToCart,
    handleSearchChange,
    handleCategoryChange,
    handleItemClick,
    handleCloseModal,
    goToSlide,
    clearFilters,
    refetch,
  } = useMenuPage();

  if (loading) {
    return <PageLoadingState message="Loading menu..." />;
  }

  if (error || !menuData) {
    return (
      <PageErrorState 
        message={error?.message || "Failed to load menu"} 
        onRetry={refetch} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuHero />
      
      <MenuFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        categories={menuData.categories}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />

      {/* Menu Categories Sections */}
      {filteredCategories.length > 0 ? (
        <div className="space-y-8 bg-gray-50">
          {filteredCategories.map((category) => (
            <MenuCategorySlider
              key={category.id}
              category={category}
              sliderPosition={sliderPositions[category.id] || 0}
              onGoToSlide={(direction) => goToSlide(category.id, direction)}
              onItemClick={handleItemClick}
              onAddToCart={handleAddToCart}
              addingToCart={addingToCart}
            />
          ))}
        </div>
      ) : (
        <MenuEmptyState
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onClearFilters={clearFilters}
        />
      )}

      {/* Item Detail Modal */}
      <ItemCustomizationModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}