"use client";

import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  category?: string;
};

export function ProductsPagination({ currentPage, totalPages, basePath, category }: Props) {
  const catParam = category ? `category=${encodeURIComponent(category)}` : "";
  const prev =
    currentPage > 1
      ? currentPage === 2
        ? `${basePath}${catParam ? `?${catParam}` : ""}`
        : `${basePath}?${catParam ? `${catParam}&` : ""}page=${currentPage - 1}`
      : null;
  const next =
    currentPage < totalPages
      ? `${basePath}?${catParam ? `${catParam}&` : ""}page=${currentPage + 1}`
      : null;

  return (
    <nav className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4" aria-label="Pagination">
      {prev ? (
        <Link
          href={prev}
          className="w-full sm:w-auto rounded bg-white px-4 sm:px-6 py-2 text-sm sm:text-base font-medium text-ink shadow-card hover:bg-primary hover:text-header transition"
        >
          Previous
        </Link>
      ) : (
        <span className="w-full sm:w-auto rounded bg-gray-200 px-4 sm:px-6 py-2 text-sm sm:text-base text-gray-500 cursor-not-allowed text-center">
          Previous
        </span>
      )}
      <span className="text-sm sm:text-base text-ink/80 whitespace-nowrap">
        Page {currentPage} of {totalPages}
      </span>
      {next ? (
        <Link
          href={next}
          className="w-full sm:w-auto rounded bg-white px-4 sm:px-6 py-2 text-sm sm:text-base font-medium text-ink shadow-card hover:bg-primary hover:text-header transition"
        >
          Next
        </Link>
      ) : (
        <span className="w-full sm:w-auto rounded bg-gray-200 px-4 sm:px-6 py-2 text-sm sm:text-base text-gray-500 cursor-not-allowed text-center">
          Next
        </span>
      )}
    </nav>
  );
}
