// Tools icons: tools, kits, launches, experiments and chance.

// ── Dependencies ──────────────────────────
import { c, dot, icon, p, r } from "../icon";

// ── Public API ────────────────────────────
export const WrenchIcon = /* @__PURE__ */ icon("wrench", {
  body: p(
    "M14.7 3.6a4.8 4.8 0 0 0-5.3 6.6l-6 6a1.9 1.9 0 0 0 2.7 2.7l6-6a4.8 4.8 0 0 0 6.6-5.3l-2.8 2.8-2.4-.6-.6-2.4z",
  ),
});
export const ToolboxIcon = /* @__PURE__ */ icon("toolbox", {
  body: r(3, 8, 18, 11.5, 2.5),
  cut: p("M3 13h18M8 11.5v3M16 11.5v3"),
  bold: p("M9 8V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2"),
});
export const RocketIcon = /* @__PURE__ */ icon("rocket", {
  body: p("M12 2.8c3 2.2 4.5 5.7 4.5 9.7v4h-9v-4c0-4 1.5-7.5 4.5-9.7z"),
  hole: c(12, 10, 1.6),
  bold: p("M7.5 13.5 5 16v3h2.5M16.5 13.5 19 16v3h-2.5M10.5 19.5v1.5M13.5 19.5v1.5"),
});
export const FlaskIcon = /* @__PURE__ */ icon("flask", {
  body: p("M10 3.5v5.2L4.6 17.6A2 2 0 0 0 6.3 20.5h11.4a2 2 0 0 0 1.7-2.9L14 8.7V3.5z"),
  cut: p("M7.2 14.5h9.6"),
  bold: p("M9.5 3.5h5"),
});
export const ScaleIcon = /* @__PURE__ */ icon("scale", {
  body: p("m5 7-2.5 6a2.8 2.8 0 0 0 5 0zM19 7l-2.5 6a2.8 2.8 0 0 0 5 0z"),
  bold: p("M12 4v16M7.5 20h9M5 7h14"),
});
export const DiceIcon = /* @__PURE__ */ icon("dice", {
  body: r(4, 4, 16, 16, 3.5),
  cut: `${dot(8.5, 8.5)}${dot(15.5, 8.5)}${dot(12, 12)}${dot(8.5, 15.5)}${dot(15.5, 15.5)}`,
});
export const BroomIcon = /* @__PURE__ */ icon("broom", {
  body: p("M9.75 10.75 13.25 14.25 9.75 21.25 2.75 14.25z"),
  cut: p("M7.37 11.91 12.09 16.63M9.21 17.28 7.15 19.33M6.73 14.8 4.67 16.85"),
  bold: p("M20 4 11.5 12.5"),
});
