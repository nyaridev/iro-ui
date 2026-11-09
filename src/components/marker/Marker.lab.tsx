// Lab page: Marker as a day, a summary note, and a checkpoint with a Restore action.

import { FlagIcon } from "../../icons/set/marks";
import { Button } from "../button/Button";
import { Icon } from "../icon/Icon";
import { Marker } from "./Marker";

export default function MarkerLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <Marker className="lab-fill">Today</Marker>
      <Marker className="lab-fill">Earlier messages summarized</Marker>
      <Marker
        className="lab-fill"
        icon={<Icon icon={FlagIcon} />}
        action={
          <Button size="sm" variant="ghost">
            Restore
          </Button>
        }
      >
        Checkpoint
      </Marker>
    </div>
  );
}
