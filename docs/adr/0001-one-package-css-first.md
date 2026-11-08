# ADR-0001: One package, CSS-first

**Status:** Accepted
**Date:** 2026-11-08

## Context

Nari's apps each built their own look: BlomboUI (React + Tailwind, about 6,300 lines of hand-built controls),
PrepKit (React + plain CSS) and UmeSync (Svelte + plain CSS). iro-ui gives them one set of components with styles
they can switch. It must drop into an existing app without restyling what the app already has, and start new apps
quickly. The users are Nari's own React apps; one person maintains it.

## Decision

- **One repo, one npm package, `iro-ui`.** No monorepo and no per-component packages.
- **The look is plain CSS.** Each component's CSS sits next to it and reads only `--iro-*` custom properties.
  Components don't use Tailwind or CSS-in-JS, so an app with or without Tailwind gets the same result.
- **Cascade layers:** everything iro-ui ships sits in `@layer iro.base, iro.tokens, iro.components, iro.flourish`.
  An app's own unlayered CSS always wins, so adding iro-ui to an existing app changes nothing until a component is
  used. The global reset (`iro.base`) is opt-in.
- **Names are prefixed:** custom properties `--iro-*`, attributes `data-iro-*`, classes `iro-<component>`. Nothing
  clashes with an app's own `--bg` or `data-theme`.
- **Tailwind apps** get `src/tailwind.css`, a bridge that maps the tokens to Tailwind names (`bg-surface`,
  `text-fg-2`), so app code next to iro-ui components uses the same values.
- **Layout:** `src/styles/` (one folder per style), `src/root/` (`IroRoot`), `src/components/` (one folder per
  component), `src/index.ts` (the only public entry), `lab/` (the Design Lab), `tests/`, `scripts/`.

## Options considered

- **Tailwind inside components (as BlomboUI does):** ties every consuming app to Tailwind 4 and its config.
- **CSS-in-JS:** runtime cost and a React-only look; plain CSS also serves Svelte and plain HTML pages later.
- **A monorepo with `@iro/tokens`, `@iro/react`…:** more release work for one maintainer, with no app that needs
  only part of it yet.

## Consequences

- **Easier:** adding iro-ui to an existing app is safe; a Svelte app (UmeSync) could use the CSS on its own later.
- **Harder:** no Tailwind shortcuts inside components; CSS files must stay disciplined (`components.md` rule).
- **Later:** a Svelte wrapper package would be a new repo built on the same CSS, not a change here.
- **Rules:** `.claude/rules/architecture/overview.md`, `code-organization.md`, `components.md`.
