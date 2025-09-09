import { ReactNode } from "react";
import { CardHeader } from "@/components/ui/CardHeader";

interface InfoItem {
  label: string;
  value: string | ReactNode;
  showBorder?: boolean;
}

interface InfoCardProps {
  title: string;
  icon: ReactNode;
  items: InfoItem[];
  className?: string;
  showBorder?: boolean;
}

export function InfoCard({ 
  title, 
  icon, 
  items, 
  className = "",
  showBorder = true
}: InfoCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      <CardHeader
        title={title}
        icon={icon}
      />
      
      <div className="p-6">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div 
              key={index}
              className={`flex justify-between items-center py-2 ${
                showBorder && index < items.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-gray-600 font-medium">{item.label}:</span>
              <span className="text-gray-900 font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
