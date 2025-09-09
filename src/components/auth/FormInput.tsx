"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FormInputProps } from "@/types";

export function FormInput({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  showPasswordToggle = false,
  optional = false,
  className = "",
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
        {optional && <span className="text-slate-400 font-normal"> (optional)</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          autoComplete={autoComplete}
          required={required}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors placeholder-slate-400 text-slate-900 pr-12"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
