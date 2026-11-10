import { type ReactNode, type Ref } from "react";
export interface AudioPlayerProps {
    src: string;
    title?: ReactNode;
    /** Under the title: who, or what kind ("Voice note"). */
    subtitle?: ReactNode;
    /** Called as it plays, with the time in seconds. */
    onTimeUpdate?: (seconds: number) => void;
    /** The audio element, to seek or play it from outside. */
    audioRef?: Ref<HTMLAudioElement>;
    className?: string;
}
/** An audio element with play, seek and mute controls. */
export declare function AudioPlayer({ src, title, subtitle, onTimeUpdate, audioRef, className }: AudioPlayerProps): import("react").JSX.Element;
