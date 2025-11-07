import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;

type QueryParams = Record<string, unknown> | undefined;

function FallbackSanityLive() {
  return null;
}

async function fallbackFetch<T>(query: string, params?: QueryParams) {
  const data = await client.fetch<T>(query, params);
  return { data };
}

// --- Lazy/dynamic live loader (runs once) ---
type LiveHelpers = {
  SanityLive?: React.ComponentType;
  sanityFetch?: <T>(opts: { query: string; params?: QueryParams }) => Promise<{ data: T }>;
} | null;

let _livePromise: Promise<LiveHelpers> | null = null;

// Try to dynamically import next-sanity and call defineLive at runtime.
// Never throws; returns null if unavailable or misconfigured.
async function loadLive(): Promise<LiveHelpers> {
  try {
    // Dynamic import to prevent compile-time export validation
    const mod: any = await import("next-sanity").catch(() => null);
    const defineLive = mod?.defineLive;

    if (typeof defineLive === "function" && token) {
      const live = defineLive({
        client,
        serverToken: token,
        browserToken: token,
        fetchOptions: { revalidate: 0 },
      });

      if (live?.SanityLive && live?.sanityFetch) {
        return live as LiveHelpers;
      }
    }
  } catch {
    // Silently fall back
  }
  return null;
}

function getLiveOnce(): Promise<LiveHelpers> {
  if (!_livePromise) _livePromise = loadLive();
  return _livePromise;
}

// --- Exported helpers ---
// Component export must be synchronous; we expose a mutable binding
// that upgrades once live helpers resolve.
let SanityLiveComp: React.ComponentType = FallbackSanityLive;
getLiveOnce().then((live) => {
  if (live?.SanityLive) {
    SanityLiveComp = live.SanityLive!;
  }
});

async function sanityFetchImpl<T>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}): Promise<{ data: T }> {
  const live = await getLiveOnce();
  if (live?.sanityFetch) {
    return live.sanityFetch<T>({ query, params });
  }
  return fallbackFetch<T>(query, params);
}

export async function sanityFetchData<T>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}): Promise<T> {
  const result = await sanityFetchImpl<T>({ query, params });
  return result.data;
}

// Keep your existing name/shape for current callers
export const sanityFetch = sanityFetchImpl;
export const SanityLive = SanityLiveComp;
