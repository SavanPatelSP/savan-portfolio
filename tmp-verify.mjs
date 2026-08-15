import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
await page.goto("http://localhost:3000/trust/security", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);

// scroll disclosure section into view
await page.evaluate(() => {
  for (const el of document.querySelectorAll("h2")) {
    if (el.textContent.includes("Found a vulnerability")) el.scrollIntoView({ block: "center" });
  }
});
await page.waitForTimeout(1500);

const diag = await page.evaluate(() => {
  const out = {};
  const line = document.querySelector("div[class*='left-[19px]']");
  const nodes = document.querySelectorAll("span[class*='rounded-full'][class*='font-mono']");
  if (line) {
    const r = line.getBoundingClientRect();
    out.line = { x: r.left, w: r.width, h: r.height, top: r.top, opacity: getComputedStyle(line).opacity };
  }
  out.nodes = [];
  nodes.forEach((n) => {
    const r = n.getBoundingClientRect();
    if (r.height > 0) {
      out.nodes.push({ text: n.textContent.trim(), center: Math.round(r.left + r.width / 2), top: Math.round(r.top), opacity: getComputedStyle(n).opacity });
    }
  });
  out.overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  return out;
});
console.log(JSON.stringify(diag, null, 2));

// mobile check
const mcontext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mpage = await mcontext.newPage();
await mpage.goto("http://localhost:3000/trust/security", { waitUntil: "networkidle", timeout: 60000 });
await mpage.waitForTimeout(2000);
await mpage.evaluate(() => {
  for (const el of document.querySelectorAll("h2")) {
    if (el.textContent.includes("Found a vulnerability")) el.scrollIntoView({ block: "center" });
  }
});
await mpage.waitForTimeout(1200);
const mdiag = await mpage.evaluate(() => {
  const out = { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  const line = document.querySelector("div[class*='left-[19px]']");
  if (line) {
    const r = line.getBoundingClientRect();
    out.line = { x: r.left, h: r.height, opacity: getComputedStyle(line).opacity };
  }
  const nodes = document.querySelectorAll("span[class*='rounded-full'][class*='font-mono']");
  out.nodes = [];
  nodes.forEach((n) => {
    const r = n.getBoundingClientRect();
    if (r.height > 0) out.nodes.push({ text: n.textContent.trim(), center: Math.round(r.left + r.width / 2), opacity: getComputedStyle(n).opacity });
  });
  // any horizontal overflow from content?
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > document.documentElement.clientWidth + 1) {
      out.bad = (out.bad || []).concat(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)} R${Math.round(r.right)}`);
    }
  });
  if (out.bad) out.bad = out.bad.slice(0, 5);
  return out;
});
console.log("\nMOBILE:", JSON.stringify(mdiag, null, 2));
await mcontext.close();
await browser.close();
