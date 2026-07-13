"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Check,
  X,
  Type,
  Download,
  BarChart3,
  Star,
  MessageSquare,
  Shield,
  Globe,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SLOW, NORMAL, FAST, ease, spring } from "@/lib/motion";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { CTASection } from "@/components/ui/CTASection";
import { RelatedPages } from "@/components/ui/RelatedPages";
import {
  FadeIn,
  SectionContainer,
  SectionTitle,
  StaggerFade,
  StaggerItem,
} from "@/components/ui/AnimationPrimitives";

const brandAssets = [
  {
    title: "Primary Logo",
    description:
      "The SP NET INC wordmark should be used as the primary brand identifier. It conveys professionalism, clarity, and the forward-thinking nature of our technology.",
    rule: "Always maintain clear space around the logo equal to the height of the letterform.",
  },
  {
    title: "Logo Variations",
    description:
      "We offer a light version for dark backgrounds and a dark version for light backgrounds. The gradient version may only be used on approved dark surfaces.",
    rule: "Never use the light logo on light backgrounds or the dark logo on dark backgrounds.",
  },
  {
    title: "Icon Mark",
    description:
      "The icon mark may be used as a standalone identifier in constrained spaces such as favicons, app icons, and social media profile images.",
    rule: "The icon mark should never be used in place of the full wordmark in formal contexts.",
  },
];

const logoDos = [
  "Use approved logo files from our media kit",
  "Maintain minimum clear space requirements",
  "Use the logo on approved background colors",
  "Scale proportionally without distortion",
  "Use the high-resolution versions for print",
];

const logoDonts = [
  "Alter the logo colors or gradients",
  "Stretch, skew, or rotate the logo",
  "Add effects like shadows or outlines",
  "Place the logo on busy backgrounds",
  "Use outdated or unofficial logo versions",
];

const typography = [
  {
    name: "Geist Sans",
    usage: "Primary typeface",
    description:
      "Geist Sans is used for all headings, body text, and interface elements. Its clean geometry and excellent readability make it ideal for both digital and print applications.",
    sample: "The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Geist Mono",
    usage: "Code and data",
    description:
      "Geist Mono is used for code blocks, data displays, timestamps, and technical labels. Its consistent character width ensures alignment in tabular and monospaced contexts.",
    sample: "0123456789 SP NET INC",
  },
];

const colors = [
  {
    name: "Primary Blue",
    hex: "#3b82f6",
    usage: "Primary actions, links, highlights",
    swatch: "bg-blue-500",
  },
  {
    name: "Secondary Purple",
    hex: "#8b5cf6",
    usage: "Accents, gradients, secondary highlights",
    swatch: "bg-violet-500",
  },
  {
    name: "Background",
    hex: "#0a0a0a",
    usage: "Page backgrounds, primary surface",
    swatch: "bg-[#0a0a0a] border border-white/10",
  },
  {
    name: "Surface",
    hex: "#111111",
    usage: "Cards, elevated surfaces, panels",
    swatch: "bg-[#111111] border border-white/10",
  },
  {
    name: "Border",
    hex: "rgba(255,255,255,0.04)",
    usage: "Dividers, card borders, subtle separation",
    swatch: "bg-white/[0.04]",
  },
  {
    name: "Text Primary",
    hex: "rgba(255,255,255,0.8)",
    usage: "Headings, important text",
    swatch: "bg-white/80",
  },
];

const voiceGuidelines = [
  {
    tone: "Clear",
    description:
      "We write with precision and clarity. Every sentence earns its place. We avoid jargon, filler, and ambiguity — opting for language that communicates directly.",
    icon: Eye,
  },
  {
    tone: "Confident",
    description:
      "We speak with authority born from deep expertise. We don't hedge, qualify, or undersell. Our voice reflects the quality of our work — assured and intentional.",
    icon: Shield,
  },
  {
    tone: "Human",
    description:
      "Despite building complex technology, our language remains approachable. We write like people, not corporations. Warmth and wit are welcome when they serve clarity.",
    icon: MessageSquare,
  },
  {
    tone: "Forward-looking",
    description:
      "Our voice carries the energy of what's next. We write about the future not as a distant concept but as something we're actively building, right now.",
    icon: Globe,
  },
];

