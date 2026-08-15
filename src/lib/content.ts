/* ─── Shared content model for Blog & Newsroom ─────────────────── */

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "image"; src: string; alt: string; caption?: string; decorative?: boolean }
  | { type: "code"; code: string; lang?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; variant?: CalloutVariant; title?: string; text: string }
  | { type: "link"; label: string; href: string; note?: string };

/** Editorial callout tones rendered as subtle, bordered treatments. */
export type CalloutVariant = "note" | "insight" | "important" | "experiment" | "buildlog";

export const CALLOUT_VARIANTS: CalloutVariant[] = [
  "note",
  "insight",
  "important",
  "experiment",
  "buildlog",
] as const;

const WORDS_PER_MINUTE = 200;

export function countWords(blocks: ContentBlock[]): number {
  let words = 0;
  for (const block of blocks) {
    switch (block.type) {
      case "p":
        words += block.text.split(/\s+/).filter(Boolean).length;
        break;
      case "quote":
        words += (block.text + (block.attribution || "")).split(/\s+/).filter(Boolean).length;
        break;
      case "h2":
      case "h3":
      case "callout":
        words += ((block.type === "callout" ? block.text + (block.title || "") : block.text)).split(/\s+/).filter(Boolean).length;
        break;
      case "list":
        words += block.items.join(" ").split(/\s+/).filter(Boolean).length;
        break;
      case "image":
        words += (block.alt + (block.caption || "")).split(/\s+/).filter(Boolean).length;
        break;
      case "code":
        words += block.code.split(/\s+/).filter(Boolean).length;
        break;
      case "table":
        words += block.headers.join(" ").split(/\s+/).filter(Boolean).length;
        for (const row of block.rows) {
          words += row.join(" ").split(/\s+/).filter(Boolean).length;
        }
        break;
      case "link":
        words += (block.label + (block.note || "")).split(/\s+/).filter(Boolean).length;
        break;
      default:
        break;
    }
  }
  return words;
}

export function readingTimeMinutes(blocks: ContentBlock[]): number {
  return Math.max(1, Math.round(countWords(blocks) / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function formatDate(iso: string): string {
  const date = new Date(iso + (iso.length === 10 ? "T00:00:00Z" : ""));
  if (Number.isNaN(date.getTime())) return iso;
  return `${date.getUTCDate()} ${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function formatDateShort(iso: string): string {
  const date = new Date(iso + (iso.length === 10 ? "T00:00:00Z" : ""));
  if (Number.isNaN(date.getTime())) return iso;
  const month = monthNames[date.getUTCMonth()].slice(0, 3);
  return `${date.getUTCDate()} ${month} ${date.getUTCFullYear()}`;
}

export function formatDateYearMonth(iso: string): string {
  const date = new Date(iso + (iso.length === 10 ? "T00:00:00Z" : ""));
  if (Number.isNaN(date.getTime())) return iso;
  return `${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/* ─── Heading anchors ──────────────────────────────────────────── */
/* Shared by the ArticleRenderer and the Table of Contents so both  */
/* produce identical, stable ids for the same set of heading texts. */

export function slugifyHeading(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return base || "section";
}

export function buildHeadingIds(texts: string[]): string[] {
  const seen = new Map<string, number>();
  return texts.map((text) => {
    const base = slugifyHeading(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  });
}
