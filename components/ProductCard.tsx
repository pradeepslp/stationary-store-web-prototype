"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { useCartWishlist } from "@/components/CartWishlistContext";
import { QuickViewModal } from "@/components/QuickViewModal";

type ProductCardProps = { product: Product };

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  const favorited = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Trigger heart scale animation
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 400);
    
    toggleWishlist(product);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div className="group flex flex-col overflow-hidden rounded-lg bg-white border border-gray-200/50 shadow-card hover:shadow-cardHover transition-all duration-300 transform hover:-translate-y-1.5 relative">
        {/* Wishlist Heart Icon (Corner Floating) */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full border border-white/20 bg-white/75 backdrop-blur-md shadow-sm transition-all duration-300 active:scale-95 ${
            favorited ? "text-red-500 hover:bg-red-50" : "text-gray-400 hover:text-gray-600 hover:bg-white"
          } ${heartAnim ? "scale-125 duration-100" : ""}`}
          title={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <svg
            className={`w-4 h-4 transition-transform ${favorited ? "fill-current scale-110" : "fill-none"}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Card Image Area & Quick Action Overlay */}
        <div className="aspect-square relative bg-gray-50 overflow-hidden border-b border-gray-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              unoptimized={product.imageUrl.startsWith("http")}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-3xl sm:text-4xl font-serif">
              A
            </div>
          )}

          {/* Glassmorphic Quick Action Overlay (Hidden on touch screens, displays on hover) */}
          <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-black/25 backdrop-blur-[1px] items-center justify-center gap-2 p-3 z-10">
            <button
              onClick={handleQuickViewClick}
              className="bg-white text-ink text-xs font-semibold py-2 px-3 rounded shadow-md hover:bg-gray-100 transition-all transform translate-y-3 group-hover:translate-y-0 duration-300 active:scale-95"
            >
              Quick View
            </button>
            <button
              onClick={handleAddToCartClick}
              className="bg-primary text-header text-xs font-semibold py-2 px-3 rounded shadow-md hover:bg-primaryHover transition-all transform translate-y-3 group-hover:translate-y-0 duration-300 delay-[40ms] active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Card Details Area */}
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <Link href={`/products/${product.slug}`} className="flex-1">
            {product.category && (
              <span className="text-[10px] sm:text-xs font-semibold text-sage uppercase tracking-wider">
                {product.category}
              </span>
            )}
            <h3 className="mt-1 line-clamp-2 text-xs sm:text-sm lg:text-base font-semibold text-ink hover:text-primary transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>
          
          <div className="mt-2 flex items-center justify-between gap-1">
            <p className="text-base sm:text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </p>
            {/* Direct Add to Cart for mobile users, or quick actions */}
            <button
              onClick={handleAddToCartClick}
              className="md:hidden p-1.5 rounded-full bg-primary hover:bg-primaryHover text-header shadow-sm transition-colors active:scale-90"
              aria-label="Add to cart"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm font-semibold">
            <Link href={`/products/${product.slug}`} className="text-primary hover:underline flex items-center gap-0.5">
              Details <span className="text-[10px]">→</span>
            </Link>
            <button
              onClick={handleQuickViewClick}
              className="text-sage hover:text-ink hidden md:block hover:underline"
            >
              Quick View
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}
