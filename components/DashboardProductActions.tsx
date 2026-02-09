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
        className="text-base text-sage hover:underline"
      >
        Edit
      </Link>
      <button type="button" onClick={togglePublish} className="text-base text-ink/70 hover:text-ink">
        {product.published ? "Unpublish" : "Publish"}
      </button>
      <button type="button" onClick={deleteProduct} className="text-base text-red-600 hover:underline">
        Delete
      </button>
    </div>
  );
}
