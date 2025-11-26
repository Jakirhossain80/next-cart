// app/api/search-products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/sanity/queries";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchProducts(q);
    return NextResponse.json({ results });
  } catch (error) {
    console.error("[api/search-products] Error:", error);
    return NextResponse.json(
      { results: [], error: "Search failed" },
      { status: 500 }
    );
  }
}
