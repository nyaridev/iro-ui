// Layout icons: grids, rows, columns, tables, lists, panes and windows.

// ── Dependencies ──────────────────────────
import { dot, icon, p, r } from "../icon";

// ── Constants ─────────────────────────────
/** The window most layout icons draw their panes in. */
const FRAME = r(3.5, 4.5, 17, 15, 2.5);

// ── Public API ────────────────────────────
export const GridIcon = /* @__PURE__ */ icon("grid", {
  body: `${r(3.5, 3.5, 7, 7, 1.75)}${r(13.5, 3.5, 7, 7, 1.75)}${r(3.5, 13.5, 7, 7, 1.75)}${r(13.5, 13.5, 7, 7, 1.75)}`,
});
export const MosaicIcon = /* @__PURE__ */ icon("mosaic", {
  body: `${r(3.5, 3.5, 8, 7, 1.75)}${r(14.5, 3.5, 6, 7, 1.75)}${r(3.5, 13.5, 5, 7, 1.75)}${r(11.5, 13.5, 9, 7, 1.75)}`,
});
// Rows and columns are dividers cut into one frame: separate bars this close would run together.
export const RowsIcon = /* @__PURE__ */ icon("rows", { body: FRAME, cut: p("M3.5 9.5h17M3.5 14.5h17") });
export const ColumnsIcon = /* @__PURE__ */ icon("columns", { body: FRAME, cut: p("M9.17 4.5v15M14.83 4.5v15") });
export const TableIcon = /* @__PURE__ */ icon("table", {
  body: FRAME,
  cut: p("M3.5 9.5h17M3.5 14.5h17M9.5 9.5v10"),
});
export const ListIcon = /* @__PURE__ */ icon("list", {
  bold: `${p("M9 6.5h11.5M9 12h11.5M9 17.5h11.5")}${dot(4.75, 6.5)}${dot(4.75, 12)}${dot(4.75, 17.5)}`,
});
export const SidebarIcon = /* @__PURE__ */ icon("sidebar", {
  body: FRAME,
  cut: p("M9.5 4.5v15M6 8.5h1M6 11.5h1"),
});
export const CompareIcon = /* @__PURE__ */ icon("compare", {
  body: FRAME,
  cut: p("m8.5 10.5-2 1.5 2 1.5M15.5 10.5l2 1.5-2 1.5"),
  slash: p("M12 2.5v19"),
});
export const AppWindowIcon = /* @__PURE__ */ icon("app-window", {
  body: r(3, 4.5, 18, 15, 2.5),
  cut: `${p("M3 9h18")}${dot(6.25, 6.75, 0.8)}${dot(8.75, 6.75, 0.8)}`,
});
export const AspectRatioIcon = /* @__PURE__ */ icon("aspect-ratio", {
  body: r(3.5, 6, 17, 12, 2),
  cut: p("M7 11V9h2.5M17 13v2h-2.5"),
});
export const ScaleUpIcon = /* @__PURE__ */ icon("scale-up", {
  body: r(3.5, 12.5, 8, 8, 1.75),
  bold: p("M14 3.5h6.5V10m0-6.5-8 8M3.5 9V5.5a2 2 0 0 1 2-2H9M15 20.5h3.5a2 2 0 0 0 2-2V15"),
});
export const LayoutEditIcon = /* @__PURE__ */ icon("layout-edit", {
  body: `${r(3.5, 3.5, 7, 7, 1.75)}${r(3.5, 13.5, 7, 7, 1.75)}${r(13.5, 3.5, 7, 7, 1.75)}${p("m14 20.5.6-2.6 4.5-4.5a1.4 1.4 0 0 1 2 2l-4.5 4.5z")}`,
});
