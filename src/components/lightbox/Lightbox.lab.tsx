// Lab page: Lightbox opened from a gallery at the picture clicked, and from a button.

import { useState } from "react";
import { Button } from "../button/Button";
import { Image } from "../image/Image";
import { scene } from "../image/Image.lab";
import { Lightbox, type LightboxImage } from "./Lightbox";

const PICTURES: LightboxImage[] = [
  { src: scene(205, 140), alt: "Green hills under a blue sky", caption: "Morning over the hills." },
  { src: scene(20, 90), alt: "Olive hills at sunset" },
  { src: scene(260, 300), alt: "Purple hills at dusk", caption: "Dusk, an hour later." },
  { src: scene(40, 30), alt: "Desert dunes at noon" },
];

export default function LightboxLab() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <h3>Gallery</h3>
      <div className="lab-row">
        {PICTURES.map((picture, at) => (
          <button
            key={picture.src}
            type="button"
            style={{ width: 120, padding: 0, font: "inherit", cursor: "zoom-in", background: "none", border: 0 }}
            aria-label={`Open ${picture.alt}`}
            onClick={() => {
              setIndex(at);
              setOpen(true);
            }}
          >
            <Image src={picture.src} alt="" ratio={1} />
          </button>
        ))}
      </div>
      <Lightbox images={PICTURES} open={open} onOpenChange={setOpen} index={index} onIndexChange={setIndex} />
      <h3>From a button</h3>
      <Lightbox images={PICTURES.slice(2)} trigger={<Button data-lab-state="click">Open the dusk pictures</Button>} />
    </div>
  );
}
