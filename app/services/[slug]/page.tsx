import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await prisma.service.findFirst({
    where: { slug, isPublished: true },
  });
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 lg:px-6">
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/#services" className="hover:text-primary transition-colors">
          ← Back to services
        </Link>
      </nav>
      <article className="rounded-lg bg-white shadow-card overflow-hidden md:grid md:grid-cols-2 md:gap-8">
        <div className="aspect-square relative bg-gray-100">
          {service.imageUrl ? (
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized={service.imageUrl.startsWith("http")}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-6xl font-serif">
              📋
            </div>
          )}
        </div>
        <div className="p-6 md:p-8 flex flex-col">
          {service.category && (
            <span className="text-sm text-gray-500">{service.category}</span>
          )}
          <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
            {service.name}
          </h1>
          {service.description && (
            <div className="mt-6 text-ink/90 whitespace-pre-wrap">
              {service.description}
            </div>
          )}
          {service.priceDetails && (
            <div className="mt-6 rounded-lg bg-primary/10 p-4">
              <h3 className="font-semibold text-ink mb-2">Pricing Details</h3>
              <p className="text-ink/80 whitespace-pre-wrap">
                {service.priceDetails}
              </p>
            </div>
          )}
          <p className="mt-8 text-sm text-gray-600">
            Contact us today to avail this service. Visit our store or reach out via WhatsApp.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="https://wa.me/9190XXXXXXXX?text=I%20am%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded bg-primary py-3 px-6 text-center font-semibold text-header hover:bg-primaryHover transition-colors"
            >
              Inquire via WhatsApp
            </Link>
            <Link
              href="/#services"
              className="inline-block rounded border border-primary text-primary py-3 px-6 text-center font-semibold hover:bg-primary/10 transition-colors"
            >
              View all services
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
