"use client";

import Link from "next/link";
import { DocPage, Callout } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Responsive Design" },
  { id: "devices", label: "Every Device" },
];

export default function ResponsiveClientPage() {
  return (
    <DocPage
      title="Works Everywhere"
      description="How the site looks and works great on every device."
      toc={toc}
      section="Features"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Responsive Design
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The site looks and works great on every device — from phones to desktops.
          The layout adapts fluidly to any screen size, ensuring a consistent
          experience across all viewport sizes.
        </p>
      </section>

      <section id="devices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Every Device
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Touch targets are appropriately sized. Text is readable at every viewport.
          Navigation adapts for mobile and desktop. The result is a site that feels
          native on every device.
        </p>
        <Callout type="info">
          <p className="text-[13px] text-white/40 leading-relaxed">
            Responsive design is not about fitting content on a small screen — it
            is about optimizing the experience for every context.
          </p>
        </Callout>
      </section>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <p className="text-[12px] text-white/20">
          Documentation version {APP_VERSION} · Last updated {LAST_UPDATED}
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/docs/features/accessibility" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            ← Accessibility
          </Link>
          <Link href="/docs/features/performance" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            Performance →
          </Link>
        </div>
      </div>
    </DocPage>
  );
}
