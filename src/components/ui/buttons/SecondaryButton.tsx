import { SecondaryButtonProps } from "@/types/buttons";

export function SecondaryButton({
  children,
  variant = "outline",
  size = "md",
  icon,
  iconPosition = "right",
  fullWidth = false,
  className = "",
  ...props
}: SecondaryButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    outline: "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-emerald-300",
    ghost: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    gray: "bg-gray-100 text-gray-700 hover:bg-gray-200"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl"
  };

  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
}
