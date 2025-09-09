import { ReactNode } from "react";

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  direction?: "horizontal" | "vertical";
  spacing?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right" | "between";
}

export function ButtonGroup({ 
  children, 
  className = "",
  direction = "horizontal",
  spacing = "md",
  align = "left"
}: ButtonGroupProps) {
  const directionClasses = {
    horizontal: "flex-row",
    vertical: "flex-col"
  };

  const spacingClasses = {
    sm: "space-x-2 space-y-0",
    md: "space-x-4 space-y-0", 
    lg: "space-x-6 space-y-0"
  };

  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between"
  };

  return (
    <div className={`flex ${directionClasses[direction]} ${spacingClasses[spacing]} ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
}
