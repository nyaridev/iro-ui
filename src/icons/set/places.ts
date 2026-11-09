// Time and places icons: clocks, calendars, buildings and places.

// ── Dependencies ──────────────────────────
import { c, icon, p, r } from "../icon";

// ── Public API ────────────────────────────
export const ClockIcon = /* @__PURE__ */ icon("clock", { body: c(12, 12, 8.5), cut: p("M12 7.5V12l3 2") });
export const CalendarIcon = /* @__PURE__ */ icon("calendar", {
  body: r(3.5, 5, 17, 15.5, 2.5),
  cut: p("M3.5 10h17"),
  bold: p("M8 3v4M16 3v4"),
});
export const HomeIcon = /* @__PURE__ */ icon("home", {
  // The walls, left open at the top as BlomboUI draws them; the solid fill closes them under the roof.
  body: p("M6 9v9.5A1.5 1.5 0 0 0 7.5 20h9a1.5 1.5 0 0 0 1.5-1.5V9"),
  cut: p("M10 20v-5.5h4V20"),
  bold: p("M4 10.5 12 4l8 6.5"),
});
// The awning's scalloped edge is also a cut, so the solid drawing parts the awning from the walls.
export const StoreIcon = /* @__PURE__ */ icon("store", {
  body: `${p("M5.5 4h13L20 9.5a2.67 2.67 0 0 1-5.33 0 2.67 2.67 0 0 1-5.34 0A2.67 2.67 0 0 1 4 9.5z")}${p("M5.5 12v8.5h13V12")}`,
  cut: `${p("M4 9.5a2.67 2.67 0 0 0 5.33 0 2.67 2.67 0 0 0 5.34 0 2.67 2.67 0 0 0 5.33 0")}${p("M10 20.5v-5h4v5")}`,
});
export const GlobeIcon = /* @__PURE__ */ icon("globe", {
  body: c(12, 12, 8.5),
  cut: p("M3.5 12h17M12 3.5a13 13 0 0 1 0 17 13 13 0 0 1 0-17z"),
});
export const MapPinIcon = /* @__PURE__ */ icon("map-pin", {
  body: p("M12 21.5s-6.5-5.6-6.5-11.25a6.5 6.5 0 0 1 13 0C18.5 15.9 12 21.5 12 21.5z"),
  hole: c(12, 10.25, 2.25),
});
