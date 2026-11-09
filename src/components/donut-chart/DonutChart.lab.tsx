// Lab page: DonutChart with its legend, a small one without, and one whose parts include a sliver. Point at a part,
// or focus the ring and use the arrow keys.

import { DonutChart } from "./DonutChart";

export default function DonutChartLab() {
  return (
    <div className="lab-stack">
      <h3>With a legend</h3>
      <DonutChart
        label="Traffic by region"
        centerLabel="Requests"
        centerValue="185M"
        parts={[
          { name: "Europe", value: 92_500_000 },
          { name: "North America", value: 50_000_000 },
          { name: "Asia Pacific", value: 42_500_000 },
        ]}
        format={(value) => `${Math.round(value / 100_000) / 10}M`}
      />
      <h3>Small, no legend</h3>
      <DonutChart
        label="Plan usage"
        size={96}
        legend={false}
        parts={[
          { name: "Used", value: 72 },
          { name: "Free", value: 28, color: "var(--iro-track)" },
        ]}
        centerValue="72%"
      />
      <h3>Six parts, one a sliver</h3>
      <DonutChart
        label="Runs by result"
        centerLabel="Runs"
        parts={[
          { name: "Passed", value: 275 },
          { name: "Retried", value: 200 },
          { name: "Skipped", value: 187 },
          { name: "Flaky", value: 173 },
          { name: "Failed", value: 90 },
          { name: "Cancelled", value: 3 },
        ]}
      />
    </div>
  );
}
