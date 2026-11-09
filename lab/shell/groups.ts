// Where each component page sits in the Lab's sidebar, and the shape of the sidebar's sections. A page missing
// here shows under "Other" until it's added.

// ── Constants ─────────────────────────────
const OTHER = "Other";

export const GROUPS: Record<string, string[]> = {
  Inputs: [
    "Autocomplete",
    "Button",
    "ButtonGroup",
    "Checkbox",
    "ColorPicker",
    "CopyButton",
    "DropZone",
    "Field",
    "IconButton",
    "InlineInput",
    "MultiSegmented",
    "MultiSelect",
    "NativeSelect",
    "NumberField",
    "OtpField",
    "RadioGroup",
    "ScrubField",
    "Segmented",
    "Select",
    "Slider",
    "Switch",
    "TagInput",
    "TextArea",
    "TextField",
    "WindowDrop",
  ],
  Dates: ["Calendar", "DatePicker", "RangeCalendar", "TimeField"],
  Display: [
    "Avatar",
    "AvatarGroup",
    "Badge",
    "Banner",
    "Chip",
    "CountBubble",
    "Counter",
    "EmptyState",
    "Kbd",
    "Meter",
    "Notice",
    "ProgressBar",
    "ProgressRing",
    "PropertyList",
    "Skeleton",
    "Spinner",
    "StarRating",
    "Stat",
    "StatusDot",
    "Trend",
    "Veil",
  ],
  Charts: ["BarChart", "DonutChart", "LineChart", "ShareBar", "Sparkline"],
  Data: ["DataTable", "Pagination"],
  Content: ["CodeBlock", "ListItem", "Prose", "Timeline"],
  Chat: [
    "Attachment",
    "BranchPicker",
    "Citation",
    "Confirmation",
    "Conversation",
    "Marker",
    "Message",
    "Plan",
    "PromptInput",
    "Questionnaire",
    "Queue",
    "Reasoning",
    "Shimmer",
    "Sources",
    "Suggestions",
    "ToolCall",
    "UsageMeter",
  ],
  Developer: [
    "Commit",
    "EnvironmentVariables",
    "FileTree",
    "PackageInfo",
    "SchemaView",
    "Snippet",
    "StackTrace",
    "Terminal",
    "TestResults",
    "WebPreview",
  ],
  Media: ["AudioPlayer", "Image", "Lightbox", "SpeechInput", "Transcription"],
  Navigation: ["AppSidebar", "Breadcrumbs", "Menubar", "NavigationMenu", "Stepper", "Toolbar"],
  Overlays: [
    "AlertDialog",
    "CommandPalette",
    "ContextMenu",
    "Dialog",
    "Drawer",
    "HoverCard",
    "Menu",
    "Popover",
    "Sheet",
    "Toaster",
    "Tooltip",
    "Tour",
  ],
  Layout: [
    "Accordion",
    "Carousel",
    "Collapsible",
    "Divider",
    "Panel",
    "ResizeGrip",
    "ScrollArea",
    "SectionTitle",
    "Splitter",
    "Tabs",
    "TreeRow",
  ],
};

// ── Types ─────────────────────────────────
/** One page in the sidebar: `id` goes in the URL, `label` is what the row says. */
export interface NavItem {
  id: string;
  label: string;
}

/** A heading in the sidebar and the pages under it. */
export interface NavSection {
  name: string;
  items: NavItem[];
}

// ── Public API ────────────────────────────
/** A section whose pages are named by their ids. */
export const section = (name: string, ids: string[]): NavSection => ({
  name,
  items: ids.map((id) => ({ id, label: id })),
});

/** The component pages by sidebar group, each sorted; pages no group lists go under "Other". */
export function componentSections(names: string[]): NavSection[] {
  const listed = new Set(Object.values(GROUPS).flat());
  const groups = Object.entries(GROUPS).map(([group, members]) =>
    section(group, members.filter((name) => names.includes(name)).sort()),
  );
  const other = section(OTHER, names.filter((name) => !listed.has(name)).sort());
  return [...groups, other].filter(({ items }) => items.length > 0);
}
