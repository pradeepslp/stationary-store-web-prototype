import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export function DashboardPagination({ currentPage, totalPages, basePath }: Props) {
  const prev = currentPage > 1 ? (currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`) : null;
  const next = currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : null;

  return (
    <nav className="mt-6 flex items-center justify-center gap-4" aria-label="Pagination">
      {prev ? (
        <Link href={prev} className="rounded border border-stone/30 px-4 py-2 text-base font-medium text-ink hover:bg-stone/10">
          Previous
        </Link>
      ) : (
        <span className="rounded border border-stone/20 px-4 py-2 text-base text-stone/50 cursor-not-allowed">Previous</span>
      )}
      <span className="text-base text-ink/70">
        Page {currentPage} of {totalPages}
      </span>
      {next ? (
        <Link href={next} className="rounded border border-stone/30 px-4 py-2 text-base font-medium text-ink hover:bg-stone/10">
          Next
        </Link>
      ) : (
        <span className="rounded border border-stone/20 px-4 py-2 text-base text-stone/50 cursor-not-allowed">Next</span>
      )}
    </nav>
  );
}
