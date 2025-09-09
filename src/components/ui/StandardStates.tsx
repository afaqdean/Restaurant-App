import React from "react";
import { Loader2, AlertCircle, Search, ShoppingCart} from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

// Base loading state component
interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  fullScreen?: boolean;
}

export function LoadingState({ 
  message = "Loading...", 
  size = "md", 
  className = "",
  fullScreen = false 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  const containerClasses = fullScreen 
    ? "min-h-screen bg-gray-50 flex items-center justify-center"
    : "flex items-center justify-center py-8";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="text-center">
        <Loader2 className={`${sizeClasses[size]} text-emerald-600 animate-spin mx-auto`} />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}

// Base error state component
interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
  icon?: React.ReactNode;
  className?: string;
  fullScreen?: boolean;
}

export function ErrorState({ 
  title = "Something went wrong",
  message,
  onRetry,
  retryText = "Try Again",
  icon,
  className = "",
  fullScreen = false
}: ErrorStateProps) {
  const containerClasses = fullScreen 
    ? "min-h-screen bg-gray-50 flex items-center justify-center"
    : "flex items-center justify-center py-8";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md mx-auto">
        <div className="text-red-500 mb-4">
          {icon || <AlertCircle className="h-12 w-12 mx-auto" />}
        </div>
        <h2 className="text-xl font-semibold text-red-800 mb-3">{title}</h2>
        <p className="text-red-600 mb-6">{message}</p>
        {onRetry && (
          <PrimaryButton
            onClick={onRetry}
            variant="solid"
            className="bg-red-600 hover:bg-red-700"
          >
            {retryText}
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}

// Base empty state component
interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
  };
  className?: string;
  fullScreen?: boolean;
}

export function EmptyState({ 
  title,
  message,
  icon,
  action,
  className = "",
  fullScreen = false
}: EmptyStateProps) {
  const containerClasses = fullScreen 
    ? "min-h-screen bg-gray-50 flex items-center justify-center"
    : "flex items-center justify-center py-8";

  const actionClasses = action?.variant === "secondary"
    ? "px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-emerald-300 transition-all duration-300 font-medium"
    : "px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
        <div className="text-emerald-500 mb-6">
          {icon || <Search className="h-16 w-16 mx-auto" />}
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {action && (
          <PrimaryButton
            onClick={action.onClick}
            className={actionClasses}
          >
            {action.label}
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}

// Specialized empty state for cart
interface CartEmptyStateProps {
  onBrowseMenu: () => void;
  onGoHome: () => void;
  className?: string;
}

export function CartEmptyState({ onBrowseMenu, onGoHome, className = "" }: CartEmptyStateProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="py-12 md:py-16">
          <div className="text-center">
            <h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" 
              data-aos="fade-up"
            >
              Your <span className="text-emerald-600">Cart</span> is Empty
            </h1>
            <p 
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8" 
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              Discover our carefully crafted menu and add some delicious items to get started!
            </p>
          </div>
        </div>

        {/* Empty State Content */}
        <div className="py-20" data-aos="fade-up" data-aos-delay="200">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-100 to-teal-200 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-16 w-16 text-emerald-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Order?</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Browse our menu and discover amazing dishes crafted with the finest ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton
                onClick={onBrowseMenu}
                size="lg"
                icon={<ShoppingCart className="w-5 h-5" />}
                iconPosition="left"
                className="shadow-lg hover:shadow-xl"
              >
                Browse Menu
              </PrimaryButton>
              <SecondaryButton
                onClick={onGoHome}
                size="lg"
              >
                Back to Home
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Specialized loading state for pages
interface PageLoadingStateProps {
  message?: string;
  className?: string;
}

export function PageLoadingState({ message = "Loading...", className = "" }: PageLoadingStateProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <LoadingState message={message} fullScreen={false} />
      </div>
    </div>
  );
}

// Specialized error state for pages
interface PageErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function PageErrorState({ title, message, onRetry, className = "" }: PageErrorStateProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ErrorState 
          title={title}
          message={message}
          onRetry={onRetry}
          fullScreen={false}
        />
      </div>
    </div>
  );
}
