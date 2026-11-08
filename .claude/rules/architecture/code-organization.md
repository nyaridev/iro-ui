---
paths:
  - "src/**"
  - "lab/**"
  - "scripts/**"
  - "tests/**"
---

# Code organization

## Size

- Up to 1000 lines: fine. 1001–1200: split when there's a clear seam, otherwise say why it stays whole. Over 1200:
  always split, along responsibilities, and update every import in the same step. `pnpm check:size` enforces it.
- Before adding to a file over 1000 lines, split it first or put the new code in its own file.

## One job per file

- One component, hook or helper per file, named for what it does. Entry points (`index.ts`, `lab/main.tsx`) only wire
  things together.

## Section order

TypeScript: header (1–3 lines on what the file is for) → Dependencies → Constants → Types → State → Private helpers →
Public API → Entry point. CSS: header → Layout → Variants → States → Motion.

- Leave out sections a file doesn't need; never leave an empty divider.
- Files under about 40 lines may skip dividers.

## Dividers

```ts
// ── Public API ────────────────────────────
```

```css
/* ── States ────────────────────────────── */
```

## Comments and naming

- Comment why, not what, in one line. Every exported function or component gets a one-line `/** */` doc comment.
- No commented-out code, no stray `console.log`.
- Components and their files are PascalCase (`Button.tsx`); folders, CSS files and class names are kebab-case
  (`button/`, `button.css`, `iro-button`).

## Skeleton

```tsx
// Button: the one button, in every variant and size.

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import "./button.css";

// ── Types ─────────────────────────────────
export interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
}

// ── Public API ────────────────────────────
/** A button; `variant` picks its fill. */
export function Button({ variant = "secondary", className, ...rest }: ButtonProps) {
  return <button type="button" data-variant={variant} className={["iro-button", className].filter(Boolean).join(" ")} {...rest} />;
}
```
