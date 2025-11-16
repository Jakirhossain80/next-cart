// app/(client)/wishlist/page.tsx (or your actual path)

import WishListProducts from "@/components/WishListProducts";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const WishListPage = async () => {
  const { userId } = auth();

  // If the user is not signed in, redirect to your local /sign-in page
  // with a redirect_url back to /wishlist after successful login.
  if (!userId) {
    redirect(`/sign-in?redirect_url=/wishlist`);
  }

  // If we reach here, the user is authenticated – render wishlist products.
  return <WishListProducts />;
};

export default WishListPage;
