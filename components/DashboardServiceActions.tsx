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
        className="text-sage hover:underline text-sm"
      >
        Edit
      </Link>
      <button type="button" onClick={togglePublish} className="text-ink/70 hover:text-ink text-sm">
        {service.isPublished ? "Unpublish" : "Publish"}
      </button>
      <button type="button" onClick={deleteService} className="text-red-600 hover:underline text-sm">
        Delete
      </button>
    </div>
  );
}
