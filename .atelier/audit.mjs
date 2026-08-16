#!/usr/bin/env node
/**
 * audit.mjs — deterministic checks. These are facts, not opinions.
 * Run before subjective scoring so the rubric starts from evidence.
 *
 *   node audit.mjs --url http://localhost:3000 --out ./.atelier/round-1
 *
 * Exit codes: 0 clean · 1 warnings only · 2 criticals present · 3 could not load
 *
 * Requires: npm i -D playwright && npx playwright install chromium
 */

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const argv = process.argv.slice(2);
const arg = (n, d) => {
  const i = argv.findIndex((a) => a === `--${n}` || a.startsWith(`--${n}=`));
  if (i === -1) return d;
  const inline = argv[i].split('=')[1];
  if (inline !== undefined) return inline;
  const next = argv[i + 1];
  return next && !next.startsWith('--') ? next : 'true';
};

const url = arg('url', 'http://localhost:3000');
const outDir = path.resolve(arg('out', './.atelier/audit'));

const BANNED_FONTS = ['inter', 'poppins', 'montserrat', 'roboto', 'open sans', 'lato'];
const BANNED_WORDS = [
  'unleash', 'leverage', 'comprehensive', 'elevate your', 'unlock the', 'empower',
  'seamless', 'revolutioniz', 'game-chang', 'cutting-edge', 'robust', 'holistic',
  'synergy', 'delve', 'tapestry', 'paradigm', 'disruptive', 'utilize', 'facilitate',
  'spearhead', 'next level', 'fast-paced', 'one-stop shop', 'passionate about',
  'state-of-the-art', 'best-in-class', 'world-class', 'supercharge',
];
const PLACEHOLDERS = ['lorem ipsum', 'dolor sit amet', 'todo:', 'tbd', 'placeholder text', 'your text here'];

const findings = [];
const add = (level, check, detail, evidence) =>
  findings.push({ level, check, detail, evidence: evidence ?? null });

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });

// ── Desktop pass ────────────────────────────────────────────────────────────
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

const consoleErrors = [];
const consoleWarnings = [];
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text());
  if (m.type() === 'warning') consoleWarnings.push(m.text());
});
page.on('pageerror', (e) => consoleErrors.push(String(e)));
page.on('requestfailed', (r) => consoleErrors.push(`request failed: ${r.url()}`));

try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
} catch (err) {
  console.error(`Could not load ${url}: ${err.message}`);
  await browser.close();
  process.exit(3);
}
await page.waitForTimeout(2000);

// Prime lazy content so audits see the whole page.
await page.evaluate(async () => {
  await new Promise((r) => {
    let y = 0;
    const step = () => {
      window.scrollBy(0, window.innerHeight);
      y += window.innerHeight;
      if (y < document.body.scrollHeight && y < 30000) setTimeout(step, 90);
      else r();
    };
    step();
  });
});
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);

