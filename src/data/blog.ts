import type { ContentBlock } from "@/lib/content";

/* ─── Blog types ───────────────────────────────────────────────── */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  subtitle?: string;
  category: string;
  tags: string[];
  date: string;
  /** ISO date string. When present, "Updated …" is shown in article utilities. */
  updatedAt?: string;
  author: string;
  authorRole: string;
  readingTime?: number;
  /** Editorial prominence. Exactly one post is the current cover story. */
  featured: boolean;
  /** When true, the post is the pinned cover story on the Blog index. */
  pinned?: boolean;
  specialEdition?: boolean;
  /** Compact capsule, e.g. "15 AUG 2026 · SPECIAL EDITION". */
  specialEditionLabel?: string;
  /** Issue label, e.g. "Special Edition · 01". */
  editionLabel?: string;
  /** When present, the post belongs to a multi-part series. */
  series?: BlogSeries;
  heroImage?: string;
  heroAlt?: string;
  heroCaption?: string;
  content: ContentBlock[];
}

export interface BlogSeries {
  slug: string;
  title: string;
  part: number;
  total?: number;
}

export interface BlogCategory {
  slug: string;
  label: string;
  description: string;
}

/* ─── Categories ───────────────────────────────────────────────── */

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "founder-notes",
    label: "Founder Notes",
    description: "Direct writing from the founder — decisions, lessons, and the long view of building.",
  },
  {
    slug: "engineering",
    label: "Engineering",
    description: "Architecture, code, and the discipline of building software that survives contact.",
  },
  {
    slug: "technology",
    label: "Technology",
    description: "Notes on the platforms, tools, and shifts shaping what gets built next.",
  },
  {
    slug: "product",
    label: "Product",
    description: "Design, craft, and the work of turning an idea into something people use.",
  },
  {
    slug: "ai",
    label: "AI",
    description: "Practical writing on intelligent systems and where the technology is heading.",
  },
  {
    slug: "security",
    label: "Security",
    description: "Privacy, trust, and building systems that respect the people who use them.",
  },
  {
    slug: "blockchain",
    label: "Blockchain",
    description: "Foundations work on digital assets, tokens, and distributed infrastructure.",
  },
  {
    slug: "open-source",
    label: "Open Source",
    description: "Building in the open — projects, contributions, and the public commons.",
  },
  {
    slug: "projects",
    label: "Projects",
    description: "Field notes from specific things being built across the SP NET ecosystem.",
  },
  {
    slug: "india",
    label: "India",
    description: "Technology, independence, and building at home in India.",
  },
  {
    slug: "ideas",
    label: "Ideas",
    description: "Experiments and half-formed thoughts that refuse to stay quiet.",
  },
];

export function slugifyCategory(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.slug === slug);
}

export function getBlogCategoryByLabel(label: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.label === label);
}

/** Categories that currently have at least one published story. */
export function getBlogCategories(): BlogCategory[] {
  const labels = new Set(getPublishedBlogPosts().map((post) => post.category));
  return BLOG_CATEGORIES.filter((category) => labels.has(category.label));
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  const category = getBlogCategory(categorySlug);
  if (!category) return [];
  return getPublishedBlogPosts().filter((post) => post.category === category.label);
}

/* ─── Posts ────────────────────────────────────────────────────── */

