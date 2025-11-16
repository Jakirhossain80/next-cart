// proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * PUBLIC ROUTES
 * These routes do NOT require authentication.
 * Anything not in this list will require login.
 */
const isPublicRoute = createRouteMatcher([
  "/",                    // Home page MUST be public to avoid 401
  "/shop(.*)",
  "/deal(.*)",
  "/blog(.*)",
  "/brand(.*)",
  "/category(.*)",
  "/product(.*)",

  // Optional: Sanity Studio (make private later if needed)
  "/studio(.*)",

  // Stripe Webhook — must ALWAYS stay public
  "/api/webhook(.*)",

  // Clerk’s own auth pages
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sso-callback(.*)",

  // Static assets
  "/favicon.ico",
  "/icon.png",
  "/apple-touch-icon.png",
]);

export default clerkMiddleware((auth, req) => {
  try {
    // Allow all defined public routes
    if (isPublicRoute(req)) return;

    // Everything else requires authentication
    return auth.protect();
  } catch (err) {
    console.error("Middleware error:", err);
    // Fail gracefully — never break the request pipeline
    return;
  }
});

/**
 * MATCHER CONFIG
 * Ensures Clerk runs for all routes except Next internals & static files.
 */
export const config = {
  matcher: [
    // Run middleware for all non-static routes
    "/((?!_next|.*\\..*).*)",

    // Always run for API routes including webhook
    "/(api|trpc)(.*)",
  ],
};
