// sanity/queries/product.ts
import { sanityFetch } from "@/sanity/lib/live";

export function getProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id, name, price, discount, description, images, stock, ...
  }`;

  return sanityFetch({
    query,
    params: { slug },
    // These tags can be revalidated by revalidateTag("product")
    tags: ["product", `product:${slug}`],
  });
}
