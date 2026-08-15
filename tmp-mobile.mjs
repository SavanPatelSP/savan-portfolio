import { chromium } from "playwright";
const browser = await chromium.launch();

const routes = ["/trust/security", "/trust/cookies", "/contact", "/", "/resources/faqs"];
for (const route of routes) {
  const context = await browser.newContext({ viewport: { width: 320, height: 700 } });
  const page = await context.newPage();
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const issues = await page.evaluate(() => {
    const out = { smallTargets: [], clipped: [], edge: [] };
    const vw = document.documentElement.clientWidth;
    // touch targets: links/buttons smaller than 40x40 (interactive)
    document.querySelectorAll("a,button").forEach((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (r.width === 0 || r.height === 0) return;
      const visible = cs.visibility !== "hidden" && cs.opacity !== "0";
      if (!visible) return;
      if (el.closest("#mobile-nav")) return;
      if (el.className && String(el.className).includes("sr-only")) return;
      if (r.width < 38 || r.height < 38) {
        const label = (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 28);
        out.smallTargets.push(`${el.tagName.toLowerCase()} ${r.width}x${r.height} "${label}"`);
      }
    });
    // elements extending beyond viewport
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && (r.right > vw + 1 || r.left < -1)) {
        out.edge.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} [${Math.round(r.left)},${Math.round(r.right)}]`);
      }
    });
    return { ...out, edge: [...new Set(out.edge)].slice(0, 5), smallTargets: out.smallTargets.slice(0, 12) };
  });
  console.log(`\n===== ${route} @320 =====`);
  if (issues.smallTargets.length) { console.log("  small targets:"); issues.smallTargets.forEach((s) => console.log("    " + s)); }
  if (issues.edge.length) { console.log("  edge:"); issues.edge.forEach((s) => console.log("    " + s)); }
  if (!issues.smallTargets.length && !issues.edge.length) console.log("  (no issues)");
  await context.close();
}
await browser.close();
