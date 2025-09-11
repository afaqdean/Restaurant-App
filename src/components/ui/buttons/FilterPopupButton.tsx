"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Filter, X, ChevronDown } from "lucide-react";
import { FilterPopupButtonProps } from "@/types/buttons";

export function FilterPopupButton({
  statusFilter,
  paymentMethodFilter,
  paymentStatusFilter,
  onStatusFilterChange,
  onPaymentMethodFilterChange,
  onPaymentStatusFilterChange,
  onClearFilters,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: FilterPopupButtonProps) {
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

  const hasActiveFilters = statusFilter || paymentMethodFilter || paymentStatusFilter;

  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden";
  
  const variantClasses = {
    primary: "bg-white text-gray-700 border border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 shadow-sm hover:shadow-md",
    secondary: "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-800 shadow-sm hover:shadow-md"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl"
  };

  const handleStatusChange = (status: string) => {
    onStatusFilterChange(status);
  };

  const handlePaymentMethodChange = (method: string) => {
    onPaymentMethodFilterChange(method);
  };

  const handleClearFilters = () => {
    onClearFilters();
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        onClick={handleToggle}
        {...props}
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
              {[statusFilter, paymentMethodFilter, paymentStatusFilter].filter(Boolean).length}
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
                  <h3 className="text-sm font-semibold text-gray-900">Filter Orders</h3>
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
                  {/* Status Filter */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Order Status
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { value: "", label: "All" },
                        { value: "PENDING", label: "Pending" },
                        { value: "ACCEPTED", label: "Accepted" },
                        { value: "IN_KITCHEN", label: "Kitchen" },
                        { value: "READY", label: "Ready" },
                        { value: "COMPLETED", label: "Done" },
                        { value: "CANCELLED", label: "Cancelled" }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleStatusChange(option.value)}
                          className={`px-2 py-1.5 text-xs rounded-md transition-all duration-150 font-medium ${
                            statusFilter === option.value
                              ? "bg-emerald-500 text-white shadow-sm"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Method Filter */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { value: "", label: "All" },
                        { value: "CARD", label: "Card" },
                        { value: "COD", label: "COD" }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handlePaymentMethodChange(option.value)}
                          className={`px-2 py-1.5 text-xs rounded-md transition-all duration-150 font-medium ${
                            paymentMethodFilter === option.value
                              ? "bg-emerald-500 text-white shadow-sm"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Status Filter */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Payment Status
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { value: "", label: "All" },
                        { value: "PAID", label: "Paid" },
                        { value: "UNPAID", label: "Unpaid" }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => onPaymentStatusFilterChange(option.value)}
                          className={`px-2 py-1.5 text-xs rounded-md transition-all duration-150 font-medium ${
                            paymentStatusFilter === option.value
                              ? "bg-emerald-500 text-white shadow-sm"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {option.label}
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
