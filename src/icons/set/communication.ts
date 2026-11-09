// Communication icons: chat, mail, sending, sharing and connections.

// ── Dependencies ──────────────────────────
import { c, dot, icon, p, r } from "../icon";

// ── Constants ─────────────────────────────
const WIFI = `${p("M2.8 8.3a13 13 0 0 1 18.4 0M5.65 11.15a9 9 0 0 1 12.7 0M8.45 13.95a5 5 0 0 1 7.1 0")}${dot(12, 17.5, 1.4)}`;

// ── Public API ────────────────────────────
export const ChatIcon = /* @__PURE__ */ icon("chat", {
  body: p(
    "M12 4.5c4.7 0 8.5 3.1 8.5 7s-3.8 7-8.5 7c-1.1 0-2.2-.2-3.2-.5l-4.3 1.5 1.2-3.5a6.6 6.6 0 0 1-2.2-4.5c0-3.9 3.8-7 8.5-7z",
  ),
  cut: `${dot(8.5, 11.5)}${dot(12, 11.5)}${dot(15.5, 11.5)}`,
});
export const MailIcon = /* @__PURE__ */ icon("mail", { body: r(3, 5, 18, 14, 2.5), cut: p("m3.5 7.5 8.5 6 8.5-6") });
export const SendIcon = /* @__PURE__ */ icon("send", {
  body: p("M20.5 3.5 3.5 10.2l6.8 3.5 3.5 6.8z"),
  cut: p("m10.3 13.7 5.2-5.2"),
});
export const ShareIcon = /* @__PURE__ */ icon("share", {
  body: `${c(18, 5.5, 2.5)}${c(6, 12, 2.5)}${c(18, 18.5, 2.5)}`,
  bold: p("m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1"),
});
export const BroadcastIcon = /* @__PURE__ */ icon("broadcast", {
  body: c(12, 12, 2),
  bold: p(
    "M8.3 8.3a5.2 5.2 0 0 0 0 7.4M15.7 8.3a5.2 5.2 0 0 1 0 7.4M5.5 5.5a9.2 9.2 0 0 0 0 13M18.5 5.5a9.2 9.2 0 0 1 0 13",
  ),
});
export const WifiIcon = /* @__PURE__ */ icon("wifi", { bold: WIFI });
export const WifiOffIcon = /* @__PURE__ */ icon("wifi-off", { bold: WIFI, slash: p("m3.5 3.5 17 17") });
