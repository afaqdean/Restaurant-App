import { ReactNode } from "react";
import { PageLoadingState, PageErrorState } from "@/components/ui/StandardStates";

interface PageStateHandlerProps {
  loading: boolean;
  error: string | null;
  loadingMessage?: string;
  onRetry?: () => void;
  children: ReactNode;
  emptyState?: ReactNode;
  showEmptyState?: boolean;
}

export function PageStateHandler({
  loading,
  error,
  loadingMessage = "Loading...",
  onRetry,
  children,
  emptyState,
  showEmptyState = false
}: PageStateHandlerProps) {
  if (loading) {
    return <PageLoadingState message={loadingMessage} />;
  }

  if (error) {
    return (
      <PageErrorState 
        message={error} 
        onRetry={onRetry || (() => window.location.reload())} 
      />
    );
  }

  if (showEmptyState && emptyState) {
    return <>{emptyState}</>;
  }

  return <>{children}</>;
}
