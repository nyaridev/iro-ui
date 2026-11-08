# Architecture overview

iro-ui is one React package. Styles are CSS files of `--iro-*` values, components read only those values, and Base UI
supplies the behavior. Read `docs/adr/README.md` first; the reasons are in `docs/adr/`.

## Modules

| Module | May depend on |
|---|---|
| `src/styles/<style>/` | its `@fontsource-variable` fonts |
| `src/styles/contract.ts` | nothing |
| `src/root/` | React |
| `src/components/<name>/` | React, `@base-ui/react`, `src/root/`, `src/effects/`, `src/components/shared/`, another component's `<Name>.tsx` and its helpers (`select/options.ts`) |
| `src/components/shared/` | React |
| `src/base.css`, `src/motion.css`, `src/animations.css` | the contract's tokens |
| `src/effects/` | the DOM and the contract's tokens; never React |
| `src/components.css` | the component CSS files |
| `src/index.ts`, `src/tailwind.css` | anything in `src/` |
| `lab/` | anything in `src/` |
| `tests/`, `scripts/` | `src/`, `scripts/`, Node |

- Nothing in `src/` imports from `lab/`, `tests/` or `scripts/`.
- Apps import only `iro-ui`, `iro-ui/effects`, `iro-ui/styles/<name>.css` and `iro-ui/tailwind.css`. Export
  components from `src/index.ts`, effects from `src/effects/index.ts`.

## Where new things go

| New thing | Goes in | Recipe |
|---|---|---|
| A component | `src/components/<kebab-name>/` + a line in `src/components.css` | `components.md` → How to add a component |
| A style | `src/styles/<name>/` | `styles.md` → How to add a style |
| A theme or accent | the style's `themes.css` / `accents.css` | `styles.md` |
| A token | `src/styles/contract.ts` + every style | `styles.md` → How to add a token |
| A shared animation | `src/animations.css`, as a `data-iro-animate` value | `components.md` → Motion |
| A base style (scrollbars, selection) | `src/base.css` | — |
| An effect driven by JavaScript | `src/effects/<name>.ts` (follows `motionOf`), its CSS in `effects.css`, an export in `src/effects/index.ts`, a demo on the Lab's Effects page | ADR-0008 |
| A Lab page for a component | `<Name>.lab.tsx` next to it | `components.md` |
| A Lab feature (pickers, Tokens page) | `lab/` | — |
| A repo check | `scripts/` + a test in `tests/` | — |

A component only one app uses stays in that app.

## Public surface

- Public: `src/index.ts` and `src/effects/index.ts` exports and their props, `--iro-*` names (tokens and hooks),
  `data-iro-*` attributes and values (`style`, `theme`, `accent`, `motion`, `animate`, `shine`, `scroll`, and the
  `reveal` state effects set), the `iro-ui/effects` and `iro-ui/styles/*` paths. Class names and file paths are
  internal.
- Adding is a minor version. Renaming or removing is a major: keep the old name as an alias for at least one minor
  first (a dev-only `console.warn` for props and exports, `--iro-old: var(--iro-new)` for tokens).
- Every public change gets a line under `## Unreleased` in `CHANGELOG.md`.

## Changing the architecture

A change to modules, dependencies, the public surface or how styles work needs a new ADR in `docs/adr/` (supersede,
never rewrite), then an update to `docs/adr/README.md` and these rules.
