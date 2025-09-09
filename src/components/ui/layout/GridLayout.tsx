import { ReactNode } from "react";

interface GridLayoutProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg" | "xl";
  responsive?: boolean;
}

export function GridLayout({ 
  children, 
  className = "",
  columns = 2,
  gap = "md",
  responsive = true
}: GridLayoutProps) {
  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  };

  const getGridClasses = () => {
    if (!responsive) {
      return `grid-cols-${columns}`;
    }

    // Responsive grid classes
    const responsiveClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    };

    return responsiveClasses[columns];
  };

  return (
    <div className={`grid ${getGridClasses()} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}
