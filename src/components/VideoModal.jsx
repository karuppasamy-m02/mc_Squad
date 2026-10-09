import React, { useEffect } from 'react';
import { X, Calendar, Clock, Eye, Film } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  return (
    <div
      className="modal-backdrop animate-fade-in"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 5, 5, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 3vw, 32px)'
      }}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <div
        className="modal-container animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '960px',
          backgroundColor: '#0F0F0F',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#141414',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Film size={16} color="var(--brand-red)" />
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.1em'
              }}
            >
              MC SQUAD 4K SCREENING // {video.category}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              transition: 'color 0.15s ease'
            }}
            aria-label="Close video player"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player Box */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            backgroundColor: '#000000'
          }}
        >
          {video.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'var(--text-muted)',
                gap: '12px'
              }}
            >
              <Film size={48} color="var(--brand-red)" />
              <p style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>
                4K Stream Master in Preparation
              </p>
            </div>
          )}
        </div>

        {/* Video Meta Info */}
        <div style={{ padding: '20px 24px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-headline)',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '10px'
            }}
          >
            {video.title}
          </h3>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
            {video.description}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              paddingTop: '14px',
              fontSize: '0.74rem',
              fontFamily: 'monospace',
              color: 'var(--text-dim)'
            }}
          >
            <span>RESOLUTION: 4K DCI // 24 FPS</span>
            <span>STEREO // DOLBY MASTER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
