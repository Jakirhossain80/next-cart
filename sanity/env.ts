// sanity/env.ts

// API version: lock to a specific date (or use env override)
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-29";

// These are NOT secrets, so we can safely use hardcoded fallbacks
const fallbackProjectId = "n0bva0w8"; // your real project ID
const fallbackDataset = "production";  // your real dataset

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || fallbackProjectId;

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || fallbackDataset;

// Helpful warning if env vars are missing in Vercel/local
if (
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_SANITY_DATASET
) {
  // This will appear in server logs but won't crash the app
  console.warn(
    "[sanity/env] NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is missing. " +
      "Using fallback values (projectId=n0bva0w8, dataset=production). " +
      "Please double-check your environment variables in Vercel."
  );
}
