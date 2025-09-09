"use client";

import { useMenuPage } from "@/hooks/useMenuPage";
import ItemDetailModal from "@/components/customer/ItemDetailModal";
import {
  MenuHero,
  MenuFilters,
  MenuCategorySlider,
  MenuEmptyState,
  MenuLoadingState,
  MenuErrorState,
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
    return <MenuLoadingState />;
  }

  if (error || !menuData) {
    return <MenuErrorState error={error} onRetry={refetch} />;
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
      <ItemDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}