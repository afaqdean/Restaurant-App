"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

export default function CartIcon() {
  const { state } = useCart();
  
  const itemCount = state.cart?.itemCount || 0;

  return (
    <Link href="/cart" className="relative">
      <div className="relative">
        <svg
          className="w-6 h-6 text-slate-300 hover:text-emerald-400 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
        
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </div>
    </Link>
  );
}
