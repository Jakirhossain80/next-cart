// proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * PUBLIC ROUTES
 * These routes do NOT require authentication.
 */
const isPublicRoute = createRouteMatcher([
  "/", // Home
  "/shop(.*)",
  "/deal(.*)",
  "/blog(.*)",
  "/brand(.*)",
  "/category(.*)",
  "/product(.*)",

  // Sanity Studio (optional, can be made protected later)
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

export default clerkMiddleware(async (auth, request) => {
  try {
    // Public routes: just continue the request chain
    if (isPublicRoute(request)) {
      return NextResponse.next();
    }

    // Protected routes: require authentication
    await auth.protect();

    // If protect() passes, continue
    return NextResponse.next();
  } catch (err) {
    console.error("[Middleware] error:", err);

    // Fail gracefully – never crash the Web Handler
    return NextResponse.next();
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
