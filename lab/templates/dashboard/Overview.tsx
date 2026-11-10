// Dashboard's Overview page: a notice, stat tiles, recent activity (filtered by the search) beside services and usage.

// ── Dependencies ──────────────────────────
import {
  Avatar,
  Button,
  Counter,
  Notice,
  Panel,
  ProgressBar,
  SectionTitle,
  Stat,
  StatusDot,
  Trend,
} from "../../../src";
import { ACTIVITY, QUOTAS, SERVICES, STATS } from "./data";

// ── Constants ─────────────────────────────
const numbers = new Intl.NumberFormat("en-US");

// ── Public API ────────────────────────────
/** The overview page; `query` filters the activity, and `onClear` empties it. */
export function Overview({ query, onClear }: { query: string; onClear: () => void }) {
  const needle = query.trim().toLowerCase();
  const activity = ACTIVITY.filter((entry) =>
    [entry.name, entry.action, entry.target].some((text) => text.toLowerCase().includes(needle)),
  );

  return (
    <>
      <Notice tone="warning" title="Scheduled maintenance">
        The database cluster restarts on Sunday from 02:00 to 02:30 UTC.
      </Notice>

      <div className="tpl-dash-stats">
        {STATS.map(({ label, value, change, good }) => (
          <Stat
            key={label}
            label={label}
            value={<Counter value={value} format={(n) => numbers.format(n)} />}
            hint={<Trend value={change} good={good} context="vs yesterday" />}
          />
        ))}
      </div>

      <div className="tpl-dash-panels">
        <Panel as="section" padded>
          <SectionTitle
            actions={
              needle ? (
                <Button variant="ghost" size="sm" onClick={onClear}>
                  Show all
                </Button>
              ) : undefined
            }
          >
            Recent activity
          </SectionTitle>
          {activity.length > 0 ? (
            <ul className="tpl-dash-activity">
              {activity.map(({ name, color, action, target, time }) => (
                <li key={name}>
                  <Avatar name={name} color={color} size={28} />
                  <p>
                    <strong>{name}</strong> {action} <span>{target}</span>
                  </p>
                  <time>{time}</time>
                </li>
              ))}
            </ul>
          ) : (
            <p className="tpl-dash-none">No activity matches “{query.trim()}”.</p>
          )}
        </Panel>

        <div className="tpl-dash-side">
          <Panel as="section" padded>
            <SectionTitle>Services</SectionTitle>
            <ul className="tpl-dash-services">
              {SERVICES.map(({ name, healthy, load }) => (
                <li key={name}>
                  <StatusDot tone={healthy ? "success" : "warning"} label={healthy ? "Healthy" : "Degraded"} />
                  <code>{name}</code>
                  <ProgressBar value={load / 100} tone={load > 85 ? "danger" : "accent"} label={`${name} load`} />
                  <span>{load}%</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel as="section" padded className="tpl-dash-usage">
            <SectionTitle>Usage this month</SectionTitle>
            {QUOTAS.map(({ label, used, total, unit }) => (
              <div key={label} className="tpl-dash-quota">
                <span>{label}</span>
                <span>
                  {numbers.format(used)} / {numbers.format(total)}
                  {unit}
                </span>
                <ProgressBar value={used / total} size="sm" label={label} />
              </div>
            ))}
          </Panel>
        </div>
      </div>
    </>
  );
}
