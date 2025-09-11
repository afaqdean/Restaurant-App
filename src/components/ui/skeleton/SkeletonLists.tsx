import { memo } from "react";
import { SkeletonBase, SkeletonBox, SkeletonText, SkeletonImage, SkeletonButton } from "./SkeletonBase";

interface SkeletonMenuCategoryProps {
  itemsCount?: number;
  className?: string;
}

export const SkeletonMenuCategory = memo(function SkeletonMenuCategory({
  itemsCount = 4,
  className = ""
}: SkeletonMenuCategoryProps) {
  return (
    <SkeletonBase className={`space-y-6 ${className}`}>
      {/* Category Header */}
      <div className="space-y-2">
        <SkeletonText lines={1} lineHeight="lg" className="w-48" />
        <SkeletonText lines={1} lineHeight="sm" className="w-64" />
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: itemsCount }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border p-4">
            <div className="space-y-4">
              {/* Image */}
              <SkeletonImage width="100%" height={200} rounded="lg" />
              
              {/* Content */}
              <div className="space-y-2">
                <SkeletonText lines={1} lineHeight="md" className="w-3/4" />
                <SkeletonText lines={2} lineHeight="sm" lastLineWidth="90%" />
                
                {/* Price and Button */}
                <div className="flex items-center justify-between mt-4">
                  <SkeletonBox width={60} height={20} className="bg-emerald-100" />
                  <SkeletonButton size="sm" className="w-20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SkeletonBase>
  );
});

interface SkeletonMenuCategoriesProps {
  categoriesCount?: number;
  itemsPerCategory?: number;
  className?: string;
}

export const SkeletonMenuCategories = memo(function SkeletonMenuCategories({
  categoriesCount = 3,
  itemsPerCategory = 4,
  className = ""
}: SkeletonMenuCategoriesProps) {
  return (
    <SkeletonBase className={`space-y-12 bg-gray-50 ${className}`}>
      {Array.from({ length: categoriesCount }).map((_, categoryIndex) => (
        <SkeletonMenuCategory
          key={categoryIndex}
          itemsCount={itemsPerCategory}
        />
      ))}
    </SkeletonBase>
  );
});

interface SkeletonOrderItemsListProps {
  itemsCount?: number;
  className?: string;
}

export const SkeletonOrderItemsList = memo(function SkeletonOrderItemsList({
  itemsCount = 3,
  className = ""
}: SkeletonOrderItemsListProps) {
  return (
    <SkeletonBase className={`space-y-4 ${className}`}>
      {Array.from({ length: itemsCount }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg border">
          {/* Item Image */}
          <SkeletonImage width={60} height={60} rounded="lg" />
          
          {/* Item Details */}
          <div className="flex-1 space-y-2">
            <SkeletonText lines={1} lineHeight="md" className="w-3/4" />
            <SkeletonText lines={1} lineHeight="sm" className="w-1/2" />
            
            {/* Quantity and Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SkeletonText lines={1} lineHeight="sm" className="w-16" />
              </div>
              <SkeletonBox width={60} height={20} className="bg-emerald-100" />
            </div>
          </div>
        </div>
      ))}
    </SkeletonBase>
  );
});

interface SkeletonCartItemsListProps {
  itemsCount?: number;
  className?: string;
}

export const SkeletonCartItemsList = memo(function SkeletonCartItemsList({
  itemsCount = 3,
  className = ""
}: SkeletonCartItemsListProps) {
  return (
    <SkeletonBase className={`space-y-4 ${className}`}>
      {Array.from({ length: itemsCount }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center space-x-4">
            {/* Image */}
            <SkeletonImage width={60} height={60} rounded="lg" />
            
            {/* Content */}
            <div className="flex-1 space-y-2">
              <SkeletonText lines={1} lineHeight="md" className="w-3/4" />
              <SkeletonText lines={1} lineHeight="sm" className="w-1/2" />
              
              {/* Quantity and Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SkeletonButton size="sm" variant="outline" className="w-8 h-8" />
                  <SkeletonBox width={20} height={20} className="bg-gray-200" />
                  <SkeletonButton size="sm" variant="outline" className="w-8 h-8" />
                </div>
                <SkeletonBox width={60} height={20} className="bg-emerald-100" />
              </div>
            </div>
            
            {/* Remove Button */}
            <SkeletonButton size="sm" variant="text" className="w-8 h-8" />
          </div>
        </div>
      ))}
    </SkeletonBase>
  );
});

