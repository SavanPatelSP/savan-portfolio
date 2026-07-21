"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const glow = el;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };
    motionQuery.addEventListener("change", onMotionChange);

    let pointerX = -100;
    let pointerY = -100;
    let glowX = -100;
    let glowY = -100;
    let targetOpacity = 0.4;
    let glowOpacity = 0.4;
    let targetScale = 0.8;
    let glowScale = 0.8;
    let animating = false;

    function startAnimation() {
      if (!animating) {
        animating = true;
        requestAnimationFrame(tick);
      }
    }

    function tick() {
      if (reducedMotion) {
        glow.style.transform = `translate(${pointerX}px, ${pointerY}px) translate(-50%, -50%)`;
        glow.style.opacity = String(targetOpacity);
        animating = false;
        return;
      }

      const ease = 0.14;
      glowX += (pointerX - glowX) * ease;
      glowY += (pointerY - glowY) * ease;
      glowOpacity += (targetOpacity - glowOpacity) * ease;
      glowScale += (targetScale - glowScale) * ease;

      glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%) scale(${glowScale})`;
      glow.style.opacity = String(glowOpacity);

      const settled =
        Math.abs(pointerX - glowX) < 0.5 &&
        Math.abs(pointerY - glowY) < 0.5 &&
        Math.abs(targetOpacity - glowOpacity) < 0.01 &&
        Math.abs(targetScale - glowScale) < 0.01;

      if (settled) {
        glow.style.transform = `translate(${pointerX}px, ${pointerY}px) translate(-50%, -50%) scale(${targetScale})`;
        glow.style.opacity = String(targetOpacity);
        animating = false;
        return;
      }

      requestAnimationFrame(tick);
    }

    function onPointerMove(e: PointerEvent) {
      pointerX = e.clientX;
      pointerY = e.clientY;
      startAnimation();
    }

    function onPointerOver(e: PointerEvent) {
      const interactive = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"
      );
      if (interactive) {
        targetOpacity = 1;
        targetScale = 1;
        startAnimation();
      }
    }

    function onPointerOut(e: PointerEvent) {
      const interactive = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"
      );
      if (interactive) {
        targetOpacity = 0.4;
        targetScale = 0.8;
        startAnimation();
      }
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[9999] hidden lg:block"
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
        opacity: 0.4,
        transform: "translate(-100px, -100px) translate(-50%, -50%) scale(0.8)",
        willChange: "transform, opacity",
      }}
      aria-hidden="true"
    />
  );
}
