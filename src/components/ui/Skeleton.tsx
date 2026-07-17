function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.04]", className)}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
}

import { cn } from "@/lib/utils";

export function SectionSkeleton() {
  return (
    <div className="relative py-28 sm:py-36" role="status" aria-label="Loading content">
      <span className="sr-only">Loading...</span>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {/* Label */}
          <SkeletonBlock className="h-3 w-20" />
          {/* Title */}
          <SkeletonBlock className="h-10 w-72" />
          {/* Subtitle */}
          <SkeletonBlock className="h-5 w-96 max-w-full" />
          {/* Content blocks */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
