"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-header text-white shadow-sm">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center gap-2 sm:gap-4 px-3 sm:px-4 lg:px-6">
        <Link
          href="/"
          className="shrink-0 font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white hover:text-secondary transition-colors whitespace-nowrap"
        >
          Kavya Fancy Store
        </Link>
        
        <form className="hidden flex-1 max-w-2xl mx-4 md:block" action="/products" method="get">
          <div className="flex rounded overflow-hidden bg-white">
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
            className="rounded px-2 py-1.5 lg:px-3 lg:py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            title="Owner dashboard"
          >
            Dashboard
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden ml-auto p-2 hover:bg-white/10 rounded transition-colors"
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
