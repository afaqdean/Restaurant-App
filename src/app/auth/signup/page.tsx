"use client";

import { Suspense } from "react";
import { AuthLayout, SignUpForm } from "@/components/auth";
import { PAGE_CONTENT } from "@/constants";

export default function SignUpPage() {
  return (
    <AuthLayout
      title={PAGE_CONTENT.SIGN_UP.TITLE}
      subtitle={PAGE_CONTENT.SIGN_UP.SUBTITLE}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpForm />
      </Suspense>
    </AuthLayout>
  );
}
