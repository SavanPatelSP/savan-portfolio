import { chromium } from "playwright";
const browser = await chromium.launch();
for (const width of [320, 768, 1280]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/products/sp-net-blockchain", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("h2")) {
      if (el.textContent.includes("platform roadmap")) el.scrollIntoView({ block: "center" });
    }
  });
  await page.waitForTimeout(2500);
  const diag = await page.evaluate(() => {
    const line = Array.from(document.querySelectorAll("div[class*='absolute']")).find((el) => {
      const cs = getComputedStyle(el);
      return cs.position === "absolute" && (el.className + "").includes("w-px") && (el.className + "").includes("purple");
    });
    const out = { width: innerWidth, line: null, nodes: [] };
    if (line) {
      const r = line.getBoundingClientRect();
      out.line = { x: Math.round(r.left), top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height), bg: getComputedStyle(line).backgroundImage.slice(0, 50) };
    }
    document.querySelectorAll("div[class*='rounded-full border-purple']").forEach((n) => {
      const r = n.getBoundingClientRect();
      if (r.height > 0) out.nodes.push({ center: Math.round(r.left + r.width / 2), top: Math.round(r.top), bottom: Math.round(r.bottom) });
    });
    return out;
  });
  console.log(`\n===== ${width}px =====`);
  console.log("  line:", JSON.stringify(diag.line));
  diag.nodes.forEach((n, i) => console.log(`  node${i}: center=${n.center} top=${n.top} bottom=${n.bottom}`));
  await context.close();
}
await browser.close();
