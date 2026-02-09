import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";
import { SectionHeading } from "@/components/SectionHeading";

type Props = { searchParams: Promise<{ callbackUrl?: string; error?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/dashboard";
  const error = params.error;

  return (
    <div className="mx-auto max-w-sm">
      <SectionHeading>Owner Login</SectionHeading>
      <p className="mt-4 text-base text-white/80">Sign in to manage your store.</p>
      <LoginForm callbackUrl={callbackUrl} />
      {error && (
        <p className="mt-4 text-base text-red-600">
          {error === "CredentialsSignin" ? "Invalid email or password." : "Something went wrong."}
        </p>
      )}
    </div>
  );
}
