import { useState, useMemo } from "react";
import { useMenu } from "./useMenu";
import { useCart } from "@/contexts/CartContext";
import { MenuItem } from "@/types/menu";

export function useMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addingToCartItemId, setAddingToCartItemId] = useState<string | null>(
    null
  );

  // Use React Query to fetch menu data
  const { data: menuData, isLoading: loading, error, refetch } = useMenu();

  // Use cart context
  const { addToCart } = useCart();

  // Filter and search logic
  const filteredCategories = useMemo(() => {
    if (!menuData) return [];

    let filtered = menuData.categories;

    // Filter by category if not "all"
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (category) => category.id === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered
        .map((category) => ({
          ...category,
          items: category.items.filter(
            (item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item.category.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((category) => category.items.length > 0);
    }

    // Sort categories by sortOrder
    return filtered.sort((a, b) => a.sortOrder - b.sortOrder);
  }, [menuData, selectedCategory, searchQuery]);

  const handleAddToCart = async (item: MenuItem) => {
    try {
      setAddingToCartItemId(item.id);
      await addToCart(item.id, 1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    } finally {
      setAddingToCartItemId(null);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return {
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
  };
}
