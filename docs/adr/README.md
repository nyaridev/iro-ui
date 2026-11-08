# Architecture

iro-ui is Nari's React component library with swappable styles. One package: styles are CSS files of `--iro-*`
values, components read only those values, and Base UI supplies the behavior.

## Shape

```text
src/
├─ styles/<style>/     one style: tokens, themes, accents, fonts, flourishes (kon, sumi)
├─ styles/contract.ts  the token names every style defines
├─ root/               IroRoot: data-iro-* attributes and the layer floating parts portal into
├─ components/<name>/  one component: <Name>.tsx, <name>.css, <Name>.lab.tsx, tests
├─ components/shared/  internal helpers: cx(), the small glyphs, popup.css (floating surfaces and option rows)
├─ components.css      imports every component's CSS; each style's index.css imports it
├─ base.css            scrollbars, selection, focus ring, the motion `off` switch (iro.base layer)
├─ motion.css          motion modes: `data-iro-motion` turns any style's motion tokens down
├─ animations.css      shared animations: `data-iro-animate`, `data-iro-shine`
├─ tailwind.css        bridge for Tailwind apps
└─ index.ts            the public API: the only entry apps import
lab/                   Design Lab (Vite, `pnpm lab`): every component in every style
tests/                 contract, API snapshot and tooling tests; visual/ (Playwright screenshots, contrast)
scripts/               repo checks (check-size.ts)
dist/                  the built package, rebuilt only for releases (ADR-0006)
docs/                  adopting.md; adr/ (this overview and the decisions)
```

## Modules

| Module | Owns | May depend on |
|---|---|---|
| `src/styles/<style>/` | one style's raw values, themes, accents, fonts, flourishes | its `@fontsource-variable` fonts |
| `src/styles/contract.ts` | the list of `--iro-*` names | nothing |
| `src/root/` | `IroRoot`, the portal container | React |
| `src/components/<name>/` | one component's markup, behavior and CSS | React, Base UI, `src/root/`, `src/effects/`, `components/shared/`, other components' `<Name>.tsx` and helpers |
| `src/components/shared/` | internal helpers (`cx`, glyphs); never exported | React |
| `src/components.css` | the list of component CSS files | `src/root/`, `src/components/` |
| `src/base.css`, `src/motion.css`, `src/animations.css` | base styles, motion modes, shared animations (ADR-0007) | the contract |
| `src/effects/` | `iro-ui/effects`: backdrop, liquid, reveal, black hole, burst, `motionOf`, and their CSS (ADR-0008) | the DOM only, no React |
| `src/index.ts` | re-exports of the public API | everything in `src/` |
| `src/tailwind.css` | Tailwind names for the tokens | the contract |
| `lab/` | the Design Lab | anything in `src/` |
| `tests/`, `scripts/` | checks | `src/`, `scripts/`, Node |

Nothing in `src/` imports from `lab/`, `tests/` or `scripts/`.

## Decisions

| ADR | Title | Status |
|---|---|---|
| [0001](0001-one-package-css-first.md) | One package, CSS-first | Accepted |
| [0002](0002-styles-as-token-sets.md) | Styles are complete token sets | Accepted |
| [0003](0003-base-ui-for-behavior.md) | Base UI for behavior | Accepted |
| [0004](0004-releases-and-compatibility.md) | Releases that don't break apps | Accepted; install step superseded by 0006 |
| [0005](0005-design-lab-discovery.md) | The Design Lab finds styles and pages itself | Accepted |
| [0006](0006-releases-carry-their-build.md) | Release tags carry the built package | Accepted |
| [0007](0007-motion-modes-and-shared-base.md) | Motion modes, shared animations and a base layer | Accepted |
| [0008](0008-effects-entry.md) | Effects as a second entry, `iro-ui/effects` | Accepted |

## Milestones

| Milestone | Goal | Status |
|---|---|---|
| M0 | Scaffold: repo, build, Lab shell, ADRs, rules, size check | done |
| M1 | Styles: contract, kon and sumi, IroRoot, Tailwind bridge, Lab pickers and Tokens page | done |
| M2 | Basic controls: Button, IconButton, fields, toggles, Segmented, Chip, Badge, Spinner, Progress, Notice, EmptyState | done |
| M3 | Floating layers on Base UI: Tooltip, Popover, Menu, Select, Dialog, Sheet, Toast | done |
| M4 | Layout and data: Tabs, Slider, Splitter, Collapsible, PropertyList | done |
| M5 | v1.0: Lab screenshot tests per style, changelog, adoption guide, first tag | in progress: only the tag left |
| M6 | Base and motion: scrollbars, selection, focus ring, motion modes, shared animations (ADR-0007) | done |
| M7 | Inputs: TextArea grip and auto-grow, ResizeGrip, Select icons and hints, more tab looks, file drops | done |
| M8 | Small widgets: Skeleton, StatusDot, Meter, ProgressRing, Counter, Avatar, CommandPalette, Tour… | done |
| M9 | Effects (`iro-ui/effects`, ADR-0008): backdrop glows and grain, liquid background, open/close reveal, black hole, burst | done |

### M5: v1.0

- [x] 1. Screenshot tests: every Lab page in each style's default and light themes, the Tokens page in every theme
  (`pnpm test:visual`, 128 images in `tests/visual/screenshots/`).
- [x] 2. Contrast check in the same run; sumi's violet fill and four light-theme values were darkened to pass AA.
- [x] 3. `docs/adopting.md`.
- [x] 4. README, `CHANGELOG.md` → `1.0.0`, version `1.0.0`.
- [x] 5. Install tested from a git tag in a scratch app: it led to ADR-0006 (`dist/` ships in the tag).
- [ ] 6. Tag `v1.0.0` and push it, when Nari says so.

