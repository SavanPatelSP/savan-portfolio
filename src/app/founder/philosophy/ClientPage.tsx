"use client";

import { motion } from "framer-motion";
import { Compass, BookOpen, Code2, Sparkles, Globe, Layers, Zap, Shield, Target } from "lucide-react";
import { spring } from "@/lib/motion";
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

const principles = [
  {
    title: "Craft over scale",
    description:
      "Every detail matters. Build for the one, then the many.",
    detailed:
      "Scale is a consequence of doing things well, not a goal in itself. When you obsess over the details of a single experience — the way a button feels, the clarity of an error message, the elegance of an API — you create something people genuinely want to use. Scale follows craft. We design every feature as if it will be used by one person who deserves our full attention.",
    icon: Sparkles,
  },
  {
    title: "Simplicity is the ultimate sophistication",
    description:
      "The best solutions feel obvious in hindsight. Remove until nothing else can be removed.",
    detailed:
      "Complexity is easy. Anyone can add features, layers, and abstractions. The hard part is restraint. Simplicity requires understanding a problem so deeply that the solution becomes inevitable. We constantly ask: what can we remove? What can we merge? What can we defer? Every interaction should feel effortless — not because it is simple, but because the complexity was absorbed by thoughtful design.",
    icon: Layers,
  },
  {
    title: "Ship to learn",
    description:
      "Done is better than perfect. Real feedback comes from real users.",
    detailed:
      "The gap between what we imagine and what users need is always wider than we expect. Shipping early and often is not about cutting corners — it is about respecting the truth that only exists in the hands of real people. Every release is a hypothesis. Every metric is a lesson. We build iteratively, measuring what matters and discarding what does not.",
    icon: Zap,
  },
  {
    title: "Open by default",
    description:
      "Great software belongs to everyone. Transparency builds trust.",
    detailed:
      "When you build in the open, you invite accountability, collaboration, and community. Open source is not just a licensing decision — it is a philosophy of respect. We share our work because we believe the best products emerge when people can see how things are made, contribute improvements, and build on top of what exists. Transparency is a feature, not a vulnerability.",
    icon: Globe,
  },
];

const faqItems = [
  {
    question: "How does SP NET approach product development differently?",
    answer:
      "We start with a single user, not a market segment. Every product begins by solving a specific, real problem for a real person. Once the core experience is right — once it feels inevitable and effortless — we expand. This is the opposite of the typical build-it-wide-first approach, and it is why our products feel cohesive even as they grow.",
  },
  {
    question: "Why is simplicity such a core value?",
    answer:
      "Because complexity is the silent killer of software. It creeps in through edge cases, feature requests, and premature optimization. Simplicity requires active resistance — constantly questioning whether every line of code, every UI element, and every feature is earning its place. The products we admire most share this trait: they do less, but they do it exceptionally well.",
  },
  {
    question: "What does 'open by default' mean in practice?",
    answer:
      "Our open source projects are currently private as products mature. The philosophy of openness still guides our internal development process — decisions are documented, roadmaps are maintained, and contributions will be welcomed when repositories are made public. The goal is to share foundations like design systems and utility libraries with the community once they reach a stable state.",
  },
  {
    question: "How do you balance quality with speed?",
    answer:
      "We do not treat them as opposites. The key is scoping ruthlessly. Instead of doing everything at mediocre quality, we do a small number of things at exceptional quality. Speed comes from focus, not from cutting corners. When the scope is small and the team is aligned, you can move fast and maintain high standards simultaneously.",
  },
  {
    question: "Is this philosophy scalable as the company grows?",
    answer:
      "These principles become more important as we grow, not less. Larger teams need clearer values to stay aligned. Our principles act as decision-making shortcuts — when someone is unsure what to do, they can default to shipping early, keeping things simple, and being transparent. Culture scales through principles, not processes.",
  },
];

