import { chromium } from "playwright";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

const pages = ["/trust/cookies", "/trust/security", "/trust/privacy", "/"];
for (const route of pages) {
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  const data = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll("h1,h2,h3").forEach((el, i) => {
      if (i > 8) return;
      const cs = getComputedStyle(el);
      out.push({
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || "").trim().slice(0, 42),
        font: cs.fontFamily.split(",")[0].trim(),
        size: cs.fontSize,
        weight: cs.fontWeight,
        lh: cs.lineHeight,
        ls: cs.letterSpacing,
      });
    });
    const p = document.querySelector("main p");
    const pcs = p ? getComputedStyle(p) : null;
    return { headings: out, bodyP: pcs ? { font: pcs.fontFamily.split(",")[0].trim(), size: pcs.fontSize, color: pcs.color } : null };
  });
  console.log(`\n===== ${route} =====`);
  data.headings.forEach((h) => console.log(`  ${h.tag} ${h.size} w${h.weight} ${h.font} "${h.text}"`));
  console.log("  bodyP:", JSON.stringify(data.bodyP));
}
await browser.close();
