"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Download,
  FileText,
  Type,
  Mail,
  CheckCircle2,
  XCircle,
  Image,
  Building2,
  User,
  Shield,
  Printer,
  Globe,
  Newspaper,
  ExternalLink,
} from "lucide-react";
import { ease, spring, FAST, NORMAL, SLOW } from "@/lib/motion";
import { personal } from "@/data/personal";
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

const brandColors = [
  {
    name: "Primary Blue",
    hex: "#3b82f6",
    usage: "Links, primary buttons, key UI accents",
    rgb: "59, 130, 246",
  },
  {
    name: "Secondary Violet",
    hex: "#8b5cf6",
    usage: "Gradients, secondary accents, highlights",
    rgb: "139, 92, 246",
  },
  {
    name: "Background",
    hex: "#0a0a0a",
    usage: "Primary background, dark surfaces",
    rgb: "10, 10, 10",
  },
  {
    name: "Surface",
    hex: "#111111",
    usage: "Cards, panels, elevated surfaces",
    rgb: "17, 17, 17",
  },
  {
    name: "Border",
    hex: "#ffffff0d",
    usage: "Subtle dividers, card borders, separators",
    rgb: "255, 255, 255, 0.05",
  },
  {
    name: "Text Strong",
    hex: "#ffffffcc",
    usage: "Headings, titles, primary text",
    rgb: "255, 255, 255, 0.8",
  },
  {
    name: "Text Medium",
    hex: "#ffffff99",
    usage: "Body text, descriptions",
    rgb: "255, 255, 255, 0.6",
  },
  {
    name: "Text Muted",
    hex: "#ffffff59",
    usage: "Labels, captions, metadata",
    rgb: "255, 255, 255, 0.35",
  },
];

const typography = [
  {
    name: "Geist Sans",
    family: "Geist, Inter, system-ui, sans-serif",
    usage: "All body text, headings, UI elements",
    weights: "Regular (400), Medium (500), Semibold (600), Bold (700)",
  },
  {
    name: "Geist Mono",
    family: "Geist Mono, JetBrains Mono, monospace",
    usage: "Code blocks, technical labels, metadata",
    weights: "Regular (400), Medium (500)",
  },
];

const brandAssets = [
  {
    icon: Image,
    title: "Logo Mark",
    description: "The SP NET INC logo mark for use in press materials and publications.",
  },
  {
    icon: Type,
    title: "Wordmark",
    description: "The full wordmark lockup for formal and wide-format placements.",
  },
  {
    icon: Palette,
    title: "Product Screenshots",
    description: "High-resolution screenshots of SP NET products for editorial use.",
  },
];

const brandGuidelines = [
  {
    title: "Clear Space",
    description:
      "Maintain a minimum clear space around the logo equal to the height of the 'S' in the logotype. No other graphics, text, or visual elements should enter this space.",
  },
  {
    title: "Minimum Size",
    description:
      "The logo should never be rendered smaller than 24px in height for digital applications or 10mm in print. At small sizes, use the mark only without the wordmark.",
  },
  {
    title: "Color Usage",
    description:
      "The logo should appear in its full-color version on dark backgrounds. On light backgrounds, use the monochrome dark variant. Never place the logo on busy or low-contrast backgrounds.",
  },
  {
    title: "Modification",
    description:
      "Never alter, rotate, stretch, recolor, or add effects to the logo. Use only the approved assets provided in this media kit. Any custom usage requires prior approval.",
  },
];

const keyFacts = [
  { label: "Company", value: personal.company },
  { label: "Founder", value: personal.name },
  { label: "Role", value: personal.title },
  { label: "Industry", value: "Technology / Software" },
  { label: "Location", value: personal.location },
  { label: "Website", value: "sp-net.in" },
  { label: "Founded", value: "2022" },
  { label: "Products", value: "SP NET GRAM, SP NET ADMIN OS, SP NET AI" },
];

const usageGuidelines = {
  dos: [
    "Use the official logos and colors from this media kit",
    "Link back to sp-net.in when referencing SP NET INC",
    "Use the full company name 'SP NET INC' in formal press",
    "Attribute quotes to 'Savan Patel, Founder & Product Engineer'",
    "Use approved product screenshots from the asset library",
  ],
  donts: [
    "Alter, distort, or recolor the logo in any way",
    "Use outdated or third-party logos or screenshots",
    "Imply endorsement or partnership without written approval",
    "Use the SP NET brand in political or controversial contexts",
    "Crop or partially obscure brand elements in compositions",
  ],
};

