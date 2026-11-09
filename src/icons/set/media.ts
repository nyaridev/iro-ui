// Media icons: pictures, playback, sound and color.

// ── Dependencies ──────────────────────────
import { c, icon, p, r } from "../icon";

// ── Constants ─────────────────────────────
const SPEAKER = p("M4 9.5h3l4.5-4v13l-4.5-4H4z");

// ── Public API ────────────────────────────
export const ImageIcon = /* @__PURE__ */ icon("image", {
  body: r(3.5, 4.5, 17, 15, 2.5),
  hole: c(9, 9.5, 1.6),
  cut: p("m3.5 17 5-5 4 4 2.5-2.5 5.5 5.5"),
});
export const ImagesIcon = /* @__PURE__ */ icon("images", {
  body: r(3.5, 6.5, 14, 13, 2.5),
  hole: c(13, 10.25, 1.25),
  cut: p("m3.5 16 4-4 3.5 3.5 2-2 4.5 4.5"),
  bold: p("M7 3.5h11a2.5 2.5 0 0 1 2.5 2.5v10"),
});
export const CameraIcon = /* @__PURE__ */ icon("camera", {
  body: p("M4 8.5a2 2 0 0 1 2-2h1.8l1.4-2h5.6l1.4 2H18a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"),
  hole: c(12, 12.5, 3.3),
});
export const PlayIcon = /* @__PURE__ */ icon("play", {
  body: p("M7.5 5.2v13.6a1 1 0 0 0 1.5.9l10.5-6.8a1 1 0 0 0 0-1.7L9 4.4a1 1 0 0 0-1.5.8z"),
});
export const PauseIcon = /* @__PURE__ */ icon("pause", {
  body: `${r(6.5, 5, 3.5, 14, 1.25)}${r(14, 5, 3.5, 14, 1.25)}`,
});
export const StopIcon = /* @__PURE__ */ icon("stop", { body: r(6, 6, 12, 12, 2.5) });
export const SkipBackIcon = /* @__PURE__ */ icon("skip-back", {
  body: p("M18.5 5.6v12.8a.8.8 0 0 1-1.2.7l-9.3-6.4a.8.8 0 0 1 0-1.4l9.3-6.4a.8.8 0 0 1 1.2.7z"),
  bold: p("M5 5v14"),
});
export const SkipForwardIcon = /* @__PURE__ */ icon("skip-forward", {
  body: p("M5.5 5.6v12.8a.8.8 0 0 0 1.2.7l9.3-6.4a.8.8 0 0 0 0-1.4L6.7 4.9a.8.8 0 0 0-1.2.7z"),
  bold: p("M19 5v14"),
});
export const VolumeIcon = /* @__PURE__ */ icon("volume", {
  body: SPEAKER,
  bold: p("M15 9a4 4 0 0 1 0 6M17.5 6.5a7.5 7.5 0 0 1 0 11"),
});
export const VolumeOffIcon = /* @__PURE__ */ icon("volume-off", {
  body: SPEAKER,
  bold: p("m15.5 9.5 5 5M20.5 9.5l-5 5"),
});
export const MicIcon = /* @__PURE__ */ icon("mic", {
  body: r(9, 3, 6, 11, 3),
  bold: p("M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"),
});
export const AudioBarsIcon = /* @__PURE__ */ icon("audio-bars", { bold: p("M4 10v4M8 7v10M12 4v16M16 8v8M20 10.5v3") });
export const WaveIcon = /* @__PURE__ */ icon("wave", { bold: p("M3 12c2-4.5 4-4.5 6 0s4 4.5 6 0 4-4.5 6 0") });
export const PaletteIcon = /* @__PURE__ */ icon("palette", {
  body: p(
    "M12 3.5a8.5 8.5 0 0 0 0 17c1.2 0 1.8-.9 1.4-1.9l-.5-1.2a1.6 1.6 0 0 1 1.5-2.2H17a3.5 3.5 0 0 0 3.5-3.5c0-4.5-3.8-8.2-8.5-8.2z",
  ),
  hole: `${c(7.8, 11.5, 1.1)}${c(10, 7.6, 1.1)}${c(14.5, 7.6, 1.1)}`,
});
export const PixelIcon = /* @__PURE__ */ icon("pixel", {
  body: p("M7 3.5h10v3.5h3.5v10H17v3.5H7V17H3.5V7H7z"),
  hole: `${r(7, 9.5, 2.5, 5)}${r(14.5, 9.5, 2.5, 5)}`,
});
