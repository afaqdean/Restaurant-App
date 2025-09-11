import { memo } from "react";
import { SkeletonBase, SkeletonBox, SkeletonText, SkeletonImage, SkeletonButton, SkeletonAvatar } from "./SkeletonBase";

interface SkeletonMenuItemCardProps {
  className?: string;
}

export const SkeletonMenuItemCard = memo(function SkeletonMenuItemCard({
  className = ""
}: SkeletonMenuItemCardProps) {
  return (
    <SkeletonBase className={`bg-white rounded-xl shadow-sm border p-4 ${className}`}>
      <div className="flex space-x-4">
        {/* Image */}
        <SkeletonImage
          width={80}
          height={80}
          rounded="lg"
          className="flex-shrink-0"
        />
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            {/* Title */}
            <SkeletonText lines={1} lineHeight="md" className="w-3/4" />
            
            {/* Description */}
            <SkeletonText lines={2} lineHeight="sm" lastLineWidth="90%" />
            
            {/* Price and Button */}
            <div className="flex items-center justify-between mt-4">
              <SkeletonBox width={60} height={20} className="bg-emerald-100" />
              <SkeletonButton size="sm" className="w-20" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonOrderCardProps {
  className?: string;
}

export const SkeletonOrderCard = memo(function SkeletonOrderCard({
  className = ""
}: SkeletonOrderCardProps) {
  return (
    <SkeletonBase className={`bg-white rounded-xl shadow-sm border p-6 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <SkeletonText lines={1} lineHeight="md" className="w-32" />
            <SkeletonText lines={1} lineHeight="sm" className="w-40" />
          </div>
          <div className="text-right space-y-2">
            <SkeletonBox width={80} height={20} className="bg-gray-200" />
            <div className="flex space-x-2">
              <SkeletonBox width={60} height={16} className="bg-yellow-100" />
              <SkeletonBox width={50} height={16} className="bg-blue-100" />
            </div>
          </div>
        </div>

        {/* Order Items Preview */}
        <div className="flex items-center space-x-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <SkeletonImage width={48} height={48} rounded="md" />
              <div className="space-y-1">
                <SkeletonText lines={1} lineHeight="sm" className="w-20" />
                <SkeletonText lines={1} lineHeight="sm" className="w-12" />
              </div>
            </div>
          ))}
        </div>

        {/* Payment Method */}
        <SkeletonText lines={1} lineHeight="sm" className="w-40" />

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <SkeletonButton size="sm" className="w-24" />
          <SkeletonButton size="sm" variant="outline" className="w-28" />
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonKPICardProps {
  className?: string;
}

export const SkeletonKPICard = memo(function SkeletonKPICard({
  className = ""
}: SkeletonKPICardProps) {
  return (
    <SkeletonBase className={`bg-white rounded-xl shadow-sm border p-6 ${className}`}>
      <div className="space-y-4">
        {/* Icon and Title */}
        <div className="flex items-center space-x-3">
          <SkeletonBox width={40} height={40} rounded="lg" className="bg-emerald-100" />
          <SkeletonText lines={1} lineHeight="md" className="w-24" />
        </div>
        
        {/* Value */}
        <SkeletonText lines={1} lineHeight="lg" className="w-20 text-2xl" />
        
        {/* Change indicator */}
        <div className="flex items-center space-x-2">
          <SkeletonBox width={60} height={16} className="bg-emerald-100" />
          <SkeletonText lines={1} lineHeight="sm" className="w-16" />
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonCartItemCardProps {
  className?: string;
}

export const SkeletonCartItemCard = memo(function SkeletonCartItemCard({
  className = ""
}: SkeletonCartItemCardProps) {
  return (
    <SkeletonBase className={`bg-white rounded-xl shadow-sm border p-4 ${className}`}>
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
    </SkeletonBase>
  );
});

interface SkeletonPaymentSplitCardProps {
  className?: string;
}

export const SkeletonPaymentSplitCard = memo(function SkeletonPaymentSplitCard({
  className = ""
}: SkeletonPaymentSplitCardProps) {
  return (
    <SkeletonBase className={`bg-white rounded-xl shadow-sm border p-6 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <SkeletonText lines={1} lineHeight="md" className="w-32" />
        
        {/* Payment Methods */}
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SkeletonBox width={24} height={24} rounded="full" className="bg-blue-100" />
                <SkeletonText lines={1} lineHeight="sm" className="w-20" />
              </div>
              <SkeletonBox width={80} height={20} className="bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonRecentOrdersCardProps {
  className?: string;
}

export const SkeletonRecentOrdersCard = memo(function SkeletonRecentOrdersCard({
  className = ""
}: SkeletonRecentOrdersCardProps) {
  return (
    <SkeletonBase className={`bg-white rounded-xl shadow-sm border p-6 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <SkeletonText lines={1} lineHeight="md" className="w-40" />
        
        {/* Orders List */}
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <SkeletonAvatar size="sm" />
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
        </div>
      </div>
    </SkeletonBase>
  );
});
