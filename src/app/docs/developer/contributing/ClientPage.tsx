"use client";

import Link from "next/link";
import { DocPage, Callout } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Getting Involved" },
  { id: "feedback", label: "Providing Feedback" },
];

export default function ContributingClientPage() {
  return (
    <DocPage
      title="Community"
      description="Ways to get involved and contribute to the SP NET ecosystem."
      toc={toc}
      section="Developer"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Getting Involved
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          SP NET values community input. While the codebase is private, there are
          ways to get involved, provide feedback, and help shape the direction of
          the products.
        </p>
      </section>

      <section id="feedback">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Providing Feedback
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Bug reports, feature suggestions, and general feedback are always welcome
          through the contact form or community channels. Every piece of feedback
          is reviewed and considered.
        </p>
        <Callout type="info">
          <p className="text-[13px] text-white/40 leading-relaxed">
            The best products are built with community input. Your feedback helps
            shape what SP NET builds next.
          </p>
        </Callout>
      </section>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <p className="text-[12px] text-white/20">
          Documentation version {APP_VERSION} · Last updated {LAST_UPDATED}
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/docs/developer/component-architecture" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            ← Design System
          </Link>
          <Link href="/docs/developer/project-setup" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            Getting Started →
          </Link>
        </div>
      </div>
    </DocPage>
  );
}
