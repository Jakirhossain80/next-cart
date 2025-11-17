// app/(client)/shop/page.tsx
import { Suspense } from "react";
import Shop from "@/components/Shop";
import { getAllBrands, getCategories } from "@/sanity/queries";

// Force this route to be dynamic (Clerk + search params, etc.)
export const dynamic = "force-dynamic";

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();

  return (
    <div className="bg-white">
      <Suspense
        fallback={
          <div className="min-h-[400px] flex items-center justify-center">
            Loading shop...
          </div>
        }
      >
        <Shop categories={categories} brands={brands} />
      </Suspense>
    </div>
  );
};

export default ShopPage;
