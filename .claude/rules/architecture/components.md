---
paths:
  - "src/components/**"
  - "src/index.ts"
---

# Components

## Building one

- **Values only:** colors, radii, shadows, fonts, durations and easings come from `var(--iro-*)`. No raw values in
  component CSS (the contract test fails on hex and `rgb()` colors); if the contract lacks one, add a token
  (`styles.md`).
- **Same in every style:** never branch on the style in TypeScript and never add a per-style prop. Style-specific
  decoration belongs in that style's `flourish.css`.
- **Behavior:** anything with focus management, keyboard patterns or a floating layer wraps `@base-ui/react` parts;
  never hand-roll it. Base UI types never appear in public props. The one exception is the tree pattern (Base UI has
  none): `FileTree` and its tested `file-tree/keys.ts` (ADR-0013). Another hand-built pattern needs its own ADR.
- **Markup and CSS:** the root element has class `iro-<name>`, parts `iro-<name>-<part>`. Variants and sizes are data
  attributes (`data-variant`, `data-size`); states use Base UI's (`data-open`, `data-checked`, `data-disabled`).
  Component CSS has no `@layer` of its own: `src/components.css` is imported into `iro.components`.
- **Props:** accept `className` and pass other props to the root element (`ref` included, as a React 19 prop).
  Icon-only controls require a `label`.
- **Floating layers** portal into `useIroLayer()` (the nearest `IroRoot`'s layer), so they keep the subtree's style.
  Their surface uses `iro-popup` (and `iro-popup-list`, `iro-option`… for rows) from `shared/popup.css`; the
  positioner gets `iro-positioner`. Stacking: dialogs and sheets 40, popups 50, toasts 60.
- **Triggers** are passed as an element (`trigger={<Button>…</Button>}`) and given to Base UI's `render`, so any
  iro-ui control can open a popup.
- **Motion:** enter and exit with CSS transitions on `data-starting-style` / `data-ending-style`, using the motion
  tokens. Scale every movement by `--iro-travel` (`translateY(calc(12px * var(--iro-travel)))`), so reduced motion
  only fades; never write your own `prefers-reduced-motion` block (motion modes, ADR-0007). A part that slides, turns
  or resizes on a state change (a chevron, a thumb, an indicator, a panel) scales its duration by `--iro-move`
  (`calc(var(--iro-dur) * var(--iro-move))`), so it snaps when motion only fades. A component that animates in the way
  a shared animation does sets `data-iro-animate` instead of new keyframes. The exceptions: steady loops (the spinner,
  unknown progress) and attention cues (flash, shine, pulse) keep fixed timings in every style, marked with a `fixed
  timing` comment; a loop moves only by `--iro-move` and pulses in place when it is 0.
- **Local custom properties** a component sets for itself are named without `iro-` (`--switch-w`, `--badge-ink`), so
  the contract test doesn't take them for tokens.
- **Shared helpers:** `cx()` and the glyphs (check, minus, plus, close, status icons) live in
  `src/components/shared/`. They're internal: never export them. Apps pass their own icons through `icon` props.
- **Promises (ADR-0014, `ui-checks.md`):** 24 px targets, 3:1 icons and control edges (`--iro-edge` for a field's
  or toggle's resting edge), text in `--iro-fg-4` or stronger, a visible focus ring, nothing hover-only under
  `(pointer: coarse)`, container queries (`30rem`, `48rem`) when a component changes layout, Baseline CSS. Check
  with `UI_PAGE=<Name> pnpm check:ui`.
- **Icons** a component draws come from the set (`src/icons/`), through a glyph or `<Icon>`, never as inline
  `<svg>`, so they follow the style's drawing (ADR-0009). An icon the set lacks is added to it first.

## Charts

- Charts are SVG built on `src/components/chart/` (ADR-0011): its frame gives the legend, the hover and arrow-key
  readout and the hidden data table, so a new chart only draws its marks.
- Series colors come from `--iro-chart-1` to `-8` in order, or the series' own `color`. Text (axis, legend,
  readout) uses text tokens, never a series color. One y axis, always.
- A chart with a value axis takes `axis?: ChartAxis` and builds its scale and tick labels with `valueAxis()` from
  `chart/scale.ts`, so every axis chart reads the same options. `format` stays for values (tips, readout, table).
- Marks: 2 px lines, 10% area wash, bars at most 24 px thick with a 4 px rounded end and square base, 2 px surface
  gaps between touching parts, markers ringed in the surface color, 1 px solid gridlines.
- Two or more series get a legend; one series doesn't (the title names it).

## Chat

- Chat parts (ADR-0012) take plain props and React nodes: never an AI SDK's types, never a model or vendor name.
  They don't parse text; apps put rendered Markdown in `Prose` and code in `CodeBlock`.
- Parts that change while an answer streams take `streaming`; `Conversation` owns the scroll-follow.

## How to add a component

1. Create `src/components/<kebab-name>/` with `<Name>.tsx` (the skeleton in `code-organization.md`) and
   `<kebab-name>.css`. Add `@import "./components/<kebab-name>/<kebab-name>.css";` to `src/components.css`; never
   import CSS from TypeScript.
2. Add `<Name>.lab.tsx`: default-export a component showing every variant, size and state. The Lab finds it; add
   its name to a group in `lab/shell/groups.ts` (until then it's under Other in the sidebar).
3. Add `<Name>.test.tsx` when it has logic of its own (parsing, keyboard handling, value clamping).
4. Export it and its props type from `src/index.ts`, update the API snapshot (`pnpm vitest run -u`), and add a line
   under `## Unreleased` in `CHANGELOG.md`.
5. Check it in the Lab in every style, theme and accent, run `UI_PAGE=<Name> pnpm check:ui`, then `pnpm check`.
