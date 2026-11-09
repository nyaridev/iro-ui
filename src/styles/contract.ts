// The token contract: every `--iro-*` name a style must define. Components read only these (ADR-0002).

// ── Public API ────────────────────────────
/** Every token, without the `--iro-` prefix, grouped by purpose, with what it's for. */
export const TOKENS = {
  surfaces: {
    bg: "App background",
    surface: "Panels on the background",
    "surface-2": "Cards inside panels",
    "surface-3": "Floating layers: menus, popovers, tooltips",
    field: "Inputs, on surface or surface-2",
    "field-hover": "Inputs under the pointer",
    sunken: "Wells and tracks inside a field",
    line: "Borders",
    "line-strong": "Borders on hover and around floating layers",
    overlay: "The scrim behind dialogs and sheets",
    thumb: "Slider thumbs: a light knob in every theme",
  },
  text: {
    fg: "Body text",
    "fg-2": "Labels",
    "fg-3": "Muted text: the weakest anyone must read",
    "fg-4": "Hints, counts and disabled text",
  },
  accent: {
    accent: "Accent fills: primary buttons, checked toggles, slider fills",
    "accent-ink": "Accent text and icons on the background",
    "on-accent": "Text and icons on an accent fill",
    "accent-soft": "Tinted fills: selected rows, chips",
    focus: "The focus ring",
    selection: "Selected text's background",
  },
  status: {
    success: "Success text and icons",
    warning: "Warning text and icons",
    danger: "Danger text and icons, and the danger button",
    info: "Info text and icons",
    "success-soft": "Success tinted fill (notices, badges)",
    "warning-soft": "Warning tinted fill",
    "danger-soft": "Danger tinted fill",
    "info-soft": "Info tinted fill",
    disabled: "Fill of a disabled filled control",
    "on-disabled": "Text on a disabled control",
    track: "The empty part of slider and progress tracks",
  },
  palette: {
    red: "Palette fill",
    "red-ink": "Palette text",
    orange: "Palette fill",
    "orange-ink": "Palette text",
    yellow: "Palette fill",
    "yellow-ink": "Palette text",
    green: "Palette fill",
    "green-ink": "Palette text",
    cyan: "Palette fill",
    "cyan-ink": "Palette text",
    blue: "Palette fill",
    "blue-ink": "Palette text",
    purple: "Palette fill",
    "purple-ink": "Palette text",
    pink: "Palette fill",
    "pink-ink": "Palette text",
  },
  /** Chart series in a fixed order, checked for color-blind separation and contrast (ADR-0011). */
  chart: {
    "chart-1": "Chart series 1 (blue)",
    "chart-2": "Chart series 2 (orange)",
    "chart-3": "Chart series 3 (aqua)",
    "chart-4": "Chart series 4 (yellow)",
    "chart-5": "Chart series 5 (magenta)",
    "chart-6": "Chart series 6 (green)",
    "chart-7": "Chart series 7 (violet)",
    "chart-8": "Chart series 8 (red)",
  },
  type: {
    "font-ui": "UI text",
    "font-mono": "Numbers, paths, code",
    "font-display": "Page and window titles",
    "text-2xs": "Badges, captions",
    "text-xs": "Hints, dense rows",
    "text-sm": "The UI base size",
    "text-base": "Body copy",
    "text-lg": "Section titles",
    "text-xl": "Dialog titles",
    "text-2xl": "Page titles",
    "text-3xl": "Hero headings",
    leading: "Line height for UI text",
    "leading-tight": "Line height for headings",
  },
  shape: {
    "radius-xs": "Badges on images, kbd",
    "radius-sm": "Small buttons, chips, tags",
    "radius-md": "Buttons, inputs, selects",
    "radius-lg": "Cards, menus, popovers, toasts",
    "radius-xl": "Dialogs, sheets",
    "radius-2xl": "The largest frames",
  },
  size: {
    "control-sm": "Height of small controls",
    "control-md": "Height of controls",
    "control-lg": "Height of large controls",
    "space-1": "Gap inside a control group",
    "space-2": "Gap between controls",
    "space-3": "Padding inside cards",
    "space-4": "Gap between cards",
    "space-5": "Padding inside dialogs",
    "space-6": "Gap between page sections",
  },
  depth: {
    "shadow-card": "Cards",
    "shadow-pop": "Floating layers",
    "shadow-thumb": "Slider thumbs and switch knobs",
  },
  motion: {
    ease: "Direct responses: hover, toggles, indicators",
    "ease-pop": "Arrivals that deserve life: toasts, popovers",
    "ease-bounce": "Rewards: a bigger springy overshoot",
    "dur-fast": "Hover and state changes",
    dur: "Menus, popovers, toggles",
    "dur-slow": "Dialogs, sheets, large surfaces",
    press: "Scale of a pressed button (1 for none)",
    lift: "Lift of a hovered card (0px for none)",
    travel: "How far animations move and scale: 1, or 0 to only fade",
    stagger: "Delay between the items of a list that animates in",
  },
  scroll: {
    "scrollbar-size": "Scrollbar width (height when horizontal)",
    "scrollbar-inset": "Gap between the thumb and the scrollbar's edge",
    "scrollbar-rest": "Thumb while the pointer is elsewhere (transparent to hide it)",
    "scrollbar-thumb": "Thumb while the pointer is over the scroll area",
    "scrollbar-grab": "Thumb under the pointer and while dragged (a color or a gradient)",
  },
  effects: {
    "glow-1": "The backdrop's strongest glow and the liquid's main tint (an opaque color)",
    "glow-2": "The backdrop's second glow",
    "glow-3": "The backdrop's faintest glow",
    "glow-strength": "How much of the glow colors shows in the backdrop (a percentage)",
    grain: "Opacity of the backdrop's film grain (0 for none)",
    spark: "Burst sparks and the reveal's rim",
  },
  icons: {
    "icon-line": "Display of icons' line drawing: inline to show it, none to hide it",
    "icon-solid": "Display of icons' solid drawing: inline to show it, none to hide it",
    "icon-stroke": "Stroke width of the line drawing, on the 24 px grid",
  },
} as const satisfies Record<string, Record<string, string>>;

/** Every token as a CSS custom property: `--iro-bg`, `--iro-surface`… */
export const TOKEN_NAMES: string[] = Object.values(TOKENS).flatMap((group) =>
  Object.keys(group).map((name) => `--iro-${name}`),
);

/** Hooks: `--iro-*` names the app sets on an element for iro-ui's CSS to read. Styles don't define them. */
export const HOOKS = {
  index: "A list item's place in its list (0, 1, 2…), for `stagger` delays",
} as const satisfies Record<string, string>;

/** Every hook as a CSS custom property: `--iro-index`. */
export const HOOK_NAMES: string[] = Object.keys(HOOKS).map((name) => `--iro-${name}`);
