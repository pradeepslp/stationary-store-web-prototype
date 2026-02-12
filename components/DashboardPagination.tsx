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
    <nav className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4" aria-label="Pagination">
      {prev ? (
        <Link href={prev} className="w-full sm:w-auto rounded border border-stone/30 px-4 py-2 text-sm sm:text-base font-medium text-ink hover:bg-stone/10 text-center">
          Previous
        </Link>
      ) : (
        <span className="w-full sm:w-auto rounded border border-stone/20 px-4 py-2 text-sm sm:text-base text-stone/50 cursor-not-allowed text-center">Previous</span>
      )}
      <span className="text-sm sm:text-base text-ink/70 whitespace-nowrap">
        Page {currentPage} of {totalPages}
      </span>
      {next ? (
        <Link href={next} className="w-full sm:w-auto rounded border border-stone/30 px-4 py-2 text-sm sm:text-base font-medium text-ink hover:bg-stone/10 text-center">
          Next
        </Link>
      ) : (
        <span className="w-full sm:w-auto rounded border border-stone/20 px-4 py-2 text-sm sm:text-base text-stone/50 cursor-not-allowed text-center">Next</span>
      )}
    </nav>
  );
}
