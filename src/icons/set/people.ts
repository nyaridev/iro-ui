// People icons: people, groups, faces and signatures.

// ── Dependencies ──────────────────────────
import { c, icon, p } from "../icon";

// ── Public API ────────────────────────────
export const UserIcon = /* @__PURE__ */ icon("user", {
  body: `${c(12, 8.5, 3.75)}${p("M4.5 20a7.5 7.5 0 0 1 15 0z")}`,
});
export const UsersIcon = /* @__PURE__ */ icon("users", {
  body: `${c(9, 8.5, 3.25)}${p("M3 19.5a6 6 0 0 1 12 0z")}`,
  bold: p("M16 5.4a3.25 3.25 0 0 1 0 6.2M18 14.3a6 6 0 0 1 3 5.2"),
});
export const UserPlusIcon = /* @__PURE__ */ icon("user-plus", {
  body: `${c(9, 8.5, 3.25)}${p("M3 19.5a6 6 0 0 1 12 0z")}`,
  bold: p("M18.5 8v6M15.5 11h6"),
});
export const FigureIcon = /* @__PURE__ */ icon("figure", {
  body: c(12, 4.75, 1.75),
  bold: p("M12 7.5V13M6.5 9.5l5.5 1 5.5-1M12 13l-3.5 7M12 13l3.5 7"),
});
export const FaceScanIcon = /* @__PURE__ */ icon("face-scan", {
  body: c(12, 10.5, 3),
  bold: p(
    "M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M7.8 17.2a4.6 4.6 0 0 1 8.4 0",
  ),
});
export const SignatureIcon = /* @__PURE__ */ icon("signature", {
  bold: p("M4 16.5c2.5-1.5 4-9 6.5-9 2 0 0 7.5 1.5 7.5s2.5-3 4-3c1.2 0 1 2.5 2.5 2.5.8 0 1.5-.5 2-1M4 20.5h16"),
});
