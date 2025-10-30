import React from "react";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";

type Props = {
  product: Product;      // kept for future use
  className?: string;
};

const AddToWishlistButton = ({ product: _product, className }: Props) => {
  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <button className="p-2.5 rounded-full hover:bg-shop_dark_green hover:text-white hoverEffect bg-shop_lighter_bg">
        <Heart size={15} />
      </button>
    </div>
  );
};

export default AddToWishlistButton;
