"use client";

import { AuthLayout, SignInForm } from "@/components/auth";
import { PAGE_CONTENT } from "@/constants";

export default function SignInPage() {
  return (
    <AuthLayout
      title={PAGE_CONTENT.SIGN_IN.TITLE}
      subtitle={PAGE_CONTENT.SIGN_IN.SUBTITLE}
    >
      <SignInForm />
    </AuthLayout>
  );
} 
