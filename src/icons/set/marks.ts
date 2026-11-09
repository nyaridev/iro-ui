// Marks icons: favorites, flags, rewards, magic, ideas and labels.

// ── Dependencies ──────────────────────────
import { c, icon, p } from "../icon";

// ── Public API ────────────────────────────
export const StarIcon = /* @__PURE__ */ icon("star", {
  body: p("M12 3.8 14.29 9.44 20.37 9.88 15.71 13.81 17.17 19.72 12 16.5 6.83 19.72 8.29 13.81 3.63 9.88 9.71 9.44z"),
});
export const HeartIcon = /* @__PURE__ */ icon("heart", {
  body: p("M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.2 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"),
});
export const BookmarkIcon = /* @__PURE__ */ icon("bookmark", {
  body: p("M6.5 5.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v15l-5.5-4-5.5 4z"),
});
export const FlagIcon = /* @__PURE__ */ icon("flag", {
  body: p("M5.5 4.5h12.5l-2.75 4.75L18 14H5.5z"),
  bold: p("M5.5 3.5v17"),
});
export const CrownIcon = /* @__PURE__ */ icon("crown", { body: p("M5 18.5 3.5 8l5 3.5L12 5l3.5 6.5 5-3.5L19 18.5z") });
export const TrophyIcon = /* @__PURE__ */ icon("trophy", {
  body: p("M6.5 3.5h11V9a5.5 5.5 0 0 1-11 0z"),
  bold: p("M6.5 9H5a2.25 2.25 0 0 1 0-4.5h1.5M17.5 9H19a2.25 2.25 0 0 0 0-4.5h-1.5M12 14.5v6M8 20.5h8"),
});
export const BoltIcon = /* @__PURE__ */ icon("bolt", { body: p("M13 3 5 13.5h6L10.5 21 19 10.5h-6z") });
export const SparkleIcon = /* @__PURE__ */ icon("sparkle", {
  body: p("M12 3c.8 5.4 3.6 8.2 9 9-5.4.8-8.2 3.6-9 9-.8-5.4-3.6-8.2-9-9 5.4-.8 8.2-3.6 9-9z"),
});
export const WandIcon = /* @__PURE__ */ icon("wand", {
  bold: p("m4.5 19.5 10-10m-1 -1 2 2M18.5 3v3.5m-1.75-1.75h3.5M8.5 4v2.5M7.25 5.25h2.5M19.5 13.5V16m-1.25-1.25h2.5"),
});
export const LightbulbIcon = /* @__PURE__ */ icon("lightbulb", {
  body: p("M9 15.5c0-1.4-.7-2.1-1.7-3A6 6 0 1 1 16.7 12.5c-1 .9-1.7 1.6-1.7 3z"),
  bold: p("M9 18.5h6M10.5 21.25h3"),
});
export const TagIcon = /* @__PURE__ */ icon("tag", {
  body: p("M3.5 12.6V5.5a2 2 0 0 1 2-2h7.1l8 8a2 2 0 0 1 0 2.8l-7 7a2 2 0 0 1-2.8 0z"),
  hole: c(8, 8, 1.4),
});
export const HashIcon = /* @__PURE__ */ icon("hash", { bold: p("M5 9h15M4 15h15M10 4 8 20M16 4l-2 16") });
