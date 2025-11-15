// app/provider.tsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import type React from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable. Please add it to your .env.local file."
  );
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: "#000000", color: "#ffffff" },
        }}
      />
    </ClerkProvider>
  );
}
