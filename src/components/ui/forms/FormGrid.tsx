import { ReactNode } from "react";

interface FormGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

export function FormGrid({ children, columns = 2, className = "" }: FormGridProps) {
  const gridClasses = {
    1: "grid grid-cols-1 gap-6",
    2: "grid grid-cols-1 md:grid-cols-2 gap-6",
    3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  };

  return (
    <div className={`${gridClasses[columns]} ${className}`}>
      {children}
    </div>
  );
}
