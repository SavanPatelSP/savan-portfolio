"use client";

import Link from "next/link";
import { DocPage, Callout } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Welcome" },
  { id: "explore", label: "Exploring the Site" },
];

export default function ProjectSetupClientPage() {
  return (
    <DocPage
      title="Getting Started"
      description="Welcome to the SP NET portfolio documentation."
      toc={toc}
      section="Developer"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Welcome
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Welcome to the SP NET portfolio documentation. This section covers how
          the site is organized and the standards that guide the work. The goal is
          to give visitors insight into the craft behind the products.
        </p>
      </section>

      <section id="explore">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Exploring the Site
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          A modern browser is all you need to explore the site. The portfolio is
          designed to work across all devices and browsers, with offline support
          for previously viewed content.
        </p>
        <Callout type="info">
          <p className="text-[13px] text-white/40 leading-relaxed">
            The documentation is organized to be scannable. Find what you need
            quickly, and explore deeper if you are curious.
          </p>
        </Callout>
      </section>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <p className="text-[12px] text-white/20">
          Documentation version {APP_VERSION} · Last updated {LAST_UPDATED}
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/docs/developer/contributing" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            ← Community
          </Link>
          <Link href="/docs/features/accessibility" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            Accessibility →
          </Link>
        </div>
      </div>
    </DocPage>
  );
}
