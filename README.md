<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/brand/banner-dark.svg" />
    <img src="assets/brand/banner-light.svg" width="100%" alt="iro-ui — React components with swappable styles" />
  </picture>
</p>

<p align="center">
  <a href="#quick-start"><b>Quick start</b></a> ·
  <a href="#components">Components</a> ·
  <a href="#design-lab">Design Lab</a> ·
  <a href="docs/adopting.md">Adopting</a> ·
  <a href="AGENTS.md">Agents</a> ·
  <a href="docs/adr/README.md">Decisions</a> ·
  <a href="LICENSE">MIT</a>
</p>

React components with swappable styles. An app picks its look with one prop, and more styles can be added without
touching a component.

| Style | Look | Default for |
|---|---|---|
| **sumi** | Deep ink, soft glows, rounder corners, Cinzel titles, bouncy motion; a light theme; violet, steel and teal accents | desktop apps |
| **kon** | Deep blue-black, flat fills, tight corners, quick motion; themes slate, midnight, ember, moss and light; eight accents | web apps |

Behavior (keyboard, focus, screen readers, positioning) comes from [Base UI](https://base-ui.com); the look is plain
CSS that reads `--iro-*` tokens, so it works with or without Tailwind and never overrides an app's own CSS.

## Quick start

```bash
pnpm add github:nyaridev/iro-ui#v1.0.0
```

```tsx
import "iro-ui/styles/kon.css";
import { Button, IroRoot, Toaster, toast } from "iro-ui";

export function App() {
  return (
    <IroRoot styleName="kon" theme="light">
      <Button variant="primary" onClick={() => toast({ title: "Hello" })}>
        Say hello
      </Button>
      <Toaster />
    </IroRoot>
  );
}
```

Bringing an existing app over, switching looks, Tailwind and updating: [docs/adopting.md](docs/adopting.md).

## Components

- **Controls:** Button, IconButton, CopyButton, Field, TextField, TextArea, InlineInput, NumberField, ScrubField,
  Switch, Checkbox, Segmented, MultiSegmented, Select, MultiSelect, Slider
- **Files:** DropZone, WindowDrop
- **Display:** Chip, Badge, Kbd, Avatar, StarRating, StatusDot, CountBubble, Counter, Spinner, ProgressBar,
  ProgressRing, Meter, Skeleton, Notice, EmptyState, PropertyList, Veil
- **Floating:** Tooltip, Popover, Menu, ContextMenu, Dialog, Sheet, CommandPalette, Tour, toast and Toaster
- **Layout:** Panel, SectionTitle, Divider, Tabs (line, pill, nav, chip, folder), Splitter, ResizeGrip, Collapsible,
  TreeRow, IroRoot
- **Dates:** RangeCalendar
- **Effects** (`iro-ui/effects`, any framework): a window backdrop with glows, grain and a flowing WebGL liquid
  (`Backdrop` in React), open and close reveals, a black hole, a sparkle burst

## Design Lab

Every component in every style, theme and accent, plus all the tokens. Double-click `start.bat`, or:

```bash
pnpm install
pnpm lab
```

Then open http://localhost:4400. Pick the look in the header and a page in the sidebar (the button at the top left hides it); the URL keeps both
(`?style=sumi&theme=light&accent=steel&page=Button`).

## Develop

| Command | What |
|---|---|
| `pnpm check` | Type check, Biome, unit tests, file size check |
| `pnpm test:visual` | Screenshots of every Lab page and a WCAG AA contrast check, in every style and theme |
| `pnpm build` | `dist/`, only when releasing (ADR-0006) |

The architecture and its decisions are in [docs/adr/](docs/adr/README.md).

## License

[MIT](LICENSE)
