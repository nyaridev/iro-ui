---
paths:
  - "src/styles/**"
  - "src/tailwind.css"
---

# Styles

## A style

- `src/styles/<name>/` holds `index.css`, `tokens.css`, `themes.css`, `accents.css`, and `flourish.css` only when the
  style has decoration. `index.css` holds no rules: the layer order
  (`@layer iro.base, iro.tokens, iro.components, iro.flourish;`), the fonts, then the files with `layer()`
  (`../../base.css` into `iro.base`; `tokens`, `themes`, `accents`, then `../../motion.css` into `iro.tokens`;
  `../../components.css`, `../../animations.css` and `../../effects/effects.css` into `iro.components`; `flourish`
  into `iro.flourish`). Copy `kon/index.css`.
- Motion modes (`src/motion.css`) override the motion tokens for every style; a style sets only its full-motion
  values, and never its own `prefers-reduced-motion` block.
- Raw values (hex, px, font names, easings) live only here. Each style defines every name in
  `src/styles/contract.ts`; `tests/contract.test.ts` fails otherwise.
- Scope everything to the style: `[data-iro-style="<name>"]` for the defaults, and the attributes combined on one
  element for the rest (`[data-iro-style="<name>"][data-iro-theme="light"]`), so several styles can load at once (the
  Lab does). No theme or accent attribute means the defaults, which the Lab calls `default`.
- Values a style shares between its own files but that aren't in the contract are named `--<style>-*` (`--sumi-steel`).
  Colors mixed from other tokens (`accent-soft`, `disabled`) go in a "Derived colors" block, so themes and accents
  carry through.
- Fonts come from `@fontsource-variable/*` packages, imported in `index.css`. Nothing loads from the network.
- `flourish.css` adds decoration only (glows, ornaments), in `@layer iro.flourish`. It never changes layout, sizes or
  which parts show.

## How to add a style

1. Copy `src/styles/kon/` to `src/styles/<name>/` and change the values; keep every name.
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

A **hook** (`--iro-index`) is a name the app sets for iro-ui's CSS to read. It goes in `HOOKS` in the contract,
and styles don't define it.
