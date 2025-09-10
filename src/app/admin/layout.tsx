"use client";

import { useState } from "react";
import { AdminDrawer, AdminTopBar } from "@/components/ui/AdminDrawer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminDrawer 
        isOpen={isDrawerOpen} 
        onToggle={toggleDrawer}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />
      <AdminTopBar onToggle={toggleDrawer} />
      
      {/* Main content area */}
      <div className={`transition-all duration-300 ease-in-out ${
        isCollapsed ? "lg:ml-20" : "lg:ml-80"
      }`}>
        <main className="pb-8">{children}</main>
      </div>
    </div>
  );
}

