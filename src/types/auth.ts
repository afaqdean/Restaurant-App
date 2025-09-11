// Authentication form data types
export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
}

// Component prop types
export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showBackToHome?: boolean;
}

export interface FormInputProps {
  id: string;
  name: string;
  type?: "text" | "email" | "password" | "tel";
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  showPasswordToggle?: boolean;
  optional?: boolean;
  className?: string;
}

export interface AuthButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
}

export interface ErrorMessageProps {
  message: string;
  className?: string;
}

export interface AuthFormLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

// Hook types
export interface UseAuthFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  validate?: (values: T) => string | null;
}
