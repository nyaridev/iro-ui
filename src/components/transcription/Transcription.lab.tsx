// Lab page: Transcription following an AudioPlayer (a line's time seeks it), and on its own with a line marked.

import { useRef, useState } from "react";
import { AudioPlayer } from "../audio-player/AudioPlayer";
import { toneUrl } from "../audio-player/AudioPlayer.lab";
import { Transcription, type TranscriptSegment } from "./Transcription";

const SEGMENTS: TranscriptSegment[] = [
  { start: 0, speaker: "Ana", text: "Morning. Quick one today: the export fix shipped last night." },
  { start: 3, speaker: "Ben", text: "Nice. Did the empty rows come out right?" },
  { start: 5.5, speaker: "Ana", text: "They keep every column now, and there's a test for it." },
  { start: 8.5, speaker: "Ben", text: "Then I'll close the ticket. Anything blocking you?" },
  { start: 10.5, end: 12, speaker: "Ana", text: "No, all clear." },
];

export default function TranscriptionLab() {
  const [src] = useState(() => toneUrl(12));
  const [time, setTime] = useState(0);
  const audio = useRef<HTMLAudioElement | null>(null);
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <h3>With a player</h3>
      <AudioPlayer src={src} title="Morning stand-up" audioRef={audio} onTimeUpdate={setTime} className="lab-fill" />
      <Transcription
        segments={SEGMENTS}
        currentTime={time}
        onSeek={(seconds) => {
          if (!audio.current) return;
          audio.current.currentTime = seconds;
          audio.current.play();
        }}
        className="lab-fill"
      />
      <h3>On its own</h3>
      <Transcription segments={SEGMENTS.slice(0, 3)} currentTime={4} className="lab-fill" />
    </div>
  );
}
