// Grid: the y axis of a plot: a gridline across the plot at each tick, and the tick's number in a gutter at the left.

/** Gridlines from `gutter` to `width`, at `y(tick)`, labelled in the gutter. */
export function Grid({
  ticks,
  y,
  gutter,
  width,
  format,
}: {
  ticks: number[];
  y: (value: number) => number;
  gutter: number;
  width: number;
  format: (value: number) => string;
}) {
  return ticks.map((value) => (
    <g key={value}>
      <line className="iro-chart-grid" x1={gutter} x2={width} y1={y(value)} y2={y(value)} />
      <text className="iro-chart-axis" x={gutter - 8} y={y(value)} textAnchor="end" dominantBaseline="central">
        {format(value)}
      </text>
    </g>
  ));
}
