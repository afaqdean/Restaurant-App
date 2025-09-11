import { signIn } from "next-auth/react";
import { AUTH_MESSAGES } from "@/constants/auth";

// Sign in utility function
export async function handleSignIn(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: AUTH_MESSAGES.INVALID_CREDENTIALS };
    }

    if (result?.ok) {
      return { success: true };
    }

    return { success: false, error: AUTH_MESSAGES.GENERIC_ERROR };
  } catch (error) {
    return { success: false, error: AUTH_MESSAGES.GENERIC_ERROR };
  }
}

// Sign up utility function
export async function handleSignUp(formData: {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || AUTH_MESSAGES.REGISTRATION_FAILED,
      };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: AUTH_MESSAGES.GENERIC_ERROR };
  }
}

// Form validation utilities
export function validatePasswordsMatch(
  password: string,
  confirmPassword: string
): string | null {
  if (password !== confirmPassword) {
    return AUTH_MESSAGES.PASSWORDS_DONT_MATCH;
  }
  return null;
}

// URL utilities
export function buildCallbackUrl(callbackUrl: string | null): string {
  return callbackUrl || "/";
}

export function buildSignInUrl(callbackUrl: string, message?: string): string {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);
  if (message) {
    params.set("message", message);
  }
  return `/auth/signin?${params.toString()}`;
}
