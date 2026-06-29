"use client";

import { useState, useEffect } from "react";

const sections = ["products", "founder", "technologies", "organization", "journey", "roadmap", "contact"];

export function useActiveSection() {
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}
