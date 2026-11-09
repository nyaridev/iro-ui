// Basics icons: add, remove, close, confirm, more, drag and the menu.

// ── Dependencies ──────────────────────────
import { dot, icon, p } from "../icon";

// ── Public API ────────────────────────────
export const PlusIcon = /* @__PURE__ */ icon("plus", { bold: p("M12 5v14M5 12h14") });
export const MinusIcon = /* @__PURE__ */ icon("minus", { bold: p("M5 12h14") });
export const CloseIcon = /* @__PURE__ */ icon("close", { bold: p("M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5") });
export const CheckIcon = /* @__PURE__ */ icon("check", { bold: p("m5 12.5 4.5 4.5L19 7.5") });
export const MoreHorizontalIcon = /* @__PURE__ */ icon("more-horizontal", {
  bold: `${dot(6, 12, 1.4)}${dot(12, 12, 1.4)}${dot(18, 12, 1.4)}`,
});
export const MoreVerticalIcon = /* @__PURE__ */ icon("more-vertical", {
  bold: `${dot(12, 6, 1.4)}${dot(12, 12, 1.4)}${dot(12, 18, 1.4)}`,
});
export const GripIcon = /* @__PURE__ */ icon("grip", {
  bold: `${dot(9, 6, 1.25)}${dot(15, 6, 1.25)}${dot(9, 12, 1.25)}${dot(15, 12, 1.25)}${dot(9, 18, 1.25)}${dot(15, 18, 1.25)}`,
});
export const MenuIcon = /* @__PURE__ */ icon("menu", { bold: p("M4 6.5h16M4 12h16M4 17.5h16") });
