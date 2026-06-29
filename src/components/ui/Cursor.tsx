"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouse, { passive: true });

    const frame = () => {
      dotX += (mouseX - dotX) * 0.12;
      dotY += (mouseY - dotY) * 0.12;
      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      requestAnimationFrame(frame);
    };

    const raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference hidden lg:block"
      style={{
        background: "rgba(59, 130, 246, 0.7)",
        boxShadow: "0 0 12px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.1)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
