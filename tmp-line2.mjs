import { chromium } from "playwright";
const browser = await chromium.launch();

for (const width of [320, 768, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 844 } });
  const page = await context.newPage();
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error" || /hydrat|mismatch|snapshot|depth/i.test(m.text())) errs.push(m.text().slice(0, 120)); });
  page.on("pageerror", (e) => errs.push(e.message.slice(0, 120)));
  await page.goto("http://localhost:3000/trust/security", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  await page.evaluate(async () => {
    for (let y = document.body.scrollHeight; y > 0; y -= window.innerHeight * 0.7) {
      window.scrollTo(0, Math.max(0, y - window.innerHeight * 0.7));
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);

  const diag = await page.evaluate(() => {
    const out = { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth };
    const steps = [];
    document.querySelectorAll("div[class*='relative flex gap-5']").forEach((step, i) => {
      const node = step.querySelector("span[class*='rounded-full']");
      const line = step.querySelector("div[class*='w-px']");
      if (!node) return;
      const nr = node.getBoundingClientRect();
      const item = { i, nodeTop: Math.round(nr.top), nodeBottom: Math.round(nr.bottom), nodeOpacity: getComputedStyle(node).opacity };
      if (line) {
        const lr = line.getBoundingClientRect();
        item.lineTop = Math.round(lr.top);
        item.lineBottom = Math.round(lr.bottom);
      }
      steps.push(item);
    });
    out.steps = steps;
    return out;
  });
  console.log(`\n===== ${width}px (overflow=${diag.overflow}) =====`);
  diag.steps.forEach((s) => {
    const lineOk = s.lineTop === undefined ? "last" : `line ${s.lineTop}-${s.lineBottom} nodeBottom=${s.nodeBottom} gap=${s.lineTop - s.nodeBottom}`;
    console.log(`  step${s.i}: node ${s.nodeTop}-${s.nodeBottom} (opacity ${s.nodeOpacity}) ${lineOk}`);
  });
  console.log(errs.length ? "ERRS: " + errs.join(" | ") : "no errors");
  await context.close();
}
await browser.close();
