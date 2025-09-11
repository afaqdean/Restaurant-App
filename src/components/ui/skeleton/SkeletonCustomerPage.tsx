import { memo } from "react";
import { SkeletonBase, SkeletonBox, SkeletonText } from "./SkeletonBase";
import { SkeletonOrderCard } from "./SkeletonCards";

interface SkeletonCustomerPageProps {
  className?: string;
  titleWidth?: number;
  subtitleWidth?: number;
  showActionButton?: boolean;
  actionButtonWidth?: number;
  showFilterControls?: boolean;
  contentType?: "cards" | "list" | "categories";
  itemsCount?: number;
}

export const SkeletonCustomerPage = memo(function SkeletonCustomerPage({
  className = "",
  titleWidth = 64,
  subtitleWidth = 80,
  showActionButton = false,
  actionButtonWidth = 128,
  showFilterControls = false,
  contentType = "cards",
  itemsCount = 5,
}: SkeletonCustomerPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className={`w-${titleWidth} text-4xl`} />
          <SkeletonText lines={1} lineHeight="md" className={`w-${subtitleWidth} text-xl mt-2`} />
        </div>

        {/* Action Button */}
        {showActionButton && (
          <div className="mb-8">
            <SkeletonBox width={actionButtonWidth} height={40} rounded="lg" />
          </div>
        )}

        {/* Filter Controls */}
        {showFilterControls && (
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <SkeletonBox width={200} height={40} rounded="lg" />
              <SkeletonBox width={100} height={40} rounded="lg" />
            </div>
          </div>
        )}

        {/* Content */}
        {contentType === "cards" && (
          <div className="space-y-6">
            {Array.from({ length: itemsCount }).map((_, index) => (
              <SkeletonOrderCard key={index} />
            ))}
          </div>
        )}

        {contentType === "list" && (
          <div className="space-y-4">
            {Array.from({ length: itemsCount }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <SkeletonBox width={200} height={20} className="mb-2" />
                    <SkeletonBox width={150} height={16} />
                  </div>
                  <SkeletonBox width={80} height={32} rounded="lg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {contentType === "categories" && (
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, categoryIndex) => (
              <div key={categoryIndex}>
                <SkeletonBox width={150} height={24} className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 4 }).map((_, itemIndex) => (
                    <div key={itemIndex} className="bg-white rounded-lg p-4 shadow-sm">
                      <SkeletonBox width="100%" height={120} className="mb-3" />
                      <SkeletonBox width={120} height={20} className="mb-2" />
                      <SkeletonBox width={80} height={16} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SkeletonBase>
  );
});
