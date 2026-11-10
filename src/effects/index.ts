// iro-ui/effects (ADR-0008, ADR-0016): the backdrop, the window effects and feedback as plain functions on DOM
// elements, so any app (React, Svelte, none) uses the same code. They follow the element's motion mode.

// The backdrop.
export { mountBackdrop, updateBackdrop } from "./backdrop/backdrop";
// Feedback: effects that leave the element where it is.
export { bounce } from "./feedback/bounce";
export { burst } from "./feedback/burst";
export { flash } from "./feedback/flash";
export { heartbeat } from "./feedback/heartbeat";
export { pulse } from "./feedback/pulse";
export { shake } from "./feedback/shake";
export { success } from "./feedback/success";
export { tap } from "./feedback/tap";
export { wiggle } from "./feedback/wiggle";
export { type MotionMode, motionOf } from "./motion";
export type {
  AuroraOptions,
  BackdropOptions,
  BlackHoleOptions,
  BounceOptions,
  ContoursOptions,
  CrtOptions,
  DustOptions,
  EffectOptions,
  FeedbackOptions,
  GenieOptions,
  GridOptions,
  InkBleedOptions,
  InkOptions,
  LayerOptions,
  LiquidOptions,
  MeshOptions,
  PaperOptions,
  PulseOptions,
  RippleOptions,
  ShakeOptions,
  ShatterOptions,
  Spot,
  SpotlightOptions,
  TapOptions,
} from "./options";
// Window effects: each closes a window (it stays hidden) or opens a hidden one, and any close pairs with any open.
export { closeBlackHole, openBlackHole } from "./window/black-hole";
export { closeBurn, openBurn } from "./window/burn";
export { closeCrt, openCrt } from "./window/crt";
export { closeFold, openFold } from "./window/fold";
export { closeGenie, openGenie } from "./window/genie";
export { closeInkBleed, openInkBleed } from "./window/ink-bleed";
export { closeReveal, openReveal } from "./window/reveal";
export { closeRipple, openRipple } from "./window/ripple";
export { closeShatter, openShatter } from "./window/shatter";
export { hideWindow } from "./window/state";
