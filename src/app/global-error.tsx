"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#050505] text-white flex min-h-screen items-center justify-center">
        <main className="mx-auto max-w-lg px-6 text-center">
          <h1 className="text-3xl font-bold">Something went wrong</h1>

          <p className="mt-4 text-neutral-400">
            An unexpected error occurred. The issue has been automatically
            reported, and you can try loading the page again.
          </p>

          <button
            onClick={() => reset()}
            className="mt-8 rounded-lg bg-white px-5 py-3 text-black transition hover:opacity-90"
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}
