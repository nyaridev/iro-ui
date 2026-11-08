# Iro UI

React components with swappable styles. An app picks its look with one prop, and more styles can be added without
touching a component.

| Style | Look | Default for |
|---|---|---|
| **kon** (紺, navy) | Deep blue-black, flat fills, tight corners, quick motion; themes slate, midnight, ember, moss and light; eight accents | web apps |
| **sumi** (墨, ink) | Deep ink, soft glows, rounder corners, Cinzel titles, bouncy motion; a light theme; violet, steel and teal accents | desktop apps |

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

- **Controls:** Button, IconButton, Field, TextField, TextArea, NumberField, Switch, Checkbox, Segmented, Select,
  MultiSelect, Slider
- **Display:** Chip, Badge, Kbd, Spinner, ProgressBar, Notice, EmptyState, PropertyList
- **Floating:** Tooltip, Popover, Menu, ContextMenu, Dialog, Sheet, toast and Toaster
- **Layout:** Tabs, Splitter, Collapsible, IroRoot

## Design Lab

Every component in every style, theme and accent, plus all the tokens. Double-click `start.bat`, or:

```bash
pnpm install
pnpm lab
```

Then open http://localhost:4400. The URL keeps the picked look (`?style=sumi&theme=light&accent=steel`).

## Develop

| Command | What |
|---|---|
| `pnpm check` | Type check, Biome, unit tests, file size check |
| `pnpm test:visual` | Screenshots of every Lab page and a WCAG AA contrast check, in every style and theme |
| `pnpm build` | `dist/`, only when releasing (ADR-0006) |

The architecture and its decisions are in [docs/adr/](docs/adr/README.md).

## License

[MIT](LICENSE)