// ── In-page collection ──────────────────────────────────────────────────────
const report = await page.evaluate(() => {
  // ---- colour helpers ----
  const parse = (c) => {
    const m = String(c).match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const composite = (fg, bg) =>
    fg.a >= 1 ? fg : {
      r: Math.round(fg.r * fg.a + bg.r * (1 - fg.a)),
      g: Math.round(fg.g * fg.a + bg.g * (1 - fg.a)),
      b: Math.round(fg.b * fg.a + bg.b * (1 - fg.a)),
      a: 1,
    };
  const effectiveBg = (el) => {
    let node = el;
    while (node && node !== document.documentElement) {
      const c = parse(getComputedStyle(node).backgroundColor);
      if (c && c.a > 0.85) return c;
      node = node.parentElement;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };

  const visible = (el) => {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) < 0.05) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const sel = (el) => {
    const id = el.id ? `#${el.id}` : '';
    const cls = typeof el.className === 'string' && el.className
      ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
      : '';
    return `${el.tagName.toLowerCase()}${id}${cls}`;
  };

  const out = {
    contrast: [],
    fonts: new Set(),
    text: '',
    headings: [],
    h1Count: 0,
    imagesMissingAlt: [],
    imagesMissingDims: [],
    imagesRasterLegacy: [],
    smallTargets: [],
    noFocusStyle: [],
    overflowX: false,
    scrollWidth: 0,
    clientWidth: 0,
    grain: null,
    cursor: null,
    selectionStyled: false,
    reducedMotionCss: false,
    colorsUsed: {},
    arbitrarySpacing: [],
    landmarks: {},
    animatedBadProps: [],
  };

  out.clientWidth = document.documentElement.clientWidth;
  out.scrollWidth = document.documentElement.scrollWidth;
  out.overflowX = out.scrollWidth > out.clientWidth + 2;

  // ---- text, contrast, fonts ----
  const textNodes = [...document.querySelectorAll('body *')].filter((el) => {
    if (!visible(el)) return false;
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'PATH'].includes(el.tagName)) return false;
    return [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
  });

  for (const el of textNodes.slice(0, 900)) {
    const s = getComputedStyle(el);
    out.fonts.add(s.fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase());

    const fg = parse(s.color);
    if (!fg) continue;
    const bg = effectiveBg(el);
    const r = ratio(composite(fg, bg), bg);
    const size = parseFloat(s.fontSize);
    const weight = Number(s.fontWeight) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const required = large ? 3 : 4.5;
    if (r < required) {
      out.contrast.push({
        selector: sel(el),
        text: el.textContent.trim().slice(0, 60),
        ratio: Number(r.toFixed(2)),
        required,
        size: Number(size.toFixed(1)),
        color: s.color,
        background: `rgb(${bg.r}, ${bg.g}, ${bg.b})`,
      });
    }
  }

  out.text = (document.body.innerText || '').toLowerCase();

  // ---- headings ----
  document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => {
    if (!visible(h)) return;
    out.headings.push({
      level: Number(h.tagName[1]),
      text: h.textContent.trim().slice(0, 70),
      fontSize: parseFloat(getComputedStyle(h).fontSize),
      lineHeight: getComputedStyle(h).lineHeight,
      letterSpacing: getComputedStyle(h).letterSpacing,
    });
  });
  out.h1Count = document.querySelectorAll('h1').length;

  const bodyEl = document.querySelector('p') || document.body;
  out.bodyFontSize = parseFloat(getComputedStyle(bodyEl).fontSize);

  // ---- images ----
  document.querySelectorAll('img').forEach((img) => {
    if (!img.getAttribute('alt') && img.getAttribute('aria-hidden') !== 'true') {
      out.imagesMissingAlt.push(img.currentSrc || img.src || '(no src)');
    }
    if (!img.getAttribute('width') && !img.getAttribute('height') && !img.style.aspectRatio) {
      out.imagesMissingDims.push(img.currentSrc || img.src || '(no src)');
    }
    const src = (img.currentSrc || img.src || '').toLowerCase();
    if (/\.(png|jpe?g)(\?|$)/.test(src) && !src.includes('/_next/image')) {
      out.imagesRasterLegacy.push(src);
    }
  });

  // ---- touch targets & focus ----
  document.querySelectorAll('a[href], button, input, select, textarea, [role="button"]').forEach((el) => {
    if (!visible(el)) return;
    const r = el.getBoundingClientRect();
    if (r.width < 44 || r.height < 44) {
      out.smallTargets.push({ selector: sel(el), w: Math.round(r.width), h: Math.round(r.height) });
    }
    const s = getComputedStyle(el);
    if (s.outlineStyle === 'none' && !s.boxShadow.includes('rgb') && s.outlineWidth === '0px') {
      out.noFocusStyle.push(sel(el));
    }
  });

  // ---- signature effects ----
  const grainEl = [...document.querySelectorAll('div, svg')].find((el) => {
    const s = getComputedStyle(el);
    return (
      s.position === 'fixed' &&
      s.pointerEvents === 'none' &&
      Number(s.opacity) > 0 && Number(s.opacity) < 0.15 &&
      (el.querySelector('feTurbulence') ||
        el.tagName === 'SVG' && el.querySelector('feTurbulence') ||
        /noise|grain/i.test(el.className?.toString?.() ?? ''))
    );
  });
  out.grain = grainEl
    ? { found: true, opacity: Number(getComputedStyle(grainEl).opacity), blend: getComputedStyle(grainEl).mixBlendMode }
    : { found: false };

  const cursorHidden = getComputedStyle(document.body).cursor === 'none';
  const cursorEl = [...document.querySelectorAll('div')].some((el) => {
    const s = getComputedStyle(el);
    return s.position === 'fixed' && s.pointerEvents === 'none' && Number(s.zIndex) >= 50 && el.children.length >= 1;
  });
  out.cursor = { nativeHidden: cursorHidden, overlayPresent: cursorEl };

  // ---- stylesheet-level checks ----
  let cssText = '';
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) cssText += rule.cssText;
    } catch { /* cross-origin */ }
  }
  out.selectionStyled = /::selection/.test(cssText);
  out.reducedMotionCss = /prefers-reduced-motion/.test(cssText);
  out.animatedBadProps = ['width', 'height', 'top', 'left', 'margin'].filter((p) =>
    new RegExp(`transition[^;]*\\b${p}\\b`).test(cssText),
  );

  // ---- colour census ----
  [...document.querySelectorAll('body *')].slice(0, 1200).forEach((el) => {
    if (!visible(el)) return;
    const s = getComputedStyle(el);
    [s.color, s.backgroundColor].forEach((c) => {
      const p = parse(c);
      if (!p || p.a < 0.9) return;
      const key = `rgb(${p.r},${p.g},${p.b})`;
      out.colorsUsed[key] = (out.colorsUsed[key] || 0) + 1;
    });
  });

  // ---- landmarks ----
  out.landmarks = {
    header: !!document.querySelector('header'),
    nav: !!document.querySelector('nav'),
    main: !!document.querySelector('main'),
    footer: !!document.querySelector('footer'),
    sections: document.querySelectorAll('section').length,
    skipLink: !!document.querySelector('a[href^="#"]'),
  };

  out.fonts = [...out.fonts];
  return out;
});

