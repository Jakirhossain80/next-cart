// proxy.ts (root)
// NextCart — Clerk proxy with public-route allowlist
// Uses Clerk's current API: auth.protect()

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public routes (no auth required). Adjust as needed.
const isPublicRoute = createRouteMatcher([
  "/",
  "/deal(.*)",
  "/blog(.*)",
  "/brand(.*)",
  "/category(.*)",
  "/product(.*)",
  "/studio(.*)",        // Sanity Studio (make private if desired)
  "/api/webhook(.*)",   // Stripe webhook must remain public
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sso-callback(.*)",
  // Common assets/icons
  "/favicon.ico",
  "/icon.png",
  "/apple-touch-icon.png",
]);

export default clerkMiddleware((auth, req) => {
  // Allow all public routes through
  if (isPublicRoute(req)) return;
  // Protect everything else
  return auth.protect();
});

// Keep your robust matchers (skip Next internals & static assets; always run for API/TRPC)
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
