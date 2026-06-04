"use client";

import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { useCartWishlist } from "@/components/CartWishlistContext";

export default function WishlistPage() {
  const { wishlist } = useCartWishlist();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-4 sm:py-12 lg:px-6 lg:py-16">
      <div className="border-b border-gray-200/50 pb-5 mb-8">
        <h1 className="text-3xl font-serif font-bold text-ink">
          My Wishlist ❤️
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Your saved stationery and writing collection items.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200/40 p-12 text-center shadow-sm max-w-md mx-auto mt-8 flex flex-col items-center">
          <span className="text-6xl mb-4 animate-bounce duration-1000">💝</span>
          <h2 className="text-lg font-bold text-ink mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Explore our curated fountain pens, leather notebooks, copying paper, and premium writing supplies to fill it up!
          </p>
          <Link
            href="/products"
            className="rounded bg-primary px-6 py-3 font-semibold text-header hover:bg-primaryHover transition-all shadow hover:shadow-md active:scale-95 text-sm"
          >
            Start Browsing
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((item) => (
            // Cast item to any to match expected prisma product types
            <ProductCard key={item.id} product={item as any} />
          ))}
        </div>
      )}
    </div>
  );
}
