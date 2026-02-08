import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-header text-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-3 sm:px-4 lg:px-6">
        <Link
          href="/"
          className="shrink-0 font-serif text-xl font-bold text-white hover:text-secondary transition-colors sm:text-2xl"
        >
          Kavya Fancy Store
        </Link>
        <form className="hidden flex-1 max-w-2xl mx-4 sm:block" action="/products" method="get">
          <div className="flex rounded overflow-hidden bg-white">
            <input
              type="search"
              name="q"
              placeholder="Search products..."
              className="w-full px-3 py-2 text-ink text-sm placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-secondary px-4 py-2 text-header hover:bg-primary transition-colors"
            >
              Search
            </button>
          </div>
        </form>
        <nav className="flex items-center gap-1 sm:gap-3 text-sm font-medium">
          <Link
            href="/"
            className="rounded px-2 py-2 text-white/90 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#services"
            className="rounded px-2 py-2 text-white/90 hover:text-white transition-colors"
          >
            Services
          </Link>
          <Link
            href="/products"
            className="rounded px-2 py-2 text-white/90 hover:text-white transition-colors"
          >
            Products
          </Link>
          <Link
            href="/dashboard"
            className="rounded px-2 py-2 text-white/90 hover:text-white transition-colors"
            title="Owner dashboard"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
