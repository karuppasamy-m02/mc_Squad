import React from 'react';
import { Play, Pause } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function MusicCard({ song, isPlaying, isCurrentSong, onPlayToggle }) {
  const isHeadline = song.isHeadline;

  return (
    <div
      className="cinematic-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px',
        backgroundColor: '#121216',
        border: isCurrentSong ? '1px solid var(--brand-red)' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isCurrentSong ? '0 0 24px rgba(229, 9, 20, 0.3)' : 'none',
        overflow: 'hidden',
        transition: 'all 0.25s ease'
      }}
    >
      {/* Cover Image Container */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#09090B' }}>
        <img
          src={song.cover}
          alt={`${song.title} cover art`}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="music-cover-img"
        />

        {/* Hover Overlay Play Button */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(9, 9, 11, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isCurrentSong ? 1 : 0,
            transition: 'opacity 0.25s ease'
          }}
          className="cover-play-overlay"
        >
          <button
            onClick={() => onPlayToggle(song)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--brand-red)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 24px rgba(229, 9, 20, 0.5)',
              transform: 'scale(1)',
              transition: 'transform 0.2s ease'
            }}
            aria-label={isCurrentSong && isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
          >
            {isCurrentSong && isPlaying ? (
              <Pause size={26} fill="#FFFFFF" />
            ) : (
              <Play size={26} fill="#FFFFFF" style={{ marginLeft: '3px' }} />
            )}
          </button>
        </div>

        {/* Genre & Year Pills */}
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
              backdropFilter: 'blur(10px)',
              border: isHeadline ? '1px solid rgba(229, 9, 20, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
              color: isHeadline ? '#FF4D58' : '#F5F5F5',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '2px'
            }}
          >
            {isHeadline ? `FLAGSHIP • ${song.genre}` : song.genre}
          </span>

          <span
            style={{
              backgroundColor: 'rgba(9, 9, 11, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-muted)',
              fontSize: '0.7rem',
              fontWeight: 600,
              padding: '4px 8px',
              borderRadius: '2px'
            }}
          >
            {song.year}
          </span>
        </div>

        {/* Currently Playing Sound Waves Indicator */}
        {isCurrentSong && isPlaying && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              backgroundColor: 'rgba(9, 9, 11, 0.92)',
              padding: '4px 10px',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid rgba(229, 9, 20, 0.4)'
            }}
          >
            <div className="sound-bars">
              <span className="sound-bar" style={{ backgroundColor: 'var(--brand-red)' }} />
              <span className="sound-bar" style={{ backgroundColor: 'var(--brand-red)' }} />
              <span className="sound-bar" style={{ backgroundColor: 'var(--brand-red)' }} />
              <span className="sound-bar" style={{ backgroundColor: 'var(--brand-red)' }} />
            </div>
            <span style={{ fontSize: '0.68rem', color: 'var(--brand-red)', fontWeight: 700, letterSpacing: '0.1em' }}>
              PLAYING
            </span>
          </div>
        )}
      </div>

      {/* Card Info Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.02em',
                lineHeight: 1.3,
                margin: 0
              }}
            >
              {song.title}
            </h3>
            {song.tamilTitle && (
              <span style={{ fontSize: '0.74rem', color: 'var(--brand-red)', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                {song.tamilTitle}
              </span>
            )}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            {song.duration}
          </span>
        </div>

        <p style={{ fontSize: '0.84rem', color: '#9CA3AF', fontWeight: 600, margin: '6px 0 10px 0' }}>
          {song.artist}
        </p>

        <p style={{ fontSize: '0.82rem', color: '#71717A', lineHeight: 1.5, marginBottom: '18px', flexGrow: 1 }}>
          {song.tagline}
        </p>

        {/* Bottom Actions Row */}
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
          {/* Quick Play Trigger Button */}
          <button
            onClick={() => onPlayToggle(song)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: isCurrentSong ? 'var(--brand-red)' : 'rgba(255, 255, 255, 0.06)',
              border: isCurrentSong ? '1px solid var(--brand-red)' : '1px solid rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '6px 14px',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label={isCurrentSong && isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
          >
            {isCurrentSong && isPlaying ? (
              <>
                <Pause size={14} /> PAUSE
              </>
            ) : (
              <>
                <Play size={14} /> PLAY
              </>
            )}
          </button>

          {/* Official Instagram Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href={song.instagramUrl || "https://www.instagram.com/mc_squad_offical/"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#D4D4D8',
                fontSize: '0.74rem',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }}
              title="Official Instagram @mc_squad_offical"
              aria-label={`View ${song.title} on Instagram`}
              className="platform-btn"
            >
              <InstagramIcon size={14} />
              <span>INSTAGRAM</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .cinematic-card:hover {
          border-color: rgba(229, 9, 20, 0.5) !important;
          transform: translateY(-2px);
        }
        .cinematic-card:hover .cover-play-overlay {
          opacity: 1 !important;
        }
        .cinematic-card:hover .music-cover-img {
          transform: scale(1.05);
        }
        .platform-btn:hover {
          color: #FFFFFF !important;
          border-color: var(--brand-red) !important;
          background-color: rgba(229, 9, 20, 0.15) !important;
        }
      `}</style>
    </div>
  );
}
