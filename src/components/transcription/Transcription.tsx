// Transcription: what was said, line by line, each with its time and who spoke. Given the playing time it marks the
// line being heard; with `onSeek`, a line's time jumps the audio there.

// ── Dependencies ──────────────────────────
import type { ReactNode } from "react";
import { clock } from "../audio-player/clock";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface TranscriptSegment {
  /** When it starts, in seconds; segments come in order. */
  start: number;
  /** When it ends; without it, a segment lasts until the next. */
  end?: number;
  text: ReactNode;
  speaker?: string;
}

export interface TranscriptionProps {
  segments: TranscriptSegment[];
  /** The playing time in seconds; marks the segment being heard. */
  currentTime?: number;
  /** Jumps the audio to a segment; each time becomes a button. */
  onSeek?: (seconds: number) => void;
  /** Names the list for screen readers (default "Transcript"). */
  label?: string;
  className?: string;
}

// ── Private helpers ───────────────────────
/** The segment being heard: the last one started, unless it has ended. */
function activeIndex(segments: TranscriptSegment[], time: number | undefined) {
  if (time === undefined) return -1;
  let index = -1;
  segments.forEach((segment, at) => {
    if (segment.start <= time) index = at;
  });
  const segment = segments[index];
  return segment && (segment.end === undefined || time < segment.end) ? index : -1;
}

// ── Public API ────────────────────────────
/** A timed transcript that follows the audio. */
export function Transcription({ segments, currentTime, onSeek, label = "Transcript", className }: TranscriptionProps) {
  const active = activeIndex(segments, currentTime);
  return (
    <ol aria-label={label} className={cx("iro-transcription", className)}>
      {segments.map((segment, index) => (
        <li
          // biome-ignore lint/suspicious/noArrayIndexKey: a segment is its place in the recording.
          key={index}
          data-active={index === active || undefined}
          aria-current={index === active || undefined}
          className="iro-transcription-segment"
        >
          {onSeek ? (
            <button type="button" className="iro-transcription-time" onClick={() => onSeek(segment.start)}>
              {clock(segment.start)}
            </button>
          ) : (
            <span className="iro-transcription-time">{clock(segment.start)}</span>
          )}
          <p className="iro-transcription-text">
            {segment.speaker ? <span className="iro-transcription-speaker">{segment.speaker}</span> : null}
            {segment.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
