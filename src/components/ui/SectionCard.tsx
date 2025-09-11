import { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  dataAos?: string;
  dataAosDelay?: string | number;
}

export function SectionCard({ 
  children, 
  className = "", 
  dataAos,
  dataAosDelay 
}: SectionCardProps) {
  const dataAttributes: Record<string, string | number> = {};
  if (dataAos) dataAttributes["data-aos"] = dataAos;
  if (dataAosDelay) dataAttributes["data-aos-delay"] = dataAosDelay;

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}
      {...dataAttributes}
    >
      {children}
    </div>
  );
}
