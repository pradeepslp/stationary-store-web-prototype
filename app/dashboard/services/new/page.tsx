import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { ServiceForm } from "@/components/ServiceForm";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export default async function NewServicePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/dashboard/login");

  return (
    <div>
      <SectionHeading>Add Service</SectionHeading>
      <ServiceForm />
    </div>
  );
}
