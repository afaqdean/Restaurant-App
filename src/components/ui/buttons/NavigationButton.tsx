import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavigationButtonProps } from "@/types/buttons";

export function NavigationButton({
  direction,
  variant = "carousel",
  size = "md",
  isActive = false,
  label,
  className = "",
  ...props
}: NavigationButtonProps) {
  const baseClasses = "inline-flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    carousel: "bg-white/90 hover:bg-white text-gray-900 shadow-lg hover:scale-110",
    dots: isActive 
      ? "bg-emerald-400 scale-125 shadow-lg shadow-emerald-400/50" 
      : "bg-slate-500 hover:bg-slate-400"
  };

  const sizeClasses = {
    sm: variant === "carousel" ? "p-2 rounded-full" : "w-3 h-3 rounded-full",
    md: variant === "carousel" ? "p-3 rounded-full" : "w-4 h-4 rounded-full",
    lg: variant === "carousel" ? "p-4 rounded-full" : "w-5 h-5 rounded-full"
  };

  const getIcon = () => {
    if (variant === "dots") return null;
    return direction === "prev" ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />;
  };

  const icon = getIcon();
  const ariaLabel = label || `${direction === "prev" ? "Previous" : "Next"} ${variant === "carousel" ? "slide" : "item"}`;

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </button>
  );
}
