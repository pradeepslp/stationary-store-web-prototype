import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { HeroBanner } from "@/components/HeroBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
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
    <div className="bg-cream/40 min-h-screen">
      {/* 1. Premium Animated Hero Section */}
      <HeroBanner />

      {/* 2. Brand Highlights Section ("Why Choose Us") */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-4 sm:py-12 lg:px-6 lg:py-14">
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-4 sm:p-6 rounded-xl shadow-sm text-center flex flex-col items-center">
              <span className="text-3xl sm:text-4xl mb-2.5">✨</span>
              <h4 className="font-serif font-bold text-sm sm:text-base text-ink">Premium Quality</h4>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">Curated luxury fountain pens, fine notebook paper & supplies.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-4 sm:p-6 rounded-xl shadow-sm text-center flex flex-col items-center">
              <span className="text-3xl sm:text-4xl mb-2.5">⚡</span>
              <h4 className="font-serif font-bold text-sm sm:text-base text-ink">Express Services</h4>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">Same-day printouts, Xerox, document lamination & processing.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-4 sm:p-6 rounded-xl shadow-sm text-center flex flex-col items-center">
              <span className="text-3xl sm:text-4xl mb-2.5">🏢</span>
              <h4 className="font-serif font-bold text-sm sm:text-base text-ink">Store Pickup</h4>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">Reserve online and collect at our fancy storefront in minutes.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-4 sm:p-6 rounded-xl shadow-sm text-center flex flex-col items-center">
              <span className="text-3xl sm:text-4xl mb-2.5">💼</span>
              <h4 className="font-serif font-bold text-sm sm:text-base text-ink">E-Sevai Center</h4>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">Official support desk for state certificates & document filings.</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Our Services Section */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-6 sm:px-4 sm:py-10 lg:px-6 lg:py-12">
        <ScrollReveal animation="fade-up">
          <SectionHeading>Our Services</SectionHeading>
        </ScrollReveal>
        
        {services.length === 0 ? (
          <p className="mt-6 text-sm sm:text-base text-gray-600">No services available yet. Check back soon.</p>
        ) : (
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="mt-6 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service: Service, idx: number) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group rounded-xl shadow-card p-5 sm:p-6 text-center hover:shadow-cardHover transition-all transform hover:-translate-y-1 duration-300 cursor-pointer backdrop-blur-md bg-white/70 border border-white/20 active:scale-95"
                  style={{ color: 'var(--card-text-color-light, #2c2825)' }}
                >
                  <div className="text-4xl sm:text-5xl mb-3 transition-transform group-hover:scale-110 duration-300">
                    {idx === 0 ? "🖥️" : idx === 1 ? "🖨️" : "🏛️"}
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-serif font-bold text-ink group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm lg:text-base line-clamp-2 text-gray-600 leading-relaxed">{service.description}</p>
                  <span className="mt-4 inline-block text-xs sm:text-sm text-primary font-semibold group-hover:translate-x-1 transition-transform">
                    Learn more <span className="font-mono">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        )}
      </section>



      {/* 5. Featured Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-4 sm:py-10 lg:px-6 lg:py-12 mb-10">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 border-b border-gray-200/50 pb-4">
            <SectionHeading>Featured Products</SectionHeading>
            <Link href="/products" className="text-sm sm:text-base font-semibold text-primary hover:underline hover:text-primaryHover transition-colors">
              View all products <span className="font-mono">→</span>
            </Link>
          </div>
        </ScrollReveal>

        {products.length === 0 ? (
          <p className="mt-6 text-sm sm:text-base text-gray-600">No products yet. Check back soon.</p>
        ) : (
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="mt-8 grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </ScrollReveal>
        )}
      </section>
    </div>
  );
}
