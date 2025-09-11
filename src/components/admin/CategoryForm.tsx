import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Save } from "lucide-react";
import { CreateCategoryData, UpdateCategoryData } from "@/hooks/useMenuManagement";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  sortOrder: z.number().min(0).default(0),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  initialData?: Partial<CreateCategoryData & UpdateCategoryData>;
  onSubmit: (data: CreateCategoryData | UpdateCategoryData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isEditing?: boolean;
}

export function CategoryForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading = false,
  isEditing = false 
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      image: initialData?.image || '',
      sortOrder: initialData?.sortOrder || 0,
    },
  });

  const handleFormSubmit = (data: Record<string, unknown>) => {
    onSubmit(data as CategoryFormData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6" data-aos="fade-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {isEditing ? "Edit Category" : "Create New Category"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name *
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Enter category name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Enter category description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            {...register("image")}
            type="url"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort Order
          </label>
          <input
            {...register("sortOrder", { valueAsNumber: true })}
            type="number"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="0"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 border border-transparent rounded-xl hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : isEditing ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
