"use client";

import Link from "next/link";
import { DocPage, Callout } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Staying Current" },
  { id: "how", label: "How Updates Work" },
];

export default function UpdatesClientPage() {
  return (
    <DocPage
      title="Always Up to Date"
      description="How the site stays current with new content and features."
      toc={toc}
      section="Features"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Staying Current
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The site is updated regularly with new content, products, and features.
          Updates happen seamlessly — visitors always see the latest content
          without manual intervention.
        </p>
      </section>

      <section id="how">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          How Updates Work
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Updates happen seamlessly in the background. When new content is published,
          it appears automatically. The site checks for updates and refreshes
          without requiring a manual page reload.
        </p>
        <Callout type="info">
          <p className="text-[13px] text-white/40 leading-relaxed">
            Staying current should be effortless. The site handles updates so
            visitors can focus on the content.
          </p>
        </Callout>
      </section>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <p className="text-[12px] text-white/20">
          Documentation version {APP_VERSION} · Last updated {LAST_UPDATED}
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/docs/features/privacy" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            ← Privacy
          </Link>
          <Link href="/docs/features/accessibility" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            Accessibility →
          </Link>
        </div>
      </div>
    </DocPage>
  );
}
