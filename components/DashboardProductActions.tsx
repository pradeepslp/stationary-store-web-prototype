"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@prisma/client";

type Props = { product: Product };

export function DashboardProductActions({ product }: Props) {
  const router = useRouter();

  async function togglePublish() {
    const res = await fetch(`/api/dashboard/products/${product.id}/toggle-publish`, {
      method: "POST",
    });
    if (res.ok) router.refresh();
  }

  async function deleteProduct() {
    if (!confirm(`Delete "${product.name}"?`)) return;
    const res = await fetch(`/api/dashboard/products/${product.id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/dashboard/products/${product.id}/edit`}
        className="bg-black/40 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg text-base text-white hover:bg-white/20 transition-all"
      >
        Edit
      </Link>
      <button
        type="button"
        onClick={togglePublish}
        className="bg-black/40 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg text-base text-white hover:bg-white/20 transition-all"
      >
        {product.published ? "Unpublish" : "Publish"}
      </button>
      <button
        type="button"
        onClick={deleteProduct}
        className="bg-black/40 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg text-base text-red-300 hover:bg-white/20 transition-all"
      >
        Delete
      </button>
    </div>
  );
}
