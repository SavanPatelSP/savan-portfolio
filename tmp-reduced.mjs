import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });

const routes = ["/", "/trust/security", "/trust/cookies", "/trust/privacy", "/founder/roadmap"];

for (const route of routes) {
  const page = await context.newPage();
  const errs = [];
  page.on("console", (msg) => {
    const t = msg.text();
    if (msg.type() === "error" || /hydrat|mismatch|snapshot|update depth|Maximum|Encountered/i.test(t)) errs.push(`[${msg.type()}] ${t.slice(0, 200)}`);
  });
  page.on("pageerror", (err) => errs.push(err.message.slice(0, 200)));
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  const diag = await page.evaluate(() => {
    const stuck = [];
    document.querySelectorAll("div,h1,h2,h3,p,span,li,button").forEach((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (parseFloat(cs.opacity) === 0 && r.height > 0 && r.top < 880 && r.bottom > 0) {
        const cls = String(el.className).slice(0, 60);
        if (!/sr-only|pointer-events|scrollbar|splash|hidden|animate-ping/.test(cls)) {
          stuck.push(`${el.tagName.toLowerCase()}.${cls}`);
        }
      }
    });
    return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, stuck: stuck.slice(0, 10) };
  });
  console.log(`${route}: overflow=${diag.overflow} stuck=${diag.stuck.length ? diag.stuck.join(" | ") : "(none)"}`);
  if (errs.length) console.log("  ERRS:", errs.join(" | "));
  await page.close();
}

await browser.close();
