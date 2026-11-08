# Changelog

## Unreleased

- Effects, a second entry (`iro-ui/effects`, no React): `mountBackdrop` (glows, film grain, vignette and an optional
  flowing WebGL "liquid"), `openReveal`, `closeReveal` and `hideForReveal` (open from the center with a glowing rim
  and a liquid warp), `blackHole` (break into particles that spiral into a hole), `burst` (sparkles, full motion
  only) and `motionOf`. They follow the motion mode. The element's reveal state shows as `data-iro-reveal`.
- New: `Backdrop`, the React wrapper for `mountBackdrop`.
- Tokens: `glow-1`, `glow-2`, `glow-3`, `glow-strength`, `grain`, `spark`.
- Motion modes: `IroRoot`'s `motion` prop (`full`, `smooth`, `reduced`, `off`; left out, it follows the system),
  set as `data-iro-motion`. Popups, dialogs, sheets, toasts and the checkbox only fade in reduced motion.
- Shared animations: `data-iro-animate="pop | reward | fade-up | vanish | flash | pulse"`, `data-iro-shine`, and the
  `--iro-index` hook for staggered lists.
- Scrollbars, selection and focus ring inside every root, in each style's look (kon from BlomboUI, sumi from
  UmeSync and PrepKit); `data-iro-scroll="quiet"`.
- Tokens: `selection`, `ease-bounce`, `travel`, `stagger`, `scrollbar-size`, `scrollbar-inset`, `scrollbar-rest`,
  `scrollbar-thumb`, `scrollbar-grab`.
- New: `Skeleton`, `StatusDot`, `CountBubble`, `Meter`, `ProgressRing`, `Counter`, `Panel`, `SectionTitle`,
  `Divider`, `Veil`, `Avatar`, `StarRating`, `TreeRow`, `CommandPalette`, `RangeCalendar` (with the `DayRange` type),
  `Tour`.
- New: `ResizeGrip`, `ScrubField`, `MultiSegmented`, `InlineInput`, `CopyButton`, `DropZone`, `WindowDrop`.
- `TextArea`: grows with its text (`autoGrow`, `maxRows`), a resize grip under it (`resizable`; double-click fits the
  text), `mono`. The browser's resize corner is gone.
- `Select` and `MultiSelect` options take `icon` and `hint`.
- `Tabs`: `nav`, `chip` and `folder` looks; a tab can have a `badge`, an on/off checkbox (`checked`,
  `onCheckedChange`) and a menu chevron (`menu`).
- Fixed: `Splitter` no longer jumps when grabbed; dragging moves the line exactly as far as the pointer.
- Design Lab: the header and a sidebar of pages (Foundations, then the components in groups, with a filter box) are
  drawn in the picked look, with iro-ui's own Select as the pickers. The sidebar can be hidden (remembered per
  browser) and floats over the page on narrow windows. Only the page scrolls, with the style's scrollbar; the header
  stays put. One page shows at a time, and the URL keeps it (`&page=Button`). It opens in sumi, with the iro-ui mark and favicon. Base, Motion and Effects pages.

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
