// Template data: the analytics numbers for a range. Every series is computed from the day's index, so a range always
// shows the same data, the shorter ranges are the tail of the longer ones, and "the period before" is real.

// ── Constants ─────────────────────────────
export const RANGES = [
  { value: "7d", label: "7D", days: 7 },
  { value: "30d", label: "30D", days: 30 },
  { value: "90d", label: "90D", days: 90 },
] as const;

export type Range = (typeof RANGES)[number]["value"];

/** The last day shown, and how many days of history the series hold (two of the longest range). */
const END = Date.UTC(2026, 10, 9);
const HISTORY = 180;
const DAY = 86_400_000;

const dayName = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumSignificantDigits: 3 });

// ── Private helpers ───────────────────────
/** A steady series over the history: a trend from `from` to `to`, a weekly rhythm and a fixed wobble. */
function history(from: number, to: number, swing: number): number[] {
  return Array.from({ length: HISTORY }, (_, index) => {
    const trend = from + ((to - from) * index) / (HISTORY - 1);
    const weekly = Math.sin((index * 2 * Math.PI) / 7) * swing * 0.6;
    const wobble = Math.sin(index * 12.9898) * swing;
    return trend + weekly + wobble;
  });
}

const REQUESTS = history(52_000, 95_000, 4_000).map(Math.round);
const USERS = history(1_520, 2_481, 40).map(Math.round);
const ERRORS = history(2.1, 0.8, 0.12);
const LATENCY = history(158, 184, 4);

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);
const mean = (values: number[]) => sum(values) / values.length;
/** The change from `before` to `now`, in percent with one decimal. */
const change = (now: number, before: number) => Math.round(((now - before) / before) * 1000) / 10;

// ── Public API ────────────────────────────
/** Formats big numbers short: 1.28M, 97K. */
export const short = (value: number) => compact.format(value);

/** Everything the analytics screen shows for a range. */
export function analyticsFor(range: Range) {
  const days = RANGES.find(({ value }) => value === range)?.days ?? 30;
  const now = (values: number[]) => values.slice(-days);
  const before = (values: number[]) => values.slice(-2 * days, -days);
  const labels = Array.from({ length: days }, (_, index) => dayName.format(END - (days - 1 - index) * DAY));
  const requests = now(REQUESTS);
  const total = sum(requests);
  const users = now(USERS);
  const errors = now(ERRORS);
  const latency = now(LATENCY);

  const stats = [
    { label: "Requests", value: short(total), change: change(total, sum(before(REQUESTS))), trend: requests },
    {
      label: "Active users",
      value: users[users.length - 1].toLocaleString("en-US"),
      change: change(users[users.length - 1], USERS[HISTORY - 1 - days]),
      trend: users,
    },
    {
      label: "Error rate",
      value: `${mean(errors).toFixed(1)}%`,
      change: change(mean(errors), mean(before(ERRORS))),
      trend: errors,
      lowerIsBetter: true,
    },
    {
      label: "Median latency",
      value: `${Math.round(mean(latency))} ms`,
      change: change(mean(latency), mean(before(LATENCY))),
      trend: latency,
      lowerIsBetter: true,
    },
  ];

  // Deploys: per day for a week, per week otherwise.
  const buckets = days === 7 ? 7 : Math.round(days / 7);
  const deployLabels = days === 7 ? labels : Array.from({ length: buckets }, (_, i) => `W${46 - buckets + i}`);
  const perBucket = days === 7 ? 1 / 5 : 1;
  const deploys = (base: number, swing: number) =>
    Array.from({ length: buckets }, (_, index) =>
      Math.max(1, Math.round((base + Math.sin(index * 2.3 + base) * swing) * perBucket)),
    );

  return {
    days,
    subtitle: `${labels[0]} to ${labels[labels.length - 1]}`,
    labels,
    stats,
    requests,
    previous: before(REQUESTS),
    total,
    regions: [
      { name: "Europe", value: Math.round(total * 0.478) },
      { name: "North America", value: Math.round(total * 0.313) },
      { name: "Asia Pacific", value: Math.round(total * 0.167) },
      { name: "Other", value: Math.round(total * 0.042) },
    ],
    deployLabels,
    deploys: [
      { name: "Production", values: deploys(15, 3) },
      { name: "Staging", values: deploys(25, 4) },
      { name: "Preview", values: deploys(35, 5) },
    ],
    endpoints: [0.377, 0.249, 0.175, 0.1, 0.048].map((share) => Math.round(total * share)),
  };
}

/** The requests of a range as CSV: one row per day, with the period before beside it. */
export function requestsCsv(range: Range): string {
  const { labels, requests, previous } = analyticsFor(range);
  const rows = labels.map((label, index) => `${label},${requests[index]},${previous[index]}`);
  return ["Day,Requests,Previous period", ...rows].join("\n");
}
