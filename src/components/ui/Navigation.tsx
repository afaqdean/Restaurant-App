"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Utensils } from "lucide-react";
import CartIcon from "./CartIcon";
import { UserMenu } from "./UserMenu";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 bg-slate-900/95 backdrop-blur-sm shadow-lg z-50">
      <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-10xl 4xl:max-w-15xl 5xl:max-w-20xl 6xl:max-w-25xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 3xl:px-16 4xl:px-20 5xl:px-24 6xl:px-32">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Utensils className="w-8 h-8 text-emerald-400 mr-3" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-100 to-teal-400 bg-clip-text text-transparent drop-shadow-lg shadow-emerald-500/20">Delicious Bites</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/menu"
              className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
            >
              Menu
            </Link>
            
            {session && (
              <>
                <Link
                  href="/orders"
                  className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
                >
                  My Orders
                </Link>
                
                {session.user.role === "ADMIN" && (
                  <Link
                    href="/admin/orders"
                    className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
            
            <div className="flex items-center space-x-8">
              <CartIcon />
              <UserMenu />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <CartIcon />
            <UserMenu />
            <button className="text-slate-300 hover:text-emerald-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
