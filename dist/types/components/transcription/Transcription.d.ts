import type { ReactNode } from "react";
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
/** A timed transcript that follows the audio. */
export declare function Transcription({ segments, currentTime, onSeek, label, className }: TranscriptionProps): import("react").JSX.Element;