export const blogPosts: BlogPost[] = [
  {
    slug: "independence-day-2026",
    title: "Independence Is Something We Keep Building",
    subtitle:
      "On the 80th Independence Day of India, a reflection from a builder on what freedom means when you spend your days creating things — and why the next chapter of India's story will be written in code.",
    excerpt:
      "Independence is not only something we remember. It is something we continue to build. A personal reflection on India, freedom, technology, and the responsibility of the builder — on the 80th Independence Day.",
    category: "Founder Notes",
    date: "2026-08-15",
    author: "Savan Patel",
    authorRole: "Founder & Product Engineer, SP NET INC",
    featured: true,
    pinned: true,
    specialEdition: true,
    specialEditionLabel: "15 AUG 2026 · SPECIAL EDITION",
    editionLabel: "Special Edition · 01",
    heroImage: "/special-edition/special-edition-1.png",
    heroAlt: "SP NET INC brand artwork — a dark, cinematic composition with deep blue tones",
    heroCaption: "Independence Day 2026 — Special Edition cover art, SP NET INC",
    tags: ["India", "Technology", "Engineering", "Building", "SP NET", "Vision"],
    content: [
      {
        type: "p",
        text: "Every year on the fifteenth of August, India stops for a few minutes and remembers a morning in 1947 when a nation that had spent centuries being governed by others finally took control of its own story. Flags go up, songs are sung, and for one day the whole country feels what freedom feels like.",
      },
      {
        type: "p",
        text: "This year, on the 80th anniversary of that morning, I want to write about something quieter — what independence means to a person who spends his days building things. Because I think the builders, the makers, the ones writing the next lines of India's story, understand freedom differently. Not as a memory to be celebrated once a year, but as a thing you have to keep earning, every single day, with your work.",
      },
      {
        type: "h2",
        text: "What independence means to a builder",
      },
      {
        type: "p",
        text: "When you build things for a living — software, products, companies — Independence Day lands differently. You are not just remembering a historical event. You are standing inside its consequence.",
      },
      {
        type: "p",
        text: "The freedom to start something from nothing. The freedom to make a decision without asking for permission. The freedom to fail, and to learn from failing, and to try again. The freedom to own the outcome of your own work. These are not abstract ideas. They are the daily conditions of a builder's life — and they are freedoms that were bought, not inherited.",
      },
      {
        type: "p",
        text: "I started writing code in 2018, alone, in my room, with nothing but a terminal and documentation and an unreasonable amount of curiosity. Nobody gave me a roadmap. Nobody gave me a textbook. The internet — that strange, open, borderless thing — was my teacher. And I remember thinking, even then, how remarkable it was that a kid in India could learn to build the same software as someone anywhere else in the world. Same tools. Same documentation. Same midnight debugging.",
      },
      {
        type: "p",
        text: "That is what independence looks like in the age of technology. A level field. Not a guaranteed win — but a fair shot. And a fair shot is all anyone needs to begin.",
      },
      {
        type: "quote",
        text: "Independence is not only something we remember. It is something we continue to build.",
      },
      {
        type: "h2",
        text: "India's technology journey",
      },
      {
        type: "p",
        text: "My generation grew up inside one of the fastest technology transitions any country has ever experienced. We watched phones arrive in households that had never had landlines. We watched bank transfers move from queues and paper to a few taps on a screen. We watched a country that once imported the machines it used now build the software that the world runs on.",
      },
      {
        type: "p",
        text: "The digital infrastructure India has built is not an accident. It is a decision — a national decision — that technology belongs to everyone, and that a connected India is a stronger India. Payments, identity, education, healthcare, governance: layer by layer, the country has been quietly constructing the largest experiment in digital inclusion on the planet.",
      },
      {
        type: "p",
        text: "And yet, the honest truth is that most of what India uses is still built elsewhere. The operating systems, the chips, the underlying platforms — a great deal of it comes from outside. That is not a criticism of anyone who builds elsewhere; it is simply a statement of how the world works. And it is also an opportunity, the kind of opportunity that comes once or twice in a generation.",
      },
      {
        type: "p",
        text: "If the twentieth century was India's fight for political independence, the twenty-first is India's opportunity to earn technological independence. Not as a wall against the world, but as the confidence to build world-class things at home — and to let the world benefit from them.",
      },
      {
        type: "h2",
        text: "Why building matters",
      },
      {
        type: "p",
        text: "Freedom, left unexercised, becomes a slogan. A nation stays free when its people can create — technology, companies, institutions, art, ideas. The countries that endure are not the ones with the best stories about their past. They are the ones whose people keep making things for the future.",
      },
      {
        type: "p",
        text: "I believe this is especially true for India right now. For decades, the pattern for a young Indian who wanted to build something big was to leave. Leave the country, find a market abroad, build there. That pattern is changing, and I think it is changing for good. The tools are global. The talent is here. The ambition was always here.",
      },
      {
        type: "p",
        text: "What was missing was the confidence — the belief that you can build something world-class from where you stand. That belief is not a gift. It is built, one shipped product, one solved problem, one honest failure at a time.",
      },
      {
        type: "h2",
        text: "What I am building",
      },
      {
        type: "p",
        text: "In 2022, I founded SP NET INC with a simple conviction: that software should connect people, empower communities, and respect their privacy. I started with a messaging platform — SP NET GRAM — built from first principles for how people actually communicate. Then came SP NET ADMIN OS, enterprise administration built for modern organizations. Then SP NET AI, the intelligence layer. And beyond those, an ecosystem of products designed to work together: infrastructure, developer tools, blockchain foundations, and more.",
      },
      {
        type: "p",
        text: "I am building an ecosystem, not just a collection of products. A unified foundation of design, security, and intelligence that every product shares. It is a long game, and I am patient with it. Good software — like good institutions — is built slowly, by people who intend to be around.",
      },
      {
        type: "p",
        text: "I say all of this not to advertise anything. I say it because I want to be honest about what independence looks like when it is being practiced rather than celebrated. It looks like a person, sitting at a desk, at midnight, building something that did not exist before. It looks like saying no to easy shortcuts because the hard version is the version worth doing. It looks like choosing to build at home, for your own people, in your own way.",
      },
      {
        type: "h2",
        text: "A few things are coming",
      },
      {
        type: "p",
        text: "This has been a year of laying foundations, and the next months are going to start showing that work. A few things are coming, and I am deliberately keeping some of them quiet until they are ready — but here is a sense of the shape of it:",
      },
      {
        type: "list",
        items: [
          "SP NET GRAM is moving toward its planned public beta later this year. Core messaging is built; the focus now is encryption, channels, and the premium experience.",
          "SP NET ADMIN OS is heading toward its API platform and enterprise onboarding — the point where it stops being a tool we build and becomes a platform others build on.",
          "SP NET AI is moving from research into real features: intelligent search, suggestions, and eventually a developer API for the ecosystem.",
          "SP NET BLOCKCHAIN and SavaroX continue as foundation work — digital assets and token infrastructure are a long game, and the foundation work continues quietly.",
          "We are also preparing to open up parts of the shared infrastructure as open source, with a contributor program in the second half of this year.",
          "And this blog itself is the beginning of something — a space where I write honestly about building, engineering, and the journey. More will be revealed soon.",
        ],
      },
      {
        type: "p",
        text: "I am not going to invent dates to make this article look more complete than it is. Real work moves at the speed of real work. What I can promise is direction: the products are being built, the foundations are being laid, and when there is something concrete to share, I will share it here — in the Newsroom — before anywhere else.",
      },
      {
        type: "h2",
        text: "A note to young Indian builders",
      },
      {
        type: "p",
        text: "If you are young, and you are in India, and you are thinking about building something — let me tell you what I wish someone had told me in 2018.",
      },
      {
        type: "p",
        text: "You do not need permission. You do not need to wait for a job that teaches you how, or a mentor to hand you a roadmap, or a stamp of approval from anyone. You need a problem that bothers you, a willingness to be bad at something for a while, and the discipline to keep going when it is hard. That is the whole recipe. Everything else is decoration.",
      },
      {
        type: "p",
        text: "You will be tempted to measure yourself against builders abroad, against the funding rounds and the hype. Ignore the noise. Build something small and real. Ship it. Let someone you have never met find it useful. That feeling — a stranger using something you built — is worth more than any metric.",
      },
      {
        type: "p",
        text: "India does not need more consumers of technology. India needs more builders of it. The country will be shaped, over the next twenty years, by the people who choose to create rather than consume. I hope you are one of them.",
      },
      {
        type: "quote",
        text: "The tools are global. The talent is here. The ambition was always here. What India needs is more people who choose to build.",
      },
      {
        type: "h2",
        text: "This Independence Day",
      },
      {
        type: "p",
        text: "On 15 August, I will do what I do every day. I will build. Not because I am ignoring the holiday — but because building is how I honor it. Every line of code is a small vote for a future that is made at home, by our own hands, on our own terms.",
      },
      {
        type: "p",
        text: "Independence is not only something we remember. It is something we continue to build. Seventy-nine years ago, a nation chose freedom. The work of making that freedom real — of filling it with schools and hospitals and startups and railways and software and songs — was never finished. It is passed, generation to generation, to the people willing to do the building.",
      },
      {
        type: "p",
        text: "This year, I am one of them. I hope you are too.",
      },
      {
        type: "quote",
        text: "LEAD • BUILD • CONNECT",
      },
      {
        type: "p",
        text: "Jai Hind.",
      },
    ],
  },
];

