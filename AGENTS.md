# AGENTS.md — Iro UI

Guide for AI agents (Claude Code, Cursor, Codex…) working in this repo. In Claude Code, the workspace and category
rules load from the `CLAUDE.md` files above this folder; this file covers only what's specific here.

## What this is

iro-ui (色, "colour") is Nari's React component library with swappable styles. Apps pick a style with one attribute:
**blombo** (BlomboUI's look, the default for web apps) or **forge** (the game-forge look of UmeSync and PrepKit, the
default for desktop apps). It comes with a Design Lab that shows every component in every style. Public, MIT. Status:
scaffold (M0); nothing is released yet, so no app uses it.

## Commands

| Command | What |
|---|---|
| `pnpm install` | Install, then build `dist/` (`prepare`) |
| `pnpm lab` | The Design Lab at http://localhost:4400, with hot reload |
| `pnpm build` | `dist/index.js` (Vite library mode) and `dist/types/` (tsc) |
| `pnpm check` | **typecheck + Biome + Vitest + size check. Run before you finish** |
| `pnpm typecheck` / `lint` / `format` / `test` / `check:size` | Individually |

## Layout

| Path | What |
|---|---|
| `src/index.ts` | The public API, the only entry apps import |
| `src/styles/<style>/` | One style's values, themes, accents, fonts (`blombo/`, `forge/`) |
| `src/components/<name>/` | One component with its CSS, Lab page and tests (from M2) |
| `lab/` | The Design Lab: `discover.ts` finds styles and `*.lab.tsx` pages, `App.tsx` is the shell |
| `tests/` | Contract, API snapshot and tooling tests |
| `scripts/check-size.ts` | Fails on source files over 1200 lines |
| `docs/adr/` | Architecture overview and decisions |

## Architecture

One package: styles are CSS files of `--iro-*` values, components read only those values, and Base UI supplies the
behavior. Read `docs/adr/README.md` first.

| Rules | Applies to |
|---|---|
| `.claude/rules/architecture/overview.md` | everything |
| `.claude/rules/architecture/code-organization.md` | `src/**`, `lab/**`, `scripts/**`, `tests/**` |
| `.claude/rules/architecture/components.md` | `src/components/**`, `src/index.ts` |
| `.claude/rules/architecture/styles.md` | `src/styles/**`, `src/tailwind.css` |

## Rules

- Every public change (exports, props, tokens, attributes, style paths) gets a changelog line and a version decision
  (`overview.md` → Public surface). Releases are `v*` tags; pushing and tagging wait for Nari's yes.
- Biome formats code but not Markdown (`biome.json`); Markdown tables follow the workspace style (`|---|---|`).
