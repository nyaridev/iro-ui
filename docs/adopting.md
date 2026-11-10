# Using iro-ui in an app

How to start a new app on iro-ui, how to bring an existing app over, and how to update. The decisions behind it are
in [adr/](adr/README.md).

## Install

iro-ui is installed from a release tag, never from a path on disk:

```bash
pnpm add github:nyaridev/iro-ui#v1.0.0
```

The tag holds the built package, so nothing builds on install and the app needs no extra pnpm settings. Install tags
only: `main` between releases isn't a supported install. iro-ui brings Base UI and its fonts with it; the app needs
React 19.

## A new app

1. Import the CSS of each style the app offers, once, in the entry file:

   ```ts
   import "iro-ui/styles/sumi.css";
   ```

2. Wrap the app in `IroRoot` and mount the `Toaster` inside it:

   ```tsx
   import { IroRoot, Toaster } from "iro-ui";

   <IroRoot styleName="sumi" theme={settings.theme} accent={settings.accent} style={{ minHeight: "100vh" }}>
     <App />
     <Toaster />
   </IroRoot>
   ```

   `theme` and `accent` are optional; left out, the style's defaults apply. The defaults have names too, the ones the
   Design Lab shows: kami is `light` and `blue`, sumi `dark` and `violet`, kon `dark` and `blue`. Popups open inside
   the root, so they always match it.

3. Build screens from `iro-ui` components. The Design Lab (`start.bat` in this repo) shows each one with its
   variants.

4. For the app's own CSS, use the tokens (`var(--iro-surface-2)`, `var(--iro-radius-md)`…), never raw values, so it
   follows the style and theme too. The full list with what each is for is `src/styles/contract.ts`, and the Lab's
   Tokens page draws them.

## Letting people switch the look

The look is three values: style, theme, accent. Keep them in the app's settings and pass them to `IroRoot`;
switching is instant. To offer a style, import its CSS too (`iro-ui/styles/kon.css`). The values each style
accepts are listed in the API snapshot (`tests/__snapshots__/api.test.ts.snap`) and in the Lab's pickers.

## Motion

Pass the app's motion setting to `IroRoot` as `motion`: `full`, `smooth` (no bounce), `reduced` (fades only) or
`off`. Leave it out to follow the system's reduced-motion setting. Every component and animation follows it.

The shared animations work on any element, React or not:

```tsx
<div data-iro-animate="pop">Arrives with a pop</div>
{items.map((item, index) => (
  <li key={item.id} data-iro-animate="fade-up" style={{ "--iro-index": index } as CSSProperties}>…</li>
))}
<article data-iro-shine>A light sweeps across on hover</article>
```

`pop`, `reward` and `fade-up` play when the element appears, `flash` marks something new, `pulse` is for skeletons,
and `vanish` plays an exit: set it, then remove the element on `animationend`. The Lab's Motion page shows each one.

## Scrollbars, selection and focus

Inside a root, scrollbars, selected text and the focus ring follow the style. `data-iro-scroll="quiet"` hides a scroll
area's thumb until the pointer is over it. The window's own scrollbar belongs to `<html>`: to style it too, let the
root fill the window and scroll (`height: 100vh; overflow: auto`), or set the same `data-iro-*` attributes on
`<html>`.

## Icons

Icons come from a third entry, `iro-ui/icons`, one export per icon, so an app bundles only the ones it imports. Each
icon has two drawings: kon shows the line one, sumi the solid one.

```tsx
import { Icon } from "iro-ui";
import { FolderIcon, SearchIcon } from "iro-ui/icons";

<Icon icon={FolderIcon} />                 {/* 16 px, hidden from screen readers */}
<Icon icon={SearchIcon} size={20} label="Search" />
<Button icon={<Icon icon={FolderIcon} size="1em" />}>Open</Button>
```

The Lab's Icons page lists every icon by category; clicking one copies its name. Outside React, `iconMarkup(icon, id)` gives both
drawings as SVG markup for a `viewBox="0 0 24 24"` svg, with the mask id filled in (it must be unique on the page).
Wrap them in `<g class="iro-icon-line">` and `<g class="iro-icon-solid">` so the style shows the right one.

## Effects

UmeSync's and PrepKit's effects come from a second entry, `iro-ui/effects`. They're plain functions on DOM elements,
so Svelte apps and plain pages use them too, and they follow the motion mode: `smooth` plays calmer versions,
`reduced` fades, `off` jumps to the end.

```tsx
import { Backdrop } from "iro-ui";
import { burst, closeBlackHole, closeReveal, hideWindow, openReveal } from "iro-ui/effects";

// A window background: give the frame a position and `isolation: isolate`, then put the backdrop first in it.
<main style={{ position: "relative", isolation: "isolate" }}>
  <Backdrop liquid />
  …
</main>

hideWindow(panel);           // start hidden…
await openReveal(panel);     // …then open from the center
await closeReveal(panel);    // close into the center; it stays hidden
await closeBlackHole(panel); // or break it into a black hole; any open brings it back
burst(button);               // sparkles out of the button (full motion only)
```