interface SkeletonRecentOrdersListProps {
  ordersCount?: number;
  className?: string;
}

export const SkeletonRecentOrdersList = memo(function SkeletonRecentOrdersList({
  ordersCount = 5,
  className = ""
}: SkeletonRecentOrdersListProps) {
  return (
    <SkeletonBase className={`space-y-3 ${className}`}>
      {Array.from({ length: ordersCount }).map((_, index) => (
        <div key={index} className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border">
          <div className="flex items-center space-x-3">
            <SkeletonBox width={32} height={32} rounded="full" className="bg-emerald-100" />
            <div className="space-y-1">
              <SkeletonText lines={1} lineHeight="sm" className="w-24" />
              <SkeletonText lines={1} lineHeight="sm" className="w-16" />
            </div>
          </div>
          <div className="text-right space-y-1">
            <SkeletonBox width={60} height={16} className="bg-gray-200" />
            <SkeletonBox width={50} height={14} className="bg-emerald-100" />
          </div>
        </div>
      ))}
    </SkeletonBase>
  );
});

interface SkeletonStatusTimelineProps {
  stepsCount?: number;
  className?: string;
}

export const SkeletonStatusTimeline = memo(function SkeletonStatusTimeline({
  stepsCount = 4,
  className = ""
}: SkeletonStatusTimelineProps) {
  return (
    <SkeletonBase className={`space-y-4 ${className}`}>
      {Array.from({ length: stepsCount }).map((_, index) => (
        <div key={index} className="flex items-start space-x-4">
          {/* Timeline Dot */}
          <div className="flex-shrink-0">
            <SkeletonBox width={12} height={12} rounded="full" className="bg-emerald-100" />
          </div>
          
          {/* Timeline Content */}
          <div className="flex-1 space-y-1">
            <SkeletonText lines={1} lineHeight="md" className="w-32" />
            <SkeletonText lines={1} lineHeight="sm" className="w-48" />
            <SkeletonText lines={1} lineHeight="sm" className="w-24" />
          </div>
        </div>
      ))}
    </SkeletonBase>
  );
});

interface SkeletonFilterControlsProps {
  className?: string;
}

export const SkeletonFilterControls = memo(function SkeletonFilterControls({
  className = ""
}: SkeletonFilterControlsProps) {
  return (
    <SkeletonBase className={`bg-white rounded-xl shadow-sm border p-6 ${className}`}>
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="space-y-2">
          <SkeletonText lines={1} lineHeight="sm" className="w-20" />
          <SkeletonBox height={40} className="bg-gray-100" />
        </div>
        
        {/* Category Filters */}
        <div className="space-y-2">
          <SkeletonText lines={1} lineHeight="sm" className="w-24" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonBox
                key={index}
                width={80}
                height={32}
                rounded="full"
                className="bg-gray-100"
              />
            ))}
          </div>
        </div>
        
        {/* Filter Button */}
        <div className="flex justify-end">
          <SkeletonButton size="md" className="w-24" />
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonPaginationProps {
  className?: string;
}

export const SkeletonPagination = memo(function SkeletonPagination({
  className = ""
}: SkeletonPaginationProps) {
  return (
    <SkeletonBase className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <SkeletonText lines={1} lineHeight="sm" className="w-48" />
        
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <SkeletonButton size="sm" variant="outline" className="w-8 h-8" />
          
          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonButton
                key={index}
                size="sm"
                variant={index === 2 ? "solid" : "outline"}
                className="w-8 h-8"
              />
            ))}
          </div>
          
          {/* Next Button */}
          <SkeletonButton size="sm" variant="outline" className="w-8 h-8" />
        </div>
      </div>
    </SkeletonBase>
  );
});
