"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
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

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
        <p className="text-gray-600 mt-2">Manage your restaurant's menu categories and items.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "categories"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Categories ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab("items")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "items"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Items ({items.length})
          </button>
        </nav>
      </div>

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
            <button
              onClick={() => {
                setEditingCategory(null);
                setShowCategoryForm(true);
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div key={category.id} className="bg-white rounded-lg shadow-sm border p-6">
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
                        className={`p-1 rounded ${
                          category.active 
                            ? "text-green-600 hover:text-green-700" 
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {category.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="p-1 text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category)}
                        className="p-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {category.image && (
                    <div className="mb-4">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Items Tab */}
      {activeTab === "items" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Items</h2>
            <button
              onClick={() => {
                setEditingItem(null);
                setShowItemForm(true);
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div key={item.id} className="bg-white rounded-lg shadow-sm border p-6">
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
                      <p className="text-sm font-medium text-blue-600 mt-2">
                        {formatPrice(item.price)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.category.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleItemActive(item)}
                        className={`p-1 rounded ${
                          item.active 
                            ? "text-green-600 hover:text-green-700" 
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {item.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEditItem(item)}
                        className="p-1 text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="p-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {item.image && (
                    <div className="mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}

                  {item.featured && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
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