Outside React, `mountBackdrop(element, { liquid: true })` fills an empty element and returns its cleanup. The liquid
needs WebGL2; without it the glows stay. The other layers are options too, and mix on one canvas: `aurora`
(curtains of light across the top), `mesh` (a full background of drifting glow colors; it covers the liquid),
`spotlight` (a light that follows the mouse), `grid` (a dot grid that swells and lights up around the mouse), `paper`
(a paper surface that textures what's under it), `dust` (specks and bokeh in window light), `contours` (a shifting
contour map) and `ink` (an ink wash). They need WebGL2 too, and show in every style, kami included; the pointer
ones stay dark on touch screens and under reduced motion.

Each layer is `true` for its defaults, or its settings. Every layer takes `speed`, `intensity` and `colors` (up to
three CSS colors in place of the style's glows); each has a few of its own, typed as `DustOptions`,
`ContoursOptions` and so on. Changing them doesn't restart the backdrop:

```tsx
<Backdrop dust={{ count: 2, shafts: 1.5 }} paper={{ animated: true }} />
<Backdrop contours={{ density: 1.5, colors: ["var(--iro-green)"] }} />

const stop = mountBackdrop(layer, { grid: { gap: 28 } });
updateBackdrop(layer, { grid: { gap: 28, reach: 220 } }); // applies at the next frame
```

The Lab's Effects page has a tuner that shows every layer's settings and the prop for what you set.

Every window effect is a pair, `closeX` and `openX(node, options)`: Reveal, BlackHole, Crt, Genie, Burn, Shatter,
Ripple, InkBleed and Fold. Each takes a `speed` (0.25 to 4):

```ts
import { closeCrt, closeGenie, closeShatter, openCrt, openGenie, openRipple } from "iro-ui/effects";

await closeCrt(panel);                           // squeezes into a bright line, then a dot, like an old screen
await openCrt(panel);                            // …and back on
await closeGenie(panel, { target: dockButton }); // pours into a dock button (or a DOMRect)
await openGenie(panel, { target: dockButton });  // …and back out
await closeShatter(panel, { from: event });      // cracks like glass where it was clicked, and falls
await openRipple(panel, { from: button });       // a drop on water brings it back from the button
```

A close leaves the element hidden, and any open brings it back: `closeCrt`, then `openReveal`, works. While they
play, they write `clip-path`, `filter`, `transform`, `transform-origin`, `opacity` and `mask-image` on the element,
and the element needs a position for the reveal's rim and the CRT's scanlines. Shatter and fold draw on copies of
the window laid over it, so they briefly copy its DOM.

Feedback says what happened to a window, and leaves it where it is:

```ts
import { bounce, flash, heartbeat, pulse, shake, success, tap, wiggle } from "iro-ui/effects";

shake(dialog);               // "no": a quick, damped shake
pulse(panel, { count: 2 });  // "look here": the rim lights up and a ring runs outward
flash(panel);                // "this changed": a highlight wash under the content, fading
success(panel);              // "saved": a small pop and a ring in the success color
bounce(panel);               // "something new": a hop, then a smaller one
wiggle(panel);               // a hint: a tilt back and forth
heartbeat(panel);            // "liked": two beats and a warm glow
tap(panel, { from: event }); // "got your press": a circle spreads from the press
```

Each takes a `speed`, and a `color` where it lights up. A window moves no more than a few pixels, the movement adds
to its own transform and shadows, and nothing stays behind. Under reduced motion, what would move flashes an outline
or glows instead. The Lab's Effects page shows them all.

## An existing app

iro-ui's CSS sits in cascade layers, so the app's own CSS always wins and nothing changes until an iro-ui component
is used. Move over one screen at a time:

1. Install, import the style, and wrap the app in `IroRoot` (above). Check that nothing moved.
2. Point the app's own color variables at iro-ui's, so old and new parts match while both exist:

   ```css
   :root {
     --bg: var(--iro-bg);
     --surface: var(--iro-surface);
     --text: var(--iro-fg);
   }
   ```

   The app's own `data-theme` keeps working; iro-ui only reads `data-iro-*`.
3. Replace the app's controls screen by screen: buttons, fields and toggles first, then menus and dialogs. Delete
   the app's own version once nothing uses it.
4. Values only that app has (BlomboUI's Generate orange, UmeSync's alert colors) stay in the app, defined per style
   where they differ: `[data-iro-style="sumi"] { --app-generate: …; }`.
5. Components only one app uses (BlomboUI's ModelCard, MaskPainter…) stay in that app, built from iro-ui's tokens.

## Tailwind apps

Import the bridge after Tailwind, and the tokens become Tailwind names (`bg-surface`, `text-fg-2`, `rounded-md`,
`shadow-pop`, `font-mono`…):

```css
@import "tailwindcss";
@import "iro-ui/tailwind.css";
```

## Updating

Change the tag in `package.json` and run `pnpm install`. The version says what to expect:

- **Patch** (1.0.x): fixes only.
- **Minor** (1.x.0): new components, props, tokens, styles, themes or accents, and intended look changes; nothing is
  removed. Renamed things keep their old name for now and warn in the browser console during development.
- **Major** (x.0.0): something was removed or renamed for good. `CHANGELOG.md` says how to update.

Read `CHANGELOG.md` before updating, and fix any deprecation warnings before the next major.
