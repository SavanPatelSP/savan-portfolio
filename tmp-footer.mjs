import { chromium } from "playwright";

const browser = await chromium.launch();

for (const width of [1280, 1024, 768, 390]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  const diag = await page.evaluate(() => {
    const groups = [...document.querySelectorAll("footer nav div[class*='grid'] > div")];
    const out = [];
    groups.forEach((g) => {
      const r = g.getBoundingClientRect();
      const cs = getComputedStyle(g);
      out.push({
        title: g.querySelector("h4")?.textContent?.slice(0, 15),
        left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width),
        width: cs.width,
      });
    });
    // detect overlapping columns (same row, overlapping x ranges)
    const overlaps = [];
    for (let i = 0; i < out.length; i++) {
      for (let j = i + 1; j < out.length; j++) {
        if (Math.abs(out[i].top_y || 0) < 5) continue;
      }
    }
    return { out, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  console.log(`\n=== FOOTER @${width} ===`);
  console.log("overflow:", diag.overflow);
  diag.out.forEach((o) => console.log(`  ${o.title}: L${o.left} R${o.right} w=${o.width}`));
  await context.close();
}
await browser.close();
