import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export function FormSection({ title, icon, children, className = "" }: FormSectionProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
          {icon}
        </div>
        {title}
      </h3>
      {children}
    </div>
  );
}
