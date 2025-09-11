import { ReactNode } from "react";

interface FormWrapperProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
  variant?: "card" | "plain";
  padding?: "none" | "sm" | "md" | "lg";
}

export function FormWrapper({ 
  children, 
  onSubmit,
  className = "",
  variant = "card",
  padding = "md"
}: FormWrapperProps) {
  const variantClasses = {
    card: "bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden",
    plain: "bg-transparent"
  };

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6", 
    lg: "p-8"
  };

  return (
    <div className={`${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
      </form>
    </div>
  );
}
