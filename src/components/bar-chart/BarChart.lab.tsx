// Lab page: BarChart as columns (one series, side by side, stacked, with values below zero), as rows with each row's
// total at the tip, and its value axis: whole ticks for small counts, decimal ticks, and a fixed step with labels.
// Point at a chart, or focus it and use the arrow keys.

import { BarChart } from "./BarChart";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];

export default function BarChartLab() {
  return (
    <div className="lab-stack">
      <h3>One series</h3>
      <BarChart
        label="Builds per day"
        labels={DAYS}
        series={[{ name: "Builds", values: [42, 51, 47, 58, 39, 12, 9] }]}
      />
      <h3>Side by side</h3>
      <BarChart
        label="Tickets opened and closed"
        labels={QUARTERS}
        series={[
          { name: "Opened", values: [320, 410, 380, 450] },
          { name: "Closed", values: [290, 400, 395, 470] },
        ]}
      />
      <h3>Stacked</h3>
      <BarChart
        label="Deploys by environment"
        labels={DAYS}
        stacked
        series={[
          { name: "Production", values: [12, 15, 11, 18, 9, 2, 1] },
          { name: "Staging", values: [20, 22, 25, 19, 17, 4, 3] },
          { name: "Preview", values: [31, 28, 35, 40, 26, 6, 5] },
        ]}
      />
      <h3>Below zero</h3>
      <BarChart
        label="Net change in seats"
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        series={[{ name: "Seats", values: [14, 9, -6, 11, -3, 17] }]}
        height={180}
      />
      <h3>Small counts get whole-number ticks</h3>
      <BarChart
        label="Releases per day"
        labels={DAYS}
        series={[{ name: "Releases", values: [0, 1, 0, 2, 1, 0, 0] }]}
        height={160}
      />
      <h3>Fractions keep decimal ticks, with their own labels</h3>
      <BarChart
        label="Hours on call"
        labels={DAYS}
        series={[{ name: "Hours", values: [0.5, 1.25, 0, 0.75, 1, 0, 0.25] }]}
        height={160}
        format={(value) => `${value} h`}
        axis={{ format: (value) => `${value} h` }}
      />
      <h3>A fixed step and labels</h3>
      <BarChart
        label="Disk used per server"
        labels={["web-1", "web-2", "db-1", "cache-1"]}
        series={[{ name: "Used", values: [120, 340, 280, 410] }]}
        height={180}
        format={(value) => `${value} GB`}
        axis={{ step: 100, format: (value) => `${value} GB` }}
      />
      <h3>Rows, stacked, with totals at the tips</h3>
      <BarChart
        label="Requests by endpoint"
        labels={["/search", "/orders", "/login", "/files", "/billing"]}
        horizontal
        stacked
        series={[
          { name: "Succeeded", values: [48_200, 31_900, 22_400, 12_800, 6_100] },
          { name: "Failed", values: [900, 2_400, 600, 300, 1_100] },
        ]}
      />
    </div>
  );
}
