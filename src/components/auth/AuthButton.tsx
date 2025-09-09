import { Loader2 } from "lucide-react";
import { AuthButtonProps } from "@/types";

export function AuthButton({
  type = "button",
  onClick,
  disabled = false,
  isLoading = false,
  loadingText = "Loading...",
  children,
  className = "",
}: AuthButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
