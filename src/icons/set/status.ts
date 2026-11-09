// Status icons: info, help, alerts, results, loading and notifications.

// ── Dependencies ──────────────────────────
import { c, dot, icon, p } from "../icon";

// ── Constants ─────────────────────────────
const BELL = p("M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z");
const CLAPPER = p("M10 20.5a2.2 2.2 0 0 0 4 0");

// ── Public API ────────────────────────────
export const InfoIcon = /* @__PURE__ */ icon("info", {
  body: c(12, 12, 8.5),
  cut: `${p("M12 11v5.5")}${dot(12, 7.9, 0.95)}`,
});
export const HelpIcon = /* @__PURE__ */ icon("help", {
  body: c(12, 12, 8.5),
  cut: `${p("M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.7")}${dot(12, 16.8, 0.95)}`,
});
export const AlertTriangleIcon = /* @__PURE__ */ icon("alert-triangle", {
  body: p("M10.3 4.3 2.9 17.2A2 2 0 0 0 4.6 20h14.8a2 2 0 0 0 1.7-2.8L13.7 4.3a2 2 0 0 0-3.4 0z"),
  cut: `${p("M12 9.5v4")}${dot(12, 16.75, 0.95)}`,
});
export const AlertCircleIcon = /* @__PURE__ */ icon("alert-circle", {
  body: c(12, 12, 8.5),
  cut: `${p("M12 7.5V13")}${dot(12, 16.25, 0.95)}`,
});
export const CheckCircleIcon = /* @__PURE__ */ icon("check-circle", {
  body: c(12, 12, 8.5),
  cut: p("m8.5 12.3 2.4 2.4 4.6-4.9"),
});
export const CloseCircleIcon = /* @__PURE__ */ icon("close-circle", {
  body: c(12, 12, 8.5),
  cut: p("m9 9 6 6M15 9l-6 6"),
});
export const MinusCircleIcon = /* @__PURE__ */ icon("minus-circle", { body: c(12, 12, 8.5), cut: p("M8 12h8") });
export const PlusCircleIcon = /* @__PURE__ */ icon("plus-circle", { body: c(12, 12, 8.5), cut: p("M12 8v8M8 12h8") });
export const BanIcon = /* @__PURE__ */ icon("ban", { bold: `${c(12, 12, 8.5)}${p("m6 6 12 12")}` });
export const LoaderIcon = /* @__PURE__ */ icon("loader", { bold: p("M12 3.5a8.5 8.5 0 1 0 8.5 8.5") });
export const BellIcon = /* @__PURE__ */ icon("bell", { body: BELL, bold: CLAPPER });
export const BellOffIcon = /* @__PURE__ */ icon("bell-off", { body: BELL, bold: CLAPPER, slash: p("m3.5 3.5 17 17") });
