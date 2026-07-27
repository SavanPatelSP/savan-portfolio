"use client";

import Link from "next/link";
import { DocPage, Callout } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Accessibility" },
  { id: "features", label: "Accessibility Features" },
];

export default function AccessibilityClientPage() {
  return (
    <DocPage
      title="Built for Everyone"
      description="How the site ensures accessibility for all visitors."
      toc={toc}
      section="Features"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Accessibility
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The site is built to be accessible to everyone, regardless of ability or
          assistive technology. Accessibility is not an add-on — it is built into
          every component and interaction.
        </p>
      </section>

      <section id="features">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Accessibility Features
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Keyboard navigation, screen reader support, proper heading hierarchy,
          focus management, and reduced motion preferences are all supported.
          Every interaction is designed to work with assistive technologies.
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 p-5">
          <div className="space-y-3">
            {[
              { label: "Keyboard Navigation", description: "Full keyboard access to every interactive element" },
              { label: "Screen Reader Support", description: "Semantic markup and ARIA labels" },
              { label: "Focus Management", description: "Clear focus indicators and logical tab order" },
              { label: "Reduced Motion", description: "Animations respect user preferences" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400/40 mt-2 shrink-0" />
                <div>
                  <span className="text-[13px] font-medium text-white/60">{item.label}</span>
                  <span className="text-[13px] text-white/30"> — {item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Callout type="info">
          <p className="text-[13px] text-white/40 leading-relaxed">
            Accessibility is a legal requirement and a moral imperative. The site
            is designed to be usable by everyone.
          </p>
        </Callout>
      </section>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <p className="text-[12px] text-white/20">
          Documentation version {APP_VERSION} · Last updated {LAST_UPDATED}
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/docs/features/updates" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            ← Updates
          </Link>
          <Link href="/docs/features/responsive" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            Responsive →
          </Link>
        </div>
      </div>
    </DocPage>
  );
}
