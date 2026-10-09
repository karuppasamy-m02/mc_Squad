import React, { useState } from 'react';
import { Award, Trophy, Sparkles, Star, Film, CheckCircle2, X, ZoomIn, ArrowRight } from 'lucide-react';

export default function AchievementsSection() {
  const [isZoomed, setIsZoomed] = useState(false);

  const awardDetails = {
    title: 'BEST STORYTELLING AWARD',
    year: '2026',
    recipient: 'MANI',
    org: 'MC SQUAD INDEPENDENT CINEMA',
    image: '/images/award-best-storytelling-2026.png',
    fallbackImage: '/images/avard-best-sory-teling .png',
    category: 'Independent Cinema & Narrative Screenwriting',
    citation:
      'Presented in recognition of extraordinary narrative prowess, unvarnished emotional realism, and fearless character-driven storytelling that honors authentic street realities without commercial compromise.'
  };

  const keyHallmarks = [
    {
      num: '01',
      title: 'UNVARNISHED CHARACTER REALISM',
      desc: 'Narratives sculpted directly from middle-class life, suburban trains, and lived human experiences rather than cinematic clichés.'
    },
    {
      num: '02',
      title: 'SONIC & SCREENPLAY SYMBIOSIS',
      desc: 'Original music production and 808 sub-bass score crafted in direct synchrony with screenplay beats, elevating dramatic tension.'
    },
    {
      num: '03',
      title: '100% INDEPENDENT SOVEREIGNTY',
      desc: 'Uncompromising directorial control and creative freedom, demonstrating that visionary storytelling thrives outside major studio gates.'
    }
  ];

  return (
    <section
      id="achievements"
      className="section-padding"
      style={{
        backgroundColor: '#070707',
        position: 'relative',
        borderTop: '1px solid rgba(245, 158, 11, 0.2)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
      aria-label="Achievements and Awards — 2026 Best Storytelling Award"
    >
      {/* Golden Ambient Atmospheric Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '560px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.09) 0%, rgba(229, 9, 20, 0.04) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 48px auto' }}>
          {/* Golden Laurel Pill Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 20px',
              backgroundColor: 'rgba(20, 16, 10, 0.9)',
              border: '1px solid rgba(245, 158, 11, 0.45)',
              borderRadius: '30px',
              marginBottom: '18px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 30px rgba(245, 158, 11, 0.15)'
            }}
          >
            <Trophy size={15} color="#F59E0B" />
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.22em',
                color: '#FCD34D',
                fontFamily: 'monospace',
                textTransform: 'uppercase'
              }}
            >
              HONOURS &amp; ACHIEVEMENTS • 2026
            </span>
            <span style={{ color: 'rgba(245, 158, 11, 0.5)' }}>•</span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#FFFFFF',
                fontFamily: 'monospace',
                letterSpacing: '0.12em'
              }}
            >
              OFFICIAL WINNER
            </span>
          </div>

          <h2
            className="section-title"
            style={{
              fontSize: 'clamp(2.5rem, 5.8vw, 4.8rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '16px',
              lineHeight: 1.05
            }}
          >
            2026 BEST STORYTELLING{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 45%, #D97706 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              AWARD
            </span>
          </h2>

          <p
            className="section-subtitle"
            style={{
              margin: '0 auto',
              fontSize: '1.05rem',
              color: '#D1D5DB',
              maxWidth: '740px',
              lineHeight: 1.6
            }}
          >
            Conferred to <strong style={{ color: '#FFFFFF' }}>Mani &amp; MC Squad</strong> for uncompromising narrative depth,
            unvarnished street realism, and revolutionary independent Tamil cinema storytelling.
          </p>
        </div>

        {/* Heroic Showcase: Trophy Stage + Citation Dossier */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(24px, 4vw, 44px)',
            alignItems: 'center',
            backgroundColor: 'rgba(14, 14, 14, 0.85)',
            border: '1px solid rgba(245, 158, 11, 0.28)',
            borderRadius: '8px',
            padding: 'clamp(24px, 4vw, 48px)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(245, 158, 11, 0.08)',
            marginBottom: '48px',
            position: 'relative'
          }}
        >
          {/* Left Column: Trophy Pedestal with Spotlight */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            {/* Glowing Golden Aura behind Trophy */}
            <div
              style={{
                position: 'absolute',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
                filter: 'blur(30px)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />

            {/* Interactive Trophy Frame */}
            <div
              onClick={() => setIsZoomed(true)}
              style={{
                position: 'relative',
                zIndex: 1,
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '2px solid rgba(245, 158, 11, 0.4)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(245, 158, 11, 0.2)',
                backgroundColor: '#0A0A0A',
                maxWidth: '320px',
                width: '100%',
                transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease'
              }}
              className="award-trophy-hover"
              title="Click to view full-resolution award trophy"
            >
              <img
                src={awardDetails.image}
                alt="2026 Best Storytelling Award Trophy — Mani MC Squad"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = awardDetails.fallbackImage;
                }}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transition: 'transform 0.4s ease'
                }}
              />

              {/* Hover Zoom Hint Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  color: '#FCD34D',
                  fontSize: '0.82rem',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  transition: 'opacity 0.25s ease'
                }}
                className="zoom-overlay"
              >
                <ZoomIn size={18} /> CLICK TO ZOOM
              </div>

              {/* Plaque Corner Ribbon */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  border: '1px solid #F59E0B',
                  borderRadius: '3px',
                  padding: '4px 10px',
                  fontSize: '0.66rem',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  color: '#FCD34D',
                  letterSpacing: '0.1em'
                }}
              >
                ★ 2026 WINNER
              </div>
            </div>

            {/* Plaque Caption Text */}
            <div
              style={{
                marginTop: '16px',
                textAlign: 'center',
                fontFamily: 'monospace',
                fontSize: '0.74rem',
                color: 'var(--text-muted)'
              }}
            >
              <span style={{ color: '#FCD34D', fontWeight: 800 }}>ENGRAVED PLAQUE:</span> BEST STORYTELLING AWARD • 2026
            </div>
          </div>

          {/* Right Column: Official Citation & Narrative Philosophy */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                flexWrap: 'wrap'
              }}
            >
              <span
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  color: '#FCD34D',
                  padding: '3px 10px',
                  borderRadius: '2px',
                  fontSize: '0.68rem',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  letterSpacing: '0.1em'
                }}
              >
                AWARD RECIPIENT
              </span>
              <span style={{ color: 'var(--text-dim)' }}>•</span>
              <span
                style={{
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  fontFamily: 'monospace'
                }}
              >
                MANI (FOUNDER &amp; DIRECTOR)
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.8vw, 2.9rem)',
                lineHeight: 1.1,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                margin: '0 0 16px 0'
              }}
            >
              EXCELLENCE IN INDEPENDENT STORYTELLING
            </h3>

            {/* Official Citation Quote */}
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.55)',
                borderLeft: '3px solid #F59E0B',
                padding: '16px 20px',
                borderRadius: '0 4px 4px 0',
                marginBottom: '24px'
              }}
            >
              <p
                style={{
                  color: '#F3F4F6',
                  fontSize: '0.96rem',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  margin: 0
                }}
              >
                "{awardDetails.citation}"
              </p>
            </div>

            {/* Award Highlights Matrix */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '12px',
                marginBottom: '28px'
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '12px 14px',
                  borderRadius: '3px'
                }}
              >
                <div style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--text-dim)', marginBottom: '4px' }}>
                  HONOUR YEAR
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FCD34D', fontFamily: 'monospace' }}>
                  2026 EDITION
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '12px 14px',
                  borderRadius: '3px'
                }}
              >
                <div style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--text-dim)', marginBottom: '4px' }}>
                  CREATIVE CATEGORY
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3 }}>
                  BEST STORYTELLING
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '12px 14px',
                  borderRadius: '3px'
                }}
              >
                <div style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--text-dim)', marginBottom: '4px' }}>
                  PRODUCTION HOUSE
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3 }}>
                  MC SQUAD (INDEPENDENT)
                </div>
              </div>
            </div>

            {/* Quick Action Button to Films */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href="#films"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--brand-red)',
                  color: '#FFFFFF',
                  padding: '11px 22px',
                  borderRadius: '3px',
                  fontSize: '0.78rem',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  boxShadow: '0 8px 24px rgba(229, 9, 20, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                EXPLORE AWARDED CINEMA SLATES <ArrowRight size={14} />
              </a>

              <a
                href="#team"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#1C1C1C',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  padding: '11px 20px',
                  borderRadius: '3px',
                  fontSize: '0.78rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                MEET MANI &amp; THE CREW
              </a>
            </div>
          </div>
        </div>

        {/* 3 Storytelling Pillars that won the Award */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
            marginBottom: '36px'
          }}
        >
          {keyHallmarks.map((item) => (
            <div
              key={item.num}
              style={{
                backgroundColor: '#0F0F0F',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderTop: '2px solid rgba(245, 158, 11, 0.6)',
                padding: '24px',
                borderRadius: '4px',
                transition: 'all 0.25s ease'
              }}
              className="hallmark-card-hover"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px'
                }}
              >
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'monospace',
                    fontWeight: 800,
                    color: '#FCD34D',
                    letterSpacing: '0.14em'
                  }}
                >
                  HALLMARK #{item.num}
                </span>
                <Sparkles size={14} color="#F59E0B" />
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                  marginBottom: '10px'
                }}
              >
                {item.title}
              </h4>

              <p
                style={{
                  fontSize: '0.86rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  margin: 0
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Achievement Ribbon */}
        <div
          style={{
            backgroundColor: '#0C0C0C',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            padding: '12px 20px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.74rem',
            fontFamily: 'monospace',
            color: 'var(--text-muted)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="pulsing-dot" style={{ backgroundColor: '#F59E0B' }} />
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>MC SQUAD 2026 HONOUR:</span>
            <span>BEST STORYTELLING AWARD • CONFERRED TO MANI • INDEPENDENT RECOGNITION</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FCD34D' }}>
            <Star size={13} fill="#FCD34D" color="#FCD34D" />
            <Star size={13} fill="#FCD34D" color="#FCD34D" />
            <Star size={13} fill="#FCD34D" color="#FCD34D" />
            <Star size={13} fill="#FCD34D" color="#FCD34D" />
            <span style={{ fontSize: '0.7rem', fontWeight: 800, marginLeft: '4px' }}>EXCELLENCE LOCKED</span>
          </div>
        </div>
      </div>

      {/* Full-Screen Trophy Lightbox Zoom Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.94)',
            backdropFilter: 'blur(16px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out'
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsZoomed(false)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10000
            }}
            title="Close Zoom Modal"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          {/* Golden Trophy Zoom Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 'min(90vw, 480px)',
              maxHeight: '82vh',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(245, 158, 11, 0.35)',
              border: '2px solid rgba(245, 158, 11, 0.5)',
              backgroundColor: '#000000'
            }}
          >
            <img
              src={awardDetails.image}
              alt="2026 Best Storytelling Award Trophy Plaque — Full View"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '75vh',
                objectFit: 'contain',
                display: 'block'
              }}
              onError={(e) => {
                e.currentTarget.src = awardDetails.fallbackImage;
              }}
            />
            <div
              style={{
                padding: '14px 20px',
                backgroundColor: '#0E0E0E',
                borderTop: '1px solid rgba(245, 158, 11, 0.3)',
                textAlign: 'center'
              }}
            >
              <div style={{ color: '#FCD34D', fontWeight: 800, fontSize: '0.84rem', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
                BEST STORYTELLING AWARD — 2026
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginTop: '2px' }}>
                Conferred to Mani • MC Squad Independent Cinema
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .award-trophy-hover:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95), 0 0 45px rgba(245, 158, 11, 0.35) !important;
        }
        .award-trophy-hover:hover .zoom-overlay {
          opacity: 1 !important;
        }
        .hallmark-card-hover:hover {
          border-color: rgba(245, 158, 11, 0.5) !important;
          transform: translateY(-3px);
        }
        .award-pill-hover:hover {
          background-color: rgba(217, 119, 6, 0.28) !important;
          border-color: rgba(245, 158, 11, 0.8) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
