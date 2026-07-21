const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, 'public', 'screenshots', 'portfolio-app');
const BASE_URL = 'http://localhost:3000';

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  laptop:  { width: 1280, height: 800 },
  tablet:  { width: 768,  height: 1024 },
  phone:   { width: 390,  height: 844 },
};

// Each entry: name, url, device, expectedTitle substring
// Screens capture REAL APPLICATION content via /app-preview routes
// which render the ApplicationPreview component in isolation (no marketing wrapper)
const PAGES = [
  { name: 'dashboard',      url: '/app-preview/dashboard',      device: 'desktop', expectedTitle: 'app preview' },
  { name: 'products',       url: '/app-preview/products',       device: 'desktop', expectedTitle: 'app preview' },
  { name: 'downloads',      url: '/app-preview/downloads',      device: 'desktop', expectedTitle: 'app preview' },
  { name: 'documentation',  url: '/app-preview/documentation',  device: 'desktop', expectedTitle: 'app preview' },
  { name: 'projects',       url: '/app-preview/projects',       device: 'desktop', expectedTitle: 'app preview' },
  { name: 'offline',        url: '/app-preview/offline',         device: 'laptop',  expectedTitle: 'app preview' },
  { name: 'settings',       url: '/app-preview/settings',        device: 'desktop', expectedTitle: 'app preview' },
];

// ─── VALIDATED SCREEN CONTENT ──────────────────────────────────
// Each screen MUST contain expected visual elements before capture.
// If validation fails, the screenshot is ABORTED (never saved).

const SCREEN_VALIDATORS = {
  dashboard: async (page) => {
    // Must show stat cards, projects table, or activity feed
    const hasContent = await page.evaluate(() => {
      const text = document.body.innerText.toLowerCase();
      return text.includes('project') || text.includes('download') || text.includes('active');
    });
    return hasContent ? null : 'Dashboard content not visible';
  },
  products: async (page) => {
    const hasContent = await page.evaluate(() => {
      const text = document.body.innerText.toLowerCase();
      return text.includes('project') || text.includes('product') || text.includes('platform');
    });
    return hasContent ? null : 'Products content not visible';
  },
  downloads: async (page) => {
    const hasContent = await page.evaluate(() => {
      const text = document.body.innerText.toLowerCase();
      return text.includes('download') || text.includes('version') || text.includes('platform');
    });
    return hasContent ? null : 'Downloads content not visible';
  },
  documentation: async (page) => {
    const hasContent = await page.evaluate(() => {
      const text = document.body.innerText.toLowerCase();
      return text.includes('documentation') || text.includes('guide') || text.includes('install') || text.includes('getting started');
    });
    return hasContent ? null : 'Documentation content not visible';
  },
  projects: async (page) => {
    const hasContent = await page.evaluate(() => {
      const text = document.body.innerText.toLowerCase();
      return text.includes('project') || text.includes('active') || text.includes('published');
    });
    return hasContent ? null : 'Projects content not visible';
  },
  offline: async (page) => {
    const hasContent = await page.evaluate(() => {
      const text = document.body.innerText.toLowerCase();
      return text.includes('offline') || text.includes('cached') || text.includes('sync');
    });
    return hasContent ? null : 'Offline content not visible';
  },
  settings: async (page) => {
    const hasContent = await page.evaluate(() => {
      const text = document.body.innerText.toLowerCase();
      return text.includes('setting') || text.includes('appearance') || text.includes('theme');
    });
    return hasContent ? null : 'Settings content not visible';
  },
};

// ─── GLOBAL SCREENSHOT VALIDATION ──────────────────────────────
// Checks that apply to ALL screenshots before saving

function validateScreenshot(filePath) {
  const errors = [];

  // Check file exists and has reasonable size
  if (!fs.existsSync(filePath)) {
    errors.push('File does not exist');
    return errors;
  }
  const stats = fs.statSync(filePath);
  if (stats.size < 5000) {
    errors.push(`File too small (${stats.size} bytes) — likely blank or broken`);
  }

  return errors;
}

// ─── OVERLAY DISMISSAL ───────────────────────────────────────────

async function dismissOverlays(page) {
  await page.evaluate(() => {
    document.querySelectorAll('[class*="SplashScreen"], [class*="SplashWrapper"], [class*="splash"]').forEach(el => el.remove());
    document.querySelectorAll('[class*="CookieConsent"], [class*="cookie-consent"], [class*="cookieConsent"]').forEach(el => el.remove());
    document.querySelectorAll('[role="dialog"][aria-modal="true"]').forEach(el => {
      if (el.textContent?.includes('cookie') || el.textContent?.includes('Cookie') ||
          el.textContent?.includes('privacy') || el.textContent?.includes('Privacy') ||
          el.textContent?.includes('consent') || el.textContent?.includes('Consent')) {
        el.remove();
      }
    });
    document.querySelectorAll('[class*="InstallPrompt"], [class*="install-prompt"]').forEach(el => el.remove());
    document.querySelectorAll('[class*="InstallModal"], [class*="install-modal"]').forEach(el => el.remove());
    document.querySelectorAll('[role="dialog"][aria-modal="true"]').forEach(el => el.remove());
    document.querySelectorAll('*').forEach(el => {
      const style = getComputedStyle(el);
      const zIndex = parseInt(style.zIndex || '0', 10);
      const position = style.position;
      if ((position === 'fixed' || position === 'absolute') && zIndex > 40) {
        const tag = el.tagName.toLowerCase();
        if (tag === 'nav' || tag === 'header') return;
        if (el.closest('nav') || el.closest('header')) return;
        if (el.id === '__next') return;
        el.remove();
      }
    });
  });
}

// ─── WAIT FOR SETTLE ─────────────────────────────────────────────

