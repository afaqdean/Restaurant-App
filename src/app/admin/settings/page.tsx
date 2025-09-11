"use client";

import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { PageLoadingState, PageErrorState } from "@/components/ui/StandardStates";
import { SkeletonAdminSettingsPage } from "@/components/ui/skeleton";

export default function AdminSettingsPage() {
  const { data, isLoading, error } = useSettings();
  const updateSettings = useUpdateSettings();

  const handleSettingsSubmit = (settings: any) => {
    updateSettings.mutate(settings);
  };

  if (isLoading) {
    return <SkeletonAdminSettingsPage />;
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
      <div className="mb-8" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Settings</h1>
        <p className="text-lg text-gray-600">Configure your restaurant's system settings.</p>
      </div>

      <SettingsForm
        initialData={data?.settings}
        onSubmit={handleSettingsSubmit}
        isLoading={updateSettings.isPending}
      />
    </div>
  );
}
