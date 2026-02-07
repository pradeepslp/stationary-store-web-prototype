import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { SignOutLink } from "@/components/SignOutLink";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isLoginPage = false; // we check in children or use pathname - actually login page doesn't need session
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {session && (
        <nav className="mb-8 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-ink hover:text-primary transition"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/products"
            className="text-sm font-medium text-ink hover:text-primary transition"
          >
            Products
          </Link>
          <Link
            href="/dashboard/products/new"
            className="text-sm font-medium text-primary hover:underline"
          >
            Add product
          </Link>
          <span className="ml-auto text-sm text-gray-600">{session.user?.email}</span>
          <SignOutLink />
        </nav>
      )}
      {children}
    </div>
  );
}
