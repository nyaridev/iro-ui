# ADR-0004: Releases that don't break apps

**Status:** Accepted
**Date:** 2026-11-08

## Context

Several apps will depend on iro-ui, each updating when it suits that app. An update must never break an app
silently: not its code (renamed props or exports) and not its look (a token renamed or a style changed by
accident). The workspace rule for frameworks: releases are `v*` git tags, and projects use a released version, never
a path link into `frameworks/`.

## Decision

- **Public surface:** everything exported from `src/index.ts` and those components' props, every `--iro-*` name in
  the contract, the `data-iro-*` attributes and their values, and the `iro-ui/styles/*` entry paths. Class names
  (`iro-button`) and files are internal.
- **Semver on that surface:** a patch fixes; a minor adds (a component, a prop, a token, a style, a theme, an
  accent); a major removes or renames. A visual change to a style that isn't a fix is a minor, noted in the
  changelog.
- **Deprecate before removing:** a renamed prop or export keeps the old name as an alias for at least one minor (with
  a development-only console warning); a renamed token keeps `--iro-old: var(--iro-new)`. Removal happens only in a
  major, and the changelog says how apps update.
- **Apps install a tag:** `pnpm add github:nyaridev/iro-ui#v1.2.0`. The package's `prepare` script builds `dist/` on
  install. Apps update by changing the tag.
- **Checks that guard the surface:** `tests/api.test.ts` snapshots the export list and the token names, so any
  change to them shows in review and needs a version decision. From M5, screenshot tests of the Lab in every style
  catch unintended visual changes.
- **The repo is public (MIT)**, so public apps such as PrepKit can depend on it.

## Options considered

- **Publishing to npm:** fine later; a git tag needs no account or token and follows the workspace's release rule.
- **Copying the source into each app:** never breaks, but updates become manual merges.
- **No deprecation step:** simpler, but every rename would force all apps to update at once.

## Consequences

- **Easier:** apps update on their own schedule, and know from the version number what to expect.
- **Harder:** each public change needs a version decision and a changelog line.
- **Later:** moving to the npm registry changes only the install line in the adoption guide.
- **Rules:** `.claude/rules/architecture/overview.md` (Public surface).
