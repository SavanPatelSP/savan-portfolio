"use client";

import { ComingSoon } from "@/components/ui/ComingSoon";

export default function PressReleasesPage() {
  return (
    <ComingSoon
      title="Press Releases"
      titleAccent="Official announcements"
      description="Official press releases, product announcements, and company news from SP NET INC."
      features={[
        "Product launches",
        "Company milestones",
        "Partnership announcements",
        "Media coverage",
      ]}
    />
  );
}
