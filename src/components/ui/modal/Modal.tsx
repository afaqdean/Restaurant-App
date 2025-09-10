import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
  className?: string;
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = "max-w-2xl",
  className = "" 
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl ${maxWidth} w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 ${className}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
