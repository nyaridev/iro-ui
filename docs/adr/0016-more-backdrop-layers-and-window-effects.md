# ADR-0016: More backdrop layers and window effects

**Status:** Accepted
**Date:** 2026-11-10

## Context

ADR-0008 brought UmeSync's effects in: a backdrop (glows, an optional liquid shader, grain, vignette) and three window
effects (reveal, black hole, burst). Apps want more backgrounds to choose from, some that suit kami's plain look, and
more ways for a window to react: closing, minimizing to a dock, asking for attention. They came in four passes: eight
backdrop layers (aurora, mesh, spotlight, dot grid, paper, dust, contour lines, ink wash), then window effects (CRT,
genie, burn, shatter, ink bleed, paper fold, ripple) and feedback (shake, attention pulse, flash, success, bounce,
wiggle, heartbeat, tap). The window effects had grown one at a time, with names that didn't pair (`blackHole`, `crtOff`,
`genieOut`), so pass four also sorted them into opens and closes.

The first try drew the layers in CSS: blurred gradient blobs and stripes moved by keyframes. They looked cheap next
to the liquid. CSS can't draw rays that rise from a wavering edge, colors that blend without turning muddy, or a grid
that swells like a lens.

## Decision

- **Backdrop layers are options of `mountBackdrop`,** like `liquid`: `{ aurora, mesh, spotlight, grid, paper, dust,
  contours, ink }`, and `<Backdrop>` takes the same props. Any mix works. Each is `true` for its defaults, or an
  object of settings (`dust: { count: 2 }`): `speed`, `intensity` and up to three `colors` on every layer, and a
  few of its own (the dust's `count`, `size` and `shafts`; the contours' `density`, `scale` and `width`…). A
  setting's default and range live beside the layer's GLSL; numbers outside the range are held to it. The types are
  in `src/effects/options.ts`.
- **Settings change while it runs.** They're uniforms, not constants compiled in, and each layer keeps its own clock
  (so a new `speed` doesn't jump the motion). `updateBackdrop(host, options)` applies new settings and colors at
  the next frame; only turning a layer on or off builds a new shader. `<Backdrop>` does this when its props change.
- **They're drawn on the GPU, like the liquid.** Each layer is a GLSL function in `src/effects/backdrop/glsl/<name>.ts`
  returning a premultiplied color. `src/effects/backdrop/layers.ts` joins the ones asked for into one fragment shader,
  in a fixed order, each composited over the last: the surfaces (mesh, ink wash, paper), what's drawn on them (contour
  lines), then what floats above (aurora, dust, dot grid, spotlight). Paper overlays light and shade, so it textures the
  surfaces under it. So a backdrop has at most two canvases (the liquid, and the layers), however many layers it shows:
  browsers allow only about sixteen WebGL contexts a page. The mesh is opaque, so it covers the liquid when both are on.
- **One renderer, `src/effects/backdrop/shader.ts`,** runs the liquid and the layers: colors from tokens, repainted when
  the style, theme or accent changes; about 30 frames a second; speed by motion mode (`smooth` 0.6, `reduced` and `off`
  one still frame); each clock picks up where the last one stopped. Where the browser has `KHR_parallel_shader_compile`,
  shaders compile in the background, so mounting a backdrop never freezes the page. Without WebGL2 a shader's canvas is
  left out and the glows remain.
- **Layers use the glow colors themselves,** with their own strengths, lighter on light backgrounds: an app that asks
  for a layer gets it in every style, kami included (its glows are its accent). The first color leads, and it's the
  accent (`--iro-glow-1` is the accent in every style; the contours name `--iro-accent` itself), so a layer follows
  the accent the app picks. The paper's first color is its warm tint.
- **Paper is still unless `animated`:** then its light sways slowly and the shadows in its fibers turn. A backdrop
  whose layers are all still (still paper, or every `speed` at 0) draws only when something changes.
- **The pointer layers share one tracker,** `followPointer` in `src/effects/backdrop/pointer.ts`: where the mouse or pen
  is over the backdrop, and whether it's over it. The renderer eases the light toward it and draws every frame while it
  shows. The light moves with the hand, so reduced and off motion leave it out; touch screens never see it.
- **`src/effects/` is in three folders:** `backdrop/` (the backdrop, its shader runner, liquid, layers, pointer and
  `glsl/`), `window/` (every window effect and the state they share) and `feedback/` (everything that reacts without
  closing, burst included), with `color.ts`, `motion.ts` and `options.ts` beside them and `index.ts` as the entry.
- **Every window effect is a pair, `openX` and `closeX`,** with the same shape, `(node, options)`: reveal, black hole,
  CRT, genie, burn, shatter, ripple, ink bleed and fold. A close leaves the element hidden; any open brings it back,
  so an app may close with one and open with another. `hideWindow(node)` hides one at once, ready to open. An effect
  that aims somewhere takes it as an option: the genie's `target`, the shatter's and the ripple's `from` (a point,
  such as a click, or an element). Each takes `speed` and follows `motionOf` the way ADR-0008 says (`full` plays it
  all, `smooth` a calmer version, `reduced` a fade, `off` the end state at once).
- **They share one runner, `transition()` in `window/state.ts`.** It marks the element `data-iro-reveal` (`closed`,
  `opening`, `open`, `closing`), does nothing when it's already there, clears what an interrupted effect left, plays
  the fade or the jump that reduced and off motion get, and leaves the element shown or hidden with no effect styles
  when the effect ends. An effect only draws its frames, on the shared `frames()` loop, so a new one takes over one
  that's mid-way. Parts an effect adds inside the element (the reveal's rim, the CRT's scanlines) carry the
  `iro-effect-part` class and go with it.
