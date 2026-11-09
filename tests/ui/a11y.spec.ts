// Accessibility checks: every Lab page and template in each style's default theme, overlays open in turn
// (ADR-0015). axe-core's WCAG 2.2 A and AA rules (`a11y.<rule>`, target size included; color contrast is in the
// contrast checks), and focus that shows, measured in the page.

import { test } from "@playwright/test";
import { axe } from "./axe";
import { focus } from "./measure/a11y";
import { runs, walk } from "./walk";

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

test.describe.configure({ mode: "parallel" });

for (const run of runs((style) => [style.base])) {
  test(`a11y · ${run.title}`, async ({ page }, info) => {
    await walk(page, info, run, "a11y", [
      (page) =>
        axe(
          page,
          (builder) => builder.withTags(TAGS).disableRules(["color-contrast"]),
          (rule) => `a11y.${rule}`,
        ),
      // A key press first, so focus shows the way it does for keyboard users. Last, as focusing may close an overlay.
      async (page) => {
        await page.keyboard.press("Shift");
        return page.evaluate(focus);
      },
    ]);
  });
}
