"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Menu as MenuIcon, 
  BarChart3, 
  DollarSign, 
  Settings, 
  Shield,
  Search
} from "lucide-react";
import { UserMenu } from "./UserMenu";

export function AdminHeader() {
  const pathname = usePathname();

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      current: pathname === "/admin"
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
      current: pathname.startsWith("/admin/orders")
    },
    {
      name: "Menu",
      href: "/admin/menu",
      icon: MenuIcon,
      current: pathname.startsWith("/admin/menu")
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
      current: pathname.startsWith("/admin/reports")
    },
    {
      name: "Expenses",
      href: "/admin/expenses",
      icon: DollarSign,
      current: pathname.startsWith("/admin/expenses")
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: pathname.startsWith("/admin/settings")
    },
    {
      name: "Audit",
      href: "/admin/audit",
      icon: Shield,
      current: pathname.startsWith("/admin/audit")
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
            </Link>
          </div>

          {/* Admin Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.current
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "text-gray-700 hover:text-red-500 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-red-500 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            <UserMenu />
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-700 hover:text-red-500 transition-colors">
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <nav className="py-2 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.current
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "text-gray-700 hover:text-red-500 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
