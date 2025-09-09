import { Loader2 } from "lucide-react";
import { PrimaryButtonProps } from "@/types/buttons";

export function PrimaryButton({
  children,
  isLoading = false,
  loadingText = "Loading...",
  variant = "gradient",
  size = "md",
  icon,
  iconPosition = "right",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: PrimaryButtonProps) {
  const isDisabled = disabled || isLoading;

  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl";
  
  const variantClasses = {
    gradient: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white",
    solid: "bg-emerald-600 hover:bg-emerald-700 text-white"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl"
  };

  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          {loadingText}
        </div>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">{icon}</span>
          )}
        </>
      )}
    </button>
  );
}
