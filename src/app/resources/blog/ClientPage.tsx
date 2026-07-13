"use client";

import { ComingSoon } from "@/components/ui/ComingSoon";

export default function BlogPage() {
  return (
    <ComingSoon
      title="Blog"
      titleAccent="Engineering insights and stories"
      description="A space for deep dives into engineering decisions, technology explorations, and the stories behind building SP NET."
      features={[
        "Engineering articles",
        "Development logs",
        "Technology insights",
        "Behind the scenes",
      ]}
    />
  );
}
