import Link from "next/link";
import { ArrowRight, Trash2, ShoppingCart } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { CartActionsProps } from "@/types/customer-components";

export function CartActions({ isAuthenticated, onClearCart }: CartActionsProps) {
  return (
    <div className="space-y-4">
      {isAuthenticated ? (
        <Link href="/checkout">
          <PrimaryButton 
            size="lg" 
            fullWidth 
            icon={<ArrowRight className="w-5 h-5" />}
            className="shadow-lg hover:shadow-xl"
          >
            Proceed to Checkout
          </PrimaryButton>
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
              <Link href="/auth/signin?callbackUrl=/checkout">
                <PrimaryButton size="sm" fullWidth>
                  Sign In
                </PrimaryButton>
              </Link>
              <Link href="/auth/signup?callbackUrl=/checkout">
                <SecondaryButton size="sm" fullWidth>
                  Create Account
                </SecondaryButton>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        <SecondaryButton
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onClearCart();
          }}
          variant="ghost"
          fullWidth
          icon={<Trash2 className="w-4 h-4" />}
          iconPosition="left"
        >
          Clear Cart
        </SecondaryButton>
        
        <Link href="/menu">
          <SecondaryButton
            fullWidth
            icon={<ShoppingCart className="w-4 h-4" />}
            iconPosition="left"
          >
            Continue Shopping
          </SecondaryButton>
        </Link>
      </div>
    </div>
  );
}
