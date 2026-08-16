"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useSplash } from "@/lib/splash";
import { getRouteName } from "@/lib/splash/route-name";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ease, SLOW } from "@/lib/motion";

// Initial document load keeps the brand on screen long enough to feel like a
// deliberate, cinematic opening. Client-side navigation uses a shorter hold so
// moving between pages stays snappy.
const INITIAL_HOLD_MS = 3200;
const NAV_HOLD_MS = 1400;

// ─── SP NET INC icon activation transition ────────────────────────────────
// After the main splash hold elapses the screen hands off to the brand icon,
// which goes through an activation sequence: emerge → blue/cyan energy sweep →
// light-up → single pulse → settle → release into the website. The page reveal
// fires only after the release exit completes.
const BRAND_EXIT_MS = 300;
const INITIAL_EXIT_MS = 650;
const NAV_EXIT_MS = 550;

// Activation stage timings (ms). Total icon phase ≈ 1.2 s + release exit.
const ICON_EMERGE_MS = 180;
const ICON_SWEEP_MS = 440;
const ICON_PULSE_MS = 280;
const ICON_SETTLE_MS = 200;
const ICON_FLARE_MS = 120;

// Reduced motion: simple fades only — no sweep, glow, pulse, scale or ring.
const RM_BRAND_EXIT_MS = 200;
const RM_ICON_EMERGE_MS = 250;
const RM_ICON_HOLD_MS = 450;
const RM_EXIT_MS = 300;

type Phase = "splash" | "icon";

async function waitForReady(holdMs: number): Promise<void> {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
  await new Promise((r) => setTimeout(r, holdMs));
}

