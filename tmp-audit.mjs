import { chromium } from "playwright";

const browser = await chromium.launch();

const routes = [
  "/",
  "/trust",
  "/trust/security",
  "/trust/cookies",
  "/trust/privacy",
  "/trust/transparency",
  "/trust/responsible-ai",
  "/trust/status",
  "/founder",
  "/founder/roadmap",
  "/founder/journey",
  "/company",
  "/company/about",
  "/resources",
  "/resources/faqs",
  "/contact",
  "/get-in-touch",
  "/downloads",
  "/explore",
  "/explore/products",
  "/products",
  "/portfolio-app",
  "/docs",
  "/not-found",
];

const viewports = [320, 375, 390, 430, 768, 1024, 1280, 1440];

for (const route of routes) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errs = [];
  page.on("console", (msg) => {
    const t = msg.text();
    if (msg.type() === "error" || /hydrat|mismatch|snapshot|update depth|Maximum|Encountered/i.test(t)) errs.push(`[${msg.type()}] ${t.slice(0, 160)}`);
  });
  page.on("pageerror", (err) => errs.push(`[pageerror] ${err.message.slice(0, 160)}`));

  let status = "404";
  try {
    const resp = await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle", timeout: 45000 });
    status = resp ? String(resp.status()) : "?";
    await page.waitForTimeout(1800);
  } catch (e) {
    errs.push(`[load] ${String(e).slice(0, 120)}`);
  }

  const mob = await page.evaluate(() => {
    const sw = document.documentElement.scrollWidth;
    const cw = document.documentElement.clientWidth;
    const off = [];
    if (sw > cw + 1) {
      document.querySelectorAll("body *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > cw + 1 || r.left < -1)) {
          const cls = String(el.className).slice(0, 45);
          if (!off.includes(cls)) off.push(`${el.tagName.toLowerCase()}.${cls} [${Math.round(r.left)},${Math.round(r.right)}]`);
        }
      });
    }
    return { overflow: sw - cw, off: off.slice(0, 4) };
  });

  console.log(`${route} [${status}] overflow=${mob.overflow}${mob.off.length ? " OFF=" + mob.off.join(" | ") : ""}${errs.length ? " ERRS=" + errs.join(" | ") : ""}`);
  await context.close();
}

// detailed overflow at each width for main pages
for (const route of ["/", "/trust/security", "/trust/cookies", "/founder/roadmap", "/contact"]) {
  for (const w of viewports) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 844 } });
    const pg = await ctx.newPage();
    await pg.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle", timeout: 45000 });
    await pg.waitForTimeout(1200);
    await pg.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await pg.waitForTimeout(600);
    const ov = await pg.evaluate(() => {
      const sw = document.documentElement.scrollWidth;
      const cw = document.documentElement.clientWidth;
      const off = [];
      if (sw > cw + 1) {
        document.querySelectorAll("body *").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && (r.right > cw + 1 || r.left < -1)) {
            const cls = String(el.className).slice(0, 40);
            off.push(`${el.tagName.toLowerCase()}.${cls}`);
          }
        });
      }
      return { ov: sw - cw, off: [...new Set(off)].slice(0, 3) };
    });
    console.log(`  ${route} @${w}: overflow=${ov.ov} ${ov.off.length ? ov.off.join(" | ") : ""}`);
    await ctx.close();
  }
}

await browser.close();
