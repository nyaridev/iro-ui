// Lab page: Message from the reader (with attachments), the assistant (with an avatar, actions and Prose), the
// system, and an assistant answer still streaming.

import { CopyIcon } from "../../icons/set/editing";
import { RefreshIcon } from "../../icons/set/history";
import { SparkleIcon } from "../../icons/set/marks";
import { Attachment } from "../attachment/Attachment";
import { Icon } from "../icon/Icon";
import { IconButton } from "../icon-button/IconButton";
import { Prose } from "../prose/Prose";
import { Message } from "./Message";

const actions = (
  <>
    <IconButton size="sm" icon={<Icon icon={CopyIcon} />} label="Copy" />
    <IconButton size="sm" icon={<Icon icon={RefreshIcon} />} label="Try again" />
  </>
);

export default function MessageLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 680, gap: 20 }}>
      <Message
        from="user"
        className="lab-fill"
        attachments={<Attachment name="q3-report.pdf" kind="PDF" size={2_400_000} />}
      >
        Can you sum up the report in three points?
      </Message>
      <Message from="assistant" avatar={<Icon icon={SparkleIcon} size={18} />} actions={actions} className="lab-fill">
        <Prose size="sm">
          <p>Here's the short version:</p>
          <ol>
            <li>Revenue grew 12% on the quarter before.</li>
            <li>Costs held steady, so the margin rose.</li>
            <li>Two new regions opened in September.</li>
          </ol>
        </Prose>
      </Message>
      <Message from="system" className="lab-fill">
        Earlier messages were summarized to save room.
      </Message>
      <Message from="assistant" avatar={<Icon icon={SparkleIcon} size={18} />} streaming className="lab-fill">
        <Prose size="sm">
          <p>The biggest change is in the second half, where the new regions</p>
        </Prose>
      </Message>
    </div>
  );
}
