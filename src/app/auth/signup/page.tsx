"use client";

import { AuthLayout, SignUpForm } from "@/components/auth";
import { PAGE_CONTENT } from "@/constants";

export default function SignUpPage() {
  return (
    <AuthLayout
      title={PAGE_CONTENT.SIGN_UP.TITLE}
      subtitle={PAGE_CONTENT.SIGN_UP.SUBTITLE}
    >
      <SignUpForm />
    </AuthLayout>
  );
}
