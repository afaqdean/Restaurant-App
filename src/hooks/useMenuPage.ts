import { useState, useMemo } from "react";
import { useMenu } from "./useMenu";
import { useCart } from "@/contexts/CartContext";
import { MenuItem } from "@/types/menu";

export function useMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sliderPositions, setSliderPositions] = useState<
    Record<string, number>
  >({});
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use React Query to fetch menu data
  const { data: menuData, isLoading: loading, error, refetch } = useMenu();

  // Use cart context
  const { addToCart, state: cartState } = useCart();

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
      await addToCart(item.id, 1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
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

  const goToSlide = (categoryId: string, direction: "prev" | "next") => {
    const currentPosition = sliderPositions[categoryId] || 0;
    const itemsPerView =
      window.innerWidth >= 1280
        ? 4
        : window.innerWidth >= 1024
        ? 3
        : window.innerWidth >= 640
        ? 2
        : 1;
    const maxSlides = Math.max(
      0,
      (filteredCategories.find((cat) => cat.id === categoryId)?.items.length ||
        0) - itemsPerView
    );

    let newPosition = currentPosition;
    if (direction === "next") {
      newPosition = Math.min(currentPosition + 1, maxSlides);
    } else {
      newPosition = Math.max(currentPosition - 1, 0);
    }

    setSliderPositions((prev) => ({
      ...prev,
      [categoryId]: newPosition,
    }));
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
    sliderPositions,
    isModalOpen,
    loading,
    error,
    addingToCart: cartState.loading,

    // Actions
    handleAddToCart,
    handleSearchChange,
    handleCategoryChange,
    handleItemClick,
    handleCloseModal,
    goToSlide,
    clearFilters,
    refetch,
  };
}
