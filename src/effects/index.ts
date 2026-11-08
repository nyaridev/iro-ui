// iro-ui/effects (ADR-0008): the backdrop and the window effects as plain functions on DOM elements, so any app (React,
// Svelte, none) uses the same code. They follow the element's motion mode.

export { type BackdropOptions, mountBackdrop } from "./backdrop";
export { type BlackHoleOptions, blackHole } from "./black-hole";
export { burst } from "./burst";
export { type MotionMode, motionOf } from "./motion";
export { closeReveal, hideForReveal, openReveal } from "./reveal";
