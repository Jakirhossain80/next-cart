"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ClerkProvider>
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
