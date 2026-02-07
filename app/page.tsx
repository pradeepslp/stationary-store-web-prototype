import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { published: true },
    orderBy: { updatedAt: "desc" },
    take: 8,
  });

  return (
    <div>
      <section className="bg-header text-white">
        <div className="mx-auto max-w-7xl px-3 py-12 sm:px-4 sm:py-16 lg:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Fine stationery for thoughtful writing
          </h1>
          <p className="mt-3 max-w-xl text-white/90">
            Curated pens, notebooks, and paper. Visit us in store to discover and purchase.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded bg-primary px-6 py-3 text-sm font-semibold text-header hover:bg-primaryHover transition-colors"
          >
            Shop now
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-12 lg:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">Featured products</h2>
          <Link href="/products" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="mt-6 text-gray-600">No products yet. Check back soon.</p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
