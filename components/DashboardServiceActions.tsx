"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Service } from "@prisma/client";

type Props = { service: Service };

export function DashboardServiceActions({ service }: Props) {
  const router = useRouter();

  async function togglePublish() {
    const res = await fetch(`/api/dashboard/services/${service.id}/toggle-publish`, {
      method: "POST",
    });
    if (res.ok) router.refresh();
  }

  async function deleteService() {
    if (!confirm(`Delete "${service.name}"?`)) return;
    const res = await fetch(`/api/dashboard/services/${service.id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/dashboard/services/${service.id}/edit`}
        className="bg-black/40 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg text-base text-white hover:bg-white/20 transition-all"
      >
        Edit
      </Link>
      <button
        type="button"
        onClick={togglePublish}
        className="bg-black/40 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg text-base text-white hover:bg-white/20 transition-all"
      >
        {service.isPublished ? "Unpublish" : "Publish"}
      </button>
      <button
        type="button"
        onClick={deleteService}
        className="bg-black/40 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg text-base text-red-300 hover:bg-white/20 transition-all"
      >
        Delete
      </button>
    </div>
  );
}
