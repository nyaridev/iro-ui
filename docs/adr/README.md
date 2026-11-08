# Architecture

iro-ui is Nari's React component library with swappable styles. One package: styles are CSS files of `--iro-*`
values, components read only those values, and Base UI supplies the behavior.

## Shape

```text
src/
├─ styles/<style>/     one style: tokens, themes, accents, fonts, flourishes (kon, sumi)
├─ styles/contract.ts  the token names every style defines
├─ root/               IroRoot: data-iro-* attributes and the layer floating parts portal into
├─ components/<name>/  one component: <Name>.tsx, <name>.css, <Name>.lab.tsx, tests
├─ components/shared/  internal helpers: cx(), the small glyphs, popup.css (floating surfaces and option rows)
├─ components.css      imports every component's CSS; each style's index.css imports it
├─ tailwind.css        bridge for Tailwind apps
└─ index.ts            the public API: the only entry apps import
lab/                   Design Lab (Vite, `pnpm lab`): every component in every style
tests/                 contract, API snapshot and tooling tests; visual/ (Playwright screenshots, contrast)
scripts/               repo checks (check-size.ts)
dist/                  the built package, rebuilt only for releases (ADR-0006)
docs/                  adopting.md; adr/ (this overview and the decisions)
```

## Modules

| Module | Owns | May depend on |
|---|---|---|
| `src/styles/<style>/` | one style's raw values, themes, accents, fonts, flourishes | its `@fontsource-variable` fonts |
| `src/styles/contract.ts` | the list of `--iro-*` names | nothing |
| `src/root/` | `IroRoot`, the portal container | React |
| `src/components/<name>/` | one component's markup, behavior and CSS | React, Base UI, `src/root/`, `components/shared/`, other components' `<Name>.tsx` |
| `src/components/shared/` | internal helpers (`cx`, glyphs); never exported | React |
| `src/components.css` | the list of component CSS files | `src/root/`, `src/components/` |
| `src/index.ts` | re-exports of the public API | everything in `src/` |
| `src/tailwind.css` | Tailwind names for the tokens | the contract |
| `lab/` | the Design Lab | anything in `src/` |
| `tests/`, `scripts/` | checks | `src/`, `scripts/`, Node |

Nothing in `src/` imports from `lab/`, `tests/` or `scripts/`.

## Decisions

| ADR | Title | Status |
|---|---|---|
| [0001](0001-one-package-css-first.md) | One package, CSS-first | Accepted |
| [0002](0002-styles-as-token-sets.md) | Styles are complete token sets | Accepted |
| [0003](0003-base-ui-for-behavior.md) | Base UI for behavior | Accepted |
| [0004](0004-releases-and-compatibility.md) | Releases that don't break apps | Accepted; install step superseded by 0006 |
| [0005](0005-design-lab-discovery.md) | The Design Lab finds styles and pages itself | Accepted |
| [0006](0006-releases-carry-their-build.md) | Release tags carry the built package | Accepted |

## Milestones

| Milestone | Goal | Status |
|---|---|---|
| M0 | Scaffold: repo, build, Lab shell, ADRs, rules, size check | done |
| M1 | Styles: contract, kon and sumi, IroRoot, Tailwind bridge, Lab pickers and Tokens page | done |
| M2 | Basic controls: Button, IconButton, fields, toggles, Segmented, Chip, Badge, Spinner, Progress, Notice, EmptyState | done |
| M3 | Floating layers on Base UI: Tooltip, Popover, Menu, Select, Dialog, Sheet, Toast | done |
| M4 | Layout and data: Tabs, Slider, Splitter, Collapsible, PropertyList | done |
| M5 | v1.0: Lab screenshot tests per style, changelog, adoption guide, first tag | in progress: only the tag left |

### M5: v1.0

- [x] 1. Screenshot tests: every Lab page in each style's default and light themes, the Tokens page in every theme
  (`pnpm test:visual`, 128 images in `tests/visual/screenshots/`).
- [x] 2. Contrast check in the same run; sumi's violet fill and four light-theme values were darkened to pass AA.
- [x] 3. `docs/adopting.md`.
- [x] 4. README, `CHANGELOG.md` → `1.0.0`, version `1.0.0`.
- [x] 5. Install tested from a git tag in a scratch app: it led to ADR-0006 (`dist/` ships in the tag).
- [ ] 6. Tag `v1.0.0` and push it, when Nari says so.

### Later

- An app that offers both styles bundles the component CSS twice (about 15 kB), because each style's `index.css`
  imports `components.css`. A shared `iro-ui/components.css` import would fix it at the cost of a second import line.
- Moving PrepKit, then BlomboUI, onto iro-ui: separate tasks in those apps after v1.0. BlomboUI-only components
  (ModelCard, MaskPainter, RunBar, ImageCompare…) stay in BlomboUI.
- UmeSync (Svelte) could use the CSS layer; it follows the ume family's rules, so that's its own decision there.

## Rules

`.claude/rules/architecture/`:

- `overview.md`: the direction, modules, where new things go and the public surface (always loaded).
- `code-organization.md`: file size, section order and dividers for `src/`, `lab/`, `scripts/`, `tests/`.
- `components.md`: how a component is built and added (`src/components/**`).
- `styles.md`: the token contract and how to add a style, theme, accent or token (`src/styles/**`).
