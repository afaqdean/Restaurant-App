import { ReactNode } from "react";
import { Hero } from "@/components/ui/Hero";

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: string;
  variant?: "simple" | "menu" | "restaurant";
  className?: string;
  children?: ReactNode;
}

export function PageHeader({ 
  title, 
  subtitle, 
  variant = "simple",
  className = "",
  children
}: PageHeaderProps) {
  return (
    <div className={className}>
      <Hero
        title={title}
        subtitle={subtitle}
        variant={variant}
      />
      {children}
    </div>
  );
}
