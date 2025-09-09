import { Download } from "lucide-react";
import { useReceipt } from "@/hooks/useReceipt";
import { toast } from "react-hot-toast";

interface ReceiptButtonProps {
  orderId: string;
  orderNumber?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function ReceiptButton({ 
  orderId, 
  orderNumber, 
  className = "",
  variant = "outline",
  size = "md"
}: ReceiptButtonProps) {
  const { downloadReceipt, isDownloading } = useReceipt();

  const handleDownload = () => {
    downloadReceipt(
      { orderId },
      {
        onSuccess: () => {
          toast.success("Receipt downloaded successfully!");
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to download receipt");
        },
      }
    );
  };

  const baseClasses = "inline-flex items-center gap-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <Download className="w-4 h-4" />
      {isDownloading ? "Downloading..." : `Download Receipt${orderNumber ? ` #${orderNumber}` : ""}`}
    </button>
  );
}
