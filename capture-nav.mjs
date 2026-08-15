import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const logs = [];
page.on("console", (msg) => {
  if (msg.type() === "error" || msg.type() === "warning") {
    logs.push(`[${msg.type()}] ${msg.text().slice(0, 500)}`);
  }
});
page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message.slice(0, 500)}`));

await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);
logs.length = 0;

const targets = [
  "/trust/cookies",
  "/founder/about",
  "/products/sp-net-ai",
  "/company/about",
  "/docs/getting-started/introduction",
  "/explore/products",
  "/trust/privacy",
  "/resources/faqs",
  "/downloads/portfolio-app",
];

for (const path of targets) {
  await page.evaluate((p) => {
    window.next.router.push(p);
  }, path);
  await page.waitForTimeout(2500);
  await page.waitForLoadState("domcontentloaded").catch(() => {});
  const errs = logs.splice(0);
  console.log(`\n=== NAV → ${path} ===`);
  if (errs.length === 0) console.log("(clean)");
  for (const l of errs) console.log(l);
}

await browser.close();
