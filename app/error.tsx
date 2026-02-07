"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isDbError =
    error.message?.includes("DATABASE_URL") ||
    error.message?.includes("Environment variable") ||
    error.message?.includes("Prisma") ||
    error.message?.includes("connect");

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="font-serif text-2xl font-semibold text-ink">Something went wrong</h1>
      {isDbError ? (
        <>
          <p className="mt-4 max-w-md text-center text-ink/80">
            The app could not connect to the database. Make sure you have run:
          </p>
          <pre className="mt-4 rounded bg-ink/10 p-4 text-left text-sm text-ink">
            {`npm install
npx prisma db push
npx prisma db seed`}
          </pre>
          <p className="mt-4 text-sm text-ink/70">
            If you have no .env file, copy .env.example to .env and set NEXTAUTH_SECRET, OWNER_EMAIL, OWNER_PASSWORD.
          </p>
        </>
      ) : (
        <p className="mt-4 text-center text-ink/80">{error.message}</p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded border border-ink bg-ink px-4 py-2 text-sm font-medium text-cream hover:bg-ink/90"
      >
        Try again
      </button>
    </div>
  );
}
