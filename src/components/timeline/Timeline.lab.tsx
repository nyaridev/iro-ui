// Lab page: Timeline with dots, with icons in each tone, with avatars and with a block of detail.

import { CheckIcon } from "../../icons/set/basics";
import { AlertTriangleIcon } from "../../icons/set/status";
import { BranchIcon, LayersIcon } from "../../icons/set/structure";
import { RocketIcon } from "../../icons/set/tools";
import { Avatar } from "../avatar/Avatar";
import { Icon } from "../icon/Icon";
import { Timeline } from "./Timeline";

export default function TimelineLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <h3>Dots</h3>
      <Timeline
        className="lab-fill"
        items={[
          { id: "a", title: "Order placed", time: "09:12" },
          { id: "b", title: "Payment confirmed", time: "09:13", tone: "success" },
          { id: "c", title: "Packed", time: "11:40", tone: "accent" },
          { id: "d", title: "Shipped", description: "Expected on Thursday." },
        ]}
      />
      <h3>Icons and tones</h3>
      <Timeline
        className="lab-fill"
        items={[
          {
            id: "deploy",
            title: "Deployed to production",
            time: "2 min ago",
            icon: <Icon icon={RocketIcon} />,
            tone: "success",
            description: "Build 4f2a91c by Maya Chen.",
          },
          {
            id: "warn",
            title: "Slow responses on /search",
            time: "40 min ago",
            icon: <Icon icon={AlertTriangleIcon} />,
            tone: "warning",
          },
          {
            id: "merge",
            title: "Merged Export to CSV",
            time: "1 h ago",
            icon: <Icon icon={BranchIcon} />,
            tone: "accent",
          },
          { id: "check", title: "Checks passed", time: "1 h ago", icon: <Icon icon={CheckIcon} />, tone: "info" },
          { id: "layer", title: "Created the project", time: "Yesterday", icon: <Icon icon={LayersIcon} /> },
        ]}
      />
      <h3>Avatars, with detail</h3>
      <Timeline
        className="lab-fill"
        items={[
          {
            id: "comment",
            title: (
              <>
                <strong>Leo Park</strong> commented
              </>
            ),
            time: "5 min ago",
            icon: <Avatar name="Leo Park" color="green" size={28} />,
            content: <div className="lab-chip">Looks good. Can we keep the old export for one more release?</div>,
          },
          {
            id: "review",
            title: (
              <>
                <strong>Sara Novak</strong> asked for a review
              </>
            ),
            time: "1 h ago",
            icon: <Avatar name="Sara Novak" color="purple" size={28} />,
          },
        ]}
      />
    </div>
  );
}
