"use client";

import Link from "next/link";
import { DocPage, Callout } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Offline Experience" },
  { id: "how", label: "How It Works" },
];

export default function OfflineClientPage() {
  return (
    <DocPage
      title="Works Offline"
      description="The site works even without an internet connection."
      toc={toc}
      section="Features"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Offline Experience
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The site works even without an internet connection. Previously viewed
          content is available offline, ensuring a reliable experience regardless
          of network conditions.
        </p>
      </section>

      <section id="how">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          How It Works
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Content is cached as you browse. When you lose connectivity, cached pages
          remain accessible. New content syncs automatically when you reconnect.
          The experience is seamless — you should not have to think about whether
          you are online or offline.
        </p>
        <Callout type="info">
          <p className="text-[13px] text-white/40 leading-relaxed">
            The offline experience is designed to be invisible. The site just works.
          </p>
        </Callout>
      </section>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <p className="text-[12px] text-white/20">
          Documentation version {APP_VERSION} · Last updated {LAST_UPDATED}
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/docs/features/performance" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            ← Performance
          </Link>
          <Link href="/docs/features/privacy" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            Privacy →
          </Link>
        </div>
      </div>
    </DocPage>
  );
}
