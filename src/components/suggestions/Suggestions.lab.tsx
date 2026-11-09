// Lab page: Suggestions as plain text and with icons, showing what was picked.

import { useState } from "react";
import { ChartIcon } from "../../icons/set/charts";
import { FileTextIcon } from "../../icons/set/files";
import { LightbulbIcon } from "../../icons/set/marks";
import { Icon } from "../icon/Icon";
import { Suggestions } from "./Suggestions";

export default function SuggestionsLab() {
  const [picked, setPicked] = useState("");
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <h3>Plain</h3>
      <Suggestions
        onPick={setPicked}
        suggestions={["Sum up this page", "Draft a reply", "Find the action items", "Translate to Spanish"]}
      />
      <h3>With icons</h3>
      <Suggestions
        onPick={setPicked}
        suggestions={[
          { text: "Explain the chart", icon: <Icon icon={ChartIcon} /> },
          { text: "Write a summary", icon: <Icon icon={FileTextIcon} /> },
          { text: "Suggest next steps", icon: <Icon icon={LightbulbIcon} /> },
        ]}
      />
      <span className="lab-hint">Picked: {picked || "nothing yet"}</span>
    </div>
  );
}
