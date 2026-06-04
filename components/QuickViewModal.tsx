"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useCartWishlist } from "@/components/CartWishlistContext";

type QuickViewModalProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
    category: string | null;
  } | null;
  onClose: () => void;
};

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();
  const [isRendered, setIsRendered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Trigger open animation on mount
  useEffect(() => {
    if (product) {
      setIsRendered(true);
      setQuantity(1);
      // Disable scrolling on body
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  const handleClose = () => {
    setIsRendered(false);
    setTimeout(onClose, 300); // Wait for transition animation to complete
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    handleClose();
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isRendered ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop blur overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={handleClose}
      />

      {/* Modal Content container */}
      <div
        className={`relative w-full max-w-3xl bg-cream border border-white/20 text-ink rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform ${
          isRendered ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black shadow transition-colors active:scale-95"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="aspect-square relative bg-white border-b md:border-b-0 md:border-r border-gray-200/50 flex items-center justify-center p-6">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={product.imageUrl.startsWith("http")}
              />
            ) : (
              <div className="text-gray-300 text-7xl font-serif">A</div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {product.category && (
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sage mb-2">
                  {product.category}
                </span>
              )}
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink">
                {product.name}
              </h2>
              <div className="mt-2 text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </div>

              <div className="mt-4 border-t border-gray-200/50 pt-4 max-h-[160px] overflow-y-auto text-sm text-gray-700 leading-relaxed scrollbar-thin">
                {product.description || "No description available for this premium product."}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200/50">
              {/* Quantity Select */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-semibold text-ink select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 rounded bg-primary py-3 px-4 font-semibold text-header hover:bg-primaryHover transition-all shadow hover:shadow-md active:scale-95 text-center text-sm sm:text-base"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`px-4 py-3 rounded border transition-all active:scale-95 ${
                    isInWishlist(product.id)
                      ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                      : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                  title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <svg
                    className={`w-6 h-6 transition-transform duration-300 ${
                      isInWishlist(product.id) ? "fill-current scale-110 text-red-500" : "fill-none"
                    }`}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
