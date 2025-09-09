import { Minus, Plus } from "lucide-react";
import { QuantityButtonProps } from "@/types/buttons";

export function QuantityButton({
  type,
  isLoading = false,
  size = "md",
  className = "",
  disabled,
  ...props
}: QuantityButtonProps) {
  const isDisabled = disabled || isLoading;

  const baseClasses = "inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeClasses = {
    sm: "w-8 h-8 rounded-full border-2 border-gray-300 hover:bg-emerald-50 hover:border-emerald-300",
    md: "w-10 h-10 rounded-full border-2 border-gray-300 hover:bg-emerald-50 hover:border-emerald-300"
  };

  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  const icon = type === "increment" ? <Plus className={iconSize} /> : <Minus className={iconSize} />;

  return (
    <button
      disabled={isDisabled}
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className={`${iconSize} border-2 border-gray-400 border-t-transparent rounded-full animate-spin`} />
      ) : (
        icon
      )}
    </button>
  );
}
