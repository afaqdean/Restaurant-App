import { memo } from "react";
import { SkeletonBase, SkeletonBox, SkeletonText, SkeletonButton } from "./SkeletonBase";

interface SkeletonFormFieldProps {
  label?: boolean;
  className?: string;
}

export const SkeletonFormField = memo(function SkeletonFormField({
  label = true,
  className = ""
}: SkeletonFormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <SkeletonText lines={1} lineHeight="sm" className="w-24" />}
      <SkeletonBox height={40} className="bg-gray-100" />
    </div>
  );
});

interface SkeletonCheckoutFormProps {
  className?: string;
}

export const SkeletonCheckoutForm = memo(function SkeletonCheckoutForm({
  className = ""
}: SkeletonCheckoutFormProps) {
  return (
    <SkeletonBase className={`bg-white rounded-xl shadow-sm border p-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <SkeletonText lines={1} lineHeight="lg" className="w-48" />
          <SkeletonText lines={1} lineHeight="sm" className="w-64" />
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <SkeletonText lines={1} lineHeight="md" className="w-32" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonFormField />
            <SkeletonFormField />
          </div>
          <SkeletonFormField />
        </div>

        {/* Delivery Information */}
        <div className="space-y-4">
          <SkeletonText lines={1} lineHeight="md" className="w-40" />
          <SkeletonFormField />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonFormField />
            <SkeletonFormField />
          </div>
          <SkeletonFormField />
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <SkeletonText lines={1} lineHeight="md" className="w-32" />
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <SkeletonBox width={20} height={20} rounded="full" className="bg-gray-200" />
                <SkeletonText lines={1} lineHeight="sm" className="w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <SkeletonButton size="lg" className="w-full" />
      </div>
    </SkeletonBase>
  );
});

interface SkeletonPaymentFormProps {
  className?: string;
}

export const SkeletonPaymentForm = memo(function SkeletonPaymentForm({
  className = ""
}: SkeletonPaymentFormProps) {
  return (
    <SkeletonBase className={`bg-white rounded-xl shadow-sm border p-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <SkeletonText lines={1} lineHeight="lg" className="w-40" />
          <SkeletonText lines={1} lineHeight="sm" className="w-56" />
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-4">
          <SkeletonText lines={1} lineHeight="md" className="w-36" />
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <SkeletonBox width={24} height={24} rounded="full" className="bg-gray-200" />
                <div className="flex-1 space-y-1">
                  <SkeletonText lines={1} lineHeight="sm" className="w-32" />
                  <SkeletonText lines={1} lineHeight="sm" className="w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Details */}
        <div className="space-y-4">
          <SkeletonText lines={1} lineHeight="md" className="w-28" />
          <SkeletonFormField />
          <div className="grid grid-cols-2 gap-4">
            <SkeletonFormField />
            <SkeletonFormField />
          </div>
        </div>

        {/* Billing Address */}
        <div className="space-y-4">
          <SkeletonText lines={1} lineHeight="md" className="w-32" />
          <SkeletonFormField />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonFormField />
            <SkeletonFormField />
          </div>
        </div>

        {/* Submit Button */}
        <SkeletonButton size="lg" className="w-full" />
      </div>
    </SkeletonBase>
  );
});

interface SkeletonSettingsFormProps {
  className?: string;
}

export const SkeletonSettingsForm = memo(function SkeletonSettingsForm({
  className = ""
}: SkeletonSettingsFormProps) {
  return (
    <SkeletonBase className={`bg-white rounded-xl shadow-sm border p-6 ${className}`}>
      <div className="space-y-8">
        {/* Restaurant Information */}
        <div className="space-y-4">
          <SkeletonText lines={1} lineHeight="lg" className="w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonFormField />
            <SkeletonFormField />
          </div>
          <SkeletonFormField />
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <SkeletonText lines={1} lineHeight="lg" className="w-40" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonFormField />
            <SkeletonFormField />
          </div>
          <SkeletonFormField />
        </div>

        {/* Business Hours */}
        <div className="space-y-4">
          <SkeletonText lines={1} lineHeight="lg" className="w-32" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <SkeletonText lines={1} lineHeight="sm" className="w-20" />
                <div className="flex space-x-2">
                  <SkeletonBox height={40} className="bg-gray-100 flex-1" />
                  <SkeletonBox height={40} className="bg-gray-100 flex-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Settings */}
        <div className="space-y-4">
          <SkeletonText lines={1} lineHeight="lg" className="w-36" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <SkeletonBox width={20} height={20} rounded="full" className="bg-gray-200" />
                  <SkeletonText lines={1} lineHeight="sm" className="w-32" />
                </div>
                <SkeletonBox width={40} height={20} rounded="full" className="bg-emerald-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <SkeletonButton size="lg" className="w-32" />
        </div>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonItemCustomizationModalProps {
  className?: string;
}

export const SkeletonItemCustomizationModal = memo(function SkeletonItemCustomizationModal({
  className = ""
}: SkeletonItemCustomizationModalProps) {
  return (
    <SkeletonBase className={`bg-white rounded-xl shadow-lg border p-6 max-w-md mx-auto ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <SkeletonText lines={1} lineHeight="lg" className="w-40" />
          <SkeletonText lines={1} lineHeight="sm" className="w-32" />
        </div>

        {/* Image */}
        <SkeletonImage width="100%" height={200} rounded="lg" />

        {/* Description */}
        <SkeletonText lines={3} lineHeight="sm" />

        {/* Customization Options */}
        <div className="space-y-4">
          <SkeletonText lines={1} lineHeight="md" className="w-24" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <SkeletonText lines={1} lineHeight="sm" className="w-32" />
              <div className="space-y-2">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <SkeletonBox width={16} height={16} rounded="full" className="bg-gray-200" />
                      <SkeletonText lines={1} lineHeight="sm" className="w-24" />
                    </div>
                    <SkeletonBox width={40} height={20} className="bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <SkeletonBox width={60} height={24} className="bg-emerald-100" />
          <SkeletonButton size="md" className="w-32" />
        </div>
      </div>
    </SkeletonBase>
  );
});
