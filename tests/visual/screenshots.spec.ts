// Screenshot tests: every Lab page and every template in each style's light and dark themes (one is its default),
// and the Tokens page in every other theme (themes only change colors, which the Tokens page shows). A change that isn't meant shows up
// as a diff.
// After a change that is meant: `pnpm test:visual --update-snapshots`, then look at the new images. They're git-ignored.

import { expect, test } from "@playwright/test";
import { openLab, pageNames, pickerOptions, showPage } from "./lab";

const EVERY_PAGE = new Set(["light", "dark"]);
// Only the page scrolls in the Lab; let it grow instead, so a page taller than the window is shot whole. The column
// headers then stop sticking, or they'd cover the page's top.
const UNSCROLL =
  "html, body, #root, .lab, .lab-stage { height: auto !important; overflow: visible !important; } " +
  ".lab-column-head { position: static !important; }";
// The shader backdrops keep moving, so they never look the same twice.
const MOVING = ".iro-backdrop-liquid, .iro-backdrop-layers";

test("every page in every style", async ({ page }) => {
  test.setTimeout(240_000);
  // The sidebar hidden, so pages are as wide as before it existed.
  await page.addInitScript(() => localStorage.setItem("iro-lab-nav", "closed"));
  await openLab(page, {});
  for (const style of await pickerOptions(page, 0)) {
    await openLab(page, { style });
    for (const theme of await pickerOptions(page, 1)) {
      await openLab(page, { style, theme });
      await page.addStyleTag({ content: UNSCROLL });
      const names = await pageNames(page);
      for (const name of names) {
        if (!EVERY_PAGE.has(theme) && name !== "Tokens") continue;
        await showPage(page, name);
        await expect.soft(page.locator(".lab-page")).toHaveScreenshot(`${style}-${theme}-${name}.png`, {
          mask: [page.locator(MOVING)],
        });
      }
      if (!EVERY_PAGE.has(theme)) continue;
      // Templates fill the column, so the whole column is shot.
      await openLab(page, { style, theme, view: "templates" });
      await page.addStyleTag({ content: UNSCROLL });
      for (const name of await pageNames(page)) {
        await showPage(page, name);
        await expect
          .soft(page.locator(".lab-column"))
          .toHaveScreenshot(`${style}-${theme}-template-${name.replaceAll(" ", "-")}.png`);
      }
    }
  }
});
