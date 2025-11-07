// app/api/products/route.ts
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

// Always resolve on the server (no static caching of this endpoint)
export const dynamic = "force-dynamic";

// NOTE: Keep the API version configured in the Sanity client; avoid future dates.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Filters (all optional)
    const variant = searchParams.get("variant") || undefined;   // e.g., "gadget"
    const brand = searchParams.get("brand") || undefined;       // brand slug
    const category = searchParams.get("category") || undefined; // category slug

    // Price range (defaults)
    let min = Number(searchParams.get("min") ?? "0");
    let max = Number(searchParams.get("max") ?? "10000");
    if (!Number.isFinite(min)) min = 0;
    if (!Number.isFinite(max)) max = 10000;

    const query = /* groq */ `
      *[_type == "product"
        && (!defined($variant) || lower(variant) == lower($variant))
        && (!defined($brand)   || brand->slug.current == $brand)
        && (!defined($category)|| $category in categories[]->slug.current)
        && price >= $min && price <= $max
      ] | order(name asc){
        ...,
        "categories": categories[]->title
      }
    `;

    const data = await client.fetch(query, {
      variant,
      brand,
      category,
      min,
      max,
    });

    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (err) {
    console.error("Sanity products fetch error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
