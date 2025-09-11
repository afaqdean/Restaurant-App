import Link from "next/link";
import { Utensils } from "lucide-react";
import { AuthLayoutProps } from "@/types";
import { AUTH_LINKS } from "@/constants";

export function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  showBackToHome = true 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href={AUTH_LINKS.HOME} className="inline-flex items-center justify-center mb-6">
            <Utensils className="w-10 h-10 text-emerald-500 mr-3" />
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Delicious Bites
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {title}
          </h2>
          <p className="text-slate-600">
            {subtitle}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {children}
        </div>

        {/* Back to Home */}
        {showBackToHome && (
          <div className="text-center mt-6">
            <Link
              href={AUTH_LINKS.HOME}
              className="text-slate-500 hover:text-slate-700 transition-colors text-sm"
            >
              ← Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
