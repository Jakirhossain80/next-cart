// components/SearchBar.tsx
"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

type SearchResult = {
  _id: string;
  name: string;
  slug?: { current: string };
};

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pre-fill from URL when you're already on /search?q=...
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Submit = go to full search page
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  // Mobile: keep your original icon behavior (go to /search)
  const handleMobileClick = () => {
    router.push("/search");
  };

  // Click on a suggestion = go directly to product page
  const handleSelect = (slug?: string) => {
    if (!slug) return;
    setIsOpen(false);
    router.push(`/product/${slug}`);
  };

  // Live typeahead: debounce and call /api/search-products
  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed || trimmed.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search-products?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to search");

        const data = await res.json();
        setResults(data?.results ?? []);
        setIsOpen(true);
      } catch (error: any) {
        if (error?.name === "AbortError") return;
        console.error("[SearchBar] Error while searching:", error);
        setResults([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <>
      {/* Mobile: icon only (same look as your original) */}
      <button
        type="button"
        onClick={handleMobileClick}
        className="flex md:hidden"
        aria-label="Open search"
      >
        <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      </button>

      {/* Desktop: full search bar with live suggestions */}
      <div className="relative hidden md:block max-w-xs w-full">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 hoverEffect w-full"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm flex-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (results.length > 0) setIsOpen(true);
            }}
          />
          <button
            type="submit"
            aria-label="Search products"
            className="flex items-center justify-center"
          >
            <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect text-gray-500" />
          </button>
        </form>

        {/* Suggestions dropdown */}
        {isOpen && (isLoading || results.length > 0) && (
          <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
            {isLoading && (
              <div className="px-4 py-3 text-sm text-gray-500">
                Searching…
              </div>
            )}

            {!isLoading && results.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500">
                No products found.
              </div>
            )}

            {!isLoading &&
              results.map((item) => (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => handleSelect(item.slug?.current)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-50 hoverEffect"
                >
                  <span className="font-medium text-gray-900 line-clamp-1">
                    {item.name}
                  </span>
                </button>
              ))}

            {!isLoading && results.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  const trimmed = query.trim();
                  if (!trimmed) return;
                  setIsOpen(false);
                  router.push(`/search?q=${encodeURIComponent(trimmed)}`);
                }}
                className="w-full px-4 py-2 text-xs text-gray-500 border-t hover:bg-gray-50 hoverEffect text-left"
              >
                View all results for “{query.trim()}”
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
