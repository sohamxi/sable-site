#!/usr/bin/env node
/**
 * capture.mjs — render the site and capture everything the agent needs to look at.
 *
 *   node capture.mjs --url http://localhost:3000 --out ./.atelier/round-1
 *
 * Options:
 *   --url       Target URL (default http://localhost:3000)
 *   --out       Output directory (default ./.atelier/capture)
 *   --sections  Capture each <section> individually (default true)
 *   --states    Capture hover/focus on the primary CTA (default true)
 *   --wait      Settle ms after load (default 2000)
 *
 * Requires: npm i -D playwright && npx playwright install chromium
 */

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.findIndex((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (i === -1) return fallback;
  const inline = argv[i].split('=')[1];
  if (inline !== undefined) return inline;
  const next = argv[i + 1];
  return next && !next.startsWith('--') ? next : 'true';
};

const url = arg('url', 'http://localhost:3000');
const outDir = path.resolve(arg('out', './.atelier/capture'));
const doSections = arg('sections', 'true') !== 'false';
const doStates = arg('states', 'true') !== 'false';
const settle = Number(arg('wait', 2000));

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const captured = [];
const notes = [];

async function primeLazyContent(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        window.scrollBy(0, window.innerHeight);
        y += window.innerHeight;
        if (y < document.body.scrollHeight && y < 30000) setTimeout(step, 100);
        else resolve();
      };
      step();
    });
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
}

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    hasTouch: vp.name === 'mobile',
    isMobile: vp.name === 'mobile',
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('pageerror', (e) => consoleErrors.push(String(e)));

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  } catch (err) {
    console.error(`Could not load ${url} at ${vp.name}: ${err.message}`);
    await context.close();
    continue;
  }

  await page.waitForTimeout(settle);
  await primeLazyContent(page);
  await primeLazyContent(page); // second pass: scrollHeight can grow after first prime
  await page.waitForTimeout(1000);

  // Above the fold
  const fold = path.join(outDir, `${vp.name}--fold.png`);
  await page.screenshot({ path: fold });
  captured.push(path.relative(process.cwd(), fold));

  // Full page. Known limitation for viewport-relative cinematic sites:
  // whileInView reveals below the fold can be caught at frame zero.
  // Score from fold + per-section shots; treat --full as layout-rhythm
  // reference only.
  const full = path.join(outDir, `${vp.name}--full.png`);
  await page.screenshot({ path: full, fullPage: true });
  captured.push(path.relative(process.cwd(), full));

  // Per-section — desktop and mobile only; tablet rarely reveals anything new
  if (doSections && vp.name !== 'tablet') {
    const sections = await page.locator('main section, body > section, [data-section]').all();
    for (let i = 0; i < Math.min(sections.length, 14); i++) {
      try {
        const box = await sections[i].boundingBox();
        if (!box || box.height < 80) continue;
        const file = path.join(outDir, `${vp.name}--section-${String(i + 1).padStart(2, '0')}.png`);
        await sections[i].scrollIntoViewIfNeeded();
        await page.waitForTimeout(500); // let entrance animation finish
        await sections[i].screenshot({ path: file });
        captured.push(path.relative(process.cwd(), file));
      } catch {
        /* section detached or off-screen; skip */
      }
    }
  }

  // Interaction states on the primary CTA — desktop only
  if (doStates && vp.name === 'desktop') {
    const cta = page.locator('a[href], button').filter({ hasNotText: /^$/ }).first();
    try {
      await page.evaluate(() => window.scrollTo(0, 0));
      await cta.scrollIntoViewIfNeeded();
      await cta.hover();
      await page.waitForTimeout(350);
      const hoverFile = path.join(outDir, 'desktop--cta-hover.png');
      await page.screenshot({ path: hoverFile, clip: await expand(cta) });
      captured.push(path.relative(process.cwd(), hoverFile));

      await page.keyboard.press('Tab');
      await page.waitForTimeout(250);
      const focusFile = path.join(outDir, 'desktop--focus-ring.png');
      await page.screenshot({ path: focusFile });
      captured.push(path.relative(process.cwd(), focusFile));
    } catch {
      notes.push('Could not capture CTA hover/focus states — no matching interactive element found.');
    }

    async function expand(locator) {
      const b = await locator.boundingBox();
      if (!b) return undefined;
      const pad = 40;
      return {
        x: Math.max(0, b.x - pad),
        y: Math.max(0, b.y - pad),
        width: b.width + pad * 2,
        height: b.height + pad * 2,
      };
    }
  }

  if (consoleErrors.length) {
    notes.push(`${vp.name}: ${consoleErrors.length} console error(s) — see audit.json`);
  }

  console.log(`captured  ${vp.name}`);
  await context.close();
}

await browser.close();

const md = [
  '# Capture manifest',
  '',
  `URL: ${url}`,
  `Captured: ${new Date().toISOString()}`,
  '',
  '> Read every file below with the Read tool before scoring.',
  '> Write observations to observations.md first. Score second.',
  '',
  '## Files',
  '',
  ...captured.map((f) => `- \`${f}\``),
  '',
  ...(notes.length ? ['## Notes', '', ...notes.map((n) => `- ${n}`), ''] : []),
  '## Observation prompts',
  '',
  '1. What does the eye land on first? Is that intended?',
  '2. Which sections break the centered-stack default? Name them.',
  '3. Which section is indistinguishable from a generic template?',
  '4. Where is spacing wrong — tight, loose, or inconsistent between neighbours?',
  '5. Does mobile look designed, or squeezed from desktop?',
  '6. Which single section would a designer screenshot and post? If none, that is a finding.',
  '',
].join('\n');

await writeFile(path.join(outDir, 'manifest.md'), md, 'utf8');
console.log(`\n${captured.length} shots → ${path.relative(process.cwd(), outDir)}/manifest.md`);
