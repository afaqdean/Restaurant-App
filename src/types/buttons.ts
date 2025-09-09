import { ButtonHTMLAttributes, ReactNode } from "react";

// Base button props that extend HTML button attributes
export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

// Primary Button Types
export interface PrimaryButtonProps extends BaseButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  variant?: "gradient" | "solid";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

// Secondary Button Types
export interface SecondaryButtonProps extends BaseButtonProps {
  variant?: "outline" | "ghost" | "gray";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

// Cart Action Button Types
export interface CartActionButtonProps extends BaseButtonProps {
  action?: "add" | "remove" | "edit" | "custom";
  isLoading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  variant?: "text" | "icon-text" | "destructive";
  size?: "sm" | "md";
}

// Navigation Button Types
export interface NavigationButtonProps extends BaseButtonProps {
  direction: "prev" | "next";
  variant?: "carousel" | "dots";
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
  label?: string;
}

// Filter Button Types
export interface FilterButtonProps extends BaseButtonProps {
  isActive?: boolean;
  variant?: "category" | "toggle";
  size?: "sm" | "md";
}

// Quantity Button Types
export interface QuantityButtonProps extends Omit<BaseButtonProps, "type"> {
  type: "increment" | "decrement";
  isLoading?: boolean;
  size?: "sm" | "md";
}

// Button Size Types
export type ButtonSize = "sm" | "md" | "lg";

// Button Variant Types
export type PrimaryButtonVariant = "gradient" | "solid";
export type SecondaryButtonVariant = "outline" | "ghost" | "gray";
export type CartActionButtonVariant = "text" | "icon-text" | "destructive";
export type NavigationButtonVariant = "carousel" | "dots";
export type FilterButtonVariant = "category" | "toggle";

// Icon Position Types
export type IconPosition = "left" | "right";

// Cart Action Types
export type CartAction = "add" | "remove" | "edit" | "custom";

// Navigation Direction Types
export type NavigationDirection = "prev" | "next";

// Quantity Button Type
export type QuantityButtonType = "increment" | "decrement";
