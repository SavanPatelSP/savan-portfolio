"use client";

import { ApplicationPreview } from "@/components/portfolio-app/ApplicationPreview";

const screenToTab: Record<string, string> = {
  dashboard: "home",
  products: "home",
  downloads: "downloads",
  documentation: "docs",
  projects: "projects",
  settings: "settings",
  offline: "offline",
};

export default function ClientPage({ screen }: { screen: string }) {
  const activeTab = screenToTab[screen] || "home";

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 sm:p-10 lg:p-16">
      <div className="w-full max-w-5xl">
        <ApplicationPreview activeTab={activeTab} variant="full" />
      </div>
    </div>
  );
}
