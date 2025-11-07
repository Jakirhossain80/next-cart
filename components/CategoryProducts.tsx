"use client";

import { Category, Product } from "@/sanity.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props {
  categories: Category[];
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return; // Prevent unnecessary updates
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false }); // Update URL without scroll
  };

  const fetchProducts = async (categorySlug: string) => {
    setLoading(true);
    try {
      // ✅ Fetch via Next API (server) to avoid CORS and token exposure
      const url = new URL("/api/products", window.location.origin);
      url.searchParams.set("category", categorySlug);
      // (Optional) keep a high price ceiling similar to your Shop component behavior
      url.searchParams.set("max", String(10000));

      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const data: Product[] = Array.isArray(json) ? json : json?.data ?? [];
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when the selected category changes
  useEffect(() => {
    fetchProducts(currentSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlug]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <div className="flex flex-col md:min-w-40 border">
        {categories?.map((item) => (
          <Button
            onClick={() => handleCategoryChange(item?.slug?.current as string)}
            key={item?._id}
            className={`bg-transparent border-0 p-0  rounded-none text-darkColor shadow-none hover:bg-shop_orange hover:text-white font-semibold hoverEffect border-b last:border-b-0 transition-colors capitalize ${
              item?.slug?.current === currentSlug &&
              "bg-shop_orange text-white border-shop_orange"
            }`}
          >
            <p className="w-full text-left px-2">{item?.title}</p>
          </Button>
        ))}
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full">
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Product is loading...</span>
            </div>
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {products?.map((product: Product) => (
              <AnimatePresence key={product._id}>
                <motion.div>
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductAvailable selectedTab={currentSlug} className="mt-0 w-full" />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
