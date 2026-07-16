"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)
                `,
                backgroundSize: "64px 64px",
                maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 60%)",
                WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 60%)",
              }}
            />
          </div>
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-red-500/[0.03] blur-[120px]" aria-hidden="true" />
          <div className="relative z-10 text-center px-4">
            <div className="text-[6rem] sm:text-[8rem] font-bold text-white/5 leading-none tracking-tight select-none">
              !
            </div>
            <div className="mt-[-1.5rem]">
              <p className="text-lg sm:text-xl text-white font-medium tracking-tight">Something went wrong</p>
              <p className="mt-2 text-sm text-white/30 max-w-md mx-auto leading-relaxed">
                A critical error occurred. Please try again.
              </p>
            </div>
            <button
              onClick={() => reset()}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-all duration-300"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
