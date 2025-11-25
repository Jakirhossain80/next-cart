// app/api/address/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    console.log("DEBUG /api/address userId:", userId);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, email, address, city, state, zip, makeDefault } = body;

    if (!name || !email || !address || !city || !state || !zip) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // If user wants this as default, unset previous defaults for this user (optional but useful)
    if (makeDefault) {
      await backendClient
        .patch({
          query:
            '*[_type == "address" && clerkUserId == $userId && default == true]',
          params: { userId },
        })
        .set({ default: false })
        .commit({ autoGenerateArrayKeys: true })
        .catch(() => {});
    }

    const newAddress = await backendClient.create({
      _type: "address",
      clerkUserId: userId,
      name,
      email,
      address,
      city,
      state,
      zip,
      default: makeDefault ?? false,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(newAddress, { status: 201 });
  } catch (error) {
    console.error("Error creating address:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
