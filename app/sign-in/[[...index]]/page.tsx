// app/sign-in/[[...index]]/page.tsx
"use client";

import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      {/* When the user is already signed in, we simply don't render the SignIn form.
          Clerk will handle any redirects based on your Clerk dashboard config. */}
      <SignedIn>
        {/* Optionally, you could show a small message or nothing here */}
      </SignedIn>

      {/* Only render the Clerk SignIn component when the user is signed out */}
      <SignedOut>
        <SignIn afterSignInUrl="/" redirectUrl="/" />
      </SignedOut>
    </>
  );
}
