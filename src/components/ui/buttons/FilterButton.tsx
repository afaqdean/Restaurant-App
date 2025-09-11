import { FilterButtonProps } from "@/types/buttons";

export function FilterButton({
  children,
  isActive = false,
  variant = "category",
  size = "md",
  className = "",
  ...props
}: FilterButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    category: isActive
      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
      : "bg-white text-gray-700 border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700",
    toggle: isActive
      ? "bg-emerald-500 text-white"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
