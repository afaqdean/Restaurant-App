"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { ImageWithFallback } from "@/components/ui";
import { SkeletonAdminMenuPage } from "@/components/ui/skeleton";
import { 
  useCategories, 
  useItems, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory,
  useCreateItem,
  useUpdateItem,
  useDeleteItem,
  Category,
  Item
} from "@/hooks/useMenuManagement";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { ItemForm } from "@/components/admin/ItemForm";
import { LoadingState } from "@/components/ui/StandardStates";

export default function AdminMenuPage() {
  const [activeTab, setActiveTab] = useState<"categories" | "items">("categories");
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const { data: itemsData, isLoading: itemsLoading } = useItems();
  
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const createItem = useCreateItem();
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();

  const categories = categoriesData?.categories || [];
  const items = itemsData?.items || [];

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const handleCategorySubmit = (data: any) => {
    if (editingCategory) {
      updateCategory.mutate({ id: editingCategory.id, data });
    } else {
      createCategory.mutate(data);
    }
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleItemSubmit = (data: any) => {
    if (editingItem) {
      updateItem.mutate({ id: editingItem.id, data });
    } else {
      createItem.mutate(data);
    }
    setShowItemForm(false);
    setEditingItem(null);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setShowItemForm(true);
  };

  const handleDeleteCategory = (category: Category) => {
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      deleteCategory.mutate(category.id);
    }
  };

  const handleDeleteItem = (item: Item) => {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      deleteItem.mutate(item.id);
    }
  };

  const toggleCategoryActive = (category: Category) => {
    updateCategory.mutate({ 
      id: category.id, 
      data: { active: !category.active } 
    });
  };

  const toggleItemActive = (item: Item) => {
    updateItem.mutate({ 
      id: item.id, 
      data: { active: !item.active } 
    });
  };

  if (categoriesLoading || itemsLoading) {
    return <SkeletonAdminMenuPage />;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Menu Management</h1>
        <p className="text-lg text-gray-600">Manage your restaurant's menu categories and items.</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8" data-aos="fade-up" data-aos-delay="100">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === "categories"
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm"
                : "text-gray-500 hover:text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            Categories ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab("items")}
            className={`py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === "items"
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm"
                : "text-gray-500 hover:text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            Items ({items.length})
          </button>
        </nav>
      </div>

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">Categories</h2>
            <button
              onClick={() => {
                setEditingCategory(null);
                setShowCategoryForm(true);
              }}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 border border-transparent rounded-xl hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </button>
          </div>

          {showCategoryForm && (
            <CategoryForm
              initialData={editingCategory || undefined}
              onSubmit={handleCategorySubmit}
              onCancel={() => {
                setShowCategoryForm(false);
                setEditingCategory(null);
              }}
              isLoading={createCategory.isPending || updateCategory.isPending}
              isEditing={!!editingCategory}
            />
          )}

          {categoriesLoading ? (
            <LoadingState message="Loading categories..." size="md" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {category.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {category.items.length} items
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleCategoryActive(category)}
                        className={`p-2 rounded-lg transition-colors ${
                          category.active 
                            ? "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" 
                            : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {category.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <ImageWithFallback
                      src={category.image || "/images/placeholder.png"}
                      alt={category.name}
                      width={400}
                      height={128}
                      className="w-full h-32 object-cover rounded-md"
                      fallbackElement={
                        <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
                          <span className="text-sm text-gray-500">No Image</span>
                        </div>
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Items Tab */}
      {activeTab === "items" && (
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">Items</h2>
            <button
              onClick={() => {
                setEditingItem(null);
                setShowItemForm(true);
              }}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 border border-transparent rounded-xl hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </button>
          </div>

          {showItemForm && (
            <ItemForm
              initialData={editingItem || undefined}
              categories={categories}
              onSubmit={handleItemSubmit}
              onCancel={() => {
                setShowItemForm(false);
                setEditingItem(null);
              }}
              isLoading={createItem.isPending || updateItem.isPending}
              isEditing={!!editingItem}
            />
          )}

          {itemsLoading ? (
            <LoadingState message="Loading items..." size="md" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <p className="text-lg font-bold text-emerald-600 mt-2">
                        {formatPrice(item.price)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.category.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleItemActive(item)}
                        className={`p-2 rounded-lg transition-colors ${
                          item.active 
                            ? "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" 
                            : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {item.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEditItem(item)}
                        className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <ImageWithFallback
                      src={item.image || "/images/placeholder.png"}
                      alt={item.name}
                      width={400}
                      height={128}
                      className="w-full h-32 object-cover rounded-md"
                      fallbackElement={
                        <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
                          <span className="text-sm text-gray-500">No Image</span>
                        </div>
                      }
                    />
                  </div>

                  {item.featured && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border border-orange-200">
                      ⭐ Featured
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
