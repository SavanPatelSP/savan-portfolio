"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, Sparkles, Terminal, Code } from "lucide-react";
import { personal } from "@/data/personal";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

function useMousePosition() {
  const pos = useRef({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      pos.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

function Particles({ count = 100 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1 + 0.3,
        alpha: Math.random() * 0.25 + 0.03,
      });
    }

    // Add some connected lines
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`;
        ctx.fill();
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}

function CursorBlink() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);
  return (
    <span
      className={cn(
        "inline-block w-[2px] h-[1em] bg-blue-400/60 align-middle ml-0.5 transition-opacity duration-100",
        visible ? "opacity-100" : "opacity-0"
      )}
    />
  );
}

function TerminalBadge() {
  return (
    <motion.div
      className="group inline-flex items-center gap-2.5 rounded-xl border border-blue-500/15 bg-blue-500/[0.04] px-4 py-2 hover:bg-blue-500/[0.08] hover:border-blue-500/25 transition-all duration-300 cursor-default"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Terminal className="h-3.5 w-3.5 text-blue-400/60 group-hover:text-blue-400/80 transition-colors" />
      <span className="text-xs font-mono text-blue-400/50 group-hover:text-blue-400/70 transition-colors">
        {'>'} First line of code in {personal.firstCode}
      </span>
      <CursorBlink />
    </motion.div>
  );
}

function FloatingProductCard({
  product,
  index,
  isInView,
}: {
  product: typeof products[number];
  index: number;
  isInView: boolean;
}) {
  const positions = [
    { x: "-8%", y: "18%", rotate: -4 },
    { x: "80%", y: "12%", rotate: 3 },
    { x: "6%", y: "58%", rotate: 5 },
    { x: "76%", y: "62%", rotate: -3 },
  ];
  const pos = positions[index] ?? positions[0];

  return (
    <motion.div
      className="pointer-events-none absolute z-[3] hidden lg:block"
      style={{ left: pos.x, top: pos.y }}
      initial={{ opacity: 0, x: pos.rotate > 0 ? 40 : -40, rotate: pos.rotate }}
      animate={isInView ? { opacity: 1, x: 0, rotate: pos.rotate } : {}}
      transition={{ delay: 1 + index * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        className="rounded-xl border border-white/[0.06] bg-black/60 backdrop-blur-xl p-3 shadow-2xl"
        style={{ transform: `rotate(${pos.rotate}deg)` }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "h-7 w-7 rounded-lg bg-gradient-to-br flex items-center justify-center text-xs font-semibold text-white",
              product.gradient
            )}
          >
            {product.name[0]}
          </div>
          <div className="text-left">
            <div className="text-xs font-medium text-white/80">{product.name}</div>
            <div className="text-[10px] text-white/30">{product.tagline}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const mouse = useMousePosition();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const [magneticPos2, setMagneticPos2] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLDivElement>(null);
  const btnRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const handleMagnetic = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setMagneticPos({ x, y });
  };

  const resetMagnetic = () => setMagneticPos({ x: 0, y: 0 });

  const handleMagnetic2 = (e: React.MouseEvent) => {
    if (!btnRef2.current) return;
    const rect = btnRef2.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setMagneticPos2({ x, y });
  };

  const resetMagnetic2 = () => setMagneticPos2({ x: 0, y: 0 });

  const scrollNext = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 60%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 60%)",
          }}
        />
      </div>

      {/* Particles with connections */}
      <Particles count={100} />

      {/* Ambient glow follow mouse */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(900px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.08) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Premium ambient orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
            transform: `translate(${mouse.current.x * 25}px, ${mouse.current.y * 25}px)`,
            transition: "transform 2s ease-out",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
            transform: `translate(${-mouse.current.x * 20}px, ${-mouse.current.y * 20}px)`,
            transition: "transform 2s ease-out",
          }}
        />
      </div>

      {/* Mesh gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-transparent to-purple-500" />
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent z-[2]" />

      {/* Floating product cards */}
      {products.slice(0, 4).map((p, i) => (
        <FloatingProductCard key={p.id} product={p} index={i} isInView={isInView} />
      ))}

      {/* Hero content */}
      <div className="relative z-[3] mx-auto max-w-6xl px-4 text-center">
        {/* Roles badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/10 bg-blue-500/[0.04] px-4 py-1.5 text-xs font-medium text-blue-400/60 tracking-[0.15em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400/60 animate-pulse-soft" />
            {personal.roles.join(" • ")}
          </span>
        </motion.div>

        {/* Gigantic name */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11rem] font-bold tracking-tight text-white leading-[0.85]"
            initial={{ y: "120%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {personal.name}
          </motion.h1>
        </div>

        {/* Animated subtitle */}
        <div className="overflow-hidden mt-3">
          <motion.p
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/30 font-light tracking-tight"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {personal.tagline}
          </motion.p>
        </div>

        {/* Founder statement */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-white/25 leading-relaxed font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {personal.founderStatement}
        </motion.p>

        {/* Terminal badge */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <TerminalBadge />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <div
            ref={btnRef}
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
          >
            <motion.a
              href="#products"
              className="group relative inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-black hover:bg-white/90 transition-all duration-300 overflow-hidden shadow-2xl shadow-blue-500/10"
              animate={{ x: magneticPos.x, y: magneticPos.y }}
              transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
            >
              <span className="relative z-[1]">Explore products</span>
              <ArrowDown className="relative z-[1] h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
          <div
            ref={btnRef2}
            onMouseMove={handleMagnetic2}
            onMouseLeave={resetMagnetic2}
          >
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center gap-2.5 rounded-xl border border-white/10 px-7 py-3.5 text-sm font-medium text-white/50 hover:text-white hover:border-white/20 transition-all duration-300 overflow-hidden"
              animate={{ x: magneticPos2.x, y: magneticPos2.y }}
              transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
            >
              <span className="relative z-[1]">Get in touch</span>
              <Sparkles className="relative z-[1] h-3.5 w-3.5 group-hover:rotate-12 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollNext}
        className="absolute bottom-8 left-1/2 z-[3] -translate-x-1/2 text-white/10 hover:text-white/30 transition-colors"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-label="Scroll to content"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
