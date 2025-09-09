import { memo } from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = memo(function LoadingSpinner({ 
  size = "md", 
  text,
  className = "",
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8", 
    xl: "h-12 w-12"
  };

  const content = (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-center">
        <Loader2 className={`${sizeClasses[size]} text-emerald-600 animate-spin mx-auto mb-2`} />
        {text && (
          <p className="text-gray-600 text-sm">{text}</p>
        )}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
});
