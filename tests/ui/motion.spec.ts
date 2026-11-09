// Motion checks: every Lab page and template in each style's default theme, overlays open in turn (ADR-0015). With
// full motion: timings are tokens, what animations leave matches motion off, hover, press and focus don't shift the
// layout, closed overlays leave. With the system asking for reduced motion: nothing moves.

// ── Dependencies ──────────────────────────
import { type Page, test } from "@playwright/test";
import { leftovers, movement, settled, shiftAim, shiftCheck, shiftTargets, timings } from "./measure/motion";
import type { RawFinding } from "./measure/page";
import { runs, walk } from "./walk";

// ── Constants ─────────────────────────────
/** Targets hovered and pressed per state, so a long page stays quick. */
const SHIFT_LIMIT = 40;

// ── Private helpers ───────────────────────
/** `motion.shift`: hovers, presses (released away from the target, so nothing is clicked) and focuses each target. */
async function shifts(page: Page): Promise<RawFinding[]> {
  const out: RawFinding[] = [];
  const count = Math.min(SHIFT_LIMIT, await page.evaluate(shiftTargets));
  for (let index = 0; index < count; index++) {
    const point = await page.evaluate(shiftAim, index);
    if (!point) continue;
    await page.mouse.move(point.x, point.y);
    const hover = await page.evaluate(shiftCheck, [index, "hover"] as [number, "hover"]);
    await page.mouse.down();
    const press = hover.length ? [] : await page.evaluate(shiftCheck, [index, "press"] as [number, "press"]);
    await page.mouse.move(0, 0);
    await page.mouse.up();
    await page.keyboard.press("Shift");
    const focus =
      hover.length || press.length ? [] : await page.evaluate(shiftCheck, [index, "focus"] as [number, "focus"]);
    out.push(...hover, ...press, ...focus);
  }
  return out;
}

// ── Entry point ───────────────────────────
test.describe.configure({ mode: "parallel" });

for (const run of runs((style) => [style.base], { motion: "full" })) {
  test(`motion · ${run.title}`, async ({ page }, info) => {
    await walk(
      page,
      info,
      run,
      "motion",
      [(page) => page.evaluate(timings), (page) => page.evaluate(settled), shifts],
      [(page) => page.evaluate(leftovers)],
    );
  });
}

test.describe("reduced", () => {
  test.use({ reducedMotion: "reduce" });
  for (const run of runs((style) => [style.base], { motion: "system" })) {
    test(`motion · ${run.title}, reduced`, async ({ page }, info) => {
      await walk(page, info, run, "motion.reduced", [(page) => page.evaluate(movement)]);
    });
  }
});
