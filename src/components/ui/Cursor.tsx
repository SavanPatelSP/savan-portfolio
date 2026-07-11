"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let currentScale = 1;
    let currentGlow = 0;

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button'], input, textarea, select, label");
      if (clickable) {
        setIsHovering(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button'], input, textarea, select, label");
      if (clickable) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    const frame = () => {
      const targetScale = isHovering ? 1.8 : 1;
      const targetGlow = isHovering ? 1 : 0;

      currentScale += (targetScale - currentScale) * 0.12;
      currentGlow += (targetGlow - currentGlow) * 0.1;

      dotX += (mouseX - dotX) * 0.12;
      dotY += (mouseY - dotY) * 0.12;

      dot.style.transform = `translate(${dotX}px, ${dotY}px) scale(${currentScale})`;
      dot.style.boxShadow = `0 0 ${12 + currentGlow * 20}px rgba(59, 130, 246, ${0.3 + currentGlow * 0.3}), 0 0 ${30 + currentGlow * 40}px rgba(59, 130, 246, ${0.1 + currentGlow * 0.15})`;

      requestAnimationFrame(frame);
    };

    const raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [isHovering]);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference hidden lg:block"
      style={{
        background: "rgba(59, 130, 246, 0.7)",
        boxShadow: "0 0 12px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.1)",
        willChange: "transform",
        transition: "width 0.3s ease, height 0.3s ease, background 0.3s ease",
      }}
      aria-hidden="true"
    />
  );
}
