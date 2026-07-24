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
      <head>
        <style>{`
          body { background: #050505; color: white; display: flex; min-height: 100vh; align-items: center; justify-content: center; margin: 0; font-family: system-ui, -apple-system, sans-serif; }
          main { max-width: 32rem; margin: 0 auto; padding: 0 1.5rem; text-align: center; }
          h1 { font-size: 1.875rem; font-weight: 700; }
          p { margin-top: 1rem; color: #a3a3a3; }
          button { margin-top: 2rem; border-radius: 0.5rem; background: white; color: black; padding: 0.75rem 1.25rem; font-weight: 500; cursor: pointer; border: none; font-size: 0.875rem; transition: opacity 0.15s; }
          button:hover { opacity: 0.9; }
          button:focus-visible { outline: 2px solid rgba(59, 130, 246, 0.5); outline-offset: 2px; }
        `}</style>
      </head>
      <body>
        <main>
          <h1>Something went wrong</h1>
          <p>
            An unexpected error occurred. The issue has been automatically
            reported, and you can try loading the page again.
          </p>
          <button onClick={() => reset()}>Try Again</button>
        </main>
      </body>
    </html>
  );
}
