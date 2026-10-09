import React, { useState, useEffect } from 'react';
import { Play, ArrowDown, Film, Clapperboard, Aperture, Radio, Sliders, Users, Music, Sparkles } from 'lucide-react';

export default function Hero({ onOpenMusicWeb, onListenNow, onReplayIntro }) {
  const [activeLens, setActiveLens] = useState('35mm');
  const [timecode, setTimecode] = useState('01:24:08:12');

  // Real-time 24 FPS Timecode Counter
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const frames = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`01:${mins}:${secs}:${frames}`);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const lensPresets = [
    { id: '24mm', name: '24MM', spec: 'T1.8 ULTRA-WIDE', scale: 1 },
    { id: '35mm', name: '35MM', spec: 'T1.5 ANAMORPHIC', scale: 1.08 },
    { id: '50mm', name: '50MM', spec: 'T1.3 MASTER PRIME', scale: 1.18 },
    { id: '85mm', name: '85MM', spec: 'T1.4 PORTRAIT', scale: 1.28 }
  ];

  const currentPreset = lensPresets.find((l) => l.id === activeLens) || lensPresets[1];

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#080808'
      }}
      aria-label="MC Squad Cinema Introduction"
    >
      {/* Background: Atmospheric Cinema Set */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/posters/poster-02.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          animation: 'heroSlowZoom 24s ease-in-out infinite alternate',
          transformOrigin: 'center center',
          filter: 'brightness(0.36) contrast(1.2)',
          zIndex: 1
        }}
      />

      {/* Cinematic Vignette & Deep Obsidian Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to bottom, rgba(8, 8, 8, 0.85) 0%, rgba(8, 8, 8, 0.45) 45%, rgba(8, 8, 8, 0.95) 85%, #080808 100%),
            radial-gradient(circle at 75% 40%, rgba(229, 9, 20, 0.16) 0%, transparent 60%),
            radial-gradient(circle at 20% 70%, rgba(0, 0, 0, 0.88) 0%, transparent 70%)
          `,
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* Anamorphic 2.39:1 Cinema Letterbox Edge Bars */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '24px',
          background: '#000000',
          zIndex: 4,
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '24px',
          background: '#000000',
          zIndex: 4,
          borderTop: '1px solid rgba(255,255,255,0.06)'
        }}
      />

      {/* Hero Content Container */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '120px',
          paddingBottom: '90px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          alignItems: 'center',
          gap: 'clamp(32px, 5vw, 64px)'
        }}
      >
        {/* Left Column: Headlines & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
          {/* Film Slate Badge (Clickable to Replay Cinema Screen Intro) */}
          {/* Top Pill Badges: Award + Scene Status */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
            <a
              href="#achievements"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.5)',
                backdropFilter: 'blur(8px)',
                borderRadius: '20px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.15)',
                transition: 'all 0.2s ease'
              }}
              title="Click to view 2026 Best Storytelling Award details"
            >
              <span style={{ fontSize: '0.85rem' }}>🏆</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: '#FCD34D',
                  textTransform: 'uppercase',
                  fontFamily: 'monospace'
                }}
              >
                2026 WINNER • BEST STORYTELLING AWARD
              </span>
            </a>

            <div
              onClick={onReplayIntro}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(17, 17, 17, 0.9)',
                border: '1px solid rgba(229, 9, 20, 0.45)',
                backdropFilter: 'blur(8px)',
                borderRadius: '20px',
                cursor: onReplayIntro ? 'pointer' : 'default'
              }}
              title={onReplayIntro ? 'Click to replay Cinema Screen Opening Animation' : undefined}
            >
              <Clapperboard size={14} color="var(--brand-red)" />
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase'
                }}
              >
                SCENE 01 • TAKE 01 • <span style={{ color: 'var(--brand-red)' }}>CINEMA IN PROGRESS</span>
              </span>
            </div>
          </div>

          {/* Prominent, Clean, Non-Glowing Logo */}


          {/* Main Title */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.04em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
              textShadow: '0 8px 30px rgba(0,0,0,0.95)'
            }}
          >
            FILMMAKER <br />
            <span style={{ color: 'var(--brand-red)' }}>&amp; MUSIC CREATOR</span>
          </h1>

          {/* Accent Line */}
          <div
            style={{
              height: '4px',
              width: '120px',
              backgroundColor: 'var(--brand-red)',
              margin: '0 0 20px 0'
            }}
          />

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-headline)',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.55rem)',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#F5F5F5',
              lineHeight: 1.3,
              marginBottom: '12px'
            }}
          >
            UNCOMPROMISING CHARACTER. ORIGINAL CINEMA.
          </p>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
              color: 'var(--text-muted)',
              fontWeight: 400,
              letterSpacing: '0.02em',
              maxWidth: '540px',
              lineHeight: 1.6,
              marginBottom: '32px'
            }}
          >
            Real stories, authentic presence, and raw independent storytelling without gatekeepers. Building an independent movement of character-driven cinema and original music.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '14px',
              width: '100%'
            }}
          >
            <button
              onClick={() => scrollToSection('team')}
              className="btn-primary"
              style={{ minWidth: '150px' }}
              aria-label="Explore Team of MC Squad"
            >
              <Users size={17} />
              TEAM OF MC SQUAD
            </button>

            <button
              onClick={() => scrollToSection('films')}
              className="btn-secondary"
              style={{ minWidth: '140px' }}
              aria-label="View upcoming film slate"
            >
              <Clapperboard size={17} />
              FILM SLATE
            </button>

            <button
              onClick={() => {
                if (onOpenMusicWeb) {
                  onOpenMusicWeb();
                } else if (onListenNow) {
                  onListenNow();
                } else {
                  scrollToSection('music');
                }
              }}
              className="btn-outline-red"
              style={{ minWidth: '140px' }}
              aria-label="Open Full Music Web"
            >
              <Music size={15} color="var(--brand-red)" />
              MUSIC WEB ↗
            </button>

            {/* Prominent High-Impact Join The Crew Action */}
            <button
              onClick={() => scrollToSection('join-team')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 22px',
                backgroundColor: 'rgba(229, 9, 20, 0.16)',
                border: '1.5px solid var(--brand-red)',
                borderRadius: '4px',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 18px rgba(229, 9, 20, 0.35)',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--brand-red)';
                e.currentTarget.style.boxShadow = '0 6px 26px rgba(229, 9, 20, 0.65)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(229, 9, 20, 0.16)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(229, 9, 20, 0.35)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label="Join MC Squad Crew"
            >
              <Sparkles size={16} color="var(--brand-red)" />
              <span>JOIN THE CREW</span>
            </button>
          </div>
        </div>

        {/* Right Column: NEW DESIGN — Interactive Director's 4K Viewfinder & HUD */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          {/* Main Viewfinder Monitor Housing */}
          <div
            style={{
              position: 'relative',
              backgroundColor: '#0B0B0B',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.95)'
            }}
          >
            {/* Clapperboard Slate Top Strip with Diagonal Cine Hash Marks */}
            <div
              style={{
                height: '14px',
                width: '100%',
                backgroundImage: 'repeating-linear-gradient(45deg, #1A1A1A, #1A1A1A 14px, #E50914 14px, #E50914 28px)',
                borderBottom: '1px solid rgba(0,0,0,0.8)'
              }}
            />

            {/* Viewfinder Top Bar: Live REC, Timecode, Battery, FPS */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                backgroundColor: '#121212',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.72rem',
                fontFamily: 'monospace'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pulsing-dot" />
                <span style={{ color: 'var(--brand-red)', fontWeight: 800, letterSpacing: '0.12em' }}>
                  REC
                </span>
                <span style={{ color: '#E0E0E0', fontWeight: 700, marginLeft: '6px' }}>
                  {timecode}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
                <span style={{ color: '#4ade80', fontWeight: 700 }}>4K DCI</span>
                <span>24.000 FPS</span>
                <span>ISO 800</span>
              </div>
            </div>

            {/* Viewfinder Video Display Screen */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '16/9',
                backgroundColor: '#000000',
                overflow: 'hidden'
              }}
            >
              {/* Scaled Scene Background Image based on selected focal length */}
              <img
                src="/posters/poster-06.jpg"
                alt="Cinema Scene Frame"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transform: `scale(${currentPreset.scale})`,
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: 'contrast(1.05)'
                }}
              />

              {/* Anamorphic Scope Guide Lines (2.39:1) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  boxShadow: 'inset 0 10px 0 rgba(0,0,0,0.85), inset 0 -10px 0 rgba(0,0,0,0.85)'
                }}
              />

              {/* Viewfinder 4-Corner Reticles [ + ] */}
              <div
                style={{
                  position: 'absolute',
                  inset: '16px',
                  pointerEvents: 'none',
                  border: '1px dashed rgba(255, 255, 255, 0.2)'
                }}
              >
                {/* Center Target Crosshair */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '20px',
                    height: '20px',
                    border: '1px solid rgba(229, 9, 20, 0.6)',
                    borderRadius: '50%'
                  }}
                />
              </div>

              {/* Live Audio EQ Spectrum Waves Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  right: '16px',
                  backgroundColor: 'rgba(8, 8, 8, 0.75)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 8px',
                  borderRadius: '2px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Radio size={12} color="var(--brand-red)" />
                <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#FFF' }}>AUDIO CH1/2</span>
                <div className="sound-bars" style={{ height: '12px' }}>
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                </div>
              </div>

              {/* Bottom-Left Live Lens Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '16px',
                  backgroundColor: 'rgba(8, 8, 8, 0.75)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 8px',
                  borderRadius: '2px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.65rem',
                  color: '#FFFFFF',
                  fontFamily: 'monospace',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Aperture size={12} color="var(--brand-red)" />
                <span>{currentPreset.spec}</span>
              </div>
            </div>

            {/* Viewfinder Bottom Deck: Interactive Lens Selector & Parameters */}
            <div
              style={{
                padding: '14px 16px',
                backgroundColor: '#101010',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              {/* Lens Selector Pills */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Sliders size={12} color="var(--brand-red)" /> LENS FOCAL LENGTH:
                </span>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {lensPresets.map((lens) => (
                    <button
                      key={lens.id}
                      onClick={() => setActiveLens(lens.id)}
                      style={{
                        background: activeLens === lens.id ? 'var(--brand-red)' : '#181818',
                        color: activeLens === lens.id ? '#FFFFFF' : 'var(--text-muted)',
                        border: activeLens === lens.id ? '1px solid var(--brand-red)' : '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '3px 8px',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {lens.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical Cine Metadata Strip */}
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingTop: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.68rem',
                  fontFamily: 'monospace',
                  color: 'var(--text-dim)'
                }}
              >
                <span>SHUTTER: 180°</span>
                <span>COLOR: KODAK 2383</span>
                <span style={{ color: 'var(--brand-red)', fontWeight: 700 }}>SYNC: LOCKED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <button
        onClick={() => scrollToSection('team')}
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          padding: '8px',
          transition: 'color 0.2s ease'
        }}
        aria-label="Scroll to explore Team of MC Squad"
      >
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase'
          }}
        >
          SCROLL TO EXPLORE
        </span>
        <ArrowDown size={15} style={{ animation: 'bounceDown 2s infinite' }} />
      </button>

      {/* Keyframes */}
      <style>{`
        @keyframes heroSlowZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }
        @keyframes bounceDown {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(5px);
          }
          60% {
            transform: translateY(2px);
          }
        }
      `}</style>
    </section>
  );
}
