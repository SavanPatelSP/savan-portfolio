import { GithubIcon, XIcon, LinkedinIcon } from "@/components/ui/Icons";
import { personal } from "@/data/personal";
import { products, futureProducts } from "@/data/products";
import { BackToTop } from "@/components/layout/BackToTop";

const socials = [
  { icon: GithubIcon, href: personal.social.github, label: "GitHub" },
  { icon: XIcon, href: personal.social.x, label: "X" },
  { icon: LinkedinIcon, href: personal.social.linkedin, label: "LinkedIn" },
];

const footerLinks = {
  navigate: [
    { label: "Products", href: "#products" },
    { label: "Founder", href: "#founder" },
    { label: "Expertise", href: "#technologies" },
    { label: "Organization", href: "#organization" },
    { label: "Journey", href: "#journey" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Contact", href: "#contact" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.03] bg-black">
      {/* Top gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Brand section */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          <div className="max-w-sm">
            <a href="#" className="flex items-center gap-2 text-sm font-medium text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/20 ring-1 ring-blue-500/25 overflow-hidden">
                <img src="/logo.jpg" alt={personal.company} className="object-cover w-full h-full" />
              </span>
              {personal.name}
            </a>
            <p className="mt-4 text-sm text-white/25 leading-relaxed">
              {personal.company} — Building the infrastructure for modern communication, enterprise administration, and intelligent automation.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-white/30 hover:text-white hover:border-white/15 hover:bg-white/[0.03] transition-all duration-200"
                    aria-label={s.label}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12 lg:gap-20">
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/20 mb-4">Navigate</h4>
              <ul className="space-y-2.5">
                {footerLinks.navigate.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/20 mb-4">Products</h4>
              <ul className="space-y-2.5">
                {products.map((p) => (
                  <li key={p.id}>
                    <span className="text-sm text-white/30">{p.name}</span>
                  </li>
                ))}
                {futureProducts.slice(0, 1).map((p) => (
                  <li key={p.id}>
                    <span className="text-sm text-white/20">{p.name} (Coming Soon)</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/20 mb-4">Resources</h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((l) => (
                  <li key={l.label}>
                    <span className="text-sm text-white/20">{l.label} (Coming Soon)</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/20 mb-4">Legal</h4>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl border border-white/[0.04] bg-white/[0.02]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-medium text-white/60">Stay updated</h4>
              <p className="text-sm text-white/25 mt-1">Get notified about new products and updates from SP NET INC.</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/20 transition-all min-w-[200px]"
                disabled
              />
              <span className="text-xs text-white/20 whitespace-nowrap">Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.03] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/15">
            &copy; {new Date().getFullYear()} {personal.company}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/15">
            <span>Made in {personal.madeIn}</span>
            <span className="text-white/8">·</span>
            <span>Founded by {personal.name}</span>
          </div>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
