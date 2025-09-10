import { Loader2, ShoppingCart, Trash2, Edit3 } from "lucide-react";
import { CartActionButtonProps } from "@/types/buttons";

export function CartActionButton({
  children,
  action,
  isLoading = false,
  loadingText = "Loading...",
  icon,
  variant = "text",
  size = "md",
  className = "",
  disabled,
  ...props
}: CartActionButtonProps) {
  const isDisabled = disabled || isLoading;

  const baseClasses = "inline-flex items-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const getActionIcon = () => {
    if (icon) return icon;
    switch (action) {
      case "add": return <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />;
      case "remove": return <Trash2 className="h-4 w-4" />;
      case "edit": return <Edit3 className="h-4 w-4" />;
      default: return null;
    }
  };

  const variantClasses = {
    text: "text-emerald-600 hover:text-emerald-700 hover:underline",
    "icon-text": "text-emerald-600 hover:text-emerald-700 gap-2 group-hover:gap-3 transition-all",
    destructive: "text-red-600 hover:text-red-700 hover:underline"
  };

  const sizeClasses = {
    sm: "text-sm",
    md: "text-sm sm:text-base"
  };

  const actionIcon = getActionIcon();

  return (
    <button
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {actionIcon && variant === "icon-text" && (
            <span>{actionIcon}</span>
          )}
          {children}
        </>
      )}
    </button>
  );
}
