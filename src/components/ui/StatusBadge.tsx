import { memo } from "react";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";
import { getStatusColor, getStatusIconName, formatStatusText } from "@/lib/utils/status";

interface StatusBadgeProps {
  status: string;
  showIcon?: boolean;
  className?: string;
}

const iconMap = {
  CheckCircle,
  Clock,
  Package,
  Truck,
};

export const StatusBadge = memo(function StatusBadge({ status, showIcon = true, className = "" }: StatusBadgeProps) {
  const iconName = getStatusIconName(status);
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Clock;

  return (
    <span className={`px-4 py-2 rounded-xl text-sm font-medium border flex items-center space-x-2 ${getStatusColor(status)} ${className}`}>
      {showIcon && <IconComponent className="w-4 h-4" />}
      <span>{formatStatusText(status)}</span>
    </span>
  );
});
