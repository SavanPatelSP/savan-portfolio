import { chromium } from "playwright";

const pages = ["/", "/trust/cookies", "/products/sp-net-ai", "/trust/privacy", "/company/about", "/founder/about", "/docs"];

const browser = await chromium.launch();
for (const path of pages) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const logs = [];
  page.on("console", (msg) => {
    const loc = msg.location();
    logs.push(`[${msg.type()}] ${msg.text().slice(0, 600)} ${loc.url ? "@" + loc.url.replace("http://localhost:3000", "") + ":" + loc.lineNumber : ""}`);
  });
  page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message.slice(0, 600)}`));
  page.on("requestfailed", (req) => logs.push(`[requestfailed] ${req.url()} ${req.failure()?.errorText}`));
  await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(3000);
  console.log(`\n========== ${path} ==========`);
  if (logs.length === 0) console.log("(no console messages)");
  for (const l of logs) console.log(l);
  await context.close();
}
await browser.close();
