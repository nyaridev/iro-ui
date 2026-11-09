// Folders and storage icons: folders, inboxes, archives and databases.

// ── Dependencies ──────────────────────────
import { e, icon, p, r } from "../icon";

// ── Constants ─────────────────────────────
const FOLDER = p("M3.5 7.5a2 2 0 0 1 2-2h3.6l2 2.2h7.4a2 2 0 0 1 2 2v7.8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z");

// ── Public API ────────────────────────────
export const FolderIcon = /* @__PURE__ */ icon("folder", { body: FOLDER });
export const FolderOpenIcon = /* @__PURE__ */ icon("folder-open", {
  body: p("M3.6 18.1 6 12a1.5 1.5 0 0 1 1.4-1h12.4a1 1 0 0 1 .9 1.4l-2.4 6a1.5 1.5 0 0 1-1.4 1H4.5a1 1 0 0 1-.9-1.3z"),
  bold: p("M3.5 17V7.5a2 2 0 0 1 2-2h3.6l2 2.2h6.4a2 2 0 0 1 2 2V11"),
});
export const FolderPlusIcon = /* @__PURE__ */ icon("folder-plus", {
  body: FOLDER,
  cut: p("M12 11v5.5M9.25 13.75h5.5"),
});
export const FolderMoveIcon = /* @__PURE__ */ icon("folder-move", {
  body: FOLDER,
  cut: p("M8.75 13.75h6.5m-2.5-2.5 2.5 2.5-2.5 2.5"),
});
export const FoldersIcon = /* @__PURE__ */ icon("folders", {
  body: p("M3 10a2 2 0 0 1 2-2h3l1.8 2H16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"),
  bold: p("M6.5 6V5.5A2 2 0 0 1 8.5 3.5h2.7l1.8 2h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2"),
});
export const InboxIcon = /* @__PURE__ */ icon("inbox", {
  body: r(3.5, 4.5, 17, 15, 2.5),
  cut: p("M3.5 13.5h4.25l1.5 2.5h5.5l1.5-2.5h4.25"),
});
export const ArchiveIcon = /* @__PURE__ */ icon("archive", {
  body: `${r(3, 4, 18, 4.5, 1.5)}${p("M4.5 8.5v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-10")}`,
  cut: p("M3 8.5h18M10 12.5h4"),
});
export const DatabaseIcon = /* @__PURE__ */ icon("database", {
  body: `${e(12, 6, 7.5, 2.75)}${p("M4.5 6v12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75V6")}`,
  cut: p("M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75M4.5 6c0 1.5 3.4 2.75 7.5 2.75S19.5 7.5 19.5 6"),
});
