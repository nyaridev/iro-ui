// Text and code icons: type, fonts, code, the terminal and bugs.

// ── Dependencies ──────────────────────────
import { c, icon, p, r } from "../icon";

// ── Public API ────────────────────────────
export const TypeIcon = /* @__PURE__ */ icon("type", { bold: p("M5 7.5V5h14v2.5M12 5v14M9 19h6") });
export const FontIcon = /* @__PURE__ */ icon("font", {
  bold: `${p("M3.5 18.5 8.5 5.5l5 13M5.4 14h6.2M20.4 12.5v6")}${c(17.6, 15.7, 2.8)}`,
});
export const CodeIcon = /* @__PURE__ */ icon("code", {
  bold: p("m8.5 7.5-4.5 4.5 4.5 4.5M15.5 7.5l4.5 4.5-4.5 4.5M13.25 5.5l-2.5 13"),
});
export const BracesIcon = /* @__PURE__ */ icon("braces", {
  body: p(
    "M12 8.25c.35 1.9 1.35 2.9 3.25 3.25-1.9.35-2.9 1.35-3.25 3.25-.35-1.9-1.35-2.9-3.25-3.25 1.9-.35 2.9-1.35 3.25-3.25z",
  ),
  bold: p(
    "M8 4H7a2 2 0 0 0-2 2v3.5A2.5 2.5 0 0 1 3 12a2.5 2.5 0 0 1 2 2.5V18a2 2 0 0 0 2 2h1M16 4h1a2 2 0 0 1 2 2v3.5a2.5 2.5 0 0 0 2 2.5 2.5 2.5 0 0 0-2 2.5V18a2 2 0 0 1-2 2h-1",
  ),
});
export const TerminalIcon = /* @__PURE__ */ icon("terminal", {
  body: r(3, 4.5, 18, 15, 2.5),
  cut: p("m7 9.5 3 2.5-3 2.5M12.5 15h4.5"),
});
export const BugIcon = /* @__PURE__ */ icon("bug", {
  body: p("M12 20.5a5 5 0 0 1-5-5V12a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3.5a5 5 0 0 1-5 5z"),
  cut: p("M12 12.5V18"),
  bold: p("M9.5 9V7.5a2.5 2.5 0 0 1 5 0V9M7 13H3.5M17 13h3.5M7 17l-3 1.5M17 17l3 1.5"),
});
