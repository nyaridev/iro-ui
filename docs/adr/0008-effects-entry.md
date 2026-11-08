# ADR-0008: Effects as a second entry, `iro-ui/effects`

**Status:** Accepted
**Date:** 2026-11-08

## Context

UmeSync and PrepKit have effects that go past CSS animations: a window backdrop of soft glows, film grain, a vignette
and a flowing "liquid" WebGL shader; windows that open from their centre with a glowing rim while the content settles
from a liquid warp, and close the same way backwards; a minimise that breaks the window into particles spiralling
into a black hole; a sparkle burst for rewards. They're written in TypeScript against the DOM, driven frame by frame,
and they follow the app's motion setting. Every new app would copy them, and the copies would drift.

## Decision

- **A second entry, `iro-ui/effects`,** holds the effects as plain TypeScript functions that act on a DOM element:
  `mountBackdrop(layer, { liquid })`, `openReveal(node)`, `closeReveal(node)`, `blackHole(node, { almostGone })`,
  `burst(node)`, and `motionOf(element)`. They import nothing from React, so a Svelte app (UmeSync) or plain page uses
  the same code. React apps get one wrapper from `iro-ui`: `<Backdrop liquid />`. The other effects are calls on a
  ref; they need no component.
- **They follow the motion mode** (ADR-0007) of the element's root, read with `motionOf`: `full` plays everything,
  `smooth` a shorter and calmer version, `reduced` only fades, `off` jumps to the end. The burst plays only in `full`.
  The liquid flows at full speed, 0.6 in `smooth`, and holds one still frame in `reduced` and `off`.
- **Colours come from tokens.** A new group: `glow-1`, `glow-2`, `glow-3` (the backdrop's glow colours),
  `glow-strength` (how strongly they show), `grain` (the film grain's opacity) and `spark` (the burst and the reveal
  rim). Effects resolve them inside the element, so the theme and accent apply, and the liquid repaints when the root's
  style, theme or accent changes.
- **The liquid is optional.** It's one WebGL2 fragment shader at half resolution, about 30 frames a second, paused with
  the page. Without WebGL the canvas is left out and the glows remain.
- **Their CSS** (`src/effects/effects.css`) is in every style, like the shared animations, so the effects need no
  stylesheet of their own. Its class names stay internal; the functions create the markup.

## Options considered

- **React components only** (`<Reveal>`, `<BlackHole>`): natural in React, but UmeSync is Svelte and would keep its
  own copy, which is what this replaces.
- **In the main entry:** one import, but every app would bundle the shader and the particle code. Apps without
  effects shouldn't pay for them.
- **A shader library** (UmeSync tried one): it compiled for about 0.4 s and froze the window; the hand-written shader
  compiles in milliseconds and adds no dependency.

## Consequences

- **Easier:** any app gets the backdrop and the window effects with a few calls, in every style, theme and motion
  mode.
- **Harder:** the effects write inline styles (`clip-path`, `filter`, `transform`, `opacity`) on the element while
  they play; an app's own inline styles there are overwritten until the effect ends. The element needs a position
  (`relative` is enough) for the rim and backdrop to sit inside it.
- **Public surface:** the `iro-ui/effects` path and its exports, the new tokens and `<Backdrop>`.
- **Rules:** `.claude/rules/architecture/overview.md` (the `src/effects/` module) and `styles.md` (the new tokens).
