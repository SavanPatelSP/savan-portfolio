import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "./tmp-shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

const viewports = [
  { name: "320", width: 320, height: 800 },
  { name: "375", width: 375, height: 812 },
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1440", width: 1440, height: 900 },
];

const routes = ["/", "/trust/security", "/trust/cookies", "/trust", "/founder/roadmap"];

const logs = [];

for (const route of routes) {
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    const pageLogs = [];
    page.on("console", (msg) => {
      const t = msg.text();
      if (msg.type() === "error" || /hydrat|mismatch|snapshot|update depth|Maximum|Encountered|script/i.test(t)) {
        pageLogs.push(`[${msg.type()}] ${t.slice(0, 300)}`);
      }
    });
    page.on("pageerror", (err) => pageLogs.push(`[pageerror] ${err.message.slice(0, 300)}`));
    await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle", timeout: 60000 }).catch((e) => pageLogs.push(`[nav-error] ${e.message.slice(0, 200)}`));
    await page.waitForTimeout(3500);
    const fname = `${OUT}${route.replace(/\//g, "_") || "_home"}_${vp.name}.png`;
    await page.screenshot({ path: fname, fullPage: true }).catch(() => {});
    if (pageLogs.length) logs.push(`${route} @${vp.width}x${vp.height}:\n  ${pageLogs.join("\n  ")}`);
    await context.close();
  }
}

if (logs.length === 0) console.log("(no console errors detected)");
else console.log(logs.join("\n"));

await browser.close();
console.log("done");
