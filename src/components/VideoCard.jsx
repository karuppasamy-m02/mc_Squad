import React from 'react';
import { Play, Eye, Clock, Video } from 'lucide-react';

export default function VideoCard({ video, onSelectVideo }) {
  return (
    <div
      className="cinematic-card"
      onClick={() => onSelectVideo(video)}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '2px'
      }}
    >
      {/* 16:9 Thumbnail Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          backgroundColor: '#121212'
        }}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="video-thumb-img"
        />

        {/* Hover Darken & Play Button */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(8, 8, 8, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s ease'
          }}
          className="video-play-backdrop"
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(229, 9, 20, 0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px var(--brand-red-glow)',
              transition: 'transform 0.2s ease'
            }}
            className="video-play-icon"
          >
            <Play size={24} fill="#FFFFFF" style={{ marginLeft: '3px' }} />
          </div>
        </div>

        {/* Badges: Category & Duration */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'rgba(8, 8, 8, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-subtle)',
            padding: '4px 10px',
            borderRadius: '2px',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'var(--brand-red)',
            textTransform: 'uppercase'
          }}
        >
          {video.category}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            backgroundColor: 'rgba(8, 8, 8, 0.85)',
            border: '1px solid var(--border-subtle)',
            padding: '3px 8px',
            borderRadius: '2px',
            fontSize: '0.72rem',
            fontFamily: 'monospace',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Clock size={12} />
          {video.duration}
        </div>
      </div>

      {/* Info Section */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3
          style={{
            fontFamily: 'var(--font-headline)',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.35,
            marginBottom: '6px'
          }}
        >
          {video.title}
        </h3>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px', flexGrow: 1 }}>
          {video.description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '12px',
            fontSize: '0.78rem',
            color: 'var(--text-dim)'
          }}
        >
          <span>{video.director}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
            <Eye size={13} /> {video.views}
          </span>
        </div>
      </div>

      <style>{`
        .cinematic-card:hover .video-thumb-img {
          transform: scale(1.05);
        }
        .cinematic-card:hover .video-play-backdrop {
          background-color: rgba(8, 8, 8, 0.6) !important;
        }
        .cinematic-card:hover .video-play-icon {
          transform: scale(1.12);
          background-color: var(--brand-red) !important;
        }
      `}</style>
    </div>
  );
}
