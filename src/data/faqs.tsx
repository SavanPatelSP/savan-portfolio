import type { ReactNode } from "react";
import {
  User,
  Layers,
  Wrench,
  Briefcase,
  Lightbulb,
  Shield,
  Globe,
  Mail,
} from "lucide-react";

export interface FAQCategory {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqCategories: FAQCategory[] = [
  { id: "general", label: "General", icon: <User className="h-3.5 w-3.5" /> },
  { id: "projects", label: "Projects", icon: <Layers className="h-3.5 w-3.5" /> },
  { id: "development", label: "Development", icon: <Wrench className="h-3.5 w-3.5" /> },
  { id: "career", label: "Career", icon: <Briefcase className="h-3.5 w-3.5" /> },
  { id: "research", label: "Research", icon: <Lightbulb className="h-3.5 w-3.5" /> },
  { id: "security", label: "Security & Privacy", icon: <Shield className="h-3.5 w-3.5" /> },
  { id: "website", label: "Website", icon: <Globe className="h-3.5 w-3.5" /> },
  { id: "contact", label: "Contact", icon: <Mail className="h-3.5 w-3.5" /> },
];

export const faqItems: FAQItem[] = [
  // ─── General ─────────────────────────────────────────────
  {
    question: "Who is Savan Patel?",
    answer:
      "Savan Patel is a self-taught software engineer and the founder of SP NET INC. He began coding in 2018 and has since built deep expertise across full-stack development, artificial intelligence, cloud infrastructure, and cybersecurity. He serves as Founder & Product Engineer, leading all product strategy, engineering, design, and operations at SP NET INC.",
    category: "general",
  },
  {
    question: "What is this website?",
    answer:
      "This is the official portfolio and company website of Savan Patel and SP NET INC. It showcases the products being built, the technologies being explored, the philosophy behind the work, and provides ways to get in touch. It is built with Next.js, TypeScript, Tailwind CSS, and Framer Motion — the same stack used across SP NET products.",
    category: "general",
  },
  {
    question: "Why did you create this portfolio?",
    answer:
      "This portfolio serves multiple purposes: it is a public showcase of the products and vision behind SP NET INC, a resource for developers and collaborators who want to learn about the work being done, and a central hub for anyone who wants to get in touch. It also demonstrates the engineering and design standards that define every SP NET product.",
    category: "general",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "Savan specializes in TypeScript, React, Next.js, Node.js, PostgreSQL, and modern cloud infrastructure. The expertise extends to artificial intelligence (LLMs, RAG pipelines, vector databases), cybersecurity (end-to-end encryption, zero-trust architecture), and cloud-native development (Docker, K3s, serverless edge computing). The stack is chosen for performance, reliability, and developer experience.",
    category: "general",
  },
  {
    question: "Are you currently a student?",
    answer:
      "Savan is a self-taught software engineer who began coding in 2018. Rather than following a traditional academic path, he has focused on building real products and solving real problems. The learning is continuous and hands-on — every project, every research area, and every product is an opportunity to go deeper.",
    category: "general",
  },
  {
    question: "What are you currently working on?",
    answer:
      "Currently, the focus is on three core products: SP NET GRAM (a next-generation messaging platform), SP NET ADMIN OS (an enterprise administration platform), and SP NET AI (an AI research initiative). Additionally, there is ongoing research in artificial intelligence, cloud computing, cybersecurity, and emerging technologies. The roadmap and current focus areas are detailed on the System Status and Roadmap pages.",
    category: "general",
  },

  // ─── Projects ────────────────────────────────────────────
  {
    question: "What is SP NET INC?",
    answer:
      "SP NET INC is a technology company founded in 2022 by Savan Patel. It builds infrastructure for modern communication, enterprise administration, and intelligent automation. The company operates as a lean, founder-led organization based in India, with a focus on crafting exceptional products that work together as a unified ecosystem.",
    category: "projects",
  },
  {
    question: "What is SP NET GRAM?",
    answer:
      "SP NET GRAM is a next-generation messaging platform focused on privacy, productivity, and premium experiences. It features end-to-end encryption, real-time communication, media sharing, team collaboration, and a privacy-first architecture. It is designed to be both powerful and thoughtfully designed — a messaging platform that respects your data while delivering a premium experience.",
    category: "projects",
  },
  {
    question: "What is SP NET ADMIN OS?",
    answer:
      "SP NET ADMIN OS is a comprehensive enterprise administration platform with full organizational tooling. It includes role-based access control, audit logging, analytics, workflow automation, and team management features. It is designed to give organizations complete visibility and control over their operations through a clean, intuitive interface.",
    category: "projects",
  },
  {
    question: "What is SP NET AI?",
    answer:
      "SP NET AI is an AI research initiative powering intelligent experiences across the entire SP NET ecosystem. It focuses on building AI capabilities that are privacy-first, context-aware, and genuinely useful — from smart message composition in GRAM to automated workflows in ADMIN OS. The goal is to create a unified intelligence layer that enhances every product without compromising user privacy.",
    category: "projects",
  },
  {
    question: "What is the SP NET Ecosystem?",
    answer:
      "The SP NET Ecosystem is the unified platform connecting all SP NET products — GRAM, ADMIN OS, and AI — into a seamless experience. Rather than isolated tools, the ecosystem is designed so that context, data, and intelligence flow between products, creating a whole that is greater than the sum of its parts. Every product is built to work independently, but together they form a comprehensive platform.",
    category: "projects",
  },
  {
    question: "Are your projects open source?",
    answer:
      "Some SP NET projects are open source, while others are proprietary. The portfolio website, developer toolkits, and select experiments are available on GitHub under permissive licenses. Core products like SP NET GRAM and ADMIN OS are proprietary. The commitment to open source is growing — more projects will be released publicly as the ecosystem matures. Visit the Open Source page for details.",
    category: "projects",
  },
  {
    question: "Can I contribute to your projects?",
    answer:
      "Yes. Open source contributions are welcome and encouraged. Visit the GitHub repositories at github.com/savanpatelssp to find projects, look for issues labeled \"good first issue,\" and submit pull requests. Every contribution — from bug fixes to documentation improvements — makes the ecosystem stronger. The Contributing guide in each repository explains the process.",
    category: "projects",
  },

  // ─── Development ─────────────────────────────────────────
  {
    question: "Which programming languages do you use?",
    answer:
      "TypeScript is the primary language across the entire SP NET stack — frontend, backend, and tooling. Python is used for AI research and data processing. Rust is being explored for performance-critical systems. The choice is driven by practical needs: TypeScript for its type safety and ecosystem, Python for its AI/ML libraries, and Rust for its performance guarantees.",
    category: "development",
  },
  {
    question: "Which frameworks do you prefer?",
    answer:
      "Next.js is the framework of choice for web applications, providing server-side rendering, API routes, and excellent developer experience. React is the UI library, chosen for its component model and ecosystem. For styling, Tailwind CSS provides utility-first design with full customization. Framer Motion handles animations. On the backend, Node.js with Express or Hono for API services.",
    category: "development",
  },
  {
    question: "Do you build full-stack applications?",
    answer:
      "Yes. Every SP NET product is built full-stack — from the database layer to the UI. This includes designing schemas, building APIs, implementing authentication, crafting responsive interfaces, and deploying to production. Being full-stack means every product has consistent quality, coherent architecture, and seamless integration between layers.",
    category: "development",
  },
  {
    question: "Which databases do you use?",
    answer:
      "PostgreSQL is the primary relational database, chosen for its reliability, extensibility, and performance. Redis is used for caching and real-time features. For AI workloads, vector databases like Pinecone or pgvector are used for embeddings and similarity search. The database choice depends on the use case — relational for structured data, key-value for caching, vector for AI.",
    category: "development",
  },
  {
    question: "Do you use cloud services?",
    answer:
      "Yes. Cloud infrastructure is a core part of the SP NET stack. Cloudflare is used for edge computing and CDN, Vercel for deployment and serverless functions, and Docker with K3s for containerized services. The approach is cloud-agnostic where possible, preferring services that offer flexibility and avoid vendor lock-in.",
    category: "development",
  },
  {
    question: "Do you use AI while developing?",
    answer:
      "AI is used as a development assistant — for code completion, documentation generation, research assistance, and exploring new approaches. However, every line of code is reviewed, understood, and intentionally written. AI accelerates the process but does not replace engineering judgment. The Responsible AI page details the principles that guide AI usage.",
    category: "development",
  },

  // ─── Career ──────────────────────────────────────────────
  {
    question: "Are you available for internships?",
    answer:
      "SP NET INC does not currently offer formal internship programs. The company is a lean, founder-led operation focused on shipping products. However, if you are a talented individual passionate about the problems being solved, reach out to careers@sp-net.in with your background. Exceptional candidates may be considered for future opportunities.",
    category: "career",
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "Savan is primarily focused on building SP NET INC and its products. He is not available for freelance work at this time. For collaboration opportunities or consulting inquiries, email business@sp-net.in with the details of the project and how it aligns with the work being done at SP NET INC.",
    category: "career",
  },
  {
    question: "Can I collaborate with you?",
    answer:
      "Collaboration is welcome when there is genuine alignment. Whether it is an open source project, a research initiative, or a product integration, reach out with a clear proposal. Email hello@sp-net.in with what you are building, why you want to collaborate, and what you bring to the table. The best collaborations happen when both sides bring something unique.",
    category: "career",
  },
  {
    question: "How can companies contact you?",
    answer:
      "For business inquiries, partnerships, or enterprise discussions, email business@sp-net.in. For general inquiries, use contact@sp-net.in. For media and press, use media@sp-net.in. All emails are personally reviewed and responded to within 48 hours. The Contact page provides all departmental addresses and response time expectations.",
    category: "career",
  },
  {
    question: "How can I join SP NET INC in the future?",
    answer:
      "SP NET INC is currently a founder-led operation with no active hiring. As the company scales, leadership and engineering roles will open. The approach is senior-first — hiring exceptional people who set the standard. If you want to be considered for future roles, send an email to careers@sp-net.in with your background and the type of role you are interested in. Building in public and contributing to open source projects are also great ways to demonstrate alignment.",
    category: "career",
  },

  // ─── Research ────────────────────────────────────────────
  {
    question: "What research areas interest you?",
    answer:
      "The primary research areas are artificial intelligence (LLMs, RAG pipelines, multi-agent systems, federated learning), cloud computing (edge computing, serverless architecture, self-healing systems), cybersecurity (zero-trust architecture, post-quantum cryptography), and emerging technologies (AR/VR, IoT, neuromorphic computing, blockchain). Each area is explored through the lens of practical application to SP NET products.",
    category: "research",
  },
  {
    question: "Why are you interested in AI?",
    answer:
      "AI represents the most significant shift in how software serves people. The interest is not in AI as a buzzword, but in AI as a practical tool — systems that understand context, anticipate needs, and automate the routine so humans can focus on the creative. SP NET AI is built on the belief that AI should amplify human capability, not replace human judgment.",
    category: "research",
  },
  {
    question: "Why cybersecurity?",
    answer:
      "Security is not a feature — it is a foundation. Every SP NET product handles sensitive data: messages, organizational information, user identities. Without strong security, none of the other work matters. The interest in cybersecurity comes from building products that people trust with their most important communications and data. This includes end-to-end encryption, zero-trust architecture, and responsible disclosure practices.",
    category: "research",
  },
  {
    question: "Why cloud computing?",
    answer:
      "Cloud computing is the infrastructure that makes modern software possible. The interest is in building systems that are resilient, scalable, and cost-efficient — from containerized microservices to edge-deployed functions. Cloud-native architecture enables SP NET products to serve users globally while maintaining performance and reliability.",
    category: "research",
  },
  {
    question: "What technologies are you currently learning?",
    answer:
      "Currently exploring Rust for performance-critical systems, WebAssembly for near-native browser performance, and local-first architecture patterns using CRDTs for offline-capable applications. The learning approach is hands-on — each technology is explored through real experiments and prototype projects documented in the Innovation Lab.",
    category: "research",
  },

  // ─── Security & Privacy ──────────────────────────────────
  {
    question: "How can I report a security issue?",
    answer:
      "If you discover a security vulnerability in any SP NET product or website, please report it responsibly by emailing security@sp-net.in. Include a description of the issue, steps to reproduce, and the potential impact. All reports are reviewed within 24 hours. Responsible disclosure ensures that vulnerabilities are fixed before they can be exploited, protecting all users.",
    category: "security",
  },
  {
    question: "How do you handle personal information?",
    answer:
      "Personal information is handled with the utmost care. This website uses no tracking cookies, no analytics scripts, and no advertising. Contact form submissions are stored securely and used only to respond to inquiries. Third-party services (hosting, email) are selected for their privacy practices. The Privacy page provides full details on the approach to data handling.",
    category: "security",
  },
  {
    question: "Do you sell user data?",
    answer:
      "No. User data is never sold, shared with third parties for marketing purposes, or used for advertising. SP NET INC is funded through product development, not data harvesting. The business model is built on creating exceptional products that people want to use — not on monetizing user attention or personal information.",
    category: "security",
  },
  {
    question: "Do you respect privacy?",
    answer:
      "Privacy is a foundational principle, not an afterthought. Every SP NET product is designed with privacy at its core: end-to-end encryption, zero data retention by default, user-controlled permissions, and transparent data practices. The Trust section of this website details the specific principles and practices for privacy, security, and transparency.",
    category: "security",
  },

  // ─── Website ─────────────────────────────────────────────
  {
    question: "Why are some pages marked Coming Soon?",
    answer:
      "Some sections — like the Blog, Newsroom, and Press Releases — are planned but not yet launched. Rather than leaving dead links or 404 pages, the Coming Soon pages indicate what is being built and signal that the section is intentional, not abandoned. Every Coming Soon page represents a real initiative that is actively being developed.",
    category: "website",
  },
  {
    question: "How often is the website updated?",
    answer:
      "The website is updated regularly as new content, products, and research areas are added. Major updates coincide with product milestones and research breakthroughs. The site is built with Next.js and deployed on Vercel, enabling fast iteration and near-instant updates. The sitemap and page structure reflect the current state of the project.",
    category: "website",
  },
  {
    question: "Can I report website issues?",
    answer:
      "Yes. If you find a broken link, a typo, a rendering issue, or anything else that seems wrong, email hello@sp-net.in with a description of the issue and the page where you found it. Website quality is taken seriously — every report is reviewed and fixed promptly.",
    category: "website",
  },
  {
    question: "Which technologies power this website?",
    answer:
      "This website is built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion. It uses a dark theme with carefully tuned color tokens, smooth page transitions, and responsive design across all breakpoints. The architecture follows the same patterns used in SP NET products — server-rendered pages with client-side interactivity, semantic HTML, and comprehensive SEO metadata.",
    category: "website",
  },
  {
    question: "Is this website open source?",
    answer:
      "Yes. The source code for this portfolio website is available on GitHub at github.com/savanpatelssp. It is released under the MIT license, meaning it can be used, modified, and distributed freely. The project serves as both a portfolio and a reference implementation for modern web development with Next.js and Tailwind CSS.",
    category: "website",
  },

  // ─── Contact ─────────────────────────────────────────────
  {
    question: "How can I contact you?",
    answer:
      "The easiest way is to email savan@sp-net.in directly. For specific inquiries, use the departmental addresses: contact@ for general, business@ for partnerships, media@ for press, security@ for vulnerabilities, and careers@ for job inquiries. You can also reach out via Telegram at t.me/ABOUTME_SP or through the social links in the footer.",
    category: "contact",
  },
  {
    question: "Which email should I use?",
    answer:
      "Use savan@sp-net.in for anything that does not fit neatly into a category. For business partnerships and collaborations, use business@sp-net.in. For press and media inquiries, use media@sp-net.in. For security reports, use security@sp-net.in. For career-related questions, use careers@sp-net.in. Every email is personally reviewed and responded to within 48 hours.",
    category: "contact",
  },
  {
    question: "Where can I follow your work?",
    answer:
      "Follow Savan on GitHub (github.com/savanpatelssp) for code and projects, Telegram (t.me/ABOUTME_SP) for direct communication, and Instagram (savanpatelssp) for visual updates. X and LinkedIn profiles are coming soon. The best way to stay updated on SP NET INC is through the social links in the footer.",
    category: "contact",
  },
  {
    question: "Can media contact you?",
    answer:
      "Yes. For all press and media inquiries, email media@sp-net.in. Include the publication name, the nature of the story, and the deadline. Interviews, quotes, and media assets are available for journalists covering SP NET INC, its products, or the founder. The Media Kit page provides brand assets, boilerplate text, and usage guidelines.",
    category: "contact",
  },
  {
    question: "How can I request a meeting?",
    answer:
      "For meeting requests, email business@sp-net.in with the purpose of the meeting, preferred format (video call, in-person), and proposed time slots. Calendar availability can also be checked at cal.com/savanpatel. Meetings are typically scheduled for 30 minutes and require a clear agenda to ensure productive use of time.",
    category: "contact",
  },
];
