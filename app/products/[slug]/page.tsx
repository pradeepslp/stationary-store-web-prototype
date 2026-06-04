import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProductDetailActions } from "@/components/ProductDetailActions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug, published: true },
  });
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-4 sm:py-12 lg:px-6">
      <ScrollReveal animation="fade-up">
        <nav className="mb-6 text-sm text-gray-600">
          <Link href="/products" className="hover:text-primary transition-colors flex items-center gap-1 font-semibold">
            ← Back to products
          </Link>
        </nav>
        <article className="rounded-xl bg-white shadow-card overflow-hidden md:grid md:grid-cols-2 md:gap-8 border border-gray-200/40">
          <div className="aspect-square relative bg-gray-50 flex items-center justify-center">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-6 sm:p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized={product.imageUrl.startsWith("http")}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-6xl font-serif">
                A
              </div>
            )}
          </div>
          <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between">
            <div>
              {product.category && (
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-sage">{product.category}</span>
              )}
              <h1 className="mt-2 text-2xl font-serif font-bold text-ink sm:text-3xl lg:text-4xl leading-tight">
                {product.name}
              </h1>
              <p className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>
              {product.description && (
                <div className="mt-6 text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap border-t border-gray-100 pt-4">
                  {product.description}
                </div>
              )}
            </div>

            {/* Client interactive buttons for Cart and Wishlist */}
            <ProductDetailActions product={product} />

            <div className="mt-6 border-t border-gray-100 pt-4 text-xs sm:text-sm text-gray-500 leading-relaxed flex items-center gap-2">
              <span>📍</span>
              <span>
                Want to see it in person? Visit us at <strong className="text-ink">Kavya Fancy Store</strong> to purchase in store!
              </span>
            </div>
          </div>
        </article>
      </ScrollReveal>
    </div>
  );
}

