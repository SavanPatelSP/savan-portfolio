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
  Rocket,
  Clock,
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

// Helper so we can use <Code> without a React import at the top
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
  { id: "company", label: "Company", icon: <Building2 className="h-3.5 w-3.5" /> },
  { id: "products", label: "Products", icon: <Layers className="h-3.5 w-3.5" /> },
  { id: "open_source", label: "Open Source", icon: <Code className="h-3.5 w-3.5" /> },
  { id: "research", label: "Research", icon: <Lightbulb className="h-3.5 w-3.5" /> },
  { id: "trust", label: "Trust & Privacy", icon: <Shield className="h-3.5 w-3.5" /> },
  { id: "communication", label: "Communication", icon: <Mail className="h-3.5 w-3.5" /> },
  { id: "career", label: "Career & Collaboration", icon: <Briefcase className="h-3.5 w-3.5" /> },
  { id: "founder", label: "Founder", icon: <User className="h-3.5 w-3.5" /> },
  { id: "website", label: "Website", icon: <Globe className="h-3.5 w-3.5" /> },
  { id: "learning", label: "Learning & Technologies", icon: <BookOpen className="h-3.5 w-3.5" /> },
  { id: "coming_soon", label: "Coming Soon", icon: <Clock className="h-3.5 w-3.5" /> },
];

