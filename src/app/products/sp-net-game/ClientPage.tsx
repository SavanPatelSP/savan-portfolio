"use client";

import { motion } from "framer-motion";
import {
  Gamepad2,
  MonitorPlay,
  Smartphone,
  Users,
  Palette,
  Store,
  Radio,
  Shield,
  Zap,
  Globe,
  Wifi,
  Joystick,
} from "lucide-react";
import { ease, spring, NORMAL } from "@/lib/motion";
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

const features = [
  {
    icon: MonitorPlay,
    title: "Cloud Game Streaming",
    description:
      "Play AAA-quality games on any device through cloud streaming. No expensive hardware required — just a screen and an internet connection.",
  },
  {
    icon: Smartphone,
    title: "Cross-Device Play",
    description:
      "Start a game on your desktop, continue on your tablet, pick up on your phone. Your progress, settings, and achievements sync across every device.",
  },
  {
    icon: Users,
    title: "Social Gaming",
    description:
      "Play together with friends through integrated voice chat, party systems, friend lists, and shared game sessions. Gaming is better when it is social.",
  },
  {
    icon: Palette,
    title: "Creator Tools",
    description:
      "Game development tools, asset libraries, and publishing pipelines designed for indie developers. Build, publish, and monetize games on the SP NET platform.",
  },
  {
    icon: Store,
    title: "Game Marketplace",
    description:
      "A curated marketplace for discovering and purchasing games. Fair revenue sharing, transparent analytics, and direct developer-to-player connections.",
  },
  {
    icon: Radio,
    title: "Live Events",
    description:
      "In-game events, tournaments, and live streaming integration. Create community moments that keep players engaged and coming back.",
  },
];

const capabilities = [
  {
    icon: Shield,
    title: "Anti-Cheat & Fair Play",
    description: "Server-side validation and behavioral analysis to ensure competitive integrity across all multiplayer experiences.",
  },
  {
    icon: Zap,
    title: "Low-Latency Streaming",
    description: "Custom video codec and adaptive bitrate streaming deliver sub-30ms input latency for competitive gaming.",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description: "Game servers deployed across 50+ regions worldwide. Play with minimal latency no matter where you are.",
  },
  {
    icon: Wifi,
    title: "Offline Play Support",
    description: "Download games for offline play with smart sync when you reconnect. Your progress is never lost.",
  },
  {
    icon: Joystick,
    title: "Controller Support",
    description: "Native support for Xbox, PlayStation, Switch, and generic HID controllers with automatic mapping.",
  },
];

const faqItems = [
  {
    question: "What is SP NET GAME?",
    answer: "SP NET GAME is a gaming platform that explores cloud-native game streaming, cross-device play, social gaming experiences, and creator tools for indie developers. It is designed to make high-quality gaming accessible on any device.",
  },
  {
    question: "What kind of games will be available?",
    answer: "SP NET GAME will support a wide range of genres — from indie titles to cloud-streamed AAA experiences. The platform is being designed to be open to indie developers through our creator tools while also supporting major publishers through our streaming infrastructure.",
  },
  {
    question: "How does cloud streaming work?",
    answer: "Games run on SP NET Cloud servers and stream video to your device in real time. Your inputs are sent back to the server with sub-30ms latency. This means you can play graphically demanding games on devices that could not normally run them — including phones, tablets, and low-spec laptops.",
  },
  {
    question: "Can indie developers publish on SP NET GAME?",
    answer: "Yes. SP NET GAME is being designed with indie developers in mind. Creator tools, asset libraries, and a fair revenue sharing model make it easy to build, publish, and monetize games on the platform.",
  },
  {
    question: "Is SP NET GAME available now?",
    answer: "SP NET GAME is currently a future initiative. Cloud streaming technology, game partnerships, and creator tools are in early research and development. Join the waitlist for updates on our progress.",
  },
  {
    question: "How can I get in touch or learn more?",
    answer: "For any inquiries about SP NET GAME, reach out to our Personal Communication Assistant (PCA) at https://t.me/SAVANPATELSP_BOT — it is the recommended first point of contact for questions, feedback, and support. You can also email us at hello@sp-net.in or business@sp-net.in. For scheduling a meeting, visit cal.com/savanpatel.",
  },
];

const relatedPages = [
  {
    title: "SP NET Cloud",
    description: "Cloud infrastructure powering the game streaming platform.",
    href: "/products/sp-net-cloud",
  },
  {
    title: "SP NET AI",
    description: "AI-powered matchmaking, anti-cheat, and game recommendations.",
    href: "/products/sp-net-ai",
  },
  {
    title: "SP NET GRAM",
    description: "Social messaging integrated with gaming experiences.",
    href: "/products/sp-net-gram",
  },
  {
    title: "SP NET WORKPLACE",
    description: "Collaboration tools for game development teams.",
    href: "/products/sp-net-workplace",
  },
  {
    title: "SP NET Ecosystem",
    description: "The connected platform all SP NET products share.",
    href: "/products/sp-net-ecosystem",
  },
  {
    title: "About Savan Patel",
    description: "The founder and product engineer behind SP NET INC.",
    href: "/founder/about",
  },
];

export default function SPNetGameClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "SP NET GAME" }]}
        label="Innovation Lab"
        badge="Coming Soon"
        title="SP NET GAME"
        titleAccent="Interactive entertainment reimagined"
        description="A gaming platform exploring cloud-native game streaming, cross-device play, social gaming experiences, and creator tools for indie developers."
        icon={<Gamepad2 className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="Introduction"
            title="Gaming without boundaries"
            subtitle="SP NET GAME explores how cloud streaming and cross-device technology can make high-quality gaming accessible to everyone — regardless of the device they own."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                Gaming today is fragmented by hardware. Console players, PC gamers, and mobile
                gamers exist in separate ecosystems with separate stores, separate friend lists,
                and separate experiences. The best games are locked behind expensive hardware,
                while the most accessible platforms are limited to casual experiences.
              </p>
              <p>
                SP NET GAME explores a different model — one where the game runs in the cloud
                and streams to any device with a screen. This means a phone can run the same
                game as a high-end PC, with the same visual quality and the same competitive
                experience. Your game library, your friends, and your progress follow you
                everywhere.
              </p>
              <p>
                Beyond streaming, SP NET GAME is being designed as a complete platform for
                both players and creators. Indie developers get tools to build and publish games
                without needing a publisher, while players get a curated marketplace and social
                features that make gaming a shared experience.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Features"
          title="A new model for gaming"
          subtitle="Six core capabilities that redefine what a gaming platform can be."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={spring.gentle}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/8 text-rose-400 border border-rose-500/10">
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70">{feature.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Technology"
          title="Built for performance"
          subtitle="The technical foundation that makes cloud gaming viable at scale."
        />

        <StaggerFade staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((cap) => (
            <StaggerItem key={cap.title}>
              <div className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30">
                  <cap.icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 mb-1.5">{cap.title}</h3>
                  <p className="text-xs text-white/20 leading-relaxed">{cap.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <FAQ title="Frequently Asked Questions" items={faqItems} />

      <RelatedPages title="Explore More" pages={relatedPages} />

      <CTASection
        title="Ready for the future of gaming?"
        description="SP NET GAME is being built to make high-quality gaming accessible to everyone. Join the waitlist for updates."
        primaryAction={{ label: "Join the Waitlist", href: "/get-in-touch" }}
        secondaryAction={{ label: "Back to Products", href: "/products" }}
      />
    </>
  );
}
