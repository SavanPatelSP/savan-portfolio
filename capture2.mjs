import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const logs = [];
page.on("console", (msg) => {
  if (msg.type() === "error") logs.push(msg.text());
});
page.on("pageerror", (err) => logs.push("[pageerror] " + err.message));
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
console.log("=== HOMEPAGE full console ===");
console.log(logs.join("\n---\n"));
await browser.close();
