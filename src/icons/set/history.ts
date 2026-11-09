// History and order icons: refresh, history, undo and redo, shuffle and sort.

// ── Dependencies ──────────────────────────
import { icon, p } from "../icon";

// ── Public API ────────────────────────────
export const RefreshIcon = /* @__PURE__ */ icon("refresh", {
  bold: p("M20 11.5A8 8 0 0 0 5.6 6.8L4 8.5m0-4v4h4M4 12.5a8 8 0 0 0 14.4 4.7l1.6-1.7m0 4v-4h-4"),
});
export const HistoryIcon = /* @__PURE__ */ icon("history", {
  bold: p("M3.5 12A8.5 8.5 0 1 0 12 3.5a9 9 0 0 0-6.4 2.7L3.5 8.5m0-5v5h5M12 7.5V12l3.2 2"),
});
export const UndoIcon = /* @__PURE__ */ icon("undo", { bold: p("M9 14 4.5 9.5 9 5M4.5 9.5H15a4.5 4.5 0 0 1 0 9h-3") });
export const RedoIcon = /* @__PURE__ */ icon("redo", { bold: p("m15 14 4.5-4.5L15 5m4.5 4.5H9a4.5 4.5 0 0 0 0 9h3") });
export const ShuffleIcon = /* @__PURE__ */ icon("shuffle", {
  bold: p(
    "M3.5 7h3c4.5 0 6.5 10 11 10h3M3.5 17h3c1.6 0 2.8-1.3 3.8-3m3.4-4c1-1.7 2.2-3 3.8-3h3M18 4.5 20.5 7 18 9.5m0 5 2.5 2.5-2.5 2.5",
  ),
});
export const SortAscIcon = /* @__PURE__ */ icon("sort-asc", {
  bold: p("M7 20V4M4 7l3-3 3 3m3.5-1h3m-3 6h5m-5 6h7"),
});
export const SortDescIcon = /* @__PURE__ */ icon("sort-desc", {
  bold: p("M7 4v16m-3-3 3 3 3-3m3.5-11h7m-7 6h5m-5 6h3"),
});
