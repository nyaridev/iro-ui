// Weather and nature icons: sun, moon, cloud, temperature, water and plants.

// ── Dependencies ──────────────────────────
import { c, icon, p } from "../icon";

// ── Public API ────────────────────────────
export const SunIcon = /* @__PURE__ */ icon("sun", {
  body: c(12, 12, 4),
  bold: p("M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"),
});
export const MoonIcon = /* @__PURE__ */ icon("moon", { body: p("M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z") });
export const CloudIcon = /* @__PURE__ */ icon("cloud", {
  body: p("M6.5 19h11a4 4 0 0 0 .6-7.95 6 6 0 0 0-11.6-.5A4.25 4.25 0 0 0 6.5 19z"),
});
export const ThermometerIcon = /* @__PURE__ */ icon("thermometer", {
  body: p("M10 13.6V5a2 2 0 1 1 4 0v8.6a4 4 0 1 1-4 0z"),
  cut: p("M12 9.5v5.5"),
});
export const DropletIcon = /* @__PURE__ */ icon("droplet", {
  body: p("M12 3.5c3.5 4 6 7.2 6 10.5a6 6 0 0 1-12 0c0-3.3 2.5-6.5 6-10.5z"),
  cut: p("M14.75 14a2.75 2.75 0 0 1-2.25 2.6"),
});
export const SproutIcon = /* @__PURE__ */ icon("sprout", {
  body: p("M12 12.5C12 8.6 9.4 6 4.5 6c0 4 2.8 6.5 7.5 6.5zM12 10c0-3.5 2.6-6 7.5-6 0 3.7-2.7 6-7.5 6z"),
  bold: p("M12 20.5v-8"),
});
