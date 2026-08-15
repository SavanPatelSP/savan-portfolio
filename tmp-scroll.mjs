import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
await page.goto("http://localhost:3000/trust/security", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);

// Scroll to the Responsible Disclosure section
const section = await page.evaluate(() => {
  const els = document.querySelectorAll("h2");
  for (const el of els) {
    if (el.textContent.includes("Found a vulnerability")) {
      el.scrollIntoView({ block: "start" });
      return true;
    }
  }
  return false;
});
console.log("found section:", section);
await page.waitForTimeout(1500);

const states = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("div[class*='border-l']").forEach((el) => {
    const cs = getComputedStyle(el);
    const inner = el.querySelector("h3");
    const num = el.querySelector("span[class*='font-mono']");
    out.push({
      opacity: cs.opacity,
      borderLeftColor: cs.borderLeftColor,
      numPos: num ? { l: Math.round(num.getBoundingClientRect().left), t: Math.round(num.getBoundingClientRect().top) } : null,
      elLeft: Math.round(el.getBoundingClientRect().left),
    });
  });
  // check step number alignment vs border line: compute each item's border X and number center X
  const stepNum = document.querySelectorAll("span[class*='font-mono']");
  const nums = [];
  stepNum.forEach((n) => {
    if (/0[1-9]/.test(n.textContent.trim())) {
      const r = n.getBoundingClientRect();
      nums.push({ text: n.textContent.trim(), left: Math.round(r.left), center: Math.round(r.left + r.width / 2) });
    }
  });
  return { out, nums };
});
console.log(JSON.stringify(states, null, 2));

// Now scroll to bottom to check remaining section animations
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(2000);
const zeroAfter = await page.evaluate(() => {
  const z = [];
  document.querySelectorAll("div,h1,h2,h3,p,span,li").forEach((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (parseFloat(cs.opacity) === 0 && r.height > 0 && r.top < 780 && r.bottom > 0) {
      const cls = String(el.className).slice(0, 70);
      if (!/sr-only|pointer-events|scrollbar|splash/.test(cls)) z.push(`${el.tagName.toLowerCase()}.${cls}`);
    }
  });
  return z.slice(0, 25);
});
console.log("ZERO OPACITY in viewport after scroll-to-bottom:", zeroAfter.length ? zeroAfter.join(" | ") : "(none)");

await browser.close();