### M6: Base and motion

What BlomboUI, PrepKit and UmeSync share beyond controls, found by reading them; M7–M9 bring the rest.

- [x] 1. ADR-0007: motion modes (`data-iro-motion`), shared animations as attributes, a base layer.
- [x] 2. Tokens: `selection`, `ease-bounce`, `travel`, `stagger`, the scrollbar set; the `--iro-index` hook. kon's
  values come from BlomboUI (its `bouncy` spring sampled as `linear()`), sumi's from UmeSync and PrepKit.
- [x] 3. `src/base.css`: scrollbars (kon thin and always shown, sumi a slim pill shown on hover), selection, focus
  ring, the `off` switch.
- [x] 4. `src/animations.css`: pop, reward, fade-up, vanish, flash, pulse, the hover shine, stagger. Dialog,
  popups, toasts, sheets and the checkbox now scale their movement by `travel`, so reduced motion only fades.
- [x] 5. Lab: Base and Motion pages, a Motion picker in the header.
- [x] 6. Tests, screenshots, changelog, docs.

### M7: Inputs

From BlomboUI's `ui/` and PrepKit's file panel.

- [x] 1. ResizeGrip (drag, arrow keys, double-click or Enter to fit; sumi's glows when grabbed) and TextArea on it:
  grows with its text up to `maxRows`, keeps a dragged size until a fit, `mono`, `resizable`.
- [x] 2. Select and MultiSelect options take `icon` and `hint`; a picked option's icon shows in the Select field.
- [x] 3. Tabs: `nav` (BlomboUI's header), `chip` and `folder` looks next to `line` and `pill` (PrepKit's header); a
  tab can carry a `badge`, an on/off checkbox and a menu chevron.
- [x] 4. DropZone (drop or click to pick) and WindowDrop (a full-window overlay while files are dragged over it).
- [x] 5. ScrubField (drag sideways, click to type), MultiSegmented, InlineInput, CopyButton (PropertyList uses it).
  The Slider's number parsing moved to `shared/number.ts` for both.
- [x] 6. Lab pages, tests, screenshots, changelog. The screenshot check now allows 20 differing pixels instead of
  0.2% of each image, which had let a changed Select label pass.

### M8: Small widgets

From BlomboUI's `ui/` and UmeSync's components.

- [x] 1. Skeleton (the shared `pulse`), StatusDot (rings ripple at three paces; sumi adds UmeSync's glossy core and
  heartbeat), CountBubble.
- [x] 2. Meter (Base UI's meter, warning and danger as it fills), ProgressRing, Counter (counts to new values with a
  bump; `shared/motion.ts` reads the motion mode for it).
- [x] 3. Panel, SectionTitle, Divider (Base UI's separator), Veil.
- [x] 4. Avatar (Base UI's avatar, initials on a palette color, ring), StarRating (Base UI's radio group), TreeRow.
- [x] 5. CommandPalette (a Base UI dialog with an inline autocomplete), RangeCalendar (hand-built: Base UI has no
  calendar; day math in `calendar.ts` with a test), Tour (a modal Base UI dialog with a spotlight).
- [x] 6. Lab pages, a batched Playwright check of the new behavior, screenshots, changelog. Components may now use
  another component's helpers (`select/options.ts`), not only its `<Name>.tsx`.

### M9: Effects

UmeSync's and PrepKit's effects, ported from their TypeScript so they and new apps can share one copy.

- [x] 1. ADR-0008: a second entry, `iro-ui/effects`, of plain functions on DOM elements (no React), following the
  motion mode. `motionOf` moved there from `components/shared/`. Tokens: `glow-1`, `glow-2`, `glow-3`,
  `glow-strength`, `grain`, `spark`.
- [x] 2. Backdrop: `mountBackdrop(layer)` (glows, grain, vignette) and the React `<Backdrop>`.
- [x] 3. Liquid: the WebGL2 shader at half resolution and about 30 fps, repainting on a style, theme or accent change;
  left out without WebGL.
- [x] 4. Reveal: `openReveal`, `closeReveal`, `hideForReveal` (circle, rim, liquid warp, invert flash).
- [x] 5. `blackHole` (particles spiralling into a hole, then a flash; the next open unfurls) and `burst` (full motion
  only).
- [x] 6. Lab Effects page, a Playwright check of every effect in every motion mode, screenshots (the liquid masked),
  docs and changelog.

### Later

- An app that offers both styles bundles the component CSS twice (about 15 kB), because each style's `index.css`
  imports `components.css`. A shared `iro-ui/components.css` import would fix it at the cost of a second import line.
- Moving PrepKit, then BlomboUI, onto iro-ui: separate tasks in those apps after v1.0. BlomboUI-only components
  (ModelCard, MaskPainter, RunBar, ImageCompare…) stay in BlomboUI.
- UmeSync (Svelte) could use the CSS layer and `iro-ui/effects` in place of its own copies; it follows the ume
  family's rules, so that's its own decision there.

## Rules

`.claude/rules/architecture/`:

- `overview.md`: the direction, modules, where new things go and the public surface (always loaded).
- `code-organization.md`: file size, section order and dividers for `src/`, `lab/`, `scripts/`, `tests/`.
- `components.md`: how a component is built and added (`src/components/**`).
- `styles.md`: the token contract and how to add a style, theme, accent or token (`src/styles/**`).
