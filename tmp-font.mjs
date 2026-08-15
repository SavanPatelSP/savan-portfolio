import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
await page.goto("http://localhost:3000/trust/cookies", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);

// scroll to content section so animations fire
await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(1200);

const data = await page.evaluate(() => {
  const out = [];
  const targets = [
    ".font-\\['Inter\\']",
  ];
  const check = (el, reason) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.height === 0) return;
    out.push({
      reason,
      tag: el.tagName.toLowerCase(),
      text: (el.textContent || "").trim().slice(0, 50),
      fontFamily: cs.fontFamily.slice(0, 90),
      fontWeight: cs.fontWeight,
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      color: cs.color,
    });
  };
  document.querySelectorAll("*").forEach((el) => {
    if (el.className && String(el.className).includes("font-['Inter']")) check(el, "has-font-Inter-class");
  });
  // sample common headings to compare
  document.querySelectorAll("h2,h3").forEach((el) => {
    const f = getComputedStyle(el).fontFamily;
    if (f.includes("Inter") && !f.includes("Geist")) check(el, "heading-resolves-Inter");
  });
  return out.slice(0, 25);
});
console.log(JSON.stringify(data, null, 2));

// compare with security page heading font
await page.goto("http://localhost:3000/trust/security", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);
const sec = await page.evaluate(() => {
  const h2 = document.querySelector("h2");
  const cs = getComputedStyle(h2);
  return { text: h2.textContent.trim().slice(0, 40), fontFamily: cs.fontFamily.slice(0, 90), fontSize: cs.fontSize, fontWeight: cs.fontWeight };
});
console.log("SECURITY h2:", JSON.stringify(sec));

await browser.close();
