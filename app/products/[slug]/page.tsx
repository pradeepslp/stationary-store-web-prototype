import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug, published: true },
  });
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 lg:px-6">
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/products" className="hover:text-primary transition-colors">
          ← Back to products
        </Link>
      </nav>
      <article className="rounded-lg bg-white shadow-card overflow-hidden md:grid md:grid-cols-2 md:gap-8">
        <div className="aspect-square relative bg-gray-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-4"
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
        <div className="p-6 md:p-8 flex flex-col">
          {product.category && (
            <span className="text-sm text-gray-500">{product.category}</span>
          )}
          <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          {product.description && (
            <div className="mt-6 text-ink/90 whitespace-pre-wrap">
              {product.description}
            </div>
          )}
          <p className="mt-8 text-sm text-gray-600">
            Visit us in store to purchase this item. We&apos;re happy to help you find the perfect stationery.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block w-full rounded bg-primary py-3 text-center font-semibold text-header hover:bg-primaryHover transition-colors sm:w-auto sm:px-8"
          >
            Continue shopping
          </Link>
        </div>
      </article>
    </div>
  );
}
