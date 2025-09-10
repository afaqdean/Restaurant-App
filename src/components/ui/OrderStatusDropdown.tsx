"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface OrderStatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  options?: Array<{ value: string; label: string }>;
}

const defaultOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "ACCEPTED", label: "Accepted" },
  { value: "IN_KITCHEN", label: "In Kitchen" },
  { value: "READY", label: "Ready" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function OrderStatusDropdown({
  value,
  onChange,
  disabled = false,
  className = "",
  style,
  options = defaultOptions,
}: OrderStatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <select
        ref={selectRef}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className={`order-status-dropdown w-full text-sm border-2 ${isOpen ? 'border-emerald-500' : 'border-gray-200'} rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white hover:border-gray-300 transition-all duration-200 appearance-none cursor-pointer backdrop-blur-sm shadow-lg hover:shadow-xl focus:shadow-xl ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        style={style}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {isOpen && mounted && createPortal(
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]" onClick={handleToggle} />
        </>,
        document.body
      )}
    </div>
  );
}
