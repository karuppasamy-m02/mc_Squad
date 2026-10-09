import React, { useState, useEffect } from 'react';
import { Clapperboard, Sparkles, Film, ArrowRight } from 'lucide-react';

export default function CinemaScreenIntro({ onComplete }) {
  const [phase, setPhase] = useState('blackout'); // 'blackout' -> 'herald' -> 'parting' -> 'done'
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    // Phase 1: Projector warm-up & optical flare streak (0ms -> 600ms)
    const t1 = setTimeout(() => {
      setPhase('herald');
    }, 600);

    // Phase 2: Studio herald & slate counter glow (600ms -> 1800ms)
    const t2 = setTimeout(() => {
      setPhase('parting');
    }, 1900);

    // Phase 3: Screen curtains part open & unveil the cinema (1900ms -> 2900ms)
    const t3 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 2950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
    setPhase('done');
    if (onComplete) onComplete();
  };

  if (phase === 'done' || isSkipped) {
    return null;
  }

  const isParting = phase === 'parting';

  return (
    <div
      id="cinema-screen-intro"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: isParting ? 'none' : 'auto',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px'
      }}
      aria-label="Cinema Screen Opening Sequence"
    >
      {/* Skip Button (Top Right) */}
      <button
        onClick={handleSkip}
        style={{
          position: 'absolute',
          top: '24px',
          right: '28px',
          zIndex: 100005,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(15, 15, 20, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          borderRadius: '24px',
          padding: '8px 16px',
          color: '#E4E4E7',
          fontSize: '0.74rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          opacity: phase === 'blackout' ? 0 : 0.85
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(229, 9, 20, 0.35)';
          e.currentTarget.style.borderColor = 'var(--brand-red)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(15, 15, 20, 0.75)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.opacity = '0.85';
        }}
      >
        <span>SKIP INTRO</span>
        <ArrowRight size={13} color="var(--brand-red)" />
      </button>

      {/* TOP CINEMA CURTAIN / MATTE (SLIDES UP) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50.5%',
          backgroundColor: '#060608',
          borderBottom: '2px solid rgba(229, 9, 20, 0.35)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.98), inset 0 -10px 40px rgba(0, 0, 0, 0.9)',
          zIndex: 100000,
          transform: isParting ? 'translateY(-102%)' : 'translateY(0)',
          transition: 'transform 1.05s cubic-bezier(0.85, 0, 0.15, 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Velvet Drape Texture Lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 30px, transparent 30px, transparent 60px)',
            opacity: 0.7,
            pointerEvents: 'none'
          }}
        />

        {/* Top 2.39:1 Scope Marker Bar */}
        <div
          style={{
            width: '100%',
            height: '24px',
            backgroundColor: '#000000',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px'
          }}
        >
          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#52525B', letterSpacing: '0.2em' }}>
            SCOPE 2.39:1 • 24 FPS DCI MASTER
          </span>
          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--brand-red)', letterSpacing: '0.2em' }}>
            ● REC [4K RAW]
          </span>
        </div>
      </div>

      {/* BOTTOM CINEMA CURTAIN / MATTE (SLIDES DOWN) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50.5%',
          backgroundColor: '#060608',
          borderTop: '2px solid rgba(229, 9, 20, 0.35)',
          boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.98), inset 0 10px 40px rgba(0, 0, 0, 0.9)',
          zIndex: 100000,
          transform: isParting ? 'translateY(102%)' : 'translateY(0)',
          transition: 'transform 1.05s cubic-bezier(0.85, 0, 0.15, 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Velvet Drape Texture Lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 30px, transparent 30px, transparent 60px)',
            opacity: 0.7,
            pointerEvents: 'none'
          }}
        />

        {/* Bottom 2.39:1 Scope Marker Bar */}
        <div
          style={{
            width: '100%',
            height: '24px',
            backgroundColor: '#000000',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px'
          }}
        >
          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#52525B', letterSpacing: '0.2em' }}>
            DOLBY ATMOS • KODAK VISION3 500T
          </span>
          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#71717A', letterSpacing: '0.2em' }}>
            MC SQUAD CINEMATIC STUDIO
          </span>
        </div>
      </div>

      {/* CENTER HERALD & ANAMORPHIC BEAM (PRESENTED BEFORE CURTAINS PART) */}
      <div
        style={{
          position: 'relative',
          zIndex: 100002,
          textAlign: 'center',
          maxWidth: '680px',
          padding: '0 24px',
          opacity: isParting ? 0 : phase === 'herald' ? 1 : 0.2,
          transform: isParting ? 'scale(1.15) translateY(-20px)' : 'scale(1)',
          transition: 'opacity 0.7s ease, transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)',
          pointerEvents: 'none'
        }}
      >
        {/* Anamorphic Blue/Red Optical Flare Streak */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '-15%',
            right: '-15%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(229, 9, 20, 0.2) 20%, #E50914 50%, rgba(255, 90, 90, 0.8) 55%, transparent 100%)',
            boxShadow: '0 0 30px 4px rgba(229, 9, 20, 0.65), 0 0 60px 10px rgba(229, 9, 20, 0.35)',
            transform: 'translateY(-50%)',
            opacity: phase === 'herald' ? 0.9 : 0.3,
            transition: 'opacity 0.5s ease',
            zIndex: 1
          }}
        />

        {/* Ambient Radial Backlight Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229, 9, 20, 0.24) 0%, rgba(229, 9, 20, 0.05) 50%, transparent 75%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Studio Production Header */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 18px',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              border: '1px solid rgba(229, 9, 20, 0.4)',
              borderRadius: '2px',
              marginBottom: '24px',
              boxShadow: '0 0 20px rgba(229, 9, 20, 0.3)'
            }}
          >
            <Clapperboard size={15} color="var(--brand-red)" />
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.24em',
                color: '#FFFFFF',
                textTransform: 'uppercase'
              }}
            >
              A MANI CINEMA PRODUCTION
            </span>
          </div>

          {/* Crisp MC Squad Logo Herald */}
          <div style={{ margin: '0 auto 20px auto', display: 'inline-block' }}>
            <img
              src="/logo-darkmode.png"
              alt="MC Squad Cinema"
              style={{
                height: 'clamp(58px, 9vw, 84px)',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
                filter: 'drop-shadow(0 0 24px rgba(229, 9, 20, 0.5))'
              }}
            />
          </div>

          {/* Subtitle / Studio Herald */}
          <h2
            style={{
              fontFamily: 'var(--font-headline)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
              fontWeight: 900,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              margin: '0 0 10px 0',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)'
            }}
          >
            INDEPENDENT CINEMA &amp; ORIGINAL SOUND
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              fontSize: '0.74rem',
              fontFamily: 'monospace',
              color: '#A1A1AA',
              letterSpacing: '0.12em'
            }}
          >
            <span>SCENE 01</span>
            <span style={{ color: 'var(--brand-red)' }}>•</span>
            <span>TAKE 01</span>
            <span style={{ color: 'var(--brand-red)' }}>•</span>
            <span>ROLLING AT 24 FPS</span>
          </div>
        </div>
      </div>

      {/* CENTER EXPANDING LIGHT FLASH ON CURTAIN OPEN */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(229, 9, 20, 0.35) 0%, rgba(255, 255, 255, 0.15) 30%, transparent 70%)',
          zIndex: 100001,
          opacity: isParting ? 1 : 0,
          transform: isParting ? 'scale(1.4)' : 'scale(0.8)',
          transition: 'opacity 0.6s ease, transform 1s ease',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