export const faqItems: FAQItem[] = [
  // ─── General ─────────────────────────────────────────────
  {
    question: "Who is Savan Patel?",
    answer:
      "Savan Patel is a self-taught software engineer and the founder of SP NET INC. He began coding in 2018 and has since built deep expertise across full-stack development, artificial intelligence, cloud infrastructure, and cybersecurity. He serves as Founder & Product Engineer, leading all product strategy, engineering, design, and operations at SP NET INC. His approach is hands-on — every product is built, tested, and shipped by him personally.",
    category: "general",
    links: [
      { label: "About Savan", href: "/founder/about" },
      { label: "Journey", href: "/founder/journey" },
    ],
    related: ["What is this website?", "What are you currently working on?"],
  },
  {
    question: "What is this website?",
    answer:
      "This is the official portfolio and company website of Savan Patel and SP NET INC. It showcases the products being built, the technologies being explored, the philosophy behind the work, and provides ways to get in touch. It is built with Next.js, TypeScript, Tailwind CSS, and Framer Motion — the same stack used across SP NET products. The site serves as both a public showcase and a reference implementation for modern web development.",
    category: "general",
    links: [
      { label: "About SP NET INC", href: "/company/about" },
      { label: "Products", href: "/explore/products" },
    ],
    related: ["Who is Savan Patel?", "Which technologies power this website?"],
  },
  {
    question: "Why did you create this portfolio?",
    answer:
      "This portfolio serves multiple purposes: it is a public showcase of the products and vision behind SP NET INC, a resource for developers and collaborators who want to learn about the work being done, and a central hub for anyone who wants to get in touch. It also demonstrates the engineering and design standards that define every SP NET product — the same attention to detail, performance, and user experience that goes into the products themselves.",
    category: "general",
    links: [
      { label: "Philosophy", href: "/founder/philosophy" },
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["What is this website?", "What is SP NET INC?"],
  },
  {
    question: "What are you currently working on?",
    answer:
      "Currently, the focus is on three core products: SP NET GRAM (a next-generation messaging platform focused on privacy and premium experiences), SP NET ADMIN OS (an enterprise administration platform with full organizational tooling), and SP NET AI (an AI research initiative powering intelligent experiences across the ecosystem). Additionally, there is ongoing research in artificial intelligence, cloud computing, cybersecurity, and emerging technologies. The roadmap and current focus areas are detailed on the System Status and Roadmap pages.",
    category: "general",
    links: [
      { label: "System Status", href: "/trust/status" },
      { label: "Roadmap", href: "/founder/roadmap" },
    ],
    related: ["What is SP NET INC?", "What is the SP NET Ecosystem?"],
  },
  {
    question: "What is SP NET INC's long-term vision?",
    answer:
      "SP NET INC is building the infrastructure for modern communication, enterprise administration, and intelligent automation. The long-term vision is a unified ecosystem where GRAM, ADMIN OS, and AI work together seamlessly — a platform that connects people, empowers organizations, and amplifies human capability through intelligent systems. The company believes technology should be invisible when it works and transformative when it matters.",
    category: "general",
    links: [
      { label: "Mission", href: "/company/mission" },
      { label: "Future Vision", href: "/explore/vision" },
    ],
    related: ["What is SP NET INC?", "What is the SP NET Ecosystem?"],
  },

  // ─── Company ─────────────────────────────────────────────
  {
    question: "What is SP NET INC?",
    answer:
      "SP NET INC is a technology company founded in 2022 by Savan Patel. It builds infrastructure for modern communication, enterprise administration, and intelligent automation. The company operates as a lean, founder-led organization based in India, with a focus on crafting exceptional products that work together as a unified ecosystem. Every product is designed with privacy at its core, performance as a priority, and user experience as the measure of success.",
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
      "SP NET INC's mission is to build technology that connects people, empowers organizations, and amplifies human capability through intelligent systems. Every product is designed with privacy at its core, performance as a priority, and user experience as the measure of success. The company believes technology should be invisible when it works and transformative when it matters — building tools that fade into the background when they work perfectly and step forward when they can make a difference.",
    category: "company",
    links: [
      { label: "Mission & Vision", href: "/company/mission" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["What is SP NET INC?", "What is SP NET INC's long-term vision?"],
  },
  {
    question: "How big is SP NET INC?",
    answer:
      "SP NET INC is currently a founder-led operation with a lean team structure. The company operates with a senior-first hiring philosophy — building a small team of exceptional people who set the standard. As the company scales, leadership and engineering roles will open. The focus is on quality of talent, not quantity. Every person who joins must multiply the team's capability.",
    category: "company",
    links: [
      { label: "Leadership", href: "/company/leadership" },
      { label: "Careers", href: "/company/careers" },
    ],
    related: ["How do I apply to work at SP NET INC?", "What is the culture like at SP NET INC?"],
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
    related: ["Does SP NET INC offer remote work?", "What is the culture like at SP NET INC?"],
  },
  {
    question: "What is the culture like at SP NET INC?",
    answer:
      "The culture is built on four pillars: craft over scale, simplicity wins, ship to learn, and people first. SP NET INC believes in obsessive attention to detail, removing unnecessary complexity, learning from real users, and investing in the humans behind the technology. It is an engineering-first culture with high standards and full autonomy — every person owns their work end-to-end.",
    category: "company",
    links: [
      { label: "Careers", href: "/company/careers" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["How do I apply to work at SP NET INC?", "Does SP NET INC offer remote work?"],
  },

  // ─── Products ────────────────────────────────────────────
  {
    question: "What is SP NET GRAM?",
    answer:
      "SP NET GRAM is a next-generation messaging platform focused on privacy, productivity, and premium experiences. It features end-to-end encryption, real-time communication, media sharing, team collaboration, and a privacy-first architecture. It is designed to be both powerful and thoughtfully designed — a messaging platform that respects your data while delivering a premium experience. SP NET GRAM is currently in active development and is not yet publicly available.",
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
      "SP NET ADMIN OS is a comprehensive enterprise administration platform with full organizational tooling. It includes role-based access control, audit logging, analytics, workflow automation, and team management features. It is designed to give organizations complete visibility and control over their operations through a clean, intuitive interface. SP NET ADMIN OS is currently in active development and is not yet publicly available.",
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
      "SP NET AI is an AI research initiative powering intelligent experiences across the entire SP NET ecosystem. It focuses on building AI capabilities that are privacy-first, context-aware, and genuinely useful — from smart message composition in GRAM to automated workflows in ADMIN OS. The goal is to create a unified intelligence layer that enhances every product without compromising user privacy. SP NET AI is currently in active development.",
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
      "The SP NET Ecosystem is the unified platform connecting all SP NET products — GRAM, ADMIN OS, and AI — into a seamless experience. Rather than isolated tools, the ecosystem is designed so that context, data, and intelligence flow between products, creating a whole that is greater than the sum of its parts. Every product is built to work independently, but together they form a comprehensive platform. The Ecosystem page is currently coming soon as the platform is being finalized.",
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
      "SP NET GRAM, SP NET ADMIN OS, and SP NET AI are all currently in active development. They are not yet publicly available. The products page and individual product pages provide details on features and the vision behind each product. Follow the journey on the System Status page or through the founder's social channels for updates on launch timelines. The PCA can also provide the latest status on any product.",
    category: "products",
    links: [
      { label: "Products", href: "/explore/products" },
      { label: "System Status", href: "/trust/status" },
    ],
    related: ["What is SP NET GRAM?", "What is SP NET ADMIN OS?"],
  },
  {
    question: "Which SP NET product should I follow first?",
    answer:
      "If you are interested in communication and messaging, start with SP NET GRAM. If enterprise tooling and organization management interest you, follow SP NET ADMIN OS. If AI and intelligent systems are your focus, SP NET AI is the initiative to watch. All three products are interconnected through the SP NET Ecosystem, so following any one of them gives you insight into the broader vision. The PCA can help you learn more about any specific product.",
    category: "products",
    links: [
      { label: "SP NET GRAM", href: "/products/sp-net-gram" },
      { label: "SP NET ADMIN OS", href: "/products/sp-net-admin-os" },
      { label: "SP NET AI", href: "/products/sp-net-ai" },
    ],
    related: ["What is the SP NET Ecosystem?", "Are SP NET products available to use now?"],
  },

  // ─── Open Source ─────────────────────────────────────────
  {
    question: "Are SP NET projects open source?",
    answer:
      "SP NET projects are currently private and not open source. The company's open source page provides details on the current status and future plans. As the ecosystem matures, select projects and tools may be released publicly under permissive licenses. The decision to open source is driven by community value and strategic alignment — the goal is to give back to the developer community when the time is right.",
    category: "open_source",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
    ],
    related: ["Can I contribute to SP NET projects?", "Will SP NET release open source tools in the future?"],
  },
  {
    question: "Can I contribute to SP NET projects?",
    answer:
      "SP NET projects are currently private and not accepting external contributions. As the ecosystem matures and select projects are released publicly, contribution guidelines and processes will be shared. The company values community involvement and plans to enable contributions when the time is right. For now, the best way to stay involved is to follow the journey on social media and the blog.",
    category: "open_source",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
      { label: "Contact", href: "/get-in-touch" },
    ],
    related: ["Are SP NET projects open source?", "Will SP NET release open source tools in the future?"],
  },
  {
    question: "Will SP NET release open source tools in the future?",
    answer:
      "Yes. SP NET INC plans to release select projects and developer tools as open source as the ecosystem matures. The Open Source page provides details on what may be released and the timeline. The first releases will likely be developer tools and utility libraries that are already stable internally. The trigger is not a calendar date — it is when the code meets the standards for public consumption.",
    category: "open_source",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
    ],
    related: ["Are SP NET projects open source?", "Can I contribute to SP NET projects?"],
  },
  {
    question: "What licenses will SP NET open source projects use?",
    answer:
      "The default will be MIT — the most permissive and widely used open source license. Some projects may use Apache 2.0 or other licenses depending on their scope and intellectual property considerations. Every public repository will have a clear LICENSE file explaining the terms. The goal is to make contributions as easy as possible while protecting the integrity of the projects.",
    category: "open_source",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
    ],
    related: ["Will SP NET release open source tools in the future?", "Can I contribute to SP NET projects?"],
  },
  {
    question: "How can I stay updated on open source releases?",
    answer:
      "Follow Savan on GitHub (github.com/savanpatelssp) for code and projects, and on Telegram (t.me/ABOUTME_SP) for direct communication. The Blog and Newsroom sections will also announce significant releases. The PCA can provide the latest status on open source plans. Email hello@sp-net.in to be added to the notification list for major releases.",
    category: "open_source",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
      { label: "Contact", href: "/get-in-touch" },
    ],
    related: ["Will SP NET release open source tools in the future?", "Where can I follow Savan's work?"],
  },

  // ─── Research ────────────────────────────────────────────
  {
    question: "What research areas does SP NET focus on?",
    answer:
      "SP NET's primary research areas are artificial intelligence (LLMs, RAG pipelines, multi-agent systems, federated learning), cloud computing (edge computing, serverless architecture, self-healing systems), cybersecurity (zero-trust architecture, post-quantum cryptography), and emerging technologies (AR/VR, IoT, neuromorphic computing). Each area is explored through the lens of practical application to SP NET products — research that does not eventually serve a product is not pursued.",
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
      "AI represents the most significant shift in how software serves people. SP NET AI is built on the belief that AI should amplify human capability, not replace human judgment. The interest is not in AI as a buzzword, but in AI as a practical tool — systems that understand context, anticipate needs, and automate the routine so humans can focus on the creative. From smart message composition in GRAM to automated workflows in ADMIN OS, AI is woven into every product as a unified intelligence layer.",
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
      "Security is not a feature — it is a foundation. Every SP NET product handles sensitive data: messages, organizational information, user identities. Without strong security, none of the other work matters. The focus on cybersecurity comes from building products that people trust with their most important communications and data. This includes end-to-end encryption, zero-trust architecture, and responsible disclosure practices.",
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
      "Cloud computing is the infrastructure that makes modern software possible. SP NET focuses on building systems that are resilient, scalable, and cost-efficient — from containerized microservices to edge-deployed functions. Cloud-native architecture enables SP NET products to serve users globally while maintaining performance and reliability. The approach is cloud-agnostic where possible, preferring services that offer flexibility and avoid vendor lock-in.",
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
      "The Innovation Lab is where experimental ideas are tested before they become products. It is a space for rapid prototyping, proof-of-concept projects, and exploring emerging technologies. Experiments in the lab document the process, findings, and potential applications — providing transparency into how ideas evolve from curiosity to implementation. The lab focuses on technologies that could enhance the SP NET ecosystem.",
    category: "research",
    links: [
      { label: "Innovation Lab", href: "/research/innovation-lab" },
      { label: "Future Technologies", href: "/research/future-tech" },
    ],
    related: ["What technologies is Savan currently learning?", "What research areas does SP NET focus on?"],
  },

  // ─── Trust & Privacy ─────────────────────────────────────
  {
    question: "How does SP NET handle privacy?",
    answer:
      "Privacy is a foundational principle, not an afterthought. Every SP NET product is designed with privacy at its core: end-to-end encryption, zero data retention by default, user-controlled permissions, and transparent data practices. The Trust section of this website details the specific principles and practices for privacy, security, and transparency. Privacy is not a feature to be added later — it is the foundation upon which every product is built.",
    category: "trust",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
      { label: "Trust & Security", href: "/trust/security" },
    ],
    related: ["Does this website use tracking?", "Does SP NET sell user data?"],
  },
  {
    question: "How can I report a security vulnerability?",
    answer:
      "If you discover a security vulnerability in any SP NET product or website, report it responsibly by emailing security@sp-net.in. Include a description of the issue, steps to reproduce, and the potential impact. All reports are reviewed within 24 hours. Responsible disclosure ensures that vulnerabilities are fixed before they can be exploited, protecting all users. The Security page provides full details on the responsible disclosure process.",
    category: "trust",
    links: [
      { label: "Security", href: "/trust/security" },
      { label: "Responsible Disclosure", href: "/trust/security" },
    ],
    related: ["How does SP NET handle privacy?", "Does SP NET sell user data?"],
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
      "No. This website uses no tracking cookies, no analytics scripts, and no advertising. Contact form submissions are stored securely and used only to respond to inquiries. Third-party services (hosting, email) are selected for their privacy practices. The Trust > Privacy page provides full details on the approach to data handling. Your browsing experience here is completely private.",
    category: "trust",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
    ],
    related: ["How does SP NET handle privacy?", "Does SP NET sell user data?"],
  },
  {
    question: "How does SP NET approach responsible AI?",
    answer:
      "SP NET is committed to building AI that is ethical, transparent, and beneficial. The Responsible AI page outlines the principles guiding AI development: privacy-first design, human oversight, transparency in AI decision-making, and continuous evaluation for bias and fairness. AI is used to amplify human capability, not replace human judgment. Every AI feature is designed with user consent and control at its core.",
    category: "trust",
    links: [
      { label: "Responsible AI", href: "/trust/responsible-ai" },
      { label: "AI Research", href: "/research/ai" },
    ],
    related: ["Why is SP NET interested in AI?", "How does SP NET handle privacy?"],
  },
  {
    question: "How can I check SP NET's system status?",
    answer:
      "The System Status page provides real-time information about the availability and performance of SP NET services. It includes uptime history, incident reports, and maintenance schedules. As products launch, this page will become the central hub for monitoring service health. Currently, it reflects the status of the website and infrastructure components.",
    category: "trust",
    links: [
      { label: "System Status", href: "/trust/status" },
    ],
    related: ["How does SP NET handle privacy?", "How can I report a security vulnerability?"],
  },

  // ─── Communication ───────────────────────────────────────
  {
    question: "What is the Personal Communication Assistant?",
    answer:
      "The Personal Communication Assistant (PCA) is an AI-powered assistant available now via Telegram at https://t.me/SAVANPATELSP_BOT. It can answer questions about Savan Patel, SP NET INC, products, research, career opportunities, and more. The PCA is the recommended first point of contact for any inquiry — it provides instant, accurate responses 24/7 and is trained on comprehensive knowledge about the entire SP NET ecosystem.",
    category: "communication",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
      { label: "Contact", href: "/contact" },
    ],
    related: ["How do I use the PCA?", "Why should I use the PCA instead of email?"],
  },
  {
    question: "How do I use the PCA?",
    answer:
      "Open https://t.me/SAVANPATELSP_BOT in your browser or Telegram app and start a conversation. You can ask about anything — products, research, career opportunities, collaborations, technical questions, or general inquiries. The PCA is trained on comprehensive knowledge about SP NET INC and provides instant responses. If the PCA cannot answer your question, it will guide you to the right channel. No account or setup is required — just open the link and start chatting.",
    category: "communication",
    links: [
      { label: "Open PCA on Telegram", href: "https://t.me/SAVANPATELSP_BOT" },
    ],
    related: ["What is the Personal Communication Assistant?", "What can I ask the PCA about?"],
  },
  {
    question: "Why should I use the PCA instead of email?",
    answer:
      "The PCA provides instant responses 24/7, while email responses typically take up to 48 hours. The PCA is trained on comprehensive knowledge about SP NET INC and can handle most inquiries immediately — from product details to career questions to technical discussions. For complex business proposals, formal requests, or sensitive matters, email remains available. But the PCA is the fastest way to get accurate answers to any question.",
    category: "communication",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How do I use the PCA?", "How can I contact Savan Patel directly?"],
  },
  {
    question: "What can I ask the PCA about?",
    answer:
      "The PCA can discuss: Savan Patel's background and work, SP NET INC's mission and products, SP NET GRAM, ADMIN OS, AI, and the Ecosystem, research areas and technologies, career opportunities and collaborations, privacy and security practices, website and technical details, and general questions about the company. For specific departmental inquiries, the PCA will direct you to the appropriate email address. It is designed to be your first stop for any question.",
    category: "communication",
    links: [
      { label: "Open PCA on Telegram", href: "https://t.me/SAVANPATELSP_BOT" },
    ],
    related: ["How do I use the PCA?", "How can I contact Savan Patel directly?"],
  },
  {
    question: "How can I contact Savan Patel directly?",
    answer:
      "The recommended way is through the PCA at https://t.me/SAVANPATELSP_BOT for instant responses. For direct email, use savan@sp-net.in. For specific inquiries: business@ for partnerships, media@ for press, security@ for vulnerabilities, careers@ for job inquiries, contact@ for general questions. All emails are personally reviewed and responded to within 48 hours. Calendar availability can be checked at cal.com/savanpatel.",
    category: "communication",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
      { label: "Contact", href: "/contact" },
    ],
    related: ["Which email should I use?", "How can I request a meeting?"],
  },
  {
    question: "Which email should I use?",
    answer:
      "Use the PCA at https://t.me/SAVANPATELSP_BOT first — it provides instant answers. For email: hello@sp-net.in or savan@sp-net.in for general inquiries, business@sp-net.in for partnerships and collaborations, media@sp-net.in for press and media, security@sp-net.in for security reports, careers@sp-net.in for career-related questions. Every email is personally reviewed and responded to within 48 hours. The Contact page provides all departmental addresses.",
    category: "communication",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Company Contact", href: "/company/contact" },
    ],
    related: ["How can I contact Savan Patel directly?", "Can media contact SP NET?"],
  },
  {
    question: "Can media contact SP NET?",
    answer:
      "Yes. For all press and media inquiries, email media@sp-net.in. Include the publication name, the nature of the story, and the deadline. Interviews, quotes, and media assets are available for journalists covering SP NET INC, its products, or the founder. The Media Kit page provides brand assets, boilerplate text, and usage guidelines. The PCA can also help with quick media inquiries.",
    category: "communication",
    links: [
      { label: "Media Kit", href: "/resources/media-kit" },
      { label: "Press Contact", href: "/resources/press-contact" },
    ],
    related: ["How can I contact Savan Patel directly?", "How can I request a meeting?"],
  },
  {
    question: "How can I request a meeting?",
    answer:
      "For meeting requests, email business@sp-net.in with the purpose of the meeting, preferred format (video call, in-person), and proposed time slots. Calendar availability can also be checked at cal.com/savanpatel. Meetings are typically scheduled for 30 minutes and require a clear agenda to ensure productive use of time. The PCA can also help schedule meetings and check availability.",
    category: "communication",
    links: [
      { label: "Calendar", href: "https://cal.com/savanpatel" },
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How can I contact Savan Patel directly?", "Which email should I use?"],
  },
  {
    question: "Where can I follow Savan's work?",
    answer:
      "Follow Savan on GitHub (github.com/savanpatelssp) for code and projects, Telegram (t.me/ABOUTME_SP) for direct communication, and Instagram (savanpatelssp) for visual updates. X and LinkedIn profiles are coming soon. The best way to stay updated on SP NET INC is through the social links in the footer or the PCA. The Blog and Newsroom sections will also provide regular updates as they launch.",
    category: "communication",
    links: [
      { label: "Socials", href: "/company/socials" },
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How can I contact Savan Patel directly?", "When will the X profile launch?"],
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
      "Savan is primarily focused on building SP NET INC and its products. He is not available for freelance work at this time. For collaboration opportunities or consulting inquiries, use the PCA or email business@sp-net.in with the details of the project and how it aligns with the work being done at SP NET INC. The best collaborations happen when there is genuine alignment between both parties.",
    category: "career",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["Can I collaborate with SP NET?", "How can companies contact SP NET for partnerships?"],
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
    related: ["How can companies contact SP NET for partnerships?", "How do I apply to work at SP NET INC?"],
  },
  {
    question: "How can companies contact SP NET for partnerships?",
    answer:
      "For business inquiries, partnerships, or enterprise discussions, use the PCA for instant guidance or email business@sp-net.in with the details. Include the nature of the partnership, the value proposition, and how it aligns with SP NET's mission. Meetings can be scheduled at cal.com/savanpatel. The Partners page provides details on the types of partnerships SP NET is exploring.",
    category: "career",
    links: [
      { label: "Partners", href: "/company/partners" },
      { label: "Calendar", href: "https://cal.com/savanpatel" },
    ],
    related: ["Can I collaborate with SP NET?", "How can I request a meeting?"],
  },
  {
    question: "How do I apply to work at SP NET INC?",
    answer:
      "When roles open, they will be posted on the Careers page and shared across SP NET INC channels. In the meantime, the best way to get on the radar is to build things, share your work, and engage with the SP NET community. SP NET INC values craft over credentials — show what you can build. The Careers page lists the types of roles that will open as the company scales, along with the culture and benefits.",
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
      "SP NET INC offers six core benefits: autonomy and ownership over your work, remote-first flexibility, annual learning budgets, competitive compensation, flexible scheduling, and comprehensive health and wellness support. As the company scales, the benefits package will continue to grow. The focus is on creating an environment where exceptional people can do their best work without unnecessary constraints.",
    category: "career",
    links: [
      { label: "Careers", href: "/company/careers" },
    ],
    related: ["Does SP NET INC offer remote work?", "How do I apply to work at SP NET INC?"],
  },

  // ─── Founder ─────────────────────────────────────────────
  {
    question: "What is Savan Patel's background?",
    answer:
      "Savan Patel is a self-taught software engineer who began coding in 2018. Rather than following a traditional academic path, he focused on building real products and solving real problems. He founded SP NET INC in 2022 and serves as Founder & Product Engineer, leading all product strategy, engineering, design, and operations. His expertise spans full-stack development, AI, cloud infrastructure, and cybersecurity — all learned through hands-on building.",
    category: "founder",
    links: [
      { label: "About Savan", href: "/founder/about" },
      { label: "Journey", href: "/founder/journey" },
    ],
    related: ["What is Savan Patel's engineering philosophy?", "What is Savan Patel's journey?"],
  },
  {
    question: "What is Savan Patel's engineering philosophy?",
    answer:
      "Savan believes in building technology that is invisible when it works and transformative when it matters. The philosophy centers on: privacy as a foundation, not a feature; performance as a priority; user experience as the measure of success; and continuous learning through hands-on experimentation. Every product is built with these principles at its core — technology should serve people, not the other way around.",
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
      "Savan started coding in 2018, driven by curiosity that became a passion. He founded SP NET INC in 2022, transforming an idea into a vision. Since then, he has been building SP NET GRAM, expanding with SP NET ADMIN OS, and innovating with SP NET AI. The journey is documented across the Founder section of this website, including the About, Journey, Philosophy, and Roadmap pages. Every milestone represents a step toward the larger vision.",
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
      "The roadmap includes completing SP NET GRAM's core features, launching SP NET ADMIN OS, advancing SP NET AI research, and scaling the SP NET Ecosystem. Specific milestones and timelines are shared on the Founder > Roadmap page. The roadmap is dynamic and evolves as products mature and new opportunities emerge. It represents the current plan — not a fixed schedule — and adapts as the company learns from building.",
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
      "Savan founded SP NET INC because he believed technology could be built differently — with privacy at its core, with obsessive attention to detail, and with a focus on creating genuine value rather than extracting attention. The company exists to build products that serve people, not the other way around. Every product, every research area, and every decision is guided by this founding principle.",
    category: "founder",
    links: [
      { label: "About Savan", href: "/founder/about" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["What is Savan Patel's engineering philosophy?", "What is SP NET INC's mission?"],
  },

  // ─── Website ─────────────────────────────────────────────
  {
    question: "Which technologies power this website?",
    answer:
      "This website is built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Framer Motion. It uses a dark theme with carefully tuned color tokens, smooth page transitions, and responsive design across all breakpoints. The architecture follows the same patterns used in SP NET products — server-rendered pages with client-side interactivity, semantic HTML, and comprehensive SEO metadata.",
    category: "website",
    links: [
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["How often is the website updated?", "Is this website open source?"],
  },
  {
    question: "How often is the website updated?",
    answer:
      "The website is updated regularly as new content, products, and research areas are added. Major updates coincide with product milestones and research breakthroughs. The site is built with Next.js and deployed on Vercel, enabling fast iteration and near-instant updates. The sitemap and page structure reflect the current state of the project — when new features launch, the site updates to match.",
    category: "website",
    links: [
      { label: "System Status", href: "/trust/status" },
    ],
    related: ["Which technologies power this website?", "Can I report website issues?"],
  },
  {
    question: "Can I report website issues?",
    answer:
      "Yes. If you find a broken link, a typo, a rendering issue, or anything else that seems wrong, use the PCA for quick reporting or email hello@sp-net.in with a description of the issue and the page where you found it. Website quality is taken seriously — every report is reviewed and fixed promptly. The PCA provides the fastest way to report issues and get confirmation that they have been received.",
    category: "website",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How often is the website updated?", "Which technologies power this website?"],
  },
  {
    question: "Why are some pages marked Coming Soon?",
    answer:
      "Some sections — like the Blog, Newsroom, Press Releases, X profile, LinkedIn profile, and SP NET Ecosystem — are planned but not yet launched. Rather than leaving dead links or 404 pages, the Coming Soon pages indicate what is being built and signal that the section is intentional, not abandoned. Every Coming Soon page represents a real initiative that is actively being developed and will launch when the content is ready.",
    category: "website",
    links: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Newsroom", href: "/company/newsroom" },
    ],
    related: ["When will the Blog launch?", "When will the X profile launch?"],
  },
  {
    question: "Why are there two contact pages?",
    answer:
      "The /get-in-touch page is the primary contact hub, featuring the Personal Communication Assistant (PCA) for instant AI-powered responses, along with social profiles and a contact form. The /contact page provides direct email access with departmental addresses. The /company/contact page handles company-specific departmental inquiries. Each serves a different purpose: PCA for instant answers, personal email for direct access, and company contact for organizational matters.",
    category: "website",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
      { label: "Contact", href: "/contact" },
      { label: "Company Contact", href: "/company/contact" },
    ],
    related: ["How can I contact Savan Patel directly?", "Which email should I use?"],
  },
  {
    question: "Is this website open source?",
    answer:
      "No. The source code for this portfolio website is private. The website itself is not open source. SP NET INC plans to release select tools and projects publicly in the future as the ecosystem matures. The Open Source page provides details on the current status and future plans for open source releases.",
    category: "website",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
    ],
    related: ["Are SP NET projects open source?", "Which technologies power this website?"],
  },
  {
    question: "Does this website have an API?",
    answer:
      "The website does not currently expose a public API. It is built with Next.js App Router, which uses server components and API routes internally. If a public API becomes relevant as products launch, it will be documented and announced through the appropriate channels. The PCA can provide the latest status on API plans.",
    category: "website",
    links: [
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["Which technologies power this website?", "Are SP NET products available to use now?"],
  },

  // ─── Learning & Technologies ─────────────────────────────
  {
    question: "Which programming languages does Savan use?",
    answer:
      "TypeScript is the primary language across the entire SP NET stack — frontend, backend, and tooling. Python is used for AI research and data processing. Rust is being explored for performance-critical systems. The choice is driven by practical needs: TypeScript for its type safety and ecosystem, Python for its AI/ML libraries, and Rust for its performance guarantees and memory safety.",
    category: "learning",
    links: [
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["Which frameworks does SP NET prefer?", "What technologies is Savan currently learning?"],
  },
  {
    question: "Which frameworks does SP NET prefer?",
    answer:
      "Next.js is the framework of choice for web applications, providing server-side rendering, API routes, and excellent developer experience. React is the UI library, chosen for its component model and ecosystem. For styling, Tailwind CSS provides utility-first design with full customization. Framer Motion handles animations. On the backend, Node.js with Express or Hono for API services. The choice is always driven by practical needs, not trends.",
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
      "PostgreSQL is the primary relational database, chosen for its reliability, extensibility, and performance. Redis is used for caching and real-time features. For AI workloads, vector databases like Pinecone or pgvector are used for embeddings and similarity search. The database choice depends on the use case — relational for structured data, key-value for caching, vector for AI. Prisma is used as the ORM for type-safe database access.",
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
      "Currently exploring Rust for performance-critical systems, WebAssembly for near-native browser performance, and local-first architecture patterns using CRDTs for offline-capable applications. The learning approach is hands-on — each technology is explored through real experiments and prototype projects documented in the Innovation Lab. The goal is always practical application, not theoretical knowledge.",
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
      "AI is used as a development assistant — for code completion, documentation generation, research assistance, and exploring new approaches. However, every line of code is reviewed, understood, and intentionally written. AI accelerates the process but does not replace engineering judgment. The Trust > Responsible AI page details the principles that guide AI usage — transparency, human oversight, and ethical application.",
    category: "learning",
    links: [
      { label: "Responsible AI", href: "/trust/responsible-ai" },
      { label: "AI Research", href: "/research/ai" },
    ],
    related: ["Why is SP NET interested in AI?", "How does SP NET approach responsible AI?"],
  },
  {
    question: "How does SP NET approach software architecture?",
    answer:
      "SP NET follows a modular, component-driven architecture. Every product is built with separation of concerns, clear boundaries between layers, and consistency across the stack. The architecture is designed to scale — from a single-developer project to a multi-team operation. Key principles include: server-first rendering with client-side interactivity, type safety across the entire stack, and infrastructure as code for reproducible deployments.",
    category: "learning",
    links: [
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["Does SP NET build full-stack applications?", "Which frameworks does SP NET prefer?"],
  },

  // ─── Coming Soon ─────────────────────────────────────────
  {
    question: "When will the Blog launch?",
    answer:
      "The Blog is actively being developed and will launch when there is enough quality content to justify the section. The focus is on publishing meaningful technical articles, product updates, and insights rather than maintaining a high-volume content calendar. Every article will be written with the same attention to detail that defines SP NET products. Follow the journey through the PCA or social channels for updates on the launch timeline.",
    category: "coming_soon",
    links: [
      { label: "Blog", href: "/resources/blog" },
    ],
    related: ["When will the Newsroom launch?", "Why launch pages as Coming Soon instead of waiting?"],
  },
  {
    question: "When will the Newsroom launch?",
    answer:
      "The Newsroom will launch when SP NET INC has official announcements, milestones, and news to share. It is designed as a centralized hub for press coverage, company updates, and official statements. The Newsroom page provides a preview of what will be covered. Follow the PCA or social channels for updates on the launch timeline.",
    category: "coming_soon",
    links: [
      { label: "Newsroom", href: "/company/newsroom" },
      { label: "Press Contact", href: "/resources/press-contact" },
    ],
    related: ["When will Press Releases be available?", "When will the Blog launch?"],
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
      "The SP NET Ecosystem page is coming soon as the unified platform connecting GRAM, ADMIN OS, and AI is being finalized. The Ecosystem represents the vision of interconnected products that share context, data, and intelligence. The Products > Ecosystem page provides a preview of what is being built. The PCA can provide the latest status on the Ecosystem development.",
    category: "coming_soon",
    links: [
      { label: "SP NET Ecosystem", href: "/products/sp-net-ecosystem" },
      { label: "Future Vision", href: "/explore/vision" },
    ],
    related: ["What is the SP NET Ecosystem?", "When will the Blog launch?"],
  },
  {
    question: "When will Press Releases be available?",
    answer:
      "Press Releases will be published when SP NET INC has official announcements to make — product launches, partnerships, milestones, and significant updates. The Press Releases page provides a preview of the format and topics that will be covered. Media inquiries can be directed to media@sp-net.in or through the PCA for immediate assistance.",
    category: "coming_soon",
    links: [
      { label: "Press Releases", href: "/resources/press-releases" },
      { label: "Press Contact", href: "/resources/press-contact" },
    ],
    related: ["When will the Newsroom launch?", "Can media contact SP NET?"],
  },
  {
    question: "Why launch pages as Coming Soon instead of waiting?",
    answer:
      "Coming Soon pages serve multiple purposes: they indicate that a section is intentional and planned, not abandoned; they provide a preview of what is being built; they maintain a complete site structure; and they signal transparency about the current state of the project. Rather than hiding incomplete sections, SP NET INC chooses to be upfront about what is in progress. This builds trust and gives visitors a clear picture of what is coming.",
    category: "coming_soon",
    links: [
      { label: "Transparency", href: "/trust/transparency" },
    ],
    related: ["When will the Blog launch?", "When will the X profile launch?"],
  },

  // ─── Additional Questions ──────────────────────────────────
  {
    question: "What makes SP NET INC different from other tech companies?",
    answer:
      "SP NET INC is different in three fundamental ways: first, privacy is a foundation, not a feature — every product is designed with privacy at its core from day one. Second, the company is lean and founder-led, with a senior-first hiring philosophy that prioritizes quality over quantity. Third, the products are designed to work together as a unified ecosystem, not as isolated tools. This creates a cohesive experience where context, data, and intelligence flow between products.",
    category: "general",
    links: [
      { label: "Mission", href: "/company/mission" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["What is SP INC's long-term vision?", "What is the SP NET Ecosystem?"],
  },
  {
    question: "How do SP NET products work together?",
    answer:
      "SP NET products are designed to work independently but together form a comprehensive platform. GRAM handles communication, ADMIN OS manages organizations, and AI provides intelligence across both. Context flows between them — a message in GRAM can trigger an automated workflow in ADMIN OS, and AI can suggest actions based on data from both. The Ecosystem page (coming soon) will detail the specific integrations and data flows.",
    category: "products",
    links: [
      { label: "SP NET Ecosystem", href: "/products/sp-net-ecosystem" },
      { label: "Future Vision", href: "/explore/vision" },
    ],
    related: ["What is the SP NET Ecosystem?", "What is SP NET AI?"],
  },
  {
    question: "How can I support SP NET's open source efforts?",
    answer:
      "The best way to support SP NET's open source efforts right now is to follow the journey, provide feedback, and engage with the community. As projects are released publicly, contributions to code, documentation, and issue reports will be invaluable. For now, following on GitHub and Telegram helps build the community that will make open source releases successful.",
    category: "open_source",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
      { label: "GitHub", href: "https://github.com/savanpatelssp" },
    ],
    related: ["Will SP NET release open source tools in the future?", "Can I contribute to SP NET projects?"],
  },
  {
    question: "How does SP NET approach data breaches?",
    answer:
      "SP NET has a comprehensive incident response plan. In the event of a data breach, the company follows responsible disclosure practices: the issue is contained, assessed, and fixed as quickly as possible. Affected parties are notified promptly, and a post-incident review is conducted to prevent recurrence. The Security page details the specific procedures and commitments. All security reports to security@sp-net.in are reviewed within 24 hours.",
    category: "trust",
    links: [
      { label: "Security", href: "/trust/security" },
      { label: "Responsible Disclosure", href: "/trust/security" },
    ],
    related: ["How can I report a security vulnerability?", "How does SP NET handle privacy?"],
  },
  {
    question: "What are the PCA's limitations?",
    answer:
      "The PCA is designed to handle most inquiries about Savan Patel, SP NET INC, and the products. However, it cannot: make decisions on behalf of Savan, provide legal or financial advice, access internal systems or data, or override security policies. For complex business proposals, formal requests, or sensitive matters, direct email or a meeting is recommended. The PCA will always guide you to the right channel when it cannot help directly.",
    category: "communication",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["What can I ask the PCA about?", "Why should I use the PCA instead of email?"],
  },
  {
    question: "What roles will SP NET INC hire for?",
    answer:
      "As SP NET INC scales, the company will hire for: Senior Full-Stack Engineers, AI/ML Engineers, DevOps/Infrastructure Engineers, Product Designers, and Engineering Managers. The approach is senior-first — hiring exceptional people who set the standard. Every role requires a strong foundation in engineering fundamentals, a passion for building products, and alignment with SP NET's mission and values.",
    category: "career",
    links: [
      { label: "Careers", href: "/company/careers" },
    ],
    related: ["How do I apply to work at SP NET INC?", "What is the culture like at SP NET INC?"],
  },
  {
    question: "What does Savan do outside of work?",
    answer:
      "Savan is constantly learning and exploring new technologies. Outside of building SP NET products, he experiments with emerging technologies in the Innovation Lab, contributes to technical discussions on Telegram, and shares insights through visual content on Instagram. He is also interested in the intersection of technology and human potential — how software can amplify human capability rather than replace it.",
    category: "founder",
    links: [
      { label: "Innovation Lab", href: "/research/innovation-lab" },
      { label: "Instagram", href: "https://instagram.com/savanpatelssp" },
    ],
    related: ["What is Savan Patel's engineering philosophy?", "What technologies is Savan currently learning?"],
  },
  {
    question: "How is this website designed?",
    answer:
      "The website follows a dark theme with carefully tuned color tokens, smooth page transitions, and responsive design across all breakpoints. The design system is built with Tailwind CSS v4, using a consistent set of spacing, typography, and color scales. Every component is designed to be accessible, performant, and visually cohesive. The same design principles are applied across all SP NET products.",
    category: "website",
    links: [
      { label: "Technology", href: "/explore/technology" },
      { label: "Brand", href: "/company/brand" },
    ],
    related: ["Which technologies power this website?", "How often is the website updated?"],
  },
  {
    question: "How does SP NET approach software testing?",
    answer:
      "SP NET follows a pragmatic testing approach: unit tests for critical business logic, integration tests for API endpoints, and end-to-end tests for user flows. The focus is on testing behavior, not implementation details. Every product is tested manually before launch, and automated tests run on every commit. The goal is confidence in deployments, not 100% code coverage for its own sake.",
    category: "learning",
    links: [
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["How does SP NET approach software architecture?", "Does SP NET build full-stack applications?"],
  },
  {
    question: "How does SP NET approach accessibility?",
    answer:
      "Accessibility is a core consideration, not an afterthought. Every component is built with semantic HTML, proper ARIA attributes, keyboard navigation support, and sufficient color contrast. The website is designed to be usable by everyone, regardless of ability. Testing includes both automated accessibility checks and manual testing with screen readers and keyboard-only navigation.",
    category: "website",
    links: [
      { label: "Technology", href: "/explore/technology" },
    ],
    related: ["How is this website designed?", "Which technologies power this website?"],
  },
];
