// sanity/env.ts
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-10-16";

const fallbackProjectId = "n0bva0w8";
const fallbackDataset = "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || fallbackProjectId;

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || fallbackDataset;

if (
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_SANITY_DATASET
) {
  console.warn("[sanity/env] NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is missing...");
}
