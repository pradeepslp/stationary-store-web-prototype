import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardServiceActions } from "@/components/DashboardServiceActions";
import { PRODUCTS_PER_PAGE } from "@/lib/utils";
import { DashboardPagination } from "@/components/DashboardPagination";
import { SectionHeading } from "@/components/SectionHeading";

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
        <SectionHeading>Services</SectionHeading>
        <Link
          href="/dashboard/services/new"
          className="rounded bg-sage px-8 py-3 text-base font-semibold text-white hover:bg-sage/90 shadow-2xl transition"
        >
          Add service
        </Link>
      </div>
      {services.length === 0 ? (
        <p className="mt-6 text-base text-ink/70">No services yet. Add your first service.</p>
      ) : (
        <>
          <div className="mt-6">
            <div className="overflow-x-auto">
              <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full min-w-[700px] border-collapse">
                  <thead>
                    <tr className="bg-white/90 text-black uppercase tracking-widest font-bold text-sm text-left">
                      <th className="py-3 px-4">Service Name</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Price / Details</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, idx) => (
                      <tr
                        key={service.id}
                        className={`bg-transparent text-white border-b border-white/5 hover:bg-white/10 transition-colors ${
                          idx % 2 === 0 ? "even:bg-white/5" : ""
                        }`}
                      >
                        <td className="py-3 px-4 text-base font-medium">{service.name}</td>
                        <td className="py-3 px-4 text-base text-white/80 line-clamp-2">{service.description ?? "—"}</td>
                        <td className="py-3 px-4 text-base">{service.priceDetails ?? "—"}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <DashboardServiceActions service={service} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {totalPages > 1 && (
            <DashboardPagination currentPage={page} totalPages={totalPages} basePath="/dashboard/services" />
          )}
        </>
      )}
    </div>
  );
}
