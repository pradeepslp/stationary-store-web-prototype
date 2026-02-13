import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto bg-header text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-4 sm:py-8 lg:px-6">
        <div className="grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white">Kavya</p>
            <p className="mt-2 text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
              Your stationery store. Browse and visit us in store to purchase.
            </p>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-wider text-white/90">Shop</h3>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm lg:text-base text-white/80">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-wider text-white/90">Account</h3>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm lg:text-base text-white/80">
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard/login" className="hover:text-primary transition-colors">Login</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-wider text-white/90">Visit</h3>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
              Visit us for premium stationery, Xerox & photocopy, printing services, and Tamil Nadu E-Sevai facilities.
            </p>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 border-t border-white/20 pt-4 sm:pt-6 text-center text-xs sm:text-sm lg:text-base text-white/70">
          © {new Date().getFullYear()} Kavya Fancy Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
