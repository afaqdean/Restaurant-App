"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormInput } from "./FormInput";
import { AuthButton } from "./AuthButton";
import { ErrorMessage } from "./ErrorMessage";
import { AuthFormLink } from "./AuthFormLink";
import { useAuthForm } from "@/hooks/useAuthForm";
import { SignInFormData } from "@/types";
import { handleSignIn } from "@/utils";
import { FORM_LABELS, FORM_PLACEHOLDERS, AUTH_MESSAGES, AUTH_LINKS } from "@/constants/auth";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const { values, isLoading, error, handleChange, handleSubmit, setError } = useAuthForm<SignInFormData>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (formData) => {
      const result = await handleSignIn(formData.email, formData.password);
      
      if (result.success) {
        router.push(callbackUrl);
      } else {
        setError(result.error || AUTH_MESSAGES.GENERIC_ERROR);
      }
    },
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <FormInput
          id="email"
          name="email"
          type="email"
          label={FORM_LABELS.EMAIL}
          placeholder={FORM_PLACEHOLDERS.EMAIL}
          value={values.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          label={FORM_LABELS.PASSWORD}
          placeholder={FORM_PLACEHOLDERS.PASSWORD}
          value={values.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          showPasswordToggle
        />
      </div>

      <ErrorMessage message={error} />

      <AuthButton
        type="submit"
        isLoading={isLoading}
        loadingText={AUTH_MESSAGES.SIGNING_IN}
      >
        Sign in
      </AuthButton>

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-slate-600">
          Don&apos;t have an account?{" "}
          <AuthFormLink href={AUTH_LINKS.SIGN_UP}>
            Create one now
          </AuthFormLink>
        </p>
      </div>
    </form>
  );
}
