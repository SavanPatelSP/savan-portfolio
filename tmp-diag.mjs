import { chromium } from "playwright";

const browser = await chromium.launch();

async function diagnose(path, width, height) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  const logs = [];
  page.on("console", (msg) => {
    const t = msg.text();
    if (msg.type() === "error" || /hydrat|mismatch|snapshot|update depth|Maximum|Encountered/i.test(t)) {
      logs.push(`[${msg.type()}] ${t.slice(0, 300)}`);
    }
  });
  page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message.slice(0, 300)}`));
  await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(3500);

  const data = await page.evaluate(() => {
    const out = {};
    const scrollW = document.documentElement.scrollWidth;
    const clientW = document.documentElement.clientWidth;
    out.viewport = clientW;
    out.horizontalOverflow = scrollW - clientW;
    if (scrollW > clientW + 1) {
      // find elements causing overflow
      const offenders = [];
      document.querySelectorAll("body *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > clientW + 1 || r.left < -1) {
          const cls = typeof el.className === "string" ? el.className.slice(0, 80) : "";
          const tag = el.tagName.toLowerCase();
          offenders.push(`${tag}.${cls} l=${Math.round(r.left)} r=${Math.round(r.right)}`);
        }
      });
      out.offenders = offenders.slice(0, 15);
    }
    // body font
    out.bodyFont = getComputedStyle(document.body).fontFamily.slice(0, 120);
    // connectors / border-l elements with step numbers in security page
    out.steps = [];
    document.querySelectorAll("[class*='border-l']").forEach((el) => {
      const cs = getComputedStyle(el);
      out.steps.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).slice(0, 90),
        borderLeft: cs.borderLeftWidth + " " + cs.borderLeftStyle + " " + cs.borderLeftColor,
        opacity: cs.opacity,
        rect: { l: Math.round(el.getBoundingClientRect().left), t: Math.round(el.getBoundingClientRect().top), w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height) },
      });
    });
    // motion elements that may be stuck at opacity 0
    out.zeroOpacity = [];
    document.querySelectorAll("div,h1,h2,h3,p,span,li").forEach((el) => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.opacity) === 0 && cs.visibility !== "hidden" && el.getBoundingClientRect().height > 0) {
        const cls = String(el.className).slice(0, 70);
        out.zeroOpacity.push(`${el.tagName.toLowerCase()}.${cls}`);
      }
    });
    out.zeroOpacity = out.zeroOpacity.slice(0, 20);
    // cookies page font audit
    out.interFonts = [];
    document.querySelectorAll("*").forEach((el) => {
      const f = getComputedStyle(el).fontFamily;
      if (/Inter/i.test(f)) {
        const cls = String(el.className).slice(0, 60);
        const t = (el.textContent || "").trim().slice(0, 40);
        out.interFonts.push(`${el.tagName.toLowerCase()}.${cls} "${t}"`);
      }
    });
    out.interFonts = out.interFonts.slice(0, 15);
    return out;
  });

  console.log(`\n===== ${path} @${width}x${height} =====`);
  if (logs.length) console.log("LOGS:\n" + logs.join("\n"));
  console.log("viewport:", data.viewport, "overflowPx:", data.horizontalOverflow);
  if (data.offenders) { console.log("OFFENDERS:"); data.offenders.forEach((o) => console.log("  " + o)); }
  console.log("bodyFont:", data.bodyFont);
  if (data.steps?.length) { console.log("border-l elements:"); data.steps.forEach((s) => console.log("  " + JSON.stringify(s))); }
  if (data.zeroOpacity?.length) { console.log("ZERO OPACITY:", data.zeroOpacity.join(" | ")); }
  if (data.interFonts?.length) { console.log("INTER FONTS:", data.interFonts.join(" | ")); }
  await context.close();
}

// security connector deep-dive
await diagnose("/trust/security", 1280, 800);
await diagnose("/trust/security", 390, 844);
await diagnose("/trust/cookies", 1280, 800);
await diagnose("/trust/cookies", 390, 844);

await browser.close();
