// Files icons: documents, attachments, the clipboard and books.

// ── Dependencies ──────────────────────────
import { dot, icon, p, r } from "../icon";

// ── Constants ─────────────────────────────
const FILE = p("M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8z");
const FOLD = p("M14 3.5V8h4.5");
const CLIP = r(8, 2.5, 8, 4.5, 1.75);

// ── Public API ────────────────────────────
export const FileIcon = /* @__PURE__ */ icon("file", { body: FILE, cut: FOLD });
export const FileTextIcon = /* @__PURE__ */ icon("file-text", { body: FILE, cut: `${FOLD}${p("M9 12.5h6M9 16h4")}` });
export const FilePlusIcon = /* @__PURE__ */ icon("file-plus", { body: FILE, cut: `${FOLD}${p("M12 11v6M9 14h6")}` });
export const FileInfoIcon = /* @__PURE__ */ icon("file-info", {
  body: FILE,
  cut: `${FOLD}${p("M12 12.5v4.5")}${dot(12, 9.9, 0.95)}`,
});
export const FileCodeIcon = /* @__PURE__ */ icon("file-code", {
  body: FILE,
  cut: `${FOLD}${p("m10 12-2 2.25 2 2.25m4-4.5 2 2.25-2 2.25")}`,
});
// The clip's lower edge is also a cut, so the solid drawing parts the clip from the board.
export const ClipboardIcon = /* @__PURE__ */ icon("clipboard", {
  body: `${p("M8 5H7a2.5 2.5 0 0 0-2.5 2.5V19A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.5-2.5V7.5A2.5 2.5 0 0 0 17 5h-1")}${CLIP}`,
  cut: p("M8 5v.25a1.75 1.75 0 0 0 1.75 1.75h4.5A1.75 1.75 0 0 0 16 5.25V5"),
});
export const PaperclipIcon = /* @__PURE__ */ icon("paperclip", {
  bold: `<g transform="rotate(45 12 12)">${p("M10 8.5V14a2 2 0 0 0 4 0V6.5a4 4 0 0 0-8 0v9a6 6 0 0 0 12 0V8")}</g>`,
});
export const BookIcon = /* @__PURE__ */ icon("book", {
  body: p("M5 4.5A1.5 1.5 0 0 1 6.5 3h12v14.5h-12A1.5 1.5 0 0 0 5 19z"),
  cut: p("M9 7.5h6"),
  bold: p("M5 19a1.5 1.5 0 0 0 1.5 1.5h12v-3"),
});