// ── Evaluate desktop findings ───────────────────────────────────────────────
if (consoleErrors.length) {
  add('critical', 'console', `${consoleErrors.length} console error(s)`, consoleErrors.slice(0, 8));
} else {
  add('pass', 'console', 'No console errors');
}
if (consoleWarnings.length > 3) {
  add('warning', 'console', `${consoleWarnings.length} console warnings`, consoleWarnings.slice(0, 5));
}

// Desktop overflow
if (report.overflowX) {
  add('critical', 'responsive.overflow.desktop', `Horizontal overflow at 1440px (${report.scrollWidth} > ${report.clientWidth})`);
} else {
  add('pass', 'responsive.overflow.desktop', 'No horizontal overflow at 1440px');
}

// Fonts
const banned = report.fonts.filter((f) => BANNED_FONTS.some((b) => f.includes(b)));
if (banned.length) {
  add('critical', 'typography.banned-font', `Banned font in computed stack: ${banned.join(', ')}`, report.fonts);
} else {
  add('pass', 'typography.banned-font', `Fonts in use: ${report.fonts.slice(0, 6).join(', ')}`);
}

// Display scale
const h1 = report.headings.find((h) => h.level === 1);
if (h1 && report.bodyFontSize) {
  const scale = h1.fontSize / report.bodyFontSize;
  if (scale < 2.5) {
    add('warning', 'typography.scale', `h1 is only ${scale.toFixed(2)}x body (${h1.fontSize}px / ${report.bodyFontSize}px). Target 2.5x+ on desktop.`);
  } else {
    add('pass', 'typography.scale', `h1 is ${scale.toFixed(2)}x body`);
  }
}

// Display metrics
for (const h of report.headings.filter((x) => x.level <= 2 && x.fontSize >= 40)) {
  const lh = parseFloat(h.lineHeight);
  if (!Number.isNaN(lh) && lh / h.fontSize > 1.25) {
    add('warning', 'typography.line-height', `"${h.text}" at ${h.fontSize}px has line-height ${(lh / h.fontSize).toFixed(2)}. Display type wants 0.95-1.1.`);
  }
  if (h.letterSpacing === 'normal' || parseFloat(h.letterSpacing) >= 0) {
    add('warning', 'typography.tracking', `"${h.text}" at ${h.fontSize}px has no negative tracking. Display type wants -0.02em to -0.04em.`);
  }
}

