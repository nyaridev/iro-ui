# ADR-0003: Base UI for behavior

**Status:** Accepted
**Date:** 2026-11-08

## Context

Menus, dialogs, selects, popovers, tooltips, sliders and tabs need focus management, keyboard support, ARIA roles
and positioning. BlomboUI hand-built them on Floating UI, which works but means maintaining every edge case
alone. Nari wants the library to stay current without redoing that work: when browsers or accessibility practice
change, an update should bring the fix.

## Decision

- **Behavior comes from Base UI (`@base-ui/react`)**, a library of unstyled components by the authors of Radix and
  Material UI. iro-ui supplies all markup classes and CSS; Base UI supplies state, keyboard, focus, ARIA and
  positioning.
- **Any component with focus management, keyboard patterns or floating layers wraps Base UI parts.** Simple ones
  (Button, Badge, Spinner) are plain elements.
- **Styling hooks are Base UI's state attributes** (`data-open`, `data-checked`, `data-disabled`,
  `data-starting-style`/`data-ending-style` for enter and exit transitions), styled in each component's CSS.
- **Base UI is a dependency of iro-ui**, not of the apps, and its types never appear in iro-ui's public props. That
  keeps the option of swapping it out without a breaking change.
- Updates: bump Base UI in a minor release after the Lab's screenshot tests pass (ADR-0004).

## Options considered

- **Radix Primitives:** Shiori already uses it, but development has slowed; Base UI is where its authors work now.
- **React Aria:** the most thorough, but heavier and with a different API shape for every component.
- **Hand-built on Floating UI (BlomboUI today):** full control, but every accessibility fix is ours to find.

## Consequences

- **Easier:** accessible menus, dialogs and selects come at once; new Base UI parts give new components quickly.
- **Harder:** one dependency to track; BlomboUI behaviors Base UI lacks (typing to filter in Select, for example)
  are built on top of its parts.
- **Later:** a component Base UI doesn't have is built from its lower-level parts or as a plain element.
- **Rules:** `.claude/rules/architecture/components.md`.
