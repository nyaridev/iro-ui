// Charts icons: activity, bars and gauges.

// ── Dependencies ──────────────────────────
import { c, icon, p } from "../icon";

// ── Public API ────────────────────────────
export const ActivityIcon = /* @__PURE__ */ icon("activity", { bold: p("M3 12h2.5l2-6 3 12 3-9 2 6 1.5-3H21") });
export const ChartIcon = /* @__PURE__ */ icon("chart", {
  bold: p("M4.5 20.5v-7M10 20.5v-16M15.5 20.5v-10M3.5 20.5h17"),
});
export const GaugeIcon = /* @__PURE__ */ icon("gauge", {
  body: c(12, 14.2, 1.3),
  bold: p("M4.6 17.5a8.5 8.5 0 1 1 14.8 0M12 14l3.6-4.2"),
});
