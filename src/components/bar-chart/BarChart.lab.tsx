// Lab page: BarChart as columns (one series, side by side, stacked, with values below zero) and as rows with each
// row's total at the tip. Point at a chart, or focus it and use the arrow keys.

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