const brandPersonality = [
  {
    trait: "Precise",
    description:
      "Every detail matters. From code to copy, we obsess over accuracy and intentionality. Good enough is never good enough.",
  },
  {
    trait: "Minimal",
    description:
      "We remove until nothing else can be removed. Simplicity isn't a style — it's the result of rigorous thinking and disciplined editing.",
  },
  {
    trait: "Bold",
    description:
      "We take positions. We make decisions. We don't follow trends — we build the things that set them. Confidence is in our DNA.",
  },
  {
    trait: "Invisible",
    description:
      "The best technology is the kind you forget you're using. We build products that dissolve into the workflow, leaving only the outcome.",
  },
];

const stats = [
  { label: "Brand Colors", value: "6", icon: Palette },
  { label: "Typefaces", value: "2", icon: Type },
  { label: "Logo Variants", value: "3", icon: Star },
  { label: "Voice Pillars", value: "4", icon: MessageSquare },
];

const faqItems = [
  {
    question: "Can I use the SP NET INC logo on my website?",
    answer:
      "Yes, provided you follow our brand guidelines. Download approved logo files from our media kit and use them in accordance with our usage rules. For any non-standard use cases, contact savan@sp-net.in for approval.",
  },
  {
    question: "What are the official SP NET INC brand colors?",
    answer:
      "Our primary color is #3b82f6 (blue), with #8b5cf6 (purple) as the secondary accent. The background color is #0a0a0a. These colors should be used consistently across all brand touchpoints.",
  },
  {
    question: "What typefaces does SP NET INC use?",
    answer:
      "SP NET INC uses Geist Sans as the primary typeface for all text and Geist Mono for code, data, and technical labels. Both are modern, highly readable typefaces designed for digital interfaces.",
  },
  {
    question: "How should I describe SP NET INC in writing?",
    answer:
      "Describe SP NET INC as a technology company building infrastructure for modern communication, enterprise administration, and intelligent automation. Our voice is clear, confident, human, and forward-looking.",
  },
  {
    question: "Where can I download official brand assets?",
    answer:
      "Official brand assets including logos, colors, and typography specifications are available in our media kit. Visit /resources/media-kit for downloads, or contact us for custom asset requests.",
  },
];

