"use client";

import Link from "next/link";
import { Search, ShoppingCart, Menu as MenuIcon } from "lucide-react";
import { UserMenu } from "./UserMenu";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Restaurant</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-red-500 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-gray-700 hover:text-red-500 px-3 py-2 text-sm font-medium transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-red-500 px-3 py-2 text-sm font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              href="/food-carts"
              className="text-gray-700 hover:text-red-500 px-3 py-2 text-sm font-medium transition-colors"
            >
              Food Carts
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-red-500 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-red-500 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>

            <UserMenu />
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-700 hover:text-red-500 transition-colors">
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
