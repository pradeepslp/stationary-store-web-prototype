import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/ProductForm";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/dashboard/login");

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink">Edit product</h1>
      <ProductForm product={product} />
    </div>
  );
}
