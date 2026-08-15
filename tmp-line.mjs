import { chromium } from "playwright";
const browser = await chromium.launch();

for (const width of [320, 390, 768, 1280]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/trust/security", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("h2")) {
      if (el.textContent.includes("Found a vulnerability")) el.scrollIntoView({ block: "center" });
    }
  });
  await page.waitForTimeout(2200);
  const diag = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll("div[class*='relative flex gap-5']").forEach((step) => {
      const node = step.querySelector("span[class*='rounded-full']");
      const line = step.querySelector("div[class*='w-px']");
      const row = { node: null, line: null, gap: null };
      if (node) {
        const r = node.getBoundingClientRect();
        row.node = { center: Math.round(r.left + r.width / 2), top: Math.round(r.top), bottom: Math.round(r.bottom) };
      }
      if (line) {
        const r = line.getBoundingClientRect();
        const cs = getComputedStyle(line);
        row.line = { x: Math.round(r.left), top: Math.round(r.top), bottom: Math.round(r.bottom), height: Math.round(r.height), bg: cs.backgroundImage.slice(0, 60) };
      }
      out.push(row);
    });
    return out;
  });
  console.log(`\n===== ${width}px =====`);
  diag.forEach((d, i) => console.log(`  step${i + 1}: node=${JSON.stringify(d.node)} line=${JSON.stringify(d.line)}`));
  await context.close();
}
await browser.close();
