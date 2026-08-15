import { chromium } from "playwright";

const browser = await chromium.launch();

// 1. Normal-motion animation firing check across routes
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const routes = ["/", "/trust/security", "/trust/cookies", "/trust/privacy", "/trust", "/founder/roadmap", "/products", "/contact", "/get-in-touch", "/docs", "/portfolio-app", "/explore/products"];
for (const route of routes) {
  const page = await context.newPage();
  const errs = [];
  page.on("console", (msg) => {
    const t = msg.text();
    if (msg.type() === "error" || /hydrat|mismatch|snapshot|update depth|Maximum|Encountered/i.test(t)) errs.push(t.slice(0, 150));
  });
  page.on("pageerror", (err) => errs.push(err.message.slice(0, 150)));
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
  // scroll back up through middle to trigger all inView
  await page.evaluate(async () => {
    for (let y = document.body.scrollHeight; y > 0; y -= window.innerHeight * 0.8) {
      window.scrollTo(0, Math.max(0, y - window.innerHeight * 0.8));
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  const stuck = await page.evaluate(() => {
    const z = [];
    document.querySelectorAll("div,h1,h2,h3,p,span,li,button,a").forEach((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (parseFloat(cs.opacity) === 0 && r.height > 0 && r.top < 880 && r.bottom > 0 && r.top > 0) {
        const cls = String(el.className).slice(0, 55);
        if (!/sr-only|pointer-events|scrollbar|splash|hidden|group-hover/.test(cls)) z.push(`${el.tagName.toLowerCase()}.${cls}`);
      }
    });
    return z.slice(0, 8);
  });
  console.log(`${route}: stuck=${stuck.length ? stuck.join(" | ") : "(none)"}${errs.length ? " ERRS=" + errs.join(" | ") : ""}`);
  await page.close();
}

// 2. Mobile nav test at 320
const m = await browser.newContext({ viewport: { width: 320, height: 800 } });
const mp = await m.newPage();
await mp.goto("http://localhost:3000/trust/security", { waitUntil: "networkidle", timeout: 60000 });
await mp.waitForTimeout(1500);
await mp.getByLabel("Open navigation menu").click();
await mp.waitForTimeout(800);
const nav = await mp.evaluate(() => {
  const menu = document.getElementById("mobile-nav");
  const cs = menu ? getComputedStyle(menu) : null;
  return {
    visible: cs ? cs.visibility : "none",
    opacity: cs ? cs.opacity : "none",
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    links: menu ? menu.querySelectorAll("a").length : 0,
  };
});
console.log("MOBILE NAV @320:", JSON.stringify(nav));
// close via close button
await mp.getByLabel("Close navigation menu").click();
await mp.waitForTimeout(500);
const closed = await mp.evaluate(() => getComputedStyle(document.getElementById("mobile-nav")).visibility);
console.log("nav closed:", closed);

await browser.close();
