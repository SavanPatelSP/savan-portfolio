"use client";

import Link from "next/link";
import { DocPage, Callout } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Privacy" },
  { id: "data", label: "Your Data" },
];

export default function PrivacyClientPage() {
  return (
    <DocPage
      title="Your Data Stays Yours"
      description="How the site respects your privacy."
      toc={toc}
      section="Features"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Privacy
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Privacy is a core value. The site collects minimal data and respects your
          privacy at every level. No tracking, no analytics, no advertising.
        </p>
      </section>

      <section id="data">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Your Data
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Contact form submissions are used only to respond to inquiries. Third-party
          services are chosen for their privacy practices. The goal is to collect the
          absolute minimum data required to provide the service — nothing more.
        </p>
        <Callout type="info">
          <p className="text-[13px] text-white/40 leading-relaxed">
            Privacy is not a policy — it is a design principle. Every decision
            considers what data is needed and how to minimize collection.
          </p>
        </Callout>
      </section>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <p className="text-[12px] text-white/20">
          Documentation version {APP_VERSION} · Last updated {LAST_UPDATED}
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/docs/features/offline" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            ← Offline
          </Link>
          <Link href="/docs/features/updates" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            Updates →
          </Link>
        </div>
      </div>
    </DocPage>
  );
}
