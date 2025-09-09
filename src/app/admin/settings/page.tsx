"use client";

import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default function AdminSettingsPage() {
  const { data, isLoading, error } = useSettings();
  const updateSettings = useUpdateSettings();

  const handleSettingsSubmit = (settings: any) => {
    updateSettings.mutate(settings);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Settings</h1>
          <p className="text-gray-600">Failed to load settings. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your restaurant's system settings.</p>
      </div>

      <SettingsForm
        initialData={data?.settings}
        onSubmit={handleSettingsSubmit}
        isLoading={updateSettings.isPending}
      />
    </div>
  );
}
