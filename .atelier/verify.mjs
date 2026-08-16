import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("./verify/", import.meta.url));
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });

// Desktop
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3210", { waitUntil: "networkidle" });
await page.waitForTimeout(1800); // let the odometer settle

const ids = ["sb-01", "range", "calibration", "order"];
await page.screenshot({ path: `${out}hero.png` });
for (const id of ids) {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await page.waitForTimeout(900); // reveals
  await page.screenshot({ path: `${out}${id}.png` });
}
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(700);
await page.screenshot({ path: `${out}footer.png` });
await page.screenshot({ path: `${out}fullpage.png`, fullPage: true });

// Mobile
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto("http://localhost:3210", { waitUntil: "networkidle" });
await mob.waitForTimeout(1800);
await mob.screenshot({ path: `${out}mobile-hero.png` });
await mob.locator("#range").scrollIntoViewIfNeeded();
await mob.waitForTimeout(900);
await mob.screenshot({ path: `${out}mobile-range.png` });
// horizontal scroll check + offender report
const overflow = await mob.evaluate(() => {
  const docOver =
    document.documentElement.scrollWidth >
    document.documentElement.clientWidth;
  const vw = document.documentElement.clientWidth;
  const offenders = [];
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 || r.left < -1) {
      const cls = String(el.className).slice(0, 60);
      offenders.push(
        `${el.tagName.toLowerCase()}.${cls} L${Math.round(r.left)} R${Math.round(r.right)}`,
      );
    }
  });
  return { docOver, vw, offenders: offenders.slice(0, 12) };
});
console.log("mobile overflow:", JSON.stringify(overflow, null, 1));

await browser.close();
console.log("done →", out);
