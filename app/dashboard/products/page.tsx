import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardProductActions } from "@/components/DashboardProductActions";
import { PRODUCTS_PER_PAGE, formatPrice } from "@/lib/utils";
import { DashboardPagination } from "@/components/DashboardPagination";
import { SectionHeading } from "@/components/SectionHeading";
import type { Product } from "@prisma/client";

export const dynamic = "force-dynamic";

type SearchParams = { page?: string };

export default async function DashboardProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/dashboard/login");

  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      orderBy: { updatedAt: "desc" },
      skip,
      take: PRODUCTS_PER_PAGE,
    }),
    prisma.product.count(),
  ]);
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <div>
      <div className="flex items-center justify-between">
        <SectionHeading>Products</SectionHeading>
        <Link
          href="/dashboard/products/new"
          className="rounded bg-sage px-8 py-3 text-base font-semibold text-white hover:bg-sage/90 shadow-2xl transition"
        >
          Add product
        </Link>
      </div>
      {products.length === 0 ? (
        <p className="mt-6 text-base text-ink/70">No products yet. Add your first product.</p>
      ) : (
        <>
          <div className="mt-6">
            <div className="overflow-x-auto">
              <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full min-w-[700px] border-collapse">
                  <thead>
                    <tr className="bg-white/90 text-black uppercase tracking-widest font-bold text-sm text-left">
                      <th className="py-3 px-4">Image</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: Product, idx: number) => (
                      <tr
                        key={product.id}
                        className={`bg-transparent text-white border-b border-white/5 hover:bg-white/10 transition-colors ${
                          idx % 2 === 0 ? "even:bg-white/5" : ""
                        }`}
                      >
                        <td className="py-3 px-4">
                          {product.imageUrl ? (
                            <div className="w-16 h-12 relative rounded overflow-hidden bg-white/5">
                              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                            </div>
                          ) : (
                            <div className="w-16 h-12 flex items-center justify-center bg-white/5 text-sm text-white/60 rounded">—</div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-base font-medium">{product.name}</td>
                        <td className="py-3 px-4 text-base">{product.category ?? "—"}</td>
                        <td className="py-3 px-4 text-base">{formatPrice(product.price)}</td>
                        <td className="py-3 px-4 text-base">—</td>
                        <td className="py-3 px-4">
                          <span className={`rounded-full px-2 py-1 text-sm font-medium ${product.published ? "bg-white text-black" : "bg-white/5 text-white/80"}`}>
                            {product.published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <DashboardProductActions product={product} />
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
            <DashboardPagination currentPage={page} totalPages={totalPages} basePath="/dashboard/products" />
          )}
        </>
      )}
    </div>
  );
}
