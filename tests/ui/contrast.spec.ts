// Contrast checks: every Lab page and template in each style's light and dark themes, overlays open in turn
// (ADR-0015). Rendered text goes through axe-core's color-contrast rule (`contrast.text`); the rest is measured in the
// page.

import { test } from "@playwright/test";
import { axe } from "./axe";
import { edges, icons, placeholders } from "./measure/contrast";
import { runs, walk } from "./walk";

test.describe.configure({ mode: "parallel" });

for (const run of runs((style) => style.themes.filter((theme) => theme === "light" || theme === "dark"))) {
  test(`contrast · ${run.title}`, async ({ page }, info) => {
    await walk(page, info, run, "contrast", [
      (page) =>
        axe(
          page,
          (builder) => builder.withRules(["color-contrast"]),
          () => "contrast.text",
        ),
      (page) => page.evaluate(placeholders),
      (page) => page.evaluate(icons),
      (page) => page.evaluate(edges),
    ]);
  });
}
