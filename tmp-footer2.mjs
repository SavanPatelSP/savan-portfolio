import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(800);

const diag = await page.evaluate(() => {
  const grid = document.querySelector("footer nav div[class*='grid']");
  const cs = getComputedStyle(grid);
  const gcs = getComputedStyle(grid.parentElement);
  const out = {
    gridDisplay: cs.display,
    gridCols: cs.gridTemplateColumns,
    gridWidth: Math.round(grid.getBoundingClientRect().width),
    parentWidth: Math.round(grid.parentElement.getBoundingClientRect().width),
    parentDisplay: gcs.display,
  };
  const first = grid.querySelector(":scope > div");
  const fcs = getComputedStyle(first);
  out.firstItem = {
    width: fcs.width,
    minWidth: fcs.minWidth,
    maxWidth: fcs.maxWidth,
    cls: String(first.className),
    rect: { w: Math.round(first.getBoundingClientRect().width), h: Math.round(first.getBoundingClientRect().height) },
  };
  return out;
});
console.log(JSON.stringify(diag, null, 2));
await browser.close();
