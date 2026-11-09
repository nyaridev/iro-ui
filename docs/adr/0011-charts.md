# ADR-0011: Charts drawn in SVG, with their own colors

**Status:** Accepted
**Date:** 2026-11-09

## Context

Dashboards show trends, splits and totals: line and area charts, bars, donuts, split bars and small trend lines in
stat tiles. The DevOps and AgentOps consoles Nari pointed to use all of them. iro-ui has meters and progress bars but
no charts, so an app would reach for a chart library that knows nothing of the style's tokens or motion modes. Charts
also have a color problem the rest of the library doesn't: several series side by side must stay apart for readers
who can't tell some colors apart, and the styles' palettes weren't picked for that.

## Decision

- **Our own SVG charts, no chart library:** `LineChart` (lines or areas, smooth or straight, dashed series),
  `BarChart` (vertical or horizontal, grouped or stacked), `DonutChart`, `ShareBar` (one bar split into parts) and
  `Sparkline`. `ProgressBar` gets `segments` for the tick-bar look. Their shared parts live in
  `src/components/chart/` (tick math, paths, the frame with its legend, hover readout and data table, `chart.css`)
  and are never exported.
- **Data in one shape:** labels along the x axis and series of values (`{ name, values, color?, dashed? }`); split
  charts take parts (`{ name, value, color? }`). One y axis, always: two measures of different size get two charts.
- **Eight chart color tokens, `chart-1` to `chart-8`,** a fixed order (blue, orange, aqua, yellow, magenta, green,
  violet, red) checked for color-blind separation and contrast against every style's surfaces, with lighter steps
  for light themes and their own steps for dark ones. Series take the slots in order; `color` on a series or part
  overrides it, so an app keeps an entity's color when others are filtered out, or uses a status token when a
  series means good or bad.
- **Quiet marks:** 2 px lines, areas as a 10% wash, bars at most 24 px thick with a 4 px rounded end and a square
  base, 2 px gaps between stacked parts, markers ringed in the surface color, 1 px solid gridlines. Text uses text
  tokens, never a series color. Two or more series get a legend.
- **Reading values:** pointing at a chart, or focusing it and pressing the arrow keys, shows a readout inside the
  chart's box: a crosshair and every series at that point on lines, the hovered group on bars, the hovered part on a
  donut. Every chart also carries a hidden data table for screen readers. The readout is part of the chart, not a
  popup, and no Base UI part follows a pointer across a plot, so charts handle their own pointer and arrow keys: the
  one exception to ADR-0003, limited to charts.
- **Motion through the tokens:** lines draw in, bars grow from their base and parts fade, each movement scaled by
  `--iro-travel`, so reduced motion only fades (ADR-0007).
- **Size:** a chart fills its container's width and takes its height as a prop.

## Options considered

- **A chart library (Recharts, visx, Chart.js):** mature and complete, but a large dependency with its own styling,
  wrapped everywhere to read tokens; Chart.js draws on a canvas, which CSS tokens can't reach.
- **The styles' palettes as series colors:** no new tokens, but they fail the checks: kami's cyan reads as grey, and
  its green and pink blur together for deuteranopia.
- **The accent as the first series color:** on brand, but the accent changes with the picker and can repeat another
  slot. An app that wants it passes `color: "var(--iro-accent)"`.

## Consequences

- **Easier:** dashboards built from iro-ui alone, in every style, with colors that stay apart by construction.
- **Harder:** the chart code is ours to keep; a new chart type reuses `chart/`'s parts.
- **Light themes:** aqua, yellow and magenta sit under 3:1 against light surfaces, so values are always readable
  another way: the legend, the readout and the data table; `DonutChart` and `ShareBar` legends show the values.
- **Public surface:** the five charts and their props types, `ChartSeries` and `ChartPart`, the tokens `chart-1` to
  `chart-8`, and `ProgressBar`'s `segments`.
- **Rules:** `.claude/rules/architecture/overview.md` (the `chart/` module), `components.md` (charts),
  `styles.md` (chart tokens).