// Contrast
if (report.contrast.length) {
  add('critical', 'color.contrast', `${report.contrast.length} text/background pair(s) below WCAG AA`, report.contrast.slice(0, 10));
} else {
  add('pass', 'color.contrast', 'All sampled text pairs pass AA');
}

// Neutral ramp depth
const distinctColors = Object.keys(report.colorsUsed).length;
if (distinctColors < 8) {
  add('warning', 'color.ramp', `Only ${distinctColors} distinct opaque colours rendered. A full neutral ramp usually yields 10+.`);
} else {
  add('pass', 'color.ramp', `${distinctColors} distinct colours rendered`);
}

// Placeholder & banned copy
for (const p of PLACEHOLDERS) {
  if (report.text.includes(p)) add('critical', 'copy.placeholder', `Placeholder text found: "${p}"`);
}
const foundBanned = BANNED_WORDS.filter((w) => report.text.includes(w));
if (foundBanned.length) {
  add(foundBanned.length > 2 ? 'critical' : 'warning', 'copy.banned-words', `Banned copy: ${foundBanned.join(', ')}`);
} else {
  add('pass', 'copy.banned-words', 'No banned copy words');
}

// Headings
if (report.h1Count !== 1) {
  add('critical', 'a11y.h1', `Page has ${report.h1Count} <h1>. Exactly one required.`);
} else {
  add('pass', 'a11y.h1', 'Exactly one h1');
}
let prev = 0, skips = [];
for (const h of report.headings) {
  if (prev && h.level > prev + 1) skips.push(`h${prev} → h${h.level} ("${h.text}")`);
  prev = h.level;
}
if (skips.length) add('warning', 'a11y.heading-order', `Heading level skips: ${skips.join('; ')}`);

// Images
if (report.imagesMissingAlt.length) add('critical', 'a11y.alt', `${report.imagesMissingAlt.length} image(s) missing alt`, report.imagesMissingAlt.slice(0, 5));
if (report.imagesMissingDims.length) add('warning', 'perf.image-dims', `${report.imagesMissingDims.length} image(s) without dimensions — CLS risk`, report.imagesMissingDims.slice(0, 5));
if (report.imagesRasterLegacy.length) add('warning', 'perf.image-format', `${report.imagesRasterLegacy.length} raw PNG/JPG not served through next/image`, report.imagesRasterLegacy.slice(0, 5));

// Focus & targets
if (report.noFocusStyle.length) {
  add('critical', 'a11y.focus', `${report.noFocusStyle.length} interactive element(s) with no visible focus style`, report.noFocusStyle.slice(0, 8));
} else {
  add('pass', 'a11y.focus', 'Focus styles present');
}

// Signature effects
if (!report.grain.found) {
  add('critical', 'detail.grain', 'No grain overlay detected. Required on every build.');
} else if (report.grain.opacity < 0.02 || report.grain.opacity > 0.06) {
  add('warning', 'detail.grain', `Grain opacity ${report.grain.opacity} outside the 0.025-0.05 range.`);
} else {
  add('pass', 'detail.grain', `Grain present at ${report.grain.opacity} (${report.grain.blend})`);
}

if (!report.cursor.overlayPresent) {
  add('critical', 'detail.cursor', 'No custom cursor overlay detected on a fine-pointer viewport.');
} else {
  add('pass', 'detail.cursor', 'Custom cursor overlay present');
}

if (!report.selectionStyled) add('warning', 'detail.selection', 'No custom ::selection style');
if (!report.reducedMotionCss) add('critical', 'motion.reduced', 'No prefers-reduced-motion handling found in CSS');
if (report.animatedBadProps.length) {
  add('warning', 'motion.properties', `Transitions on layout properties: ${report.animatedBadProps.join(', ')}. Use transform/opacity.`);
}

// Landmarks
const missingLandmarks = Object.entries(report.landmarks)
  .filter(([k, v]) => ['header', 'main', 'footer'].includes(k) && !v)
  .map(([k]) => k);
