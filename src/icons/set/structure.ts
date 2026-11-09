// Structure icons: shapes for structure: cubes, layers, stacks, flows, branches and steps.

// ── Dependencies ──────────────────────────
import { c, icon, p, r } from "../icon";

// ── Public API ────────────────────────────
export const CubeIcon = /* @__PURE__ */ icon("cube", {
  body: p("M12 3 20 7.5v9L12 21l-8-4.5v-9z"),
  cut: p("M4 7.5 12 12l8-4.5M12 12v9"),
});
export const LayersIcon = /* @__PURE__ */ icon("layers", {
  body: p("m12 3.5 8.5 4.5L12 12.5 3.5 8z"),
  bold: p("m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5"),
});
export const StackIcon = /* @__PURE__ */ icon("stack", {
  body: r(10, 10, 10.5, 10.5, 2.5),
  bold: p("M6.5 17V8.5a2 2 0 0 1 2-2H17M3 13.5V5a2 2 0 0 1 2-2h8.5"),
});
export const FlowIcon = /* @__PURE__ */ icon("flow", {
  body: `${r(3, 4, 7, 5, 1.5)}${r(14, 9.5, 7, 5, 1.5)}${r(3, 15, 7, 5, 1.5)}`,
  bold: p("M10 6.5c2.5 0 1.5 5.5 4 5.5M10 17.5c2.5 0 1.5-5.5 4-5.5"),
});
export const BranchIcon = /* @__PURE__ */ icon("branch", {
  body: `${c(7, 5.5, 2.25)}${c(7, 18.5, 2.25)}${c(17, 7.5, 2.25)}`,
  bold: p("M7 7.75v8.5M17 9.75c0 4.5-10 2-10 6.5"),
});
export const TargetIcon = /* @__PURE__ */ icon("target", {
  body: c(12, 12, 8.5),
  cut: `${c(12, 12, 4)}${p("M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3")}`,
});
export const StairsIcon = /* @__PURE__ */ icon("stairs", { bold: p("M3.5 19.5h5v-5h5v-5h5v-5h2") });
export const PuzzleIcon = /* @__PURE__ */ icon("puzzle", {
  body: p(
    "M5 7.5h3.25a2.25 2.25 0 1 1 4.5 0H16a1 1 0 0 1 1 1v3.25a2.25 2.25 0 1 1 0 4.5V19.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z",
  ),
});
