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

| Style | Look |
|---|---|
| **kami** | Light and plain: the system font, high contrast, clear borders, no glows or grain, short fades; a dark theme; eight accents |
| **sumi** | Deep ink, soft glows, rounder corners, Cinzel titles, bouncy motion; a light theme; violet, steel and teal accents |
| **kon** | Deep blue-black, flat fills, tight corners, quick motion; themes slate, midnight, ember, moss and light; eight accents |

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
  Switch, Checkbox, RadioGroup, Segmented, MultiSegmented, Select, MultiSelect, NativeSelect, Autocomplete, TagInput,
  OtpField, ColorPicker, ButtonGroup, Slider
- **Files:** DropZone, WindowDrop
- **Display:** Chip, Badge, Kbd, Avatar, AvatarGroup, Stat, Trend, Banner, StarRating, StatusDot, CountBubble,
  Counter, Spinner, ProgressBar, ProgressRing, Meter, Skeleton, Notice, EmptyState, PropertyList, Veil
- **Charts:** LineChart (lines or areas, dashed targets), BarChart (columns or rows, grouped or stacked), DonutChart,
  ShareBar, Sparkline; colors from eight chart tokens that stay apart for color-blind readers
- **Data:** DataTable (sorting, row checkboxes, nested rows, totals), Pagination
- **Content:** CodeBlock, ListItem, Prose (rendered Markdown), Timeline
- **Chat:** Message, Conversation, PromptInput, Attachment, Suggestions, Reasoning, ToolCall, Sources, Citation, Plan,
  Queue, Confirmation, Questionnaire, Shimmer, Marker, UsageMeter
- **Developer:** Terminal, Snippet, StackTrace, TestResults, FileTree, Commit, PackageInfo, EnvironmentVariables,
  SchemaView, WebPreview
- **Media:** AudioPlayer, Transcription, SpeechInput, Image (loading and failed states), Lightbox
- **Navigation:** AppSidebar, Breadcrumbs, Menubar, NavigationMenu, Stepper, Toolbar
- **Floating:** Tooltip, HoverCard, Popover, Menu, ContextMenu, Dialog, AlertDialog, Sheet, Drawer, CommandPalette,
  Tour, toast and Toaster
- **Layout:** Accordion, Carousel, ScrollArea, Panel, SectionTitle, Divider, Tabs (line, pill, nav, chip, folder),
  Splitter, ResizeGrip, Collapsible, TreeRow, IroRoot
- **Dates:** Calendar, DatePicker, RangeCalendar, TimeField
- **Icons** (`iro-ui/icons`, any framework): 191 icons in 23 categories, line in kami and kon, solid in sumi, drawn
  with `<Icon>`
- **Effects** (`iro-ui/effects`, any framework): a window backdrop with glows, grain and a flowing WebGL liquid
  (`Backdrop` in React), open and close reveals, a black hole, a sparkle burst

## Design Lab

Every component in every style, theme and accent, all the tokens, and example screens. Double-click `start.bat`, or:

```bash
pnpm install
pnpm lab
```

Then open http://localhost:4400 and pick a page in the sidebar (the button at the top left hides it; the sun or
moon at the top right switches the Lab between light and dark, and it follows the system until you pick). Each column has
its own Style, Theme, Accent and Motion pickers, and **+** adds a column, up to four, to compare looks side by side.

The tabs in the middle of the header switch between **Components** (the component and token pages) and
**Templates**: whole screens (Analytics, Dashboard, Settings, Files, Sign in) built only from what an app imports, so you can see
how an app would look in any style before building it. The URL keeps the view, the page and the columns
(`?style=kami,sumi&theme=light,light&view=templates&page=dashboard`).

## Develop

| Command | What |
|---|---|
| `pnpm check` | Type check, Biome, unit tests, file size check |
| `pnpm test:visual` | Screenshots of every Lab page and template and a WCAG AA contrast check, in every style and theme |
| `pnpm build` | `dist/`, only when releasing (ADR-0006) |

The architecture and its decisions are in [docs/adr/](docs/adr/README.md).

## License

[MIT](LICENSE)
