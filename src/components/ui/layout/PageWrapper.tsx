import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "7xl";
  padding?: "none" | "sm" | "md" | "lg";
}

export function PageWrapper({ 
  children, 
  className = "",
  maxWidth = "6xl",
  padding = "md"
}: PageWrapperProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl"
  };

  const paddingClasses = {
    none: "",
    sm: "px-2 sm:px-4",
    md: "px-4 sm:px-6",
    lg: "px-6 sm:px-8"
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto ${paddingClasses[padding]}`}>
        {children}
      </div>
    </div>
  );
}
