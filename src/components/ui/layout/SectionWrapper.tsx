import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  variant?: "card" | "plain" | "bordered";
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  aos?: string;
  aosDelay?: string;
}

export function SectionWrapper({ 
  children, 
  className = "",
  variant = "card",
  padding = "md",
  shadow = "md",
  aos,
  aosDelay
}: SectionWrapperProps) {
  const variantClasses = {
    card: "bg-white rounded-2xl border border-gray-100 overflow-hidden",
    plain: "bg-transparent",
    bordered: "bg-white rounded-2xl border border-gray-200"
  };

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6", 
    lg: "p-8"
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-lg",
    lg: "shadow-xl"
  };

  const aosAttributes = aos ? {
    "data-aos": aos,
    ...(aosDelay && { "data-aos-delay": aosDelay })
  } : {};

  return (
    <div 
      className={`${variantClasses[variant]} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`}
      {...aosAttributes}
    >
      {children}
    </div>
  );
}
