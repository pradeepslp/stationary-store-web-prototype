import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ProductsPagination } from "@/components/ProductsPagination";
import { PRODUCTS_PER_PAGE } from "@/lib/utils";
import type { Product } from "@prisma/client";

export const dynamic = "force-dynamic";

type SearchParams = { page?: string; category?: string };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const category = params.category ?? undefined;
  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  const where = { published: true, ...(category ? { category } : {}) };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { name: "asc" },
      skip,
      take: PRODUCTS_PER_PAGE,
    }),
    prisma.product.count({ where }),
  ]);

  const categories = await prisma.product.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
  });
  const categoryList = categories.map((c: { category: string | null }) => c.category).filter(Boolean) as string[];
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 lg:px-6">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">All products</h1>
      {categoryList.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/products"
            className={`rounded-full px-4 py-2 text-base font-medium transition ${
              !category
                ? "bg-primary text-header"
                : "bg-white text-ink shadow-card hover:shadow-cardHover"
            }`}
          >
            All
          </Link>
          {categoryList.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className={`rounded-full px-4 py-2 text-base font-medium transition ${
                category === cat
                  ? "bg-primary text-header"
                  : "bg-white text-ink shadow-card hover:shadow-cardHover"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}
      {products.length === 0 ? (
        <p className="mt-8 text-base text-gray-600">No products to show.</p>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {totalPages > 1 && (
            <ProductsPagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/products"
              category={category}
            />
          )}
        </>
      )}
    </div>
  );
}
