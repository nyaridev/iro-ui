// Arrows icons: directions, swaps, expand and shrink, going in and out, upload and download.

// ── Dependencies ──────────────────────────
import { c, icon, p } from "../icon";

// ── Public API ────────────────────────────
export const ArrowLeftIcon = /* @__PURE__ */ icon("arrow-left", { bold: p("M19 12H5M11 6l-6 6 6 6") });
export const ArrowRightIcon = /* @__PURE__ */ icon("arrow-right", { bold: p("M5 12h14M13 6l6 6-6 6") });
export const ArrowUpIcon = /* @__PURE__ */ icon("arrow-up", { bold: p("M12 19V5M6 11l6-6 6 6") });
export const ArrowDownIcon = /* @__PURE__ */ icon("arrow-down", { bold: p("M12 5v14M6 13l6 6 6-6") });
export const ArrowUpCircleIcon = /* @__PURE__ */ icon("arrow-up-circle", {
  body: c(12, 12, 8.5),
  cut: p("M12 16.5v-9M8.5 11 12 7.5l3.5 3.5"),
});
export const SwapHorizontalIcon = /* @__PURE__ */ icon("swap-horizontal", {
  bold: p("M4 8h14m-3-3 3 3-3 3M20 16H6m3-3-3 3 3 3"),
});
export const SwapVerticalIcon = /* @__PURE__ */ icon("swap-vertical", {
  bold: p("M7.5 4v14m-3-3 3 3 3-3M16.5 20V6m-3 3 3-3 3 3"),
});
export const ExpandIcon = /* @__PURE__ */ icon("expand", {
  bold: p("M14.5 3.5h6v6M9.5 20.5h-6v-6M20.5 3.5 14 10M3.5 20.5 10 14"),
});
export const ShrinkIcon = /* @__PURE__ */ icon("shrink", {
  bold: p("M20.5 3.5 14 10m0-5.5V10h5.5M3.5 20.5 10 14m0 5.5V14H4.5"),
});
export const ExternalLinkIcon = /* @__PURE__ */ icon("external-link", {
  bold: p("M13.5 4.5h6v6m0-6-8 8M18 14v3.5a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2H10"),
});
export const LogInIcon = /* @__PURE__ */ icon("log-in", {
  bold: p("M14.5 4.5h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-3M10 7.5l4.5 4.5-4.5 4.5M14.5 12h-10"),
});
export const LogOutIcon = /* @__PURE__ */ icon("log-out", {
  bold: p("M14.5 4.5h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-3M10 16.5 5.5 12 10 7.5M5.5 12h10"),
});
export const UploadIcon = /* @__PURE__ */ icon("upload", {
  bold: p("M12 15.5V4M7.5 8.5 12 4l4.5 4.5M4 15v2.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V15"),
});
export const DownloadIcon = /* @__PURE__ */ icon("download", {
  bold: p("M12 4v11.5M7.5 11l4.5 4.5 4.5-4.5M4 15v2.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V15"),
});
export const TrayInIcon = /* @__PURE__ */ icon("tray-in", {
  bold: p("M12 3.5v11M7.5 10l4.5 4.5 4.5-4.5M3.5 13.5v4a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-4"),
});
export const TrayOutIcon = /* @__PURE__ */ icon("tray-out", {
  bold: p("M12 14.5v-11M7.5 8 12 3.5 16.5 8M3.5 13.5v4a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-4"),
});
