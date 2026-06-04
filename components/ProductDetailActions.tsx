"use client";

import React, { useState } from "react";
import { useCartWishlist } from "@/components/CartWishlistContext";

type ProductDetailActionsProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    imageUrl: string | null;
    category: string | null;
  };
};

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();
  const [quantity, setQuantity] = useState(1);
  const [heartAnim, setHeartAnim] = useState(false);

  const favorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlistToggle = () => {
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 400);
    toggleWishlist(product);
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200/50">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-semibold text-gray-700">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3.5 py-1.5 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
          >
            -
          </button>
          <span className="px-5 py-1.5 text-sm font-semibold text-ink select-none">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3.5 py-1.5 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Cart & Wishlist Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 rounded bg-primary hover:bg-primaryHover text-header font-semibold py-3.5 px-6 shadow-md hover:shadow-lg transition-all active:scale-95 text-center text-sm sm:text-base"
        >
          Add to Cart
        </button>

        <button
          onClick={handleWishlistToggle}
          className={`px-5 py-3.5 rounded border transition-all flex items-center justify-center gap-2 active:scale-95 font-semibold text-sm ${
            favorited
              ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
          title={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              favorited ? "fill-current scale-110 text-red-500" : "fill-none"
            } ${heartAnim ? "scale-125 duration-100" : ""}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {favorited ? "Wishlisted" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}
