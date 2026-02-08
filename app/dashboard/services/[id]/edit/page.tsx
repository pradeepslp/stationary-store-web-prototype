import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/components/ServiceForm";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/dashboard/login");

  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink">Edit service</h1>
      <ServiceForm service={service} />
    </div>
  );
}
