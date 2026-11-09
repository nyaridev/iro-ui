// Lab page: Trend going up, down and flat, with each meaning of good, as text, with context and its own format.

import { Trend } from "./Trend";

export default function TrendLab() {
  return (
    <div className="lab-stack">
      <h3>Up is good (default)</h3>
      <div className="lab-row">
        <Trend value={12.4} />
        <Trend value={-3.1} />
        <Trend value={0} />
      </div>
      <h3>Down is good: errors, latency, cost</h3>
      <div className="lab-row">
        <Trend value={-0.3} good="down" />
        <Trend value={4.1} good="down" />
      </div>
      <h3>No judgment</h3>
      <div className="lab-row">
        <Trend value={6} good="none" />
        <Trend value={-6} good="none" />
      </div>
      <h3>As text, with context and its own format</h3>
      <div className="lab-row">
        <Trend value={12.4} variant="text" context="vs yesterday" />
        <Trend
          value={-240}
          format={(value) => `${value > 0 ? "+" : "−"}${Math.abs(value)} users`}
          context="this week"
        />
      </div>
    </div>
  );
}
