import WishListProducts from "@/components/WishListProducts";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const WishListPage = async () => {
  let userId: string | null = null;

  // Safely read Clerk auth
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (error) {
    console.error("[WishListPage] Error reading Clerk auth:", error);
  }

  if (!userId) {
    redirect(`/sign-in?redirect_url=/wishlist`);
  }

  // If we reach here, the user is authenticated – render wishlist products.
  return <WishListProducts />;
};

export default WishListPage;
