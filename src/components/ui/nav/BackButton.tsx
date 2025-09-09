import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SecondaryButton } from "@/components/ui/buttons";

interface BackButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "button" | "link";
}

export function BackButton({ 
  href, 
  children, 
  className = "",
  variant = "button"
}: BackButtonProps) {
  if (variant === "link") {
    return (
      <Link 
        href={href}
        className={`inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <SecondaryButton className={`flex items-center space-x-2 ${className}`}>
        <ArrowLeft className="w-4 h-4" />
        <span>{children}</span>
      </SecondaryButton>
    </Link>
  );
}
