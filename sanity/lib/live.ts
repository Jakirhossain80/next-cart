import * as nextSanity from "next-sanity";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;

type QueryParams = Record<string, unknown> | undefined;

// --- Default (safe) fallback: no streaming/live, just fetch ---
function FallbackSanityLive() {
  return null;
}

async function fallbackFetch<T>(query: string, params?: QueryParams) {
  const data = await client.fetch<T>(query, params);
  return { data }; // match shape from next-sanity live helpers
}

// We export these names consistently, swapping to the live versions if possible.
let SanityLive: typeof FallbackSanityLive = FallbackSanityLive;
let sanityFetch: <T>(opts: { query: string; params?: QueryParams }) => Promise<{ data: T }> = async <T>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}) => fallbackFetch<T>(query, params);

// --- Try to enable real Live Content API when available ---
const defineLive = (nextSanity as unknown as { defineLive?: Function }).defineLive;

if (typeof defineLive === "function" && token) {
  try {
    const live = defineLive({
      client,
      serverToken: token,
      browserToken: token,
      // Keep content fresh in dev; adjust as needed for your caching model
      fetchOptions: { revalidate: 0 },
    });

    // If defineLive succeeded, use the real helpers
    if (live?.SanityLive && live?.sanityFetch) {
      SanityLive = live.SanityLive;
      sanityFetch = live.sanityFetch;
    }
  } catch {
    // Swallow and keep fallback if anything goes wrong (older package, etc.)
    // You can console.warn here if you want visibility:
    // console.warn("[sanity/lib/live] Falling back to non-live fetch.");
  }
} /* else: keep fallback (no defineLive or missing token) */

export { SanityLive, sanityFetch };
