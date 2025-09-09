"use client";

import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { PageLoadingState, PageErrorState } from "@/components/ui/StandardStates";

export default function AdminSettingsPage() {
  const { data, isLoading, error } = useSettings();
  const updateSettings = useUpdateSettings();

  const handleSettingsSubmit = (settings: any) => {
    updateSettings.mutate(settings);
  };

  if (isLoading) {
    return <PageLoadingState message="Loading settings..." />;
  }

  if (error) {
    return (
      <PageErrorState 
        title="Error Loading Settings"
        message="Failed to load settings. Please try again." 
        onRetry={() => window.location.reload()} 
      />
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
