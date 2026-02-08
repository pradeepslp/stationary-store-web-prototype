import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardServiceActions } from "@/components/DashboardServiceActions";
import { PRODUCTS_PER_PAGE } from "@/lib/utils";
import { DashboardPagination } from "@/components/DashboardPagination";

export const dynamic = "force-dynamic";

type SearchParams = { page?: string };

export default async function DashboardServicesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/dashboard/login");

  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  const [services, total] = await Promise.all([
    prisma.service.findMany({
      orderBy: { updatedAt: "desc" },
      skip,
      take: PRODUCTS_PER_PAGE,
    }),
    prisma.service.count(),
  ]);
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-ink">Services</h1>
        <Link
          href="/dashboard/services/new"
          className="rounded border border-sage bg-sage px-4 py-2 text-sm font-medium text-white hover:bg-sage/90 transition"
        >
          Add service
        </Link>
      </div>
      {services.length === 0 ? (
        <p className="mt-6 text-ink/70">No services yet. Add your first service.</p>
      ) : (
        <>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone/30 text-left text-ink/70">
                  <th className="py-3 pr-4 font-medium">Name</th>
                  <th className="py-3 pr-4 font-medium">Category</th>
                  <th className="py-3 pr-4 font-medium">Description</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-stone/20">
                    <td className="py-3 pr-4 font-medium text-ink">{service.name}</td>
                    <td className="py-3 pr-4 text-ink/70">{service.category ?? "—"}</td>
                    <td className="py-3 pr-4 text-ink/70 line-clamp-2">
                      {service.description ?? "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          service.isPublished ? "bg-sage/20 text-sage" : "bg-stone/20 text-ink/70"
                        }`}
                      >
                        {service.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3">
                      <DashboardServiceActions service={service} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <DashboardPagination currentPage={page} totalPages={totalPages} basePath="/dashboard/services" />
          )}
        </>
      )}
    </div>
  );
}
