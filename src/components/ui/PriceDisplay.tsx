import { memo } from "react";
import { formatPrice } from "@/lib/utils/formatting";

interface PriceDisplayProps {
  amount: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const PriceDisplay = memo(function PriceDisplay({ amount, className = "", size = "md" }: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-sm font-medium",
    md: "font-semibold",
    lg: "text-lg font-bold"
  };

  return (
    <span className={`text-gray-900 ${sizeClasses[size]} ${className}`}>
      {formatPrice(amount)}
    </span>
  );
});
