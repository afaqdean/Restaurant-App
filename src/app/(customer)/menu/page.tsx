"use client";

import { useMenuPage } from "@/hooks/useMenuPage";
import { ItemCustomizationModal } from "@/components/ui/ItemCustomizationModal";
import { PageWrapper, PageStateHandler } from "@/components/ui/layout";
import { SkeletonMenuPage } from "@/components/ui/skeleton";
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
    isModalOpen,
    loading,
    error,
    addingToCartItemId,
    
    // Actions
    handleAddToCart,
    handleSearchChange,
    handleCategoryChange,
    handleItemClick,
    handleCloseModal,
    clearFilters,
    refetch,
  } = useMenuPage();

  const emptyState = !menuData || filteredCategories.length === 0 ? (
    <MenuEmptyState 
      searchQuery={searchQuery}
      selectedCategory={selectedCategory}
      onClearFilters={clearFilters} 
    />
  ) : null;

  if (loading) {
    return <SkeletonMenuPage />;
  }

  return (
    <PageWrapper>
      <PageStateHandler
        loading={false}
        error={error?.message || null}
        loadingMessage="Loading menu..."
        onRetry={refetch}
        showEmptyState={!menuData || filteredCategories.length === 0}
        emptyState={emptyState}
      >
      <MenuHero />
      
      {menuData && (
        <MenuFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          categories={menuData.categories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />
      )}

      {/* Menu Categories Sections */}
      {filteredCategories.length > 0 ? (
        <div className="space-y-8 bg-gray-50">
          {filteredCategories.map((category) => (
            <MenuCategorySlider
              key={category.id}
              category={category}
              onItemClick={handleItemClick}
              onAddToCart={handleAddToCart}
              addingToCartItemId={addingToCartItemId}
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
      </PageStateHandler>
    </PageWrapper>
  );
}