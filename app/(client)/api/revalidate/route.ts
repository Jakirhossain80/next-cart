// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1) Verify secret
    const secret = req.nextUrl.searchParams.get("secret");
    if (!secret || secret !== SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // 2) Basic payload checks
    const docType = body?._type;
    const slug = body?.slug?.current;

    // Revalidate for products
    if (docType === "product") {
      // Option A: revalidate the product page directly
      if (slug) {
        await revalidatePath(`/product/${slug}`);
      }

      // Option B (recommended): revalidate all queries tagged with "product"
      await revalidateTag("product");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("[revalidate] error:", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
