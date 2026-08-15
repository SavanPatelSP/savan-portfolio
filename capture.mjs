import { chromium } from "playwright";

const pages = ["/", "/trust/cookies", "/products/sp-net-ai", "/trust/privacy", "/company/about"];

const browser = await chromium.launch();
for (const path of pages) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const logs = [];
  page.on("console", (msg) => {
    const t = msg.type();
    if (t === "error" || t === "warning") {
      logs.push(`[${t}] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message}`));
  await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  console.log(`\n========== ${path} ==========`);
  if (logs.length === 0) console.log("(no console errors/warnings)");
  for (const l of logs) console.log(l);
  await context.close();
}

// Now test client-side navigation which triggers RSC re-render of scripts
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const logs = [];
  page.on("console", (msg) => {
    const t = msg.type();
    if (t === "error" || t === "warning") {
      logs.push(`[${t}] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message}`));
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  logs.length = 0;
  await page.click('a[href="/trust/cookies"]');
  await page.waitForTimeout(2500);
  console.log(`\n========== CLIENT-NAV → /trust/cookies ==========`);
  if (logs.length === 0) console.log("(no console errors/warnings)");
  for (const l of logs) console.log(l);
  await context.close();
}
await browser.close();
