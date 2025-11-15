// sanity/lib/client.ts (or your existing path)
import { createClient } from "next-sanity";
import {
  apiVersion as envApiVersion,
  dataset as envDataset,
  projectId as envProjectId,
} from "../env";

// Prefer NEXT_PUBLIC_* at runtime, fall back to values from ../env
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? envProjectId;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? envDataset;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? envApiVersion ?? "2025-10-29";

// Helpful guard in case required vars are missing in production
if (!projectId || !dataset) {
  throw new Error(
    "Sanity client misconfigured: projectId or dataset is missing. " +
      "Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET (or ensure ../env exports them)."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // use CDN for faster, cached responses (safe for public reads)
});
