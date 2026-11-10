# UI checks

What every component promises (ADR-0014) and how the checkers prove it (ADR-0015).

## The promises, in short

- Text 4.5:1 (large text 3:1), placeholders included; icons, control edges and focus rings 3:1.
- Targets at least 24 × 24 px, or spaced so 24 px circles around them don't overlap.
- Every focusable element shows focus; every control has a name; ARIA is valid.
- Nothing moves under reduced motion; durations and easings are motion tokens; movement scales with `--iro-travel`;
  turns, slides, resizes and loops stop with `--iro-move`.
- Spacing is space tokens (hairlines up to 3 px and `em`/`ch` aside).
- Nothing scrolls sideways at 320 px; components that change layout use container queries at `30rem` and `48rem`.
- Nothing is hover-only under `(pointer: coarse)`.
- CSS features are Baseline "widely available", or behind `@supports` with a fallback.

## Running them

| Command | What |
|---|---|
| `pnpm check:css` | The static CSS rules (part of `pnpm check`) |
| `pnpm check:ui` | Every Lab page and template, measured in Chromium (minutes) |
| `UI_PAGE=TreeRow pnpm check:ui` | One page (several: `UI_PAGE=TreeRow,Chip`); `UI_STYLE=kon` for one style |
| `pnpm check:ui:browsers` | The same in Firefox and WebKit |
| `pnpm exec playwright show-report` | The last run's findings, each with a cropped picture (also in `test-results/<test>/`: `findings.json` and `crops/`) |

After changing a component's look, run `UI_PAGE=<it> pnpm check:ui` before finishing; before a release, the full run.

## When a check finds something

- Fix the component. A check is wrong only when the design is deliberate and still keeps the promise in spirit (a
  status dot meant to overlap an avatar's edge).
- Then add an exception to `tests/ui/allow.ts`: the check id, the page (`*` for all), a selector as narrow as
  possible, the looks and engines (`browsers`) if not all, and the reason in one sentence. Never widen a selector to
  silence findings you haven't looked at. An exception for a page that no longer matches anything fails the run.

## Lab pages

- Mark each element that opens an overlay with `data-lab-state`: `"click"`, `"hover"` or `"contextmenu"`. Put it on
  the opener, or on a wrapper (a `Field`, a row) when the component keeps its trigger inside: the walker then uses the
  first control in it, and opens an input with ArrowDown. It measures, then closes with Escape.
- Mark one of a repeated opener (the first card's menu, the first row's context menu), not every copy: each marker
  costs the walker an open and a close. The walker skips markers hidden at its width, so a phone-only menu button is
  checked by the narrow runs.

## How to add a check

- A static rule: a function in `scripts/check-css.ts` with a case in `tests/check-css.test.ts`.
- A runtime check: a function in `tests/ui/measure/<area>.ts` that runs in the page on the `iroUi` helpers
  (`measure/page.ts`: `shown`, `finding`, `painted`, `ratio`…) and returns findings, called from that area's spec. A
  check built on a library runs in Node instead, as `contrast.spec.ts` runs axe-core for text. Give it a check id
  (`layout.end-gap`), start it in report mode, and flip it to strict in `tests/ui/strict.ts` once its findings are
  fixed.
