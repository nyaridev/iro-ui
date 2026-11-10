// Exceptions to the UI checks: designs that are deliberate and still keep the promise in spirit (ui-checks.md). Each
// one is as narrow as it can be; one that no longer matches anything is reported as stale.

// ── Types ─────────────────────────────────
export interface Exception {
  /** The check's id: `layout.end-gap`. */
  check: string;
  /** The Lab page or template it applies to (`TreeRow`, `Chat`), or `*` for all. */
  page: string;
  /** The element: it, or an ancestor, matches this selector. */
  selector: string;
  /** Only in these looks: `kon` (every theme) or `kon dark`. Every look when left out. */
  looks?: string[];
  /** Only in these engines (`chromium`, `firefox`, `webkit`). Every engine when left out. */
  browsers?: string[];
  /** Why the design is right, in one sentence. */
  reason: string;
}

// ── Public API ────────────────────────────
export const ALLOW: Exception[] = [
  {
    check: "contrast.edge",
    page: "CommandPalette",
    selector: ".iro-palette-search",
    reason: "The search row is the palette's header: the dialog's edge frames it, its icon and placeholder name it.",
  },
  {
    check: "contrast.edge",
    page: "InlineInput",
    selector: ".iro-inline-input",
    looks: ["kami", "kon"],
    reason: "It reads as text until hovered or focused, then shows its edge; at rest there's no edge to contrast.",
  },
  {
    check: "contrast.placeholder",
    page: "Base",
    selector: "input[aria-label='A plain input']",
    looks: ["kami dark", "kon dark", "sumi dark"],
    browsers: ["chromium"],
    reason: "The Base page shows an unstyled browser input; its field color is the browser's, not iro-ui's.",
  },
  {
    check: "contrast.text",
    page: "Base",
    selector: ".lab-row > button",
    looks: ["kami dark", "kon dark", "sumi dark"],
    browsers: ["webkit"],
    reason: "The Base page shows an unstyled browser button; WebKit draws its own light button in a dark scheme.",
  },
  {
    check: "a11y.aria-hidden-focus",
    page: "Select",
    selector: ".iro-field, .iro-select",
    reason: "While a list is open Base UI hides the rest from screen readers; focus stays in the field, Tab closes it.",
  },
  {
    check: "a11y.aria-hidden-focus",
    page: "Effects",
    selector: ".iro-slider, .lab-row, .iro-button",
    reason:
      "While the tuner's Layer list is open Base UI hides the rest from screen readers; focus stays in it, Tab closes it.",
  },
  {
    check: "a11y.aria-hidden-focus",
    page: "Autocomplete",
    selector: ".iro-text-field",
    reason: "While a list is open Base UI hides the rest from screen readers; focus stays in the field, Tab closes it.",
  },
  {
    check: "a11y.aria-hidden-focus",
    page: "NavigationMenu",
    selector: "span[aria-hidden='true']",
    reason: "Base UI's focus guards: hidden spans that hand focus on into and out of the open menu.",
  },
  {
    check: "a11y.focus",
    page: "CommandPalette",
    selector: ".iro-palette-input",
    reason: "Focus never leaves the palette's input while it's open (arrows move the highlight); its caret shows it.",
  },
  {
    check: "motion.timing",
    page: "*",
    selector: ".iro-chart-series, .iro-bar-chart-bar, .iro-donut-chart-parts",
    reason: "Charts draw in over three slow durations, still the token, so the eye can follow each line (ADR-0011).",
  },
  {
    check: "motion.timing",
    page: "Motion",
    selector: "[data-iro-animate='flash']",
    reason: "Flash is an attention cue, with the same fixed timing in every style (ADR-0007).",
  },
  {
    check: "motion.timing",
    page: "Effects",
    selector: ".iro-backdrop-liquid, .iro-backdrop-layers",
    reason:
      "The backdrop's shaders fade in slowly with a fixed timing: it's the page's background, not a part arriving.",
  },
  {
    check: "motion.exit",
    page: "WindowDrop",
    selector: ".iro-window-drop",
    reason:
      "It shows while files are dragged over the window, or while the app holds it open as the Lab's button does; Escape isn't its close.",
  },
];
