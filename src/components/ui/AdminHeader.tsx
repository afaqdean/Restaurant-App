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
  Search,
  Utensils
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
    <header className="bg-slate-900/95 backdrop-blur-sm shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center group">
              <Utensils className="w-8 h-8 text-emerald-400 mr-3 group-hover:text-emerald-300 transition-colors" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-100 to-teal-400 bg-clip-text text-transparent drop-shadow-lg shadow-emerald-500/20 font-aspekta">Delicious Bites</span>
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    item.current
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 shadow-sm"
                      : "text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10"
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
            <button className="p-2 text-slate-300 hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-500/10">
              <Search className="h-5 w-5" />
            </button>

            <UserMenu />
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-slate-300 hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-500/10">
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-slate-700/50">
          <nav className="py-2 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    item.current
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 shadow-sm"
                      : "text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10"
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
