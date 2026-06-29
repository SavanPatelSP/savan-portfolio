export function SectionSkeleton() {
  return (
    <div className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Label */}
          <div className="mb-4 h-3 w-20 rounded-full bg-white/[0.04]" />
          {/* Title */}
          <div className="mb-3 h-10 w-72 rounded-lg bg-white/[0.04]" />
          {/* Subtitle */}
          <div className="mb-16 h-5 w-96 rounded-md bg-white/[0.03]" />
          {/* Content blocks */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-white/[0.02] border border-white/[0.04]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
