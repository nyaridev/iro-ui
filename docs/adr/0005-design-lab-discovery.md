# ADR-0005: The Design Lab finds styles and pages itself

**Status:** Accepted
**Date:** 2026-11-08

## Context

The Design Lab is a small web app for seeing every component in every style, theme and accent. BlomboUI's Lab is
about 2,000 lines, with pages registered by hand, so a new component is easy to forget. iro-ui's Lab must show
something new the moment it is added.

## Decision

- **The Lab is `lab/`**, a Vite app inside this repo (`pnpm lab`, port 4400). It imports the library's source
  directly, so changes show with hot reload. It isn't part of the package.
- **Styles are discovered** from `src/styles/*/index.css`; **pages** from `src/components/**/*.lab.tsx`
  (`lab/discover.ts`, `import.meta.glob`). Nothing is registered by hand.
- **A lab page** is `<Name>.lab.tsx` next to its component. Its default export is a React component that shows every
  variant, size and state. The page is named after its file.
- **The Lab's own frame is neutral** (`lab/lab.css`) so it never borrows from a style. Each style paints only the
  stage, through `data-iro-*` on the stage element (`IroRoot` from M1).
- The Lab gets theme and accent pickers and a Tokens page in M1, and is the base for the screenshot tests in M5.

## Options considered

- **Storybook:** a large dependency and its own config and conventions, for what about 100 lines of Vite do here.
- **A hand-written page list:** that is what lets components go missing from BlomboUI's Lab.

## Consequences

- **Easier:** a new component or style is in the Lab as soon as its files exist.
- **Harder:** lab files must follow the one shape (a default-exported component) or they won't render.
- **Later:** a page needing extra controls (a theme comparison grid) is a component in its lab file, not a Lab
  feature.
- **Rules:** `.claude/rules/architecture/components.md` (How to add a component).
