import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardHomePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/dashboard/login");

  const [total, published, draft] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { published: true } }),
    prisma.product.count({ where: { published: false } }),
  ]);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-2 text-ink/70">Manage your store products.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-stone/20 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-ink/70">Total products</p>
          <p className="mt-1 text-2xl font-serif font-semibold text-ink">{total}</p>
        </div>
        <div className="rounded-lg border border-stone/20 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-ink/70">Published</p>
          <p className="mt-1 text-2xl font-serif font-semibold text-sage">{published}</p>
        </div>
        <div className="rounded-lg border border-stone/20 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-ink/70">Drafts</p>
          <p className="mt-1 text-2xl font-serif font-semibold text-ink">{draft}</p>
        </div>
      </div>
      <div className="mt-8">
        <Link
          href="/dashboard/products"
          className="inline-block rounded border border-ink bg-ink px-4 py-2 text-sm font-medium text-cream hover:bg-ink/90 transition"
        >
          Manage products
        </Link>
      </div>
    </div>
  );
}
