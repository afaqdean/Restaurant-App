"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormInput } from "./FormInput";
import { AuthButton } from "./AuthButton";
import { ErrorMessage } from "./ErrorMessage";
import { AuthFormLink } from "./AuthFormLink";
import { useAuthForm } from "@/hooks/useAuthForm";
import { SignUpFormData } from "@/types";
import { handleSignUp, validatePasswordsMatch, buildSignInUrl } from "@/utils";
import { FORM_LABELS, FORM_PLACEHOLDERS, AUTH_MESSAGES, AUTH_LINKS } from "@/constants/auth";

export function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const { values, isLoading, error, handleChange, handleSubmit, setError } = useAuthForm<SignUpFormData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    },
    onSubmit: async (formData) => {
      const result = await handleSignUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
      });

      if (result.success) {
        const signInUrl = buildSignInUrl(callbackUrl, "Registration successful! Please sign in.");
        router.push(signInUrl);
      } else {
        setError(result.error || AUTH_MESSAGES.GENERIC_ERROR);
      }
    },
    validate: (formData) => validatePasswordsMatch(formData.password, formData.confirmPassword),
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <FormInput
          id="name"
          name="name"
          type="text"
          label={FORM_LABELS.FULL_NAME}
          placeholder={FORM_PLACEHOLDERS.FULL_NAME}
          value={values.name}
          onChange={handleChange}
          required
        />
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
          id="phone"
          name="phone"
          type="tel"
          label={FORM_LABELS.PHONE}
          placeholder={FORM_PLACEHOLDERS.PHONE}
          value={values.phone}
          onChange={handleChange}
          optional
        />
        <FormInput
          id="address"
          name="address"
          type="text"
          label={FORM_LABELS.ADDRESS}
          placeholder={FORM_PLACEHOLDERS.ADDRESS}
          value={values.address}
          onChange={handleChange}
          optional
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
          autoComplete="new-password"
          showPasswordToggle
        />
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label={FORM_LABELS.CONFIRM_PASSWORD}
          placeholder={FORM_PLACEHOLDERS.CONFIRM_PASSWORD}
          value={values.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
          showPasswordToggle
        />
      </div>

      <ErrorMessage message={error} />

      <AuthButton
        type="submit"
        isLoading={isLoading}
        loadingText={AUTH_MESSAGES.CREATING_ACCOUNT}
      >
        Create Account
      </AuthButton>

      {/* Sign In Link */}
      <div className="mt-6 text-center">
        <p className="text-slate-600">
          Already have an account?{" "}
          <AuthFormLink href={AUTH_LINKS.SIGN_IN}>
            Sign in here
          </AuthFormLink>
        </p>
      </div>
    </form>
  );
}
