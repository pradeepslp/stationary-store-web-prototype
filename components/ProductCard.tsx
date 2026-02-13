import Link from "next/link";
import Image from "next/image";
import type { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

type ProductCardProps = { product: Product };

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-md bg-white shadow-card transition hover:shadow-cardHover"
    >
      <div className="aspect-square relative bg-gray-100 overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-2 transition group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            unoptimized={product.imageUrl.startsWith("http")}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-3xl sm:text-4xl font-serif">
            A
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        {product.category && (
          <span className="text-xs sm:text-sm text-gray-500">{product.category}</span>
        )}
        <h3 className="mt-1 line-clamp-2 text-sm sm:text-base lg:text-base font-medium text-ink group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-lg sm:text-xl font-semibold text-primary">
          {formatPrice(product.price)}
        </p>
        <span className="mt-auto pt-2 text-xs sm:text-sm text-primary font-medium">
          View details →
        </span>
      </div>
    </Link>
  );
}
