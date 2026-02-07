export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 animate-pulse">
      <div className="h-4 w-24 bg-stone/20 rounded mb-6" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square bg-stone/20 rounded-lg" />
        <div className="space-y-4">
          <div className="h-4 w-20 bg-stone/20 rounded" />
          <div className="h-8 w-3/4 bg-stone/20 rounded" />
          <div className="h-6 w-24 bg-stone/20 rounded" />
          <div className="h-4 w-full bg-stone/20 rounded" />
          <div className="h-4 w-full bg-stone/20 rounded" />
        </div>
      </div>
    </div>
  );
}
