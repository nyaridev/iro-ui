// BarChart: series over shared labels as bars, side by side or stacked, standing up (columns) or lying down (rows,
// each with its label above and its total at the tip). Pointing or the arrow keys show a label's values (ADR-0011).

// ── Dependencies ──────────────────────────
import type { ComponentProps, PointerEvent } from "react";
import { ChartFrame } from "../chart/ChartFrame";
import { Grid } from "../chart/Grid";
import { type BarEnd, barPath } from "../chart/paths";
import { Readout } from "../chart/Readout";
import { formatPlain, gutterFor, labelEvery, niceScale, seriesColor, tickFormat } from "../chart/scale";
import type { ChartSeries } from "../chart/types";
import { useActive } from "../chart/useActive";
import { useWidth } from "../chart/useWidth";

// ── Constants ─────────────────────────────
const TOP = 10;
const AXIS = 24;
/** The thickest a bar gets, its rounded end, and the gap between touching bars or stacked parts. */
const THICK = 24;
const ROUND = 4;
const GAP = 2;
/** A column group takes this share of its slot; the rest is air between groups. */
const FILL = 0.7;
/** Rows: the label line above each bar, one bar's thickness, and the space between rows. */
const ROW_LABEL = 18;
const ROW_BAR = 14;
const ROW_GAP = 14;
/** About how wide one character of a row's total is, to leave it room at the tip. */
const CHAR = 7;

// ── Types ─────────────────────────────────
export interface BarChartProps extends Omit<ComponentProps<"figure">, "children"> {
  /** What the chart shows, for screen readers and the data table's caption. */
  label: string;
  /** One label per value: the x axis for columns, the rows for `horizontal`. */
  labels: string[];
  series: ChartSeries[];
  /** Stack each label's series into one bar (negative values count as 0). */
  stacked?: boolean;
  /** Bars lying down, one row per label, with the total at each tip. */
  horizontal?: boolean;
  /** Height in pixels for columns, x labels included (default 200); rows size themselves. */
  height?: number;
  /** How values read in the tips, readout and data table (default: in full). */
  format?: (value: number) => string;
}

interface Bar {
  series: number;
  d: string;
}

// ── Private helpers ───────────────────────
/** One label's bars: side by side from `start`, or stacked, along an axis where `at(value)` is a pixel offset. */
function barsOf(
  values: number[],
  stacked: boolean,
  thick: number,
  start: number,
  at: (value: number) => number,
  horizontal: boolean,
): Bar[] {
  const zero = at(0);
  if (stacked) {
    let sum = 0;
    const last = values.reduce((found, value, index) => (value > 0 ? index : found), -1);
    return values.flatMap((raw, series) => {
      const value = Math.max(raw, 0);
      if (value === 0) return [];
      const [from, to] = [at(sum), at(sum + value)];
      sum += value;
      // Every part but the outermost gives up a gap at its far end, so stacked parts don't touch.
      const size = Math.abs(to - from) - (series === last ? 0 : GAP);
      if (size <= 0) return [];
      const end: BarEnd = horizontal ? "right" : "top";
      const radius = series === last ? ROUND : 0;
      return [
        {
          series,
          d: horizontal
            ? barPath(from, start, size, thick, radius, end)
            : barPath(start, from - size, thick, size, radius, end),
        },
      ];
    });
  }
  return values.flatMap((value, series) => {
    if (value === 0) return [];
    const offset = start + series * (thick + GAP);
    const tip = at(value);
    if (horizontal) return [{ series, d: barPath(zero, offset, tip - zero, thick, ROUND, "right") }];
    return [
      {
        series,
        d:
          value > 0
            ? barPath(offset, tip, thick, zero - tip, ROUND, "top")
            : barPath(offset, zero, thick, tip - zero, ROUND, "bottom"),
      },
    ];
  });
}

