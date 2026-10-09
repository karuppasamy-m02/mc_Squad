import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext
}) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onPrev, onNext]);

  if (!currentImage) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      style={{ padding: 0 }}
    >
      {/* Top Bar with Counter & Close */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 28px',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--brand-red)', fontWeight: 700, letterSpacing: '0.14em' }}>
            {currentImage.category}
          </span>
          <span style={{ color: 'var(--text-dim)' }}>•</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#FFFFFF', letterSpacing: '0.1em' }}>
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-subtle)',
            color: '#FFFFFF',
            width: '40px',
            height: '40px',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          aria-label="Close Lightbox"
          className="lightbox-btn"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Image Display */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px 100px 24px'
        }}
        onClick={onClose}
      >
        <img
          src={currentImage.src}
          alt={currentImage.title || currentImage.caption}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '90vw',
            maxHeight: '75vh',
            objectFit: 'contain',
            borderRadius: '2px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.95)',
            border: '1px solid var(--border-subtle)',
            animation: 'fadeIn 0.25s ease-out'
          }}
        />

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          style={{
            position: 'absolute',
            left: 'clamp(12px, 3vw, 32px)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(17, 17, 17, 0.85)',
            border: '1px solid var(--border-subtle)',
            color: '#FFFFFF',
            width: '50px',
            height: '50px',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 40,
            transition: 'all 0.2s ease'
          }}
          aria-label="Previous photo"
          className="lightbox-btn"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          style={{
            position: 'absolute',
            right: 'clamp(12px, 3vw, 32px)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(17, 17, 17, 0.85)',
            border: '1px solid var(--border-subtle)',
            color: '#FFFFFF',
            width: '50px',
            height: '50px',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 40,
            transition: 'all 0.2s ease'
          }}
          aria-label="Next photo"
          className="lightbox-btn"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Bottom Information Caption Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '20px 28px',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '12px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.1rem', color: '#FFFFFF', margin: '0 0 4px 0' }}>
            {currentImage.title}
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, maxWidth: '600px' }}>
            {currentImage.caption}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {currentImage.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <MapPin size={14} color="var(--brand-red)" /> {currentImage.location}
            </span>
          )}
          {currentImage.year && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <Calendar size={14} /> {currentImage.year}
            </span>
          )}
        </div>
      </div>

      <style>{`
        .lightbox-btn:hover {
          background-color: var(--brand-red) !important;
          border-color: var(--brand-red) !important;
          box-shadow: 0 0 15px var(--brand-red-glow);
        }
      `}</style>
    </div>
  );
}
