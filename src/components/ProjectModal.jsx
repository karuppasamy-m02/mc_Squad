import React, { useEffect } from 'react';
import { X, Award, Play, Film, User, Calendar, Tag } from 'lucide-react';

export default function ProjectModal({ project, onClose, onSelectStill }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Project details for ${project.title}`}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1080px',
          maxHeight: '90vh',
          backgroundColor: '#0C0C0C',
          border: '1px solid var(--border-strong)',
          borderRadius: '2px',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)',
          paddingBottom: '40px'
        }}
        className="animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            backgroundColor: 'rgba(12, 12, 12, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--brand-red)', fontWeight: 700, letterSpacing: '0.12em' }}>
              {project.category}
            </span>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{project.year}</span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid var(--border-subtle)',
              color: '#FFFFFF',
              width: '36px',
              height: '36px',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label="Close project modal"
            className="modal-close-hover"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hero Banner Section */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(280px, 40vw, 440px)',
            overflow: 'hidden',
            backgroundColor: '#050505'
          }}
        >
          <img
            src={project.poster}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              filter: 'brightness(0.7)'
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #0C0C0C 0%, rgba(12, 12, 12, 0.6) 50%, rgba(12, 12, 12, 0.3) 100%)'
            }}
          />

          {/* Banner Overlaid Meta */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: 'clamp(20px, 4vw, 40px)',
              right: 'clamp(20px, 4vw, 40px)'
            }}
          >
            {project.festivalLaurel && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(229, 9, 20, 0.15)',
                  border: '1px solid rgba(229, 9, 20, 0.5)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: '2px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  marginBottom: '14px'
                }}
              >
                <Award size={16} color="var(--brand-red)" />
                {project.festivalLaurel}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  color: '#FFFFFF',
                  lineHeight: 0.95,
                  margin: 0,
                  letterSpacing: '0.04em'
                }}
              >
                {project.title}
              </h2>
            </div>

            <p style={{ color: '#E0E0E0', fontSize: '1rem', fontWeight: 600, marginTop: '8px' }}>
              Role: <span style={{ color: 'var(--brand-red)' }}>{project.role}</span>
            </p>
          </div>
        </div>

        {/* Modal Main Body Content */}
        <div style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
          {/* Logline Box */}
          {project.logline && (
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderLeft: '3px solid var(--brand-red)',
                padding: '16px 20px',
                marginBottom: '32px'
              }}
            >
              <p style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#F0F0F0', margin: 0, lineHeight: 1.5 }}>
                "{project.logline}"
              </p>
            </div>
          )}

          {/* Detailed Narrative Description */}
          <div style={{ marginBottom: '40px' }}>
            <h4
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '1rem',
                color: 'var(--brand-red)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              ABOUT THE PRODUCTION
            </h4>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              {project.fullDescription || project.shortDescription}
            </p>
          </div>

          {/* Embedded Video Showcase (if available) */}
          {project.videoEmbedUrl && (
            <div style={{ marginBottom: '48px' }}>
              <h4
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1rem',
                  color: 'var(--brand-red)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Film size={16} /> FILM PREVIEW / TRAILER
              </h4>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '2px', overflow: 'hidden' }}>
                <iframe
                  src={`${project.videoEmbedUrl}?rel=0&modestbranding=1`}
                  title={`${project.title} Preview`}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Production Stills Gallery */}
          {project.stills && project.stills.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <h4
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1rem',
                  color: 'var(--brand-red)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                PRODUCTION STILLS &amp; VISUALS
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px'
                }}
              >
                {project.stills.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    style={{
                      aspectRatio: '16/10',
                      overflow: 'hidden',
                      borderRadius: '2px',
                      backgroundColor: '#161616',
                      border: '1px solid var(--border-subtle)',
                      cursor: onSelectStill ? 'pointer' : 'default'
                    }}
                    onClick={() => onSelectStill && onSelectStill(imgSrc)}
                  >
                    <img
                      src={imgSrc}
                      alt={`${project.title} still ${idx + 1}`}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                      className="still-img"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Cast & Crew Credits Section */}
          {project.credits && project.credits.length > 0 && (
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1rem',
                  color: 'var(--brand-red)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                FULL CAST &amp; CREW CREDITS
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '12px',
                  backgroundColor: '#111111',
                  border: '1px solid var(--border-subtle)',
                  padding: '20px',
                  borderRadius: '2px'
                }}
              >
                {project.credits.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      paddingBottom: '8px'
                    }}
                  >
                    <span style={{ fontSize: '0.74rem', color: 'var(--brand-red)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                      {c.role}
                    </span>
                    <span style={{ fontSize: '0.92rem', color: '#FFFFFF', fontWeight: 500 }}>
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .modal-close-hover:hover {
          border-color: var(--brand-red) !important;
          color: var(--brand-red) !important;
        }
        .still-img:hover {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
