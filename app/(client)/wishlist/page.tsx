import WishListProducts from "@/components/WishListProducts";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const WishListPage = async () => {
  let userId: string | null = null;

  try {
    const { userId: uid } = await auth();
    userId = uid ?? null;
  } catch (error) {
    console.error("[WishListPage] Error reading Clerk auth:", error);
    userId = null;
  }

  // If the user is not signed in (or auth failed), redirect to /sign-in
  if (!userId) {
    redirect(`/sign-in?redirect_url=/wishlist`);
  }

  // If we reach here, the user is authenticated – render wishlist products.
  return <WishListProducts />;
};

export default WishListPage;
