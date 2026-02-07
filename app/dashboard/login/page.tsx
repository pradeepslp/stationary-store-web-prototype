import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";

type Props = { searchParams: Promise<{ callbackUrl?: string; error?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/dashboard";
  const error = params.error;

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-serif text-2xl font-semibold text-ink">Owner login</h1>
      <p className="mt-2 text-sm text-ink/70">Sign in to manage your store.</p>
      <LoginForm callbackUrl={callbackUrl} />
      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error === "CredentialsSignin" ? "Invalid email or password." : "Something went wrong."}
        </p>
      )}
    </div>
  );
}
