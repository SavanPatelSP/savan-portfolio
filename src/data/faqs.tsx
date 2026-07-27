import type { ReactNode } from "react";
import {
  User,
  Layers,
  Shield,
  Building2,
  Newspaper,
  MessageSquare,
  Bot,
  Rocket,
  Handshake,
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

export const faqCategories: FAQCategory[] = [
  { id: "general", label: "General", icon: <User className="h-3.5 w-3.5" /> },
  { id: "founder", label: "Founder", icon: <User className="h-3.5 w-3.5" /> },
  { id: "company", label: "Company", icon: <Building2 className="h-3.5 w-3.5" /> },
  { id: "products", label: "Products", icon: <Layers className="h-3.5 w-3.5" /> },
  { id: "security_privacy", label: "Security & Privacy", icon: <Shield className="h-3.5 w-3.5" /> },
  { id: "contact", label: "Contact", icon: <MessageSquare className="h-3.5 w-3.5" /> },
  { id: "business", label: "Business", icon: <Handshake className="h-3.5 w-3.5" /> },
  { id: "portfolio", label: "Portfolio", icon: <Newspaper className="h-3.5 w-3.5" /> },
  { id: "future", label: "Future", icon: <Rocket className="h-3.5 w-3.5" /> },
  { id: "pca", label: "Assistant", icon: <Bot className="h-3.5 w-3.5" /> },
];

export const faqItems: FAQItem[] = [
  // ─── General ─────────────────────────────────────────────
  {
    question: "Who is Savan Patel?",
    answer:
      "I am a self-taught software engineer and the founder of SP NET INC. I wrote my first line of code in 2018, driven by curiosity and an internet connection. Without a formal computer science education, I learned by building — and I have not stopped since. I serve as Founder and Product Engineer at SP NET INC, leading all product strategy, engineering, design, and operations.",
    category: "general",
    links: [
      { label: "About Savan", href: "/founder/about" },
      { label: "Journey", href: "/founder/journey" },
    ],
    related: ["What is SP NET INC?", "What is this website?"],
  },
  {
    question: "What is SP NET INC?",
    answer:
      "SP NET INC is a technology company I founded in 2022. It builds products for communication, enterprise administration, and intelligent automation. The company is founder-led, based in India, and focused on crafting exceptional products that work together as a unified ecosystem — with privacy at their core.",
    category: "general",
    links: [
      { label: "About SP NET INC", href: "/company/about" },
      { label: "Mission", href: "/company/mission" },
    ],
    related: ["Who is Savan Patel?", "What is this website?"],
  },
  {
    question: "What is this website?",
    answer:
      "This is the official portfolio and company website of Savan Patel and SP NET INC. It showcases the products being built, the philosophy behind the work, and provides ways to get in touch. Everything here — the design, the code, the content — reflects the same standards that define every SP NET product.",
    category: "general",
    links: [
      { label: "About SP NET INC", href: "/company/about" },
      { label: "Products", href: "/products" },
    ],
    related: ["Who is Savan Patel?", "How often is the website updated?"],
  },
  {
    question: "What are you currently working on?",
    answer:
      "My focus is on three core products: SP NET GRAM (messaging), SP NET ADMIN OS (enterprise administration), and SP NET AI (intelligence layer). I am also building SavaroX (blockchain infrastructure) and this portfolio. All products are in active development and not yet publicly available. Beta access for GRAM and ADMIN OS is planned for 2026.",
    category: "general",
    links: [
      { label: "Products", href: "/products" },
      { label: "Roadmap", href: "/founder/roadmap" },
    ],
    related: ["Are SP NET products available now?", "What is the SP NET Ecosystem?"],
  },
  {
    question: "Why do you build multiple products?",
    answer:
      "The problems I am solving are interconnected. Communication, organization management, and intelligence inform and enhance each other. Building them together creates a unified ecosystem where the whole is greater than the sum of its parts. Each product works independently, but together they form a comprehensive platform.",
    category: "general",
    links: [
      { label: "SP NET Ecosystem", href: "/products/sp-net-ecosystem" },
      { label: "Vision", href: "/explore/vision" },
    ],
    related: ["What is the SP NET Ecosystem?", "What are you currently working on?"],
  },

  // ─── Founder ─────────────────────────────────────────────
  {
    question: "What is Savan Patel's background?",
    answer:
      "I started coding in 2018, self-taught through curiosity and relentless practice. I had no formal education in computer science — just a desire to learn by building. By 2022 I had enough skill and conviction to found SP NET INC. Today I lead all product strategy, engineering, design, and operations personally.",
    category: "founder",
    links: [
      { label: "About Savan", href: "/founder/about" },
      { label: "Journey", href: "/founder/journey" },
    ],
    related: ["What is Savan Patel's engineering philosophy?", "Why did Savan found SP NET INC?"],
  },
  {
    question: "What is Savan Patel's engineering philosophy?",
    answer:
      "Four principles: craft over scale — every detail matters; simplicity as the ultimate sophistication — remove until nothing else can be removed; ship to learn — real feedback comes from real users; open by default — transparency builds trust. Technology should be invisible when it works and transformative when it matters.",
    category: "founder",
    links: [
      { label: "Philosophy", href: "/founder/philosophy" },
      { label: "Mission", href: "/company/mission" },
    ],
    related: ["What is Savan Patel's background?", "What is SP NET INC's mission?"],
  },
  {
    question: "Why did Savan found SP NET INC?",
    answer:
      "I believed technology could be built differently — with privacy at its core, obsessive attention to detail, and a focus on genuine value rather than extracting attention. I watched teams struggle with outdated tools and saw messaging apps compromise on privacy. I wanted to build something better.",
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
      "Building everything alone. When you are the only person — engineering, design, strategy, operations — every decision carries more weight and every mistake costs more time. This constraint has forced extreme discipline and made me a stronger engineer and product thinker. The solitude of solo building is both the hardest part and the most formative.",
    category: "founder",
    links: [
      { label: "Journey", href: "/founder/journey" },
      { label: "About Savan", href: "/founder/about" },
    ],
    related: ["What is Savan Patel's background?", "Why did Savan found SP NET INC?"],
  },
  {
    question: "What drives you personally?",
    answer:
      "Curiosity and the desire to build technology that genuinely serves people. Every product I build solves a problem I have faced myself. I am also driven by the desire to prove that a self-taught engineer from India can build world-class products — through craft, persistence, and an unwavering commitment to quality.",
    category: "founder",
    links: [
      { label: "About Savan", href: "/founder/about" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["What is your vision for the future?", "How do you handle setbacks?"],
  },
  {
    question: "How do you handle setbacks?",
    answer:
      "Setbacks are data, not failures. Acknowledge what happened, understand why, extract the lesson, adjust the plan, and keep moving. Every setback in SP NET's history has led to a better product, a stronger architecture, or a clearer vision. Fail fast, learn quickly, never make the same mistake twice.",
    category: "founder",
    links: [
      { label: "Journey", href: "/founder/journey" },
      { label: "Philosophy", href: "/founder/philosophy" },
    ],
    related: ["What drives you personally?", "What is the biggest challenge faced so far?"],
  },

  // ─── Company ─────────────────────────────────────────────
  {
    question: "What is SP NET INC's mission?",
    answer:
      "Build technology that serves people without compromising their data, their time, or their trust. Privacy at its core — user data is never the product. Craft over scale — every detail matters. Intelligence as foundation — AI should amplify human capability, not replace human judgment.",
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
      "A unified ecosystem where communication, organization management, and intelligence work together seamlessly. One account, one data layer — every SP NET product feels like a natural part of something bigger. Not separate tools, but one integrated platform that adapts to how people actually work.",
    category: "company",
    links: [
      { label: "SP NET Ecosystem", href: "/products/sp-net-ecosystem" },
      { label: "Vision", href: "/explore/vision" },
    ],
    related: ["What is SP NET INC's mission?", "How do SP NET products work together?"],
  },
  {
    question: "Where is SP NET INC based?",
    answer:
      "SP NET INC is based in India. The company operates as a remote-first organization with infrastructure distributed globally. All products are built and deployed from India, serving users worldwide.",
    category: "company",
    links: [
      { label: "About SP NET INC", href: "/company/about" },
    ],
    related: ["When was SP NET INC founded?", "How big is SP NET INC?"],
  },
  {
    question: "When was SP NET INC founded?",
    answer:
      "SP NET INC was founded in 2022. The company began with a clear vision: build technology that serves people without compromising their privacy. Every product decision since founding has been guided by the belief that technology can be built better.",
    category: "company",
    links: [
      { label: "About SP NET INC", href: "/company/about" },
      { label: "Journey", href: "/founder/journey" },
    ],
    related: ["What is SP NET INC?", "What is SP NET INC's mission?"],
  },
  {
    question: "How big is SP NET INC?",
    answer:
      "SP NET INC is a founder-led operation. I handle everything personally — product strategy, engineering, design, and operations. When the time comes to grow the team, the focus will be on exceptional people who set the standard, not on headcount. Quality over quantity.",
    category: "company",
    links: [
      { label: "Leadership", href: "/company/leadership" },
      { label: "Careers", href: "/company/careers" },
    ],
    related: ["Is SP NET INC hiring?", "Where is SP NET INC based?"],
  },

  // ─── Products ────────────────────────────────────────────
  {
    question: "What products does SP NET build?",
    answer:
      "Three core products: SP NET GRAM (next-generation messaging), SP NET ADMIN OS (enterprise administration), and SP NET AI (intelligence layer). Additionally, SavaroX explores blockchain infrastructure. The SP NET Ecosystem will unify everything. Each product has its own dedicated page with detailed features and vision.",
    category: "products",
    links: [
      { label: "Products", href: "/products" },
    ],
    related: ["Are SP NET products available now?", "What is the SP NET Ecosystem?"],
  },
  {
    question: "What is SP NET GRAM?",
    answer:
      "A next-generation messaging platform focused on privacy, productivity, and a premium experience. I built it because existing apps either compromise on privacy or bury the features you need. It is in active development with beta access planned for 2026. The product page has the full details.",
    category: "products",
    links: [
      { label: "SP NET GRAM", href: "/products/sp-net-gram" },
    ],
    related: ["What is SP NET ADMIN OS?", "Are SP NET products available now?"],
  },
  {
    question: "What is SP NET ADMIN OS?",
    answer:
      "A modern enterprise administration platform. I built it from watching teams struggle with clunky, outdated admin dashboards. It includes organization management, analytics, moderation, and team management. Currently in active development with beta access planned for 2026. See the product page for more.",
    category: "products",
    links: [
      { label: "SP NET ADMIN OS", href: "/products/sp-net-admin-os" },
    ],
    related: ["What is SP NET GRAM?", "What is SP NET AI?"],
  },
  {
    question: "What is SP NET AI?",
    answer:
      "The intelligence layer across the SP NET ecosystem. It powers smart features in GRAM and ADMIN OS — from context-aware suggestions to automated workflows. AI is woven into products as a unified intelligence layer, not bolted on as an afterthought. See the product page for details.",
    category: "products",
    links: [
      { label: "SP NET AI", href: "/products/sp-net-ai" },
      { label: "AI Research", href: "/research/ai" },
    ],
    related: ["What is SP NET GRAM?", "What is the SP NET Ecosystem?"],
  },
  {
    question: "What is SavaroX?",
    answer:
      "SavaroX is SP NET's blockchain initiative, building decentralized infrastructure, tokenized economies, and Web3-native experiences. It is designed to complement the broader SP NET ecosystem. The product page covers the vision, roadmap, and technical approach in detail.",
    category: "products",
    links: [
      { label: "SavaroX", href: "/products/savaro-x" },
    ],
    related: ["What products does SP NET build?", "What is the SP NET Ecosystem?"],
  },
  {
    question: "Are SP NET products available now?",
    answer:
      "Not yet. All core products — GRAM, ADMIN OS, and AI — are in active development. Beta access for GRAM and ADMIN OS is planned for 2026. Core features will always be free; premium features will have paid tiers. The System Status page tracks development progress.",
    category: "products",
    links: [
      { label: "System Status", href: "/trust/status" },
      { label: "Products", href: "/products" },
    ],
    related: ["What products does SP NET build?", "What is the SP NET Ecosystem?"],
  },
  {
    question: "What is the SP NET Ecosystem?",
    answer:
      "The long-term vision: one account, one seamless experience across every tool. Products work together naturally — a message in GRAM triggers a workflow in ADMIN OS, AI suggests actions based on data from both. The Ecosystem page has a preview of what is being built.",
    category: "products",
    links: [
      { label: "SP NET Ecosystem", href: "/products/sp-net-ecosystem" },
      { label: "Vision", href: "/explore/vision" },
    ],
    related: ["What products does SP NET build?", "How do SP NET products work together?"],
  },
  {
    question: "How do SP NET products work together?",
    answer:
      "Each product handles its domain with depth, while the ecosystem ensures a seamless experience across all of them. Through a unified experience layer, context flows naturally between products. Each product is fully functional on its own, but together the whole is greater than the sum of its parts.",
    category: "products",
    links: [
      { label: "SP NET Ecosystem", href: "/products/sp-net-ecosystem" },
    ],
    related: ["What is the SP NET Ecosystem?", "What products does SP NET build?"],
  },

  // ─── Security & Privacy ──────────────────────────────────
  {
    question: "How does SP NET handle privacy?",
    answer:
      "Privacy is a foundational principle, not an afterthought. Every product is designed with privacy at its core: encryption, minimal data collection, user-controlled permissions, and transparent practices. This website uses no tracking cookies, no analytics scripts, and no advertising. The Trust section has full details.",
    category: "security_privacy",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
      { label: "Trust & Security", href: "/trust/security" },
    ],
    related: ["Does SP NET sell user data?", "Does this website use tracking?"],
  },
  {
    question: "Does SP NET sell user data?",
    answer:
      "No. User data is never sold, shared for marketing, or used for advertising. SP NET INC is funded through product development, not data harvesting. This is a core principle, not a policy that can change.",
    category: "security_privacy",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
      { label: "Transparency", href: "/trust/transparency" },
    ],
    related: ["How does SP NET handle privacy?", "Does this website use tracking?"],
  },
  {
    question: "Does this website use tracking?",
    answer:
      "No. This website uses no tracking cookies, no analytics scripts, and no advertising. Contact form submissions are stored securely and used only to respond to inquiries. Your browsing experience here is completely private.",
    category: "security_privacy",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
      { label: "Cookies", href: "/trust/cookies" },
    ],
    related: ["How does SP NET handle privacy?", "Does SP NET sell user data?"],
  },
  {
    question: "What data does this website collect?",
    answer:
      "Only what is necessary to function: contact form submissions (name, email, message) are stored securely and used solely to respond. No browsing data, no analytics, no tracking cookies. The Trust > Privacy page has the complete breakdown.",
    category: "security_privacy",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
    ],
    related: ["Does this website use tracking?", "Can I request my data be deleted?"],
  },
  {
    question: "Can I request my data be deleted?",
    answer:
      "Yes. Email hello@sp-net.in with the subject line 'Data Deletion Request,' include the email you used and what you want deleted. Requests are processed within 72 hours. This applies to all data held by SP NET INC.",
    category: "security_privacy",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["What data does this website collect?", "How does SP NET handle privacy?"],
  },
  {
    question: "How can I report a security vulnerability?",
    answer:
      "Email security@sp-net.in with a description, steps to reproduce, and potential impact. All reports are reviewed within 24 hours. Responsible disclosure ensures vulnerabilities are fixed before they can be exploited. The Security page has full details on the disclosure process.",
    category: "security_privacy",
    links: [
      { label: "Security", href: "/trust/security" },
    ],
    related: ["How does SP NET approach data breaches?", "How does SP NET handle privacy?"],
  },
  {
    question: "What is SP NET's approach to encryption?",
    answer:
      "Every product that handles sensitive data uses end-to-end encryption — data is encrypted on the sender's device and only decrypted on the recipient's device. Industry-standard protocols are used throughout. A zero-knowledge architecture means even SP NET cannot access plaintext.",
    category: "security_privacy",
    links: [
      { label: "Security", href: "/trust/security" },
      { label: "SP NET GRAM", href: "/products/sp-net-gram" },
    ],
    related: ["How does SP NET handle privacy?", "How can I report a security vulnerability?"],
  },
  {
    question: "Does this website use cookies?",
    answer:
      "No advertising, tracking, or analytics cookies. A Website Preferences notice may appear once to remember your preference — that is stored locally in your browser using localStorage, which never leaves your device. The Trust > Cookies page explains this in detail.",
    category: "security_privacy",
    links: [
      { label: "Cookies & Local Storage", href: "/trust/cookies" },
      { label: "Privacy Policy", href: "/trust/privacy" },
    ],
    related: ["Does this website use tracking?", "What data does this website collect?"],
  },

  // ─── Contact ─────────────────────────────────────────────
  {
    question: "How can I contact Savan Patel?",
    answer:
      "The fastest way is through the PCA (Personal Communication Assistant) on Telegram at t.me/SAVANPATELSP_BOT — it provides instant answers 24/7. For direct email, use savan@sp-net.in. Department-specific emails: business@sp-net.in (partnerships), media@sp-net.in (press), security@sp-net.in (vulnerabilities), careers@sp-net.in (jobs). All emails are personally reviewed within 48 hours.",
    category: "contact",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
      { label: "Contact", href: "/contact" },
    ],
    related: ["What is the Personal Communication Assistant?", "Can I request a meeting?"],
  },
  {
    question: "Can I request a meeting?",
    answer:
      "Email business@sp-net.in with the purpose, preferred format, and proposed time slots. Calendar availability can be checked at cal.com/savanpatel. Meetings are 30 minutes with a clear agenda. The PCA can also help schedule.",
    category: "contact",
    links: [
      { label: "Calendar", href: "https://cal.com/savanpatel" },
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How can I contact Savan Patel?", "Can media contact SP NET?"],
  },
  {
    question: "Where can I follow Savan's work?",
    answer:
      "GitHub (github.com/savanpatelssp) for code, Telegram (t.me/ABOUTME_SP) for direct communication, Instagram (savanpatelssp) for visual updates. X and LinkedIn profiles are coming soon. The footer has all social links.",
    category: "contact",
    links: [
      { label: "Socials", href: "/company/socials" },
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How can I contact Savan Patel?", "How can I stay updated?"],
  },
  {
    question: "How can I stay updated?",
    answer:
      "The PCA on Telegram provides instant status on any topic. The System Status page tracks development progress. Social channels (GitHub, Telegram, Instagram) share regular updates. A newsletter is planned for the future.",
    category: "contact",
    links: [
      { label: "System Status", href: "/trust/status" },
      { label: "Socials", href: "/company/socials" },
    ],
    related: ["Where can I follow Savan's work?", "Do you have a newsletter?"],
  },

  // ─── Business ────────────────────────────────────────────
  {
    question: "Can I collaborate with SP NET?",
    answer:
      "Collaboration is welcome when there is genuine alignment — research initiatives, product integrations, or shared technical challenges. Email hello@sp-net.in with what you are building, why you want to collaborate, and what you bring to the table. The best collaborations happen when both sides bring something unique.",
    category: "business",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
      { label: "Partners", href: "/company/partners" },
    ],
    related: ["Is Savan available for freelance work?", "How do I apply to work at SP NET INC?"],
  },
  {
    question: "Can media contact SP NET?",
    answer:
      "Yes. Email media@sp-net.in with the publication name, story nature, and deadline. Interviews, quotes, and media assets are available. The Media Kit page provides brand assets and usage guidelines. The PCA can also help with quick media inquiries.",
    category: "business",
    links: [
      { label: "Media Kit", href: "/resources/media-kit" },
      { label: "Press Contact", href: "/resources/press-contact" },
    ],
    related: ["How can I contact Savan Patel?", "How can I get the Media Kit?"],
  },
  {
    question: "How can I get the Media Kit?",
    answer:
      "The Media Kit is at Resources > Media Kit. It includes brand assets, color palette, typography guidelines, logo usage rules, and key facts about SP NET INC. Free to use within the published brand guidelines.",
    category: "business",
    links: [
      { label: "Media Kit", href: "/resources/media-kit" },
      { label: "Press Contact", href: "/resources/press-contact" },
    ],
    related: ["Can media contact SP NET?", "Can I use SP NET brand assets?"],
  },
  {
    question: "Is Savan available for freelance work?",
    answer:
      "No. I am primarily focused on building SP NET INC. For collaboration or consulting inquiries, email business@sp-net.in with the details and how it aligns with SP NET's work.",
    category: "business",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["Can I collaborate with SP NET?", "How do I apply to work at SP NET INC?"],
  },
  {
    question: "How do I apply to work at SP NET INC?",
    answer:
      "When roles open, they will be posted on the Careers page and shared across channels. The best way to get on the radar is to build things and share your work. I value craft over credentials — show what you can build.",
    category: "business",
    links: [
      { label: "Careers", href: "/company/careers" },
      { label: "About SP NET INC", href: "/company/about" },
    ],
    related: ["What is the culture like at SP NET INC?", "Is SP NET INC hiring?"],
  },
  {
    question: "Is SP NET INC hiring?",
    answer:
      "Not currently. SP NET INC is a founder-led operation focused on shipping products. When the time comes to grow, roles will span engineering, design, product, and operations — all focused on craft and impact. The hiring philosophy is senior-first.",
    category: "business",
    links: [
      { label: "Careers", href: "/company/careers" },
    ],
    related: ["How do I apply to work at SP NET INC?", "What is the culture like at SP NET INC?"],
  },

  // ─── Portfolio ───────────────────────────────────────────
  {
    question: "What is the Portfolio App?",
    answer:
      "A lightweight web app you can install on your phone or desktop. It works offline, loads fast, and gives you quick access to everything — products, research, founder info, and contact. It is a Progressive Web App (PWA), not a native app. The Portfolio App page has full details.",
    category: "portfolio",
    links: [
      { label: "Portfolio App", href: "/portfolio-app" },
      { label: "Install", href: "/portfolio-app/install" },
    ],
    related: ["Is the Portfolio App free?", "How do I install the Portfolio App?"],
  },
  {
    question: "Is the Portfolio App free?",
    answer:
      "Yes. The Portfolio App is completely free. It is a Progressive Web App — install it from your browser, no app store required. The portfolio-app FAQ page has answers to all installation, features, and troubleshooting questions.",
    category: "portfolio",
    links: [
      { label: "Portfolio App", href: "/portfolio-app" },
      { label: "Portfolio App FAQ", href: "/portfolio-app/faq" },
    ],
    related: ["What is the Portfolio App?", "How do I install the Portfolio App?"],
  },
  {
    question: "How do I install the Portfolio App?",
    answer:
      "On Android/Chrome: tap the install prompt or use the menu > 'Install app.' On iOS: use Safari's Share menu > 'Add to Home Screen.' On desktop: look for the install icon in the address bar. The Install page has step-by-step instructions for every platform.",
    category: "portfolio",
    links: [
      { label: "Install Guide", href: "/portfolio-app/install" },
      { label: "Platform Support", href: "/portfolio-app/platform-support" },
    ],
    related: ["What is the Portfolio App?", "Is the Portfolio App free?"],
  },
  {
    question: "Is the Portfolio App safe to install?",
    answer:
      "Yes. The Portfolio App is a Progressive Web App — it is the same website, just with a better install experience. It does not access device sensors, does not collect personal data, and runs in the browser's security sandbox. You can uninstall it at any time. The Privacy page has details.",
    category: "portfolio",
    links: [
      { label: "Privacy", href: "/portfolio-app/privacy" },
      { label: "Portfolio App FAQ", href: "/portfolio-app/faq" },
    ],
    related: ["What is the Portfolio App?", "Does the Portfolio App collect data?"],
  },
  {
    question: "How often is the website updated?",
    answer:
      "The website is updated regularly as new content, products, and research areas are added. Major updates coincide with product milestones. The site is built for fast iteration — when things change, the site updates to match.",
    category: "portfolio",
    links: [
      { label: "System Status", href: "/trust/status" },
    ],
    related: ["What is this website?", "How can I stay updated?"],
  },
  {
    question: "Can I report website issues?",
    answer:
      "Yes. If you find a broken link, typo, rendering issue, or anything else wrong, use the PCA for quick reporting or email hello@sp-net.in with the issue and the page where you found it. Every report is reviewed and fixed promptly.",
    category: "portfolio",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How often is the website updated?", "How can I contact Savan Patel?"],
  },
  {
    question: "Is this website open source?",
    answer:
      "Not yet. The source code is private. I plan to release it when the code meets the quality, documentation, and security standards required for open source. The Open Source page details the release phases and timeline.",
    category: "portfolio",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
    ],
    related: ["How are your projects currently developed?", "Will SP NET release open source tools?"],
  },

  // ─── Future ──────────────────────────────────────────────
  {
    question: "What is your vision for the future?",
    answer:
      "All core products publicly available and serving users worldwide. The SP NET Ecosystem fully operational with seamless integration. Open source contributions active with developer tools available to the community. A small, exceptional team while maintaining the founder-led culture. Ultimately: proving technology can be built differently — with privacy, craft, and genuine value at its core.",
    category: "future",
    links: [
      { label: "Vision", href: "/explore/vision" },
      { label: "Roadmap", href: "/founder/roadmap" },
    ],
    related: ["What is Savan Patel's roadmap?", "What drives you personally?"],
  },
  {
    question: "What is Savan Patel's roadmap?",
    answer:
      "High-level: complete GRAM and ADMIN OS features through 2026, launch public betas, advance AI research, and scale the ecosystem. Cloud, Teams, and Automate are planned for 2027-2028. The Roadmap page has detailed quarterly milestones. The roadmap evolves as products mature — the vision stays stable, the specifics adapt.",
    category: "future",
    links: [
      { label: "Roadmap", href: "/founder/roadmap" },
      { label: "System Status", href: "/trust/status" },
    ],
    related: ["What is your vision for the future?", "Are SP NET products available now?"],
  },
  {
    question: "Will SP NET release open source tools?",
    answer:
      "Yes. I plan to release select projects and developer tools as open source — including a design system and eventually this portfolio website. The Open Source page details the four-phase approach: private development, quality hardening, selective release, and full ecosystem release.",
    category: "future",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
    ],
    related: ["Is this website open source?", "How are your projects currently developed?"],
  },
  {
    question: "How are your projects currently developed?",
    answer:
      "All projects are currently developed privately. The repositories are not public and contributions cannot be accepted yet. Products are in active development with rapidly shifting APIs, security is critical, and documentation must meet strict standards before public release. I plan to release under MIT or Apache 2.0 when the code is ready.",
    category: "future",
    links: [
      { label: "Open Source", href: "/resources/open-source" },
    ],
    related: ["Will SP NET release open source tools?", "Can I contribute to SP NET projects?"],
  },
  {
    question: "Do you have a newsletter?",
    answer:
      "Not yet. Currently the best ways to stay updated are the PCA on Telegram, social channels (GitHub, Telegram, Instagram), and the System Status page. When the newsletter launches, it will provide meaningful updates — not high-volume marketing emails.",
    category: "future",
    links: [
      { label: "Socials", href: "/company/socials" },
      { label: "System Status", href: "/trust/status" },
    ],
    related: ["How can I stay updated?", "Where can I follow Savan's work?"],
  },
  {
    question: "What SP NET pages are coming soon?",
    answer:
      "The Blog (technical articles and product updates), Newsroom (company announcements), and Press Releases are all in development. Social profiles on X and LinkedIn are also planned. These launch when there is enough quality content to justify them — not before.",
    category: "future",
    links: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Newsroom", href: "/company/newsroom" },
    ],
    related: ["Do you have a newsletter?", "How can I stay updated?"],
  },

  // ─── Personal Communication Assistant ─────────────────────
  {
    question: "What is the Personal Communication Assistant?",
    answer:
      "The PCA is an AI-powered assistant available on Telegram at t.me/SAVANPATELSP_BOT. It can answer questions about me, SP NET INC, the products, research, career opportunities, and more. It is the recommended first point of contact — instant, accurate responses 24/7.",
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
      "Open t.me/SAVANPATELSP_BOT in your browser or Telegram app and start chatting. Ask about anything — products, research, careers, collaborations, technical questions. No account or setup required. If it cannot answer, it will guide you to the right channel.",
    category: "pca",
    links: [
      { label: "Open PCA on Telegram", href: "https://t.me/SAVANPATELSP_BOT" },
    ],
    related: ["What is the Personal Communication Assistant?", "What can I ask the PCA about?"],
  },
  {
    question: "Why should I use the PCA instead of email?",
    answer:
      "The PCA provides instant responses 24/7, while email takes up to 48 hours. It is trained on comprehensive knowledge about SP NET INC and handles most inquiries immediately. For complex business proposals, formal requests, or sensitive matters, email remains available.",
    category: "pca",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
    ],
    related: ["How do I use the PCA?", "How can I contact Savan Patel?"],
  },
  {
    question: "What can I ask the PCA about?",
    answer:
      "Anything about Savan Patel, SP NET INC, the products, research areas, career opportunities, collaborations, privacy practices, and general questions. For specific departmental inquiries, it will direct you to the appropriate email address.",
    category: "pca",
    links: [
      { label: "Open PCA on Telegram", href: "https://t.me/SAVANPATELSP_BOT" },
    ],
    related: ["How do I use the PCA?", "What is the Personal Communication Assistant?"],
  },
  {
    question: "What are the PCA's limitations?",
    answer:
      "The PCA is a knowledge assistant, not a decision-maker. It cannot approve business proposals, grant product access, make hiring decisions, or access private data. For formal legal requests, contract negotiations, or sensitive matters requiring human judgment, email or a scheduled meeting is appropriate.",
    category: "pca",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
      { label: "Contact", href: "/contact" },
    ],
    related: ["What is the Personal Communication Assistant?", "Why should I use the PCA instead of email?"],
  },
];
