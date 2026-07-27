"use client";

import Link from "next/link";
import { DocPage, Callout } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Design System" },
  { id: "components", label: "Component Library" },
];

export default function ComponentArchitectureClientPage() {
  return (
    <DocPage
      title="Design System"
      description="A unified design system ensuring visual consistency across every page."
      toc={toc}
      section="Developer"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Design System
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          A unified design system ensures visual consistency across every page.
          Components are built for accessibility, performance, and maintainability.
          The design language is intentional — every color, spacing, and typography
          choice serves a purpose.
        </p>
      </section>

      <section id="components">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Component Library
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Reusable components handle everything from navigation to forms to data
          display. Each component is tested and documented. The library is designed
          to grow sustainably as new pages and features are added.
        </p>
        <Callout type="info">
          <p className="text-[13px] text-white/40 leading-relaxed">
            The design system is the foundation of visual consistency. It ensures
            every page feels like part of the same experience.
          </p>
        </Callout>
      </section>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <p className="text-[12px] text-white/20">
          Documentation version {APP_VERSION} · Last updated {LAST_UPDATED}
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/docs/developer/coding-standards" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            ← Quality Standards
          </Link>
          <Link href="/docs/developer/contributing" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            Community →
          </Link>
        </div>
      </div>
    </DocPage>
  );
}
