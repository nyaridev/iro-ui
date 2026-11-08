# AGENTS.md — Iro UI

Guide for AI agents (Claude Code, Cursor, Codex…) working in this repo. In Claude Code, the workspace and category
rules load from the `CLAUDE.md` files above this folder; this file covers only what's specific here.

## What this is

iro-ui is Nari's React component library with swappable styles. Apps pick a style with one attribute:
**kon** (BlomboUI's look, the default for web apps) or **sumi** (the game-forge look of UmeSync and PrepKit, the
default for desktop apps). It comes with a Design Lab that shows every component in every style. Public, MIT. Status:
v1.0 is ready (M0–M5); the `v1.0.0` tag is the last step; nothing is released yet, so no app uses it.

## Commands

| Command | What |
|---|---|
| `pnpm install` | Install |
| `start.bat` | Install if needed, start the Design Lab and open it in the browser |
| `pnpm lab` | The Design Lab at http://localhost:4400, with hot reload |
| `pnpm build` | `dist/index.js` (Vite library mode) and `dist/types/` (tsc); only when releasing |
| `pnpm test:visual` | Screenshots of every Lab page and the contrast check (Playwright); `--update-snapshots` after an intended change, then look at the new images |
| `pnpm check` | **typecheck + Biome + Vitest + size check. Run before you finish** |
| `pnpm typecheck` / `lint` / `format` / `test` / `check:size` | Individually |

## Layout

| Path | What |
|---|---|
| `src/index.ts` | The public API, the only entry apps import |
| `src/styles/<style>/` | One style's values, themes, accents, fonts (`kon/`, `sumi/`) |
| `src/styles/contract.ts` | Every `--iro-*` token name, with what it's for |
| `src/root/IroRoot.tsx` | Sets style, theme, accent and motion on a subtree; `useIroLayer()` for popups |
| `src/components/<name>/` | One component with its CSS and Lab page (54) |
| `src/components/shared/` | Internal helpers: `cx()`, the small glyphs, `popup.css` |
| `src/components.css` | Imports every component's CSS; each style imports it |
| `src/base.css`, `src/motion.css`, `src/animations.css` | Scrollbars, selection and focus ring; motion modes; shared animations (ADR-0007) |
| `src/effects/` | `iro-ui/effects` (ADR-0008): `index.ts` (the second entry), backdrop and liquid shader, reveal, black hole, burst, `motionOf`, `effects.css` |
| `src/tailwind.css` | Tailwind 4 names for the tokens |
| `lab/` | The Design Lab: `discover.ts` finds styles, themes, accents and `*.lab.tsx` pages; `App.tsx` is the shell; `Sidebar.tsx` and `groups.ts` the page list; `TokensPage.tsx`, `BasePage.tsx`, `MotionPage.tsx`, `EffectsPage.tsx` |
| `tests/` | Contract, API snapshot and tooling tests |
| `scripts/check-size.ts` | Fails on source files over 1200 lines |
| `docs/adr/` | Architecture overview and decisions |
| `assets/brand/` | The README plaque (`banner-dark.svg`, `banner-light.svg`) and the app icon (`icon.svg`), in the Workstation and Shiori plaque style |

## Architecture

One package: styles are CSS files of `--iro-*` values, components read only those values, and Base UI supplies the
behavior. Read `docs/adr/README.md` first.

| Rules | Applies to |
|---|---|
| `.claude/rules/architecture/overview.md` | everything |
| `.claude/rules/architecture/code-organization.md` | `src/**`, `lab/**`, `scripts/**`, `tests/**` |
| `.claude/rules/architecture/components.md` | `src/components/**`, `src/index.ts` |
| `.claude/rules/architecture/styles.md` | `src/styles/**`, `src/tailwind.css` |

## Releasing

`dist/` is tracked and rebuilt only for a release (ADR-0006):

1. Move the `## Unreleased` lines in `CHANGELOG.md` under `## X.Y.Z (date)` and set `version` in `package.json`
   (semver on the public surface: `overview.md` → Public surface).
2. `pnpm build`, `pnpm check`, `pnpm test:visual`.
3. Commit `Release vX.Y.Z` with the new `dist/`, then tag `vX.Y.Z`.
4. Pushing the commit and the tag waits for Nari's yes.

## Rules

- Every public change (exports, props, tokens, attributes, style paths) gets a changelog line and a version decision
  (`overview.md` → Public surface). Releases are `v*` tags; pushing and tagging wait for Nari's yes.
- Biome formats code but not Markdown (`biome.json`); Markdown tables follow the workspace style (`|---|---|`).
