"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Service } from "@prisma/client";

type Props = { service?: Service };

export function ServiceForm({ service }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState(service?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);

  const isEdit = !!service;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const description = (formData.get("description") as string)?.trim() || null;
    const priceDetails = (formData.get("priceDetails") as string)?.trim() || null;
    const imageUrlValue = (formData.get("imageUrl") as string)?.trim() || null;
    const category = (formData.get("category") as string)?.trim() || null;
    const isPublished = formData.get("isPublished") === "on";

    if (!name) {
      setError("Service name is required.");
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
      const url = isEdit ? `/api/dashboard/services/${service.id}` : "/api/dashboard/services";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug: isEdit ? service.slug : slug,
          description,
          priceDetails,
          imageUrl: imageUrlValue || null,
          category,
          isPublished,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }
      router.push("/dashboard/services");
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4">
      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-base text-red-700">{error}</p>
      )}
      <div>
        <label htmlFor="name" className="block text-base font-medium text-ink">
          Service Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={service?.name}
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-base text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-base font-medium text-ink">
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          placeholder="e.g. E-Service, Xerox, Printing"
          defaultValue={service?.category ?? undefined}
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-base text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
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
          defaultValue={service?.description ?? undefined}
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-base text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        />
      </div>
      <div>
        <label htmlFor="priceDetails" className="block text-base font-medium text-ink">
          Pricing Details
        </label>
        <textarea
          id="priceDetails"
          name="priceDetails"
          rows={3}
          placeholder="e.g. ₹10 per page, bulk discounts available"
          defaultValue={service?.priceDetails ?? undefined}
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-base text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        />
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-base font-medium text-ink">
          Image URL
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://… or /uploads/… from upload below"
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-base text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        />
      </div>
      <div>
        <label className="block text-base font-medium text-ink">
          Or upload image
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={uploading}
          className="mt-1 block w-full text-base text-ink file:mr-3 file:rounded file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-cream file:hover:bg-ink/90"
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
        {uploading && <p className="mt-1 text-base text-ink/70">Uploading…</p>}
      </div>
      <div className="flex items-center gap-2">
        <input
          id="isPublished"
          name="isPublished"
          type="checkbox"
          defaultChecked={service?.isPublished ?? false}
          className="h-4 w-4 rounded border-stone/30 text-sage focus:ring-sage"
        />
        <label htmlFor="isPublished" className="text-base font-medium text-ink">
          Published (visible on store)
        </label>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-ink px-8 py-3 text-base font-semibold text-cream hover:bg-ink/90 disabled:opacity-50 shadow-2xl transition"
        >
          {loading ? "Saving…" : isEdit ? "Save changes" : "Add service"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded border border-stone/30 px-8 py-3 text-base font-semibold text-ink hover:bg-stone/10 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
