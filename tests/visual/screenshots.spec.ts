// Screenshot tests: every Lab page in each style's default and light themes, and the Tokens page in every other theme
// (themes only change colors, which the Tokens page shows). A change that isn't meant shows up as a diff.
// After a change that is meant: `pnpm test:visual --update-snapshots`, then look at the new images before committing.

import { expect, test } from "@playwright/test";
import { openLab, pageNames, pickerOptions, showPage } from "./lab";

const EVERY_PAGE = new Set(["default", "light"]);
// Only the page scrolls in the Lab; let it grow instead, so a page taller than the window is shot whole.
const UNSCROLL = "html, body, #root, .lab, .lab-stage { height: auto !important; overflow: visible !important; }";
// The liquid backdrop flows from a random point, so it never looks the same twice.
const MOVING = ".iro-backdrop-liquid";

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
    }
  }
});
