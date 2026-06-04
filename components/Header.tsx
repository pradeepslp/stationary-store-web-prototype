"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartWishlist } from "@/components/CartWishlistContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, wishlist, setIsCartOpen } = useCartWishlist();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header className="sticky top-0 z-50 bg-header/85 backdrop-blur-md text-white border-b border-white/10 shadow-sm">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center gap-2 sm:gap-4 px-3 sm:px-4 lg:px-6">
        <Link
          href="/"
          className="shrink-0 font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white hover:text-secondary transition-colors whitespace-nowrap"
        >
          Kavya Fancy Store
        </Link>
        
        <form className="hidden flex-1 max-w-2xl mx-4 md:block" action="/products" method="get">
          <div className="flex rounded overflow-hidden bg-white border border-gray-200 shadow-sm">
            <input
              type="search"
              name="q"
              placeholder="Search products..."
              className="w-full px-3 py-2 text-ink text-sm placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-secondary px-3 sm:px-4 py-2 text-header text-sm font-medium hover:bg-primary transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-sm lg:text-base font-medium ml-auto">
          <Link
            href="/"
            className="rounded px-2 py-1.5 lg:px-3 lg:py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#services"
            className="rounded px-2 py-1.5 lg:px-3 lg:py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/products"
            className="rounded px-2 py-1.5 lg:px-3 lg:py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/dashboard"
            className="rounded px-2 py-1.5 lg:px-3 lg:py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors mr-2"
            title="Owner dashboard"
          >
            Dashboard
          </Link>

          {/* Vertical Divider */}
          <span className="h-5 w-px bg-white/20 mx-1"></span>

          {/* Wishlist Icon */}
          <Link
            href="/wishlist"
            className="rounded p-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors relative flex items-center justify-center"
            title="Wishlist"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center border border-header animate-pulse">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="rounded p-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors relative flex items-center justify-center active:scale-95"
            title="Shopping Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-header text-[9px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center border border-header">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="md:hidden ml-auto p-2 hover:bg-white/10 rounded transition-colors relative flex items-center justify-center active:scale-95 text-white/90 hover:text-white"
          aria-label="Shopping Cart"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-primary text-header text-[8px] font-bold rounded-full h-3.5 min-w-[14px] px-0.5 flex items-center justify-center border border-header">
              {cartCount}
            </span>
          )}
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded transition-colors text-white/90 hover:text-white"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-white/20 bg-header/95 backdrop-blur-sm">
          <div className="flex flex-col">
            <Link
              href="/"
              className="px-4 py-3 text-sm border-b border-white/10 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#services"
              className="px-4 py-3 text-sm border-b border-white/10 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/products"
              className="px-4 py-3 text-sm border-b border-white/10 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/wishlist"
              className="px-4 py-3 text-sm border-b border-white/10 text-white/90 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist
              {wishlistCount > 0 && (
                <span className="bg-red-500 text-white text-[8px] font-bold rounded-full h-3.5 min-w-[14px] px-0.5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-3 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
              title="Owner dashboard"
            >
              Dashboard
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
