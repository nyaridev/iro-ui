// LineChart: one or more series over the same labels (days, months), as lines or soft areas, straight or smooth. A
// dashed series marks a target or budget; a null value leaves a gap. Pointing or the arrow keys show every series at
// that label (ADR-0011).

// ── Dependencies ──────────────────────────
import type { ComponentProps, PointerEvent } from "react";
import { ChartFrame } from "../chart/ChartFrame";
import { Grid } from "../chart/Grid";
import type { LegendItem } from "../chart/Legend";
import { areaPath, linePath, type Point, runs } from "../chart/paths";
import { Readout } from "../chart/Readout";
import { formatPlain, gutterFor, labelEvery, niceScale, seriesColor, tickFormat } from "../chart/scale";
import type { ChartSeries } from "../chart/types";
import { useActive } from "../chart/useActive";
import { useWidth } from "../chart/useWidth";

// ── Constants ─────────────────────────────
/** Room above the top gridline, under the plot for the x labels, and beside the ends for end dots. */
const TOP = 10;
const AXIS = 24;
const INSET = 6;

// ── Types ─────────────────────────────────
export interface LineChartProps extends Omit<ComponentProps<"figure">, "children"> {
  /** What the chart shows, for screen readers and the data table's caption. */
  label: string;
  /** The x axis, in order: one label per value. */
  labels: string[];
  series: ChartSeries[];
  /** A soft wash under each line (not under dashed ones: a target or the period before isn't an amount). */
  area?: boolean;
  /** Bend the lines through their points (never past them). */
  smooth?: boolean;
  /** A dot on every value; otherwise only the shown point gets dots. */
  points?: boolean;
  /** Height in pixels, x labels included (default 200). */
  height?: number;
  /** The y axis's ends; left out, it runs from 0 (or the lowest value below 0) to the highest, rounded out. */
  min?: number;
  max?: number;
  /** How values read in the readout and the data table (default: in full, 18,240). */
  format?: (value: number) => string;
}

// ── Public API ────────────────────────────
/** A line or area chart over shared labels. */
export function LineChart({
  label,
  labels,
  series,
  area = false,
  smooth = false,
  points = false,
  height = 200,
  min,
  max,
  format = formatPlain,
  ...rest
}: LineChartProps) {
  const [plot, width] = useWidth<HTMLDivElement>();
  const { active, setActive, keys } = useActive(labels.length);
  const values = series.flatMap((each) => each.values).filter((value): value is number => value !== null);
  const scale = niceScale(min ?? Math.min(0, ...values), max ?? Math.max(0, ...values));
  const tick = tickFormat(scale);
  const bottom = height - AXIS;
  const gutter = gutterFor(scale.ticks.map(tick));
  const left = gutter + INSET;
  const step = labels.length > 1 ? (width - left - INSET) / (labels.length - 1) : 0;
  const x = (index: number) => (labels.length > 1 ? left + index * step : (gutter + width) / 2);
  const y = (value: number) => TOP + (1 - (value - scale.min) / (scale.max - scale.min)) * (bottom - TOP);
  const base = y(Math.min(Math.max(0, scale.min), scale.max));
  const every = labelEvery(labels, step || width);
  const colors = series.map((each, index) => seriesColor(index, each.color));
  const kinds = series.map((each): LegendItem["kind"] => (each.dashed ? "dash" : area ? "box" : "line"));
  const filled = (each: ChartSeries) => area && !each.dashed;
  const cell = (value: number | null) => (value === null ? "–" : format(value));

  function pick(event: PointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const index = step ? Math.round((event.clientX - box.left - left) / step) : 0;
    setActive(Math.min(Math.max(index, 0), labels.length - 1));
  }

  const anchor = (index: number) => (index === 0 ? "start" : index === labels.length - 1 ? "end" : "middle");
  const dotsAt = (list: (number | null)[]) =>
    (points ? list.map((_, index) => index) : active === null ? [] : [active]).filter((index) => list[index] != null);

  return (
    <ChartFrame
      name="line-chart"
      label={label}
      legend={
        series.length > 1
          ? series.map(({ name }, index) => ({ name, color: colors[index], kind: kinds[index] }))
          : undefined
      }
      table={{
        columns: ["", ...series.map(({ name }) => name)],
        rows: labels.map((text, index) => [text, ...series.map((each) => cell(each.values[index] ?? null))]),
      }}
      {...rest}
    >
      <div ref={plot} className="iro-chart-plot" style={{ height }}>
        {width > 0 ? (
          <svg width={width} height={height} aria-hidden="true">
            <Grid ticks={scale.ticks} y={y} gutter={gutter} width={width} format={tick} />
            {labels.map((text, index) =>
              index % every === 0 ? (
                // biome-ignore lint/suspicious/noArrayIndexKey: labels may repeat; their place is their identity.
                <text key={index} className="iro-chart-axis" x={x(index)} y={height - 6} textAnchor={anchor(index)}>
                  {text}
                </text>
              ) : null,
            )}
            {active === null ? null : (
              <line className="iro-chart-crosshair" x1={x(active)} x2={x(active)} y1={TOP} y2={bottom} />
            )}
            {series.map((each, index) => {
              const lines = runs(
                each.values.map((value, at): Point | null => (value === null ? null : [x(at), y(value)])),
              );
              return (
                <g key={each.name} className="iro-chart-series" style={{ color: colors[index] }}>
                  {filled(each)
                    ? lines.map((run) => (
                        <path key={run[0][0]} className="iro-chart-area" d={areaPath(run, base, smooth)} />
                      ))
                    : null}
                  {lines.map((run) => (
                    <path
                      key={run[0][0]}
                      className="iro-chart-line"
                      strokeDasharray={each.dashed ? "6 5" : undefined}
                      d={linePath(run, smooth)}
                    />
                  ))}
                  {dotsAt(each.values).map((at) => (
                    <circle key={at} className="iro-chart-dot" cx={x(at)} cy={y(each.values[at] ?? 0)} r={4} />
                  ))}
                </g>
              );
            })}
          </svg>
        ) : null}
        <div
          className="iro-chart-hit"
          role="img"
          aria-label={`${label}. Arrow keys read each point.`}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: the chart is one stop; the arrow keys move its readout.
          tabIndex={0}
          onPointerMove={pick}
          onPointerDown={pick}
          {...keys}
        />
        <Readout
          open={active !== null}
          x={active === null ? 0 : x(active)}
          y={TOP}
          width={width}
          title={active === null ? "" : labels[active]}
          rows={series.map((each, index) => ({
            name: each.name,
            value: cell(active === null ? null : (each.values[active] ?? null)),
            color: colors[index],
            kind: kinds[index],
          }))}
        />
      </div>
    </ChartFrame>
  );
}