if (missingLandmarks.length) add('warning', 'a11y.landmarks', `Missing landmark(s): ${missingLandmarks.join(', ')}`);

// ── Responsive pass ─────────────────────────────────────────────────────────
for (const vp of [{ name: 'tablet', width: 768, height: 1024 }, { name: 'mobile', width: 390, height: 844 }]) {
  const c = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    hasTouch: vp.name === 'mobile',
    isMobile: vp.name === 'mobile',
  });
  const p = await c.newPage();
  try {
    await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await p.waitForTimeout(1500);
    const r = await p.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      offenders: [...document.querySelectorAll('body *')]
        .filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 2)
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).trim().split(/\s+/)[0] || ''}`),
      cursorHidden: getComputedStyle(document.body).cursor === 'none',
      smallTargets: [...document.querySelectorAll('a[href], button, [role="button"]')].filter((el) => {
        const b = el.getBoundingClientRect();
        return b.width > 0 && (b.width < 44 || b.height < 44);
      }).length,
    }));

    if (r.scrollWidth > r.clientWidth + 2) {
      add('critical', `responsive.overflow.${vp.name}`, `Horizontal overflow at ${vp.width}px (${r.scrollWidth} > ${r.clientWidth})`, r.offenders);
    } else {
      add('pass', `responsive.overflow.${vp.name}`, `No horizontal overflow at ${vp.width}px`);
    }

    if (vp.name === 'mobile') {
      if (r.cursorHidden) {
        add('critical', 'detail.cursor.touch', 'Native cursor hidden on a touch viewport. Gate the custom cursor on (pointer: fine).');
      } else {
        add('pass', 'detail.cursor.touch', 'Custom cursor correctly absent on touch');
      }
      if (r.smallTargets > 0) {
        add('warning', 'a11y.touch-targets', `${r.smallTargets} target(s) under 44x44px on mobile`);
      } else {
        add('pass', 'a11y.touch-targets', 'All mobile targets ≥ 44x44px');
      }
    }
  } catch (err) {
    add('warning', `responsive.${vp.name}`, `Could not audit at ${vp.width}px: ${err.message}`);
  }
  await c.close();
}

await browser.close();

// ── Output ──────────────────────────────────────────────────────────────────
const criticals = findings.filter((f) => f.level === 'critical');
const warnings = findings.filter((f) => f.level === 'warning');
const passes = findings.filter((f) => f.level === 'pass');

const summary = {
  url,
  timestamp: new Date().toISOString(),
  counts: { critical: criticals.length, warning: warnings.length, pass: passes.length },
  gate: criticals.length === 0 ? 'AUDIT PASS' : 'AUDIT FAIL',
  findings,
  raw: {
    fonts: report.fonts,
    headings: report.headings.slice(0, 20),
    distinctColors: Object.keys(report.colorsUsed).length,
    landmarks: report.landmarks,
  },
};

await writeFile(path.join(outDir, 'audit.json'), JSON.stringify(summary, null, 2), 'utf8');

const line = (f) => `- **${f.check}** — ${f.detail}${f.evidence ? `\n  \`${JSON.stringify(f.evidence).slice(0, 300)}\`` : ''}`;
const md = [
  `# Audit — ${summary.gate}`,
  '',
  `${url} · ${summary.timestamp}`,
  `**${criticals.length} critical · ${warnings.length} warning · ${passes.length} pass**`,
  '',
  ...(criticals.length ? ['## Critical (blocks the gate)', '', ...criticals.map(line), ''] : []),
  ...(warnings.length ? ['## Warnings', '', ...warnings.map(line), ''] : []),
  '## Passing', '', ...passes.map((f) => `- ${f.check} — ${f.detail}`), '',
].join('\n');

await writeFile(path.join(outDir, 'audit.md'), md, 'utf8');

console.log(`\n${summary.gate} — ${criticals.length} critical, ${warnings.length} warning`);
console.log(`→ ${path.relative(process.cwd(), outDir)}/audit.md`);
process.exit(criticals.length ? 2 : warnings.length ? 1 : 0);
