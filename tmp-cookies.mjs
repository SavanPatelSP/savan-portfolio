import { chromium } from "playwright";

const browser = await chromium.launch();

async function check(width, height) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  const errs = [];
  page.on("console", (msg) => {
    const t = msg.text();
    if (msg.type() === "error" || /hydrat|mismatch|snapshot|update depth|Maximum|Encountered/i.test(t)) errs.push(t.slice(0, 200));
  });
  page.on("pageerror", (err) => errs.push(err.message.slice(0, 200)));
  await page.goto("http://localhost:3000/trust/cookies", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);

  const diag = await page.evaluate(() => {
    const out = { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth };
    const inter = [];
    document.querySelectorAll("h2,h3,p,span,button").forEach((el) => {
      const f = getComputedStyle(el).fontFamily;
      if (/^Inter$/i.test(f.trim().split(",")[0]) && !f.includes("Geist")) {
        inter.push(`${el.tagName}.${(el.textContent || "").trim().slice(0, 30)}`);
      }
    });
    out.interFonts = inter.slice(0, 8);
    const h2 = document.querySelector("h2");
    if (h2) out.firstH2Font = getComputedStyle(h2).fontFamily.slice(0, 60);
    out.sections = [...document.querySelectorAll("section")].length;
    // check storage inspector present
    out.hasInspector = !!document.body.textContent.includes("Storage Inspector");
    out.hasFlow = !!document.body.textContent.includes("How It Works");
    // check FAQ accordion present (shared component styling = border-b rows)
    out.faqRows = document.querySelectorAll("button[id^='faq-button']").length;
    return out;
  });
  console.log(`${width}x${height}:`, JSON.stringify(diag));
  if (errs.length) console.log("  ERRS:", errs.join(" | "));
  await context.close();
}

await check(1280, 900);
await check(390, 844);
await check(320, 800);

await browser.close();
