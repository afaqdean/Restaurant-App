import { memo, ReactNode } from "react";

interface CardHeaderProps {
  title: string;
  icon: ReactNode;
  subtitle?: string | ReactNode;
  className?: string;
}

export const CardHeader = memo(function CardHeader({ title, icon, subtitle, className = "" }: CardHeaderProps) {
  return (
    <div className={`p-6 border-b border-gray-100 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
            {icon}
          </div>
          {title}
        </h2>
        {subtitle && (
          <div className="flex items-center">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
});
