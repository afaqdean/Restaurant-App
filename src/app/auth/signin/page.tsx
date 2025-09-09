"use client";

import { Suspense } from "react";
import { AuthLayout, SignInForm } from "@/components/auth";
import { PAGE_CONTENT } from "@/constants";

export default function SignInPage() {
  return (
    <AuthLayout
      title={PAGE_CONTENT.SIGN_IN.TITLE}
      subtitle={PAGE_CONTENT.SIGN_IN.SUBTITLE}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <SignInForm />
      </Suspense>
    </AuthLayout>
  );
} 
