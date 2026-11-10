// Template: an analytics screen. Stat tiles with trend lines, requests over time against the period before, traffic
// by region, deploys by environment, the busiest endpoints, and storage and test coverage, from the public entries.
// The range (7, 30 or 90 days) changes every number and chart but storage; Export saves the requests as CSV.

// ── Dependencies ──────────────────────────
import { useMemo, useState } from "react";
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
  Toaster,
  Trend,
  toast,
} from "../../../src";
import { DownloadIcon } from "../../../src/icons";
import { analyticsFor, RANGES, type Range, requestsCsv, short } from "./data";

// ── Private helpers ───────────────────────
/** Hands the browser a file to save. */
function download(name: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

// ── Public API ────────────────────────────
/** The analytics screen. */
export default function Analytics() {
  const [range, setRange] = useState<Range>("30d");
  const data = useMemo(() => analyticsFor(range), [range]);
  const exportCsv = () => {
    download(`requests-${range}.csv`, requestsCsv(range));
    toast({ title: "Export ready", description: `requests-${range}.csv, ${data.days} days.`, tone: "success" });
  };

  return (
    <div className="tpl-analytics">
      <header className="tpl-analytics-top">
        <div className="tpl-analytics-title">
          <h1>Analytics</h1>
          <span>{data.subtitle}</span>
        </div>
        <Segmented
          aria-label="Range"
          options={RANGES.map(({ value, label }) => ({ value, label }))}
          value={range}
          onValueChange={setRange}
          size="sm"
        />
        <Button size="sm" icon={<Icon icon={DownloadIcon} />} onClick={exportCsv}>
          Export
        </Button>
      </header>

      <div className="tpl-analytics-body">
        <div className="tpl-analytics-stats">
          {data.stats.map(({ label, value, change, trend, lowerIsBetter }) => {
            const good = lowerIsBetter ? change < 0 : change > 0;
            return (
              <Stat
                key={label}
                label={label}
                value={value}
                change={<Trend value={change} good={lowerIsBetter ? "down" : "up"} />}
                chart={
                  <Sparkline
                    label={`${label}, last ${data.days} days`}
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
              label={`Requests per day, against the ${data.days} days before`}
              labels={data.labels}
              area
              smooth
              format={short}
              series={[
                { name: "This period", values: data.requests },
                { name: "Previous period", dashed: true, values: data.previous },
              ]}
            />
          </Panel>

          <Panel as="section" padded>
            <SectionTitle level={2}>Traffic by region</SectionTitle>
            <DonutChart
              label="Traffic by region"
              size={140}
              centerLabel="Requests"
              centerValue={short(data.total)}
              format={short}
              parts={data.regions}
            />
          </Panel>

          <Panel as="section" padded>
            <SectionTitle level={2}>Deploys by environment</SectionTitle>
            <BarChart
              label={`Deploys per ${data.days === 7 ? "day" : "week"} by environment`}
              labels={data.deployLabels}
              stacked
              height={180}
              series={data.deploys}
            />
          </Panel>

          <Panel as="section" padded>
            <SectionTitle level={2}>Busiest endpoints</SectionTitle>
            <BarChart
              label="Requests by endpoint"
              labels={["/search", "/orders", "/login", "/files", "/billing"]}
              horizontal
              format={short}
              series={[{ name: "Requests", values: data.endpoints }]}
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
      <Toaster />
    </div>
  );
}
