import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Heart,
  Shuffle,
  Repeat,
  Repeat1,
  Search,
  Share2,
  Check,
  ArrowLeft,
  Skull,
  Baby,
  Zap,
  Music,
  Headphones,
  Disc,
  Clock,
  ListMusic,
  Mic2,
  RotateCcw,
  RotateCw,
  X,
  Copy,
  ExternalLink,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { musicData, headlineTracks, spotifyTheme } from '../data/music';
import { InstagramIcon } from './Icons';

// Helper to convert "MM:SS" duration to total seconds
const parseDuration = (durStr) => {
  if (!durStr || typeof durStr !== 'string') return 0;
  const parts = durStr.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
};

// Format seconds into MM:SS
const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function MusicPage({ onBackToCinema, initialSong = null }) {
  // Audio Playback State & Refs
  const audioRef = useRef(null);
  const isSeekingRef = useRef(false);
  const activeLyricRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(initialSong || musicData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(() => parseDuration(initialSong?.duration || musicData[0]?.duration));
  const [volume, setVolume] = useState(() => {
    try {
      const saved = localStorage.getItem('mcsquad_vol');
      return saved ? parseFloat(saved) : 0.85;
    } catch {
      return 0.85;
    }
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off' | 'all' | 'one'

  // View Navigation State: 'all' | 'signature' | 'genres'
  const [viewMode, setViewMode] = useState('all');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Drawers & Modals
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyricsTab, setLyricsTab] = useState('synced'); // 'synced' | 'full'
  const [showQueue, setShowQueue] = useState(false);
  const [showMobileFullPlayer, setShowMobileFullPlayer] = useState(false);
  const [likedSongIds, setLikedSongIds] = useState(new Set(['love-01', 'family-01', 'hiphop-01']));
  const [copied, setCopied] = useState(false);
  const [lyricsCopied, setLyricsCopied] = useState(false);

  // Initialize and handle incoming song
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const targetSong = initialSong || musicData[0];
    if (audioRef.current && targetSong) {
      audioRef.current.src = targetSong.audio;
      audioRef.current.load();
      if (initialSong) {
        handlePlayToggle(initialSong, true);
      }
    }
  }, [initialSong]);

  // Sync volume with HTML5 audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    try {
      localStorage.setItem('mcsquad_vol', volume.toString());
    } catch {}
  }, [volume, isMuted]);

  // Keyboard Shortcuts (Space, M, Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') {
        e.preventDefault();
        handlePlayToggle(currentSong);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleSkipTime(5);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleSkipTime(-5);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsMuted((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSong, isPlaying]);

  // Main Audio Controller (Rock-Solid Streaming Engine)
  const handlePlayToggle = (song, forcePlay = false) => {
    if (!song) return;
    const audio = audioRef.current;

    // 1. If currently playing song -> toggle play/pause
    if (currentSong?.id === song.id && !forcePlay) {
      if (!audio) return;
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        setIsBuffering(true);
        const p = audio.play();
        if (p !== undefined) {
          p.then(() => {
            setIsBuffering(false);
            setIsPlaying(true);
          }).catch((err) => {
            if (err.name !== 'AbortError') {
              console.warn('Playback error:', err);
              setIsPlaying(false);
            }
            setIsBuffering(false);
          });
        }
      }
      return;
    }

    // 2. Switching to a different track
    setCurrentSong(song);
    setCurrentTime(0);
    const dur = parseDuration(song.duration);
    setDuration(dur > 0 ? dur : 0);
    setIsBuffering(true);
    setIsPlaying(true);

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = song.audio;
      audio.load();
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          setIsBuffering(false);
          setIsPlaying(true);
        }).catch((err) => {
          if (err.name !== 'AbortError') {
            console.warn('Playback error on track switch:', err);
            setIsPlaying(false);
          }
          setIsBuffering(false);
        });
      }
    }
  };

  const handleNextTrack = () => {
    if (musicData.length === 0) return;
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * musicData.length);
      handlePlayToggle(musicData[randomIndex], true);
      return;
    }
    const currentIndex = musicData.findIndex((s) => s.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % musicData.length;
    handlePlayToggle(musicData[nextIndex], true);
  };

  const handlePrevTrack = () => {
    if (musicData.length === 0) return;
    const currentIndex = musicData.findIndex((s) => s.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + musicData.length) % musicData.length;
    handlePlayToggle(musicData[prevIndex], true);
  };

  const handleTrackEnded = () => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.warn);
      }
    } else if (repeatMode === 'all') {
      handleNextTrack();
    } else {
      const currentIndex = musicData.findIndex((s) => s.id === currentSong?.id);
      if (currentIndex < musicData.length - 1) {
        handleNextTrack();
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    }
  };

  // Seeking Handlers
  const handleSeekStart = () => {
    isSeekingRef.current = true;
  };

  const handleSeekChange = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
  };

  const handleSeekCommit = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current && isFinite(seekTime)) {
      audioRef.current.currentTime = seekTime;
    }
    isSeekingRef.current = false;
  };

  const handleSkipTime = (seconds) => {
    if (!audioRef.current) return;
    const maxT = duration || 300;
    const target = Math.max(0, Math.min(maxT, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = target;
    setCurrentTime(target);
  };

  // Click-to-seek from Synced Lyrics line
  const handleLyricLineClick = (time) => {
    if (audioRef.current && isFinite(time)) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
      }
    }
  };

  const toggleRepeatMode = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
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

  const toggleLike = (songId) => {
    setLikedSongIds((prev) => {
      const next = new Set(prev);
      if (next.has(songId)) next.delete(songId);
      else next.add(songId);
      return next;
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLyrics = () => {
    if (navigator.clipboard) {
      const textToCopy = currentSong?.fullLyrics || currentSong?.lyrics || '';
      navigator.clipboard.writeText(textToCopy);
      setLyricsCopied(true);
      setTimeout(() => setLyricsCopied(false), 2000);
    }
  };

  // Filtered Tracks for Genre Vault
  const filteredSongs = useMemo(() => {
    return musicData.filter((song) => {
      const matchesSearch =
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (song.tagline && song.tagline.toLowerCase().includes(searchQuery.toLowerCase()));

      if (activeCategory === 'ALL') return matchesSearch;
      if (activeCategory === 'LOVE') return matchesSearch && song.category === 'LOVE';
      if (activeCategory === 'FAMILY') return matchesSearch && song.category === 'FAMILY';
      if (activeCategory === 'HIPHOP') return matchesSearch && song.category === 'HIPHOP';
      if (activeCategory === 'HORROR') return matchesSearch && song.category === 'HORROR';
      return matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Synced Lyrics Timeline Computation
  const syncedLyrics = currentSong?.syncedLyrics || [];
  const activeLyricIndex = useMemo(() => {
    if (!syncedLyrics || syncedLyrics.length === 0) return -1;
    for (let i = syncedLyrics.length - 1; i >= 0; i--) {
      if (currentTime >= syncedLyrics[i].time) {
        return i;
      }
    }
    return 0;
  }, [currentTime, syncedLyrics]);

  // Auto-scroll active lyric into view
  useEffect(() => {
    if (showLyrics && activeLyricRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [activeLyricIndex, showLyrics]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#09090B',
        color: '#FFFFFF',
        fontFamily: 'var(--font-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        paddingBottom: '120px'
      }}
      className="spotify-clean-vault"
    >
      {/* Hidden Native HTML5 Audio Engine */}
      <audio
        ref={audioRef}
        preload="auto"
        onTimeUpdate={() => {
          if (!isSeekingRef.current && audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current && isFinite(audioRef.current.duration) && audioRef.current.duration > 0) {
            setDuration(audioRef.current.duration);
          }
        }}
        onCanPlay={() => setIsBuffering(false)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={handleTrackEnded}
        onError={(e) => {
          console.error('Audio stream error on', currentSong?.audio, e);
          setIsBuffering(false);
          setIsPlaying(false);
        }}
      />

      {/* 1. TOP MNC-LEVEL SPOTIFY NAVIGATION BAR */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: 'rgba(9, 9, 11, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '14px 0'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          {/* Studio Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src="/logo.png"
              alt="MC Squad"
              style={{
                height: '38px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
            <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '12px' }}>
              <span
                style={{
                  fontSize: '0.66rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'var(--brand-red)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span className="pulsing-dot" style={{ backgroundColor: 'var(--brand-red)', width: '6px', height: '6px' }} />
                MANI STUDIO // DISCOGRAPHY
              </span>
              <span
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-headline)',
                  letterSpacing: '0.02em'
                }}
              >
                MC SQUAD MUSIC VAULT
              </span>
            </div>
          </div>

          {/* Search Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '8px 16px',
              width: '100%',
              maxWidth: '340px'
            }}
            className="hide-on-mobile"
          >
            <Search size={15} color="#A1A1AA" />
            <input
              type="text"
              placeholder="Search 20 tracks, lyrics, moods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '0.84rem',
                width: '100%'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: '#A1A1AA', cursor: 'pointer', padding: 0 }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Right Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setShowLyrics(!showLyrics)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: showLyrics ? 'var(--brand-red)' : 'rgba(255, 255, 255, 0.06)',
                border: showLyrics ? '1px solid var(--brand-red)' : '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                padding: '8px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Toggle Live Synced Lyrics"
            >
              <Mic2 size={14} />
              <span>{showLyrics ? 'CLOSE LYRICS' : 'SYNCED LYRICS'}</span>
            </button>

            <button
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#E4E4E7',
                padding: '8px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Share Link"
            >
              {copied ? <Check size={14} color="#10B981" /> : <Share2 size={14} />}
              {copied ? 'COPIED' : 'SHARE'}
            </button>

            <button
              onClick={onBackToCinema}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--brand-red)',
                border: 'none',
                color: '#FFFFFF',
                padding: '8px 18px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(229, 9, 20, 0.4)'
              }}
            >
              <ArrowLeft size={15} />
              BACK TO CINEMA
            </button>
          </div>
        </div>
      </header>

      {/* 2. MINIMALIST SEGMENTED CONTROL BAR */}
      <section
        style={{
          padding: '14px 0',
          backgroundColor: '#0E0E12',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            {/* View Mode Tabs */}
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '4px',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <button
                onClick={() => setViewMode('all')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: viewMode === 'all' ? 'var(--brand-red)' : 'transparent',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                ALL RELEASES
              </button>

              <button
                onClick={() => setViewMode('signature')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: viewMode === 'signature' ? 'var(--brand-red)' : 'transparent',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                THE 3 SIGNATURE SONGS
              </button>

              <button
                onClick={() => setViewMode('genres')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: viewMode === 'genres' ? 'var(--brand-red)' : 'transparent',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                4-GENRE VAULT (20 TRACKS)
              </button>
            </div>

            {/* Quality Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                  backgroundColor: 'rgba(29, 185, 84, 0.12)',
                  color: '#1DB954',
                  border: '1px solid rgba(29, 185, 84, 0.3)',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontWeight: 700
                }}
              >
                ● 24-BIT / 48KHZ STEREO PCM
              </span>
              <span style={{ fontSize: '0.7rem', color: '#71717A', fontFamily: 'monospace' }}>
                HTML5 LOSSLESS STREAM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MNC-LEVEL MINIMAL HERO SHOWCASE */}
      <section
        style={{
          padding: '36px 0 32px 0',
          backgroundColor: '#0B0B0E',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          position: 'relative'
        }}
        aria-label="Now Playing Showcase"
      >
        <div className="container">
          <div
            style={{
              backgroundColor: '#121216',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: 'clamp(24px, 3.5vw, 40px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              alignItems: 'center',
              gap: 'clamp(24px, 4vw, 48px)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Left: Circle Shape Turntable Vinyl Showcase (Rotating Disc) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', gap: '16px' }}>
              {/* Concentric Turntable Bezel & Rotating Disc */}
              <div
                style={{
                  position: 'relative',
                  width: 'clamp(240px, 28vw, 310px)',
                  aspectRatio: '1/1',
                  borderRadius: '50%',
                  backgroundColor: '#0D0F15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.95), inset 0 2px 6px rgba(255, 255, 255, 0.08), 0 0 0 10px #131620, 0 0 0 18px #090A0E, 0 0 35px rgba(229, 9, 20, 0.22)',
                  transition: 'transform 0.3s ease'
                }}
              >
                {/* Inner Rotating Disc (Perfect Circle) */}
                <div
                  style={{
                    position: 'relative',
                    width: '85%',
                    height: '85%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 0 16px rgba(0,0,0,0.85), 0 4px 14px rgba(0,0,0,0.6)'
                  }}
                >
                  <img
                    src={currentSong?.cover}
                    alt={currentSong?.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      display: 'block'
                    }}
                    className={isPlaying ? 'spinning-disc' : 'spinning-disc paused'}
                  />
                </div>

                {/* Center Turntable Spindle Hub & Dot */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #3A3D48 0%, #101218 75%)',
                    border: '3px solid #090A0E',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.9)',
                    zIndex: 2,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--brand-red)',
                      boxShadow: '0 0 6px var(--brand-red)'
                    }}
                  />
                </div>

                {/* Tactile Circle Play/Pause Button Overlay */}
                <button
                  onClick={() => handlePlayToggle(currentSong)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(229, 9, 20, 0.92)',
                    border: '2px solid rgba(255, 255, 255, 0.9)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 28px rgba(229, 9, 20, 0.65), 0 0 0 4px rgba(0,0,0,0.4)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 4
                  }}
                  className="pulse-play-btn"
                  aria-label={isPlaying ? `Pause ${currentSong?.title}` : `Play ${currentSong?.title}`}
                >
                  {isBuffering ? (
                    <span className="sound-bar" style={{ height: '18px', width: '3px', backgroundColor: '#FFF' }} />
                  ) : isPlaying ? (
                    <Pause size={28} fill="#FFFFFF" />
                  ) : (
                    <Play size={28} fill="#FFFFFF" style={{ marginLeft: '4px' }} />
                  )}
                </button>
              </div>

              {/* Bottom Turntable Status Tag */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  backgroundColor: 'rgba(9, 9, 11, 0.9)',
                  backdropFilter: 'blur(10px)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)'
                }}
              >
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: isPlaying ? 'var(--brand-red)' : '#A1A1AA',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span className="sound-bar" style={{ height: '12px', backgroundColor: 'var(--brand-red)' }} />
                  <span className="sound-bar" style={{ height: '16px', backgroundColor: 'var(--brand-red)' }} />
                  <span className="sound-bar" style={{ height: '10px', backgroundColor: 'var(--brand-red)' }} />
                  {isPlaying ? 'STREAMING NOW' : 'READY TO PLAY'}
                </span>
                <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#71717A' }}>
                  {formatTime(currentTime)} / {currentSong?.duration}
                </span>
              </div>
            </div>

            {/* Right: Clean Metadata & Synced Lyrics Live Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Category & Format Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    backgroundColor: 'rgba(229, 9, 20, 0.12)',
                    color: 'var(--brand-red)',
                    border: '1px solid rgba(229, 9, 20, 0.35)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.72rem',
                    fontFamily: 'monospace',
                    fontWeight: 700
                  }}
                >
                  {currentSong?.genre} • {currentSong?.year}
                </span>

                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    color: '#A1A1AA',
                    fontSize: '0.72rem',
                    fontFamily: 'monospace',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  FLAGSHIP MASTER
                </span>
              </div>

              {/* Title & Tamil Subtitle */}
              <div>
                <h1
                  style={{
                    fontFamily: 'var(--font-headline)',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 900,
                    margin: '0 0 4px 0',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF'
                  }}
                >
                  {currentSong?.title}
                </h1>
                {currentSong?.tamilTitle && (
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-red)', marginBottom: '4px' }}>
                    {currentSong?.tamilTitle}
                  </div>
                )}
                <p style={{ fontSize: '0.86rem', color: '#A1A1AA', margin: 0, fontWeight: 500 }}>
                  Composed, Written &amp; Produced by <strong style={{ color: '#FFFFFF' }}>Mani</strong> (MC Squad)
                </p>
              </div>

              {/* Live Synced Lyric Teaser Box (Timeline Feedback) */}
              <div
                style={{
                  backgroundColor: 'rgba(9, 9, 11, 0.7)',
                  borderLeft: '3px solid var(--brand-red)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  padding: '12px 18px',
                  borderRadius: '0 8px 8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowLyrics(true)}
                title="Click to open Synced Lyrics Timeline"
              >
                <div>
                  <span style={{ fontSize: '0.66rem', fontFamily: 'monospace', color: 'var(--brand-red)', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                    LIVE TIMELINE LYRIC // CLICK TO EXPAND
                  </span>
                  <p style={{ fontSize: '0.92rem', color: '#FFFFFF', margin: 0, fontWeight: 600, fontStyle: 'italic', lineHeight: 1.4 }}>
                    {syncedLyrics[activeLyricIndex]?.text || currentSong?.lyrics}
                  </p>
                </div>
                <ChevronRight size={18} color="#A1A1AA" />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                <button
                  onClick={() => handlePlayToggle(currentSong)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--brand-red)',
                    border: 'none',
                    color: '#FFFFFF',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    boxShadow: '0 4px 18px rgba(229, 9, 20, 0.4)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isPlaying ? <Pause size={16} fill="#FFFFFF" /> : <Play size={16} fill="#FFFFFF" />}
                  {isPlaying ? 'PAUSE MASTER' : `STREAM MASTER (${currentSong?.duration})`}
                </button>

                <button
                  onClick={() => setShowLyrics(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    padding: '12px 20px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Mic2 size={16} color="var(--brand-red)" />
                  <span>VIEW TIMELINE LYRICS</span>
                </button>

                <a
                  href={currentSong?.instagramUrl || "https://www.instagram.com/mc_squad_offical/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(225, 48, 108, 0.12)',
                    border: '1px solid rgba(225, 48, 108, 0.3)',
                    color: '#E1306C',
                    padding: '12px 18px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                  title="Official Instagram @mc_squad_offical"
                >
                  <InstagramIcon size={16} />
                  <span>@MC_SQUAD_OFFICAL</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 1: THE 3 SIGNATURE MASTER SONGS */}
      {(viewMode === 'all' || viewMode === 'signature') && (
        <section
          style={{
            padding: '36px 0',
            backgroundColor: '#09090B',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          <div className="container">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--brand-red)',
                    fontSize: '0.7rem',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    marginBottom: '6px'
                  }}
                >
                  <Disc size={12} />
                  FLAGSHIP SPOTLIGHT // 3 MASTER RELEASES
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-headline)',
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    fontWeight: 800,
                    margin: 0
                  }}
                >
                  THE 3 SIGNATURE SONGS
                </h2>
                <p style={{ color: '#71717A', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
                  The three cornerstone pillars composed, written, and engineered by Mani.
                </p>
              </div>

              <span style={{ fontSize: '0.74rem', color: '#71717A', fontFamily: 'monospace' }}>
                CLICK TO STREAM INSTANTLY
              </span>
            </div>

            {/* 3 High-End Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}
            >
              {headlineTracks.map((song, idx) => {
                const isCur = currentSong?.id === song.id;
                const isCurPlaying = isCur && isPlaying;
                const isLiked = likedSongIds.has(song.id);

                return (
                  <div
                    key={song.id}
                    style={{
                      backgroundColor: '#121216',
                      border: isCur ? '1.5px solid var(--brand-red)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: isCur ? '0 12px 36px rgba(229, 9, 20, 0.25)' : 'none',
                      transition: 'all 0.25s ease',
                      position: 'relative'
                    }}
                    className="signature-card-clean"
                  >
                    {/* Artwork Container */}
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#09090B' }}>
                      <img
                        src={song.cover}
                        alt={song.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />

                      {/* Top Badges */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          right: '12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          pointerEvents: 'none'
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: 'rgba(9, 9, 11, 0.85)',
                            backdropFilter: 'blur(8px)',
                            color: '#FFFFFF',
                            fontSize: '0.68rem',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            padding: '4px 10px',
                            borderRadius: '4px',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                          }}
                        >
                          #{idx + 1} • {song.genre}
                        </span>

                        <span
                          style={{
                            backgroundColor: 'rgba(229, 9, 20, 0.15)',
                            color: 'var(--brand-red)',
                            border: '1px solid rgba(229, 9, 20, 0.35)',
                            fontSize: '0.66rem',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            padding: '4px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          MASTER TRACK
                        </span>
                      </div>

                      {/* Center Play Button Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(9, 9, 11, 0.45)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: isCur ? 1 : 0.88,
                          transition: 'opacity 0.2s ease'
                        }}
                      >
                        <button
                          onClick={() => handlePlayToggle(song)}
                          style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--brand-red)',
                            border: 'none',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 6px 24px rgba(229, 9, 20, 0.5)',
                            transition: 'transform 0.2s ease'
                          }}
                          className="pulse-play-btn"
                          aria-label={isCurPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
                        >
                          {isCurPlaying ? (
                            <Pause size={28} fill="#FFFFFF" />
                          ) : (
                            <Play size={28} fill="#FFFFFF" style={{ marginLeft: '4px' }} />
                          )}
                        </button>
                      </div>

                      {/* Playing Equalizer */}
                      {isCurPlaying && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '12px',
                            left: '12px',
                            backgroundColor: 'rgba(9, 9, 11, 0.92)',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            border: '1px solid rgba(229, 9, 20, 0.4)'
                          }}
                        >
                          <span className="sound-bar" style={{ height: '14px', backgroundColor: 'var(--brand-red)' }} />
                          <span className="sound-bar" style={{ height: '18px', backgroundColor: 'var(--brand-red)' }} />
                          <span className="sound-bar" style={{ height: '10px', backgroundColor: 'var(--brand-red)' }} />
                          <span style={{ fontSize: '0.68rem', color: 'var(--brand-red)', fontWeight: 700, fontFamily: 'monospace' }}>
                            NOW STREAMING
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <div>
                          <h3
                            style={{
                              fontFamily: 'var(--font-headline)',
                              fontSize: '1.25rem',
                              fontWeight: 800,
                              color: '#FFFFFF',
                              margin: 0
                            }}
                          >
                            {song.title}
                          </h3>
                          {song.tamilTitle && (
                            <span style={{ fontSize: '0.8rem', color: 'var(--brand-red)', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                              {song.tamilTitle}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#71717A', fontFamily: 'monospace', fontWeight: 600 }}>
                          {song.duration}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.82rem', color: '#A1A1AA', margin: '4px 0 10px 0' }}>
                        {song.artist}
                      </p>

                      <p style={{ fontSize: '0.82rem', color: '#71717A', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                        {song.tagline}
                      </p>

                      {/* Lyric Line Preview */}
                      <div
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          color: '#A1A1AA',
                          fontStyle: 'italic',
                          lineHeight: 1.45,
                          marginBottom: '18px',
                          flexGrow: 1
                        }}
                      >
                        "{song.lyrics}"
                      </div>

                      {/* Card Action Row */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                          paddingTop: '14px',
                          marginTop: 'auto'
                        }}
                      >
                        <button
                          onClick={() => handlePlayToggle(song)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            backgroundColor: isCur ? 'var(--brand-red)' : 'rgba(255, 255, 255, 0.06)',
                            color: '#FFFFFF',
                            border: isCur ? '1px solid var(--brand-red)' : '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '7px 16px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {isCurPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
                          {isCurPlaying ? 'PAUSE' : 'STREAM'}
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => toggleLike(song.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: isLiked ? 'var(--brand-red)' : '#71717A',
                              cursor: 'pointer',
                              padding: '4px'
                            }}
                            title={isLiked ? 'Unlike' : 'Like'}
                          >
                            <Heart size={18} fill={isLiked ? 'var(--brand-red)' : 'none'} />
                          </button>

                          <a
                            href={song.instagramUrl || "https://www.instagram.com/mc_squad_offical/"}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#D4D4D8',
                              padding: '6px 10px',
                              borderRadius: '4px',
                              backgroundColor: 'rgba(255, 255, 255, 0.04)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              textDecoration: 'none'
                            }}
                            title="Instagram @mc_squad_offical"
                          >
                            <InstagramIcon size={14} />
                            <span>INSTA</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. SECTION 2: 4-GENRE VAULT & ALL 20 TRACKS */}
      {(viewMode === 'all' || viewMode === 'genres') && (
        <section style={{ padding: '36px 0 60px 0', flexGrow: 1 }}>
          <div className="container">
            {/* Header & Genre Filter Bar */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--brand-red)',
                      fontSize: '0.7rem',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      marginBottom: '6px'
                    }}
                  >
                    <Music size={12} />
                    4 GENRE PILLARS // 5 TRACKS EACH
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-headline)',
                      fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                      fontWeight: 800,
                      margin: 0
                    }}
                  >
                    STUDIO GENRE VAULT (20 TRACKS)
                  </h2>
                </div>

                <span style={{ fontSize: '0.76rem', color: '#71717A', fontFamily: 'monospace' }}>
                  SHOWING {filteredSongs.length} TRACKS
                </span>
              </div>

              {/* Genre Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button
                  onClick={() => setActiveCategory('ALL')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    border: activeCategory === 'ALL' ? '1px solid var(--brand-red)' : '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: activeCategory === 'ALL' ? 'var(--brand-red)' : 'rgba(255,255,255,0.05)',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ALL (20 TRACKS)
                </button>

                <button
                  onClick={() => setActiveCategory('LOVE')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    border: activeCategory === 'LOVE' ? '1px solid var(--brand-red)' : '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: activeCategory === 'LOVE' ? 'var(--brand-red)' : 'rgba(255,255,255,0.05)',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  LOVE &amp; ROMANCE (5)
                </button>

                <button
                  onClick={() => setActiveCategory('FAMILY')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    border: activeCategory === 'FAMILY' ? '1px solid var(--brand-red)' : '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: activeCategory === 'FAMILY' ? 'var(--brand-red)' : 'rgba(255,255,255,0.05)',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  FAMILY &amp; LULLABY (5)
                </button>

                <button
                  onClick={() => setActiveCategory('HIPHOP')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    border: activeCategory === 'HIPHOP' ? '1px solid var(--brand-red)' : '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: activeCategory === 'HIPHOP' ? 'var(--brand-red)' : 'rgba(255,255,255,0.05)',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  HIP-HOP &amp; MOTIVATION (5)
                </button>

                <button
                  onClick={() => setActiveCategory('HORROR')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    border: activeCategory === 'HORROR' ? '1px solid var(--brand-red)' : '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: activeCategory === 'HORROR' ? 'var(--brand-red)' : 'rgba(255,255,255,0.05)',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  HORROR &amp; SUSPENSE (5)
                </button>
              </div>
            </div>

            {/* Spotify-Level Table */}
            <div
              style={{
                backgroundColor: '#121216',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              {/* Table Header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr 180px 100px 120px 48px',
                  padding: '12px 20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.72rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: '#71717A',
                  letterSpacing: '0.08em'
                }}
                className="spotify-table-header"
              >
                <span>#</span>
                <span>TITLE &amp; ARTIST</span>
                <span className="hide-on-mobile">GENRE</span>
                <span style={{ textAlign: 'right' }}><Clock size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> TIME</span>
                <span style={{ textAlign: 'center' }} className="hide-on-mobile">STREAM</span>
                <span style={{ textAlign: 'center' }}>LIKE</span>
              </div>

              {/* Rows */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {filteredSongs.map((song, idx) => {
                  const isCur = currentSong?.id === song.id;
                  const isCurPlaying = isCur && isPlaying;
                  const isLiked = likedSongIds.has(song.id);

                  return (
                    <div
                      key={song.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '48px 1fr 180px 100px 120px 48px',
                        padding: '12px 20px',
                        alignItems: 'center',
                        backgroundColor: isCur ? 'rgba(229, 9, 20, 0.12)' : 'transparent',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        transition: 'background-color 0.15s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => handlePlayToggle(song)}
                      className="spotify-table-row"
                    >
                      {/* # Index or Live Equalizer */}
                      <div style={{ fontSize: '0.84rem', color: isCur ? 'var(--brand-red)' : '#71717A', fontWeight: 700 }}>
                        {isCurPlaying ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <span className="sound-bar" style={{ height: '14px', backgroundColor: 'var(--brand-red)' }} />
                            <span className="sound-bar" style={{ height: '18px', backgroundColor: 'var(--brand-red)' }} />
                            <span className="sound-bar" style={{ height: '11px', backgroundColor: 'var(--brand-red)' }} />
                          </div>
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      {/* Title & Artist & Thumbnail */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            flexShrink: 0
                          }}
                        >
                          <img
                            src={song.cover}
                            alt={song.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>

                        <div style={{ overflow: 'hidden' }}>
                          <span
                            style={{
                              fontSize: '0.92rem',
                              fontWeight: 700,
                              color: isCur ? 'var(--brand-red)' : '#FFFFFF',
                              display: 'block',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {song.title}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#71717A' }}>
                            {song.artist}
                          </span>
                        </div>
                      </div>

                      {/* Genre */}
                      <div className="hide-on-mobile">
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontFamily: 'monospace',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: '#A1A1AA',
                            padding: '3px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          {song.genre}
                        </span>
                      </div>

                      {/* Duration */}
                      <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#A1A1AA', fontFamily: 'monospace' }}>
                        {song.duration}
                      </div>

                      {/* Stream external links */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        className="hide-on-mobile"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          href={song.instagramUrl || "https://www.instagram.com/mc_squad_offical/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#D4D4D8',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            textDecoration: 'none'
                          }}
                          title="Official Instagram @mc_squad_offical"
                        >
                          <InstagramIcon size={14} />
                          <span>INSTA</span>
                        </a>
                      </div>

                      {/* Like Heart */}
                      <div
                        style={{ textAlign: 'center' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(song.id);
                        }}
                      >
                        <button
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: isLiked ? 'var(--brand-red)' : '#71717A',
                            padding: '4px'
                          }}
                          title={isLiked ? 'Liked' : 'Like'}
                        >
                          <Heart size={16} fill={isLiked ? 'var(--brand-red)' : 'none'} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. SPOTIFY LIVE SYNCED LYRICS DRAWER / CANVAS (MNC-LEVEL PREMIUM) */}
      {showLyrics && (
        <aside
          className="spotify-lyrics-drawer-responsive"
          style={{
            position: 'fixed',
            top: '70px',
            right: '24px',
            bottom: '100px',
            width: 'clamp(320px, 35vw, 480px)',
            backgroundColor: 'rgba(14, 14, 18, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(229, 9, 20, 0.15)',
            zIndex: 80,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
          aria-label="Spotify Synced Lyrics Canvas"
        >
          {/* Lyrics Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#09090B'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(229, 9, 20, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Mic2 size={16} color="var(--brand-red)" />
              </div>
              <div>
                <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#FFFFFF', display: 'block' }}>
                  {currentSong?.title}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#A1A1AA', fontFamily: 'monospace' }}>
                  {currentSong?.tamilTitle || currentSong?.artist}
                </span>
              </div>
            </div>

            {/* View Mode Toggle: Synced vs Full Text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '16px',
                  padding: '2px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <button
                  onClick={() => setLyricsTab('synced')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: lyricsTab === 'synced' ? 'var(--brand-red)' : 'transparent',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  SYNCED
                </button>
                <button
                  onClick={() => setLyricsTab('full')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: lyricsTab === 'full' ? 'var(--brand-red)' : 'transparent',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  FULL TEXT
                </button>
              </div>

              <button
                onClick={handleCopyLyrics}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: lyricsCopied ? '#10B981' : '#A1A1AA',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                title={lyricsCopied ? 'Lyrics copied!' : 'Copy full lyrics'}
              >
                {lyricsCopied ? <Check size={14} /> : <Copy size={14} />}
              </button>

              <button
                onClick={() => setShowLyrics(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#A1A1AA',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                title="Close Lyrics"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Lyrics Content Area */}
          <div
            style={{
              padding: '24px 20px',
              overflowY: 'auto',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {lyricsTab === 'synced' && syncedLyrics.length > 0 ? (
              // Spotify-Level Synced Timeline with Click-to-Seek
              syncedLyrics.map((line, idx) => {
                const isActive = idx === activeLyricIndex;
                const isPast = idx < activeLyricIndex;

                return (
                  <div
                    key={idx}
                    ref={isActive ? activeLyricRef : null}
                    onClick={() => handleLyricLineClick(line.time)}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: isActive ? 'rgba(229, 9, 20, 0.16)' : 'transparent',
                      borderLeft: isActive ? '3px solid var(--brand-red)' : '3px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    className="synced-lyric-item"
                    title={`Click to jump to ${formatTime(line.time)}`}
                  >
                    {/* Timestamp */}
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'monospace',
                        color: isActive ? 'var(--brand-red)' : '#52525B',
                        fontWeight: 700,
                        minWidth: '42px',
                        flexShrink: 0
                      }}
                    >
                      {formatTime(line.time)}
                    </span>

                    {/* Verse Line Text */}
                    <span
                      style={{
                        fontSize: isActive ? '1.18rem' : '0.98rem',
                        fontWeight: isActive ? 800 : 500,
                        color: isActive ? '#FFFFFF' : isPast ? '#A1A1AA' : '#71717A',
                        lineHeight: 1.5,
                        transition: 'all 0.2s ease',
                        fontFamily: 'var(--font-headline, sans-serif)'
                      }}
                    >
                      {line.text}
                    </span>
                  </div>
                );
              })
            ) : (
              // Full Text Document View
              <div>
                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: '#E4E4E7',
                    whiteSpace: 'pre-line',
                    margin: 0
                  }}
                >
                  {currentSong?.fullLyrics || currentSong?.lyrics}
                </p>
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <p style={{ fontSize: '0.82rem', color: '#71717A', lineHeight: 1.5, margin: 0 }}>
                    {currentSong?.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Lyrics Footer */}
          <div
            style={{
              padding: '12px 20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.72rem',
              color: '#71717A',
              fontFamily: 'monospace',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#09090B'
            }}
          >
            <span>LYRICS BY MC SQUAD • PRODUCED BY MANI</span>
            <span>{formatTime(currentTime)} / {currentSong?.duration}</span>
          </div>
        </aside>
      )}

      {/* 7. SPOTIFY QUEUE DRAWER */}
      {showQueue && (
        <aside
          style={{
            position: 'fixed',
            top: '70px',
            right: '24px',
            bottom: '100px',
            width: 'clamp(320px, 32vw, 440px)',
            backgroundColor: 'rgba(14, 14, 18, 0.96)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
            zIndex: 60,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
          aria-label="Playlist Queue"
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#09090B'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ListMusic size={16} color="var(--brand-red)" />
              <span style={{ fontSize: '0.84rem', fontWeight: 800, fontFamily: 'monospace', color: '#FFF' }}>
                PLAYLIST QUEUE ({musicData.length} TRACKS)
              </span>
            </div>
            <button
              onClick={() => setShowQueue(false)}
              style={{ background: 'none', border: 'none', color: '#A1A1AA', cursor: 'pointer', padding: 0 }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ padding: '12px', overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {musicData.map((track, idx) => {
              const isCur = currentSong?.id === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handlePlayToggle(track)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: isCur ? 'rgba(229, 9, 20, 0.14)' : 'transparent',
                    border: isCur ? '1px solid rgba(229, 9, 20, 0.35)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  className="queue-item-row"
                >
                  <span style={{ fontSize: '0.76rem', color: isCur ? 'var(--brand-red)' : '#71717A', width: '20px', fontFamily: 'monospace', fontWeight: 700 }}>
                    {idx + 1}
                  </span>
                  <img
                    src={track.cover}
                    alt=""
                    style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }}
                  />
                  <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                    <span style={{ fontSize: '0.84rem', fontWeight: 700, color: isCur ? 'var(--brand-red)' : '#FFF', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {track.title}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#71717A' }}>
                      {track.genre}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#71717A', fontFamily: 'monospace' }}>
                    {track.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </aside>
      )}

      {/* 8. FIXED SPOTIFY CONTROLLER DOCK (CIRCLE SHAPE TACTILE PLAYER) */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 70,
          backgroundColor: '#0D0E14',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.9)',
          padding: '8px 0 10px 0'
        }}
        aria-label="Spotify Player Dock"
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(12px, 2vw, 32px)'
          }}
        >
          {/* Left: Circle Rotating Thumbnail & Title & Like */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minWidth: '180px',
              maxWidth: '340px',
              cursor: 'pointer'
            }}
            onClick={() => {
              if (window.innerWidth <= 768) {
                setShowMobileFullPlayer(true);
              }
            }}
          >
            {/* Circle Rotating Vinyl Disc Thumbnail */}
            <div
              style={{
                position: 'relative',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                backgroundColor: '#090A0E',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.7), inset 0 1px 3px rgba(255,255,255,0.1), 0 0 0 4px #141620',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <img
                src={currentSong?.cover || '/music/ni-eenaku-cover.png'}
                alt={currentSong?.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  display: 'block'
                }}
                className={isPlaying ? 'spinning-disc' : 'spinning-disc paused'}
              />

              {/* Tiny Center Spindle Hole */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#0D0E14',
                  border: '1.5px solid var(--brand-red)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              />
            </div>

            {/* Song Meta (Tap to expand full player on mobile) */}
            <div style={{ overflow: 'hidden', flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {currentSong?.title}
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.74rem',
                  color: '#A1A1AA',
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {currentSong?.tamilTitle || currentSong?.artist}
              </span>
            </div>

            {/* Heart Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(currentSong?.id);
              }}
              className="tactile-circle-btn"
              style={{
                width: '36px',
                height: '36px',
                color: likedSongIds.has(currentSong?.id) ? 'var(--brand-red)' : '#71717A',
                flexShrink: 0
              }}
              title={likedSongIds.has(currentSong?.id) ? 'Liked' : 'Like'}
            >
              <Heart
                size={16}
                fill={likedSongIds.has(currentSong?.id) ? 'var(--brand-red)' : 'none'}
              />
            </button>
          </div>

          {/* Center: Tactile Circular Controls & Scrub Bar (Desktop & Tablet) */}
          <div
            className="hide-on-mobile"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              flexGrow: 1,
              maxWidth: '680px'
            }}
          >
            {/* Tactile Circular Buttons Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className="tactile-circle-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  color: isShuffle ? 'var(--brand-red)' : '#71717A'
                }}
                title={isShuffle ? 'Shuffle enabled' : 'Shuffle disabled'}
              >
                <Shuffle size={15} />
              </button>

              <button
                onClick={() => handleSkipTime(-10)}
                className="tactile-circle-btn"
                style={{
                  width: '34px',
                  height: '34px',
                  color: '#A1A1AA'
                }}
                title="Rewind 10 seconds"
              >
                <RotateCcw size={14} />
              </button>

              <button
                onClick={handlePrevTrack}
                className="tactile-circle-btn"
                style={{
                  width: '38px',
                  height: '38px',
                  color: '#FFFFFF'
                }}
                title="Previous Track"
              >
                <SkipBack size={18} />
              </button>

              {/* Main Play/Pause Tactile Circle Button in Brand Red */}
              <button
                onClick={() => handlePlayToggle(currentSong)}
                className="tactile-circle-btn brand-red"
                style={{
                  width: '48px',
                  height: '48px',
                  color: '#FFFFFF'
                }}
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isBuffering ? (
                  <span className="sound-bar" style={{ height: '14px', width: '3px', backgroundColor: '#FFF' }} />
                ) : isPlaying ? (
                  <Pause size={22} fill="#FFFFFF" />
                ) : (
                  <Play size={22} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                )}
              </button>

              <button
                onClick={handleNextTrack}
                className="tactile-circle-btn"
                style={{
                  width: '38px',
                  height: '38px',
                  color: '#FFFFFF'
                }}
                title="Next Track"
              >
                <SkipForward size={18} />
              </button>

              <button
                onClick={() => handleSkipTime(10)}
                className="tactile-circle-btn"
                style={{
                  width: '34px',
                  height: '34px',
                  color: '#A1A1AA'
                }}
                title="Forward 10 seconds"
              >
                <RotateCw size={14} />
              </button>

              <button
                onClick={toggleRepeatMode}
                className="tactile-circle-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  color: repeatMode !== 'off' ? 'var(--brand-red)' : '#71717A'
                }}
                title={`Repeat mode: ${repeatMode}`}
              >
                {repeatMode === 'one' ? <Repeat1 size={15} /> : <Repeat size={15} />}
              </button>
            </div>

            {/* Scrub Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
              <span style={{ fontSize: '0.74rem', color: isPlaying ? '#FFFFFF' : '#71717A', fontFamily: 'monospace', minWidth: '40px', textAlign: 'right', fontWeight: isPlaying ? 700 : 400 }}>
                {formatTime(currentTime)}
              </span>

              <div
                style={{
                  position: 'relative',
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  height: '16px'
                }}
              >
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onMouseDown={handleSeekStart}
                  onTouchStart={handleSeekStart}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekCommit}
                  onTouchEnd={handleSeekCommit}
                  style={{
                    width: '100%',
                    height: '4px',
                    accentColor: 'var(--brand-red)',
                    cursor: 'pointer',
                    borderRadius: '2px'
                  }}
                  className="spotify-scrub-input"
                />
              </div>

              <span style={{ fontSize: '0.74rem', color: '#71717A', fontFamily: 'monospace', minWidth: '40px' }}>
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right: Tactile Quick Actions (Desktop) & Mobile Quick Play */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Mobile-Only Quick Play & Lyrics */}
            <div className="mobile-dock-actions" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setShowLyrics(!showLyrics)}
                className="tactile-circle-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  color: showLyrics ? 'var(--brand-red)' : '#A1A1AA'
                }}
                title="Lyrics"
              >
                <Mic2 size={16} />
              </button>

              <button
                onClick={() => handlePlayToggle(currentSong)}
                className="tactile-circle-btn brand-red"
                style={{
                  width: '42px',
                  height: '42px',
                  color: '#FFFFFF'
                }}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isBuffering ? (
                  <span className="sound-bar" style={{ height: '14px', width: '3px', backgroundColor: '#FFF' }} />
                ) : isPlaying ? (
                  <Pause size={18} fill="#FFFFFF" />
                ) : (
                  <Play size={18} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                )}
              </button>
            </div>

            {/* Desktop-Only Tools */}
            <button
              onClick={() => setShowLyrics(!showLyrics)}
              className="tactile-circle-btn hide-on-mobile"
              style={{
                width: '38px',
                height: '38px',
                color: showLyrics ? 'var(--brand-red)' : '#A1A1AA'
              }}
              title="Lyrics View"
            >
              <Mic2 size={17} />
            </button>

            <button
              onClick={() => setShowQueue(!showQueue)}
              className="tactile-circle-btn hide-on-mobile"
              style={{
                width: '38px',
                height: '38px',
                color: showQueue ? 'var(--brand-red)' : '#A1A1AA'
              }}
              title="Queue"
            >
              <ListMusic size={17} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="hide-on-mobile">
              <button
                onClick={toggleMute}
                className="tactile-circle-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  color: isMuted ? 'var(--brand-red)' : '#A1A1AA'
                }}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX size={16} color="var(--brand-red)" />
                ) : volume < 0.5 ? (
                  <Volume1 size={16} />
                ) : (
                  <Volume2 size={16} />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                style={{
                  width: '74px',
                  height: '4px',
                  accentColor: 'var(--brand-red)',
                  cursor: 'pointer'
                }}
                title={`Volume: ${Math.round(volume * 100)}%`}
              />
            </div>

            <button
              onClick={onBackToCinema}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Exit back to MC Squad cinema website"
            >
              <ArrowLeft size={13} />
              <span className="hide-on-mobile">CINEMA</span>
            </button>
          </div>
        </div>
      </footer>

      {/* 9. MOBILE FULL-SCREEN PLAYER MODAL (MATCHING REFERENCE UI) */}
      {showMobileFullPlayer && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 95,
            backgroundColor: '#0C0E14',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px 24px calc(24px + env(safe-area-inset-bottom)) 24px',
            overflowY: 'auto'
          }}
          className="animate-slide-up"
        >
          {/* Top Bar: Collapse, Title, Queue */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '16px'
            }}
          >
            <button
              onClick={() => setShowMobileFullPlayer(false)}
              className="tactile-circle-btn"
              style={{ width: '42px', height: '42px', color: '#FFFFFF' }}
              aria-label="Collapse player"
            >
              <ChevronDown size={22} />
            </button>

            <div style={{ textAlign: 'center' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  fontFamily: 'monospace',
                  color: 'var(--brand-red)',
                  fontWeight: 800,
                  display: 'block'
                }}
              >
                NOW PLAYING
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#A1A1AA' }}>
                MC SQUAD VAULT
              </span>
            </div>

            <button
              onClick={() => {
                setShowMobileFullPlayer(false);
                setShowQueue(true);
              }}
              className="tactile-circle-btn"
              style={{ width: '42px', height: '42px', color: '#A1A1AA' }}
              aria-label="View Queue"
            >
              <ListMusic size={18} />
            </button>
          </div>

          {/* Centerpiece: Massive Turntable Vinyl Circle Disc */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 'auto 0',
              padding: '16px 0'
            }}
          >
            {/* Turntable Outer Concentric Bezel Ring */}
            <div
              style={{
                position: 'relative',
                width: 'min(72vw, 290px)',
                aspectRatio: '1/1',
                borderRadius: '50%',
                backgroundColor: '#0A0C12',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.95), inset 0 2px 6px rgba(255, 255, 255, 0.08), 0 0 0 10px #131622, 0 0 0 18px #08090E, 0 0 35px rgba(229, 9, 20, 0.25)'
              }}
            >
              {/* Inner Circle Album Artwork */}
              <div
                style={{
                  position: 'relative',
                  width: '85%',
                  height: '85%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 0 18px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.7)'
                }}
              >
                <img
                  src={currentSong?.cover}
                  alt={currentSong?.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    display: 'block'
                  }}
                  className={isPlaying ? 'spinning-disc' : 'spinning-disc paused'}
                />
              </div>

              {/* Spindle Hub Center */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #333 0%, #101218 80%)',
                  border: '3px solid #08090E',
                  boxShadow: '0 0 12px rgba(0, 0, 0, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-red)',
                    boxShadow: '0 0 8px var(--brand-red)'
                  }}
                />
              </div>
            </div>

            {/* Song Title & Artist Meta */}
            <div style={{ textAlign: 'center', marginTop: '28px', width: '100%', maxWidth: '340px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'clamp(1.4rem, 5vw, 1.85rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  margin: '0 0 4px 0',
                  lineHeight: 1.2
                }}
              >
                {currentSong?.title}
              </h2>

              {currentSong?.tamilTitle && (
                <div
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--brand-red)',
                    marginBottom: '4px'
                  }}
                >
                  {currentSong?.tamilTitle}
                </div>
              )}

              <p style={{ fontSize: '0.86rem', color: '#A1A1AA', margin: 0, fontWeight: 500 }}>
                Song by {currentSong?.artist}
              </p>
            </div>
          </div>

          {/* Bottom Control Section */}
          <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
            {/* Scrubber Progress Slider */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.78rem', color: '#A1A1AA', fontFamily: 'monospace', fontWeight: 600 }}>
                  {formatTime(currentTime)}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#71717A', fontFamily: 'monospace' }}>
                  {formatTime(duration)}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onMouseDown={handleSeekStart}
                onTouchStart={handleSeekStart}
                onChange={handleSeekChange}
                onMouseUp={handleSeekCommit}
                onTouchEnd={handleSeekCommit}
                style={{
                  width: '100%',
                  height: '6px',
                  accentColor: 'var(--brand-red)',
                  cursor: 'pointer',
                  borderRadius: '3px'
                }}
              />
            </div>

            {/* Tactile Circular Playback Buttons Row (Modeled after Reference) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px'
              }}
            >
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className="tactile-circle-btn"
                style={{
                  width: '44px',
                  height: '44px',
                  color: isShuffle ? 'var(--brand-red)' : '#71717A'
                }}
                aria-label="Shuffle"
              >
                <Shuffle size={18} />
              </button>

              <button
                onClick={handlePrevTrack}
                className="tactile-circle-btn"
                style={{
                  width: '48px',
                  height: '48px',
                  color: '#FFFFFF'
                }}
                aria-label="Previous track"
              >
                <SkipBack size={22} />
              </button>

              {/* Center Big Play/Pause Button */}
              <button
                onClick={() => handlePlayToggle(currentSong)}
                className="tactile-circle-btn brand-red"
                style={{
                  width: '64px',
                  height: '64px',
                  color: '#FFFFFF'
                }}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isBuffering ? (
                  <span className="sound-bar" style={{ height: '18px', width: '3px', backgroundColor: '#FFF' }} />
                ) : isPlaying ? (
                  <Pause size={28} fill="#FFFFFF" />
                ) : (
                  <Play size={28} fill="#FFFFFF" style={{ marginLeft: '3px' }} />
                )}
              </button>

              <button
                onClick={handleNextTrack}
                className="tactile-circle-btn"
                style={{
                  width: '48px',
                  height: '48px',
                  color: '#FFFFFF'
                }}
                aria-label="Next track"
              >
                <SkipForward size={22} />
              </button>

              <button
                onClick={toggleRepeatMode}
                className="tactile-circle-btn"
                style={{
                  width: '44px',
                  height: '44px',
                  color: repeatMode !== 'off' ? 'var(--brand-red)' : '#71717A'
                }}
                aria-label="Repeat mode"
              >
                {repeatMode === 'one' ? <Repeat1 size={18} /> : <Repeat size={18} />}
              </button>
            </div>

            {/* Bottom Auxiliary Actions: Like, Lyrics, Share */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <button
                onClick={() => toggleLike(currentSong?.id)}
                className="tactile-circle-btn"
                style={{
                  width: '42px',
                  height: '42px',
                  color: likedSongIds.has(currentSong?.id) ? 'var(--brand-red)' : '#71717A'
                }}
                aria-label="Like track"
              >
                <Heart size={18} fill={likedSongIds.has(currentSong?.id) ? 'var(--brand-red)' : 'none'} />
              </button>

              <button
                onClick={() => {
                  setShowMobileFullPlayer(false);
                  setShowLyrics(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(229, 9, 20, 0.16)',
                  border: '1px solid var(--brand-red)',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: '24px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Mic2 size={16} color="var(--brand-red)" />
                <span>SYNCED LYRICS</span>
              </button>

              <button
                onClick={handleShare}
                className="tactile-circle-btn"
                style={{ width: '42px', height: '42px', color: copied ? '#10B981' : '#A1A1AA' }}
                aria-label="Share track"
              >
                {copied ? <Check size={18} /> : <Share2 size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Clean Styles & Animations */}
      <style>{`
        .spinning-disc {
          animation: spinDisc 20s linear infinite;
        }
        .spinning-disc.paused {
          animation-play-state: paused;
        }
        @keyframes spinDisc {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .tactile-circle-btn {
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: #14161E;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tactile-circle-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15);
        }
        .tactile-circle-btn:active {
          transform: translateY(1px);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
        }
        .tactile-circle-btn.brand-red {
          background: var(--brand-red);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 6px 20px rgba(229, 9, 20, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.3);
        }
        .tactile-circle-btn.brand-red:hover {
          background: #FF1E2B;
          box-shadow: 0 8px 26px rgba(229, 9, 20, 0.65), inset 0 1px 2px rgba(255, 255, 255, 0.4);
          transform: scale(1.06);
        }
        .signature-card-clean:hover {
          border-color: rgba(229, 9, 20, 0.45) !important;
          transform: translateY(-3px);
        }
        .pulse-play-btn:hover {
          transform: translate(-50%, -50%) scale(1.08) !important;
        }
        .spotify-table-row:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
        .synced-lyric-item:hover {
          background-color: rgba(255, 255, 255, 0.06) !important;
        }
        .synced-lyric-item:hover span {
          color: #FFFFFF !important;
        }
        .queue-item-row:hover {
          background-color: rgba(255, 255, 255, 0.06) !important;
        }
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
          .mobile-dock-actions {
            display: flex !important;
          }
          .spotify-lyrics-drawer-responsive {
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 64px !important;
            width: 100% !important;
            border-radius: 0 !important;
          }
          .spotify-table-header,
          .spotify-table-row {
            grid-template-columns: 36px 1fr 60px 36px !important;
          }
        }
      `}</style>
    </div>
  );
}
