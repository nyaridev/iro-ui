# ADR-0007: Motion modes, shared animations and a base layer

**Status:** Accepted
**Date:** 2026-11-08

## Context

BlomboUI, PrepKit and UmeSync share more than controls. Each has its own scrollbars, selection colour and focus ring,
and BlomboUI and UmeSync let people choose how much motion they get (BlomboUI: system, reduced, full; UmeSync:
arcade, smooth, reduced, off). They also animate the same few things the same way: arrivals pop in, exits fade out
fast, rewards bounce, lists stagger, skeletons pulse, a new tab flashes, a card shines on hover. iro-ui had motion
tokens but no modes, no shared animations and no base styles, so every app would rebuild them.

## Decision

- **Motion modes** are a fourth attribute, `data-iro-motion`, set by `IroRoot`'s `motion` prop on the same element
  as the style: `full`, `smooth` (no overshoot), `reduced` (fades only, no press or lift), `off` (nothing moves).
  Left out, it follows the system: `reduced` when the OS asks for less motion, the style's full motion otherwise.
- **Modes work through tokens.** `src/motion.css` overrides the motion tokens per mode for every style at once,
  because components and animations only read tokens. `off` also stops every transition and animation inside the
  root.
- **New tokens:** `ease-bounce` (rewards), `travel` (1, or 0 when animations only fade), `stagger` (delay between
  list items), the scrollbar set (`scrollbar-size`, `scrollbar-inset`, `scrollbar-rest`, `scrollbar-thumb`,
  `scrollbar-grab`) and `selection`. Each style sets them from its app: kon from BlomboUI (its springs sampled as
  `linear()`), sumi from UmeSync and PrepKit.
- **One hook**, `--iro-index`, is set by apps on list items for staggered delays. Hooks are listed in the contract
  apart from tokens; styles don't define them.
- **Shared animations** are attributes, like everything else public: `data-iro-animate="pop | vanish | reward |
  fade-up | flash | pulse"`, and `data-iro-shine` for a sweep on hover. They're plain CSS in `src/animations.css`, so
  any app (React or not) uses them. `vanish` only plays the exit; the app removes the element when it ends.
- **The base layer** (`src/base.css`, `@layer iro.base`) styles scrollbars, the selection and the focus ring inside
  any root. `data-iro-scroll="quiet"` hides a scroll area's thumb until the pointer is over it. Being the lowest
  layer, it never beats a component's or the app's own CSS.

## Options considered

- **A JavaScript motion library** (BlomboUI uses `motion`): springs and exit animations come free, but every app
  would need React and the library, and UmeSync is Svelte. CSS `linear()` reproduces the springs closely enough.
- **Modes as separate token values per style:** exact per-style durations for each mode, but four times the motion
  block in every style. The shared overrides keep each style's own durations and only take out bounce and travel.
- **Utility classes (`iro-pop`):** class names are internal by ADR-0001's public surface; attributes already are
  public, versioned API.

## Consequences

- **Easier:** an app gets the scrollbars, selection, focus ring, motion setting and the common animations by
  importing a style. A new style only sets token values.
- **Harder:** `off` uses `!important` in the base layer, so an app can't animate inside an `off` root. That is the
  point of the mode.
- **Later:** effects driven by JavaScript (ADR-0008, M9) read the same mode from the root's `data-iro-motion`.
- **Rules:** `.claude/rules/architecture/styles.md` (tokens, `index.css` layout) and `components.md` (motion).
