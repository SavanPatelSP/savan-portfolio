"use client";

import { ComingSoon } from "@/components/ui/ComingSoon";

export default function NewsroomClientPage() {
  return (
    <ComingSoon
      title="Newsroom"
      titleAccent="Company announcements and updates"
      description="Stay tuned for the latest news, product launches, and company milestones from SP NET INC."
      features={[
        "Press releases",
        "Product announcements",
        "Company milestones",
        "Media coverage",
      ]}
    />
  );
}
