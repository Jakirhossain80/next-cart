// proxy.ts (root)
// NextCart — Clerk proxy with public-route allowlist
// - Keeps your robust matchers
// - Adds /shop as public to avoid accidental protection/redirect loops
// - Uses auth.protect() (current Clerk API)
// - Defensive try/catch to avoid noisy crashes during local dev

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public routes (no auth required). Adjust as needed.
const isPublicRoute = createRouteMatcher([
  "/",
  "/shop(.*)",          // ← Shop is public
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
  try {
    // Allow all public routes through
    if (isPublicRoute(req)) return;
    // Protect everything else
    return auth.protect();
  } catch {
    // In dev, never break the entire request pipeline due to middleware issues
    return;
  }
});

// Keep your robust matchers (skip Next internals & static assets; always run for API/TRPC)
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
