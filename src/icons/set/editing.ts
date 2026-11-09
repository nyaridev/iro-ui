// Editing icons: edit, copy, cut, delete, save and link.

// ── Dependencies ──────────────────────────
import { c, icon, p, r } from "../icon";

// ── Constants ─────────────────────────────
const BIN = p("m6 6.5.9 12a2 2 0 0 0 2 1.9h6.2a2 2 0 0 0 2-1.9l.9-12z");
const LID = p("M4 6.5h16M9.5 6.5V4.8a1.3 1.3 0 0 1 1.3-1.3h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7");
const BACK_SHEET = p("M15.5 8.5V6A2.5 2.5 0 0 0 13 3.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5");

// ── Public API ────────────────────────────
export const PencilIcon = /* @__PURE__ */ icon("pencil", {
  body: p("M15.5 4.5 19.5 8.5 9 19l-5 1 1-5z"),
  cut: p("m13.5 6.5 4 4"),
});
export const EraserIcon = /* @__PURE__ */ icon("eraser", {
  body: p("m14 4.5 6 6-8.5 8.5H7.5L4 15.5z"),
  cut: p("m9.5 9 6 6"),
  bold: p("M11.5 19H20"),
});
export const CopyIcon = /* @__PURE__ */ icon("copy", { body: r(8.5, 8.5, 12, 12, 2.5), bold: BACK_SHEET });
export const DuplicateIcon = /* @__PURE__ */ icon("duplicate", {
  body: r(8.5, 8.5, 12, 12, 2.5),
  cut: p("M14.5 11.75v5.5M11.75 14.5h5.5"),
  bold: BACK_SHEET,
});
export const ScissorsIcon = /* @__PURE__ */ icon("scissors", {
  body: `${c(6.5, 6.5, 3)}${c(6.5, 17.5, 3)}`,
  bold: p("M8.6 8.6 20 20M8.6 15.4 20 4"),
});
export const TrashIcon = /* @__PURE__ */ icon("trash", { body: BIN, cut: p("M10 10.5v6M14 10.5v6"), bold: LID });
export const TrashRestoreIcon = /* @__PURE__ */ icon("trash-restore", {
  body: BIN,
  cut: p("M12 17.5v-6.25M9.5 13.5 12 11l2.5 2.5"),
  bold: LID,
});
export const SaveIcon = /* @__PURE__ */ icon("save", {
  body: p("M5.5 3.5h10l4 4v11a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z"),
  cut: p("M8 3.5V8h7V3.5M7.5 20.5v-6h9v6"),
});
export const LinkIcon = /* @__PURE__ */ icon("link", {
  bold: p("M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3A4 4 0 0 0 11 18.66l1-1"),
});
export const UnlinkIcon = /* @__PURE__ */ icon("unlink", {
  bold: p(
    "m15.5 13.5 3.2-3.2a4 4 0 0 0-5.7-5.7L10 7.6m-1.5 2.9-3.2 3.2a4 4 0 0 0 5.7 5.7l3-3M4 7l2 .5M7 4l.5 2M20 17l-2-.5M17 20l-.5-2",
  ),
});
