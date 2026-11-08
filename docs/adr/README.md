# Architecture

iro-ui is Nari's React component library with swappable styles. One package: styles are CSS files of `--iro-*`
values, components read only those values, and Base UI supplies the behavior.

## Shape

```text
src/
├─ styles/<style>/     one style: tokens, themes, accents, fonts, flourishes (blombo, forge)
├─ styles/contract.ts  the token names every style defines (M1)
├─ root/               IroRoot: data-iro-* attributes and the portal container (M1)
├─ components/<name>/  one component: <Name>.tsx, <name>.css, <Name>.lab.tsx, tests (M2+)
├─ tailwind.css        bridge for Tailwind apps (M1)
└─ index.ts            the public API: the only entry apps import
lab/                   Design Lab (Vite, `pnpm lab`): every component in every style
tests/                 contract, API snapshot and tooling tests
scripts/               repo checks (check-size.ts)
docs/adr/              this overview and the decisions
```

## Modules

| Module | Owns | May depend on |
|---|---|---|
| `src/styles/<style>/` | one style's raw values, themes, accents, fonts, flourishes | its `@fontsource-variable` fonts |
| `src/styles/contract.ts` | the list of `--iro-*` names | nothing |
| `src/root/` | `IroRoot`, the portal container | React |
| `src/components/<name>/` | one component's markup, behavior and CSS | React, Base UI, `src/root/`, other components' `<Name>.tsx` |
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
| [0004](0004-releases-and-compatibility.md) | Releases that don't break apps | Accepted |
| [0005](0005-design-lab-discovery.md) | The Design Lab finds styles and pages itself | Accepted |

## Milestones

| Milestone | Goal | Status |
|---|---|---|
| M0 | Scaffold: repo, build, Lab shell, ADRs, rules, size check | done |
| M1 | Styles: contract, blombo and forge, IroRoot, Tailwind bridge, Lab pickers and Tokens page | next |
| M2 | Basic controls: Button, IconButton, fields, toggles, Segmented, Chip, Badge, Spinner, Progress, Notice, EmptyState | planned |
| M3 | Floating layers on Base UI: Tooltip, Popover, Menu, Select, Dialog, Sheet, Toast | planned |
| M4 | Layout and data: Tabs, Slider, Splitter, Collapsible, PropertyList | planned |
| M5 | v1.0: Lab screenshot tests per style, changelog, adoption guide, first tag | planned |

### M1: Styles

- [ ] 1. `src/styles/contract.ts`: every `--iro-*` name (color, type, radius, spacing, control heights, shadow, motion),
  taken from BlomboUI's `tokens.css` and the forge tokens of UmeSync and PrepKit.
- [ ] 2. blombo: `tokens.css`, `themes.css` (blombo, slate, midnight, ember, moss, light), `accents.css` (blue,
  purple, pink, red, orange, yellow, green, cyan), Geist and Geist Mono fonts.
- [ ] 3. forge: `tokens.css` (dark and light), `accents.css` (violet from UmeSync, steel from PrepKit), Nunito Sans,
  Cinzel and JetBrains Mono fonts, `flourish.css` for the background glows.
- [ ] 4. `src/root/IroRoot.tsx`: sets `data-iro-style`, `-theme` and `-accent` on its element and gives floating
  layers a container inside it.
- [ ] 5. `src/tailwind.css` and the package exports for `iro-ui/styles/*` and `iro-ui/tailwind.css`.
- [ ] 6. `tests/contract.test.ts` (every style defines every name) and `tests/api.test.ts` (export and token
  snapshot).
- [ ] 7. Lab: theme and accent pickers, and a Tokens page (swatches, type scale, radii, shadows, motion).
- [ ] 8. Done checks.

### Later

- Moving PrepKit, then BlomboUI, onto iro-ui: separate tasks in those apps after v1.0. BlomboUI-only components
  (ModelCard, MaskPainter, RunBar, ImageCompare…) stay in BlomboUI.
- UmeSync (Svelte) could use the CSS layer; it follows the ume family's rules, so that's its own decision there.

## Rules

`.claude/rules/architecture/`:

- `overview.md`: the direction, modules, where new things go and the public surface (always loaded).
- `code-organization.md`: file size, section order and dividers for `src/`, `lab/`, `scripts/`, `tests/`.
- `components.md`: how a component is built and added (`src/components/**`).
- `styles.md`: the token contract and how to add a style, theme, accent or token (`src/styles/**`).
