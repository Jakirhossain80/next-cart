import "server-only";
import { createClient } from "next-sanity";
import {
  apiVersion as envApiVersion,
  dataset as envDataset,
  projectId as envProjectId,
} from "../env";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? envProjectId;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? envDataset;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? envApiVersion ?? "2025-10-29";

const writeToken = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "Sanity backendClient misconfigured: projectId or dataset is missing. " +
      "Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET (or ensure ../env exports them)."
  );
}

if (!writeToken) {
  // optional but nice, so webhooks fail with a clear message
  throw new Error(
    "SANITY_API_WRITE_TOKEN is not set. Create an Editor token in Sanity and add it to your env."
  );
}

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
  perspective: "published",
});


