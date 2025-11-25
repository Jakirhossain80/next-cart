import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Logs } from "lucide-react";
import { getMyOrders } from "@/sanity/queries";

const Header = async () => {
  let user: Awaited<ReturnType<typeof currentUser>> | null = null;
  let userId: string | null = null;
  let orders: Awaited<ReturnType<typeof getMyOrders>> | null = null;

  // Safely read Clerk user and auth
  try {
    user = await currentUser();
  } catch (error) {
    console.error("[Header] Error while reading Clerk currentUser:", error);
  }

  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (error) {
    console.error("[Header] Error while reading Clerk auth:", error);
  }

  // Only fetch orders if we successfully got a userId
  if (userId) {
    try {
      orders = await getMyOrders(userId);
    } catch (error) {
      console.error("[Header] Error fetching orders:", error);
    }
  }

  return (
    <header className="sticky top-0 z-50 py-5 bg-white/70 backdrop-blur-md">
      <Container className="flex items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>

        <HeaderMenu />

        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />

          {user && (
            <Link
              href={"/order"}
              className="group relative hover:text-shop_light_green hoverEffect"
            >
              <Logs />
              <span className="absolute -top-1 -right-1 bg-shop_btn_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                {orders?.length ? orders.length : 0}
              </span>
            </Link>
          )}

          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignIn />
            </SignedOut>
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
