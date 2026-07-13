"use client";

import { ComingSoon } from "@/components/ui/ComingSoon";

export default function DocumentationPage() {
  return (
    <ComingSoon
      title="Documentation"
      titleAccent="Technical reference and guides"
      description="Comprehensive documentation for all SP NET products, APIs, and developer tools. Currently being prepared."
      features={[
        "Installation guides",
        "API documentation",
        "Tutorials",
        "Code examples",
      ]}
    />
  );
}