const relatedPages = [
  {
    title: "About Savan Patel",
    description: "Background, experience, and the person behind SP NET INC.",
    href: "/founder/about",
  },
  {
    title: "Journey",
    description: "From the first line of code to founding a company.",
    href: "/founder/journey",
  },
  {
    title: "Roadmap",
    description: "What is next for SP NET INC and its products.",
    href: "/founder/roadmap",
  },
  {
    title: "SP NET GRAM",
    description: "Messaging reimagined for modern teams.",
    href: "/products/sp-net-gram",
  },
  {
    title: "SP NET ADMIN OS",
    description: "Enterprise administration built for the modern web.",
    href: "/products/sp-net-admin-os",
  },
  {
    title: "SP NET AI",
    description: "Intelligence powering the SP NET ecosystem.",
    href: "/products/sp-net-ai",
  },
];

export default function PhilosophyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Founder", href: "/founder" },
          { label: "Engineering Philosophy" },
        ]}
        label="Philosophy"
        title="Engineering Philosophy"
        titleAccent="Principles that guide every decision"
        description="Software is a craft. These are the principles that shape every product, every line of code, and every decision at SP NET INC."
        icon={<Compass className="h-4 w-4" />}
      />

      <SectionContainer>
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Introduction"
            title="Why philosophy matters"
            subtitle="Engineering is not just about writing code. It is about making decisions under uncertainty, with incomplete information, under real constraints. A philosophy does not eliminate uncertainty — it gives you a framework for navigating it consistently."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-white/30 text-base leading-relaxed">
              <p>
                When I started writing code in 2018, I did not have a philosophy. I had curiosity, a
                terminal, and a willingness to break things. Over the years — through building products,
                studying systems, and learning from failures — a set of principles emerged. Not from
                books or conferences, but from the patterns that consistently led to better outcomes.
              </p>
              <p>
                These principles are not dogma. They are living ideas that evolve as we learn. But they
                provide a foundation. When a new feature request comes in, when a technical decision
                needs to be made, when we choose between speed and quality — these principles guide
                the conversation.
              </p>
              <p>
                SP NET INC was built on the belief that software can be both ambitious and restrained,
                both powerful and simple. That is what this philosophy is about: the discipline to do
                less, the courage to ship early, and the conviction that openness makes everything
                better.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            label="Core Principles"
            title="Four principles"
            subtitle="These are the pillars every decision at SP NET INC is measured against. If a choice violates these principles, we reconsider it."
          />

          <StaggerFade className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {principles.map((p) => (
              <StaggerItem key={p.title}>
                <motion.div
                  className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                      <p.icon className="h-5 w-5 text-white/40" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
                      {principles.indexOf(p) + 1 < 10
                        ? `0${principles.indexOf(p) + 1}`
                        : `${principles.indexOf(p) + 1}`}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white/80 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/35 italic mb-4">
                    &ldquo;{p.description}&rdquo;
                  </p>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {p.detailed}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Approach"
            title="How we build"
            subtitle="Building software is a series of trade-offs. Our approach is designed to minimize waste, maximize learning, and maintain quality at every stage."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-10">
              <div className="relative pl-6 border-l border-white/[0.06]">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-blue-500/50 -translate-x-[5px]" />
                <h3 className="text-base font-medium text-white/60 mb-2">
                  Start with the problem, not the solution
                </h3>
                <p className="text-sm text-white/30 leading-relaxed">
                  Every feature begins with a clear articulation of the problem it solves. Not
                  &ldquo;we need a chat feature&rdquo; but &ldquo;users lose context switching between
                  three tools to communicate with their team.&rdquo; Framing problems correctly
                  prevents building the wrong thing elegantly.
                </p>
              </div>

              <div className="relative pl-6 border-l border-white/[0.06]">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-violet-500/50 -translate-x-[5px]" />
                <h3 className="text-base font-medium text-white/60 mb-2">
                  Build the smallest possible thing
                </h3>
                <p className="text-sm text-white/30 leading-relaxed">
                  The first version of any feature should be embarrassingly small. If you are not a
                  little embarrassed by v1, you waited too long to ship. The goal is to get the core
                  interaction right before adding layers of polish and capability. A focused MVP
                  teaches more than a comprehensive prototype.
                </p>
              </div>

              <div className="relative pl-6 border-l border-white/[0.06]">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-emerald-500/50 -translate-x-[5px]" />
                <h3 className="text-base font-medium text-white/60 mb-2">
                  Measure what matters
                </h3>
                <p className="text-sm text-white/30 leading-relaxed">
                  Vanity metrics are noise. We focus on the few numbers that directly indicate
                  whether users are getting value: retention, task completion rate, time-to-value.
                  Every feature ships with a clear hypothesis about what it should move, and we
                  measure ruthlessly.
                </p>
              </div>

              <div className="relative pl-6 border-l border-white/[0.06]">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-amber-500/50 -translate-x-[5px]" />
                <h3 className="text-base font-medium text-white/60 mb-2">
                  Iterate with intention
                </h3>
                <p className="text-sm text-white/30 leading-relaxed">
                  Iteration without direction is just churn. Each cycle should have a clear goal:
                  validate an assumption, improve a specific metric, or unlock a new capability. We
                  plan iterations in small batches, review outcomes honestly, and adjust course
                  based on evidence rather than intuition.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white/[0.01]">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Standards"
            title="Quality standards"
            subtitle="Quality is not a phase — it is a continuous practice. These are the non-negotiables that define what we ship."
          />

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                <Target className="h-5 w-5 text-white/30 mb-4" />
                <h3 className="text-sm font-medium text-white/60 mb-2">
                  Zero-error user experience
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">
                  Every error state is designed, not accidental. If something can go wrong, we handle
                  it gracefully with clear messaging, recovery options, and zero data loss. Users
                  should never feel uncertain about what happened or what to do next.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                <Code2 className="h-5 w-5 text-white/30 mb-4" />
                <h3 className="text-sm font-medium text-white/60 mb-2">
                  Code that reads like documentation
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">
                  Clear, self-documenting code is a feature. If a function needs a comment to explain
                  what it does, it needs to be rewritten. We invest in naming, structure, and
                  separation of concerns so that the codebase teaches newcomers how the system works.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                <Shield className="h-5 w-5 text-white/30 mb-4" />
                <h3 className="text-sm font-medium text-white/60 mb-2">
                  Security by design
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">
                  Security is not a feature to add later — it is embedded in every layer. End-to-end
                  encryption where possible, strict input validation, least-privilege access, and
                  regular audits. We treat user data as a sacred responsibility.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                <BookOpen className="h-5 w-5 text-white/30 mb-4" />
                <h3 className="text-sm font-medium text-white/60 mb-2">
                  Accessible by default
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">
                  If it is not accessible, it is not done. Semantic HTML, keyboard navigation, screen
                  reader support, and sufficient contrast are not afterthoughts. Every interface must
                  work for everyone, regardless of ability, device, or connection speed.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Open Source"
            title="Open source philosophy"
            subtitle="Openness is not just about licensing — it is about building trust, fostering community, and advancing the craft."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-6 text-white/30 text-base leading-relaxed">
              <p>
                We believe that great software should eventually be inspectable, forkable, and
                improvable by anyone. Our open source projects are currently private as products
                mature, but the philosophy of openness still guides our internal development
                process.
              </p>
              <p>
                When repositories are made public, they will include clear documentation,
                contribution guidelines, and a code of conduct. We plan to review pull requests
                promptly, respond to issues thoughtfully, and credit contributors publicly. Open
                source done right is a two-way relationship: we give the community tools, and the
                community makes us better.
              </p>
              <p>
                Our open source strategy is deliberate: we plan to release the foundations (design
                systems, utilities, shared components) once they reach a stable state, while keeping
                product logic closed. This balance will let us benefit from community input where it
                matters most without compromising competitive advantages in the product layer.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 text-center">
                <div className="text-2xl font-semibold text-white/60 mb-1">Planned</div>
                <div className="text-xs text-white/25">Core libraries will be open source</div>
              </div>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 text-center">
                <div className="text-2xl font-semibold text-white/60 mb-1">Private</div>
                <div className="text-xs text-white/25">Open source projects not yet public</div>
              </div>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 text-center">
                <div className="text-2xl font-semibold text-white/60 mb-1">Always</div>
                <div className="text-xs text-white/25">Internal roadmap and changelog</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <FAQ
        title="Frequently Asked Questions"
        items={faqItems}
      />

      <RelatedPages
        title="Explore More"
        pages={relatedPages}
      />

      <CTASection
        title="Want to discuss philosophy?"
        titleAccent="I am always happy to talk about building better software."
        description="Whether you want to challenge these principles, share your own, or explore collaboration — reach out."
        primaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "View the roadmap", href: "/founder/roadmap" }}
      />
    </>
  );
}
