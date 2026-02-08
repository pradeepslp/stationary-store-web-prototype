import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto bg-header text-white">
      <div className="mx-auto max-w-7xl px-3 py-8 sm:px-4 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-lg font-bold text-white">Kavya Fancy Store</p>
            <p className="mt-2 text-sm text-white/80">
              Your stationery store. Browse and visit us in store to purchase.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Account</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard/login" className="hover:text-primary transition-colors">Login</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Visit</h3>
            <p className="mt-3 text-sm text-white/80">
              Visit us for premium stationery, Xerox & photocopy, printing services, and Tamil Nadu E-Sevai facilities. We&apos;re here to help!
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-white/70">
          © {new Date().getFullYear()} Kavya Fancy Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
