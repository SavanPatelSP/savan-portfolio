import { chromium } from "playwright";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(800);
const v = await page.evaluate(() => {
  const grid = document.querySelector("footer nav div[class*='grid']");
  const first = grid.querySelector(":scope > div");
  let rule = null;
  for (const sheet of document.styleSheets) {
    try {
      for (const r of sheet.cssRules) {
        if (r.selectorText && r.selectorText.includes("lg:w-") && r.cssText.includes("calc(33.333")) {
          rule = r.cssText.slice(0, 200);
        }
      }
    } catch {}
  }
  return {
    computedWidth: getComputedStyle(first).width,
    computedMinWidth: getComputedStyle(first).minWidth,
    rule,
    inlineWidth: first.style.width,
  };
});
console.log(JSON.stringify(v, null, 2));
await browser.close();
