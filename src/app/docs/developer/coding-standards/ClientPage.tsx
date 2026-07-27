"use client";

import Link from "next/link";
import { DocPage, Callout } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "philosophy", label: "Quality Philosophy" },
  { id: "standards", label: "Standards" },
];

export default function CodingStandardsClientPage() {
  return (
    <DocPage
      title="Quality Standards"
      description="The standards that guide the work across every SP NET product."
      toc={toc}
      section="Developer"
    >
      <section id="philosophy">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Quality Philosophy
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every line of code is written with care. The same attention to craft that
          defines SP NET products applies to this portfolio. Quality is not a phase —
          it is embedded in every decision.
        </p>
      </section>

      <section id="standards">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Standards
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Automated linting, type checking, and code review ensure consistent quality.
          Accessibility and performance are checked on every change. The goal is code
          that is clear, maintainable, and reliable.
        </p>
        <Callout type="info">
          <p className="text-[13px] text-white/40 leading-relaxed">
            Quality standards are enforced, not suggested. Every change must meet the
            bar before it ships.
          </p>
        </Callout>
      </section>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <p className="text-[12px] text-white/20">
          Documentation version {APP_VERSION} · Last updated {LAST_UPDATED}
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/docs/developer/component-architecture" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            Design System →
          </Link>
        </div>
      </div>
    </DocPage>
  );
}
