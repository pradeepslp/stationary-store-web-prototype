import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/components/ServiceForm";
import { SectionHeading } from "@/components/SectionHeading";

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
      <SectionHeading>Edit Service</SectionHeading>
      <ServiceForm service={service} />
    </div>
  );
}
