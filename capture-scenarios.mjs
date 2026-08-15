import { chromium } from "playwright";

const browser = await chromium.launch();

async function testScenario(name, makeContext, path) {
  const context = await makeContext();
  const page = await context.newPage();
  const logs = [];
  page.on("console", (msg) => {
    const text = msg.text();
    if (msg.type() === "error" || msg.type() === "warning" || /hydrat|mismatch|snapshot|update depth|Encountered|Maximum|script/i.test(text)) {
      logs.push(`[${msg.type()}] ${text.slice(0, 500)}`);
    }
  });
  page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message.slice(0, 500)}`));
  await page.goto(`http://localhost:3000${path}`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(4000);
  console.log(`\n===== ${name} ${path} =====`);
  if (logs.length === 0) console.log("(clean)");
  for (const l of logs) console.log(l);
  await context.close();
}

// 1. reduced motion
await testScenario("REDUCED-MOTION", () =>
  browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" }), "/");

// 2. localStorage pre-set
await testScenario("LOCALSTORAGE-SET", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => localStorage.setItem("cookie-consent", "accepted"));
  return ctx;
}, "/trust/cookies");

// 3. mobile viewport
await testScenario("MOBILE", () =>
  browser.newContext({ viewport: { width: 390, height: 844 } }), "/");

// 4. mobile cookies
await testScenario("MOBILE-COOKIES", () =>
  browser.newContext({ viewport: { width: 390, height: 844 } }), "/trust/cookies");

await browser.close();
