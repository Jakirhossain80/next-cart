// app/(client)/studio/page.tsx
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

// Make Studio always dynamic (no static generation / no ISR)
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
