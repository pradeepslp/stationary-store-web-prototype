import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { ServiceForm } from "@/components/ServiceForm";

export const dynamic = "force-dynamic";

export default async function NewServicePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/dashboard/login");

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink">Add service</h1>
      <ServiceForm />
    </div>
  );
}
