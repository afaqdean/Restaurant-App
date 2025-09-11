import Link from "next/link";
import { AuthRequiredProps } from "@/types/components";

export function AuthRequired({
  title,
  subtitle,
  signInUrl,
  signUpUrl,
  backUrl,
  backText = "Go Back",
  className = "",
}: AuthRequiredProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center py-12 md:py-16">
          <h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" 
            data-aos="fade-up"
          >
            {title}
          </h1>
          <p 
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8" 
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            {subtitle}
          </p>
        </div>
        
        <div className="py-20" data-aos="fade-up" data-aos-delay="200">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-100 to-teal-200 rounded-full flex items-center justify-center">
                <svg className="h-16 w-16 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Continue?</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Sign in to your account or create a new one to proceed.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href={signInUrl}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl group mb-4 sm:mb-0"
              >
                Sign In
              </Link>
              <Link
                href={signUpUrl}
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-emerald-300 transition-all duration-300 font-medium"
              >
                Create Account
              </Link>
            </div>
            {backUrl && (
              <Link
                href={backUrl}
                className="inline-block mt-6 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {backText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
