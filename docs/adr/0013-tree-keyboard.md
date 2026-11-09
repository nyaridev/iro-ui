# ADR-0013: Trees get their keys by hand, the one exception to Base UI for behavior

**Status:** Accepted (adds an exception to ADR-0003)
**Date:** 2026-11-09

## Context

ADR-0003 says behavior comes from Base UI, and `components.md` says never to hand-roll focus management or keyboard
patterns. `FileTree` (M20) shows a folder tree, and Base UI has no tree. Its rows are buttons in reading order, so
Tab walks every row: in a project of a few hundred files, getting from the top to the bottom takes hundreds of
presses, and screen readers hear a flat list of buttons instead of a tree with levels and open folders.

## Decision

- **One exception, for trees only:** `FileTree` implements the WAI-ARIA tree pattern itself:
  - `role="tree"` on the list, `role="treeitem"` on each row with `aria-level`, `aria-expanded` on folders and
    `aria-selected` on the selected file;
  - one Tab stop: the selected row, or the first;
  - Up and Down move between visible rows; Right opens a closed folder or moves into an open one; Left closes an
    open folder or moves to the parent; Home and End go to the first and last row; Enter and Space open a file or
    toggle a folder; typing a letter moves to the next row starting with it.
- **The keys are a pure helper:** `file-tree/keys.ts` takes the visible rows and a key and returns what to do (move
  focus, open, close, select). It has its own tests; the component only applies the result.
- **TreeRow carries the roles:** it takes the tree's attributes (`role`, `aria-level`, `tabIndex`…) on its button,
  so trees built from TreeRow outside FileTree can follow the same pattern.
- **Everything else still wraps Base UI.** A new hand-built pattern needs its own ADR.

## Options considered

- **Keep Tab-only rows:** no new code, but unusable by keyboard past a small tree, and wrong for screen readers.
- **React Aria's Tree:** complete and tested, but a second behavior library beside Base UI (ADR-0003), with its own
  styling hooks, for one component.
- **Base UI's Toolbar or Menu for focus:** they give arrow keys, but announce a toolbar or a menu, not a tree, and
  have no levels or open folders.

## Consequences

- **Easier:** large trees work by keyboard, and screen readers announce levels and open folders.
- **Harder:** iro-ui owns this pattern's correctness; the helper's tests are the guard.
- **Public surface:** TreeRow's new accessibility props; FileTree's keys.
- **Rules:** `components.md` → Behavior names this exception.
