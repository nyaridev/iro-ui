// Lab page: Sparkline rising, falling in the danger color, and with an area, each under the number it explains.

import { Sparkline } from "./Sparkline";

const TILE = { display: "grid", gap: 4, width: 180 } as const;

export default function SparklineLab() {
  return (
    <div className="lab-row">
      <div style={TILE}>
        <span className="lab-hint">Active users</span>
        <strong>2,481</strong>
        <Sparkline
          label="Active users, last 14 days"
          values={[1810, 1900, 1870, 2010, 2100, 2050, 2190, 2240, 2210, 2330, 2300, 2390, 2420, 2481]}
        />
      </div>
      <div style={TILE}>
        <span className="lab-hint">Error rate</span>
        <strong>0.8%</strong>
        <Sparkline
          label="Error rate, last 14 days"
          color="var(--iro-danger)"
          values={[2.1, 1.9, 2.4, 1.7, 1.5, 1.6, 1.3, 1.2, 1.4, 1.1, 0.9, 1, 0.9, 0.8]}
          format={(value) => `${value}%`}
        />
      </div>
      <div style={TILE}>
        <span className="lab-hint">Storage</span>
        <strong>36 GB</strong>
        <Sparkline
          label="Storage, last 14 days"
          area
          values={[22, 23, 23, 25, 26, 26, 28, 29, 30, 31, 33, 34, 35, 36]}
        />
      </div>
    </div>
  );
}
