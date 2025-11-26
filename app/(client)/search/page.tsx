// app/(client)/search/page.tsx
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/sanity/queries";

interface SearchPageProps {
  searchParams?: { q?: string };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const q = (searchParams?.q ?? "").trim();

  // No query – show a gentle message instead of hitting Sanity
  if (!q) {
    return (
      <Container className="py-10">
        <h1 className="text-2xl font-bold mb-4">Search products</h1>
        <p className="text-gray-600">
          Type a product name or keyword in the search bar above to find
          matching products.
        </p>
      </Container>
    );
  }

  const products = await searchProducts(q);

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">
          Search results for:{" "}
          <span className="text-shop_light_green">&quot;{q}&quot;</span>
        </h1>
        <p className="text-sm text-gray-500">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">
          No products found for that search. Try a different keyword.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default SearchPage;
