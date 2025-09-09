import Link from "next/link";
import { ArrowRight, Trash2, ShoppingCart } from "lucide-react";

interface CartActionsProps {
  isAuthenticated: boolean;
  onClearCart: () => void;
}

export function CartActions({ isAuthenticated, onClearCart }: CartActionsProps) {
  return (
    <div className="space-y-4">
      {isAuthenticated ? (
        <Link
          href="/checkout"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 text-center block font-semibold text-lg shadow-lg hover:shadow-xl group"
        >
          Proceed to Checkout
          <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      ) : (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-yellow-800">Sign In Required</span>
            </div>
            <p className="text-sm text-yellow-700 mb-4">
              You need to sign in or create an account to proceed with checkout.
            </p>
            <div className="space-y-3">
              <Link
                href="/auth/signin?callbackUrl=/checkout"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 text-center block text-sm font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup?callbackUrl=/checkout"
                className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 hover:border-emerald-300 transition-all duration-300 text-center block text-sm font-semibold"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onClearCart();
          }}
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Cart
        </button>
        
        <Link
          href="/menu"
          className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 hover:border-emerald-300 transition-all duration-300 font-medium flex items-center justify-center"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
