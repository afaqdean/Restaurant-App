import { ReactNode } from "react";

interface ModalActionsProps {
  children: ReactNode;
  className?: string;
}

export function ModalActions({ children, className = "" }: ModalActionsProps) {
  return (
    <div className={`flex space-x-4 p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0 ${className}`}>
      {children}
    </div>
  );
}
