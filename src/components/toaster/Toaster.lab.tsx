// Lab page: a button per toast tone, one with an Undo action and one that stays until dismissed. The Lab's own
// Toaster draws them, inside the stage's IroRoot.

import { Button } from "../button/Button";
import { Toaster, toast } from "./Toaster";

export default function ToasterLab() {
  return (
    <div className="lab-row">
      <Toaster />
      <Button onClick={() => toast({ title: "Project saved" })}>Info</Button>
      <Button onClick={() => toast({ title: "File uploaded", description: "report.pdf, 2.4 MB", tone: "success" })}>
        Success
      </Button>
      <Button onClick={() => toast({ title: "The server is slow to answer", tone: "warning" })}>Warning</Button>
      <Button onClick={() => toast({ title: "Upload failed", description: "Not enough space.", tone: "error" })}>
        Error
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "File deleted",
            action: { label: "Undo", onClick: () => toast({ title: "Restored", tone: "success" }) },
          })
        }
      >
        With Undo
      </Button>
      <Button onClick={() => toast({ title: "Stays until dismissed", timeout: 0 })}>Sticky</Button>
    </div>
  );
}
