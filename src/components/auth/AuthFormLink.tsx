import Link from "next/link";
import { AuthFormLinkProps } from "@/types";

export function AuthFormLink({ href, children, className = "" }: AuthFormLinkProps) {
  return (
    <Link
      href={href}
      className={`font-semibold text-emerald-600 hover:text-emerald-700 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
