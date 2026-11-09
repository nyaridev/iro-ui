// Devices icons: screens, input, servers, chips and other hardware.

// ── Dependencies ──────────────────────────
import { dot, icon, p, r } from "../icon";

// ── Public API ────────────────────────────
export const MonitorIcon = /* @__PURE__ */ icon("monitor", {
  body: r(3, 4, 18, 12.5, 2.5),
  bold: p("M12 16.5v4M8.5 20.5h7"),
});
export const SmartphoneIcon = /* @__PURE__ */ icon("smartphone", {
  body: r(6.5, 2.5, 11, 19, 2.5),
  cut: p("M10.5 18h3"),
});
export const KeyboardIcon = /* @__PURE__ */ icon("keyboard", {
  body: r(2.5, 6, 19, 12, 2.5),
  cut: p("M6.5 10h.01M9.8 10h.01M13.1 10h.01M16.4 10h.01M7.5 14h9"),
});
export const CursorIcon = /* @__PURE__ */ icon("cursor", {
  body: p("M5.5 4.5 18.5 9.5l-5.6 2.4-2.4 5.6z"),
  bold: p("m13.5 13.5 5 5"),
});
export const ServerIcon = /* @__PURE__ */ icon("server", {
  body: `${r(4, 4, 16, 7, 2)}${r(4, 13, 16, 7, 2)}`,
  cut: `${dot(16.5, 7.5)}${dot(16.5, 16.5)}${p("M7.5 7.5h4M7.5 16.5h4")}`,
});
export const ChipIcon = /* @__PURE__ */ icon("chip", {
  body: r(6, 6, 12, 12, 2),
  cut: r(9.5, 9.5, 5, 5, 1),
  bold: p("M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"),
});
export const ChipDownIcon = /* @__PURE__ */ icon("chip-down", {
  body: r(5.5, 4.5, 13, 10, 2),
  cut: p("M12 8v6.5"),
  bold: p("M9 2v2.5M15 2v2.5M3 8h2.5M18.5 8H21M12 14.5V20m-3.5-3.5 3.5 3.5 3.5-3.5"),
});
export const GamepadIcon = /* @__PURE__ */ icon("gamepad", {
  body: p(
    "M7.5 6.5h9a4.5 4.5 0 0 1 4.4 3.6l1 5.2a2.6 2.6 0 0 1-4.5 2.2L15 15H9l-2.4 2.5a2.6 2.6 0 0 1-4.5-2.2l1-5.2A4.5 4.5 0 0 1 7.5 6.5z",
  ),
  cut: `${p("M8 9v3.5M6.25 10.75h3.5")}${dot(15, 10.75, 1)}${dot(17.5, 10.75, 1)}`,
});
export const RobotIcon = /* @__PURE__ */ icon("robot", {
  body: r(5, 7.5, 14, 11.5, 3),
  cut: `${dot(9.5, 12, 1.25)}${dot(14.5, 12, 1.25)}${p("M9.5 15.5h5")}`,
  bold: `${p("M12 7.5V4.5M3 11.5v3.5M21 11.5v3.5")}${dot(12, 3.75, 1.25)}`,
});
export const PlugIcon = /* @__PURE__ */ icon("plug", {
  body: p("M7.5 8.5h9v3a4.5 4.5 0 0 1-9 0z"),
  bold: p("M10 4v4.5M14 4v4.5M12 16v4.5"),
});