export function SplashScreen() {
  const { ready, visible, isInitial, finish, markReady } = useSplash();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const exitMs = isInitial ? INITIAL_EXIT_MS : NAV_EXIT_MS;
  const iconExitMs = reducedMotion ? RM_EXIT_MS : exitMs;

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible && (
        <motion.div
          id="splash-screen"
          className="fixed inset-0 z-[9999] bg-[#0a0a0a]"
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          transition={{ duration: iconExitMs / 1000, ease: ease.out }}
        >
          {/* Keyed by pathname so each route change remounts the stage with a
              fresh `splash` phase while the persistent overlay handles the exit. */}
          <SplashStage
            key={pathname}
            pathname={pathname}
            isInitial={isInitial}
            ready={ready}
            reducedMotion={reducedMotion}
            onMarkReady={markReady}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SplashStage({
  pathname,
  isInitial,
  ready,
  reducedMotion,
  onMarkReady,
}: {
  pathname: string;
  isInitial: boolean;
  ready: boolean;
  reducedMotion: boolean;
  onMarkReady: () => void;
}) {
  const mounted = useRef(false);
  const [phase, setPhase] = useState<Phase>("splash");

  const pageName = getRouteName(pathname);
  const holdMs = isInitial ? INITIAL_HOLD_MS : NAV_HOLD_MS;
  const brandExitMs = reducedMotion ? RM_BRAND_EXIT_MS : BRAND_EXIT_MS;

  // Main splash hold → hand off to the SP NET INC icon activation.
  useEffect(() => {
    if (ready) return;
    mounted.current = true;

    const init = async () => {
      await waitForReady(holdMs);
      if (!mounted.current) return;
      setPhase("icon");
    };
    init();

    return () => {
      mounted.current = false;
    };
  }, [ready, holdMs]);

  return (
    <AnimatePresence>
      {/* ── Main brand splash ─────────────────────────────────── */}
      {phase === "splash" && (
        <motion.div
          key="splash-brand"
          className="absolute inset-0 flex flex-col items-center justify-center"
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -10, filter: "blur(10px)" }
          }
          transition={{ duration: brandExitMs / 1000, ease: ease.out }}
        >
          <motion.div
            className="absolute h-64 w-64 rounded-full opacity-0"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.8, 0.5], scale: [0.8, 1.1, 1] }}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          />

          <motion.span
            className="relative text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.12em] text-white/90"
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: SLOW, delay: 0.2, ease: ease.out }}
          >
            SAVAN PATEL
          </motion.span>
          <motion.span
            className="relative mt-3 text-xs sm:text-sm font-light tracking-[0.2em] text-white/60"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: ease.out }}
          >
            SP NET INC
          </motion.span>

          <motion.div
            className="relative mt-8 h-px w-28 sm:w-36 bg-white/[0.04] overflow-hidden rounded-full"
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.div
              className="h-full w-full bg-white/50"
              initial={{ scaleX: 0, x: "-100%" }}
              animate={{ scaleX: 1, x: "0%" }}
              transition={{ duration: 1.8, delay: 0.5, ease: ease.out }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          {/* Destination label — shown only for client-side navigation,
              never on the initial document load (including direct loads like /blog). */}
          {!isInitial && (
            <motion.div
              className="relative mt-8 flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] text-white/35"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: ease.out }}
              aria-live="polite"
            >
              <span className="text-white/15">OPENING</span>
              <motion.span
                className="h-1 w-1 rounded-full bg-white/20"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-white/60">{pageName.toUpperCase()}</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ── SP NET INC icon activation ─────────────────────────── */}
      {phase === "icon" && (
        <motion.div key="splash-icon" className="absolute inset-0 flex items-center justify-center">
          <IconActivation reducedMotion={reducedMotion} onComplete={onMarkReady} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ICON ACTIVATION
   A staged, one-shot activation sequence that makes the SP emblem appear
   to power on: emerge → blue/cyan energy sweep → light-up → single pulse →
   brief settle → release (flare + scale) that hands off to the overlay exit.
   ═══════════════════════════════════════════════════════════════════════ */

function IconActivation({
  reducedMotion,
  onComplete,
}: {
  reducedMotion: boolean;
  onComplete: () => void;
}) {
  const icon = useAnimationControls();
  const glow = useAnimationControls();
  const sweep = useAnimationControls();
  const ring = useAnimationControls();
  const sheen = useAnimationControls();
  const crown = useAnimationControls();
  const doneRef = useRef(false);

  useEffect(() => {
    const stopAll = () => {
      icon.stop();
      glow.stop();
      sweep.stop();
      ring.stop();
      sheen.stop();
      crown.stop();
    };

    if (reducedMotion) {
      icon.start({ opacity: 1, transition: { duration: RM_ICON_EMERGE_MS / 1000, ease: ease.out } });
      const t = setTimeout(() => {
        if (!doneRef.current) {
          doneRef.current = true;
          onComplete();
        }
      }, RM_ICON_EMERGE_MS + RM_ICON_HOLD_MS);
      return () => {
        clearTimeout(t);
        stopAll();
      };
    }

    let cancelled = false;

    const run = async () => {
      // Stage 1 — emerge: dim, slightly small, settles into center.
      await icon.start({
        opacity: 1,
        scale: 0.98,
        filter: "brightness(0.82)",
        transition: { duration: ICON_EMERGE_MS / 1000, ease: ease.out },
      });
      if (cancelled) return;

      // Stage 2 — energy sweep travels upward while the icon lights up.
      sweep.start({
        y: "-140%",
        opacity: [0, 1, 1, 0],
        transition: {
          y: { duration: ICON_SWEEP_MS / 1000, ease: [0.65, 0, 0.35, 1] },
          opacity: { duration: ICON_SWEEP_MS / 1000, ease: "easeInOut" },
        },
      });
      glow.start({
        opacity: 0.5,
        scale: 1.12,
        transition: { duration: ICON_SWEEP_MS / 1000, ease: ease.out },
      });
      await icon.start({
        scale: 1,
        filter: "brightness(1.15)",
        transition: { duration: ICON_SWEEP_MS / 1000, ease: ease.out },
      });
      if (cancelled) return;

      // Stage 3 — fully illuminated: sheen + crown highlight settle in.
      sheen.start({
        opacity: 0.55,
        transition: { duration: 0.3, ease: ease.out },
      });
      crown.start({
        opacity: [0, 0.6, 0.35],
        transition: { duration: 0.35, ease: "easeOut" },
      });

      // Stage 4 — one restrained energy pulse (brightness + ring expansion).
      ring.start({
        opacity: [0, 0.45, 0],
        scale: [0.6, 1.7, 1.9],
        transition: { duration: ICON_PULSE_MS / 1000, ease: "easeOut" },
      });
      await icon.start({
        filter: "brightness(1.3)",
        scale: 1.02,
        transition: { duration: ICON_PULSE_MS / 2 / 1000, ease: "easeIn" },
      });
      if (cancelled) return;
      await icon.start({
        filter: "brightness(1.12)",
        scale: 1,
        transition: { duration: ICON_PULSE_MS / 2 / 1000, ease: ease.out },
      });
      if (cancelled) return;

      // Stage 5 — brief settle: the emblem simply rests, illuminated.
      await new Promise((r) => setTimeout(r, ICON_SETTLE_MS));
      if (cancelled) return;

      // Stage 6 — release: a short flare + glow expansion right as the overlay
      // exit (scale to 1.04, fade) carries the icon away and reveals the page.
      icon.start({
        filter: "brightness(1.4)",
        scale: 1.01,
        transition: { duration: ICON_FLARE_MS / 1000, ease: "easeIn" },
      });
      glow.start({
        opacity: 0.65,
        scale: 1.7,
        transition: { duration: ICON_FLARE_MS * 3 / 1000, ease: ease.out },
      });
      if (doneRef.current) return;
      doneRef.current = true;
      onComplete();
    };

    run();

    return () => {
      cancelled = true;
      stopAll();
    };
  }, [reducedMotion, icon, glow, sweep, ring, sheen, crown, onComplete]);

  return (
    <div className="relative">
      {/* Ambient glow behind the icon */}
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-[55%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(59,130,246,0.15) 45%, transparent 70%)",
            filter: "blur(30px)",
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={glow}
          aria-hidden="true"
        />
      )}

      {/* Subtle energy ring released during the pulse */}
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            border: "1px solid rgba(96,216,255,0.4)",
            boxShadow: "0 0 24px rgba(56,189,248,0.12)",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={ring}
          aria-hidden="true"
        />
      )}

      {/* Icon + clipped activation layers */}
      <div className="relative overflow-hidden">
        <motion.img
          src="/sp-net-inc-splash-icon.png"
          alt="SP NET INC"
          draggable={false}
          className="relative block h-auto w-[80px] sm:w-[88px] lg:w-[104px] select-none"
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.94, filter: "brightness(0.7)" }
          }
          animate={icon}
        />

        {!reducedMotion && (
          <>
            {/* Blue/cyan energy sweep travelling bottom → top */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-0 h-[45%]"
              style={{
                background: "linear-gradient(to top, transparent 0%, rgba(56,189,248,0.18) 40%, rgba(125,211,252,0.5) 52%, rgba(59,130,246,0.2) 64%, transparent 100%)",
                mixBlendMode: "screen",
                filter: "blur(7px)",
              }}
              initial={{ y: "280%", opacity: 0 }}
              animate={sweep}
              aria-hidden="true"
            />

            {/* Highlight reflection */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(145deg, rgba(190,227,255,0.28) 0%, rgba(190,227,255,0.05) 35%, transparent 60%)",
                mixBlendMode: "screen",
              }}
              initial={{ opacity: 0 }}
              animate={sheen}
              aria-hidden="true"
            />

            {/* Crown/crystal highlight as the sweep reaches the top */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-0 h-[40%]"
              style={{
                background: "radial-gradient(120% 120% at 50% 0%, rgba(147,219,255,0.5) 0%, rgba(56,189,248,0.18) 40%, transparent 70%)",
                mixBlendMode: "screen",
                filter: "blur(8px)",
              }}
              initial={{ opacity: 0 }}
              animate={crown}
              aria-hidden="true"
            />
          </>
        )}
      </div>
    </div>
  );
}
