import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const logs = [];
page.on("console", (msg) => {
  if (msg.type() === "error" || msg.type() === "warning") {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  }
});
page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message}`));
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
logs.length = 0;
await page.click('a[href="/trust/cookies"]');
await page.waitForTimeout(2500);
console.log("=== CLIENT-NAV → /trust/cookies ===");
console.log(logs.length === 0 ? "(clean)" : logs.join("\n---\n"));

logs.length = 0;
await page.click('a[href="/"]');  // Footer link "Savan's Portfolio"
await page.waitForTimeout(2500);
console.log("=== CLIENT-NAV → / ===");
console.log(logs.length === 0 ? "(clean)" : logs.join("\n---\n"));

await browser.close();
