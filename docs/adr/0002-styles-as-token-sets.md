# ADR-0002: Styles are complete token sets

**Status:** Accepted
**Date:** 2026-11-08

## Context

iro-ui starts with two styles. **blombo** is BlomboUI's look: deep blue-black, flat fills, 4 px corners, quick
springs; the default for web apps. **forge** is the game-forge look UmeSync and PrepKit share: deep ink, glows and
bevels, 10–16 px corners, Cinzel titles, bouncy motion; the default for desktop apps. They differ in far more than
color, and more styles will come. Apps must switch style without touching component code, and each style keeps its
own color variants (BlomboUI's themes and accents, UmeSync's light and dark, PrepKit's steel accent).

## Decision

- **A style is a complete set of `--iro-*` values:** color, type, radius, spacing, control heights, shadows and
  motion. `src/styles/contract.ts` lists every name; each style must define all of them.
- **Three attributes choose the look:** `data-iro-style` (blombo, forge…), `data-iro-theme` (that style's
  light/dark/variant sets) and `data-iro-accent` (that style's accents). Apps set them on `<html>` or with
  `IroRoot`, which also works on a subtree (theme pickers, the Lab's side-by-side view).
- **A style lives in one folder:** `src/styles/<name>/` holds `index.css` (imports the rest and its fonts),
  `tokens.css`, `themes.css`, `accents.css` and an optional `flourish.css`. Apps import
  `iro-ui/styles/<name>.css` for each style they offer.
- **Components never know which style is on.** No style names in TypeScript and no per-style props. A style may add
  decoration (forge's gold frame corners, background glows) in `flourish.css`, scoped to itself, and never changes
  layout or a component's parts.
- **Fonts are bundled** with `@fontsource-variable`, so nothing loads from the network.

## Options considered

- **Colors-only themes with one fixed shape:** can't express forge's radii, fonts and motion.
- **A JS theme object passed through context:** works only in React and costs a re-render to switch; CSS variables
  switch instantly and work in portals and plain HTML.
- **A separate component set per style:** doubles the work for every component and lets the styles drift apart.

## Consequences

- **Easier:** a new style is a new folder; every component and the Lab pick it up with no other change.
- **Harder:** the contract has to name everything a style might change; a component that needs a new value adds it
  to the contract and to every style in the same change.
- **Later:** a third style, more themes or more accents are additions inside `src/styles/` only.
- **Rules:** `.claude/rules/architecture/styles.md`.
