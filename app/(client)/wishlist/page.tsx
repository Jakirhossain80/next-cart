import WishListProducts from "@/components/WishListProducts";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const WishListPage = async () => {
  const { userId } = await auth();

  // If the user is not signed in, redirect to your local /sign-in page
  // with a redirect_url back to /wishlist after successful login.
  if (!userId) {
    redirect(`/sign-in?redirect_url=/wishlist`);
  }

  // If we reach here, the user is authenticated – render wishlist products.
  return <WishListProducts />;
};

export default WishListPage;
