import React from 'react';
import { Clapperboard, Film, Shield, Disc, Sparkles } from 'lucide-react';

export default function About() {
  const manifestoPoints = [
    {
      num: '01',
      title: 'THE CHARACTER & REALITY',
      desc: 'Most mass media romanticizes wealth or clichés struggle. We tell stories from where we actually stand: crowded suburban local trains, unvarnished streets, and the relentless fire to build something of lasting cinematic value.'
    },
    {
      num: '02',
      title: 'CREATIVE SOVEREIGNTY',
      desc: 'No major label dictates our lyrics or beats. No studio executive orders compromise on our director cuts, storylines, or color grades. We retain 100% of our creative sovereignty.'
    },
    {
      num: '03',
      title: 'STREET GUERRILLA CRAFT',
      desc: 'High-end cinema is not about multimillion-dollar budgets; it is about light, composition, sound, and raw human performance. We build our own rigs and film in our own streets.'
    },
    {
      num: '04',
      title: 'ORIGINAL CINEMA LEGACY',
      desc: 'Marrying deep literary and emotional narrative depth with modern global underground aesthetics, anamorphic framing, and deep sonic resonance.'
    }
  ];

  return (
    <section
      id="about"
      className="section-padding"
      style={{
        backgroundColor: '#090909',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
      aria-label="Manifesto of MC Squad"
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Section Heading Tag */}
        <div style={{ marginBottom: '40px' }}>
          <div className="title-tag">THE MANIFESTO &amp; PHILOSOPHY</div>
          <h2 className="section-title">WHY MC SQUAD?</h2>
        </div>

        {/* Large Manifesto Box */}
        <div
          style={{
            backgroundColor: '#111111',
            border: '1px solid var(--border-subtle)',
            borderLeft: '4px solid var(--brand-red)',
            padding: 'clamp(28px, 6vw, 64px)',
            marginBottom: '64px',
            position: 'relative'
          }}
        >
          {/* Subtle Watermark in background */}
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '24px',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              color: 'rgba(255, 255, 255, 0.02)',
              pointerEvents: 'none',
              lineHeight: 1,
              userSelect: 'none'
            }}
          >
            MC SQUAD
          </span>

          <p
            style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.85rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.5,
              marginBottom: '36px',
              maxWidth: '900px'
            }}
          >
            "MC Squad is an independent creative movement built around cinema, character, and raw storytelling."
          </p>

          {/* Punchy Line-by-Line Staccato Typography */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '28px',
              marginBottom: '32px'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                color: 'var(--brand-red)',
                letterSpacing: '0.06em',
                lineHeight: 1,
                margin: 0
              }}
            >
              NO MAJOR LABEL.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                color: '#888888',
                letterSpacing: '0.06em',
                lineHeight: 1,
                margin: 0
              }}
            >
              NO BIG STUDIO.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4.2vw, 3.4rem)',
                color: '#FFFFFF',
                letterSpacing: '0.06em',
                lineHeight: 1.1,
                margin: 0
              }}
            >
              JUST IDEAS, CHARACTERS, CAMERAS, MUSIC AND THE WILL TO CREATE.
            </p>
          </div>

          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.75,
              maxWidth: '800px'
            }}
          >
            "MC" stands for Middle Class. It signifies where we come from and why our voice will always remain grounded in authenticity. We believe cinema belongs to whoever has something urgent to say, and music belongs to whoever feels the beat in their veins.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '64px'
          }}
        >
          {manifestoPoints.map((point) => (
            <div
              key={point.num}
              style={{
                backgroundColor: '#121212',
                border: '1px solid var(--border-subtle)',
                padding: '28px',
                borderRadius: '2px',
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  color: 'var(--brand-red)',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '12px'
                }}
              >
                {point.num}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                  marginBottom: '12px'
                }}
              >
                {point.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Independent Pillars Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '40px',
            textAlign: 'center'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', color: 'var(--brand-red)', lineHeight: 1 }}>
              100%
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '6px' }}>
              Independent Masters
            </p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', color: '#FFFFFF', lineHeight: 1 }}>
              35MM
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '6px' }}>
              Cinematic Framing
            </p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', color: '#FFFFFF', lineHeight: 1 }}>
              ORIGINAL
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '6px' }}>
              Character Screenplays
            </p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', color: 'var(--brand-red)', lineHeight: 1 }}>
              24 FPS
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '6px' }}>
              Pure Cinema Motion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
