# Changelog

## Unreleased

## 1.0.0 (2026-11-08)

The first release: two styles, 31 components and the Design Lab.

- Styles `kon` (BlomboUI's look; themes slate, midnight, ember, moss, light; eight accents) and `sumi` (the game-forge
  look; a light theme; violet, steel and teal accents), imported as `iro-ui/styles/<name>.css`.
- 85 `--iro-*` tokens (`src/styles/contract.ts`), and `iro-ui/tailwind.css` for Tailwind apps. Every text color
  passes WCAG AA (4.5:1) on its surfaces, in every style and theme.
- `IroRoot` picks the style, theme and accent for everything inside it; `useIroLayer()` for popups.
- Controls: `Button`, `IconButton` (its label as a tooltip, with an optional `shortcut`), `Field`, `TextField`,
  `TextArea`, `NumberField`, `Switch`, `Checkbox`, `Segmented`, `Select` (type to filter, groups), `MultiSelect`,
  `Slider` (typeable value, reset, marks).
- Display: `Chip`, `Badge`, `Kbd`, `Spinner`, `ProgressBar`, `Notice`, `EmptyState`, `PropertyList` (mono values,
  copy buttons).
- Floating: `Tooltip`, `Popover`, `Menu`, `ContextMenu`, `Dialog`, `Sheet`, and `toast()` / `dismissToast()` with
  `Toaster`. They open inside the nearest `IroRoot`, in its look.
- Layout: `Tabs` (line and pill), `Splitter`, `Collapsible` (summary, on/off switch).
- Behavior from Base UI (`@base-ui/react`), installed with iro-ui.
- Design Lab: style, theme and accent pickers (kept in the URL), a Tokens page, and a page per component, found on
  their own; screenshot tests of every page and a contrast check (`pnpm test:visual`).
