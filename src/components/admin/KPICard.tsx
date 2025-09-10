import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function KPICard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  className = "" 
}: KPICardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mb-3">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center">
              <span
                className={`text-sm font-medium px-2 py-1 rounded-full ${
                  trend.isPositive ? "text-emerald-700 bg-emerald-100" : "text-red-700 bg-red-100"
                }`}
              >
                {trend.isPositive ? "+" : ""}{trend.value}% vs yesterday
              </span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center shadow-sm">
            <Icon className="w-7 h-7 text-emerald-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
