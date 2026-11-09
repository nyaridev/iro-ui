// Token contrast (ADR-0014): text tokens on the surfaces in every style and theme, chart colors on the surface, and text on every
// accent fill, measured from the colors the browser renders (so mixed and inherited values count). WCAG AA for normal
// text: 4.5:1.

import { expect, test } from "@playwright/test";
import { openLab, pickerOptions } from "../visual/lab";

const AA = 4.5;
/** Chart marks against the surface. On light surfaces aqua, yellow and magenta sit between 2:1 and 3:1 by design;
 *  the legend, readout and data table carry their values (ADR-0011). */
const MARKS = 3;
const MARKS_LIGHT = 2;
const TEXT = ["fg", "fg-2", "fg-3", "fg-4"];
const SURFACES = ["bg", "surface", "surface-2", "surface-3", "field", "field-hover", "sunken"];
/** The edge of fields and toggles against what they sit on (WCAG 1.4.11). */
const EDGE = 3;
const STATUS = ["success", "warning", "danger", "info", "accent-ink"];

/** Text-on-fill pairs, by token name without `--iro-`. */
type Pair = [text: string, fill: string];

/** Contrast ratios of the pairs, read inside the Lab's first column (the shell is always kami). Runs in the page. */
function measure(pairs: Pair[]): { pair: string; ratio: number }[] {
  const root = document.querySelector(".lab-column") as HTMLElement;
  const canvas = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!canvas) throw new Error("No 2D canvas");
  const rgb = (token: string) => {
    const probe = document.createElement("span");
    probe.style.color = `var(--iro-${token})`;
    root.append(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    canvas.clearRect(0, 0, 1, 1);
    canvas.fillStyle = color;
    canvas.fillRect(0, 0, 1, 1);
    return Array.from(canvas.getImageData(0, 0, 1, 1).data.slice(0, 3));
  };
  const luminance = (channels: number[]) => {
    const [r, g, b] = channels.map((value) => {
      const c = value / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  return pairs.map(([text, fill]) => {
    const [a, b] = [luminance(rgb(text)), luminance(rgb(fill))];
    const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    return { pair: `${text} on ${fill}`, ratio: Math.round(ratio * 100) / 100 };
  });
}

// Each test opens the Lab once per look: dozens of loads, slower in WebKit than the default 30 seconds allow.
test.describe.configure({ timeout: 120_000 });

test("text reads on every surface, in every style and theme", async ({ page }) => {
  const failures: string[] = [];
  await openLab(page, {});
  for (const style of await pickerOptions(page, 0)) {
    await openLab(page, { style });
    for (const theme of await pickerOptions(page, 1)) {
      await openLab(page, { style, theme });
      const pairs: Pair[] = [
        ...TEXT.flatMap((text) => SURFACES.map((fill): Pair => [text, fill])),
        ...STATUS.flatMap((text) => ["surface", "surface-2"].map((fill): Pair => [text, fill])),
      ];
      for (const { pair, ratio } of await page.evaluate(measure, pairs)) {
        if (ratio < AA) failures.push(`${style} / ${theme}: ${pair} = ${ratio}`);
      }
    }
  }
  expect(failures).toEqual([]);
});

test("fields and toggles show their edge on every surface, in every style and theme", async ({ page }) => {
  const failures: string[] = [];
  const pairs = ["bg", "surface", "surface-2", "surface-3", "sunken"].map((fill): Pair => ["edge", fill]);
  await openLab(page, {});
  for (const style of await pickerOptions(page, 0)) {
    await openLab(page, { style });
    for (const theme of await pickerOptions(page, 1)) {
      await openLab(page, { style, theme });
      for (const { pair, ratio } of await page.evaluate(measure, pairs)) {
        if (ratio < EDGE) failures.push(`${style} / ${theme}: ${pair} = ${ratio}`);
      }
    }
  }
  expect(failures).toEqual([]);
});

test("chart colors stand out on the surface, in every style and theme", async ({ page }) => {
  const failures: string[] = [];
  const pairs = Array.from({ length: 8 }, (_, index): Pair => [`chart-${index + 1}`, "surface"]);
  await openLab(page, {});
  for (const style of await pickerOptions(page, 0)) {
    await openLab(page, { style });
    for (const theme of await pickerOptions(page, 1)) {
      await openLab(page, { style, theme });
      const scheme = await page
        .locator(".lab-column")
        .first()
        .evaluate((root) => getComputedStyle(root).colorScheme);
      const floor = scheme.includes("light") ? MARKS_LIGHT : MARKS;
      for (const { pair, ratio } of await page.evaluate(measure, pairs)) {
        if (ratio < floor) failures.push(`${style} / ${theme}: ${pair} = ${ratio}`);
      }
    }
  }
  expect(failures).toEqual([]);
});

test("text reads on every accent, in each style's light and dark themes", async ({ page }) => {
  const failures: string[] = [];
  await openLab(page, {});
  for (const style of await pickerOptions(page, 0)) {
    await openLab(page, { style });
    const themes = (await pickerOptions(page, 1)).filter((theme) => ["light", "dark"].includes(theme));
    for (const accent of await pickerOptions(page, 2)) {
      for (const theme of themes) {
        await openLab(page, { style, theme, accent });
        const pairs: Pair[] = [
          ["on-accent", "accent"],
          ["accent-ink", "surface"],
          ["accent-ink", "surface-2"],
        ];
        for (const { pair, ratio } of await page.evaluate(measure, pairs)) {
          if (ratio < AA) failures.push(`${style} / ${theme} / ${accent}: ${pair} = ${ratio}`);
        }
      }
    }
  }
  expect(failures).toEqual([]);
});
