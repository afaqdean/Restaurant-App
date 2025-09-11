"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Menu as MenuIcon,
  BarChart3,
  DollarSign,
  Settings,
  Shield,
  Utensils,
  X,
  ChevronLeft,
  ChevronRight,
  Package
} from "lucide-react";
import { UserMenu } from "./UserMenu";

interface AdminDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function AdminDrawer({ isOpen, onToggle, isCollapsed, onToggleCollapse }: AdminDrawerProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      current: pathname === "/admin",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
      current: pathname.startsWith("/admin/orders"),
    },
    {
      name: "Menu",
      href: "/admin/menu",
      icon: MenuIcon,
      current: pathname.startsWith("/admin/menu"),
    },
    {
      name: "Item Tracker",
      href: "/admin/reports/items",
      icon: Package,
      current: pathname.startsWith("/admin/reports/items"),
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
      current: pathname.startsWith("/admin/reports") && !pathname.startsWith("/admin/reports/items"),
    },
    {
      name: "Expenses",
      href: "/admin/expenses",
      icon: DollarSign,
      current: pathname.startsWith("/admin/expenses"),
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: pathname.startsWith("/admin/settings"),
    },
    {
      name: "Audit Logs",
      href: "/admin/audit",
      icon: Shield,
      current: pathname.startsWith("/admin/audit"),
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-slate-900 shadow-2xl transform transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${
          isCollapsed ? "w-20" : "w-80"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center justify-between border-b border-slate-700/50 ${
            isCollapsed ? "p-4" : "p-6"
          }`}>
            {!isCollapsed && (
              <Link href="/admin" className="flex items-center group">
                <Utensils className="w-8 h-8 text-emerald-400 mr-3 group-hover:text-emerald-300 transition-colors" />
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-100 to-teal-400 bg-clip-text text-transparent drop-shadow-lg shadow-emerald-500/20 font-aspekta">
                  Delicious Bites
                </span>
              </Link>
            )}
            
            {isCollapsed && (
              <Link href="/admin" className="flex items-center justify-center group">
                <Utensils className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </Link>
            )}

            <div className="flex items-center space-x-2">
              {/* Collapse toggle - only show on desktop */}
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex p-2 text-slate-300 hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-500/10"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
              
              {/* Mobile close button */}
              <button
                onClick={onToggle}
                className="lg:hidden p-2 text-slate-300 hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-500/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Menu */}
          {!isCollapsed && (
            <div className="p-6 border-b border-slate-700/50">
              <UserMenu />
            </div>
          )}

          {/* Navigation */}
          <nav className={`flex-1 overflow-y-auto ${
            isCollapsed ? "px-2 py-6 space-y-2" : "px-4 py-6 space-y-2"
          }`}>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isCollapsed 
                      ? "justify-center px-3 py-3" 
                      : "space-x-3 px-4 py-3"
                  } ${
                    item.current
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 shadow-sm"
                      : "text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10"
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Collapsed User Avatar */}
          {isCollapsed && (
            <div className="p-2 border-t border-slate-700/50">
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-xs text-slate-300">U</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Top bar component for mobile
export function AdminTopBar({ onToggle }: { onToggle: () => void }) {
  return (
    <div className="lg:hidden bg-slate-900/95 backdrop-blur-sm shadow-lg relative z-40">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          onClick={onToggle}
          className="p-2 text-slate-300 hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-500/10"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        
        <Link href="/admin" className="flex items-center group">
          <Utensils className="w-6 h-6 text-emerald-400 mr-2 group-hover:text-emerald-300 transition-colors" />
          <span className="text-lg font-bold bg-gradient-to-r from-emerald-500 via-emerald-100 to-teal-400 bg-clip-text text-transparent drop-shadow-lg shadow-emerald-500/20 font-aspekta">
            Delicious Bites
          </span>
        </Link>

        <div className="w-10 h-10" /> {/* Spacer for centering */}
      </div>
    </div>
  );
}
