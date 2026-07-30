/**
 * Smoke-tests the site by launching a headless browser against a running
 * dev/preview server, visiting each route, and checking for console errors.
 *
 * Playwright is intentionally not a project dependency (keeps it out of
 * `npm ci` / CI installs) - install it once locally before running this:
 *   npm install --no-save playwright && npx playwright install chromium
 *
 * Usage: npm run smoke-test [-- --url=http://localhost:8083] [--headed]
 */
const { chromium } = require("playwright");

const baseUrl = (process.argv.find((a) => a.startsWith("--url=")) || "").split("=")[1] || "http://localhost:8080";
const headed = process.argv.includes("--headed");
const shotDir = "/tmp/lzrmoos-smoke-test";

const ROUTES = [
  "/",
  "/galleries/f1",
  "/galleries/dropbox",
  "/galleries/people",
  "/contact",
  "/blog",
  "/blog/introducing-jimothy",
];

async function checkRoute(page, path, errors) {
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  const safeName = path === "/" ? "home" : path.replace(/\//g, "_").slice(1);
  await page.screenshot({ path: `${shotDir}/${safeName}.png` });
}

(async () => {
  const fs = require("fs");
  fs.mkdirSync(shotDir, { recursive: true });

  const browser = await chromium.launch({ headless: !headed });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[console] ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`[pageerror] ${err}`));

  console.log(`Smoke-testing ${baseUrl} ...`);
  for (const route of ROUTES) {
    console.log(`  visiting ${route}`);
    await checkRoute(page, route, errors);
  }

  // Mobile burger menu open/close
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.click(".navbar-burger");
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${shotDir}/mobile-menu-open.png` });
  await page.click(".navbar-burger");

  // Theme toggle
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`${baseUrl}/blog`, { waitUntil: "networkidle" });
  await page.click(".theme-toggle");
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${shotDir}/blog-dark.png` });

  // Blog post lightbox
  await page.goto(`${baseUrl}/blog/introducing-jimothy`, { waitUntil: "networkidle" });
  const firstImg = page.locator(".post-content img").first();
  if (await firstImg.count()) {
    await firstImg.click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${shotDir}/lightbox-open.png` });
    await page.click(".lightbox");
  }

  await browser.close();

  console.log(`\nScreenshots saved to ${shotDir}`);
  if (errors.length) {
    console.error(`\n${errors.length} console error(s):`);
    errors.forEach((e) => console.error(`  ${e}`));
    process.exitCode = 1;
  } else {
    console.log("No console errors detected.");
  }
})();
