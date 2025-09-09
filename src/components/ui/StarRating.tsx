import { memo } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
}

export const StarRating = memo(function StarRating({ 
  rating, 
  maxRating = 5, 
  size = "md",
  showNumber = false,
  className = "" 
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  const stars = Array.from({ length: maxRating }, (_, i) => (
    <Star
      key={i}
      className={`${sizeClasses[size]} ${
        i < rating ? 'text-yellow-400 fill-current' : 'text-slate-400'
      }`}
    />
  ));

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {stars}
      {showNumber && (
        <span className="ml-2 text-sm font-medium text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
});
