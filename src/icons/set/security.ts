// Security icons: locks, keys and shields.

// ── Dependencies ──────────────────────────
import { c, icon, p, r } from "../icon";

// ── Constants ─────────────────────────────
const SHIELD = p("M12 3 19 5.75v5.5c0 4.4-3 8-7 9.75-4-1.75-7-5.35-7-9.75v-5.5z");

// ── Public API ────────────────────────────
export const LockIcon = /* @__PURE__ */ icon("lock", {
  body: r(5, 10.5, 14, 10, 2.5),
  bold: p("M8 10.5v-3a4 4 0 0 1 8 0v3"),
});
export const UnlockIcon = /* @__PURE__ */ icon("unlock", {
  body: r(5, 10.5, 14, 10, 2.5),
  bold: p("M8 10.5v-3a4 4 0 0 1 7.7-1.5"),
});
export const KeyIcon = /* @__PURE__ */ icon("key", {
  body: c(8, 16, 4.5),
  hole: c(8, 16, 1.5),
  bold: p("M11.2 12.8 20 4M17 7l2.5 2.5M14.5 9.5l2 2"),
});
export const ShieldIcon = /* @__PURE__ */ icon("shield", { body: SHIELD });
export const ShieldCheckIcon = /* @__PURE__ */ icon("shield-check", {
  body: SHIELD,
  cut: p("m9 12 2.25 2.25L15.5 10"),
});
