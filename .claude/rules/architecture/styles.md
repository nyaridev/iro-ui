---
paths:
  - "src/styles/**"
  - "src/tailwind.css"
---

# Styles

## A style

- `src/styles/<name>/` holds `index.css` (imports the others and the style's fonts), `tokens.css`, `themes.css`,
  `accents.css`, and `flourish.css` only when the style has decoration.
- Raw values (hex, px, font names, easings) live only here. Each style defines every name in
  `src/styles/contract.ts`; `tests/contract.test.ts` fails otherwise.
- Scope everything to the style's attribute: `[data-iro-style="<name>"]`, themes and accents by `data-iro-theme` and
  `data-iro-accent`, so several styles can load at once (the Lab does). Values sit in `@layer iro.tokens`.
- Fonts come from `@fontsource-variable/*` packages, imported in `index.css`. Nothing loads from the network.
- `flourish.css` adds decoration only (glows, ornaments), in `@layer iro.flourish`. It never changes layout, sizes or
  which parts show.

## How to add a style

1. Copy `src/styles/blombo/` to `src/styles/<name>/` and change the values; keep every name.
2. Add its theme and accent sets, and its fonts as dependencies.
3. Add its entry to the package `exports` (`iro-ui/styles/<name>.css`).
4. Check it in the Lab (it appears in the style picker), run `pnpm check`, and add a changelog line (a minor).

## How to add a theme or accent

1. Add the block to the style's `themes.css` or `accents.css`, overriding only the names that change.
2. Check it in the Lab, and add a changelog line.

## How to add a token

1. Add the name to `src/styles/contract.ts`, with a one-line comment on what uses it.
2. Define it in every style in the same change, and add it to `src/tailwind.css` if it maps to a Tailwind name.
3. Update the API snapshot (`tests/api.test.ts`) and add a changelog line. Renaming a token is a major change
   (`overview.md` → Public surface).
