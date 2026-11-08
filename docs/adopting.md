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

1. Import the CSS of each style the app offers, once, in the entry file. Web apps default to **kon**, desktop apps
   to **sumi**:

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

   `theme` and `accent` are optional; left out, the style's defaults apply. Popups open inside the root, so they
   always match it.

3. Build screens from `iro-ui` components. The Design Lab (`start.bat` in this repo) shows each one with its
   variants.

4. For the app's own CSS, use the tokens (`var(--iro-surface-2)`, `var(--iro-radius-md)`…), never raw values, so it
   follows the style and theme too. The full list with what each is for is `src/styles/contract.ts`, and the Lab's
   Tokens page draws them.

## Letting people switch the look

The look is three values: style, theme, accent. Keep them in the app's settings and pass them to `IroRoot`;
switching is instant. To offer a style, import its CSS too (`iro-ui/styles/kon.css`). The values each style
accepts are listed in the API snapshot (`tests/__snapshots__/api.test.ts.snap`) and in the Lab's pickers.

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