/* ─── Selectors ────────────────────────────────────────────────── */

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPublishedBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedBlogPost(): BlogPost | undefined {
  return getPublishedBlogPosts().find((post) => post.featured);
}

/** The current cover story — explicitly pinned, else featured, else the latest post. */
export function getPinnedBlogPost(): BlogPost | undefined {
  const sorted = getPublishedBlogPosts();
  return (
    sorted.find((post) => post.pinned) ??
    sorted.find((post) => post.featured) ??
    sorted[0]
  );
}

/**
 * Manually curated "Recommended Reading" — an editorial selection, never
 * a fake popularity metric. Falls back to the newest posts when no
 * specific picks are listed.
 */
const recommendedPostSlugs: string[] = ["independence-day-2026"];

export function getRecommendedPosts(limit = 3): BlogPost[] {
  const picks = recommendedPostSlugs
    .map((slug) => getBlogPost(slug))
    .filter((post): post is BlogPost => Boolean(post));
  if (picks.length > 0) return picks.slice(0, limit);
  return getPublishedBlogPosts().slice(0, limit);
}

/**
 * Related reading ranked by:
 *   1. same series (strongest)
 *   2. same category
 *   3. overlapping tags
 *   4. manual curation (recommended slugs get a small boost)
 *   5. recency (tie-break)
 * Excludes the current post.
 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const others = getPublishedBlogPosts().filter((p) => p.slug !== post.slug);
  if (others.length === 0) return [];

  const scored = others
    .map((other) => {
      let score = 0;
      if (post.series && other.series?.slug === post.series.slug) score += 100;
      if (other.category === post.category) score += 10;
      for (const tag of other.tags) {
        if (post.tags.includes(tag)) score += 1;
      }
      if (recommendedPostSlugs.includes(other.slug)) score += 5;
      if (other.author === post.author) score += 1;
      return { post: other, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    });

  return scored.slice(0, limit).map((s) => s.post);
}

/** All posts belonging to a series, ordered by part number. */
export function getSeriesPosts(seriesSlug: string): BlogPost[] {
  return getPublishedBlogPosts()
    .filter((post) => post.series?.slug === seriesSlug)
    .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0));
}
