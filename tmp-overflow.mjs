import { chromium } from "playwright";

const browser = await chromium.launch();

const routes = [
  "/", "/trust", "/trust/security", "/trust/privacy", "/trust/cookies",
  "/trust/status", "/trust/transparency", "/trust/responsible-ai",
  "/founder", "/founder/roadmap", "/founder/about", "/founder/journey",
  "/products", "/products/sp-net-ai", "/products/savaro-x",
  "/contact", "/get-in-touch", "/downloads", "/docs",
  "/resources/faqs", "/portfolio-app", "/explore/products", "/company/about",
];

const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440];

const issues = [];

for (const route of routes) {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const errs = [];
    page.on("console", (msg) => {
      const t = msg.text();
      if (msg.type() === "error" || /hydrat|mismatch|update depth|Maximum|Encountered/i.test(t)) errs.push(t.slice(0, 200));
    });
    page.on("pageerror", (err) => errs.push(err.message.slice(0, 200)));
    try {
      await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle", timeout: 45000 });
    } catch { errs.push("NAV_TIMEOUT"); }
    await page.waitForTimeout(2000);
    const diag = await page.evaluate(() => {
      const out = {};
      const doc = document.documentElement;
      out.overflow = doc.scrollWidth - doc.clientWidth;
      out.offenders = [];
      if (out.overflow > 1) {
        document.querySelectorAll("body *").forEach((el) => {
          const r = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          if (r.width > 0 && (r.right > doc.clientWidth + 1 || r.left < -1) && style.position !== "fixed") {
            out.offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} L${Math.round(r.left)} R${Math.round(r.right)}`);
          }
        });
        out.offenders = out.offenders.slice(0, 6);
      }
      // check for elements with min-width or fixed width larger than viewport
      out.minWidths = [];
      document.querySelectorAll("body *").forEach((el) => {
        const cs = getComputedStyle(el);
        const mw = parseFloat(cs.minWidth);
        const w = parseFloat(cs.width);
        if (!isNaN(mw) && mw > doc.clientWidth) out.minWidths.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)} minW=${mw}`);
        if (!isNaN(w) && w > doc.clientWidth + 5 && cs.position !== "absolute" && cs.position !== "fixed") {
          const r = el.getBoundingClientRect();
          if (r.right > doc.clientWidth + 5 || r.left < -5) out.minWidths.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)} w=${w} L${Math.round(r.left)}`);
        }
      });
      out.minWidths = out.minWidths.slice(0, 5);
      return out;
    });
    if (diag.overflow > 1 || errs.length) {
      issues.push({ route, width, overflow: diag.overflow, offenders: diag.offenders?.slice(0,4), minWidths: diag.minWidths?.slice(0,3), errs: errs.slice(0,2) });
    }
    await context.close();
  }
}

console.log(`ISSUES FOUND: ${issues.length}`);
for (const i of issues) {
  console.log(`${i.route} @${i.width}px overflow=${i.overflow}${i.offenders?.length ? " offenders=" + i.offenders.join(" | ") : ""}${i.minWidths?.length ? " minW=" + i.minWidths.join(" | ") : ""}${i.errs?.length ? " ERRS=" + i.errs.join(" | ") : ""}`);
}

await browser.close();
