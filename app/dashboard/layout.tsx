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
    <div className="mx-auto max-w-6xl px-3 py-6 sm:py-8 sm:px-4 lg:px-6">
      {session && (
        <nav className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 sm:gap-4 border-b border-gray-200 pb-4">
          <Link
            href="/dashboard"
            className="text-xs sm:text-base font-medium text-ink hover:text-primary transition"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/products"
            className="text-xs sm:text-base font-medium text-ink hover:text-primary transition"
          >
            Products
          </Link>
          <Link
            href="/dashboard/products/new"
            className="text-xs sm:text-base font-medium text-primary hover:underline"
          >
            Add product
          </Link>
          <Link
            href="/dashboard/services"
            className="text-xs sm:text-base font-medium text-ink hover:text-primary transition"
          >
            Services
          </Link>
          <Link
            href="/dashboard/services/new"
            className="text-xs sm:text-base font-medium text-primary hover:underline"
          >
            Add service
          </Link>
          <Link
            href="/dashboard/settings"
            className="text-xs sm:text-base font-medium text-ink hover:text-primary transition"
          >
            Settings
          </Link>
          <span className="ml-auto text-xs sm:text-base text-gray-600 flex-shrink-0">{session.user?.email}</span>
          <SignOutLink />
        </nav>
      )}
      {children}
    </div>
  );
}
