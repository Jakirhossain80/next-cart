"use client";

import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import PriceFormatter from "@/components/PriceFormatter";
import ProductSideMenu from "@/components/ProductSideMenu";
import QuantityButtons from "@/components/QuantityButtons";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const [loading, setLoading] = useState(false); // checkout loading
  const groupedItems = useStore((state) => state.getGroupedItems());

  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressesLoading, setAddressesLoading] = useState(false);

  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: user?.fullName ?? "",
    email: user?.emailAddresses[0]?.emailAddress ?? "",
    address: "",
    city: "",
    state: "",
    zip: "",
    makeDefault: true,
  });

  // Redirect unauthenticated users to local /sign-in (prevents Clerk CORS issues)
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in?redirect_url=/cart");
    }
  }, [isLoaded, isSignedIn, router]);

  const fetchAddresses = async () => {
    if (!user?.id) return;

    setAddressesLoading(true);
    try {
      // Only fetch addresses for the current Clerk user
      const query =
        '*[_type == "address" && clerkUserId == $userId] | order(createdAt desc)';
      const data: Address[] = await client.fetch(query, { userId: user.id });

      setAddresses(data);
      const defaultAddress = data.find((addr) => addr.default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        // Optional: select first address if no default
        setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.log("Addresses fetching error:", error);
    } finally {
      setAddressesLoading(false);
    }
  };

  // Fetch addresses once auth + user are ready
  useEffect(() => {
    if (isLoaded && isSignedIn && user?.id) {
      fetchAddresses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn, user]);

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id,
        address: selectedAddress,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  // While auth is loading or user is being redirected, avoid flashing content
  if (!isLoaded || !isSignedIn) {
    return <div className="bg-gray-50 pb-52 md:pb-10" />;
  }

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      <Container>
        {groupedItems?.length ? (
          <>
            <div className="flex items-center gap-2 py-5">
              <ShoppingBag className="text-darkColor" />
              <Title>Shopping Cart</Title>
            </div>
            <div className="grid lg:grid-cols-3 md:gap-8">
              <div className="lg:col-span-2 rounded-lg">
                <div className="border bg-white rounded-md">
                  {groupedItems?.map(({ product }) => {
                    const itemCount = getItemCount(product?._id);
                    return (
                      <div
                        key={product?._id}
                        className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                      >
                        <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                          {product?.images && (
                            <Link
                              href={`/product/${product?.slug?.current}`}
                              className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                            >
                              <Image
                                src={urlFor(product?.images[0]).url()}
                                alt="productImage"
                                width={500}
                                height={500}
                                loading="lazy"
                                className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                              />
                            </Link>
                          )}
                          <div className="h-full flex flex-1 flex-col justify-between py-1">
                            <div className="flex flex-col gap-0.5 md:gap-1.5">
                              <h2 className="text-base font-semibold line-clamp-1">
                                {product?.name}
                              </h2>
                              <p className="text-sm capitalize">
                                Variant:{" "}
                                <span className="font-semibold">
                                  {product?.variant}
                                </span>
                              </p>
                              <p className="text-sm capitalize">
                                Status:{" "}
                                <span className="font-semibold">
                                  {product?.status}
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <ProductSideMenu
                                      product={product}
                                      className="relative top-0 right-0"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold">
                                    Add to Favorite
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Trash
                                      onClick={() => {
                                        deleteCartProduct(product?._id);
                                        toast.success(
                                          "Product deleted successfully!"
                                        );
                                      }}
                                      className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold bg-red-600">
                                    Delete product
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                          <PriceFormatter
                            amount={(product?.price as number) * itemCount}
                            className="font-bold text-lg"
                          />
                          <QuantityButtons product={product} />
                        </div>
                      </div>
                    );
                  })}
                  <Button
                    onClick={handleResetCart}
                    className="m-5 font-semibold"
                    variant="destructive"
                  >
                    Reset Cart
                  </Button>
                </div>
              </div>

              <div>
                <div className="lg:col-span-1">
                  {/* Desktop order summary */}
                  <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button
                        className="w-full rounded-full font-semibold tracking-wide hoverEffect"
                        size="lg"
                        disabled={loading}
                        onClick={handleCheckout}
                      >
                        {loading ? "Please wait..." : "Proceed to Checkout"}
                      </Button>
                    </div>
                  </div>

                  {/* Delivery addresses */}
                  {addresses && (
                    <div className="bg-white rounded-md mt-5">
                      <Card>
                        <CardHeader>
                          <CardTitle>Delivery Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <RadioGroup
                            defaultValue={addresses
                              ?.find((addr) => addr.default)
                              ?._id.toString()}
                          >
                            {addresses?.map((address) => (
                              <div
                                key={address?._id}
                                onClick={() => setSelectedAddress(address)}
                                className={`flex items-center space-x-2 mb-4 cursor-pointer ${
                                  selectedAddress?._id === address?._id &&
                                  "text-shop_dark_green"
                                }`}
                              >
                                <RadioGroupItem
                                  value={address?._id.toString()}
                                />
                                <Label
                                  htmlFor={`address-${address?._id}`}
                                  className="grid gap-1.5 flex-1"
                                >
                                  <span className="font-semibold">
                                    {address?.name}
                                  </span>
                                  <span className="text-sm text-black/60">
                                    {address.address}, {address.city},{" "}
                                    {address.state} {address.zip}
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>

                          <Button
                            variant="outline"
                            className="w-full mt-4"
                            onClick={() => setIsAddressDialogOpen(true)}
                          >
                            Add New Address
                          </Button>

                          {/* Inline "dialog" for adding a new address */}
                          {isAddressDialogOpen && (
                            <div className="mt-4 border rounded-md p-4 bg-gray-50 space-y-3">
                              <h3 className="font-semibold text-sm md:text-base">
                                Add New Delivery Address
                              </h3>
                              <div className="grid gap-3">
                                <input
                                  className="border rounded px-2 py-1 text-sm"
                                  placeholder="Full Name"
                                  value={addressForm.name}
                                  onChange={(e) =>
                                    setAddressForm((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                />
                                <input
                                  className="border rounded px-2 py-1 text-sm"
                                  placeholder="Email"
                                  type="email"
                                  value={addressForm.email}
                                  onChange={(e) =>
                                    setAddressForm((prev) => ({
                                      ...prev,
                                      email: e.target.value,
                                    }))
                                  }
                                />
                                <input
                                  className="border rounded px-2 py-1 text-sm"
                                  placeholder="Street Address"
                                  value={addressForm.address}
                                  onChange={(e) =>
                                    setAddressForm((prev) => ({
                                      ...prev,
                                      address: e.target.value,
                                    }))
                                  }
                                />
                                <div className="grid grid-cols-3 gap-2">
                                  <input
                                    className="border rounded px-2 py-1 text-sm"
                                    placeholder="City"
                                    value={addressForm.city}
                                    onChange={(e) =>
                                      setAddressForm((prev) => ({
                                        ...prev,
                                        city: e.target.value,
                                      }))
                                    }
                                  />
                                  <input
                                    className="border rounded px-2 py-1 text-sm"
                                    placeholder="State"
                                    value={addressForm.state}
                                    onChange={(e) =>
                                      setAddressForm((prev) => ({
                                        ...prev,
                                        state: e.target.value,
                                      }))
                                    }
                                  />
                                  <input
                                    className="border rounded px-2 py-1 text-sm"
                                    placeholder="ZIP"
                                    value={addressForm.zip}
                                    onChange={(e) =>
                                      setAddressForm((prev) => ({
                                        ...prev,
                                        zip: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                              </div>

                              <div className="flex justify-end gap-2 pt-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  type="button"
                                  onClick={() =>
                                    setIsAddressDialogOpen(false)
                                  }
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  type="button"
                                  disabled={savingAddress}
                                  onClick={async () => {
                                    try {
                                      setSavingAddress(true);
                                      const res = await fetch("/api/addresses", {
                                        method: "POST",
                                        headers: {
                                          "Content-Type":
                                            "application/json",
                                        },
                                        body: JSON.stringify(addressForm),
                                      });

                                      if (!res.ok) {
                                        throw new Error(
                                          "Failed to save address"
                                        );
                                      }

                                      const newAddress: Address =
                                        await res.json();
                                      toast.success(
                                        "Address added successfully!"
                                      );

                                      // Update local state without full refetch
                                      setAddresses((prev) =>
                                        prev
                                          ? [newAddress, ...prev]
                                          : [newAddress]
                                      );
                                      setSelectedAddress(newAddress);
                                      setIsAddressDialogOpen(false);
                                    } catch (err) {
                                      console.error(err);
                                      toast.error(
                                        "Could not save address"
                                      );
                                    } finally {
                                      setSavingAddress(false);
                                    }
                                  }}
                                >
                                  {savingAddress ? "Saving..." : "Save Address"}
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </div>

              {/* Order summary for mobile view */}
              <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
                <div className="bg-white p-4 rounded-lg border mx-4">
                  <h2>Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>SubTotal</span>
                      <PriceFormatter amount={getSubTotalPrice()} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Discount</span>
                      <PriceFormatter
                        amount={getSubTotalPrice() - getTotalPrice()}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between font-semibold text-lg">
                      <span>Total</span>
                      <PriceFormatter
                        amount={getTotalPrice()}
                        className="text-lg font-bold text-black"
                      />
                    </div>
                    <Button
                      className="w-full rounded-full font-semibold tracking-wide hoverEffect"
                      size="lg"
                      disabled={loading}
                      onClick={handleCheckout}
                    >
                      {loading ? "Please wait..." : "Proceed to Checkout"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </div>
  );
};

export default CartPage;
