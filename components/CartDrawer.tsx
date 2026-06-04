"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useCartWishlist } from "@/components/CartWishlistContext";

export function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
  } = useCartWishlist();

  const [isRendered, setIsRendered] = useState(false);

  // Handle drawer animation and body scroll blocking
  useEffect(() => {
    if (isCartOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsRendered(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleClose = () => {
    setIsRendered(false);
    setTimeout(() => setIsCartOpen(false), 300); // Wait for transition animation
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isRendered ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px] cursor-pointer"
        onClick={handleClose}
      />

      {/* Sliding Drawer Body */}
      <div
        className={`relative w-full max-w-md bg-cream text-ink h-full shadow-2xl flex flex-col justify-between border-l border-white/20 transition-transform duration-300 transform ${
          isRendered ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-200/50 flex items-center justify-between">
          <h2 className="text-lg font-bold font-serif flex items-center gap-2">
            📋 Reference Shopping List
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-black transition-colors"
            aria-label="Close drawer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
              <span className="text-5xl mb-3">🛍️</span>
              <p className="font-semibold text-gray-500 text-sm">Your shopping list is empty</p>
              <button
                onClick={handleClose}
                className="mt-4 text-xs font-semibold text-primary hover:underline"
              >
                Start adding items →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-gray-500">
                You have selected <strong className="text-ink">{totalItemsCount}</strong> items. Take a screenshot or show this list to us in the shop!
              </p>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200/40 relative group"
                >
                  {/* Item Image */}
                  <div className="w-16 h-16 relative bg-gray-50 rounded border border-gray-100 flex-shrink-0">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                        unoptimized={item.imageUrl.startsWith("http")}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-lg font-serif">
                        A
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold truncate pr-6 text-ink">
                      {item.name}
                    </h4>
                    {item.category && (
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                        {item.category}
                      </span>
                    )}
                    <div className="mt-1 text-sm font-bold text-primary">
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center rounded border border-gray-300 text-xs font-bold bg-gray-50 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold w-6 text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center rounded border border-gray-300 text-xs font-bold bg-gray-50 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Item Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                    title="Remove item"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200/50 bg-white">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-gray-600">Estimated Total:</span>
                <span className="text-lg font-bold text-primary">{formatPrice(totalPrice)}</span>
              </div>
              
              {/* In-Store instructions notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 leading-relaxed shadow-sm">
                <p className="font-bold flex items-center gap-1 mb-1">
                  <span>📍</span> In-Store Purchase Only
                </p>
                Online ordering and delivery are not available. Use this reference shopping list to save what you need, and visit us at <strong className="text-ink">Kavya Fancy Store</strong> to purchase them. We accept UPI (GPay/PhonePe), cash, and card in store!
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-header hover:bg-headerHover text-white font-semibold py-3 rounded shadow hover:shadow-md transition-all active:scale-95 text-center text-sm"
              >
                Close & Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
