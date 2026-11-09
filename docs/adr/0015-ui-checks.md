# ADR-0015: Two checkers prove the promises: one reads the CSS, one measures the Lab

**Status:** Accepted
**Date:** 2026-11-09

## Context

ADR-0014 says what every component promises. Checking 124 components in three styles, two themes and several widths
by eye isn't possible, and screenshot tests only notice that something changed, not that it was wrong to begin with.
The only automated design check so far is the token contrast test (M5), which measures token pairs, not what's on
screen.

## Decision

- **A static check, `scripts/check-css.ts`,** reads every CSS file under `src/` except the styles' token files and
  reports, in about a second:
  - spacing that isn't a space token (raw `px` of 4 or more, or `rem`, in padding, margin, gap or inset);
  - durations and easings that aren't motion tokens, unless the rule is marked with a `fixed timing` comment;
  - movement in enter and exit states or keyframes that doesn't scale with `--iro-travel`;
  - transitions on layout properties (width, height, top, left, margin, padding) that would keep moving under reduced
    motion: their duration is scaled by `--iro-move` (1, or 0 when motion only fades), so they snap instead;
  - CSS features below Baseline "widely available" outside `@supports`, read from the `web-features` package (the
    WebDX group's Baseline data).
  It runs in `pnpm check`.
- **A runtime check, `tests/ui/`,** is a Playwright project (`pnpm check:ui`) that walks every Lab page and template
  and measures what the browser renders:
  - `walk.ts` visits the pages in each look and width and clicks every element marked `data-lab-state`, so open
    dialogs, menus and popovers are checked too;
  - measurements run in the page (`measure/*.ts`, plain functions) and return findings: a check id, the element, its
    box and a sentence;
  - `report.ts` attaches each finding to the test with a crop of the element outlined, so the report shows what's
    wrong, not just where;
  - checks by area: layout (end-of-box gaps, centered labels, icon and text alignment, clipping), contrast (token pairs,
    rendered text through axe-core's color-contrast rule, placeholders, icons, control edges), accessibility (axe-core's rules, visible focus, target size), responsive (320, 768 and
    1200 px, touch) and motion (settled state, reduced motion, no layout shift on hover and press, runtime timings,
    clean exits).
- **The matrix keeps a full run near ten minutes:** layout, accessibility and motion run in each style's default
  theme at 1200 px; contrast in each style's light and dark themes; responsive in each style at 320 and 768 px with
  touch. `UI_PAGE=<name>` and `UI_STYLE=<name>` narrow a run to seconds.
- **Exceptions are written down:** `tests/ui/allow.ts` lists each one with the check, the page, a selector and the
  reason. An exception that no longer matches anything fails, so the list can't go stale.
- **Report first, then enforce:** each area starts as a report (findings listed, the run passes) and turns strict once
  its findings are fixed (M26 to M28). After that, a new finding fails the run.
- **Engines:** Chromium by default. `pnpm check:ui:browsers` adds Firefox and WebKit.

## Options considered

- **Only axe-core:** it covers names, roles and rendered text contrast well, but nothing about spacing, alignment,
  clipping, motion or narrow screens.
- **Stylelint with plugins:** good static rules, but a second linter beside Biome for the few rules iro-ui needs; the
  static check is a short script over the CSS instead.
- **More screenshot tests:** they catch changes, not mistakes, and multiply with every width and engine.
- **Checking only in CI:** iro-ui has no CI; the commands run locally, and `pnpm check:ui` is part of releasing.

## Consequences

- **Easier:** a design slip shows up with a picture before anyone sees it in an app; new components are checked
  without adding anything, since the walker finds their Lab pages.
- **Harder:** a full run takes minutes; heuristic checks (alignment, clipping) need exceptions now and then, each with
  its reason.
- **Dependencies:** `web-features` (data only) and `@axe-core/playwright`, both dev-only.
- **Rules:** `.claude/rules/architecture/ui-checks.md`; `lab.md` asks Lab pages to mark their overlay openers.
