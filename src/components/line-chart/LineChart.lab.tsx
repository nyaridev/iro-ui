// Lab page: LineChart with one series as a smooth area, two series with a dashed budget that runs past the data, and
// straight lines with dots on a range that doesn't start at 0. Point at a chart, or focus it and use the arrow keys.

import { LineChart } from "./LineChart";

const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

export default function LineChartLab() {
  return (
    <div className="lab-stack">
      <h3>One series, smooth, with an area</h3>
      <LineChart
        label="Deploys per month"
        labels={MONTHS}
        series={[{ name: "Deploys", values: [62, 68, 71, 70, 48, 66, 69, 77, 68, 71, 69, 76] }]}
        area
        smooth
      />
      <h3>Spend against a dashed budget; the spend stops where the month does</h3>
      <LineChart
        label="Spend against budget"
        labels={WEEKS}
        series={[
          { name: "Spend", values: [12_400, 25_100, 39_800, 52_300, null, null, null, null] },
          { name: "Budget", values: [12_500, 25_000, 37_500, 50_000, 62_500, 75_000, 87_500, 100_000], dashed: true },
        ]}
        format={(value) => `$${value.toLocaleString()}`}
      />
      <h3>Three series, straight, with dots, from 80 to 100</h3>
      <LineChart
        label="Pass rate by suite"
        labels={WEEKS}
        series={[
          { name: "Checkout", values: [96, 97, 95, 98, 97, 99, 98, 99] },
          { name: "Search", values: [91, 90, 93, 92, 94, 93, 95, 94] },
          { name: "Accounts", values: [86, 88, 85, 87, 89, 88, 90, 92] },
        ]}
        points
        min={80}
        max={100}
        height={220}
        format={(value) => `${value}%`}
      />
    </div>
  );
}
