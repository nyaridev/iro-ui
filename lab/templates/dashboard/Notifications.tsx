// Dashboard's notifications: a bell with an unread count that opens a list; Mark all read clears the count.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import { Button, CountBubble, Icon, IconButton, Popover } from "../../../src";
import { BellIcon } from "../../../src/icons";
import { NOTIFICATIONS } from "./data";

// ── Public API ────────────────────────────
/** The bell and its popover. */
export function Notifications() {
  const [unread, setUnread] = useState(() => new Set(NOTIFICATIONS.map(({ id }) => id)));

  return (
    <span className="tpl-dash-bell">
      <Popover
        title="Notifications"
        align="end"
        className="tpl-dash-notes"
        trigger={
          <IconButton
            icon={<Icon icon={BellIcon} />}
            label={unread.size ? `Notifications, ${unread.size} unread` : "Notifications"}
            data-lab-state="click"
          />
        }
      >
        <ul>
          {NOTIFICATIONS.map(({ id, text, time }) => (
            <li key={id} data-unread={unread.has(id) || undefined}>
              <p>{text}</p>
              <time>{time}</time>
            </li>
          ))}
        </ul>
        <Button size="sm" variant="ghost" disabled={unread.size === 0} onClick={() => setUnread(new Set())}>
          Mark all read
        </Button>
      </Popover>
      <CountBubble count={unread.size} corner aria-hidden="true" />
    </span>
  );
}
