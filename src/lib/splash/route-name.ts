const EXACT_NAMES: Record<string, string> = {
  "/": "Home",
  "/blog": "Blog",
  "/newsroom": "Newsroom",
  "/contact": "Contact",
  "/get-in-touch": "Get in Touch",
  "/install": "Install",
  "/downloads/portfolio-app": "Install Portfolio App",
  "/portfolio-app": "Portfolio App",
  "/products": "Products",
  "/explore/products": "Explore Products",
  "/company/about": "About SP NET INC",
  "/company": "Company",
  "/trust": "Trust Center",
  "/trust/cookies": "Cookies & Storage",
  "/resources": "Resources",
  "/research": "Research",
  "/founder": "Founder",
  "/sentry-example-page": "Developer",
};

const SECTION_NAMES: Record<string, string> = {
  blog: "Blog",
  newsroom: "Newsroom",
  docs: "Documentation",
  contact: "Contact",
  "get-in-touch": "Get in Touch",
  install: "Install",
  "portfolio-app": "Portfolio App",
  products: "Products",
  explore: "Explore",
  research: "Research",
  trust: "Trust Center",
  resources: "Resources",
  company: "Company",
  founder: "Founder",
  downloads: "Downloads",
  app: "Portfolio App",
  "app-preview": "App Preview",
  og: "Developer",
};

const PRODUCT_NAMES: Record<string, string> = {
  "sp-net-gram": "SP NET GRAM",
  "sp-net-blockchain": "SP NET BLOCKCHAIN",
  "sp-net-admin-os": "SP NET ADMIN OS",
  "sp-net-ai": "SP NET AI",
  "sp-net-api": "SP NET API",
  "sp-net-ecosystem": "SP NET Ecosystem",
  "savaro-x": "SavaroX",
};

function prettifySegment(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => {
      if (word.length <= 3) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function getRouteName(pathname: string): string {
  if (EXACT_NAMES[pathname]) return EXACT_NAMES[pathname];

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "Home";

  const [first, second] = segments;

  if (first === "products" && second && PRODUCT_NAMES[second]) {
    return PRODUCT_NAMES[second];
  }

  if (SECTION_NAMES[first]) return SECTION_NAMES[first];

  if (first === "blog") return "Blog";

  return prettifySegment(first);
}
