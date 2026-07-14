import type { ReactNode } from "react";
import {
  User,
  Layers,
  Briefcase,
  Lightbulb,
  Shield,
  Globe,
  Mail,
  Building2,
  BookOpen,
  Clock,
  Compass,
  Newspaper,
  MessageSquare,
  Bot,
  Cpu,
  Scale,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export interface FAQCategory {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface FAQLink {
  label: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  links?: FAQLink[];
  related?: string[];
}

function Code(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export const faqCategories: FAQCategory[] = [
  { id: "general", label: "General", icon: <User className="h-3.5 w-3.5" /> },
  { id: "founder", label: "Founder", icon: <User className="h-3.5 w-3.5" /> },
  { id: "company", label: "Company", icon: <Building2 className="h-3.5 w-3.5" /> },
  { id: "products", label: "Products", icon: <Layers className="h-3.5 w-3.5" /> },
  { id: "research", label: "Research", icon: <Lightbulb className="h-3.5 w-3.5" /> },
  { id: "trust", label: "Trust", icon: <Shield className="h-3.5 w-3.5" /> },
  { id: "explore", label: "Explore", icon: <Compass className="h-3.5 w-3.5" /> },
  { id: "resources", label: "Resources", icon: <Newspaper className="h-3.5 w-3.5" /> },
  { id: "contact", label: "Contact", icon: <MessageSquare className="h-3.5 w-3.5" /> },
  { id: "pca", label: "Personal Communication Assistant", icon: <Bot className="h-3.5 w-3.5" /> },
  { id: "learning", label: "Learning", icon: <BookOpen className="h-3.5 w-3.5" /> },
  { id: "technology", label: "Technology", icon: <Cpu className="h-3.5 w-3.5" /> },
  { id: "open_source", label: "Open Source", icon: <Code className="h-3.5 w-3.5" /> },
  { id: "coming_soon", label: "Coming Soon", icon: <Clock className="h-3.5 w-3.5" /> },
  { id: "legal", label: "Legal", icon: <Scale className="h-3.5 w-3.5" /> },
  { id: "privacy", label: "Privacy", icon: <Lock className="h-3.5 w-3.5" /> },
  { id: "security", label: "Security", icon: <ShieldCheck className="h-3.5 w-3.5" /> },
  { id: "responsible_ai", label: "Responsible AI", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: "career", label: "Career & Collaboration", icon: <Briefcase className="h-3.5 w-3.5" /> },
];

export const faqItems: FAQItem[] = [
  // ─── General ─────────────────────────────────────────────
  {
    question: "Who is Savan Patel?",
    answer:
      "I am a self-taught software engineer and the founder of SP NET INC. I wrote my first line of code in 2018, driven by curiosity and an internet connection. I had no formal computer science education, no expensive bootcamps — just a relentless desire to learn by building. Over the years, I have developed deep expertise across full-stack development, artificial intelligence, cloud infrastructure, and cybersecurity. I serve as Founder & Product Engineer at SP NET INC, where I lead all product strategy, engineering, design, and operations. Every product is built, tested, and shipped by me personally.",
    category: "general",
    links: [
      { label: "About Savan", href: "/founder/about" },
      { label: "Journey", href: "/founder/journey" },
    ],
    related: ["Are you currently a student?", "What is this website?"],
  },
  {
    question: "Are you currently a student?",
    answer:
      "I am a self-taught software engineer. I did not follow a traditional computer science education path. Growing up in India, I had curiosity and an internet connection, and I spent every spare hour learning, building, breaking, and rebuilding. By 2022, I had enough conviction and skill to launch SP NET INC. My education is continuous and hands-on — every project, every research area, and every product is an opportunity to go deeper. I learn by doing, not by studying theory in isolation.",
    category: "general",
    links: [
      { label: "About Savan", href: "/founder/about" },
      { label: "Learning Resources", href: "/explore/learning" },
    ],
    related: ["Who is Savan Patel?", "What is Savan Patel's engineering philosophy?"],
  },
  {
    question: "What is this website?",
    answer:
      "This is the official portfolio and company website of Savan Patel and SP NET INC. It showcases the products being built, the technologies being explored, the philosophy behind the work, and provides ways to get in touch. It is built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Framer Motion. The site serves as both a public showcase and a reference implementation for modern web development — the same engineering standards that define every SP NET product.",
    category: "general",
    links: [
      { label: "About SP NET INC", href: "/company/about" },
      { label: "Products", href: "/explore/products" },
    ],
    related: ["Who is Savan Patel?", "Which technologies power this website?"],
  },
  {
    question: "What are you currently working on?",
    answer:
      "My focus is on three core products: SP NET GRAM, a next-generation messaging platform built because existing apps compromise on privacy or bury needed features — I wanted something secure, fast, and pleasant to use. SP NET ADMIN OS, an enterprise administration platform built from watching teams struggle with clunky, outdated admin dashboards — I wanted something modern that makes managing users, analytics, and workflows enjoyable. SP NET AI, the connective tissue across everything I build — making intelligence a first-class feature, not a bolt-on. All three are currently in active development and not yet publicly available.",
    category: "general",
    links: [
      { label: "Products", href: "/explore/products" },
      { label: "Roadmap", href: "/founder/roadmap" },
    ],
    related: ["What is SP NET INC?", "Are SP NET products available to use now?"],
  },
  {
    question: "Why do you build multiple products?",
    answer:
      "I build multiple products because the problems I am solving are interconnected. Communication (GRAM), organization management (ADMIN OS), and intelligence (AI) are not isolated domains — they inform and enhance each other. A message in GRAM can trigger a workflow in ADMIN OS. AI can suggest actions based on data from both. Building them together creates a unified ecosystem where the whole is greater than the sum of its parts. Each product is designed to work independently, but together they form a comprehensive platform.",
    category: "general",
    links: [
      { label: "SP NET Ecosystem", href: "/products/sp-net-ecosystem" },
      { label: "Future Vision", href: "/explore/vision" },
    ],
    related: ["What is the SP NET Ecosystem?", "What are you currently working on?"],
  },

  // ─── Founder ─────────────────────────────────────────────
  {
    question: "What is Savan Patel's background?",
    answer:
      "I am a self-taught software engineer who began coding in 2018. Growing up in India, I had curiosity and an internet connection, and I spent every spare hour learning, building, breaking, and rebuilding. I had no formal computer science education — my education is hands-on and continuous. By 2022, I had enough conviction and skill to found SP NET INC. I serve as Founder & Product Engineer, leading all product strategy, engineering, design, and operations. My expertise spans full-stack development, AI, cloud infrastructure, cybersecurity, and product design — all learned through building real products.",
    category: "founder",
    links: [
      { label: "About Savan", href: "/founder/about" },
      { label: "Journey", href: "/founder/journey" },
    ],
    related: ["What is Savan Patel's engineering philosophy?", "Are you currently a student?"],
  },
  {
    question: "What is Savan Patel's engineering philosophy?",
    answer:
      "My philosophy centers on four principles: craft over scale — every detail matters, build for the one then the many; simplicity is the ultimate sophistication — the best solutions feel obvious in hindsight, remove until nothing else can be removed; ship to learn — done is better than perfect, real feedback comes from real users; open by default — great software belongs to everyone, transparency builds trust. I believe technology should be invisible when it works and transformative when it matters.",
    category: "founder",
    links: [
      { label: "Philosophy", href: "/founder/philosophy" },
      { label: "Mission", href: "/company/mission" },
    ],
    related: ["What is Savan Patel's background?", "What is SP NET INC's mission?"],
  },
  {
    question: "What is Savan Patel's journey?",
    answer:
      "I started coding in 2018, driven by curiosity that became a passion. I founded SP NET INC in 2022, transforming an idea into a vision. In 2023, I began building SP NET GRAM. In 2024, I expanded with SP NET ADMIN OS. In 2025, I started SP NET AI research. In 2026, I am scaling the vision with new products, a growing community, and open-source contributions. The journey is documented across the Founder section of this website. Every milestone represents a step toward the larger vision.",
    category: "founder",
    links: [
      { label: "Journey", href: "/founder/journey" },
      { label: "Roadmap", href: "/founder/roadmap" },
    ],
    related: ["What is Savan Patel's background?", "What is Savan Patel's roadmap?"],
  },
  {
    question: "What is Savan Patel's roadmap?",
    answer:
      "The roadmap includes completing SP NET GRAM's core features, launching SP NET ADMIN OS, advancing SP NET AI research, and scaling the SP NET Ecosystem. Beta access for GRAM and ADMIN OS is planned for 2026. SP NET Cloud, Teams, and Automate are planned for 2027-2028. Specific milestones are shared on the Founder > Roadmap page. The roadmap is dynamic — it evolves as products mature and new opportunities emerge.",
    category: "founder",
    links: [
      { label: "Roadmap", href: "/founder/roadmap" },
      { label: "System Status", href: "/trust/status" },
    ],
    related: ["What is Savan Patel's journey?", "What are you currently working on?"],
  },
  {
    question: "Why did Savan found SP NET INC?",
    answer:
      "I founded SP NET INC because I believed technology could be built differently — with privacy at its core, with obsessive attention to detail, and with a focus on creating genuine value rather than extracting attention. I watched teams struggle with clunky, outdated tools. I saw messaging apps compromise on privacy. I saw AI bolted on as a feature instead of woven into the foundation. I wanted to build something better. SP NET INC exists to prove that technology can serve people without compromising their data, their time, or their trust.",
    category: "founder",
    links: [
      { label: "About Savan", href: "/founder/about" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["What is Savan Patel's engineering philosophy?", "What is SP NET INC's mission?"],
  },
  {
    question: "What is the biggest challenge faced so far?",
    answer:
      "The biggest challenge has been building everything alone. When you are the only person — engineering, design, product strategy, operations, content — every decision carries more weight and every mistake costs more time. There is no team to delegate to, no co-founder to pressure-test ideas with, no designer to hand off to. This constraint has forced me to be extremely disciplined about what I work on and when. It has also made me a much stronger engineer and product thinker. The solitude of solo building is both the hardest part and the most formative.",
    category: "founder",
    links: [
      { label: "Journey", href: "/founder/journey" },
      { label: "About Savan", href: "/founder/about" },
    ],
    related: ["What is Savan Patel's background?", "Why did Savan found SP NET INC?"],
  },

  // ─── Company ─────────────────────────────────────────────
  {
    question: "What is SP NET INC?",
    answer:
      "SP NET INC is a technology company I founded in 2022. It builds infrastructure for modern communication, enterprise administration, and intelligent automation. The company operates as a lean, founder-led organization based in India, with a focus on crafting exceptional products that work together as a unified ecosystem. Every product is designed with privacy at its core, performance as a priority, and user experience as the measure of success.",
    category: "company",
    links: [
      { label: "About SP NET INC", href: "/company/about" },
      { label: "Mission & Vision", href: "/company/mission" },
    ],
    related: ["Who is Savan Patel?", "What is the SP NET Ecosystem?"],
  },
  {
    question: "What is SP NET INC's mission?",
    answer:
      "The mission is to build technology that serves people without compromising their data, their time, or their trust. Every product is designed with three non-negotiable principles: privacy at its core — user data is never the product; craft over scale — every detail matters, build for the one then the many; intelligence as foundation — AI should amplify human capability, not replace human judgment. The goal is not to build the most products, but to build the right products — ones that genuinely improve how people communicate, organize, and work.",
    category: "company",
    links: [
      { label: "Mission & Vision", href: "/company/mission" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["What is SP NET INC?", "What is SP NET INC's long-term vision?"],
  },
  {
    question: "What is SP NET INC's long-term vision?",
    answer:
      "The long-term vision is a unified ecosystem where communication, organization management, and intelligence work together seamlessly. One account, one data layer, one API surface — every SP NET product feels like a natural part of something bigger. A message in GRAM triggers a workflow in ADMIN OS. AI suggests actions based on data from both. The endgame is not three separate products, but one integrated platform that adapts to how people actually work. This vision drives every product decision, every architectural choice, and every line of code.",
    category: "company",
    links: [
      { label: "SP NET Ecosystem", href: "/products/sp-net-ecosystem" },
      { label: "Future Vision", href: "/explore/vision" },
    ],
    related: ["What is SP NET INC's mission?", "How do SP NET products work together?"],
  },
  {
    question: "How big is SP NET INC?",
    answer:
      "SP NET INC is currently a founder-led operation. I handle everything personally — product strategy, engineering, design, and operations. The company operates with a senior-first hiring philosophy: when the time comes to grow the team, the focus will be on hiring exceptional people who set the standard, not on headcount. The approach is quality over quantity — every person who joins must multiply the team's capability.",
    category: "company",
    links: [
      { label: "Leadership", href: "/company/leadership" },
      { label: "Careers", href: "/company/careers" },
    ],
    related: ["What is the culture like at SP NET INC?", "How do I apply to work at SP NET INC?"],
  },
  {
    question: "Where is SP NET INC based?",
    answer:
      "SP NET INC is based in India. The company operates as a remote-first organization, leveraging global infrastructure for collaboration and deployment. All products are built and deployed from India, with infrastructure distributed globally through cloud services like Cloudflare and Vercel. This enables serving users worldwide while maintaining performance and reliability.",
    category: "company",
    links: [
      { label: "About SP NET INC", href: "/company/about" },
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["What is the culture like at SP NET INC?", "When was SP NET INC founded?"],
  },
  {
    question: "What is the culture like at SP NET INC?",
    answer:
      "The culture is built on four pillars: craft over scale — every detail matters, build for the one then the many; simplicity wins — the best solutions feel obvious in hindsight, remove until nothing else can be removed; ship to learn — done is better than perfect, real feedback comes from real users; open by default — great software belongs to everyone, transparency builds trust. It is an engineering-first culture with high standards and full autonomy.",
    category: "company",
    links: [
      { label: "Careers", href: "/company/careers" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["How do I apply to work at SP NET INC?", "Where is SP NET INC based?"],
  },
  {
    question: "When was SP NET INC founded?",
    answer:
      "SP NET INC was founded in 2022. The company began with a clear vision: build technology that serves people without compromising their privacy. From the start, the approach was deliberate — no rush to launch, no cutting corners on quality, no compromise on principles. Every product decision since founding has been guided by the belief that technology can be built better. The company has grown from a personal project into a structured organization with products spanning communication, administration, and intelligence.",
    category: "company",
    links: [
      { label: "About SP NET INC", href: "/company/about" },
      { label: "Journey", href: "/founder/journey" },
    ],
    related: ["What is SP NET INC?", "What is SP NET INC's mission?"],
  },

  // ─── Products ────────────────────────────────────────────
  {
    question: "What is SP NET GRAM?",
    answer:
      "SP NET GRAM is a next-generation messaging platform. I built it because existing messaging apps either compromise on privacy or bury the features you actually need. I wanted something that is secure, fast, and pleasant to use. It features end-to-end encryption, real-time communication, media sharing, team collaboration, cloud sync, and a developer API. SP NET GRAM is currently in active development and is not yet publicly available. Beta access is planned for 2026.",
    category: "products",
    links: [
      { label: "SP NET GRAM", href: "/products/sp-net-gram" },
      { label: "Privacy", href: "/trust/privacy" },
    ],
    related: ["What is SP NET ADMIN OS?", "Are SP NET products available to use now?"],
  },
  {
    question: "What is SP NET ADMIN OS?",
    answer:
      "SP NET ADMIN OS is a comprehensive enterprise administration platform. I built it from watching teams struggle with clunky, outdated admin dashboards. I wanted something modern that makes managing users, analytics, and workflows enjoyable. It includes role-based access control, audit logging, analytics dashboards, workflow automation, and team management features. SP NET ADMIN OS is currently in active development and is not yet publicly available. Beta access is planned for 2026.",
    category: "products",
    links: [
      { label: "SP NET ADMIN OS", href: "/products/sp-net-admin-os" },
      { label: "Products", href: "/explore/products" },
    ],
    related: ["What is SP NET GRAM?", "What is SP NET AI?"],
  },
  {
    question: "What is SP NET AI?",
    answer:
      "SP NET AI is the connective tissue across everything I build. It is an AI research initiative powering intelligent experiences across the entire SP NET ecosystem. I am making intelligence a first-class feature, not a bolt-on. It focuses on natural language processing, smart automation, content generation, predictive analytics, and custom model training — all designed to enhance GRAM and ADMIN OS without compromising user privacy. SP NET AI is currently in active development.",
    category: "products",
    links: [
      { label: "SP NET AI", href: "/products/sp-net-ai" },
      { label: "AI Research", href: "/research/ai" },
    ],
    related: ["What is SP NET GRAM?", "What is the SP NET Ecosystem?"],
  },
  {
    question: "What is the SP NET Ecosystem?",
    answer:
      "The SP NET Ecosystem is the long game: one account, one data layer, one API surface — every SP NET product feels like a seamless part of something bigger. Rather than isolated tools, the ecosystem is designed so that context, data, and intelligence flow between products. It includes single sign-on, a shared data layer, cross-product APIs, a unified dashboard, and a plugin system. The Ecosystem page is currently coming soon as the platform is being finalized.",
    category: "products",
    links: [
      { label: "SP NET Ecosystem", href: "/products/sp-net-ecosystem" },
      { label: "Future Vision", href: "/explore/vision" },
    ],
    related: ["What is SP NET GRAM?", "What is SP NET ADMIN OS?"],
  },
  {
    question: "Are SP NET products available to use now?",
    answer:
      "No. SP NET GRAM, SP NET ADMIN OS, and SP NET AI are all currently in active development. They are not yet publicly available. Beta access for GRAM and ADMIN OS is planned for 2026. The products page and individual product pages provide details on features and the vision behind each product. The PCA can provide the latest status on any product, and the System Status page tracks development progress.",
    category: "products",
    links: [
      { label: "Products", href: "/explore/products" },
      { label: "System Status", href: "/trust/status" },
    ],
    related: ["What is SP NET GRAM?", "Can I download your products?"],
  },
  {
    question: "Can I download your products?",
    answer:
      "Not yet. SP NET GRAM, SP NET ADMIN OS, and SP NET AI are all in active development and not yet publicly available. When beta access opens, it will be announced on the System Status page and through the PCA. Core features will always be free; premium features like more storage, advanced analytics, and enterprise controls will have paid tiers. Follow the journey for updates on availability.",
    category: "products",
    links: [
      { label: "Products", href: "/explore/products" },
      { label: "System Status", href: "/trust/status" },
    ],
    related: ["Are SP NET products available to use now?", "What is SP NET GRAM?"],
  },
  {
    question: "How do SP NET products work together?",
    answer:
      "SP NET products are designed to work both independently and as a unified ecosystem. GRAM handles communication, ADMIN OS handles organization management, and AI provides intelligence across both. Through a shared data layer, single sign-on, and cross-product APIs, context flows between products. A message in GRAM can trigger a workflow in ADMIN OS. AI can suggest actions based on data from both. The goal is seamless integration where the whole is greater than the sum of its parts — but each product is fully functional on its own.",
    category: "products",
    links: [
      { label: "SP NET Ecosystem", href: "/products/sp-net-ecosystem" },
      { label: "Future Vision", href: "/explore/vision" },
    ],
    related: ["What is the SP NET Ecosystem?", "What is SP NET GRAM?"],
  },

  // ─── Research ────────────────────────────────────────────
  {
    question: "What research areas does SP NET focus on?",
    answer:
      "My primary research areas are artificial intelligence (LLMs, RAG pipelines, multi-agent systems, federated learning), cloud computing (edge computing, serverless architecture, self-healing systems), cybersecurity (zero-trust architecture, post-quantum cryptography), and emerging technologies (AR/VR, IoT, neuromorphic computing). Each area is explored through the lens of practical application to SP NET products — research that does not eventually serve a product is not pursued.",
    category: "research",
    links: [
      { label: "AI Research", href: "/research/ai" },
      { label: "Cloud Computing", href: "/research/cloud" },
      { label: "Cybersecurity", href: "/research/cybersecurity" },
    ],
    related: ["Why is SP NET interested in AI?", "Why does SP NET focus on cybersecurity?"],
  },
  {
    question: "Why is SP NET interested in AI?",
    answer:
      "AI represents the most significant shift in how software serves people. I am not interested in AI as a buzzword — I am interested in AI as a practical tool. Systems that understand context, anticipate needs, and automate the routine so humans can focus on the creative. SP NET AI is built on the belief that AI should amplify human capability, not replace human judgment. From smart message composition in GRAM to automated workflows in ADMIN OS, AI is woven into every product as a unified intelligence layer.",
    category: "research",
    links: [
      { label: "AI Research", href: "/research/ai" },
      { label: "SP NET AI", href: "/products/sp-net-ai" },
      { label: "Responsible AI", href: "/trust/responsible-ai" },
    ],
    related: ["Why does SP NET focus on cybersecurity?", "Does SP NET use AI in development?"],
  },
  {
    question: "Why does SP NET focus on cybersecurity?",
    answer:
      "Security is not a feature — it is a foundation. Every SP NET product handles sensitive data: messages, organizational information, user identities. Without strong security, none of the other work matters. I focus on cybersecurity because building products that people trust with their most important communications and data requires end-to-end encryption, zero-trust architecture, and responsible disclosure practices. This is non-negotiable.",
    category: "research",
    links: [
      { label: "Cybersecurity", href: "/research/cybersecurity" },
      { label: "Security", href: "/trust/security" },
    ],
    related: ["Why is SP NET interested in AI?", "How can I report a security vulnerability?"],
  },
  {
    question: "Why cloud computing?",
    answer:
      "Cloud computing is the infrastructure that makes modern software possible. I focus on building systems that are resilient, scalable, and cost-efficient — from containerized microservices to edge-deployed functions. Cloud-native architecture enables SP NET products to serve users globally while maintaining performance and reliability. The approach is cloud-agnostic where possible, preferring services that offer flexibility and avoid vendor lock-in.",
    category: "research",
    links: [
      { label: "Cloud Computing", href: "/research/cloud" },
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["What research areas does SP NET focus on?", "Does SP NET use cloud services?"],
  },
  {
    question: "What is the Innovation Lab?",
    answer:
      "The Innovation Lab is where I test experimental ideas before they become products. It is a space for rapid prototyping, proof-of-concept projects, and exploring emerging technologies. Experiments in the lab document the process, findings, and potential applications — providing transparency into how ideas evolve from curiosity to implementation. The lab focuses on technologies that could enhance the SP NET ecosystem, from Rust and WebAssembly to local-first architecture patterns using CRDTs.",
    category: "research",
    links: [
      { label: "Innovation Lab", href: "/research/innovation-lab" },
      { label: "Future Technologies", href: "/research/future-tech" },
    ],
    related: ["What technologies is Savan currently learning?", "What research areas does SP NET focus on?"],
  },

  // ─── Trust ───────────────────────────────────────────────
  {
    question: "How does SP NET handle privacy?",
    answer:
      "Privacy is a foundational principle, not an afterthought. Every SP NET product is designed with privacy at its core: end-to-end encryption, zero data retention by default, user-controlled permissions, and transparent data practices. This website uses no tracking cookies, no analytics scripts, and no advertising. Privacy is not a feature to be added later — it is the foundation upon which every product is built.",
    category: "trust",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
      { label: "Trust & Security", href: "/trust/security" },
    ],
    related: ["Does this website use tracking?", "Does SP NET sell user data?"],
  },
  {
    question: "Does SP NET sell user data?",
    answer:
      "No. User data is never sold, shared with third parties for marketing purposes, or used for advertising. SP NET INC is funded through product development, not data harvesting. The business model is built on creating exceptional products that people want to use — not on monetizing user attention or personal information. This is a core principle, not a policy that can be changed.",
    category: "trust",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
      { label: "Transparency", href: "/trust/transparency" },
    ],
    related: ["How does SP NET handle privacy?", "Does this website use tracking?"],
  },
  {
    question: "Does this website use tracking?",
    answer:
      "No. This website uses no tracking cookies, no analytics scripts, and no advertising. Contact form submissions are stored securely and used only to respond to inquiries. Third-party services (hosting, email) are selected for their privacy practices. Your browsing experience here is completely private.",
    category: "trust",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
    ],
    related: ["How does SP NET handle privacy?", "Does SP NET sell user data?"],
  },

  // ─── Explore ─────────────────────────────────────────────
  {
    question: "What is your vision for the next five years?",
    answer:
      "The five-year vision is to have all three core products — GRAM, ADMIN OS, and AI — publicly available and serving users worldwide. The SP NET Ecosystem should be fully operational, with seamless integration between products. Open source contributions should be active, with developer tools and design systems available to the community. The company should have a small, exceptional team while maintaining the founder-led culture. Ultimately, the goal is to prove that technology can be built differently — with privacy at its core, with obsessive attention to detail, and with a focus on genuine value.",
    category: "explore",
    links: [
      { label: "Future Vision", href: "/explore/vision" },
      { label: "Roadmap", href: "/founder/roadmap" },
    ],
    related: ["What drives you personally?", "What is Savan Patel's roadmap?"],
  },
  {
    question: "What drives you personally?",
    answer:
      "I am driven by curiosity and the desire to build technology that genuinely serves people. Growing up with limited resources but unlimited curiosity, I learned that the best tools are built by people who understand the problem personally. Every product I build solves a problem I have faced myself. I am also driven by the desire to prove that a self-taught engineer from India can build world-class products — not through luck or connections, but through craft, persistence, and an unwavering commitment to quality.",
    category: "explore",
    links: [
      { label: "About Savan", href: "/founder/about" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["What is your vision for the next five years?", "Why did Savan found SP NET INC?"],
  },
  {
    question: "How do you decide what to work on?",
    answer:
      "I work on problems I personally face. SP NET GRAM exists because I was frustrated with messaging apps that compromise on privacy. ADMIN OS exists because I watched teams struggle with outdated dashboards. AI exists because I believe intelligence should be woven into products, not bolted on. The decision framework is simple: does this problem matter? Can I build something genuinely better? Will it serve users without compromising their privacy? If the answer to all three is yes, it gets built.",
    category: "explore",
    links: [
      { label: "Products", href: "/explore/products" },
      { label: "Innovation Lab", href: "/research/innovation-lab" },
    ],
    related: ["What drives you personally?", "How do you handle setbacks?"],
  },
  {
    question: "How do you handle setbacks?",
    answer:
      "Setbacks are data, not failures. When something does not work — a feature that does not land, an architecture decision that proves wrong, a timeline that slips — I treat it as information. The approach is: acknowledge what happened, understand why it happened, extract the lesson, adjust the plan, and keep moving. Every setback in SP NET's history has led to a better product, a stronger architecture, or a clearer vision. The key is not to avoid failure, but to fail fast, learn quickly, and never make the same mistake twice.",
    category: "explore",
    links: [
      { label: "Journey", href: "/founder/journey" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["What drives you personally?", "How do you decide what to work on?"],
  },
  {
    question: "What is the relationship between innovation and products?",
    answer:
      "Innovation feeds products, and products fund innovation. The Innovation Lab is where experimental ideas are tested — new technologies, new approaches, new patterns. The best experiments eventually become product features. Products generate the resources and knowledge that fund more innovation. It is a virtuous cycle: lab experiments inform product decisions, and product needs guide lab experiments. The goal is never innovation for its own sake, but innovation that eventually serves users.",
    category: "explore",
    links: [
      { label: "Innovation Lab", href: "/research/innovation-lab" },
      { label: "Products", href: "/explore/products" },
    ],
    related: ["What is the Innovation Lab?", "How do you decide what to work on?"],
  },

  // ─── Resources ───────────────────────────────────────────
  {
    question: "How can I download the Media Kit?",
    answer:
      "The Media Kit is available at the Resources > Media Kit page. It includes official brand assets, color palette, typography guidelines, logo usage rules, brand do's and don'ts, boilerplate text, and key facts about SP NET INC. Everything journalists, partners, and content creators need to accurately represent the brand is included. The Media Kit is free to download and use within the published brand guidelines.",
    category: "resources",
    links: [
      { label: "Media Kit", href: "/resources/media-kit" },
      { label: "Press Contact", href: "/resources/press-contact" },
    ],
    related: ["Where can I find press contact information?", "Can media contact SP NET?"],
  },
  {
    question: "Where can I find press contact information?",
    answer:
      "Press contact information is available at the Resources > Press Contact page. For all press and media inquiries, email media@sp-net.in. Include the publication name, the nature of the story, and the deadline. Interviews, quotes, and media assets are available for journalists covering SP NET INC, its products, or the founder. Response times and available contact methods are detailed on the Press Contact page.",
    category: "resources",
    links: [
      { label: "Press Contact", href: "/resources/press-contact" },
      { label: "Media Kit", href: "/resources/media-kit" },
    ],
    related: ["Can media contact SP NET?", "How can I download the Media Kit?"],
  },
  {
    question: "What resources does SP NET offer?",
    answer:
      "SP NET offers several resources: the Media Kit with brand assets and guidelines, Press Contact for media inquiries, the Open Source page detailing future release plans, the FAQ knowledge base you are reading now, and the Personal Communication Assistant for instant answers. The Blog, Newsroom, and Press Releases sections are coming soon. All resources are accessible through the Resources section of this website.",
    category: "resources",
    links: [
      { label: "Resources", href: "/resources" },
      { label: "Media Kit", href: "/resources/media-kit" },
      { label: "Open Source", href: "/resources/open-source" },
    ],
    related: ["How can I download the Media Kit?", "When will the Blog launch?"],
  },
  {
    question: "Do you have a newsletter?",
    answer:
      "A newsletter is planned for the future but is not yet available. Currently, the best ways to stay updated are through the Personal Communication Assistant (PCA) on Telegram, the social channels listed in the footer, and the System Status page. When the newsletter launches, it will provide regular updates on product development, research breakthroughs, and company milestones. The goal is to send meaningful updates, not high-volume marketing emails.",
    category: "resources",
    links: [
      { label: "Socials", href: "/company/socials" },
      { label: "System Status", href: "/trust/status" },
    ],
    related: ["When will the Blog launch?", "Where can I follow Savan's work?"],
  },

  // ─── Contact ─────────────────────────────────────────────
  {
    question: "How can I contact Savan Patel directly?",
    answer:
      "The recommended way is through the PCA at https://t.me/SAVANPATELSP_BOT for instant responses. For direct email, use savan@sp-net.in. For specific inquiries: business@sp-net.in for partnerships, media@sp-net.in for press, security@sp-net.in for vulnerabilities, careers@sp-net.in for job inquiries, hello@sp-net.in for general questions. All emails are personally reviewed and responded to within 48 hours. Calendar availability can be checked at cal.com/savanpatel.",
    category: "contact",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
      { label: "Contact", href: "/contact" },
    ],
    related: ["What is the Personal Communication Assistant?", "How can I request a meeting?"],
  },
  {
    question: "How can I request a meeting?",
    answer:
      "For meeting requests, email business@sp-net.in with the purpose of the meeting, preferred format (video call, in-person), and proposed time slots. Calendar availability can also be checked at cal.com/savanpatel. Meetings are typically scheduled for 30 minutes and require a clear agenda to ensure productive use of time. The PCA can also help schedule meetings and check availability.",
    category: "contact",
    links: [
      { label: "Calendar", href: "https://cal.com/savanpatel" },
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How can I contact Savan Patel directly?", "Can media contact SP NET?"],
  },
  {
    question: "Can media contact SP NET?",
    answer:
      "Yes. For all press and media inquiries, email media@sp-net.in. Include the publication name, the nature of the story, and the deadline. Interviews, quotes, and media assets are available for journalists covering SP NET INC, its products, or the founder. The Media Kit page provides brand assets, boilerplate text, and usage guidelines. The PCA can also help with quick media inquiries.",
    category: "contact",
    links: [
      { label: "Media Kit", href: "/resources/media-kit" },
      { label: "Press Contact", href: "/resources/press-contact" },
    ],
    related: ["How can I contact Savan Patel directly?", "How can I request a meeting?"],
  },
  {
    question: "What is the difference between Company Contact and Personal Contact?",
    answer:
      "Company Contact (at /company/contact) is for business-oriented inquiries: partnerships, press, careers, security reports, and general company questions. It lists department-specific email addresses and is the right place for formal business communication. Personal Contact (at /contact) is for reaching Savan Patel directly: it includes the PCA, a contact form, social profiles, and calendar booking. Use Company Contact for structured business inquiries and Personal Contact for direct communication with the founder.",
    category: "contact",
    links: [
      { label: "Company Contact", href: "/company/contact" },
      { label: "Personal Contact", href: "/contact" },
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How can I contact Savan Patel directly?", "Can media contact SP NET?"],
  },
  {
    question: "Where can I follow Savan's work?",
    answer:
      "Follow me on GitHub (github.com/savanpatelssp) for code and projects, Telegram (t.me/ABOUTME_SP) for direct communication, and Instagram (savanpatelssp) for visual updates. X and LinkedIn profiles are coming soon. The best way to stay updated on SP NET INC is through the social links in the footer or the PCA.",
    category: "contact",
    links: [
      { label: "Socials", href: "/company/socials" },
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How can I contact Savan Patel directly?", "When will the X profile launch?"],
  },

  // ─── Personal Communication Assistant ─────────────────────
  {
    question: "What is the Personal Communication Assistant?",
    answer:
      "The Personal Communication Assistant (PCA) is an AI-powered assistant available now via Telegram at https://t.me/SAVANPATELSP_BOT. It can answer questions about me, SP NET INC, the products, research, career opportunities, and more. The PCA is the recommended first point of contact for any inquiry — it provides instant, accurate responses 24/7 and is trained on comprehensive knowledge about the entire SP NET ecosystem.",
    category: "pca",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
      { label: "Open PCA", href: "https://t.me/SAVANPATELSP_BOT" },
    ],
    related: ["How do I use the PCA?", "Why should I use the PCA instead of email?"],
  },
  {
    question: "How do I use the PCA?",
    answer:
      "Open https://t.me/SAVANPATELSP_BOT in your browser or Telegram app and start a conversation. You can ask about anything — products, research, career opportunities, collaborations, technical questions, or general inquiries. The PCA provides instant responses. If it cannot answer your question, it will guide you to the right channel. No account or setup is required — just open the link and start chatting.",
    category: "pca",
    links: [
      { label: "Open PCA on Telegram", href: "https://t.me/SAVANPATELSP_BOT" },
    ],
    related: ["What is the Personal Communication Assistant?", "What can I ask the PCA about?"],
  },
  {
    question: "Why should I use the PCA instead of email?",
    answer:
      "The PCA provides instant responses 24/7, while email responses typically take up to 48 hours. The PCA is trained on comprehensive knowledge about SP NET INC and can handle most inquiries immediately — from product details to career questions to technical discussions. For complex business proposals, formal requests, or sensitive matters, email remains available. But the PCA is the fastest way to get accurate answers to any question.",
    category: "pca",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How do I use the PCA?", "How can I contact Savan Patel directly?"],
  },
  {
    question: "What can I ask the PCA about?",
    answer:
      "The PCA can discuss: my background and work, SP NET INC's mission and products, SP NET GRAM, ADMIN OS, AI, and the Ecosystem, research areas and technologies, career opportunities and collaborations, privacy and security practices, website and technical details, and general questions about the company. For specific departmental inquiries, the PCA will direct you to the appropriate email address. It is designed to be your first stop for any question.",
    category: "pca",
    links: [
      { label: "Open PCA on Telegram", href: "https://t.me/SAVANPATELSP_BOT" },
    ],
    related: ["How do I use the PCA?", "How can I contact Savan Patel directly?"],
  },
  {
    question: "What are the PCA's limitations?",
    answer:
      "The PCA is a knowledge assistant, not a decision-maker. It cannot approve business proposals, grant access to products, make hiring decisions, or access private data. For formal legal requests, contract negotiations, or sensitive matters that require human judgment, email or a scheduled meeting is appropriate. The PCA also cannot browse the internet in real-time or access information beyond its training data. If it cannot answer a question, it will direct you to the right channel.",
    category: "pca",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
      { label: "Contact", href: "/contact" },
    ],
    related: ["What is the Personal Communication Assistant?", "Why should I use the PCA instead of email?"],
  },

  // ─── Learning ────────────────────────────────────────────
  {
    question: "Which programming languages does Savan use?",
    answer:
      "TypeScript is my primary language across the entire SP NET stack — frontend, backend, and tooling. I chose it for its type safety, excellent ecosystem, and the ability to share code between frontend and backend. Python is my language for AI research and data processing — its AI/ML libraries are unmatched, and it excels at rapid prototyping. Rust is what I am exploring for performance-critical systems — its memory safety guarantees and zero-cost abstractions make it ideal for systems where performance and reliability are non-negotiable. The choice is always driven by practical needs, not trends.",
    category: "learning",
    links: [
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["Which frameworks does SP NET prefer?", "What technologies is Savan currently learning?"],
  },
  {
    question: "Which frameworks does SP NET prefer?",
    answer:
      "Next.js is my framework of choice for web applications — it provides server-side rendering, API routes, and excellent developer experience. React is my UI library, chosen for its component model and ecosystem. Tailwind CSS provides utility-first design with full customization for styling. Framer Motion handles animations with a physics-based approach that feels natural. On the backend, Node.js with Express or Hono for API services. I choose frameworks based on practical needs, community maturity, and long-term maintainability — not on what is trending.",
    category: "learning",
    links: [
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["Which programming languages does Savan use?", "Does SP NET build full-stack applications?"],
  },
  {
    question: "Does SP NET build full-stack applications?",
    answer:
      "Yes. Every SP NET product is built full-stack — from the database layer to the UI. This includes designing schemas, building APIs, implementing authentication, crafting responsive interfaces, and deploying to production. Being full-stack means every product has consistent quality, coherent architecture, and seamless integration between layers. There are no gaps between frontend and backend — everything is designed together.",
    category: "learning",
    links: [
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["Which frameworks does SP NET prefer?", "Which databases does SP NET use?"],
  },
  {
    question: "Which databases does SP NET use?",
    answer:
      "PostgreSQL is my primary relational database, chosen for its reliability, extensibility, and performance. Redis is used for caching and real-time features. For AI workloads, vector databases like Pinecone or pgvector are used for embeddings and similarity search. The database choice depends on the use case — relational for structured data, key-value for caching, vector for AI. Prisma is used as the ORM for type-safe database access.",
    category: "learning",
    links: [
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["Does SP NET use cloud services?", "Does SP NET build full-stack applications?"],
  },
  {
    question: "Does SP NET use cloud services?",
    answer:
      "Yes. Cloud infrastructure is a core part of the SP NET stack. Cloudflare is used for edge computing and CDN, Vercel for deployment and serverless functions, and Docker with K3s for containerized services. The approach is cloud-agnostic where possible, preferring services that offer flexibility and avoid vendor lock-in. Every service is chosen for its ability to scale with the products as they grow.",
    category: "learning",
    links: [
      { label: "Cloud Computing", href: "/research/cloud" },
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["Why cloud computing?", "Which databases does SP NET use?"],
  },
  {
    question: "What technologies is Savan currently learning?",
    answer:
      "Currently exploring Rust for performance-critical systems, WebAssembly for near-native browser performance, and local-first architecture patterns using CRDTs for offline-capable applications. My learning approach is hands-on — each technology is explored through real experiments and prototype projects documented in the Innovation Lab. The goal is always practical application, not theoretical knowledge.",
    category: "learning",
    links: [
      { label: "Innovation Lab", href: "/research/innovation-lab" },
      { label: "Learning Resources", href: "/explore/learning" },
    ],
    related: ["What is the Innovation Lab?", "Which programming languages does Savan use?"],
  },
  {
    question: "Does SP NET use AI in development?",
    answer:
      "AI is used as a development assistant — for code completion, documentation generation, research assistance, and exploring new approaches. However, every line of code I ship is reviewed, understood, and intentionally written. AI accelerates the process but does not replace engineering judgment. The writing on this site is my own words, my own thoughts. The Responsible AI page details the principles that guide how I use AI — transparency, human oversight, and ethical application.",
    category: "learning",
    links: [
      { label: "Responsible AI", href: "/trust/responsible-ai" },
      { label: "AI Research", href: "/research/ai" },
    ],
    related: ["What does Responsible AI mean to you?", "Why is SP NET interested in AI?"],
  },
  {
    question: "What is the most valuable skill for a developer?",
    answer:
      "The ability to learn quickly and adapt. Technology changes constantly — languages evolve, frameworks emerge, best practices shift. The developers who thrive are not those who memorized a specific tool, but those who understand fundamentals deeply enough to pick up anything new quickly. Problem-solving, system thinking, and clear communication matter more than knowing the latest framework. The best investment a developer can make is learning how to learn — everything else follows.",
    category: "learning",
    links: [
      { label: "Learning Resources", href: "/explore/learning" },
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["What technologies is Savan currently learning?", "How do you stay motivated to keep learning?"],
  },
  {
    question: "How do you stay motivated to keep learning?",
    answer:
      "Curiosity is the fuel. Every problem I encounter is a puzzle to solve, every technology is a tool to understand, every project is a chance to go deeper. I stay motivated because the work matters — building products that serve people, solving real problems, pushing the boundary of what I can create. Learning is not a chore; it is the most exciting part of being a builder. The moment learning feels like obligation rather than curiosity, something has gone wrong.",
    category: "learning",
    links: [
      { label: "Learning Resources", href: "/explore/learning" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["What is the most valuable skill for a developer?", "What technologies is Savan currently learning?"],
  },

  // ─── Technology ──────────────────────────────────────────
  {
    question: "Which technologies power this website?",
    answer:
      "This website is built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Framer Motion. It uses a dark theme with carefully tuned color tokens, smooth page transitions, and responsive design across all breakpoints. The architecture follows the same patterns used in SP NET products — server-rendered pages with client-side interactivity, semantic HTML, and comprehensive SEO metadata. The same design principles are applied across all SP NET products.",
    category: "technology",
    links: [
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["How often is the website updated?", "Is this website open source?"],
  },
  {
    question: "How often is the website updated?",
    answer:
      "The website is updated regularly as new content, products, and research areas are added. Major updates coincide with product milestones and research breakthroughs. The site is built with Next.js and deployed on Vercel, enabling fast iteration and near-instant updates. The sitemap and page structure reflect the current state of the project — when new features launch, the site updates to match.",
    category: "technology",
    links: [
      { label: "System Status", href: "/trust/status" },
    ],
    related: ["Which technologies power this website?", "Can I report website issues?"],
  },
  {
    question: "Can I report website issues?",
    answer:
      "Yes. If you find a broken link, a typo, a rendering issue, or anything else that seems wrong, use the PCA for quick reporting or email hello@sp-net.in with a description of the issue and the page where you found it. Website quality is taken seriously — every report is reviewed and fixed promptly.",
    category: "technology",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How often is the website updated?", "Which technologies power this website?"],
  },
  {
    question: "How is this website designed?",
    answer:
      "The website follows a dark, minimal aesthetic with carefully tuned color tokens, smooth page transitions using Framer Motion, and responsive design across all breakpoints. The design philosophy mirrors the product philosophy: craft over scale, simplicity as the ultimate sophistication, and attention to every detail. Typography, spacing, and color are all intentional — nothing is arbitrary. The goal is a site that feels fast, premium, and focused — the same standards applied to every SP NET product.",
    category: "technology",
    links: [
      { label: "Technology", href: "/explore/technology" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["Which technologies power this website?", "How often is the website updated?"],
  },
  {
    question: "Does this website have an API?",
    answer:
      "Not yet. A public API is planned for the future, but it is not a current priority. The focus is on building the core products — GRAM, ADMIN OS, and AI — to a high standard before exposing public interfaces. When an API is released, it will follow the same principles as the products: well-documented, type-safe, privacy-respecting, and designed for developer experience. The PCA can provide the latest status on API plans.",
    category: "technology",
    links: [
      { label: "Technology", href: "/explore/technology" },
      { label: "System Status", href: "/trust/status" },
    ],
    related: ["Which technologies power this website?", "Is this website open source?"],
  },
  {
    question: "How does SP NET approach software architecture?",
    answer:
      "The architecture philosophy is modular, scalable, and privacy-first. Every system is designed with clear separation of concerns, well-defined interfaces between components, and the principle that data should flow only where it needs to. Microservices for product boundaries, event-driven communication between services, and infrastructure as code for reproducibility. The goal is systems that are easy to understand, easy to modify, and easy to scale — not systems that are clever, but systems that are clear.",
    category: "technology",
    links: [
      { label: "Technology", href: "/explore/technology" },
      { label: "Cloud Computing", href: "/research/cloud" },
    ],
    related: ["Does SP NET build full-stack applications?", "Does SP NET use cloud services?"],
  },
  {
    question: "How does SP NET approach software testing?",
    answer:
      "Testing is automated and integrated into the development workflow. Unit tests for individual functions, integration tests for API endpoints, end-to-end tests for critical user flows. Continuous integration runs tests on every commit, and deployment only proceeds when all tests pass. Manual QA is used for exploratory testing and edge cases that automated tests cannot easily cover. The goal is confidence — not 100% coverage for its own sake, but enough coverage to refactor fearlessly and ship with confidence.",
    category: "technology",
    links: [
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["How does SP NET approach software architecture?", "Does SP NET use AI in development?"],
  },
  {
    question: "How does SP NET approach accessibility?",
    answer:
      "Accessibility is a core engineering requirement, not an afterthought. Every page uses semantic HTML, ARIA labels where needed, keyboard navigation support, and sufficient color contrast ratios. The dark theme is designed to meet WCAG AA standards. Testing includes keyboard-only navigation and screen reader compatibility. The goal is that every user, regardless of ability, can access and use every feature. Accessibility is part of the craft — it is not optional.",
    category: "technology",
    links: [
      { label: "Technology", href: "/explore/technology" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["How is this website designed?", "Which technologies power this website?"],
  },

  // ─── Open Source ─────────────────────────────────────────
  {
    question: "How are your projects currently developed?",
    answer:
      "All SP NET projects are currently developed privately. The repositories are not public and contributions cannot be accepted at this time. The reasons are practical: products are in active development with rapidly shifting APIs and architecture, security is critical since the products handle sensitive data, and documentation and test coverage must meet strict standards before public release. I plan to release select projects under MIT or Apache 2.0 licenses when the code meets the quality bar — the trigger is not a calendar date, it is when the code is ready.",
    category: "open_source",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
    ],
    related: ["Can I contribute to SP NET projects?", "Will SP NET release open source tools in the future?"],
  },
  {
    question: "Can I contribute to SP NET projects?",
    answer:
      "Not yet. The repositories are private and contributions cannot be accepted at this time. When public repositories become available, contribution guidelines will be published alongside them. I value community involvement and plan to enable contributions when the time is right. For now, the best way to stay involved is to follow the journey on GitHub and Telegram, and provide feedback as products mature.",
    category: "open_source",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
      { label: "GitHub", href: "https://github.com/savanpatelssp" },
    ],
    related: ["How are your projects currently developed?", "Will SP NET release open source tools in the future?"],
  },
  {
    question: "Will SP NET release open source tools in the future?",
    answer:
      "Yes. I plan to release select projects and developer tools as open source as the ecosystem matures. The first releases will likely be a developer toolkit (shared utilities, ESLint configurations, TypeScript presets), a design system (the component library used across SP NET products), and eventually this portfolio website. The Open Source page details the planned releases and the four-phase approach: private development, quality hardening, selective release, and full ecosystem release.",
    category: "open_source",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
    ],
    related: ["How are your projects currently developed?", "Can I contribute to SP NET projects?"],
  },
  {
    question: "Is this website open source?",
    answer:
      "Not yet. The source code for this portfolio website is private. I plan to release it publicly when the code meets the quality, documentation, and security standards required for open source. It is built with Next.js, TypeScript, Tailwind CSS, and Framer Motion — and I intend to share it as a reference implementation for modern web development. The Open Source page provides details on the release phases and timeline.",
    category: "open_source",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
    ],
    related: ["How are your projects currently developed?", "Which technologies power this website?"],
  },
  {
    question: "How can I support SP NET's open source efforts?",
    answer:
      "The best ways to support SP NET's open source work right now: follow the GitHub profile (github.com/savanpatelssp) to stay updated on releases, provide feedback on products as they mature, share SP NET products with others who might benefit, and engage with the community on Telegram. When repositories become public, starring, watching, and contributing code will be the most direct forms of support. The goal is to earn support through quality, not ask for it through marketing.",
    category: "open_source",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
      { label: "GitHub", href: "https://github.com/savanpatelssp" },
    ],
    related: ["Will SP NET release open source tools in the future?", "Can I contribute to SP NET projects?"],
  },

  // ─── Coming Soon ─────────────────────────────────────────
  {
    question: "When will the Blog launch?",
    answer:
      "The Blog is actively being developed and will launch when there is enough quality content to justify the section. The focus is on publishing meaningful technical articles, product updates, and insights — not maintaining a high-volume content calendar. Every article will be written with the same attention to detail that defines SP NET products. Follow the journey through the PCA or social channels for updates on the launch timeline.",
    category: "coming_soon",
    links: [
      { label: "Blog", href: "/resources/blog" },
    ],
    related: ["When will the X profile launch?", "Why launch pages as Coming Soon instead of waiting?"],
  },
  {
    question: "When will the Newsroom launch?",
    answer:
      "The Newsroom is coming soon. It will serve as the official channel for company updates, milestones, product announcements, and press coverage. The goal is to provide a centralized place for all official SP NET INC communications — not a high-volume news feed, but a curated collection of meaningful updates. The Newsroom will launch when there is sufficient content to justify the section. Follow the PCA or social channels for updates.",
    category: "coming_soon",
    links: [
      { label: "Newsroom", href: "/company/newsroom" },
    ],
    related: ["When will Press Releases be available?", "When will the Blog launch?"],
  },
  {
    question: "When will Press Releases be available?",
    answer:
      "Press Releases are coming soon. They will be published through the Newsroom and distributed to media contacts. Press releases will cover major milestones: product launches, funding announcements, partnership details, and significant technology breakthroughs. The goal is to provide journalists and media outlets with accurate, timely information about SP NET INC. The PCA can provide the latest status on press release plans.",
    category: "coming_soon",
    links: [
      { label: "Press Releases", href: "/resources/press-releases" },
      { label: "Newsroom", href: "/company/newsroom" },
    ],
    related: ["When will the Newsroom launch?", "Can media contact SP NET?"],
  },
  {
    question: "When will the X profile launch?",
    answer:
      "The X (formerly Twitter) profile is coming soon. It will serve as a channel for real-time updates, technical insights, and engagement with the developer community. Follow the PCA or other social channels for updates on the launch. The profile will be announced across all active channels when it goes live.",
    category: "coming_soon",
    links: [
      { label: "Socials", href: "/company/socials" },
    ],
    related: ["When will the LinkedIn profile launch?", "Where can I follow Savan's work?"],
  },
  {
    question: "When will the LinkedIn profile launch?",
    answer:
      "The LinkedIn profile is coming soon. It will serve as the professional presence for SP NET INC, providing company updates, career opportunities, and industry insights. Follow the PCA or other social channels for updates on the launch. The profile will complement the existing social presence on GitHub, Telegram, and Instagram.",
    category: "coming_soon",
    links: [
      { label: "Socials", href: "/company/socials" },
    ],
    related: ["When will the X profile launch?", "Where can I follow Savan's work?"],
  },
  {
    question: "When will the SP NET Ecosystem page be available?",
    answer:
      "The SP NET Ecosystem page is coming soon as the unified platform connecting GRAM, ADMIN OS, and AI is being finalized. The Ecosystem represents one account, one data layer, one API surface — every product feels like a seamless part of something bigger. The Products > Ecosystem page provides a preview of what is being built. The PCA can provide the latest status on the Ecosystem development.",
    category: "coming_soon",
    links: [
      { label: "SP NET Ecosystem", href: "/products/sp-net-ecosystem" },
      { label: "Future Vision", href: "/explore/vision" },
    ],
    related: ["What is the SP NET Ecosystem?", "When will the Blog launch?"],
  },
  {
    question: "Why launch pages as Coming Soon instead of waiting?",
    answer:
      "Coming Soon pages serve multiple purposes: they indicate that a section is intentional and planned, not abandoned; they provide a preview of what is being built; they maintain a complete site structure; and they signal transparency about the current state of the project. Rather than hiding incomplete sections, I choose to be upfront about what is in progress. This builds trust and gives visitors a clear picture of what is coming.",
    category: "coming_soon",
    links: [
      { label: "Transparency", href: "/trust/transparency" },
    ],
    related: ["When will the Blog launch?", "When will the X profile launch?"],
  },

  // ─── Legal ───────────────────────────────────────────────
  {
    question: "What licenses will SP NET open source projects use?",
    answer:
      "Select projects will be released under MIT or Apache 2.0 licenses, depending on the project type. Developer tools and utilities will typically use MIT for maximum adoption. Projects that include patentable innovations may use Apache 2.0 for patent protection. The specific license for each project will be determined at the time of release and documented in the repository. The goal is to choose licenses that maximize community adoption while protecting the project and its users.",
    category: "legal",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
    ],
    related: ["Will SP NET release open source tools in the future?", "How are your projects currently developed?"],
  },
  {
    question: "Can I use SP NET brand assets?",
    answer:
      "Yes, within the published brand guidelines. The Media Kit at Resources > Media Kit includes the official logo, color palette, typography, and detailed usage rules. Brand assets may be used for references, articles, presentations, and similar purposes when following the guidelines. For uses outside the published guidelines — such as commercial use, endorsement implications, or modified logos — contact media@sp-net.in for permission. The brand guidelines exist to ensure accurate and consistent representation of SP NET INC.",
    category: "legal",
    links: [
      { label: "Media Kit", href: "/resources/media-kit" },
      { label: "Brand", href: "/company/brand" },
    ],
    related: ["How can I download the Media Kit?", "Can media contact SP NET?"],
  },
  {
    question: "What are the terms of using SP NET products?",
    answer:
      "Detailed terms of service will be published before each product's public launch. The principles that will guide those terms: your data belongs to you — SP NET does not claim ownership of user content; privacy by default — data collection is minimized and transparent; fair usage — reasonable use policies that do not penalize power users; and clear cancellation — you can export your data and leave at any time. Beta access terms will be simpler and more flexible than final terms, as the products are still evolving.",
    category: "legal",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
      { label: "Products", href: "/explore/products" },
    ],
    related: ["How does SP NET handle privacy?", "Are SP NET products available to use now?"],
  },

  // ─── Privacy ─────────────────────────────────────────────
  {
    question: "What data does this website collect?",
    answer:
      "This website collects only the data necessary to function: contact form submissions (name, email, message) are stored securely and used only to respond to inquiries. No browsing data, no analytics, no tracking cookies, no advertising identifiers. Third-party services (Vercel for hosting, Resend for email) are selected for their privacy practices and data handling policies. The goal is to collect the absolute minimum data required to provide the service — nothing more.",
    category: "privacy",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
    ],
    related: ["Does this website use tracking?", "Can I request my data be deleted?"],
  },
  {
    question: "Can I request my data be deleted?",
    answer:
      "Yes. If you have submitted a contact form or interacted with SP NET in any way, you can request deletion of your data by emailing hello@sp-net.in with the subject line 'Data Deletion Request.' Include the email address you used and a brief description of what data you would like deleted. Requests are processed within 72 hours and confirmed via email. This applies to all data held by SP NET INC, not just website data.",
    category: "privacy",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["What data does this website collect?", "How does SP NET handle privacy?"],
  },
  {
    question: "How does SP NET handle data in its products?",
    answer:
      "Every SP NET product is designed with privacy at its core: end-to-end encryption ensures that only the intended recipients can read messages; zero data retention by default means data is not stored longer than necessary; user-controlled permissions give you explicit control over what data is shared and with whom; and transparent data practices mean you always know what is being collected and why. The principle is simple: your data belongs to you, and SP NET is a steward, not an owner.",
    category: "privacy",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
      { label: "Trust & Security", href: "/trust/security" },
    ],
    related: ["How does SP NET handle privacy?", "Does SP NET sell user data?"],
  },

  // ─── Security ────────────────────────────────────────────
  {
    question: "How can I report a security vulnerability?",
    answer:
      "If you discover a security vulnerability in any SP NET product or website, report it responsibly by emailing security@sp-net.in. Include a description of the issue, steps to reproduce, and the potential impact. All reports are reviewed within 24 hours. Responsible disclosure ensures that vulnerabilities are fixed before they can be exploited, protecting all users. The Security page provides full details on the responsible disclosure process.",
    category: "security",
    links: [
      { label: "Security", href: "/trust/security" },
    ],
    related: ["How does SP NET approach data breaches?", "Do you do bug bounties?"],
  },
  {
    question: "How does SP NET approach data breaches?",
    answer:
      "Data breach response is planned with three principles: immediate investigation — any reported or detected incident is investigated within 24 hours; transparent communication — affected users are notified promptly with clear information about what happened and what is being done; and systematic remediation — the root cause is identified and fixed, and preventive measures are implemented to prevent recurrence. The goal is to handle incidents with the same transparency and rigor that defines every other aspect of SP NET.",
    category: "security",
    links: [
      { label: "Security", href: "/trust/security" },
      { label: "Transparency", href: "/trust/transparency" },
    ],
    related: ["How can I report a security vulnerability?", "How does SP NET handle privacy?"],
  },
  {
    question: "Do you do bug bounties?",
    answer:
      "Not yet. A formal bug bounty program is planned for the future but is not currently active. Responsible security disclosures are accepted and appreciated — email security@sp-net.in with vulnerability details. When products reach public beta and have a user base, a structured bug bounty program with defined scope, rewards, and rules of engagement will be introduced. The goal is to incentivize security research while maintaining clear boundaries.",
    category: "security",
    links: [
      { label: "Security", href: "/trust/security" },
    ],
    related: ["How can I report a security vulnerability?", "How does SP NET approach data breaches?"],
  },
  {
    question: "What is SP NET's approach to encryption?",
    answer:
      "Every SP NET product that handles sensitive data uses end-to-end encryption (E2EE). This means that data is encrypted on the sender's device and only decrypted on the recipient's device — SP NET never has access to the plaintext. The encryption protocols follow industry standards (AES-256 for symmetric encryption, X25519 for key exchange). The zero-knowledge architecture means that even if SP NET's servers were compromised, the encrypted data would be useless without the user's private keys.",
    category: "security",
    links: [
      { label: "Security", href: "/trust/security" },
      { label: "SP NET GRAM", href: "/products/sp-net-gram" },
    ],
    related: ["How does SP NET handle privacy?", "How can I report a security vulnerability?"],
  },

  // ─── Responsible AI ──────────────────────────────────────
  {
    question: "What does Responsible AI mean to you?",
    answer:
      "Responsible AI means four things to me: human first — AI should help people, not replace their judgment, and humans can always review, override, or understand AI decisions; no deception — I do not use AI to generate misleading content, fake personas, or deceptive experiences; ethical boundaries — I do not use AI for manipulation, harmful content, or bypassing consent; transparent usage — I label AI-generated, recommended, or influenced content. Every line of AI-assisted code I ship is reviewed and understood. The writing on this site is my own words, my own thoughts, my own personality.",
    category: "responsible_ai",
    links: [
      { label: "Responsible AI", href: "/trust/responsible-ai" },
      { label: "AI Research", href: "/research/ai" },
    ],
    related: ["Why is SP NET interested in AI?", "Do you use AI to generate content for this portfolio?"],
  },
  {
    question: "Will AI replace your work?",
    answer:
      "No. AI is a tool that amplifies capability, not a replacement for human judgment, creativity, or engineering decisions. I use AI for code completion, documentation, research assistance, and exploring new approaches — but every decision, every architecture choice, every line of code is intentionally written and understood. AI accelerates the process; it does not replace the engineer. The goal is to use AI as a force multiplier, not a crutch.",
    category: "responsible_ai",
    links: [
      { label: "Responsible AI", href: "/trust/responsible-ai" },
      { label: "AI Research", href: "/research/ai" },
    ],
    related: ["What does Responsible AI mean to you?", "Does SP NET use AI in development?"],
  },
  {
    question: "Do you use AI to generate content for this portfolio?",
    answer:
      "No. All writing on this website — every product description, every research explanation, every FAQ answer, every philosophy statement — is written by me. AI is used as a development assistant for code, not for content. The words on this site represent my thoughts, my perspective, my voice. When AI assists with code (documentation generation, code completion), every line is reviewed and understood before being committed. The goal is authenticity — visitors should hear from me, not from a language model.",
    category: "responsible_ai",
    links: [
      { label: "Responsible AI", href: "/trust/responsible-ai" },
    ],
    related: ["What does Responsible AI mean to you?", "Does SP NET use AI in development?"],
  },
  {
    question: "What about AI bias?",
    answer:
      "AI bias is a real concern that I take seriously. The approach is: acknowledge that bias exists in all AI systems — no model is perfectly neutral; use diverse, well-curated training data to minimize systematic bias; implement human review for AI-generated outputs; provide transparency about how AI decisions are made; and continuously monitor and improve models based on feedback. The goal is not perfection — that is impossible — but active awareness and continuous improvement. When bias is detected, it is treated as a critical issue to be resolved, not an acceptable trade-off.",
    category: "responsible_ai",
    links: [
      { label: "Responsible AI", href: "/trust/responsible-ai" },
      { label: "AI Research", href: "/research/ai" },
    ],
    related: ["What does Responsible AI mean to you?", "Will AI replace your work?"],
  },

  // ─── Career & Collaboration ──────────────────────────────
  {
    question: "Are internships available at SP NET INC?",
    answer:
      "SP NET INC does not currently offer formal internship programs. The company is a lean, founder-led operation focused on shipping products. However, if you are a talented individual passionate about the problems being solved, reach out through the PCA or email careers@sp-net.in with your background. Exceptional candidates may be considered for future opportunities as the company scales.",
    category: "career",
    links: [
      { label: "Careers", href: "/company/careers" },
    ],
    related: ["How do I apply to work at SP NET INC?", "Is Savan available for freelance work?"],
  },
  {
    question: "Is Savan available for freelance work?",
    answer:
      "I am primarily focused on building SP NET INC and its products. I am not available for freelance work at this time. For collaboration opportunities or consulting inquiries, use the PCA or email business@sp-net.in with the details of the project and how it aligns with the work being done at SP NET INC. The best collaborations happen when there is genuine alignment between both parties.",
    category: "career",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["Can I collaborate with SP NET?", "How do I apply to work at SP NET INC?"],
  },
  {
    question: "Can I collaborate with SP NET?",
    answer:
      "Collaboration is welcome when there is genuine alignment. Whether it is a research initiative, a product integration, or a shared technical challenge, reach out with a clear proposal through the PCA or email hello@sp-net.in with what you are building, why you want to collaborate, and what you bring to the table. The best collaborations happen when both sides bring something unique to the table.",
    category: "career",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
      { label: "Partners", href: "/company/partners" },
    ],
    related: ["Is Savan available for freelance work?", "How do I apply to work at SP NET INC?"],
  },
  {
    question: "How do I apply to work at SP NET INC?",
    answer:
      "When roles open, they will be posted on the Careers page and shared across SP NET INC channels. In the meantime, the best way to get on the radar is to build things, share your work, and engage with the SP NET community. I value craft over credentials — show what you can build. The Careers page lists the types of roles that will open as the company scales, along with the culture and benefits.",
    category: "career",
    links: [
      { label: "Careers", href: "/company/careers" },
      { label: "About SP NET INC", href: "/company/about" },
    ],
    related: ["What is the culture like at SP NET INC?", "Are internships available at SP NET INC?"],
  },
  {
    question: "What benefits does SP NET INC offer?",
    answer:
      "SP NET INC is currently a founder-led operation, so formal benefits packages are not yet in place. However, the planned benefits for future team members include: competitive compensation that reflects the value of the work, flexible remote work with no mandatory office hours, generous learning and development budgets, equity participation for early team members, health insurance, and unlimited PTO with a culture that respects actual time off. The benefits are designed to attract and retain exceptional people who want to do the best work of their careers.",
    category: "career",
    links: [
      { label: "Careers", href: "/company/careers" },
      { label: "Culture", href: "/company/about" },
    ],
    related: ["What is the culture like at SP NET INC?", "What roles will SP NET INC hire for?"],
  },
  {
    question: "What roles will SP NET INC hire for?",
    answer:
      "As SP NET INC scales, the planned hiring areas include: engineering roles (full-stack, backend, frontend, DevOps, security), design roles (product design, UX research), product roles (product management, technical program management), and operations roles (marketing, community management, business development). The hiring philosophy is senior-first — every new hire should set the standard, not just fill a seat. Roles will be posted on the Careers page when they open.",
    category: "career",
    links: [
      { label: "Careers", href: "/company/careers" },
      { label: "Leadership", href: "/company/leadership" },
    ],
    related: ["How do I apply to work at SP NET INC?", "What benefits does SP NET INC offer?"],
  },
];
