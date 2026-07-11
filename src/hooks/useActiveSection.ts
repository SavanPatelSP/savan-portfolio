"use client";

import { useState, useEffect } from "react";

const sections = ["home", "products", "founder", "technologies", "organization", "journey", "roadmap", "contact"];

export function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    let cancelled = false;

    const timer = setTimeout(() => {
      if (cancelled) return;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActive(id === "home" ? null : id);

              if (id === "home") {
                if (window.location.hash) {
                  history.replaceState(null, "", window.location.pathname + window.location.search);
                }
              } else {
                const newHash = `#${id}`;
                if (window.location.hash !== newHash) {
                  history.replaceState(null, "", newHash);
                }
              }
            }
          },
          { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
        );

        observer.observe(el);
        observers.push(observer);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return active;
}
