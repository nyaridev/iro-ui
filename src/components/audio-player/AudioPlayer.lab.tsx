// Lab page: AudioPlayer with a title, and bare. The audio is a short tune made here, so the page needs no files.

import { useState } from "react";
import { AudioPlayer } from "./AudioPlayer";

/** A WAV of four soft notes repeating, as an object URL; Transcription's page uses it too. */
export function toneUrl(seconds: number) {
  const rate = 8000;
  const length = rate * seconds;
  const view = new DataView(new ArrayBuffer(44 + length));
  const text = (at: number, word: string) => {
    for (const [index, char] of [...word].entries()) view.setUint8(at + index, char.charCodeAt(0));
  };
  text(0, "RIFF");
  view.setUint32(4, 36 + length, true);
  text(8, "WAVEfmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, rate, true);
  view.setUint32(28, rate, true);
  view.setUint16(32, 1, true);
  view.setUint16(34, 8, true);
  text(36, "data");
  view.setUint32(40, length, true);
  const notes = [262, 330, 392, 523];
  for (let sample = 0; sample < length; sample++) {
    const time = sample / rate;
    const fade = Math.min(1, (1 - (time % 1)) * 4);
    const wave = Math.sin(2 * Math.PI * notes[Math.floor(time) % notes.length] * time);
    view.setUint8(44 + sample, 128 + Math.round(20 * fade * wave));
  }
  return URL.createObjectURL(new Blob([view.buffer], { type: "audio/wav" }));
}

export default function AudioPlayerLab() {
  const [src] = useState(() => toneUrl(12));
  return (
    <div className="lab-stack" style={{ maxWidth: 480 }}>
      <h3>With a title</h3>
      <AudioPlayer src={src} title="Morning stand-up" subtitle="Voice note" className="lab-fill" />
      <h3>Bare</h3>
      <AudioPlayer src={src} className="lab-fill" />
    </div>
  );
}
