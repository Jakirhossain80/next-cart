import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Prefer the shared client if present (stable across app)
import { client } from "./client";

// Fallback to explicit env values (preserves your original behavior)
import { dataset, projectId } from "../env";

// Build from client when possible; otherwise from projectId/dataset
const builder =
  // `client` comes from sanity/lib/client and is safe to use on server/browser
  client
    ? imageUrlBuilder(client)
    : imageUrlBuilder({ projectId, dataset });


export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