// ── Public API ────────────────────────────
/** A bar chart over shared labels. */
export function BarChart({
  label,
  labels,
  series,
  stacked = false,
  horizontal = false,
  height = 200,
  format = formatPlain,
  ...rest
}: BarChartProps) {
  const [plot, width] = useWidth<HTMLDivElement>();
  const { active, setActive, keys } = useActive(labels.length);
  const valuesAt = (index: number) => series.map((each) => each.values[index] ?? 0);
  const totals = labels.map((_, index) => valuesAt(index).reduce((sum, value) => sum + Math.max(value, 0), 0));
  const all = series.flatMap((each) => each.values).filter((value): value is number => value !== null);
  const scale = stacked ? niceScale(0, Math.max(0, ...totals)) : niceScale(Math.min(0, ...all), Math.max(0, ...all));
  const colors = series.map((each, index) => seriesColor(index, each.color));
  const count = Math.max(labels.length, 1);
  const cell = (value: number | null) => (value === null ? "–" : format(value));
  const tipText = (index: number) => format(stacked ? totals[index] : Math.max(...valuesAt(index)));

  // Columns: slots across the width after the y gutter; rows: one per label down the plot.
  const tick = tickFormat(scale);
  const gutter = horizontal ? 0 : gutterFor(scale.ticks.map(tick));
  const slot = (width - gutter) / count;
  const slotX = (index: number) => gutter + slot * index;
  const groupSize = stacked ? 1 : series.length;
  const thick = horizontal ? ROW_BAR : Math.max(2, Math.min(THICK, (slot * FILL - GAP * (groupSize - 1)) / groupSize));
  const groupWidth = stacked ? thick : groupSize * thick + GAP * (groupSize - 1);
  const rowBars = stacked ? ROW_BAR : series.length * (ROW_BAR + GAP) - GAP;
  const rowHeight = ROW_LABEL + rowBars + ROW_GAP;
  const plotHeight = horizontal ? count * rowHeight - ROW_GAP : height;
  const bottom = plotHeight - AXIS;
  const tipRoom = Math.max(0, ...labels.map((_, index) => tipText(index).length)) * CHAR + 8;
  const y = (value: number) => TOP + (1 - (value - scale.min) / (scale.max - scale.min)) * (bottom - TOP);
  const x = (value: number) => ((value - scale.min) / (scale.max - scale.min)) * Math.max(0, width - tipRoom);
  const every = labelEvery(labels, slot);

  function pick(event: PointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const index = horizontal
      ? Math.floor((event.clientY - box.top) / rowHeight)
      : Math.floor((event.clientX - box.left - gutter) / (slot || 1));
    setActive(Math.min(Math.max(index, 0), labels.length - 1));
  }

  const readoutX = active === null ? 0 : horizontal ? x(totals[active]) : slotX(active) + slot / 2;
  const readoutY = active === null || !horizontal ? TOP : active * rowHeight;

  return (
    <ChartFrame
      name="bar-chart"
      label={label}
      legend={
        series.length > 1 ? series.map(({ name }, index) => ({ name, color: colors[index], kind: "box" })) : undefined
      }
      table={{
        columns: ["", ...series.map(({ name }) => name)],
        rows: labels.map((text, index) => [text, ...series.map((each) => cell(each.values[index] ?? null))]),
      }}
      {...rest}
    >
      <div
        ref={plot}
        className="iro-chart-plot"
        data-horizontal={horizontal || undefined}
        style={{ height: plotHeight }}
      >
        {width > 0 ? (
          <svg width={width} height={plotHeight} aria-hidden="true">
            {horizontal ? null : (
              <>
                <Grid ticks={scale.ticks} y={y} gutter={gutter} width={width} format={tick} />
                {labels.map((text, index) =>
                  index % every === 0 ? (
                    <text
                      // biome-ignore lint/suspicious/noArrayIndexKey: labels may repeat; their place is their identity.
                      key={index}
                      className="iro-chart-axis"
                      x={slotX(index) + slot / 2}
                      y={plotHeight - 6}
                      textAnchor="middle"
                    >
                      {text}
                    </text>
                  ) : null,
                )}
              </>
            )}
            {active === null ? null : horizontal ? (
              <rect
                className="iro-bar-chart-band"
                x={0}
                y={active * rowHeight - ROW_GAP / 2}
                width={width}
                height={rowHeight}
              />
            ) : (
              <rect className="iro-bar-chart-band" x={slotX(active)} y={TOP} width={slot} height={bottom - TOP} />
            )}
            {labels.map((text, index) => {
              const top = index * rowHeight;
              const bars = horizontal
                ? barsOf(valuesAt(index), stacked, thick, top + ROW_LABEL, x, true)
                : barsOf(valuesAt(index), stacked, thick, slotX(index) + (slot - groupWidth) / 2, y, false);
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: labels may repeat; their place is their identity.
                <g key={index}>
                  {horizontal ? (
                    <>
                      <text className="iro-bar-chart-row" x={0} y={top + ROW_LABEL - 6}>
                        {text}
                      </text>
                      <text
                        className="iro-bar-chart-tip"
                        x={x(stacked ? totals[index] : Math.max(0, ...valuesAt(index))) + 6}
                        y={top + ROW_LABEL + rowBars / 2}
                      >
                        {tipText(index)}
                      </text>
                    </>
                  ) : null}
                  {bars.map((bar) => (
                    <path
                      key={bar.series}
                      className="iro-bar-chart-bar"
                      style={{ color: colors[bar.series] }}
                      d={bar.d}
                    />
                  ))}
                </g>
              );
            })}
          </svg>
        ) : null}
        <div
          className="iro-chart-hit"
          role="img"
          aria-label={`${label}. Arrow keys read each ${horizontal ? "row" : "bar"}.`}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: the chart is one stop; the arrow keys move its readout.
          tabIndex={0}
          onPointerMove={pick}
          onPointerDown={pick}
          {...keys}
        />
        <Readout
          open={active !== null}
          x={readoutX}
          y={readoutY}
          width={width}
          title={active === null ? "" : labels[active]}
          rows={[
            ...series.map((each, index) => ({
              name: each.name,
              value: cell(active === null ? null : (each.values[active] ?? null)),
              color: colors[index],
              kind: "box" as const,
            })),
          ]}
        />
      </div>
    </ChartFrame>
  );
}
