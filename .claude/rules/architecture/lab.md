---
paths:
  - "lab/**"
  - "src/components/**/*.lab.tsx"
---

# The Design Lab

## Layout

| Path | Holds |
|---|---|
| `lab/main.tsx`, `index.html`, `vite.config.ts` | the entry |
| `lab/lab.css` | only `@import`s: the shell's CSS, `kit.css`, each page's CSS, each template's CSS |
| `lab/kit.css` | helpers component pages and templates may use (`lab-row`, `lab-stack`, `lab-hint`…) |
| `lab/shell/` | the frame: `App.tsx`, `Header.tsx`, `Sidebar.tsx`, `ColumnHead.tsx`, `looks.ts`, `scheme.ts`, `discover.ts`, `groups.ts`, and a CSS file per part |
| `lab/pages/` | the Lab's own pages: `<Name>Page.tsx`, and `<name>.css` when it needs one |
| `lab/templates/<name>/` | one example screen: `<Name>.template.tsx` and `<name>.css` |
| `src/components/<name>/<Name>.lab.tsx` | a component's page, next to the component |

## Imports

- `lab/shell/` and `lab/pages/` may import anything in `src/`.
- Templates import only the public entries: `src/index.ts`, `src/icons/index.ts`, `src/effects/index.ts`. Biome
  fails on anything else.
- Component pages (`*.lab.tsx`) import their component and its neighbours, never `lab/`.

## The frame

- The frame is drawn in kami. Its light or dark comes from `shell/scheme.ts`, never from a column.
- Each column is its own IroRoot; nothing in a page reads another column's look.
- Lab CSS goes in the file of the part it styles, never in `lab.css` itself. Colors, fonts, radii, shadows and
  motion come from `--iro-*` tokens.
- Per-browser preferences (sidebar, scheme) use `localStorage` inside `try`/`catch`; the view and the looks go in the
  URL.

## How to add a Lab page

1. Create `lab/pages/<Name>Page.tsx`: a `<section className="lab-page">` with an `h2`.
2. Put its CSS in `lab/pages/<name>.css` and import it from `lab/lab.css`.
3. Add it to `LAB_PAGES` in `lab/shell/App.tsx`.

## How to add a template

1. Create `lab/templates/<kebab-name>/<Name>.template.tsx` whose default export is the whole screen, built from the
   public entries. The Lab finds it.
2. Put its CSS in `<kebab-name>.css` (classes `tpl-<name>-*`) and import it from `lab/lab.css`.
3. Check it in every style and theme, in one column and in two, then update the screenshots.

## How to add a frame feature

- A header control goes in `shell/Header.tsx`, a column control in `shell/ColumnHead.tsx`.
- State the URL keeps goes through `shell/looks.ts`; a per-browser preference gets its own small module, like
  `shell/scheme.ts`.
