import { chromium } from "playwright";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
await page.goto("http://localhost:3000/trust/security", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1200);
await page.evaluate(() => {
  for (const el of document.querySelectorAll("h2")) {
    if (el.textContent.includes("Found a vulnerability")) el.scrollIntoView({ block: "center" });
  }
});
for (const ms of [100, 400, 900, 2000]) {
  await page.waitForTimeout(ms);
  const t = await page.evaluate(() => {
    const line = Array.from(document.querySelectorAll("div[class*='left-[']")).find((el) => {
      const cs = getComputedStyle(el);
      return cs.position === "absolute" && (el.className + "").includes("w-px");
    });
    const cs = line ? getComputedStyle(line) : null;
    return { transform: cs?.transform, opacity: cs?.opacity };
  });
  console.log(`after ${ms}ms more:`, JSON.stringify(t));
}
await browser.close();
