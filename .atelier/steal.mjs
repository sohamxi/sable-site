#!/usr/bin/env node
/**
 * steal.mjs — capture inspiration screenshots for the "vibe" step.
 *
 * Captures each URL at three framings and writes a manifest the agent reads back.
 *
 *   node steal.mjs --urls "https://a.com,https://b.com" --out ./.atelier/inspiration
 *
 * Options:
 *   --urls   Comma-separated list of URLs (required)
 *   --out    Output directory (default ./.atelier/inspiration)
 *   --wait   Extra ms to wait after load, for entrance animations (default 2500)
 *   --full   Also capture full-page shots (default true; --full=false to skip)
 *
 * Requires: npm i -D playwright && npx playwright install chromium
 */

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, arg, i, arr) => {
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const [k, inlineVal] = key.split('=');
      const val = inlineVal ?? (arr[i + 1]?.startsWith('--') ? 'true' : arr[i + 1]) ?? 'true';
      acc.push([k, val]);
    }
    return acc;
  }, [])
);

const urls = (args.urls || '').split(',').map((u) => u.trim()).filter(Boolean);
const outDir = path.resolve(args.out || './.atelier/inspiration');
const settle = Number(args.wait ?? 2500);
const wantFull = args.full !== 'false';

if (!urls.length) {
  console.error('Usage: node steal.mjs --urls "https://a.com,https://b.com" [--out DIR]');
  process.exit(1);
}

const FRAMES = [
  { name: 'desktop', width: 1440, height: 900, fullPage: false },
  { name: 'mobile', width: 390, height: 844, fullPage: false },
];

const slug = (u) =>
  u.replace(/^https?:\/\//, '').replace(/\/$/, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 60);

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const manifest = [];

for (const url of urls) {
  const id = slug(url);
  const entry = { url, id, shots: [], error: null, title: null };

  try {
    for (const frame of FRAMES) {
      const context = await browser.newContext({
        viewport: { width: frame.width, height: frame.height },
        deviceScaleFactor: 2,
        // A real UA avoids the most common bot walls.
        userAgent:
          frame.name === 'mobile'
            ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
            : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      });
      const page = await context.newPage();

      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(settle);

      // Nudge lazy content into view, then return to the top for the above-fold shot.
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0;
          const step = () => {
            window.scrollBy(0, window.innerHeight);
            y += window.innerHeight;
            if (y < document.body.scrollHeight && y < 20000) setTimeout(step, 120);
            else resolve();
          };
          step();
        });
      });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(700);

      if (!entry.title) entry.title = await page.title().catch(() => null);

      const file = path.join(outDir, `${id}--${frame.name}.png`);
      await page.screenshot({ path: file, fullPage: frame.fullPage });
      entry.shots.push(path.relative(process.cwd(), file));

      if (wantFull && frame.name === 'desktop') {
        const fullFile = path.join(outDir, `${id}--fullpage.png`);
        await page.screenshot({ path: fullFile, fullPage: true });
        entry.shots.push(path.relative(process.cwd(), fullFile));
      }

      await context.close();
    }
    console.log(`captured  ${url}`);
  } catch (err) {
    entry.error = String(err.message || err);
    console.error(`FAILED    ${url} — ${entry.error}`);
  }

  manifest.push(entry);
}

await browser.close();

const md = [
  '# Inspiration capture',
  '',
  `Captured ${new Date().toISOString()}`,
  '',
  '> Read each screenshot and fill the notes table below. Extract only:',
  '> structural move · type treatment · density · the one memorable moment.',
  '> Steal structure and rhythm. Never steal palette, wordmark, imagery, or copy.',
  '',
  '## Captures',
  '',
  ...manifest.flatMap((m) => [
    `### ${m.title || m.url}`,
    `<${m.url}>`,
    '',
    ...(m.error ? [`> capture failed: ${m.error}`, ''] : m.shots.map((s) => `- \`${s}\``)),
    '',
  ]),
  '## Notes',
  '',
  '| Reference | Structural move | Type treatment | Density | Memorable moment | Steal? |',
  '|-----------|-----------------|----------------|---------|------------------|--------|',
  ...manifest.filter((m) => !m.error).map((m) => `| ${m.title || m.id} | | | | | |`),
  '',
].join('\n');

await writeFile(path.join(outDir, 'notes.md'), md, 'utf8');

const ok = manifest.filter((m) => !m.error).length;
console.log(`\n${ok}/${manifest.length} captured → ${path.relative(process.cwd(), outDir)}/notes.md`);
if (ok === 0) {
  console.error('No captures succeeded. Sites may be blocking headless — retry via the Chrome MCP.');
  process.exit(2);
}
