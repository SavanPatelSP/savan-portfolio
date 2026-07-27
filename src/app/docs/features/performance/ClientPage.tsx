"use client";

import Link from "next/link";
import { DocPage, Callout } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Performance" },
  { id: "speed", label: "Fast Loading" },
];

export default function PerformanceClientPage() {
  return (
    <DocPage
      title="Fast & Reliable"
      description="How the site delivers a fast, smooth experience."
      toc={toc}
      section="Features"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Performance
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The site is designed for speed. Pages load quickly, animations are smooth,
          and interactions feel instant. Performance is a feature, not an afterthought.
        </p>
      </section>

      <section id="speed">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Fast Loading
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Static content is served globally. Dynamic content loads progressively.
          The site consistently scores high on performance metrics, ensuring
          visitors get a fast experience regardless of their device or connection.
        </p>
        <Callout type="info">
          <p className="text-[13px] text-white/40 leading-relaxed">
            Speed is not optional. Every millisecond matters for user experience
            and search visibility.
          </p>
        </Callout>
      </section>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <p className="text-[12px] text-white/20">
          Documentation version {APP_VERSION} · Last updated {LAST_UPDATED}
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/docs/features/responsive" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            ← Responsive
          </Link>
          <Link href="/docs/features/offline" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            Offline →
          </Link>
        </div>
      </div>
    </DocPage>
  );
}
