import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
await context.addInitScript(() => localStorage.setItem("cookie-consent", "accepted"));
const page = await context.newPage();
const errs = [];
page.on("console", (msg) => {
  const t = msg.text();
  if (/hydrat|mismatch|snapshot|update depth|Maximum|Encountered|error/i.test(t)) errs.push(`[${msg.type()}] ${t.slice(0, 300)}`);
});
page.on("pageerror", (err) => errs.push(`[pageerror] ${err.message.slice(0, 300)}`));
await page.goto("http://localhost:3000/trust/cookies", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);

// scroll inspector into view
await page.evaluate(() => {
  for (const el of document.querySelectorAll("h2")) {
    if (el.textContent.includes("Inspect what")) el.scrollIntoView({ block: "center" });
  }
});
await page.waitForTimeout(1200);

const state = await page.evaluate(() => {
  const rows = [...document.querySelectorAll("div.flex.items-center.justify-between")].map((r) => r.textContent.trim());
  return rows.filter((t) => /Key|Value|Size|Location/.test(t));
});
console.log("inspector rows:", JSON.stringify(state, null, 2));
console.log("errors:", errs.length ? errs.join("\n") : "(clean)");

// test reset button
const resetBtn = page.getByLabel("Clear stored preference");
if (await resetBtn.count()) {
  await resetBtn.click();
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => localStorage.getItem("cookie-consent"));
  console.log("after reset, localStorage:", after);
}

await browser.close();
