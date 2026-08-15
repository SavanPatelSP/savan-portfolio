import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const logs = [];
page.on("console", (msg) => {
  if (msg.type() === "error" || msg.type() === "warning") logs.push(`[${msg.type()}] ${msg.text().slice(0, 400)}`);
});
page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message.slice(0, 400)}`));
await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(4000);
console.log("=== logs ===");
for (const l of logs) console.log(l);

// Check whether page content is visible (not stuck hidden by data-loading)
const state = await page.evaluate(() => {
  const html = document.documentElement;
  const content = document.getElementById("page-content");
  const splash = document.getElementById("splash-screen");
  return {
    dataLoading: html.getAttribute("data-loading"),
    contentVisibility: content ? getComputedStyle(content).visibility : "no-content",
    contentOpacity: content ? getComputedStyle(content).opacity : "no-content",
    splashExists: !!splash,
  };
});
console.log("state:", JSON.stringify(state, null, 2));
await browser.close();
