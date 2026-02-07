export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 animate-pulse">
      <div className="h-8 w-48 bg-stone/20 rounded" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-lg border border-stone/20 overflow-hidden">
            <div className="aspect-square bg-stone/20" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-16 bg-stone/20 rounded" />
              <div className="h-5 w-3/4 bg-stone/20 rounded" />
              <div className="h-4 w-20 bg-stone/20 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
