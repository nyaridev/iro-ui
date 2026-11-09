// Lab page: Banner in every tone, with an action and a close button, and one that comes back once closed.

import { useState } from "react";
import { Button } from "../button/Button";
import { Banner } from "./Banner";

export default function BannerLab() {
  const [open, setOpen] = useState(true);
  return (
    <div className="lab-stack">
      <h3>Tones</h3>
      <Banner className="lab-fill">Version 2.4 is out, with shared folders and faster search.</Banner>
      <Banner tone="info" className="lab-fill">
        Your trial ends in 5 days.
      </Banner>
      <Banner tone="success" className="lab-fill">
        Everything is running normally.
      </Banner>
      <Banner tone="warning" className="lab-fill">
        Sync is slow in some regions. We're looking into it.
      </Banner>
      <Banner tone="danger" className="lab-fill">
        Uploads are down. Your files are safe.
      </Banner>
      <h3>With an action and a close button</h3>
      {open ? (
        <Banner
          className="lab-fill"
          actions={
            <Button size="sm" variant="primary">
              See what's new
            </Button>
          }
          onDismiss={() => setOpen(false)}
        >
          Version 2.4 is out.
        </Banner>
      ) : (
        <Button size="sm" onClick={() => setOpen(true)}>
          Show the banner again
        </Button>
      )}
    </div>
  );
}
