import { ReactNode } from "react";
import { ButtonGroup } from "@/components/ui/buttons/ButtonGroup";

interface PageActionsProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "between";
  direction?: "horizontal" | "vertical";
}

export function PageActions({ 
  children, 
  className = "",
  align = "between",
  direction = "horizontal"
}: PageActionsProps) {
  return (
    <div className={`py-6 ${className}`}>
      <ButtonGroup align={align} direction={direction}>
        {children}
      </ButtonGroup>
    </div>
  );
}
