// proxy.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

// Export Clerk's middleware as the default proxy handler
export default clerkMiddleware();

// Keep the same matchers you had before
export const config = {
  matcher: [
    // Skip Next.js internals and all static files (unless present in search params)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
