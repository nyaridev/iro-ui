// Template: an analytics screen. Stat tiles with trend lines, requests over time against the period before, traffic
// by region, deploys by environment, the busiest endpoints, and storage and test coverage, from the public entries.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import {
  BarChart,
  Button,
  DonutChart,
  Icon,
  LineChart,
  Panel,
  ProgressBar,
  SectionTitle,
  Segmented,
  ShareBar,
  Sparkline,
  Stat,
  Trend,
} from "../../../src";
import { DownloadIcon } from "../../../src/icons";

// ── Constants ─────────────────────────────
const RANGES = [
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
] as const;

const DAYS = [
  "Oct 27",
  "Oct 28",
  "Oct 29",
  "Oct 30",
  "Oct 31",
  "Nov 1",
  "Nov 2",
  "Nov 3",
  "Nov 4",
  "Nov 5",
  "Nov 6",
  "Nov 7",
  "Nov 8",
  "Nov 9",
];

const STATS = [
  { label: "Requests", value: "1.28M", change: 8.4, trend: [71, 74, 72, 80, 84, 79, 77, 86, 88, 85, 91, 94, 92, 97] },
  {
    label: "Active users",
    value: "2,481",
    change: 12.4,
    trend: [18, 19, 19, 20, 21, 20, 22, 22, 22, 23, 23, 24, 24, 25],
  },
  {
    label: "Error rate",
    value: "0.8%",
    change: -0.3,
    trend: [21, 19, 24, 17, 15, 16, 13, 12, 14, 11, 9, 10, 9, 8],
    lowerIsBetter: true,
  },
  {
    label: "Median latency",
    value: "184 ms",
    change: 4.1,
    trend: [170, 172, 168, 175, 177, 174, 179, 181, 178, 183, 182, 186, 185, 184],
    lowerIsBetter: true,
  },
];

const thousands = (value: number) => `${Math.round(value / 100) / 10}K`;

// ── Public API ────────────────────────────
/** The analytics screen. */
export default function Analytics() {
  const [range, setRange] = useState<(typeof RANGES)[number]["value"]>("30d");

  return (
    <div className="tpl-analytics">
      <header className="tpl-analytics-top">
        <div className="tpl-analytics-title">
          <h1>Analytics</h1>
          <span>Oct 27 to Nov 9</span>
        </div>
        <Segmented aria-label="Range" options={[...RANGES]} value={range} onValueChange={setRange} size="sm" />
        <Button size="sm" icon={<Icon icon={DownloadIcon} />}>
          Export
        </Button>
      </header>

      <div className="tpl-analytics-body">
        <div className="tpl-analytics-stats">
          {STATS.map(({ label, value, change, trend, lowerIsBetter }) => {
            const good = lowerIsBetter ? change < 0 : change > 0;
            return (
              <Stat
                key={label}
                label={label}
                value={value}
                change={<Trend value={change} good={lowerIsBetter ? "down" : "up"} />}
                chart={
                  <Sparkline
                    label={`${label}, last 14 days`}
                    values={trend}
                    color={good ? undefined : "var(--iro-danger)"}
                  />
                }
              />
            );
          })}
        </div>

        <div className="tpl-analytics-grid">
          <Panel as="section" padded className="tpl-analytics-wide">
            <SectionTitle level={2}>Requests</SectionTitle>
            <LineChart
              label="Requests per day, against the two weeks before"
              labels={DAYS}
              area
              smooth
              format={thousands}
              series={[
                {
                  name: "This period",
                  values: [71, 74, 72, 80, 84, 79, 77, 86, 88, 85, 91, 94, 92, 97].map((value) => value * 1000),
                },
                {
                  name: "Previous period",
                  dashed: true,
                  values: [66, 70, 69, 71, 75, 72, 70, 76, 79, 77, 80, 82, 81, 84].map((value) => value * 1000),
                },
              ]}
            />
          </Panel>

          <Panel as="section" padded>
            <SectionTitle level={2}>Traffic by region</SectionTitle>
            <DonutChart
              label="Traffic by region"
              size={140}
              centerLabel="Requests"
              centerValue="1.28M"
              format={thousands}
              parts={[
                { name: "Europe", value: 612_000 },
                { name: "North America", value: 401_000 },
                { name: "Asia Pacific", value: 214_000 },
                { name: "Other", value: 53_000 },
              ]}
            />
          </Panel>

          <Panel as="section" padded>
            <SectionTitle level={2}>Deploys by environment</SectionTitle>
            <BarChart
              label="Deploys per week by environment"
              labels={["W38", "W39", "W40", "W41", "W42", "W43", "W44", "W45"]}
              stacked
              height={180}
              series={[
                { name: "Production", values: [12, 15, 11, 18, 14, 16, 19, 17] },
                { name: "Staging", values: [24, 22, 26, 25, 21, 27, 29, 26] },
                { name: "Preview", values: [31, 35, 30, 38, 33, 36, 41, 39] },
              ]}
            />
          </Panel>

          <Panel as="section" padded>
            <SectionTitle level={2}>Busiest endpoints</SectionTitle>
            <BarChart
              label="Requests by endpoint"
              labels={["/search", "/orders", "/login", "/files", "/billing"]}
              horizontal
              format={thousands}
              series={[{ name: "Requests", values: [482_000, 319_000, 224_000, 128_000, 61_000] }]}
            />
          </Panel>

          <Panel as="section" padded className="tpl-analytics-usage">
            <SectionTitle level={2}>Storage and coverage</SectionTitle>
            <ShareBar
              label="Storage by kind"
              format={(value) => `${value} GB`}
              parts={[
                { name: "Images", value: 14.8 },
                { name: "Video", value: 11.9 },
                { name: "Documents", value: 5.1 },
                { name: "Other", value: 4.2 },
              ]}
            />
            <div className="tpl-analytics-coverage">
              <span>Test coverage</span>
              <strong>70%</strong>
              <ProgressBar value={0.7} segments={30} label="Test coverage" />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
