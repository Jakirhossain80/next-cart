// components/SearchBar.tsx
"use client";

import React, { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pre-fill from URL when you're already on /search?q=...
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // Navigate to /search?q=<query>
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleMobileClick = () => {
    // On mobile, just go to the search page where user can type
    router.push("/search");
  };

  return (
    <>
      {/* Mobile: icon only (keeps your original behavior & styling) */}
      <button
        type="button"
        onClick={handleMobileClick}
        className="flex md:hidden"
        aria-label="Open search"
      >
        <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      </button>

      {/* Desktop: full search bar with input + icon */}
      <form
        onSubmit={handleSubmit}
        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 hoverEffect max-w-xs w-full"
      >
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent outline-none text-sm flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          aria-label="Search products"
          className="flex items-center justify-center"
        >
          <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect text-gray-500" />
        </button>
      </form>
    </>
  );
};

export default SearchBar;