async function waitForSettle(page, extraWait = 2000) {
  try {
    await page.waitForLoadState('networkidle', { timeout: 10000 });
  } catch (e) {}
  await page.waitForTimeout(extraWait);
}

// ─── ABORT CHECK ─────────────────────────────────────────────────
// Determines if a screenshot should be ABORTED (never saved)

function shouldAbort(bodyText) {
  const lower = bodyText.toLowerCase();
  if (lower.includes('404') && lower.includes('not found')) return 'Page shows 404 content';
  if (lower.includes('something went wrong')) return 'Page shows error boundary';
  if (lower.includes('not found')) return 'Page shows not-found content';
  if (lower.includes('loading...')) return 'Page shows loading state';
  return null;
}

// ─── MAIN ────────────────────────────────────────────────────────

async function captureScreenshots() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });

  for (const device of Object.keys(VIEWPORTS)) {
    const dir = path.join(SCREENSHOT_DIR, device);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  const results = [];

  for (const pageConfig of PAGES) {
    const vp = VIEWPORTS[pageConfig.device];
    const filename = `${pageConfig.name}.png`;
    const filepath = path.join(SCREENSHOT_DIR, pageConfig.device, filename);

    console.log(`\n[${pageConfig.device.toUpperCase()}] ${pageConfig.name}`);
    console.log(`  URL: ${pageConfig.url}`);
    console.log(`  Viewport: ${vp.width}x${vp.height}`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    });

    const page = await context.newPage();

    try {
      const response = await page.goto(`${BASE_URL}${pageConfig.url}`, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });

      if (response && response.status() >= 400) {
        throw new Error(`HTTP ${response.status()} — aborting`);
      }

      // Wait for SplashScreen to auto-dismiss + React hydration
      await page.waitForTimeout(4000);
      await waitForSettle(page, 1500);

      // Dismiss all overlays
      await dismissOverlays(page);
      await page.waitForTimeout(500);
      await dismissOverlays(page);
      await page.waitForTimeout(300);

      // Global abort check
      const bodyText = await page.evaluate(() => document.body?.innerText || '');
      const abortReason = shouldAbort(bodyText);
      if (abortReason) {
        throw new Error(`${abortReason} — aborting (screenshot will NOT be saved)`);
      }

      // Page title validation
      const title = await page.title();
      const titleLower = (title || '').toLowerCase();
      if (titleLower.includes('404') || titleLower.includes('not found')) {
        throw new Error(`Page title indicates error: "${title}" — aborting`);
      }

      // DOM element count check
      const childCount = await page.evaluate(() => document.body?.querySelectorAll('*').length || 0);
      if (childCount < 10) {
        throw new Error(`Page has only ${childCount} DOM elements — likely loading — aborting`);
      }

      // Expected title check
      if (pageConfig.expectedTitle && !titleLower.includes(pageConfig.expectedTitle.toLowerCase())) {
        console.log(`  ⚠ Title "${title}" doesn't contain expected "${pageConfig.expectedTitle}" — continuing anyway`);
      } else {
        console.log(`  ✓ Title: "${title}"`);
      }

      // Screen-specific content validation
      const validator = SCREEN_VALIDATORS[pageConfig.name];
      if (validator) {
        const error = await validator(page);
        if (error) {
          throw new Error(`${error} — aborting`);
        }
        console.log(`  ✓ Screen content validated`);
      }

      // Scroll to trigger lazy loading, then back to top
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(400);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);

      // Final overlay dismissal
      await dismissOverlays(page);
      await page.waitForTimeout(300);

      // Capture viewport screenshot
      await page.screenshot({
        path: filepath,
        fullPage: false,
      });

      // Post-capture validation
      const fileErrors = validateScreenshot(filepath);
      if (fileErrors.length > 0) {
        // Delete invalid file
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        throw new Error(`Post-capture validation failed: ${fileErrors.join(', ')} — screenshot deleted`);
      }

      console.log(`  ✓ Saved: ${filepath}`);
      results.push({ name: pageConfig.name, device: pageConfig.device, status: 'ok' });
    } catch (err) {
      console.error(`  ✗ ABORTED: ${err.message}`);
      // Ensure no broken screenshot was saved
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        console.log(`  ✓ Cleaned up partial screenshot`);
      }
      results.push({ name: pageConfig.name, device: pageConfig.device, status: 'aborted', error: err.message });
    }

    await context.close();
  }

  await browser.close();

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('CAPTURE SUMMARY');
  console.log('═'.repeat(60));
  const ok = results.filter(r => r.status === 'ok');
  const aborted = results.filter(r => r.status === 'aborted');
  console.log(`✓ ${ok.length} captured successfully`);
  if (aborted.length > 0) {
    console.log(`✗ ${aborted.length} aborted:`);
    aborted.forEach(s => console.log(`  - ${s.name} (${s.device}): ${s.error}`));
  }
  console.log('═'.repeat(60));
  console.log(`\nScreenshots saved to: ${SCREENSHOT_DIR}`);

  // Final validation: check all expected files exist
  console.log('\n' + '─'.repeat(60));
  console.log('FILE VALIDATION');
  console.log('─'.repeat(60));
  for (const pageConfig of PAGES) {
    const filepath = path.join(SCREENSHOT_DIR, pageConfig.device, `${pageConfig.name}.png`);
    const exists = fs.existsSync(filepath);
    const size = exists ? fs.statSync(filepath).size : 0;
    const status = exists && size > 5000 ? '✓' : '✗';
    console.log(`  ${status} ${pageConfig.name}.png (${pageConfig.device}) ${exists ? `${(size / 1024).toFixed(0)}KB` : 'MISSING'}`);
  }
  console.log('─'.repeat(60));
}

captureScreenshots().catch(console.error);
