// app/api/products/route.ts
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client"; 

// NOTE: keep API version configured in the client; avoid future dates
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const variant = searchParams.get("variant") || undefined;
    const brand = searchParams.get("brand") || undefined;
    const category = searchParams.get("category") || undefined;
    const max = Number(searchParams.get("max") || 10000);

    const query = `
      *[_type=="product"
        && (!defined($variant) || variant == $variant)
        && (!defined($brand)   || brand->slug.current == $brand)
        && (!defined($category)|| $category in categories[]->slug.current)
        && price <= $max
      ] | order(name asc){
        ...,
        "categories": categories[]->title
      }
    `;

    const data = await client.fetch(query, { variant, brand, category, max });
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Sanity products fetch error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch products" }, { status: 500 });
  }
}
