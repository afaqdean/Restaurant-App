import { ReactNode } from "react";

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

export function ModalContent({ children, className = "" }: ModalContentProps) {
  return (
    <div className={`p-6 space-y-6 min-h-0 ${className}`}>
      {children}
    </div>
  );
}