const faqItems = [
  {
    question: "Can I use SP NET INC logos in my article or publication?",
    answer:
      "Yes, approved media and press organizations may use the official logos and assets from this kit when writing about SP NET INC. Usage must follow the brand guidelines outlined above. For any non-standard usage, contact us for approval.",
  },
  {
    question: "How should I refer to the company in press coverage?",
    answer:
      "Use 'SP NET INC' (with spaces and capitalized) on first reference. Subsequent references can use 'SP NET' or 'the company.' When referring to the founder, use 'Savan Patel, Founder & Product Engineer of SP NET INC.'",
  },
  {
    question: "Are product screenshots available for editorial use?",
    answer:
      "SP NET products (GRAM, ADMIN OS, AI) are currently in active development and not yet publicly available. Once assets are released, high-resolution screenshots will be available here. In the meantime, contact us via PCA at https://t.me/SAVANPATELSP_BOT or media@sp-net.in for approved screenshots.",
  },
  {
    question: "Who should I contact for press inquiries?",
    answer:
      "Start with PCA at https://t.me/SAVANPATELSP_BOT — it is the recommended first point of contact for all inquiries. For press-specific needs, you can also email media@sp-net.in with your publication name, the nature of the story, and your deadline.",
  },
  {
    question: "Can I request an interview with the founder?",
    answer:
      "Yes. Savan Patel is available for interviews related to product development, technology, entrepreneurship, and the SP NET ecosystem. Start with PCA at https://t.me/SAVANPATELSP_BOT or email media@sp-net.in with your publication details, interview format, and preferred timeline.",
  },
];

const relatedPages = [
  {
    title: "Organization",
    description:
      "Learn about the structure, mission, and vision of SP NET INC.",
    href: "/company/about",
  },
  {
    title: "About Savan Patel",
    description:
      "Background, experience, and the founder behind SP NET INC.",
    href: "/founder/about",
  },
  {
    title: "GitHub",
    description:
      "Browse the source code and track development progress.",
    href: "https://github.com/savanpatelssp",
  },
  {
    title: "Blog",
    description:
      "Engineering insights, product updates, and technical deep dives.",
    href: "/resources/blog",
  },
];

