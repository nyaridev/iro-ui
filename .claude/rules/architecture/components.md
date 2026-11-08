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
  never hand-roll it. Base UI types never appear in public props.
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
  only fades; never write your own `prefers-reduced-motion` block (motion modes, ADR-0007). A component that animates
  in the way a shared animation does sets `data-iro-animate` instead of new keyframes. The exceptions: steady loops
  (the spinner, unknown progress) and attention cues (flash, shine, pulse) keep fixed timings in every style.
- **Local custom properties** a component sets for itself are named without `iro-` (`--switch-w`, `--badge-ink`), so
  the contract test doesn't take them for tokens.
- **Shared helpers:** `cx()` and the glyphs (check, minus, plus, close, status icons) live in
  `src/components/shared/`. They're internal: never export them. Apps pass their own icons through `icon` props.

## How to add a component

1. Create `src/components/<kebab-name>/` with `<Name>.tsx` (the skeleton in `code-organization.md`) and
   `<kebab-name>.css`. Add `@import "./components/<kebab-name>/<kebab-name>.css";` to `src/components.css`; never
   import CSS from TypeScript.
2. Add `<Name>.lab.tsx`: default-export a component showing every variant, size and state. The Lab finds it; add
   its name to a group in `lab/groups.ts` (until then it's under Other in the sidebar).
3. Add `<Name>.test.tsx` when it has logic of its own (parsing, keyboard handling, value clamping).
4. Export it and its props type from `src/index.ts`, update the API snapshot (`pnpm vitest run -u`), and add a line
   under `## Unreleased` in `CHANGELOG.md`.
5. Check it in the Lab in every style, theme and accent, then run `pnpm check`.
