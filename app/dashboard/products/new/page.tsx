import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { ProductForm } from "@/components/ProductForm";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/dashboard/login");

  return (
    <div>
      <SectionHeading>Add Product</SectionHeading>
      <ProductForm />
    </div>
  );
}
