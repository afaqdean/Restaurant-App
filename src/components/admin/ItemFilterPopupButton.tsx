"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Filter, X, ChevronDown, Search } from "lucide-react";

interface ItemFilterPopupButtonProps {
  categoryFilter: string;
  searchFilter: string;
  onCategoryFilterChange: (category: string) => void;
  onSearchFilterChange: (search: string) => void;
  onClearFilters: () => void;
  categories: Array<{ id: string; name: string }>;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ItemFilterPopupButton({
  categoryFilter,
  searchFilter,
  onCategoryFilterChange,
  onSearchFilterChange,
  onClearFilters,
  categories,
  variant = "primary",
  size = "md",
  className = "",
}: ItemFilterPopupButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const hasActiveFilters = categoryFilter || searchFilter;

  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-transparent hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm hover:shadow-md"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClearFilters = () => {
    onClearFilters();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        onClick={handleToggle}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="h-4 w-4" />
            {hasActiveFilters && (
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            )}
          </div>
          <span>Filter</span>
          {hasActiveFilters && (
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium min-w-[20px] text-center">
              {[categoryFilter, searchFilter].filter(Boolean).length}
            </span>
          )}
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && mounted && createPortal(
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]" onClick={handleToggle} />
          
          {/* Dropdown */}
          <div 
            ref={dropdownRef}
            className="fixed w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-[9999] transform transition-all duration-200 ease-out"
            style={{ 
              top: '120px',
              right: '20px'
            }}
          >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-900">Filter Items</h3>
                </div>
                <button
                  onClick={handleToggle}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="space-y-4">
                  {/* Search Filter */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Search Items
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search by item name..."
                        value={searchFilter}
                        onChange={(e) => onSearchFilterChange(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Category
                    </label>
                    <div className="grid grid-cols-1 gap-1.5">
                      <button
                        onClick={() => onCategoryFilterChange("")}
                        className={`px-3 py-2 text-xs rounded-md transition-all duration-150 font-medium text-left ${
                          categoryFilter === ""
                            ? "bg-emerald-500 text-white shadow-sm"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => onCategoryFilterChange(category.id)}
                          className={`px-3 py-2 text-xs rounded-md transition-all duration-150 font-medium text-left ${
                            categoryFilter === category.id
                              ? "bg-emerald-500 text-white shadow-sm"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-center mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-1.5 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
        </>,
        document.body
      )}
    </div>
  );
}