export default function MediaKitPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Media Kit" },
        ]}
        label="Resources"
        title="Media Kit"
        titleAccent="Brand assets and press information"
        description="Official brand assets, press information, and media guidelines for SP NET INC. Everything journalists, bloggers, and partners need."
        icon={<Palette className="h-4 w-4" />}
      />

      <SectionContainer>
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Introduction"
            title="What is included"
            subtitle="This media kit provides everything you need to accurately represent SP NET INC in press, publications, and media materials."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-white/30 text-base leading-relaxed">
              <p>
                Whether you are writing an article, preparing a presentation, or creating
                content that references SP NET INC, this media kit ensures accuracy and
                consistency. All assets, guidelines, and information here are official and
                up to date.
              </p>
              <p>
                Inside you will find company and founder overviews written for press use,
                brand assets including logos and color specifications, typography guidelines,
                key facts for quick reference, and clear usage rules to maintain brand integrity
                across all media.
              </p>
              <p>
                For anything not covered in this kit, or for custom asset requests, reach out
                directly. We are happy to help.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white/[0.01]">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Company"
            title="Company overview"
            subtitle="Copy-ready description for press use."
          />

          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  <Building2 className="h-5 w-5 text-white/40" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
                  Boilerplate
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                {personal.company} is a technology company building next-generation software
                products that connect people, empower communities, and shape the future of
                communication. Founded in {personal.location} in 2022, the company develops a
                growing ecosystem of products including messaging platforms, enterprise
                administration tools, and AI-powered systems.
              </p>
              <p className="text-sm text-white/35 leading-relaxed">
                With a focus on craft, simplicity, and open-source values, {personal.company} is
                redefining how modern teams communicate and collaborate through software that
                is both powerful and thoughtfully designed.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Founder"
            title="Founder overview"
            subtitle="Bio and background for press use."
          />

          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  <User className="h-5 w-5 text-white/40" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
                  Bio
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                {personal.name} is the Founder and Product Engineer of {personal.company}, a
                technology company building communication and enterprise software. A self-taught
                engineer who began coding in 2018, Savan has architected and developed multiple
                products across the SP NET ecosystem, including messaging platforms, admin
                systems, and AI research initiatives.
              </p>
              <p className="text-sm text-white/35 leading-relaxed">
                Driven by a philosophy of craft over scale and simplicity as the ultimate
                sophistication, Savan leads both the technical direction and product vision of
                {personal.company}. He is an advocate for open-source software, transparent
                development practices, and building products that prioritize the individual
                user experience before scaling to the masses.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            label="Brand Assets"
            title="Brand assets"
            subtitle="Official logos, screenshots, and visual assets for press and media use."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {brandAssets.map((asset) => (
              <StaggerItem key={asset.title}>
                <motion.div
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-7 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] mb-5">
                    <asset.icon className="h-6 w-6 text-white/30" />
                  </div>
                  <h3 className="text-base font-semibold text-white/70 mb-2">
                    {asset.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed mb-5">
                    {asset.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/25">
                    <Download className="h-3 w-3" />
                    Coming soon
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Guidelines"
            title="Brand guidelines"
            subtitle="Rules for using SP NET INC brand assets correctly and consistently."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {brandGuidelines.map((guideline) => (
              <StaggerItem key={guideline.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                  <h3 className="text-sm font-medium text-white/60 mb-2">
                    {guideline.title}
                  </h3>
                  <p className="text-xs text-white/25 leading-relaxed">
                    {guideline.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white/[0.01]">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Colors"
            title="Brand colors"
            subtitle="The official SP NET INC color palette for digital and print applications."
          />

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {brandColors.map((color) => (
                <motion.div
                  key={color.name}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.01] overflow-hidden"
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={spring.gentle}
                >
                  <div
                    className="h-20 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-4">
                    <div className="text-xs font-medium text-white/60 mb-1">
                      {color.name}
                    </div>
                    <div className="text-[11px] font-mono text-white/30 mb-2">
                      {color.hex}
                    </div>
                    <div className="text-[10px] text-white/20 leading-relaxed">
                      {color.usage}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Typography"
            title="Typography"
            subtitle="The typefaces used across all SP NET INC products and brand materials."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-4">
              {typography.map((font) => (
                <div
                  key={font.name}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-base font-semibold text-white/70 mb-1">
                        {font.name}
                      </h3>
                      <p className="text-xs font-mono text-white/25">
                        {font.family}
                      </p>
                    </div>
                    <Type className="h-5 w-5 text-white/20" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20 mb-1 block">
                        Usage
                      </span>
                      <p className="text-xs text-white/30">{font.usage}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20 mb-1 block">
                        Weights
                      </span>
                      <p className="text-xs text-white/30">{font.weights}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white/[0.01]">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Press"
            title="Press information"
            subtitle="Key facts and company boilerplate for journalists and media professionals."
          />

          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  <Newspaper className="h-5 w-5 text-white/40" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
                  Key Facts
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {keyFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-start gap-3 py-2"
                  >
                    <span className="text-xs text-white/25 min-w-[80px]">
                      {fact.label}
                    </span>
                    <span className="text-xs font-medium text-white/50">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Contact"
            title="Media contact"
            subtitle="For press inquiries, interview requests, and media-related questions."
          />

          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] mx-auto mb-6">
                <Mail className="h-6 w-6 text-white/30" />
              </div>
              <h3 className="text-lg font-semibold text-white/70 mb-2">
                Press Inquiries
              </h3>
              <p className="text-sm text-white/30 leading-relaxed max-w-md mx-auto mb-6">
                For all press and media inquiries, including interview requests,
                asset requests, and editorial questions, contact us directly.
              </p>
              <motion.a
                href={`mailto:${personal.email}?subject=Press Inquiry`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors duration-200"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.gentle}
              >
                <Mail className="h-4 w-4" />
                {personal.email}
              </motion.a>
              <p className="text-[11px] text-white/15 mt-4">
                Include your publication name and story details for a faster response.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white/[0.01]">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Usage"
            title="Usage guidelines"
            subtitle={`Do's and don'ts for representing ${personal.company} in media and publications.`}
          />

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400/60" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400/40">
                    Do&apos;s
                  </span>
                </div>
                <ul className="space-y-3">
                  {usageGuidelines.dos.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-white/30 leading-relaxed"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-400/40 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <XCircle className="h-4 w-4 text-red-400/60" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-red-400/40">
                    Don&apos;ts
                  </span>
                </div>
                <ul className="space-y-3">
                  {usageGuidelines.donts.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-white/30 leading-relaxed"
                    >
                      <XCircle className="h-3 w-3 text-red-400/40 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Downloads"
            title="Download assets"
            subtitle="All brand assets in one place, ready for immediate use."
          />

          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] mx-auto mb-6">
                <Download className="h-6 w-6 text-white/30" />
              </div>
              <h3 className="text-lg font-semibold text-white/70 mb-2">
                Coming soon
              </h3>
              <p className="text-sm text-white/30 leading-relaxed max-w-md mx-auto">
                A downloadable ZIP archive containing all logos, product screenshots,
                brand guidelines, and color specifications. Currently being prepared
                for release.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <FAQ title="Frequently Asked Questions" items={faqItems} />

      <RelatedPages title="Explore More" pages={relatedPages} />

      <CTASection
        title="Need something specific?"
        titleAccent="We can provide custom assets and information for your publication."
        description="If you need high-resolution assets, custom screenshots, or a specific format not included here, reach out and we will help."
        primaryAction={{ label: "Contact us", href: `mailto:${personal.email}?subject=Media Kit Request` }}
        secondaryAction={{ label: "View the organization", href: "/company/about" }}
      />
    </>
  );
}
