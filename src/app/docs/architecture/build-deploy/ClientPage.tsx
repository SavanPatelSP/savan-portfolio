"use client";

import Link from "next/link";
import { DocPage, Callout } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "philosophy", label: "Build Philosophy" },
  { id: "reliability", label: "Reliability" },
  { id: "performance", label: "Performance" },
  { id: "quality", label: "Quality Assurance" },
  { id: "best-practices", label: "Best Practices" },
];

export default function BuildDeployClientPage() {
  return (
    <DocPage
      title="Build & Deployment"
      description="How the site is built for performance, reliability, and a polished user experience."
      toc={toc}
      section="Architecture"
    >
      <section id="philosophy">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Build Philosophy
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every build is optimized for performance, accessibility, and reliability.
          The site is designed to load fast, work everywhere, and maintain high standards
          across every page. Automated quality checks ensure nothing ships without meeting
          those standards.
        </p>
      </section>

      <section id="reliability">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Reliability
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The site is deployed with zero-downtime strategies. Automated health checks
          ensure the site is always available. Failed deployments are automatically rolled
          back to the previous working version. The result is a site that stays up,
          even during updates.
        </p>
      </section>

      <section id="performance">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Performance
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Static pages are served globally with minimal latency. Dynamic content is cached
          intelligently. Most page loads are served from the nearest edge location, ensuring
          fast experiences for visitors worldwide.
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 p-5">
          <div className="space-y-3">
            {[
              { label: "Global CDN", description: "Content served from the nearest edge location" },
              { label: "Smart Caching", description: "Static assets cached, dynamic content refreshed" },
              { label: "Optimized Loading", description: "Pages load progressively for instant interaction" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/40 mt-2 shrink-0" />
                <div>
                  <span className="text-[13px] font-medium text-white/60">{item.label}</span>
                  <span className="text-[13px] text-white/30"> — {item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quality">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Quality Assurance
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Automated quality checks run on every change. Type safety, code quality, and
          accessibility are verified before anything goes live. This ensures the site
          maintains its standards as it evolves.
        </p>
      </section>

      <Callout type="info">
        <p className="text-[13px] text-white/40 leading-relaxed">
          This site is built with care and deployed with confidence. Every update
          is verified, every page is optimized, and every visitor gets a fast,
          reliable experience.
        </p>
      </Callout>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <div className="space-y-4">
          {[
            { title: "Keep Content Fresh", description: "Regular updates keep the site relevant and accurate." },
            { title: "Test Before Publishing", description: "Every change is verified before going live." },
            { title: "Monitor Performance", description: "Regular checks ensure the site stays fast." },
            { title: "Maintain Accessibility", description: "Standards are enforced on every update." },
          ].map((practice) => (
            <div key={practice.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <h3 className="text-[13px] font-medium text-white/60 mb-1">{practice.title}</h3>
              <p className="text-[13px] text-white/35 leading-relaxed">{practice.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 pt-8 border-t border-white/[0.06]">
        <p className="text-[12px] text-white/20">
          Documentation version {APP_VERSION} · Last updated {LAST_UPDATED}
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/docs/architecture/technology-stack" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            ← Technology Stack
          </Link>
          <Link href="/docs/architecture/routing" className="text-[13px] text-blue-400/60 hover:text-blue-400/80 transition-colors">
            Navigation →
          </Link>
        </div>
      </div>
    </DocPage>
  );
}
