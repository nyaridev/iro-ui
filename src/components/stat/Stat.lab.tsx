// Lab page: Stat on cards with a trend and a chart, with an icon and a hint, and plain in a row inside a panel.

import { UsersIcon } from "../../icons/set/people";
import { Icon } from "../icon/Icon";
import { Panel } from "../panel/Panel";
import { ProgressBar } from "../progress-bar/ProgressBar";
import { Sparkline } from "../sparkline/Sparkline";
import { Trend } from "../trend/Trend";
import { Stat } from "./Stat";

const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))", gap: 12, width: "100%" };

export default function StatLab() {
  return (
    <div className="lab-stack">
      <h3>Cards</h3>
      <div style={grid}>
        <Stat
          label="Requests"
          value="1.28M"
          change={<Trend value={8.4} />}
          chart={<Sparkline label="Requests, last 14 days" values={[71, 74, 72, 80, 84, 79, 77, 86, 88, 85, 91, 94]} />}
        />
        <Stat
          label="Error rate"
          value="0.8%"
          change={<Trend value={-0.3} good="down" />}
          chart={<Sparkline label="Error rate, last 14 days" values={[21, 19, 24, 17, 15, 16, 13, 12, 14, 11, 9, 8]} />}
        />
        <Stat
          icon={<Icon icon={UsersIcon} />}
          label="Seats"
          value="8 of 10"
          hint="2 invites waiting"
          chart={<ProgressBar value={0.8} size="sm" label="Seats used" />}
        />
      </div>
      <h3>Plain, in a row</h3>
      <Panel style={{ ...grid, gridTemplateColumns: "repeat(auto-fit, minmax(9rem, 1fr))" }}>
        <Stat variant="plain" label="Open" value="37" change={<Trend value={-8} good="down" variant="text" />} />
        <Stat variant="plain" label="Closed this week" value="112" change={<Trend value={14} variant="text" />} />
        <Stat variant="plain" label="Median time to close" value="2.4 d" hint="Same as last week" />
      </Panel>
    </div>
  );
}
