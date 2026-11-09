# ADR-0009: One icon set, drawn two ways

**Status:** Accepted
**Date:** 2026-11-08

## Context

Each app has its own icons. BlomboUI hand-drew about 140 line icons (24 px grid, 1.75 stroke, round caps). UmeSync
uses about 60 filled icons from Phosphor. PrepKit has about 20 small line icons and six chunky filled brand icons. iro-ui
had only 15 internal glyphs, so every app kept its own set, and the same idea (a folder, a refresh) looked different
in each. The two styles also want different icons: kon is BlomboUI's line look, sumi is UmeSync's and PrepKit's filled
look.

## Decision

- **One set, about 190 icons, named by what they show** (`cube`, `braces`, `chip-down`), not by what one app used
  them for. BlomboUI's icons are the base; UmeSync's and PrepKit's ideas that BlomboUI lacks are drawn new.
- **One file per category** in `src/icons/set/` (arrows, status, files, media…). `all.ts` lists the categories in
  order, and the Lab's Icons page groups the set by them, so a new icon's file is also where people look for it.
- **Each icon is one geometry on a 24 px grid, split into parts by role:** `body` (closed outlines), `hole` (openings
  in the body), `cut` (detail lines on the body), `bold` (lines that stand alone) and `slash` (a strike across the
  icon: eye-off, a divider). From it come two drawings:
  - **line:** every part stroked at `--iro-icon-stroke` (kon: BlomboUI's 1.75);
  - **solid:** the body filled, holes and cuts knocked out of it, bold lines stroked heavier. That's the Phosphor
    fill look UmeSync uses, but drawn from our own shapes, so both drawings always show the same picture.
  - A slash clears a gap around itself in both drawings (its own mask), so it stays readable across a filled body.
- **The style picks the drawing through tokens**, like everything else (ADR-0002): `--iro-icon-line` and
  `--iro-icon-solid` are the `display` of each drawing (kon shows line, sumi solid). An icon carries both; no code
  looks at the style.
- **A third entry, `iro-ui/icons`,** exports each icon as plain data (`FolderIcon`: its name and both drawings as SVG
  markup), so apps bundle only the icons they import and non-React apps can use them. React apps draw one with
  `<Icon icon={FolderIcon} />` from `iro-ui`. The solid drawing's mask needs an id unique on the page; it's written as
  `__ID__` in the markup and `Icon` fills it in.
- **The internal glyphs** (check, close, chevrons, status icons) become icons from the set.

## Options considered

- **Phosphor's fill set for sumi** (what UmeSync does): polished and quick, but not ours, and kon and sumi would show
  different pictures for the same name.
- **Two hand-drawn sets:** the most freedom for each look, but twice the drawing, and the sets would drift apart.
- **A name prop with a lookup table** (`<Icon name="folder" />`): shorter to write, but every app would bundle every
  icon. `allIcons` is exported for the few places that need a lookup.

## Consequences

- **Easier:** any app gets the same icons in its style's look, and a new style picks a drawing with two tokens.
- **Harder:** a new icon needs its parts sorted by role, and both drawings checked in the Lab.
- **Public surface:** the `iro-ui/icons` path and its exports, `Icon`, and the tokens `icon-line`, `icon-solid`,
  `icon-stroke`.
- **Rules:** `.claude/rules/architecture/overview.md` (the `src/icons/` module), `components.md` (icons in
  components).
