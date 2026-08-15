import { chromium } from "playwright";

const browser = await chromium.launch();

for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 800 } });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/trust/security", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);

  await page.evaluate(() => {
    for (const el of document.querySelectorAll("h2")) {
      if (el.textContent.includes("Found a vulnerability")) el.scrollIntoView({ block: "center" });
    }
  });
  await page.waitForTimeout(1200);

  const diag = await page.evaluate(() => {
    const out = { width: innerWidth };
    const lines = document.querySelectorAll("div[class*='left-[']");
    const line = Array.from(lines).find((el) => {
      const cs = getComputedStyle(el);
      return cs.position === "absolute" && (el.className + "").includes("w-px");
    });
    if (line) {
      const r = line.getBoundingClientRect();
      const cs = getComputedStyle(line);
      out.line = {
        x: Math.round(r.left),
        y: Math.round(r.top),
        w: Math.round(r.width),
        h: Math.round(r.height),
        opacity: cs.opacity,
        transform: cs.transform,
        backgroundImage: cs.backgroundImage.slice(0, 120),
        display: cs.display,
        visibility: cs.visibility,
      };
    }
    // nodes
    const nodes = [];
    document.querySelectorAll("div[class*='relative flex gap-5']").forEach((el) => {
      const span = el.querySelector("span[class*='rounded-full']");
      if (span) {
        const r = span.getBoundingClientRect();
        nodes.push({ text: span.textContent.trim(), center: Math.round(r.left + r.width / 2), top: Math.round(r.top), opacity: getComputedStyle(span).opacity });
      }
    });
    out.nodes = nodes;
    // parent container rect
    const container = line ? line.parentElement : null;
    if (container) {
      const r = container.getBoundingClientRect();
      out.container = { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), height: Math.round(r.height) };
    }
    return out;
  });
  console.log(`\n===== ${width}px =====`);
  console.log(JSON.stringify(diag, null, 2));
  await context.close();
}

await browser.close();
