// Controls icons: settings, filters, search, zoom, power, pinning and visibility.

// ── Dependencies ──────────────────────────
import { c, icon, p } from "../icon";

// ── Constants ─────────────────────────────
const EYE = p("M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z");

// ── Public API ────────────────────────────
export const SettingsIcon = /* @__PURE__ */ icon("settings", {
  body: p(
    "M10.33 5.3 10.64 2.9h2.72l.31 2.4 1.88.79 1.92-1.49 1.93 1.93-1.49 1.92.79 1.88 2.4.31v2.72l-2.4.31-.79 1.88 1.49 1.92-1.93 1.93-1.92-1.49-1.88.79-.31 2.4h-2.72l-.31-2.4-1.88-.79-1.92 1.49-1.93-1.93 1.49-1.92-.79-1.88-2.4-.31v-2.72l2.4-.31.79-1.88-1.49-1.92 1.93-1.93 1.92 1.49z",
  ),
  hole: c(12, 12, 3),
});
export const SlidersIcon = /* @__PURE__ */ icon("sliders", {
  body: `${c(15, 6.5, 2)}${c(9, 12, 2)}${c(17, 17.5, 2)}`,
  bold: p("M4 6.5h9M17 6.5h3M4 12h3M11 12h9M4 17.5h11M19 17.5h1"),
});
export const FilterIcon = /* @__PURE__ */ icon("filter", { body: p("M4 5h16l-6 7.5V18l-4 2v-7.5z") });
export const SearchIcon = /* @__PURE__ */ icon("search", { body: c(10.5, 10.5, 6.5), bold: p("m20 20-4.6-4.6") });
export const ZoomInIcon = /* @__PURE__ */ icon("zoom-in", {
  body: c(10.5, 10.5, 6.5),
  cut: p("M10.5 8v5M8 10.5h5"),
  bold: p("m20 20-4.6-4.6"),
});
export const ZoomOutIcon = /* @__PURE__ */ icon("zoom-out", {
  body: c(10.5, 10.5, 6.5),
  cut: p("M8 10.5h5"),
  bold: p("m20 20-4.6-4.6"),
});
export const PowerIcon = /* @__PURE__ */ icon("power", { bold: p("M12 3.5v8M7.1 6.6a7.5 7.5 0 1 0 9.8 0") });
export const PinIcon = /* @__PURE__ */ icon("pin", {
  body: p("M10 3.5h4v5l3.5 4.5h-11L10 8.5z"),
  bold: p("M9 3.5h6M12 13v7.5"),
});
export const EyeIcon = /* @__PURE__ */ icon("eye", { body: EYE, hole: c(12, 12, 3) });
export const EyeOffIcon = /* @__PURE__ */ icon("eye-off", {
  body: EYE,
  hole: c(12, 12, 3),
  slash: p("m3.5 3.5 17 17"),
});
