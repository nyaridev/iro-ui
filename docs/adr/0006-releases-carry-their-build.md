# ADR-0006: Release tags carry the built package

**Status:** Accepted
**Date:** 2026-11-08
**Supersedes:** ADR-0004 (only its install step: "the package's `prepare` script builds `dist/` on install")

## Context

ADR-0004 had apps install a tag (`pnpm add github:nyaridev/iro-ui#v1.0.0`) and pnpm build `dist/` through a `prepare`
script. Testing that path in a scratch app showed pnpm 11 refuses to run a git-installed package's scripts unless the
app lists it in `allowBuilds` with the exact commit hash, so every update would mean editing that hash by hand. The
build would also download iro-ui's dev tools (Vite, TypeScript, Biome, Playwright) into every install.

## Decision

- **`dist/` is tracked in git** and rebuilt only when releasing. A release commit holds the source and its build, and
  the `v*` tag points at it. There is no `prepare` script.
- **Releasing:** update `CHANGELOG.md` and the version, run `pnpm build`, run the checks, commit
  `Release vX.Y.Z` with the new `dist/`, tag `vX.Y.Z`. Pushing waits for Nari's yes.
- Apps install a tag exactly as before; nothing builds on install, and no app needs extra pnpm config.
- Style CSS (`iro-ui/styles/*`, `iro-ui/tailwind.css`) is still served from `src/`; it has no build step.

## Options considered

- **Build on install (ADR-0004):** needs a per-app, per-commit `allowBuilds` entry and installs the dev tools.
- **A tarball on each GitHub release:** clean history, but installs need the repo public and an upload per release.
- **Publishing to npm:** still fine later; this changes nothing for apps but the install line.

## Consequences

- **Easier:** installs are quick and need no config; a private or public repo both work.
- **Harder:** `dist/` in `main` matches the last release, not the newest source; only tags are supported installs.
  Don't run `pnpm build` outside a release, or `dist/` shows as changed.
- **Later:** moving to npm or tarballs replaces the release step only.
- **Rules:** `AGENTS.md` → Releasing.
