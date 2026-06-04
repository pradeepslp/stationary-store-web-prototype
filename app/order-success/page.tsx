"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { formatPrice } from "@/lib/utils";

type OrderDetails = {
  customerName: string;
  totalAmount: number;
  itemsCount: number;
};

export default function OrderSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Read simulated order details
    try {
      const saved = localStorage.getItem("kavya_last_order");
      if (saved) {
        setOrderDetails(JSON.parse(saved));
        // Clear it so it doesn't persist forever
        localStorage.removeItem("kavya_last_order");
      }
    } catch (e) {
      console.error(e);
    }

    // Trigger premium confetti spray on page load
    // Burst 1
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff9900", "#febd69", "#8b9a7d", "#ffffff"],
    });

    // Wavy fireworks for 2 seconds
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#ff9900", "#febd69"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#8b9a7d", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    const timer = setTimeout(() => {
      requestAnimationFrame(frame);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24 text-center">
      <div className="bg-white/80 border border-white/20 backdrop-blur-md p-8 sm:p-12 rounded-2xl shadow-xl flex flex-col items-center">
        {/* Animated Checkmark Badge */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-inner text-green-500 scale-100 animate-[bounce_1s_infinite_alternate]">
          <svg className="w-10 h-10 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink">
          Order Placed Successfully!
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-md leading-relaxed">
          {orderDetails
            ? `Thank you, ${orderDetails.customerName}! We've successfully received your order.`
            : "Thank you for shopping with us! We have received your order."}
        </p>

        {/* Order Details box */}
        {orderDetails && (
          <div className="mt-8 p-5 bg-cream/70 border border-gray-200/40 rounded-xl w-full text-left max-w-md shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Order Details
            </h3>
            <div className="space-y-2 text-sm text-ink">
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="font-semibold">{orderDetails.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Items Count:</span>
                <span className="font-semibold">{orderDetails.itemsCount}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200/40 pt-2 font-bold text-base text-primary">
                <span>Amount Paid:</span>
                <span>{formatPrice(orderDetails.totalAmount)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-gray-200/50 pt-8 w-full max-w-md text-xs sm:text-sm text-gray-500 leading-relaxed">
          📍 Visit us at <strong className="text-ink">Kavya Fancy Store</strong> to collect your stationery items, or feel free to contact us for doorstep local delivery options.
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/products"
            className="rounded bg-primary hover:bg-primaryHover text-header font-semibold py-3 px-8 shadow hover:shadow-md transition-all active:scale-95 text-center text-sm"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 transition-all active:scale-95 text-center text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
