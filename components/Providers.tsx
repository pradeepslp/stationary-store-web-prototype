"use client";

import { SessionProvider } from "next-auth/react";
import { CartWishlistProvider } from "@/components/CartWishlistContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartWishlistProvider>
        {children}
      </CartWishlistProvider>
    </SessionProvider>
  );
}

