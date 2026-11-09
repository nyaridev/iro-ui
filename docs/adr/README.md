# Architecture

iro-ui is Nari's React component library with swappable styles. One package: styles are CSS files of `--iro-*`
values, components read only those values, and Base UI supplies the behavior.

## Shape

```text
src/
├─ styles/<style>/     one style: tokens, themes, accents, fonts, flourishes (kami, kon, sumi)
├─ styles/contract.ts  the token names every style defines
├─ root/               IroRoot: data-iro-* attributes and the layer floating parts portal into
├─ components/<name>/  one component: <Name>.tsx, <name>.css, <Name>.lab.tsx, tests
├─ components/shared/  internal helpers: cx(), the small glyphs, popup.css (floating surfaces and option rows)
├─ components/chart/   internal chart parts: tick math, paths, the frame, legend, readout, data table (ADR-0011)
├─ components.css      imports every component's CSS; each style's index.css imports it
├─ base.css            scrollbars, selection, focus ring, the motion `off` switch (iro.base layer)
├─ motion.css          motion modes: `data-iro-motion` turns any style's motion tokens down
├─ animations.css      shared animations: `data-iro-animate`, `data-iro-shine`
├─ tailwind.css        bridge for Tailwind apps
└─ index.ts            the public API: the only entry apps import
lab/                   Design Lab (Vite, `pnpm lab`, ADR-0010): shell/ the kami frame, pages/ its own pages,
                       templates/ example screens; every component in every style, up to four side by side
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
| `src/components/shared/` | internal helpers (`cx`, glyphs); never exported | React, `src/icons/`, `components/icon/` |
| `src/components/chart/` | the charts' shared parts (ADR-0011); never exported | React, `components/shared/` |
| `src/components.css` | the list of component CSS files | `src/root/`, `src/components/` |
| `src/base.css`, `src/motion.css`, `src/animations.css` | base styles, motion modes, shared animations (ADR-0007) | the contract |
| `src/effects/` | `iro-ui/effects`: backdrop, liquid, reveal, black hole, burst, `motionOf`, and their CSS (ADR-0008) | the DOM only, no React |
| `src/icons/` | `iro-ui/icons`: the icon set and its builder (ADR-0009) | nothing |
| `src/index.ts` | re-exports of the public API | everything in `src/` |
| `src/tailwind.css` | Tailwind names for the tokens | the contract |
| `lab/shell/`, `lab/pages/` | the Design Lab's frame and its own pages (ADR-0010) | anything in `src/` |
| `lab/templates/` | example screens built like an app would build them | `src/index.ts`, `src/icons/index.ts`, `src/effects/index.ts` only |
| `tests/`, `scripts/` | checks | `src/`, `scripts/`, Node |

Nothing in `src/` imports from `lab/`, `tests/` or `scripts/`.

## Decisions

| ADR | Title | Status |
|---|---|---|
| [0001](0001-one-package-css-first.md) | One package, CSS-first | Accepted |
| [0002](0002-styles-as-token-sets.md) | Styles are complete token sets | Accepted |
| [0003](0003-base-ui-for-behavior.md) | Base UI for behavior | Accepted (trees: ADR-0013) |
| [0004](0004-releases-and-compatibility.md) | Releases that don't break apps | Accepted; install step superseded by 0006 |
| [0005](0005-design-lab-discovery.md) | The Design Lab finds styles and pages itself | Accepted; neutral frame superseded by 0010 |
| [0006](0006-releases-carry-their-build.md) | Release tags carry the built package | Accepted |
| [0007](0007-motion-modes-and-shared-base.md) | Motion modes, shared animations and a base layer | Accepted |
| [0008](0008-effects-entry.md) | Effects as a second entry, `iro-ui/effects` | Accepted |
| [0009](0009-icons.md) | One icon set, drawn two ways | Accepted |
| [0010](0010-lab-frame-columns-views.md) | The Design Lab: a kami frame, look columns and two views | Accepted |
| [0011](0011-charts.md) | Charts drawn in SVG, with their own colors | Accepted |
| [0012](0012-chat.md) | Chat parts that know nothing of where the words come from | Accepted |
| [0013](0013-tree-keyboard.md) | Trees get their keys by hand, the one exception to Base UI for behavior | Accepted |
| [0014](0014-what-iro-ui-promises.md) | What iro-ui promises: readable, accessible, in every current browser, from phones up | Accepted |
| [0015](0015-ui-checks.md) | Two checkers prove the promises: one reads the CSS, one measures the Lab | Accepted |

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
| M10 | Icons (`iro-ui/icons`, ADR-0009): BlomboUI's, UmeSync's and PrepKit's icons in one set, line in kon, solid in sumi | done |
| M11 | kami, a plain light style, and a Lab that compares up to four looks side by side | done |
| M12 | Lab structure and header: `shell/`, `pages/`, CSS by part, the header at the edge, sun/moon (ADR-0010) | done |
| M13 | Views and templates: Components and Templates tabs, four example screens (ADR-0010) | done |
| M14 | Charts (ADR-0011): line, bar, donut, split bar, sparkline, segmented progress; an Analytics template | done |
| M15 | Tables: DataTable (sorting, selection, nested rows, totals) and Pagination | done |
| M16 | Display: Trend, Stat, AvatarGroup, Breadcrumbs, Timeline, ListItem, Accordion, Stepper, Banner, CodeBlock, Prose (rendered Markdown) | done |
| M17 | Inputs: RadioGroup, Combobox, Autocomplete, DatePicker and a one-day Calendar, TimeField, OtpField, TagInput, ColorPicker, ButtonGroup, Toggle and ToggleGroup, NativeSelect | done |
| M18 | Navigation and overlays: AppSidebar, Menubar, NavigationMenu, HoverCard, AlertDialog, Drawer (from the bottom, drag to close), Toolbar, Carousel, ScrollArea | done |
| M19 | Chat (ADR-0012): Message and Bubble, Conversation (stays at the bottom while text streams in), PromptInput, Attachment, Suggestion, Reasoning and tool steps, Sources and citations, Plan and Queue, Confirmation, Shimmer, Marker, Questionnaire, a usage meter | done |
| M20 | Developer views: Terminal, Snippet, StackTrace, TestResults, FileTree, Commit, PackageInfo, EnvironmentVariables, SchemaView, WebPreview | done |
| M21 | Media and voice: AudioPlayer, SpeechInput, Transcription, Image (loading and failed states), Lightbox | done |
| M22 | Gaps: FileTree keys (ADR-0013), BranchPicker, AlertDialog async confirm, WebPreview back and forward, EnvironmentVariables editing | done |
| M23 | UI checks (ADR-0014, ADR-0015): the walker, report and exceptions; static CSS rules; layout and contrast checks, reporting | done |
| M24 | Accessibility (axe-core, focus, targets, names) and responsive (320, 768, 1200 px, touch) checks, reporting | done |
| M25 | Motion checks: settled state, reduced motion, layout shift on hover and press, runtime timings, clean exits | done |
| M26 | Fix the contrast, spacing and alignment findings; those checks turn strict | done |
| M27 | Fix phones and accessibility: container queries, 24 px targets, nothing hover-only on touch; strict | done |
| M28 | Fix the motion findings; Firefox and WebKit runs; every check strict | done |

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

### M10: Icons

BlomboUI's 140 line icons, plus what UmeSync and PrepKit use that BlomboUI lacked, in one set of 191 in 23
categories.

- [x] 1. ADR-0009: one geometry per icon, split by role, drawn two ways; tokens `icon-line`, `icon-solid`,
  `icon-stroke`; a third entry, `iro-ui/icons`, of plain data.
- [x] 2. The builder (`src/icons/icon.ts`) and `<Icon>`, with a unique mask id per use.
- [x] 3. BlomboUI's icons, renamed by what they show (`cube`, `braces`, `chip-down`).
- [x] 4. New in the same hand: branch, plug, robot, wrench, monitor, server, gamepad, droplet, rocket, cursor, chat,
  flag, volume, pixel and more.
- [x] 5. The internal glyphs are icons from the set, so sumi's are solid.
- [x] 6. Lab Icons page (filter, sizes, both drawings side by side), tests for the set's rules, an export snapshot,
  screenshots; one icon bundles alone (4.4 kB).
- [x] 7. Review: one file per category, grouped on the Icons page with a category picker; a `slash` role for
  eye-off and dividers; rows, mosaic, stack, store, compare and broom redrawn so the solid drawing reads; 35 common
  icons added (menu, mail, send, share, key, shield, bookmark, loader, cloud, wifi, map-pin, table, bug…).

### M11: kami and comparison columns

- [x] 1. **kami** (`src/styles/kami/`): the system font a size up, high-contrast neutrals, clear borders, 6 px
  corners, flat cards, one soft shadow under popups, no glows, grain or flourish, line icons at stroke 2, short fades
  with no overshoot or press squash. Default light, a `dark` theme, kon's eight accents.
- [x] 2. The Lab shell (header, sidebar, column headers) is always drawn in kami, and pages open in kami.
- [x] 3. Columns: each has its own Style, Theme, Accent and Motion pickers and its own IroRoot; **+** adds one (up to
  four, starting on a style not shown yet), × removes one. They scroll together, and the URL keeps them as
  comma lists (`?style=kami,sumi&theme=default,light`), so single-style links still work.
- [x] 4. Pages that act on the whole window: the first command palette takes Ctrl K; with several columns, toasts
  and the file-drop overlay stay in their own column.
- [x] 5. Contrast and screenshot tests read the first column and cover dark themes; docs, changelog, banner.

### M12: Lab structure and header

- [x] 1. Move the frame into `lab/shell/` and the Lab's own pages into `lab/pages/`; the header gets its own file.
- [x] 2. Split `lab.css` by part (`shell/*.css`, `kit.css`, one per page); `lab.css` only imports them. Screenshots
  stay the same. On narrow windows each column's padding shrinks (the stage's leftover padding from M11 is gone).
- [x] 3. Header: the left side at the edge, in line with the sidebar; a sun/moon on the right that follows the
  system until clicked, remembered per browser, and forgotten when clicked back to the system's own scheme
  (`shell/scheme.ts`).
- [x] 4. Biome fails on a template importing past the public entries, and on `src/` importing `lab/`.
- [x] 5. Done checks.

### M13: Views and templates

- [x] 1. Views: **Components | Templates** tabs in the middle of the header; the view goes in the URL
  (`?view=templates&page=dashboard`), and each view remembers its page.
- [x] 2. Templates are found from `lab/templates/*/*.template.tsx`; the sidebar lists the current view's pages, with
  the same filter.
- [x] 3. Four templates, from the public entries only: **Dashboard** (stat tiles, activity, usage, notices),
  **Settings** (a section list, profile and preference fields, a danger zone with a dialog), **Files** (a folder tree,
  a toolbar, item tiles, a drop zone, a status bar) and **Sign in** (a centered card).
- [x] 4. A template fills its column's height and still works in two columns.
- [x] 5. Screenshots of every template in each style's default and light or dark theme (24 images); README; done
  checks.

### M14: Charts

- [x] 1. ADR-0011, chart tokens `chart-1` to `chart-8` in every style (checked for color-blind separation and
  contrast on each surface), and the shared parts in `src/components/chart/`.
- [x] 2. `LineChart` (lines or areas, smooth or straight, dashed series, points), `BarChart` (vertical or horizontal,
  grouped or stacked) and `Sparkline`.
- [x] 3. `DonutChart` (center label, legend with values and shares), `ShareBar`, and `ProgressBar`'s `segments`.
- [x] 4. Lab pages, a Charts group, and an **Analytics** template; the Dashboard template's bars fixed (they were
  given percentages where `ProgressBar` takes 0 to 1).
- [x] 5. Screenshots, the chart colors in the contrast check, changelog, done checks.

### M15: Tables

- [x] 1. `DataTable`: columns (header, cell, alignment, width), sorting by header with `aria-sort`, row checkboxes
  with select-all, a header that stays put when the table has a height.
- [x] 2. Nested rows that expand (a run tree), a totals footer, an empty state and loading rows.
- [x] 3. `Pagination`: rows per page, page numbers with gaps, previous and next, "1–5 of 13".
- [x] 4. Lab pages in a Data group, and the Files template's list view on `DataTable`.
- [x] 5. Screenshots, changelog, done checks.

### M16: Display

- [x] 1. `Stat` and `Trend`; the Analytics and Dashboard templates' stat tiles use them.
- [x] 2. `AvatarGroup`, `Breadcrumbs` (the Files template's path) and `Stepper`.
- [x] 3. `Timeline` and `ListItem`.
- [x] 4. `Accordion` and `Banner`.
- [x] 5. `CodeBlock` (no coloring of its own; apps pass colored lines) and `Prose` (styles only, no parser).
- [x] 6. Lab pages in the Display, Content, Navigation and Layout groups; screenshots, changelog, done checks.

### M17: Inputs

- [x] 1. `RadioGroup` (Base UI's radio group), `Autocomplete` (Base UI's autocomplete, any text) and `NativeSelect`.
- [x] 2. `Calendar` and `DatePicker`, sharing RangeCalendar's day math and styles; `TimeField` on the browser's
  time input.
- [x] 3. `OtpField` (Base UI's OTP field), `TagInput` and `ButtonGroup`.
- [x] 4. `ColorPicker`, hand-built (Base UI has none), with its color math tested.
- [x] 5. Combobox, Toggle and ToggleGroup need nothing new: `Select` filters as you type, `Button` has `pressed`,
  `IconButton` has `active`, `Segmented` and `MultiSegmented` pick one or many.
- [x] 6. Lab pages in the Inputs group and a new Dates group; screenshots, changelog, done checks.

### M18: Navigation and overlays

- [x] 1. `AppSidebar` (folds to icons with tooltips), `Menubar` (Base UI's menubar with Menu's rows),
  `NavigationMenu` (Base UI's navigation menu) and `Toolbar` with its button and separator.
- [x] 2. `AlertDialog` (Base UI's alert dialog on Dialog's window), `Drawer` (Base UI's drawer, swipe down) and
  `HoverCard` (Base UI's preview card).
- [x] 3. `Carousel` on CSS scroll snap, `ScrollArea` on Base UI's scroll area.
- [x] 4. Fixed in passing: the dialog backdrop's class clashed with the effects' `Backdrop`; it's
  `iro-dialog-backdrop` now.
- [x] 5. Lab pages in the Navigation, Overlays and Layout groups; screenshots, changelog, done checks.

### M19: Chat

- [x] 1. ADR-0012 and a Chat section in `components.md`.
- [x] 2. `Message`, `Conversation` (hand-built scroll-follow), `PromptInput` (on TextArea), `Attachment`,
  `Suggestions`.
- [x] 3. `Reasoning` and `ToolCall` (Base UI's collapsible), `Sources` and `Citation` (on HoverCard), `Plan`,
  `Queue`.
- [x] 4. `Confirmation`, `Questionnaire` (on RadioGroup and Checkbox), `Shimmer`, `Marker`, `UsageMeter`.
- [x] 5. A Chat template with a fake answer that thinks, then streams; messages sent meanwhile queue.
- [x] 6. Lab pages in a Chat group; screenshots, changelog, done checks.

### M20: Developer views

- [x] 1. `Terminal` (follows new lines unless scrolled up) and `Snippet`, both with CopyButton.
- [x] 2. `StackTrace` with `parseStack` (V8 and Firefox/Safari traces, tested); internal frames fold.
- [x] 3. `TestResults` and `Commit` (Base UI's collapsible), `PackageInfo` (on Snippet, PropertyList and Badge).
- [x] 4. `FileTree` on TreeRow. Base UI has no tree, so rows are buttons in reading order and Tab walks them; no
  arrow-key moves.
- [x] 5. `EnvironmentVariables` (read-only), `SchemaView`, `WebPreview` (sandboxed: scripts run, the app's origin
  stays out of reach).
- [x] 6. Lab pages in a Developer group; screenshots, changelog, done checks.

### M21: Media and voice

- [x] 1. `AudioPlayer` (on the audio element and Slider) with a tested `clock` helper; `audioRef` reaches the element.
- [x] 2. `Transcription`: the segment being heard follows `currentTime`; times seek through `onSeek`.
- [x] 3. `SpeechInput` on the browser's speech recognition (typed locally: TypeScript's DOM types lack it); a fixed
  ring pulses while listening, as an attention cue.
- [x] 4. `Image` (Skeleton while loading, alt text on failure) and `Lightbox` (Base UI's dialog; empty space passes
  clicks to the backdrop, which closes it).
- [x] 5. Lab pages in a Media group, with a generated tune and drawn pictures so they need no files or network;
  screenshots, changelog, done checks.

### M22: Gaps

- [x] 1. ADR-0013 and the exception in `components.md` → Behavior.
- [x] 2. FileTree keys (`file-tree/keys.ts`, tested); TreeRow takes the tree's roles through `buttonProps`.
- [x] 3. `BranchPicker`; the Chat template's first answer has two versions. Message keeps a picker visible among
  actions that wait for hover.
- [x] 4. AlertDialog waits for an async `onConfirm`: busy, Escape and Cancel held, open again on failure.
- [x] 5. WebPreview back and forward, through the addresses it has shown (not links inside the page).
- [x] 6. EnvironmentVariables editing (`nameProblem`, tested); secrets stay masked in their fields, with the eye
  inside.
- [x] 7. Lab pages, screenshots, changelog, done checks.

### M23: UI checks, part one

- [x] 1. ADR-0014 and ADR-0015, `ui-checks.md`, and lines in `components.md`, `lab.md`, `overview.md`, `AGENTS.md`.
- [x] 2. `tests/ui/`: the walker, report and exceptions; `pnpm check:ui` with `UI_PAGE` and `UI_STYLE`. Overlay
  openers in 22 Lab pages carry `data-lab-state`; a finding's crop lands in the HTML report and in
  `test-results/<test>/crops/`, its list in `findings.json`.
- [x] 3. `scripts/check-css.ts` with tests: spacing, motion tokens, travel, layout-property transitions, Baseline.
- [x] 4. Layout checks: end-of-box gaps, centered labels (cap height), icon and label alignment, clipping, text
  outside its box, near-miss alignment in stacked text.
- [x] 5. Contrast checks: the token pairs moved from `tests/visual/` (`tests/ui/tokens.spec.ts`), rendered text
  through axe-core's color-contrast rule (brought forward from M24), placeholders, icon-only controls, control edges.
- [x] 6. A first full report, triaged below; one exception (the palette's search row). Docs and done checks.

**First report** (2026-11-09; a full run takes about a minute): `pnpm check:css` 45 findings, `pnpm check:ui` 688
(one per page, look and element), from these causes. Each is fixed in the milestone named, or becomes an exception
with its reason.

- M26, contrast: the muted text color fails 4.5:1 on raised surfaces, fields and menus (Calendar days, TreeRow meta,
  menu shortcuts, CommandPalette hints, Tour count, TestResults, Terminal comments, Transcription times, InlineInput,
  DatePicker and MultiSelect placeholders); every placeholder sits at 3.95:1 to 4.2:1; success text on its soft fill
  at 4.49:1; danger button text in kon and sumi light at 4.01:1; CountBubble's white on its dark-theme fill at 2.5:1;
  kon light's selected rows (Chip count, ListItem meta) near 3.7:1; SchemaView methods 4.16:1; the Base page's plain
  input placeholder 2.43:1; the Icons page count 4.26:1.
- M26, control edges: field frames (TextField, Select, TextArea, NumberField, OtpField, ScrubField, Segmented,
  MultiSelect, TagInput) reach 1.3:1 to 1.43:1; Checkbox, Radio and Switch when off 2.0:1 to 2.2:1; InlineInput has
  none at rest; WebPreview's address bar and EnvironmentVariables rows 1.36:1. Tabs' overflow menu icon 2.91:1 in
  the light themes.
- M26, layout: Select and MultiSelect check marks sit 2 to 3 px high; Plan's marks 2 px high; Notice's icon and text
  in sumi 2.5 px apart; CodeBlock's copy button off centre in a one-line block; StackTrace's header text sits at the
  top of a taller header; a Dashboard list in sumi starts 2.8 px off its column. Static: three raw spacing values.
- M27: `field-sizing` and `background-clip: text` without `@supports` fallbacks (and the rest of the Baseline
  findings).
- M28: 12 raw motion timings, 7 movements that ignore `--iro-travel`, 20 transitions or keyframes on layout
  properties.

### M24: UI checks, part two

- [x] 1. `a11y.spec.ts`: axe-core's WCAG 2.2 A and AA rules, each its own check (`a11y.<rule>`); target size is
  axe's `target-size` (24 px, or spaced apart), so there's no second implementation.
- [x] 2. Focus: every element Tab reaches changes how it, its parent, grandparent or a child looks (`a11y.focus`),
  and a ring (outline or box-shadow) reaches 3:1 (`a11y.focus-contrast`). Visually hidden elements don't count: an
  outline nobody sees isn't focus.
- [x] 3. `responsive.spec.ts` at 320 and 768 px on a touch screen: nothing runs past the screen's edge
  (`responsive.overflow`), nothing invisible until hovered (`responsive.hover-only`). The Lab's frame no longer grows
  wider than a phone (its header keeps the sidebar button and the view tabs below 600 px).
- [x] 4. `check-css` rule `container`: component CSS follows its container at 30rem and 48rem, never the window.
- [x] 5. A first report, triaged below. Docs and done checks.

**First report** (2026-11-09; about 40 seconds for both): `a11y` 127 findings, `responsive` 58, from these causes.

- M27, accessibility: Slider (and AudioPlayer, Transcription) shows no keyboard focus: its ring targets the thumb,
  but focus lands on the hidden input inside it. Tabs' panels and ColorPicker's selected swatch show nothing on
  focus; MultiSelect's options and the CommandPalette input need a look. OtpField's boxes and TagInput's input have
  no label; DatePicker's trigger and Veil's cover name themselves differently from their text. Tabs' list holds its
  disabled overflow button where only tabs may be. Carousel's dots (20 × 8), Tabs' overflow button (20 × 20),
  StackTrace's frame links and Sources' links are under 24 px. Carousel's track, Snippet's code and the Base page's
  scroll box scroll without being focusable. Select, Autocomplete and NavigationMenu put focusable parts inside
  `aria-hidden` (Base UI's hidden inputs and guards: fix or exception, with a reason).
- M27, phones: Message's actions are invisible on touch screens; at 320 px MultiSegmented, NavigationMenu, Tour,
  OtpField, Image and Analytics' data table run past the edge, and so do the Lab's demo rows on the Divider,
  SectionTitle, Skeleton, Tour and Base pages (fixed widths where a maximum would do).

### M25: UI checks, part three

- [x] 1. `motion.spec.ts` with full motion: every finite animation lasts a duration token (`motion.timing`; a
  transition is held to its declared duration, since one reversed midway runs shorter); once animations end,
  everything sits where it does with motion off (`motion.settled`; loops left out); hover, press (released away, so
  nothing is clicked) and focus don't change the layout around a control (`motion.shift`).
- [x] 2. With the system asking for reduced motion (motion `system`): nothing that animates changes place, size or
  transform (`motion.reduced`, sampled 60 ms apart).
- [x] 3. Clean exits: once an overlay closes, nothing of it stays (`motion.exit`; a tooltip focus brings back and
  toasts, which leave on their own time, aside). The walker takes measures to run after each close.
- [x] 4. A first report, triaged below. Docs and done checks.

**First report** (2026-11-09; about 80 seconds): `motion` 101 findings, from these causes.

- M28, timings: the chart reveals (`iro-chart-draw`, `iro-bar-chart-grow`, `iro-donut-chart-in`, 480 ms in LineChart,
  Sparkline, Stat, ShareBar, BarChart, DonutChart) aren't tokens; the liquid backdrop's `iro-liquid-in` (1200 ms) and
  the shared `iro-flash` (1100 ms) are fixed timings that need their exception.
- M28, reduced motion: spinners (Spinner, Button, IconButton, Plan, Chat) and the indeterminate ProgressBar keep
  moving, StatusDot's ring keeps scaling, Select's and MultiSelect's chevrons and NavigationMenu's icon turn,
  Segmented's thumb slides.
- M28, the rest: a MultiSelect option moves 1 px when focused; MultiSelect leaves part of its popup behind after
  closing; WindowDrop stays open on Escape (its overlay follows a drag: likely an exception).

### M26: Contrast, spacing and alignment

- [x] 1. The `--iro-edge` token for the resting edge of fields and toggles (3:1 on every surface, in every style and
  theme), used by every field and toggle, with `--iro-fg-4` under the pointer. `tests/ui/tokens.spec.ts` checks it.
- [x] 2. `--iro-fg-4` at 4.5:1 on every surface (kon and sumi: `var(--iro-fg-3)`); kon's `--iro-fg-3` a step
  lighter; palette inks fitted to wells and their tints; placeholders in the base layer. The token test now covers
  `fg-4` and the hovered and sunken surfaces.
- [x] 3. Component fixes: CountBubble, muted text on tints (Chip, ListItem, Trend), the option check, Plan, Notice,
  StackTrace, CodeBlock; spacing as tokens in CountBubble, Reasoning and Terminal.
- [x] 4. The checks learned from the fixes: an edge belongs to the closest box that draws itself, a checked toggle
  is judged by its mark, a star by its icon; centred initials don't start a line.
- [x] 5. Exceptions: InlineInput's resting edge, the Base page's plain input. `layout`, `contrast` and the CSS
  `spacing` rule are strict. Screenshots updated, docs, done checks.

### M27: Phones and accessibility

- [x] 1. Focus: Slider's thumb shows the focus of the input inside it; Tabs' panels, the picked ColorPicker swatch
  and focused options show it; the focus check measures a ring against what surrounds it.
- [x] 2. Names: OtpField's boxes (the first through a hidden label, as Base UI asks), TagInput through Base UI's
  input, DatePicker's and Veil's names include their text.
- [x] 3. Targets and scrolling: Carousel's dots, Tabs' chevron, StackTrace's and Sources' links at 24 px;
  Carousel's track, Snippet's code and the Base page's box reachable by keyboard.
- [x] 4. Phones: Message's actions on touch, MultiSegmented and NavigationMenu wrap, OtpField and Tour fit 320 px,
  the chart table hides in a box; Lab demos take `maxWidth`. Baseline: Shimmer and InlineInput behind `@supports`.
- [x] 5. Exceptions: Base UI's hidden siblings and focus guards (Select, Autocomplete, NavigationMenu), Tabs' checkbox
  and chevron inside the tab list, the CommandPalette input. `a11y`, `responsive` and the CSS `container` and
  `baseline` rules are strict. Screenshots, docs, done checks.

### M28: Motion, and Firefox and WebKit

- [x] 1. The `--iro-move` token (1, or 0 when motion only fades). What slides, turns or resizes on a state change
  scales its duration by it, so it snaps under reduced motion: chevrons, Switch's thumb, Segmented's and Tabs'
  indicators, opening panels, ProgressBar and Meter fills, AppSidebar, Carousel's dots, Tour, NavigationMenu. The CSS
  `layout-transition` rule now asks for that instead of transforms.
- [x] 2. Loops and cues keep their fixed timings, marked in the CSS, and move only by `--iro-move`: with it at 0
  Spinner, the indeterminate ProgressBar (full width) and Shimmer pulse in place, StatusDot's ring only fades, and
  `data-iro-shine` drops its sweep without a media query of its own. A `fixed timing` note no longer excuses movement.
- [x] 3. The checks learned: a parent that turns positioned isn't a shift, a closed list Base UI keeps mounted but
  hidden isn't a leftover, and an exception goes stale only in runs that make its check. Exceptions: the chart
  reveals (three slow durations), flash and the liquid backdrop (fixed timings), WindowDrop (no close on Escape).
- [x] 4. WebKit: the checks read the same there. An identity transform isn't movement, focus is checked as Tab shows
  it (`focusVisible`), the settled check waits for transitions to start, the shift check hands focus back, and an
  overlay still entering isn't hover-only. Exceptions can name engines (`browsers`): WebKit's own button on the Base
  page. The token tests get two minutes. Firefox isn't checked yet: Playwright's Firefox 159 build doesn't start on
  Windows 11 build 26200 (a side-by-side error on `mozglue`, the same after a clean reinstall).
- [x] 5. Every UI check and CSS rule strict. Tokens screenshots updated, docs, done checks.

M16 to M21 come from comparing iro-ui with shadcn/ui's components and AI Elements (2026-11-09): what an app of any
kind is likely to need and iro-ui doesn't have. Example content stays generic: no model or product names.

### Later

- An app that offers both styles bundles the component CSS twice (about 15 kB), because each style's `index.css`
  imports `components.css`. A shared `iro-ui/components.css` import would fix it at the cost of a second import line.
- Moving PrepKit, then BlomboUI, onto iro-ui: separate tasks in those apps after v1.0. BlomboUI-only components
  (ModelCard, MaskPainter, RunBar, ImageCompare…) stay in BlomboUI.
- UmeSync (Svelte) could use the CSS layer and `iro-ui/effects` in place of its own copies; it follows the ume
  family's rules, so that's its own decision there.
- Bigger pieces, each worth its own decision when an app needs it: a workflow canvas (nodes and edges with pan and
  zoom), heatmap and scatter charts, long lists that render only what's on screen, lists reordered by dragging, a
  kanban board, and right-to-left text across every component.

## Rules

`.claude/rules/architecture/`:

- `overview.md`: the direction, modules, where new things go and the public surface (always loaded).
- `code-organization.md`: file size, section order and dividers for `src/`, `lab/`, `scripts/`, `tests/`.
- `components.md`: how a component is built and added (`src/components/**`).
- `styles.md`: the token contract and how to add a style, theme, accent or token (`src/styles/**`).
- `lab.md`: the Design Lab's layout, imports and how to add a Lab page, template or frame feature (`lab/**`).
