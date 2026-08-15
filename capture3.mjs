import { chromium } from "playwright";

const browser = await chromium.launch();

async function check(name, path, opts = {}) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, ...opts });
  const page = await context.newPage();
  const logs = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      logs.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message}`));
  await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  console.log(`\n========== ${name} ${path} ==========`);
  console.log(logs.length === 0 ? "(clean)" : logs.join("\n---\n"));
  await context.close();
}

await check("normal", "/");
await check("reduced-motion", "/", { reducedMotion: "reduce" });
await check("normal", "/trust/cookies");
await check("normal", "/products/sp-net-ai");
await check("normal", "/trust/privacy");
await check("normal", "/company/about");

await browser.close();
