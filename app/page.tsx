import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";

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
        <div className="mx-auto max-w-7xl px-3 py-12 sm:px-4 sm:py-16 lg:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
            Fine stationery, products & services
          </h1>
          <p className="mt-3 max-w-xl text-base sm:text-lg text-white/90">
            Curated pens, notebooks, and paper. Xerox, printing, and government e-services. Visit us in store.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded bg-primary px-6 py-3 text-base font-semibold text-header hover:bg-primaryHover transition-colors"
          >
            Shop now
          </Link>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-12 lg:px-6">
        <SectionHeading>Our Services</SectionHeading>
        {services.length === 0 ? (
          <p className="mt-6 text-base text-gray-600">No services available yet. Check back soon.</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group rounded-lg shadow-card p-6 text-center hover:shadow-cardHover transition-shadow cursor-pointer backdrop-blur-md bg-opacity-80"
                style={{ backgroundColor: 'var(--card-background)', color: 'var(--card-text-color)' }}
              >
                <div className="text-5xl mb-3">🖥️</div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="mt-2 text-base line-clamp-2 opacity-80">{service.description}</p>
                <span className="mt-3 inline-block text-base text-primary font-medium">Learn more →</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-12 lg:px-6">
        <div className="flex items-center justify-between">
          <SectionHeading>Featured Products</SectionHeading>
          <Link href="/products" className="text-base font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="mt-6 text-base text-gray-600">No products yet. Check back soon.</p>
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
