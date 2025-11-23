// sanity/lib/live.ts
import "server-only";
import { createClient } from "next-sanity";
import {
  apiVersion as envApiVersion,
  dataset as envDataset,
  projectId as envProjectId,
} from "../env";

type SanityFetchArgs = {
  query: string;
  params?: Record<string, unknown>;
};

// Prefer NEXT_PUBLIC_* environment variables at runtime
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? envProjectId;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? envDataset;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? envApiVersion ?? "2023-10-16";

// Basic guard so we fail with a clear error if misconfigured
if (!projectId || !dataset) {
  throw new Error(
    "sanity/lib/live.ts: Missing projectId or dataset. " +
      "Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET or update env.ts."
  );
}

// Plain read-only client, no fancy live/preview for now
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // cached, fast, OK for public reads
});

// Simple helper with same signature used by your queries
export async function sanityFetch<T = unknown>({
  query,
  params = {},
}: SanityFetchArgs): Promise<{ data: T }> {
  try {
    const data = await client.fetch<T>(query, params);
    return { data };
  } catch (error) {
    console.error("[sanityFetch] Error querying Sanity:", error);
    throw error;
  }
}

// Optional: if you ever want to re-add <SanityLive />, you can export a stub
// for now to avoid import errors:
//
// export function SanityLive() {
//   return null;
// }
