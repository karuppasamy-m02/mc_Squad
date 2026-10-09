import React from 'react';
import { ArrowRight, Award, Film } from 'lucide-react';

export default function ProjectCard({ project, onOpenModal }) {
  return (
    <div
      className="cinematic-card"
      onClick={() => onOpenModal(project)}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '2px',
        backgroundColor: '#111111'
      }}
    >
      {/* Cinematic Poster Area (2:3 or 16:10 aspect ratio) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/10',
          overflow: 'hidden',
          backgroundColor: '#0c0c0c'
        }}
      >
        <img
          src={project.poster}
          alt={`${project.title} poster`}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="project-poster-img"
        />

        {/* Cinematic Gradient Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #111111 0%, rgba(17,17,17,0.3) 60%, transparent 100%)'
          }}
        />

        {/* Festival Laurel / Tag Badge */}
        {project.festivalLaurel && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: 'rgba(8, 8, 8, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(229, 9, 20, 0.4)',
              color: 'var(--brand-red)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '4px 10px',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Award size={12} />
            ACCLAIMED
          </div>
        )}

        {/* Year Pill */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(8, 8, 8, 0.85)',
            border: '1px solid var(--border-subtle)',
            color: '#FFFFFF',
            fontSize: '0.72rem',
            fontWeight: 700,
            padding: '4px 8px',
            borderRadius: '2px'
          }}
        >
          {project.year}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, marginTop: '-20px', position: 'relative', zIndex: 2 }}>
        {/* Category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--brand-red)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {project.category}
          </span>
        </div>

        {/* Project Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '8px'
          }}
        >
          {project.title}
        </h3>

        {/* Role */}
        <p style={{ fontSize: '0.84rem', color: '#E0E0E0', fontWeight: 600, marginBottom: '12px' }}>
          Role: <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{project.role}</span>
        </p>

        {/* Short Description */}
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px', flexGrow: 1 }}>
          {project.shortDescription}
        </p>

        {/* View Project Action */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '16px',
            marginTop: 'auto'
          }}
        >
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'var(--brand-red)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            className="view-project-label"
          >
            VIEW PROJECT <ArrowRight size={14} />
          </span>

          <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
            CREDITS &amp; STILLS
          </span>
        </div>
      </div>

      <style>{`
        .cinematic-card:hover .project-poster-img {
          transform: scale(1.06);
        }
        .cinematic-card:hover .view-project-label {
          color: #FFFFFF !important;
        }
      `}</style>
    </div>
  );
}
