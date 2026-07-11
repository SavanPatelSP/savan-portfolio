"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Building2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { products, futureProducts } from "@/data/products";
import { SectionContainer, FadeIn, Reveal, BlurReveal, StaggerFade, StaggerItem, SectionTitle, ParallaxContainer } from "@/components/ui/AnimationPrimitives";
import { Badge } from "@/components/ui/Badge";
import { ProductStatus } from "@/components/products/ProductStatus";
import { ease, spring, FAST, NORMAL, SLOW } from "@/lib/motion";

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "beta" }> = {
  building: { label: "Active Development", variant: "warning" },
  researching: { label: "Research & Development", variant: "warning" },
};

function MessageCircle(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={props.className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

const productIcons: Record<string, React.ElementType> = {
  "sp-net-gram": MessageCircle,
  "sp-net-admin-os": Building2,
  "sp-net-ai": Bot,
};

const productMilestones: Record<string, { phase: string; progress: number }> = {
  "sp-net-gram": { phase: "Core Architecture Complete", progress: 65 },
  "sp-net-admin-os": { phase: "Platform Foundation", progress: 50 },
  "sp-net-ai": { phase: "Research & Prototyping", progress: 25 },
};

function ProductShowcase({ product, index }: { product: typeof products[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = productIcons[product.id];
  const milestone = productMilestones[product.id];

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: SLOW, ease: ease.out }}
      whileHover={{ y: -6, scale: 1.005 }}
    >
      {/* Animated border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={isHovered ? {
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.10), 0 20px 60px -15px rgba(0,0,0,0.4), 0 0 40px -20px ${product.color}15`,
        } : {
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.1)`,
        }}
        transition={{ duration: 0.4, ease: ease.out }}
      />

      {/* Premium gradient header bar */}
      <motion.div
        className="absolute top-0 inset-x-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${product.color}, ${product.color}88, transparent)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0.5 }}
        transition={{ duration: FAST }}
        aria-hidden="true"
      />

      {/* Soft moving radial highlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at 50% 50%, ${product.color}08, transparent 60%)`,
        }}
        animate={isHovered ? { opacity: 1, scale: 1.05 } : { opacity: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: ease.out }}
        aria-hidden="true"
      />

      {/* Background gradient movement */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.01) 0%, ${product.color}04 50%, transparent 100%)`,
          backgroundSize: "200% 200%",
        }}
        animate={isHovered ? { backgroundPosition: ["0% 0%", "100% 100%"] } : { backgroundPosition: "0% 0%" }}
        transition={{ duration: 3, ease: "linear", repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative border border-transparent rounded-3xl p-5 sm:p-6 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div className={cn(index % 2 === 1 && "lg:order-2", "text-center sm:text-left")}>
            {/* Icon + Status */}
            <FadeIn delay={0.1 * index}>
              <div className="flex items-center gap-3 mb-4 justify-center sm:justify-start">
                {/* Floating icon */}
                <motion.div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${product.color}22, ${product.color}11)`,
                    border: `1px solid ${product.color}33`,
                  }}
                  animate={isHovered ? { y: -3, rotate: 3 } : { y: 0, rotate: 0 }}
                  transition={spring.gentle}
                >
                  {Icon && <Icon className="h-6 w-6" style={{ color: product.color }} />}
                </motion.div>
                <Badge variant={statusConfig[product.status].variant}>
                  {statusConfig[product.status].label}
                </Badge>
              </div>
            </FadeIn>

            {/* Name */}
            <Reveal delay={0.15 + 0.05 * index}>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white mt-2">
                {product.name}
              </h3>
            </Reveal>

            {/* Tagline */}
            <BlurReveal delay={0.18 + 0.05 * index}>
              <p className="text-sm text-white/30 font-medium mt-1 tracking-wide">
                {product.tagline}
              </p>
            </BlurReveal>

            {/* Description */}
            <BlurReveal delay={0.2 + 0.05 * index}>
              <p className="text-sm text-white/40 leading-relaxed mt-4 max-w-xl">
                {product.description}
              </p>
            </BlurReveal>

            {/* Highlights */}
            <StaggerFade staggerDelay={0.04} className="mt-5 flex flex-wrap gap-2 justify-center sm:justify-start">
              {product.highlights.map((t) => (
                <StaggerItem key={t}>
                  <Badge>{t}</Badge>
                </StaggerItem>
              ))}
            </StaggerFade>

            {/* Premium product status */}
            <FadeIn delay={0.25 + 0.05 * index}>
              <div className="mt-4">
                <ProductStatus />
              </div>
            </FadeIn>

            {/* Features */}
            <FadeIn delay={0.3 + 0.05 * index}>
              <div className="mt-6 space-y-3">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-white/40 justify-center sm:justify-start">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: product.color }}
                      animate={isHovered ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    {f}
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Roadmap progress */}
            {milestone && (
              <FadeIn delay={0.35 + 0.05 * index}>
                <div className="mt-6 flex items-center gap-3 text-xs text-white/25 justify-center sm:justify-start flex-wrap">
                  <Clock className="h-3 w-3" />
                  <span>{milestone.phase}</span>
                  <div className="flex-1 max-w-[120px] h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: product.color }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${milestone.progress}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.6, ease: ease.out }}
                    />
                  </div>
                  <span className="font-mono">{milestone.progress}%</span>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Device mockup */}
          <div className={cn(index % 2 === 1 && "lg:order-1")}>
            <ParallaxContainer speed={0.1}>
              <motion.div
                className="relative w-full max-w-lg mx-auto"
                animate={isHovered ? { y: -4 } : { y: 0 }}
                transition={{ duration: 0.4, ease: ease.out }}
              >
                <div className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm overflow-hidden shadow-2xl">
                  {/* Window chrome */}
                  <div className="flex items-center gap-2 px-4 h-10 border-b border-white/[0.04]">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    </div>
                    {Icon && (
                      <Icon className="ml-3 h-3.5 w-3.5" style={{ color: product.color, opacity: 0.5 }} />
                    )}
                    <div className="ml-2 flex-1 max-w-[200px] h-5 rounded-md bg-white/[0.04]" />
                  </div>

                  {/* Mockup content */}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${product.color}22, ${product.color}11)`,
                          border: `1px solid ${product.color}33`,
                        }}
                      >
                        {Icon && <Icon className="h-5 w-5" style={{ color: product.color }} />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{product.name}</div>
                        <div className="text-xs text-white/30">{product.tagline}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {product.features.slice(0, 4).map((f) => (
                        <div key={f} className="flex items-center gap-2.5 text-xs text-white/40">
                          <span
                            className="h-1 w-1 rounded-full shrink-0"
                            style={{ backgroundColor: product.color, opacity: 0.5 }}
                          />
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {product.highlights.slice(0, 4).map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </ParallaxContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FutureProductCard({
  product,
  index,
}: {
  product: typeof futureProducts[number];
  index: number;
}) {
  return (
    <motion.div
      className="group relative rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-8 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: NORMAL, ease: ease.out }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}
        whileHover={{ boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.10), 0 8px 40px -12px ${product.color}15` }}
        transition={{ duration: 0.3 }}
      />
      <div
        className="absolute -top-20 -right-20 h-40 w-40 opacity-[0.03]"
        style={{
          background: `radial-gradient(circle, ${product.color}, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className={cn(
            "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center",
            product.gradient
          )}
          whileHover={{ rotate: 5, y: -2 }}
          transition={spring.gentle}
        >
          <Clock className="h-5 w-5 text-white" />
        </motion.div>
        <div>
          <h3 className="text-sm font-medium text-white">{product.name}</h3>
          <Badge variant="beta">Coming Soon</Badge>
        </div>
      </div>
      <p className="text-sm text-white/30 leading-relaxed">{product.description}</p>
      <div className="mt-4 flex items-center gap-2 text-[11px] text-white/15 font-mono">
        <Clock className="h-3 w-3" />
        {product.eta}
      </div>
    </motion.div>
  );
}

export function ProductsSection() {
  return (
    <ParallaxContainer speed={0.03}>
      <SectionContainer id="products" className="bg-black relative">
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />

        <SectionTitle
          label="Products"
          title="What I'm building"
          subtitle="Every product I design is built with intention. Each one solves a real problem at scale."
        />

        <div className="space-y-12">
          {products.map((product, i) => (
            <ProductShowcase key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-12 sm:mt-16">
          <Reveal delay={0.1}>
            <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-white/20 mb-6 text-center sm:text-left">On the horizon</h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {futureProducts.map((product, i) => (
              <FutureProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </ParallaxContainer>
  );
}
