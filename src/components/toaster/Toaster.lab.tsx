// Lab page: a button per toast tone, one with an Undo action and one that stays until dismissed. The Lab's own
// Toaster draws them, inside the stage's IroRoot.

import { Button } from "../button/Button";
import { Toaster, toast } from "./Toaster";

export default function ToasterLab() {
  return (
    <div className="lab-row">
      <Toaster />
      <Button onClick={() => toast({ title: "Profile saved" })}>Info</Button>
      <Button onClick={() => toast({ title: "Model downloaded", description: "SDXL 1.0, 6.9 GB", tone: "success" })}>
        Success
      </Button>
      <Button onClick={() => toast({ title: "ComfyUI is slow to answer", tone: "warning" })}>Warning</Button>
      <Button onClick={() => toast({ title: "Generation failed", description: "Out of VRAM.", tone: "error" })}>
        Error
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "Image deleted",
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
