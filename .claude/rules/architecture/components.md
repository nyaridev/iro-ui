---
paths:
  - "src/components/**"
  - "src/index.ts"
---

# Components

## Building one

- **Values only:** colors, radii, shadows, fonts, durations and easings come from `var(--iro-*)`. No raw values in
  component CSS; if the contract lacks one, add a token (`styles.md`).
- **Same in every style:** never branch on the style in TypeScript and never add a per-style prop. Style-specific
  decoration belongs in that style's `flourish.css`.
- **Behavior:** anything with focus management, keyboard patterns or a floating layer wraps `@base-ui/react` parts;
  never hand-roll it. Base UI types never appear in public props.
- **Markup and CSS:** the root element has class `iro-<name>`, parts `iro-<name>-<part>`. Variants and sizes are data
  attributes (`data-variant`, `data-size`); states use Base UI's (`data-open`, `data-checked`, `data-disabled`). All
  CSS sits in `@layer iro.components`.
- **Props:** accept `className` and pass other props to the root element (`ref` included, as a React 19 prop).
  Icon-only controls require a `label`.
- **Floating layers** portal into `IroRoot`'s container, so they keep the subtree's style.
- **Motion:** enter and exit with CSS transitions on `data-starting-style` / `data-ending-style`, using the motion
  tokens. Respect `prefers-reduced-motion`.

## How to add a component

1. Create `src/components/<kebab-name>/` with `<Name>.tsx` (the skeleton in `code-organization.md`) and
   `<kebab-name>.css`, imported by `<Name>.tsx`.
2. Add `<Name>.lab.tsx`: default-export a component showing every variant, size and state. The Lab finds it.
3. Add `<Name>.test.tsx` when it has logic of its own (parsing, keyboard handling, value clamping).
4. Export it and its props type from `src/index.ts`, and add a line under `## Unreleased` in `CHANGELOG.md`.
5. Check it in the Lab in every style, theme and accent, then run `pnpm check`.
