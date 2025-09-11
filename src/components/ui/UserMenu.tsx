"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, User, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session?.user) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <User className="h-5 w-5" />
          <span>Guest</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              <div className="font-medium">Guest User</div>
              <div className="text-gray-500">Not signed in</div>
            </div>
            
            <Link
              href="/auth/signin"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        <User className="h-5 w-5" />
        <span>{session.user.name || session.user.email}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            <div className="font-medium">{session.user.name}</div>
            <div className="text-gray-500">{session.user.email}</div>
            <div className="text-xs text-gray-400 capitalize">{session.user.role}</div>
          </div>
          
          {session.user.role === "ADMIN" && (
            <Link
              href="/admin"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Admin Dashboard
            </Link>
          )}
          
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
