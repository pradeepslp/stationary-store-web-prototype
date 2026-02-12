import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";
import { SectionHeading } from "@/components/SectionHeading";

type Props = { searchParams: Promise<{ callbackUrl?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  // Strict authentication: if user is already logged in, redirect to dashboard
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/dashboard";

  return (
    <div className="mx-auto max-w-sm">
      <SectionHeading>Owner Login</SectionHeading>
      <p className="mt-4 text-base text-white/80">Sign in to manage your store.</p>
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  );
}
