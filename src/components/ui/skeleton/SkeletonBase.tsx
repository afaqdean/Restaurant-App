import { memo } from "react";

interface SkeletonBaseProps {
  className?: string;
  children?: React.ReactNode;
}

export const SkeletonBase = memo(function SkeletonBase({ 
  className = "", 
  children 
}: SkeletonBaseProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {children}
    </div>
  );
});

interface SkeletonBoxProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const SkeletonBox = memo(function SkeletonBox({
  width = "100%",
  height = "1rem",
  className = "",
  rounded = "md"
}: SkeletonBoxProps) {
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full"
  };

  return (
    <div
      className={`bg-gray-200 ${roundedClasses[rounded]} ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
});

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineHeight?: "sm" | "md" | "lg";
  lastLineWidth?: string;
}

export const SkeletonText = memo(function SkeletonText({
  lines = 1,
  className = "",
  lineHeight = "md",
  lastLineWidth = "75%"
}: SkeletonTextProps) {
  const heightClasses = {
    sm: "h-3",
    md: "h-4",
    lg: "h-5"
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBox
          key={index}
          height={heightClasses[lineHeight]}
          width={index === lines - 1 ? lastLineWidth : "100%"}
          className="bg-gray-200"
        />
      ))}
    </div>
  );
});

interface SkeletonImageProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const SkeletonImage = memo(function SkeletonImage({
  width = "100%",
  height = "200px",
  className = "",
  rounded = "md"
}: SkeletonImageProps) {
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full"
  };

  return (
    <div
      className={`bg-gray-200 ${roundedClasses[rounded]} flex items-center justify-center ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
});

interface SkeletonButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "text";
  className?: string;
}

export const SkeletonButton = memo(function SkeletonButton({
  size = "md",
  variant = "solid",
  className = ""
}: SkeletonButtonProps) {
  const sizeClasses = {
    sm: "h-8 px-3",
    md: "h-10 px-4",
    lg: "h-12 px-6"
  };

  const variantClasses = {
    solid: "bg-gray-200",
    outline: "bg-white border-2 border-gray-200",
    text: "bg-gray-100"
  };

  return (
    <div
      className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-lg ${className}`}
    />
  );
});

interface SkeletonAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const SkeletonAvatar = memo(function SkeletonAvatar({
  size = "md",
  className = ""
}: SkeletonAvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-gray-200 rounded-full ${className}`}
    />
  );
});
