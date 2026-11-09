# ADR-0010: The Design Lab: a kami frame, look columns and two views

**Status:** Accepted
**Date:** 2026-11-09
**Supersedes:** ADR-0005's neutral frame (the rest of ADR-0005 stands)

## Context

The Lab started as one page list in one look (ADR-0005). Since M11 it draws its frame in kami and compares up to four
looks side by side, and it is about to show example screens (templates) next to the component pages. Its files sit
flat in `lab/`, with one 583-line `lab.css` that mixes the frame, the sidebar, the columns and five pages' styles. A
template is only a fair test of the library if it's built the way an app builds with it.

## Decision

- **Layout.** `lab/shell/` is the frame: `App`, `Header`, `Sidebar`, `ColumnHead`, the columns' looks (`looks.ts`),
  discovery, the sidebar groups, and their CSS. `lab/pages/` holds the Lab's own pages (Tokens, Base, Motion, Effects,
  Icons), each with its CSS. `lab/templates/<name>/` holds one example screen each. `lab/kit.css` holds the helpers
  component pages use. `lab/lab.css` only imports these files, as `src/components.css` does.
- **The frame** (header, sidebar, column headers) is drawn in kami. It follows the system's light or dark; the
  header's sun/moon overrides it per browser, and switching back to the system's own scheme follows the system again.
  The frame's scheme never changes a column.
- **Columns** (M11): each is an IroRoot with its own style, theme, accent and motion, up to four; the URL keeps them
  as comma lists.
- **Views:** the header's tabs pick **Components** or **Templates**. Both share the columns; the sidebar lists the
  view's pages, each view remembers its page, and the URL keeps the view.
- **Templates** are found like component pages: `lab/templates/*/<Name>.template.tsx`, a default export, named after
  its folder (`sign-in/` is "Sign in", `page=sign-in` in the URL). They import only the public entries (`src/index.ts`, `src/icons/index.ts`, `src/effects/index.ts`), and
  their CSS takes every value a style decides from `--iro-*` tokens, so each one shows the library as an app gets it.
  Biome fails on any other `src/` import in a template, and on `src/` importing `lab/`.
- Templates live only in the Lab; they aren't exported. Apps may copy their code.

## Options considered

- **Templates in a second app (`examples/`):** another Vite app and another set of pickers, for a view the Lab's
  columns already give.
- **Templates in the package (`iro-ui/templates`):** a public surface to keep stable for screens meant to change;
  copying their code is simpler.
- **A neutral frame of its own (ADR-0005):** a fourth look to keep up; kami is already the plain one.
- **Keep `lab/` flat:** fine at 15 files, but each template adds a folder and `lab.css` would keep growing.

## Consequences

- **Easier:** a template is a folder, a Lab page is a file in `pages/`, and frame code has one home.
- **Harder:** templates can't reach component internals; a piece they lack is written in the template, or added as a
  component first.
- **Later:** a "View code" button reads a template's source (`?raw`) from the shell; a third view (a playground) is
  one more entry beside Components and Templates; a template that needs a new component waits for it.
- **Rules:** `.claude/rules/architecture/lab.md`, `overview.md`.
