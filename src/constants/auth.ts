// Authentication form validation messages
export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  PASSWORDS_DONT_MATCH: "Passwords do not match",
  REGISTRATION_FAILED: "Registration failed",
  GENERIC_ERROR: "An error occurred. Please try again.",
  SIGNING_IN: "Signing in...",
  CREATING_ACCOUNT: "Creating account...",
} as const;

// Form field labels
export const FORM_LABELS = {
  EMAIL: "Email address",
  PASSWORD: "Password",
  CONFIRM_PASSWORD: "Confirm Password",
  FULL_NAME: "Full Name",
  PHONE: "Phone Number",
  ADDRESS: "Address",
} as const;

// Form placeholders
export const FORM_PLACEHOLDERS = {
  EMAIL: "Enter your email",
  PASSWORD: "Enter your password",
  CONFIRM_PASSWORD: "Confirm your password",
  FULL_NAME: "Enter your full name",
  PHONE: "Enter your phone number",
  ADDRESS: "Enter your address",
} as const;

// Page titles and subtitles
export const PAGE_CONTENT = {
  SIGN_IN: {
    TITLE: "Welcome back",
    SUBTITLE: "Sign in to your account to continue your culinary journey",
  },
  SIGN_UP: {
    TITLE: "Join our community",
    SUBTITLE: "Create your account and start your culinary adventure",
  },
} as const;

// Navigation links
export const AUTH_LINKS = {
  SIGN_UP: "/auth/signup",
  SIGN_IN: "/auth/signin",
  HOME: "/",
} as const;
