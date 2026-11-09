# ADR-0014: What iro-ui promises: readable, accessible, in every current browser, from phones up

**Status:** Accepted
**Date:** 2026-11-09

## Context

iro-ui grew to 124 components quickly. Each was checked by eye in the Lab, on a desktop, in Chromium. That missed
things: text and icons too faint to read, buttons whose hover box touches their row's edges, 19 px close buttons,
actions that only show on hover (so never on a phone), a CSS feature only Chromium has (`field-sizing`), and not one
container query, so nothing adapts to a narrow screen. Without a written target, "looks fine" is the only bar, and
an automated check (ADR-0015) has nothing to check against.

## Decision

iro-ui promises, for every component, in every style, theme and accent:

- **Accessibility: WCAG 2.2 level AA.**
  - Text: 4.5:1 against what's behind it; 3:1 for large text (24 px, or 18.66 px bold). Placeholders count as
    text. Disabled controls are exempt.
  - Non-text (1.4.11): icons that carry meaning, the edge or fill that shows where a control is, and focus
    indicators: 3:1 against what's next to them.
  - Targets (2.5.8): at least 24 × 24 px, or far enough from other targets that a 24 px circle around each doesn't
    overlap.
  - Focus: every focusable element shows a visible focus indicator, and nothing covers it.
  - Names and roles: every control has an accessible name and valid ARIA.
  - Motion: with reduced motion (the OS setting or `data-iro-motion`), nothing moves; fades stay (ADR-0007).
- **Browsers: Baseline "widely available".** CSS and DOM features that every major engine (Chromium, Firefox,
  WebKit) has shipped for about 2.5 years. A newer feature is allowed only behind `@supports` with a fallback that
  keeps the component usable.
- **Screens: from 320 px wide.** Nothing scrolls sideways at 320 px (WCAG 1.4.10). Components adapt to their
  container, not the window: a component that changes layout uses container queries, at `30rem` (narrow) and
  `48rem` (medium). The Lab and its templates use the same widths.
- **Touch:** under `(pointer: coarse)` nothing is hover-only: anything that appears on hover is shown.
- **Spacing and motion come from tokens:** paddings, margins and gaps use the space tokens (hairlines up to 3 px and
  text-relative `em`/`ch` lengths aside); durations and easings use the motion tokens, except the fixed-timing loops
  and attention cues ADR-0007 names; movement scales with `--iro-travel`, and what turns, slides or loops stops with `--iro-move`.

## Options considered

- **WCAG 2.1 AA:** a little easier (no target size), but 2.2 is the current standard and target size is exactly
  where iro-ui slips.
- **AAA (7:1 text, 44 px targets):** too strict for dense tools like the Lab's own sidebar and data tables; apps that
  need AAA can raise their own tokens.
- **A browserslist query (last 2 versions):** familiar, but says nothing about features. Baseline is defined per
  feature, which is what a CSS check can test.
- **Viewport breakpoints (media queries):** simple, but a component in a narrow sidebar on a wide screen would still
  get its wide layout. Container queries follow the space the component actually has.

## Consequences

- **Easier:** "done" for a component now has a definition, and ADR-0015's checks can test it.
- **Harder:** some current designs fail and must change: faint borders and icons, small close buttons, hover-only
  actions, the one Chromium-only feature.
- **Public surface:** none by itself; the fixes it leads to are visual (patch or minor versions).
- **Rules:** `.claude/rules/architecture/ui-checks.md` carries these promises in short; `components.md` points to it.