export default function BrandClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Brand" },
        ]}
        label="Company"
        title="Brand"
        titleAccent="Official brand guidelines"
        description="The visual identity, voice, and guidelines that define how SP NET INC presents itself to the world."
        icon={<Palette className="h-4 w-4" />}
      />

      <SectionContainer id="introduction">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Our brand is
                <br />
                <span className="text-white/40">our promise</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  The SP NET INC brand is more than a logo or a color palette —
                  it&apos;s a reflection of what we believe. That technology should
                  be precise, minimal, bold, and invisible. That every pixel,
                  every word, and every interaction should earn its place.
                </p>
                <p>
                  These guidelines ensure consistency across every touchpoint —
                  from product interfaces to press materials. Consistency
                  builds trust, and trust is the foundation of every great
                  brand.
                </p>
              </div>
            </FadeIn>
          </div>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Brand Assets"
            title="Logo and identity"
            subtitle="Our logo is the cornerstone of our visual identity. Use it with care and consistency."
          />

          <div className="space-y-4">
            {brandAssets.map((asset, i) => (
              <FadeIn key={asset.title} delay={i * 0.06}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <span className="text-lg font-semibold text-white/40">
                        SP
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white/60 mb-2">
                        {asset.title}
                      </h3>
                      <p className="text-sm text-white/30 leading-relaxed mb-3">
                        {asset.description}
                      </p>
                      <div className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-400/60 mt-0.5 shrink-0" />
                        <p className="text-xs text-white/25 leading-relaxed">
                          {asset.rule}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Logo Usage"
            title="Do's and don'ts"
            subtitle="Protecting brand integrity through consistent logo application."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FadeIn delay={0}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10">
                    <Check className="h-3.5 w-3.5 text-emerald-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/50">
                    Do&apos;s
                  </h3>
                </div>
                <ul className="space-y-3">
                  {logoDos.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400/40 mt-0.5 shrink-0" />
                      <span className="text-sm text-white/30 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.06}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-red-500/10">
                    <X className="h-3.5 w-3.5 text-red-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/50">
                    Don&apos;ts
                  </h3>
                </div>
                <ul className="space-y-3">
                  {logoDonts.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <X className="h-3.5 w-3.5 text-red-400/40 mt-0.5 shrink-0" />
                      <span className="text-sm text-white/30 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Typography"
            title="Geist typeface family"
            subtitle="Clean, modern, and designed for the interfaces of tomorrow."
          />

          <StaggerFade className="space-y-4" staggerDelay={0.08}>
            {typography.map((font) => (
              <StaggerItem key={font.name}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-base font-medium text-white/60">
                        {font.name}
                      </h3>
                      <p className="text-xs text-white/25 mt-1">
                        {font.usage}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-white/30 leading-relaxed mb-5">
                    {font.description}
                  </p>
                  <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-5 py-4">
                    <p className="text-xl sm:text-2xl text-white/50 tracking-tight">
                      {font.sample}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Colors"
            title="Color palette"
            subtitle="A precise palette designed for dark interfaces with moments of vibrant clarity."
          />

          <StaggerFade className="grid grid-cols-2 sm:grid-cols-3 gap-4" staggerDelay={0.05}>
            {colors.map((color) => (
              <StaggerItem key={color.name}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] overflow-hidden">
                  <div className={cn("h-20 sm:h-24 w-full", color.swatch)} />
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-white/60 mb-1">
                      {color.name}
                    </h3>
                    <p className="text-xs font-mono text-white/30 mb-2">
                      {color.hex}
                    </p>
                    <p className="text-[11px] text-white/20 leading-relaxed">
                      {color.usage}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Brand Voice"
            title="How we communicate"
            subtitle="Four pillars that guide every word we write and every message we share."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.06}>
            {voiceGuidelines.map((guideline) => (
              <StaggerItem key={guideline.tone}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] mb-5">
                    <guideline.icon className="h-5 w-5 text-white/40" />
                  </div>
                  <h3 className="text-base font-medium text-white/60 mb-2">
                    {guideline.tone}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {guideline.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Brand Personality"
            title="What we stand for"
            subtitle="Four traits that define the SP NET INC character."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.06}>
            {brandPersonality.map((trait, i) => (
              <StaggerItem key={trait.trait}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-white/30 mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-medium text-white/60 mb-2">
                    {trait.trait}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {trait.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Download"
            title="Brand assets"
            subtitle="Official logos, colors, and typography specifications for authorized use."
          />

          <FadeIn>
            <div className="rounded-xl border border-dashed border-white/[0.06] bg-white/[0.01] p-8 sm:p-12 text-center">
              <Download className="h-8 w-8 text-white/15 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white/50 mb-2">
                Brand kit coming soon
              </h3>
              <p className="text-sm text-white/25 max-w-md mx-auto leading-relaxed">
                We are preparing a comprehensive brand kit with vector logos,
                color palettes, typography files, and usage guidelines. In the
                meantime, contact us for immediate asset requests.
              </p>
            </div>
          </FadeIn>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="By the Numbers"
            title="Brand at a glance"
          />

          <StaggerFade className="grid grid-cols-2 sm:grid-cols-4 gap-4" staggerDelay={0.06}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 text-center">
                  <stat.icon className="h-4 w-4 text-white/20 mx-auto mb-3" />
                  <p className="text-2xl sm:text-3xl font-semibold text-white/60 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/25">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      <FAQ title="Brand FAQ" items={faqItems} />

      <RelatedPages
        title="Related Pages"
        pages={[
          {
            title: "Media Kit",
            description:
              "Download official brand assets, logos, and press information.",
            href: "/resources/media-kit",
          },
          {
            title: "About SP NET INC",
            description:
              "Learn about the company, its mission, and the team behind the brand.",
            href: "/company/about",
          },
          {
            title: "Contact",
            description:
              "Get in touch for brand asset requests and usage permissions.",
            href: "/get-in-touch",
          },
          {
            title: "Newsroom",
            description:
              "Company announcements and updates from SP NET INC.",
            href: "/company/newsroom",
          },
          {
            title: "Partners",
            description:
              "Strategic collaborations and technology partnerships.",
            href: "/company/partners",
          },
          {
            title: "Products",
            description:
              "Explore the SP NET product ecosystem.",
            href: "/products/sp-net-ecosystem",
          },
        ]}
      />

      <CTASection
        title="Need brand assets?"
        titleAccent="let&apos;s talk"
        description="For brand asset requests, usage permissions, or partnership inquiries — we&apos;re here to help you represent SP NET INC accurately."
        primaryAction={{ label: "Contact us", href: "mailto:savan@sp-net.in" }}
        secondaryAction={{ label: "Media kit", href: "/resources/media-kit" }}
      />
    </>
  );
}
