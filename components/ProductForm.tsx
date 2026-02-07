"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@prisma/client";

type Props = { product?: Product };

export function ProductForm({ product }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);

  const isEdit = !!product;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const description = (formData.get("description") as string)?.trim() || null;
    const price = parseFloat((formData.get("price") as string) ?? "0");
    const imageUrlValue = (formData.get("imageUrl") as string)?.trim() || null;
    const category = (formData.get("category") as string)?.trim() || null;
    const published = formData.get("published") === "on";

    if (!name) {
      setError("Name is required.");
      setLoading(false);
      return;
    }
    if (Number.isNaN(price) || price < 0) {
      setError("Price must be a non-negative number.");
      setLoading(false);
      return;
    }

    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    try {
      const url = isEdit ? `/api/dashboard/products/${product.id}` : "/api/dashboard/products";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug: isEdit ? product.slug : slug,
          description,
          price,
          imageUrl: imageUrlValue || null,
          category,
          published,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }
      router.push("/dashboard/products");
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4">
      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={product?.name}
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description ?? undefined}
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-ink">
          Price *
        </label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          required
          defaultValue={product?.price ?? ""}
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        />
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-ink">
          Image URL
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://… or /uploads/… from upload below"
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">
          Or upload from device
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={uploading}
          className="mt-1 block w-full text-sm text-ink file:mr-3 file:rounded file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-cream file:hover:bg-ink/90"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setUploading(true);
            setError(null);
            try {
              const formData = new FormData();
              formData.set("file", file);
              const res = await fetch("/api/dashboard/upload", {
                method: "POST",
                body: formData,
              });
              if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(data.error ?? "Upload failed.");
                e.target.value = "";
                return;
              }
              const data = await res.json();
              setImageUrl(data.url);
              e.target.value = "";
            } catch {
              setError("Upload failed.");
              e.target.value = "";
            } finally {
              setUploading(false);
            }
          }}
        />
        {uploading && <p className="mt-1 text-sm text-ink/70">Uploading…</p>}
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-ink">
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          placeholder="e.g. Pens, Notebooks"
          defaultValue={product?.category ?? undefined}
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={product?.published ?? false}
          className="h-4 w-4 rounded border-stone/30 text-sage focus:ring-sage"
        />
        <label htmlFor="published" className="text-sm font-medium text-ink">
          Published (visible on store)
        </label>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded border border-ink bg-ink px-4 py-2 text-sm font-medium text-cream hover:bg-ink/90 disabled:opacity-50 transition"
        >
          {loading ? "Saving…" : isEdit ? "Save changes" : "Add product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded border border-stone/30 px-4 py-2 text-sm font-medium text-ink hover:bg-stone/10 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