- **Effects that take the window apart draw on copies.** Shatter (a copy per shard) and fold (a copy per band) need
  the window's picture in several places at once, and the DOM can't draw it twice. `window/stage.ts` sets a stage
  fixed over the window and makes copies that are pictures, not the app: inert, hidden from assistive tech, no ids,
  canvases painted from the originals, frames and media left unloaded, animations stopped.
- **The rest work on the window's own picture through SVG filters,** updated each frame: the burn thresholds a
  noise map rising from the bottom, with a white-hot edge, a glowing flame and charring ahead of it (embers and ash
  on a canvas above); the ink bleed runs the picture down in streaks, tints it, and dries it away in pools with
  pigment at their rims; the ripple bends the picture through a ripple map drawn once and scaled out each frame,
  and lights its crests and troughs from the same map, while a radial mask washes the window away from the drop.
- **Shatter looks like glass, not light:** jagged, tapering radial cracks with branches, curved partial rings, a
  frosted spot where it was struck, and hairlines in white over a faint dark line, so they show on any window. The
  pane holds a beat before its shards fall, tipping toward the viewer and glinting.
- **Feedback says what happened to a window, and closes nothing, so it runs on Web Animations.** One for each
  situation: shake ("no"), pulse ("look here"), flash ("this changed"), success ("saved"), bounce ("something
  new"), wiggle (a hint), heartbeat ("liked") and tap ("got your press"). `feedback/animate.ts` plays them, and a new
  one of the same kind replaces the last. They move with the `translate`, `scale` and `rotate` properties, so they
  add to the element's own transform; rings are outlines (they follow the corners) and glows add to its own shadow.
  Amounts are cut to a few pixels on a big element (`within`): a 14% heartbeat suits an icon and swamps a window.
  Flash and tap draw a part inside (`addPart`), which positions and isolates the element while it plays, so the
  flash's wash sits between a window's backdrop and its content. None leaves a style behind. Under reduced motion,
  what would move flashes an outline or glows instead.
- **The genie bends the window with an SVG displacement map.** A small generated map pulls each line across the
  window toward the target, more the nearer it lies to it, while transforms squash the window and pour it in. The map
  is 8-bit, so the bend stays moderate, and a slight blur grows with it to smooth the whole-pixel steps it leaves in
  slanted edges.
- **Every effect gets a demo** on the Lab's Effects page; the screenshot tests mask the moving canvases.

## Options considered

- **CSS layers** (the first try): no script and nothing to compile, but they looked cheap, see Context.
- **One canvas per layer:** simpler shaders, but a backdrop with four layers would take four of the page's WebGL
  contexts, and the Lab shows many backdrops at once.
- **One `layers` list** (`mountBackdrop(host, { layers: ["aurora", "grid"] })`): shorter for many layers, but it
  breaks the shape `liquid` already has, and the order of the list would look like it matters.
- **Settings compiled into the shader as constants:** a little faster to draw, but every tweak (a slider in an app's
  settings) would compile a new shader and restart the motion.
- **A genie from strips of the window:** clones of the window, each clipped to a strip and moved on its own, give a
  smooth curve, but they copy its DOM, state, canvases and frames, and a live app's window can't be copied safely.
- **A genie from a perspective tilt:** the content stays sharp, but the window narrows in straight lines, a
  trapezoid rather than a funnel.
- **Pulse and shake as CSS classes:** no script, but the app would have to add and remove the class at the right
  time, and a box-shadow ring fills a solid band rather than running outward.
- **Keeping the old names (`blackHole`, `crtOff`, `genieOut`) beside the pairs:** nothing has been released, so
  there's no one to keep them for.
- **Shatter with straight spokes and polygon rings in a glowing accent color:** simpler, but it read as a circuit
  pattern, not glass.
- **A pixel dissolve:** first as colored squares floating off (they could only guess the window's colors), then as a
  mosaic of the window's own pixels shrinking away. Neither felt like the window going; the burn keeps the floating
  bits as embers and ash.
- **The ink bleed as WebGL ink spreading over the window:** it covered the window with a flat sheet of color; running
  the window's own picture reads as the window bleeding.
- **Feedback on the button pressed** (a like on the heart, a bounce on a new badge): the Lab tried it, but the
  feedback is about the window, and the amounts sized for a button looked wrong once a window played them.
- **The flash as an inset shadow:** no extra element, but a window's backdrop sits over the window's own background,
  shadows included, and hid it.
- **A fold in quarters (bottom up, then right over left):** after the first fold only the plain backs show, a gray box
  folding. The accordion keeps the picture on every band until the end.

## Consequences

- **Easier:** an app picks a background with a prop or two, in every style, and kami apps get backgrounds too; it can
  tune each layer, even from a live settings screen. A new layer is one file in `backdrop/glsl/` (its GLSL, settings
  and colors), a line in `backdrop/layers.ts`, and its type in `options.ts`. An app can let people pick how windows
  close and open, since every pair has the same shape; a new window effect is one file in `window/` that draws its
  frames inside `transition()`.
- **Harder:** the layers need WebGL2, and a shader costs GPU time on large windows: the soft layers draw at half
  resolution, while the grid, contour lines and paper draw every pixel for their detail. A backdrop of only paper
  draws once, since nothing in it moves. Each mix of layers compiles its own shader once. The genie, burn, ink bleed
  and ripple run the window through an SVG filter every frame, which costs more on large windows. Shatter and fold
  copy the window (about 20 copies for shatter): a window with a very large DOM hitches as they start, and styles that
  depend on the window's exact place in the document (`:nth-child`, `>` from its parent) don't reach the copies.
- **Public surface:** the new options, props and functions are additions, a minor version (ADR-0004). The window
  effects from ADR-0008 are renamed into pairs (`blackHole` is `closeBlackHole`, `hideForReveal` is `hideWindow`);
  they were never released.
