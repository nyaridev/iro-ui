# Changelog

## 1.2.0 (2026-11-12)

- New: `SingleSelect`, a dropdown that picks one option with nothing to type: a button that shows the pick (and its
  icon) and opens the styled list, with a check on the picked row. It takes Select's `SelectOption` list, groups
  included, and `value` (`T | null`), `onValueChange`, `placeholder`, `size`, `disabled`, `id`, `className` and
  `aria-label`, like `MultiSelect` for one value. `Select` keeps its type-to-filter field.

## 1.1.0 (2026-11-10)

- New: `axis` on `BarChart` and `LineChart`, typed `ChartAxis`, for the value axis: `ticks` (`"auto"`, `"whole"`
  or `"decimal"`), a fixed `step`, about how many steps (`count`), its ends (`min`, `max`) and how tick labels read
  (`format`, such as `` (value) => `${value}%` ``). The tips, readout and data table keep using the chart's `format`.
- Changed: a chart whose values are all whole numbers gets whole-number ticks, so small counts no longer show 0.25,
  0.5 and 0.75 on the axis. `axis={{ ticks: "decimal" }}` keeps the old steps.

## 1.0.1 (2026-11-10)

- Fix: `TestResults` and its CSS were missing from the package (an ignore rule meant for Playwright's output
  matched the component's folder), so importing any style failed to build.

## 1.0.0 (2026-11-10)

The first release: three styles (kami, sumi, kon), over 120 components, the effects and icons entries, and the
Design Lab.

- New: four more backdrop layers, as options of `mountBackdrop` and props of `Backdrop`, drawn on the GPU like the
  liquid (ADR-0016): `aurora` (curtains of light in the glow colors, with rays rising from a bright, swaying edge),
  `mesh` (a full background of the glow colors drifting and blending under soft folds of light), `spotlight` (a soft
  light that follows the mouse, with dust glinting in it) and `grid` (a dot grid that swells like a lens and lights up
  around the mouse), plus `paper` (a washi surface of tooth, fibers and pulp, lit from the top left), `dust` (specks
  and bokeh drifting through shafts of window light), `contours` (a slowly shifting elevation map in hairline contour
  lines) and `ink` (sumi-e ink bleeding through wet paper, with darker rims). They mix on one canvas, and show in
  every style, kami included. The Lab's Effects page shows each.
- New: every backdrop layer takes settings: `true` for its defaults, or an object such as `dust={{ count: 2, shafts:
  1.5 }}`. All take `speed`, `intensity` and `colors` (up to three CSS colors in place of the glows); each has a few
  of its own (`AuroraOptions`, `DustOptions`, `ContoursOptions`…). `paper={{ animated: true }}` lets its light sway.
  The new `updateBackdrop(host, options)` changes them while it runs, without restarting; `<Backdrop>` does this when
  its props change. The Lab's Effects page has a tuner for every layer.
- Changed: the liquid and the new layers compile their shaders in the background where the browser can, so a
  backdrop never holds up the page.
- New: window effects come in pairs, `closeX` and `openX(node, options)`, in `iro-ui/effects` (ADR-0016): Reveal,
  BlackHole, Crt (an old screen switching off into a line and a dot; `color`), Genie (pouring into a dock button or a
  box; `target`, `bend`), Burn (fire that chars the window away from the bottom, with embers and ash), Shatter (glass
  that cracks where it's struck and falls in shards; `from`), Ripple (a drop on water that washes the window away
  from a point, lit from above; `from`), InkBleed (ink that runs down and dries away; `color`) and Fold (an
  accordion that folds away). A close leaves the window hidden and any open brings it back, so they mix;
  `hideWindow(node)` starts one hidden. `from` is a point, such as a click, or an element. Each takes `speed` and
  follows the motion mode.
- New: feedback for what happened to a window: `shake` ("no"; `strength`), `pulse` ("look here"; `color`, `count`,
  `strength`), `flash` ("this changed": a highlight wash under the content), `success` ("saved": a pop and a ring),
  `bounce` ("something new"; `height`), `wiggle` (a hint), `heartbeat` ("liked") and `tap` ("got your press";
  `from`). Each takes `speed`, and `color` where it lights up. A window moves no more than a few pixels; feedback adds
  to the element's own transform and shadows and leaves no style behind. Under reduced motion, what would move
  flashes an outline or glows instead.
- Fixed: a window hidden by a closing effect keeps only its hidden clip and opacity, so whichever effect opens it
  next starts clean.

- Changed: `Avatar` looks like its style. kami (and any style without its own): the initials in the avatar's color
  on a pale tint of it, with a thin edge, like a badge. sumi: an emblem, a dark tint lit from the top with the
  initials in its display face and a fine double ring that frames pictures too. kon keeps the lit gradient with white
  initials, now in kon's new `flourish.css`.

- The Design Lab has three more templates: Issues (a board and a sortable list, filters, an edit Sheet), Deploys (a
  build that streams its log, tests, environment variables) and Onboarding (a five-step wizard with checks). The
  other templates now work: their navigation, search, ranges, forms and dialogs do what they say, and on a phone
  their side navigation moves into a Sheet.
- Fixed: a selected ListItem's description and the current AppSidebar item's count read at 4.5:1 on the tint.

- New: the `--iro-move` token: 1, or 0 when motion only fades (reduced and off). What slides, turns or resizes on a
  state change now snaps under reduced motion: chevrons, Switch's thumb, Segmented's and Tabs' indicators, opening
  panels, ProgressBar and Meter fills, AppSidebar, Carousel's dots, Tour and NavigationMenu's popup.
- Changed: under reduced motion, loops pulse in place instead of moving: Spinner (and the buttons and chat parts that
  show one), an indeterminate ProgressBar (it fills its track), Shimmer, and StatusDot's ring (it only fades).

- Fixed: Slider (and AudioPlayer's and Transcription's seek bars) shows keyboard focus on its thumb; Tabs' panels,
  a picked ColorPicker swatch and a focused option show focus too.
- Fixed: Tabs' tab list holds only tabs, as ARIA requires. A tab's checkbox and menu chevron still sit on their tab,
  but come after the list for screen readers and the Tab key.
- Fixed: OtpField names each box ("Verification code, 2 of 6"); TagInput takes a Field's label; DatePicker's and
  Veil's names include the text they show.
- Fixed: Carousel's dots, Tabs' menu chevron, StackTrace's frame links and Sources' links are 24 px targets.
  Carousel's track and Snippet's code scroll with the keyboard.
- Fixed: on touch screens Message's actions always show. At 320 px MultiSegmented and NavigationMenu wrap, OtpField's
  boxes narrow and Tour's card fits the screen; a chart's hidden data table no longer widens the page.
- Fixed: Shimmer stays readable where text can't be clipped to a background; InlineInput sizes to its text only
  where browsers can.

- New: the `--iro-edge` token (Tailwind `edge`), the resting edge of fields and toggles at 3:1 on every surface.
  TextField, TextArea, Select, NumberField, OtpField, ScrubField, Segmented, Checkbox, Radio, Switch, PromptInput
  and WebPreview's editable address use it; under the pointer their edge is `--iro-fg-4`.
- Changed: `--iro-fg-4` (hints and counts) reads at 4.5:1 on every surface: darker in kami, and `var(--iro-fg-3)` in
  kon and sumi, where readable text starts at muted. kon's `--iro-fg-3` is a step lighter, to read on hovered fields
  and wells too. The palette inks read at 4.5:1 on wells and on their own tints: darker in the light themes (and
  sumi light's warning and violet), lighter red, purple and pink in kon's ember, midnight, moss and slate.
- Changed: placeholders inside a root take `--iro-fg-4` (the base layer), not the browser's gray.
- Fixed: CountBubble's digits read on its fill in dark themes. Muted text on a selected Chip or ListItem, and a
  Trend badge's context, step up to `--iro-fg-2`. Select and MultiSelect's check marks, Plan's marks, Notice's icon,
  StackTrace's header and CodeBlock's floating copy button sit on their line's middle.

- Fixed: a button tucked into the end of a row or box keeps the same gap above, below and beside it. TreeRow's
  actions overflowed compact rows; a button in a TextField slot, PropertyList's copy button and the copy button in
  Commit's hash touched their box's edges; Attachment's ×, StackTrace's header, AudioPlayer and the
  EnvironmentVariables add row had uneven sides.
- Fixed: a small `TagInput` grows with its tags again; TextField's small height held it to one line, with its tags
  against the border.
- New: `BranchPicker` ("‹ 2 / 3 ›" to step between versions of an answer). In Message's `actions` it always shows,
  while the other actions wait for hover.
- `FileTree` is one Tab stop with the tree's keys: arrows move, open and close, Home and End jump, a letter finds the
  next match; screen readers hear a tree with levels (ADR-0013). `TreeRow` takes `buttonProps` for its button.
- `AlertDialog`: `onConfirm` can return a promise. The dialog stays open and busy until it resolves, and stays open
  if it rejects (the error goes to the console).
- `WebPreview`: back and forward buttons when it has `onNavigate`.
- `EnvironmentVariables`: `onChange` makes it an editor: values become fields, rows can be removed, and a row at the
  end adds a variable once its name checks out.
- New, media and voice: `AudioPlayer` (play, a seek bar, the time and mute around the browser's audio element;
  `audioRef` and `onTimeUpdate` let a transcript follow it), `Transcription` (timed lines with speakers, the one being
  heard marked, `onSeek`; type `TranscriptSegment`), `SpeechInput` (a dictation button on the browser's speech
  recognition, disabled where there is none), `Image` (holds its `ratio` while loading behind a placeholder, fades
  in, shows its alt text when it fails) and `Lightbox` (pictures one at a time over the page, arrows and arrow keys
  between them; type `LightboxImage`).
- New, developer views: `Terminal` (command output that follows new lines, with commands, errors and successes
  marked and a cursor while `running`; type `TerminalLine`), `Snippet` (a one-line command to copy), `StackTrace`
  (an error's frames, dependency and runtime frames folded, `onOpenFrame`; type `StackFrame`), `TestResults` (counts,
  a split bar and suites with failures open; types `TestCase`, `TestStatus`, `TestSuite`), `FileTree` (folders and
  files on TreeRow; type `FileNode`), `Commit` (message, author, hash and changed files with a diff bar; type
  `CommitFile`), `PackageInfo`, `EnvironmentVariables` (secrets masked until revealed; type `EnvVariable`),
  `SchemaView` (typed fields with nested objects, an endpoint's method and path; type `SchemaField`) and
  `WebPreview` (a page or HTML in a sandboxed frame with an address bar).
- New, chat parts (ADR-0012), with plain props and no AI SDK: `Message` (the reader's on a bubble, the assistant's
  across the column, system notes centered; a caret while `streaming`), `Conversation` (follows the newest message
  unless the reader scrolled up, with a "Latest" button), `PromptInput` (Enter sends, Shift+Enter breaks a line, a
  stop button while streaming), `Attachment`, `Suggestions`, `Reasoning`, `ToolCall`, `Sources` with `Citation`,
  `Plan`, `Queue`, `Confirmation`, `Questionnaire`, `Shimmer`, `Marker` and `UsageMeter`. Types: `ChatSource`,
  `PlanStep`, `QueueItem`, `Question`, `QuestionOption`, `SuggestionItem`.
- The Design Lab has a Chat template with an answer that streams in.
- New: `AppSidebar` (an app's side navigation with sections, counts, a header and footer, folding to its icons;
  types `AppSidebarItem`, `AppSidebarSection`), `Menubar` (a desktop app's File, Edit, View menus; type
  `MenubarMenu`), `NavigationMenu` (a site's top navigation with panels of links that follow the pointer; types
  `NavigationMenuItem`, `NavigationMenuLink`) and `Toolbar` with `ToolbarButton` and `ToolbarSeparator` (one keyboard
  stop, arrows between tools).
- New: `AlertDialog` (confirms an action; no ×, outside clicks don't close it), `Drawer` (a bottom panel you drag
  down to close) and `HoverCard` (previews a link on hover and focus).
- New: `Carousel` (slides on the browser's own snap scrolling, with arrows and dots, one or several at a time) and
  `ScrollArea` (thin overlay scrollbars in the style's look, an optional fade at the edges).
- Fixed: Dialog, Sheet and CommandPalette dim the page behind them again. Their backdrop shared a class name with the
  effects' window `Backdrop`, which moved it behind the page.
- New: `RadioGroup` (round buttons with labels and descriptions, down or across; type `RadioOption`),
  `Autocomplete` (a text field with suggestions that takes any text), `TagInput` (Enter or a comma adds a tag,
  Backspace removes the last), `OtpField` (one box per character, paste fills them all, `groupSize` gaps),
  `ColorPicker` (a swatch that opens a saturation square, a hue strip, a hex field and presets), `ButtonGroup`
  (buttons and fields joined into one control) and `NativeSelect` (the browser's select in the Select look).
- New: `Calendar` (pick one day, with `earliest`, `latest` and `isDayDisabled`), `DatePicker` (a field that opens a
  Calendar) and `TimeField` (the browser's time input in the TextField look).
- A combobox, a toggle and a toggle group were already here: `Select` filters as you type, `Button` has `pressed`,
  `IconButton` has `active`, and `Segmented` and `MultiSegmented` pick one or many.
- New: `Stat` (a labelled number with its change, a hint and a small chart; on a card or plain) and `Trend` (a signed
  change with an arrow, green or red by which way is good: `good="up" | "down" | "none"`).
- New: `AvatarGroup` (overlapping avatars with a "+N" count; type `AvatarGroupPerson`), `Breadcrumbs` (the middle of
  a long path folds into a ⋯ menu; type `BreadcrumbItem`) and `Stepper` (steps done, current and waiting, across or
  down; type `StepperStep`).
- New: `Timeline` (events on a line with dots, icons or avatars; type `TimelineItem`) and `ListItem` (a row with an
  icon or avatar, a title and description, a detail and actions; the row can be a button).
- New: `Accordion` (headed sections, one or many open; type `AccordionItem`) and `Banner` (a full-width message at
  the top of an app, with an action and a close button).
- New: `CodeBlock` (code with a copy button, a title bar, line numbers, marked lines and wrapping; an app's own
  highlighter can pass colored `lines`) and `Prose` (styles rendered Markdown: headings, lists, links, quotes, code,
  tables).
- New: `DataTable`, a table for rows of data: columns with alignment and width, sorting by header (controlled or
  not), row checkboxes with select-all, nested rows that expand, a totals footer, an empty message, loading rows,
  a header and footer that stay put when it has a `maxHeight`, and `sm` rows. Types: `DataTableColumn`,
  `DataTableProps`, `DataTableSort`, `SortDirection`. `sortRows` sorts rows the way the headers do (numbers in order,
  text by the reader's language, ties kept in place).
- New: `Pagination`: rows per page, which rows show ("1–5 of 13"), previous and next, and page numbers with gaps;
  `labels` for another language. Type: `PaginationLabels`.
- Charts (ADR-0011): `LineChart` (lines or soft areas, straight or smooth, dashed series for targets, gaps for
  missing values), `BarChart` (columns or rows, side by side or stacked, values below zero), `DonutChart` (total in
  the middle, legend with values and shares), `ShareBar` (one bar split into parts) and `Sparkline`. Pointing at a
  chart, or focusing it and using the arrow keys, shows its values; each carries a data table for screen readers.
  Types: `ChartSeries`, `ChartPart`.
- Tokens: `chart-1` to `chart-8`, series colors in a fixed order (blue, orange, aqua, yellow, magenta, green, violet,
  red), checked for color-blind separation and contrast on every style's surfaces, with light and dark steps.
- `ProgressBar`: `segments` draws a row of ticks filled up to the value.
- `theme` also takes the default theme's name: `light` in kami, `dark` in sumi and kon. The Design Lab's pickers
  show the defaults by name (kami is light and blue, sumi dark and violet, kon dark and blue) instead of "default".
- A third style, **kami** (`iro-ui/styles/kami.css`): light and plain, with the system font a size up, high contrast,
  clear borders, flat cards, no glows or grain, and short fades without overshoot; a `dark` theme and eight accents.
- Icons, a third entry (`iro-ui/icons`): 191 icons from BlomboUI, UmeSync and PrepKit in one set, each with a line
  drawing (kon) and a solid one (sumi); `allIcons`, `icon` (parts `body`, `hole`, `cut`, `bold`, `slash`),
  `iconMarkup`. New: `Icon`. Tokens: `icon-line`,
  `icon-solid`, `icon-stroke`. Components' own icons (checks, chevrons, status) now come from the set, so they're
  solid in sumi.
- Effects, a second entry (`iro-ui/effects`, no React): `mountBackdrop` (glows, film grain, vignette and an optional
  flowing WebGL "liquid"), `openReveal` and `closeReveal` (open from the center with a glowing rim and a liquid
  warp), `closeBlackHole` and `openBlackHole` (break into particles that spiral into a hole, and unfurl back),
  `burst` (sparkles, full motion only) and `motionOf`. They follow the motion mode. The element's reveal state shows
  as `data-iro-reveal`.
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
- Design Lab: the frame (header and sidebar) is drawn in kami and follows the system's light or dark, with a sun/moon
  to switch it. The header's **Components** and **Templates** tabs pick what the sidebar lists, with a filter box; the
  sidebar can be hidden (remembered per browser) and floats over the page on narrow windows. The page shows in up to
  four columns, each with its own style, theme, accent and motion. Only the page scrolls, with the style's
  scrollbar. The URL keeps the view, the page and the columns. Base, Motion, Effects and Icons pages, and four
  templates (Dashboard, Settings, Files, Sign in) built from the public entries only, with the iro-ui mark and
  favicon.

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
