// sanity/lib/backendClient.ts (server-only)
import "server-only";
import { createClient } from "next-sanity";
import {
  apiVersion as envApiVersion,
  dataset as envDataset,
  projectId as envProjectId,
} from "../env";

// Resolve config from public env (preferred for id/dataset), then ../env, with sensible defaults
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? envProjectId;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? envDataset;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? envApiVersion ?? "2025-10-29";

// Prefer a dedicated read token name, but fall back to your existing variable for compatibility
const token =
  process.env.SANITY_API_READ_TOKEN ?? process.env.SANITY_API_TOKEN;

// Hard guard for required basics (avoid mysterious 500s later)
if (!projectId || !dataset) {
  throw new Error(
    "Sanity backendClient misconfigured: projectId or dataset is missing. " +
      "Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET (or ensure ../env exports them)."
  );
}

// Create a non-CDN client for server-side, authenticated queries.
// - useCdn: false ensures freshest data and proper auth checks when using a token
// - perspective: 'published' avoids drafts unless you explicitly add draft support elsewhere
export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token, // Do NOT expose this on the client. 'server-only' import above helps enforce this.
  perspective: "published",
});
