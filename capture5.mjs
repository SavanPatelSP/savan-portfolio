import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const logs = [];
page.on("console", (msg) => {
  const text = msg.text();
  if (/script|hydrat|mismatch|snapshot|update depth|Encountered/i.test(text)) {
    logs.push(`[${msg.type()}] ${text.slice(0, 400)}`);
  }
});
page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message.slice(0, 400)}`));
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
console.log(logs.join("\n---\n"));
await browser.close();
