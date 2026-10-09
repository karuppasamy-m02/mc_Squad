import React, { useRef, useEffect, useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  X
} from 'lucide-react';

export default function AudioPlayer({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onClose
}) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  // Sync play/pause state with HTML5 audio
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio playback interrupted or blocked by autoplay policy:', err);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // Adjust volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentSong) return null;

  return (
    <aside
      className="fixed bottom-0 left-0 w-full z-50 glass-nav animate-slide-up"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        backgroundColor: 'rgba(10, 10, 10, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(229, 9, 20, 0.35)',
        boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.85)',
        padding: '12px 0'
      }}
      aria-label="Audio player"
    >
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onNext}
      />

      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(12px, 3vw, 32px)'
        }}
      >
        {/* Left: Song Meta & Cover */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '200px', maxWidth: '300px' }}>
          <div
            style={{
              position: 'relative',
              width: '54px',
              height: '54px',
              borderRadius: '2px',
              overflow: 'hidden',
              flexShrink: 0,
              border: '1px solid var(--border-subtle)'
            }}
          >
            <img
              src={currentSong.cover}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {isPlaying && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="sound-bars">
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                </div>
              </div>
            )}
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h4
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                margin: 0
              }}
              title={currentSong.title}
            >
              {currentSong.title}
            </h4>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'var(--brand-red)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                margin: 0
              }}
            >
              {currentSong.artist} • <span style={{ color: 'var(--text-muted)' }}>{currentSong.genre}</span>
            </p>
          </div>
        </div>

        {/* Center: Controls & Progress Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            flexGrow: 1,
            maxWidth: '620px'
          }}
        >
          {/* Action Buttons: Prev, Play/Pause, Next */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={onPrev}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '6px'
              }}
              aria-label="Previous track"
              className="player-control-btn"
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={onPlayPause}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-red)',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px var(--brand-red-glow)',
                transition: 'transform 0.15s ease'
              }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} fill="#FFFFFF" /> : <Play size={18} fill="#FFFFFF" style={{ marginLeft: '2px' }} />}
            </button>

            <button
              onClick={onNext}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '6px'
              }}
              aria-label="Next track"
              className="player-control-btn"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Progress Timeline Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace', minWidth: '32px' }}>
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              style={{ flexGrow: 1 }}
              aria-label="Seek time"
            />

            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace', minWidth: '32px' }}>
              {duration ? formatTime(duration) : currentSong.duration}
            </span>
          </div>
        </div>

        {/* Right: Volume & Dismiss Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="player-volume-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={toggleMute}
              style={{
                background: 'none',
                border: 'none',
                color: isMuted ? 'var(--brand-red)' : 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={18} />
              ) : volume < 0.5 ? (
                <Volume1 size={18} />
              ) : (
                <Volume2 size={18} />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              style={{ width: '80px' }}
              aria-label="Volume slider"
            />
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '2px',
              transition: 'color 0.2s ease'
            }}
            aria-label="Close audio player"
            className="player-close-btn"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .player-control-btn:hover {
          color: #FFFFFF !important;
        }
        .player-close-btn:hover {
          color: #FFFFFF !important;
        }
        @media (max-width: 768px) {
          .player-volume-group {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
}
