"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartWishlist } from "@/components/CartWishlistContext";

export function StickyBottomNav() {
  const pathname = usePathname();
  const { cart, wishlist, setIsCartOpen } = useCartWishlist();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Render nothing on owner dashboard pages to keep clean layout
  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-header/95 backdrop-blur-md border-t border-white/15 text-white/80 shadow-[0_-4px_16px_rgba(0,0,0,0.15)] pb-safe-bottom">
      <nav className="flex justify-around items-center h-14 sm:h-16 max-w-lg mx-auto">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors active:scale-95 ${
            pathname === "/" ? "text-primary" : "hover:text-white"
          }`}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>

        {/* Products */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors active:scale-95 ${
            pathname?.startsWith("/products") ? "text-primary" : "hover:text-white"
          }`}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-[10px] mt-1 font-medium">Products</span>
        </Link>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center w-full h-full relative transition-colors active:scale-95 ${
            pathname === "/wishlist" ? "text-primary" : "hover:text-white"
          }`}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {wishlistCount > 0 && (
            <span className="absolute top-2 right-[28%] bg-red-500 text-white text-[9px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center border border-header animate-pulse">
              {wishlistCount}
            </span>
          )}
          <span className="text-[10px] mt-1 font-medium">Wishlist</span>
        </Link>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center w-full h-full relative transition-colors active:scale-95 hover:text-white"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-2 right-[28%] bg-primary text-header text-[9px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center border border-header">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] mt-1 font-medium">Cart</span>
        </button>
      </nav>
    </div>
  );
}
