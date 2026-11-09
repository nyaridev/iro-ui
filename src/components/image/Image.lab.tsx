// Lab page: Image loaded in a ratio, contained, with a caption, without a ratio, failed, and waiting to load. The
// pictures are drawn here as SVG, so the page needs no files.

import { useState } from "react";
import { Button } from "../button/Button";
import { Image } from "./Image";

/** A small landscape as a data URL: sky, sun and hills in two hues. Lightbox's page uses it too. */
export function scene(sky: number, land: number, width = 640, height = 400) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
    <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${sky} 70% 78%)"/><stop offset="1" stop-color="hsl(${sky + 30} 75% 90%)"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#s)"/>
    <circle cx="${width * 0.72}" cy="${height * 0.32}" r="${height * 0.11}" fill="hsl(${sky + 40} 95% 96%)"/>
    <path d="M0 ${height * 0.7} Q${width * 0.25} ${height * 0.45} ${width * 0.5} ${height * 0.66} T${width} ${height * 0.58} V${height} H0Z" fill="hsl(${land} 35% 52%)"/>
    <path d="M0 ${height * 0.85} Q${width * 0.35} ${height * 0.68} ${width * 0.7} ${height * 0.84} T${width} ${height * 0.8} V${height} H0Z" fill="hsl(${land} 40% 36%)"/>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default function ImageLab() {
  const [load, setLoad] = useState(false);
  return (
    <div className="lab-stack" style={{ maxWidth: 640 }}>
      <h3>Ratio and fit</h3>
      <div className="lab-row" style={{ alignItems: "flex-start" }}>
        <Image src={scene(205, 140)} alt="Green hills under a blue sky" ratio={16 / 9} style={{ width: 240 }} />
        <Image src={scene(20, 90)} alt="Olive hills at sunset" ratio="1" fit="contain" style={{ width: 140 }} />
        <Image src={scene(260, 300, 300, 400)} alt="Purple hills at dusk" ratio="3 / 4" style={{ width: 120 }} />
      </div>
      <h3>Caption, no ratio</h3>
      <Image
        src={scene(190, 160, 640, 240)}
        alt="A wide valley"
        caption="The valley in spring, drawn as an SVG."
        style={{ maxWidth: 360 }}
      />
      <h3>Failed and loading</h3>
      <div className="lab-row" style={{ alignItems: "flex-start" }}>
        <Image src="data:image/png;base64,broken" alt="Team photo" ratio={4 / 3} style={{ width: 200 }} />
        <Image src={load ? scene(40, 30) : undefined} alt="Desert dunes" ratio={4 / 3} style={{ width: 200 }} />
        <Button onClick={() => setLoad(!load)}>{load ? "Unload" : "Load"}</Button>
      </div>
    </div>
  );
}
