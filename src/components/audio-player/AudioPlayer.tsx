// AudioPlayer: a voice note or a track in the style's look: play and pause, the time, a seek bar and mute, around the
// browser's own audio element. `audioRef` reaches that element, so a transcript can seek it and follow it.

// ── Dependencies ──────────────────────────
import { type ReactNode, type Ref, useImperativeHandle, useRef, useState } from "react";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { PauseGlyph, PlayGlyph, VolumeGlyph, VolumeOffGlyph } from "../shared/glyphs";
import { Slider } from "../slider/Slider";
import { clock } from "./clock";

// ── Types ─────────────────────────────────
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

// ── Public API ────────────────────────────
/** An audio element with play, seek and mute controls. */
export function AudioPlayer({ src, title, subtitle, onTimeUpdate, audioRef, className }: AudioPlayerProps) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  useImperativeHandle(audioRef, () => audio.current as HTMLAudioElement, []);

  return (
    <div data-playing={playing || undefined} className={cx("iro-audio-player", className)}>
      {/* biome-ignore lint/a11y/useMediaCaption: the app passes captions as a Transcription, next to the player. */}
      <audio
        ref={audio}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        onTimeUpdate={(event) => {
          setTime(event.currentTarget.currentTime);
          onTimeUpdate?.(event.currentTarget.currentTime);
        }}
      />
      <IconButton
        variant="primary"
        icon={playing ? <PauseGlyph /> : <PlayGlyph />}
        label={playing ? "Pause" : "Play"}
        tooltip={false}
        onClick={() => (audio.current?.paused ? audio.current.play() : audio.current?.pause())}
      />
      <div className="iro-audio-player-main">
        {title ? (
          <div className="iro-audio-player-head">
            <span className="iro-audio-player-title">{title}</span>
            {subtitle ? <span className="iro-audio-player-subtitle">{subtitle}</span> : null}
          </div>
        ) : null}
        <div className="iro-audio-player-track">
          <span className="iro-audio-player-time">{clock(time)}</span>
          <Slider
            aria-label="Seek"
            min={0}
            max={Number.isFinite(duration) && duration > 0 ? duration : 1}
            step={0.1}
            value={Math.min(time, duration || 0)}
            disabled={!duration}
            onValueChange={(next) => {
              if (audio.current) audio.current.currentTime = next;
              setTime(next);
            }}
          />
          <span className="iro-audio-player-time">{clock(duration)}</span>
        </div>
      </div>
      <IconButton
        icon={muted ? <VolumeOffGlyph /> : <VolumeGlyph />}
        label={muted ? "Unmute" : "Mute"}
        size="sm"
        onClick={() => {
          if (audio.current) audio.current.muted = !audio.current.muted;
        }}
      />
    </div>
  );
}
