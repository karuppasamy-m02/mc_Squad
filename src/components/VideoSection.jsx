import React, { useState, useMemo } from 'react';
import { videosData, videoCategories } from '../data/videos';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';
import { Film, Play, Eye, Bell, Check, Sparkles, Radio, Clapperboard } from 'lucide-react';

export default function VideoSection() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'ALL') return videosData;
    return videosData.filter((v) => v.category === selectedCategory);
  }, [selectedCategory]);

  const upcomingReels = [
    {
      code: 'REEL #01',
      title: 'NI EENAKU — OFFICIAL MUSIC VIDEO',
      tag: 'NARRATIVE MUSIC VIDEO',
      status: 'IN COLOR GRADING (DI)',
      spec: '4K DCI • KODAK 2383 • 2.39:1',
      desc: 'The official romantic visual for Ni Eenaku. Shot on anamorphic lenses capturing intimate urban romance and midnight rain.',
      credits: 'Dir: Mani & Ragesh K.R • Music: Mani • Edit: Nandha Kumar'
    },
    {
      code: 'REEL #02',
      title: 'HIP-HOP MOTIVATION — PERFORMANCE CYPHER',
      tag: 'STREET CYPHER',
      status: 'IN 24 FPS EDITORIAL ASSEMBLY',
      spec: '4K HIGH-CONTRAST • 808 SYNC',
      desc: 'Raw street-level hip-hop cypher featuring high-energy performance, underground night lights, and heavy bass synchronization.',
      credits: 'Performance: Mani • Cam: Ragesh K.R • Cut: Nandha Kumar'
    },
    {
      code: 'REEL #03',
      title: 'CINA CINA KALADI — CINEMATIC LYRIC REEL',
      tag: 'FAMILY MELODY',
      status: 'FINAL MASTER RENDER',
      spec: 'WARM GOLDEN GRADE • 24 FPS',
      desc: 'Heartwarming visual narrative celebrating the parent-child bond with tender cinematic staging and soothing melodic pacing.',
      credits: 'Produced by MC Squad Collective'
    }
  ];

  return (
    <section
      id="videos"
      className="section-padding"
      style={{
        backgroundColor: '#070707',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
      aria-label="MC Squad Motion Pictures and Screen Reels"
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '5%',
          width: '500px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="title-tag">MOTION PICTURES &amp; SCREEN REELS</div>
          <h2 className="section-title">OFFICIAL SCREEN REELS</h2>
          <p className="section-subtitle">
            Raw street cinematography, narrative video releases, performance cyphers, and 4K film trailers.
          </p>
        </div>

        {/* Display video catalog if available, otherwise show the Perfect Coming Soon Theater Banner */}
        {videosData.length > 0 ? (
          <>
            <div className="filter-tabs" style={{ marginBottom: '36px' }}>
              {videoCategories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(20px, 3vw, 32px)'
              }}
            >
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onSelectVideo={(v) => setActiveModalVideo(v)}
                />
              ))}
            </div>
          </>
        ) : (
          /* PERFECT 4K SCREEN REELS COMING SOON SHOWCASE */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Master 4K Cinema Theater Coming Soon Banner */}
            <div
              style={{
                position: 'relative',
                backgroundColor: '#101010',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderLeft: '4px solid var(--brand-red)',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.95)'
              }}
            >
              {/* Subtle background film texture */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/images/hero-cinema-ai.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 30%',
                  opacity: 0.16,
                  filter: 'contrast(1.3) grayscale(70%)',
                  pointerEvents: 'none'
                }}
              />

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: 'clamp(32px, 5vw, 56px)'
                }}
              >
                {/* Status Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'rgba(229, 9, 20, 0.18)',
                      border: '1px solid var(--brand-red)',
                      color: '#FFFFFF',
                      padding: '5px 12px',
                      borderRadius: '2px',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '0.15em',
                      fontFamily: 'monospace',
                      textTransform: 'uppercase'
                    }}
                  >
                    <span className="pulsing-dot" />
                    COMING SOON // 4K VIDEO DROPS
                  </div>

                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#E5E5E5',
                      padding: '5px 10px',
                      borderRadius: '2px',
                      fontSize: '0.7rem',
                      fontFamily: 'monospace'
                    }}
                  >
                    4K DCI • DOLBY ATMOS • KODAK 2383 DI
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-headline)',
                    fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    marginBottom: '16px',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase'
                  }}
                >
                  OFFICIAL 4K MOTION PICTURES <span style={{ color: 'var(--brand-red)' }}>DROPPING SOON</span>
                </h3>

                <p
                  style={{
                    color: '#CCCCCC',
                    fontSize: 'clamp(0.95rem, 1.4vw, 1.12rem)',
                    lineHeight: 1.7,
                    maxWidth: '780px',
                    marginBottom: '26px'
                  }}
                >
                  Official music videos, narrative cyphers, and 4K trailers are currently undergoing final DI color grading by <strong>Ragesh K.R</strong>, sound design by <strong>Mani</strong>, and surgical timeline cut by <strong>Nandha Kumar</strong>. Releases will drop right here in the MC Squad theater portal.
                </p>

                {/* Technical Parameters Matrix */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    padding: '18px',
                    borderRadius: '3px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '28px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.66rem', color: 'var(--brand-red)', fontFamily: 'monospace', fontWeight: 800, letterSpacing: '0.12em', display: 'block' }}>
                      RESOLUTION
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                      4K DCI Cinema Master
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.66rem', color: 'var(--brand-red)', fontFamily: 'monospace', fontWeight: 800, letterSpacing: '0.12em', display: 'block' }}>
                      COLOR SCIENCE
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                      Kodak 2383 Print LUT
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.66rem', color: 'var(--brand-red)', fontFamily: 'monospace', fontWeight: 800, letterSpacing: '0.12em', display: 'block' }}>
                      AUDIO MIX
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                      Stereo &amp; Dolby Atmos
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.66rem', color: 'var(--brand-red)', fontFamily: 'monospace', fontWeight: 800, letterSpacing: '0.12em', display: 'block' }}>
                      EDITORIAL
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                      24.000 FPS Sync Cut
                    </span>
                  </div>
                </div>

                {/* Subscribe / Notification Button */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
                  <button
                    onClick={() => setSubscribed(true)}
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    aria-label="Subscribe for video drops"
                  >
                    {subscribed ? <Check size={16} /> : <Bell size={16} />}
                    {subscribed ? 'NOTIFICATIONS ACTIVE!' : 'SUBSCRIBE FOR VIDEO DROPS'}
                  </button>

                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'monospace' }}>
                    * 4K premieres &amp; direct theatrical streams will be playable here.
                  </span>
                </div>
              </div>
            </div>

            {/* UPCOMING VIDEO REELS CARDS */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontFamily: 'monospace',
                    letterSpacing: '0.18em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase'
                  }}
                >
                  POST-PRODUCTION PIPELINE (3 UPCOMING REELS):
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--brand-red)', fontFamily: 'monospace', fontWeight: 700 }}>
                  4K MASTER FINISHING
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                  gap: '18px'
                }}
              >
                {upcomingReels.map((reel, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#121212',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '4px',
                      padding: '24px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative'
                    }}
                  >
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.64rem', fontFamily: 'monospace', color: 'var(--brand-red)', fontWeight: 800 }}>
                          {reel.code}
                        </span>
                        <span
                          style={{
                            fontSize: '0.62rem',
                            fontFamily: 'monospace',
                            color: '#4ade80',
                            backgroundColor: 'rgba(74, 222, 128, 0.1)',
                            border: '1px solid rgba(74, 222, 128, 0.25)',
                            padding: '2px 8px',
                            borderRadius: '2px'
                          }}
                        >
                          {reel.status}
                        </span>
                      </div>

                      <h4
                        style={{
                          fontFamily: 'var(--font-headline)',
                          fontSize: '1.2rem',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          marginBottom: '8px',
                          letterSpacing: '0.03em'
                        }}
                      >
                        {reel.title}
                      </h4>

                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '12px' }}>
                        {reel.desc}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px' }}>
                      <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: 'var(--text-dim)', display: 'block' }}>
                        {reel.spec}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--brand-red)', fontWeight: 600, marginTop: '2px', display: 'block' }}>
                        {reel.credits}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Video Player Modal */}
        {activeModalVideo && (
          <VideoModal
            video={activeModalVideo}
            onClose={() => setActiveModalVideo(null)}
          />
        )}
      </div>
    </section>
  );
}
