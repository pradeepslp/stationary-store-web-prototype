import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import type { Service, Product } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, services] = await Promise.all([
    prisma.product.findMany({
      where: { published: true },
      orderBy: { updatedAt: "desc" },
      take: 8,
    }),
    prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  return (
    <div>
      <section className="bg-header text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-4 sm:py-12 lg:px-6 lg:py-16">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-6xl leading-tight text-balance">
            Fine stationery, products & services
          </h1>
          <p className="mt-3 max-w-xl text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed">
            Curated pens, notebooks, and paper. Xerox, printing, and government e-services. Visit us in store.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded bg-primary px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-header hover:bg-primaryHover transition-colors"
          >
            Shop now
          </Link>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-6 sm:px-4 sm:py-10 lg:px-6 lg:py-12">
        <SectionHeading>Our Services</SectionHeading>
        {services.length === 0 ? (
          <p className="mt-6 text-sm sm:text-base text-gray-600">No services available yet. Check back soon.</p>
        ) : (
          <div className="mt-6 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service: Service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group rounded-lg shadow-card p-4 sm:p-6 text-center hover:shadow-cardHover transition-shadow cursor-pointer backdrop-blur-md bg-opacity-80"
                style={{ backgroundColor: 'var(--card-background)', color: 'var(--card-text-color)' }}
              >
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🖥️</div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm lg:text-base line-clamp-2 opacity-80">{service.description}</p>
                <span className="mt-3 inline-block text-xs sm:text-sm lg:text-base text-primary font-medium">Learn more →</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-4 sm:py-10 lg:px-6 lg:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <SectionHeading>Featured Products</SectionHeading>
          <Link href="/products" className="text-sm sm:text-base font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="mt-6 text-sm sm:text-base text-gray-600">No products yet. Check back soon.</p>
        ) : (
          <div className="mt-6 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
