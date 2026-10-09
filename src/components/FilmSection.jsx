import React, { useState } from 'react';
import { projectsData, projectCategories } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Clapperboard, Film, Sparkles, Bell, Check, Camera, Disc, Eye } from 'lucide-react';

export default function FilmSection() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeProject, setActiveProject] = useState(null);
  const [notified, setNotified] = useState(false);

  // If projectsData has entries, filter; otherwise show the cinematic Coming Soon banner
  const filteredProjects = selectedCategory === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory || p.secondaryCategories?.includes(selectedCategory));

  const upcomingSlate = [
    {
      code: 'SLATE #01',
      title: 'UNTITLED DRAMA',
      tag: 'FEATURE NARRATIVE',
      aspect: '2.39:1 ANAMORPHIC',
      status: 'PRE-PRODUCTION',
      logline: 'An intense, character-driven story exploring street resilience and moral dilemmas with raw emotional realism.',
      credits: 'Dir: Mani & Ragesh K.R • Music: Mani • Edit: Bharath Vaj • Choreo: Nandha Kumar'
    },
    {
      code: 'SLATE #02',
      title: 'STREET PULSE',
      tag: 'SHORT FILM',
      aspect: '35MM KODAK 2383',
      status: 'SCRIPT LOCKED',
      logline: 'A fast-paced, high-stakes visual piece celebrating independent brotherhood and unwavering character dignity.',
      credits: 'Dir: Mani • DoP: Ragesh K.R • Cut: Bharath Vaj & Kumaren • Choreo: Nandha Kumar'
    },
    {
      code: 'SLATE #03',
      title: 'THE SOVEREIGN',
      tag: 'CRIME THRILLER',
      aspect: '4K DCI WIDESCREEN',
      status: 'STORY DEVELOPMENT',
      logline: 'Grounded atmospheric noir examining corruption, street codes, and the relentless fight for truth.',
      credits: 'Written & Produced by MC Squad Collective'
    }
  ];

  return (
    <section
      id="films"
      className="section-padding"
      style={{
        backgroundColor: '#090909',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
      aria-label="MC Squad Film Productions"
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Heading */}
        <div style={{ marginBottom: '40px' }}>
          <div className="title-tag">CREATIVE DIRECTION &amp; CINEMA</div>
          <h2 className="section-title">FILM PRODUCTIONS</h2>
          <p className="section-subtitle">
            Narrative cinema, character-driven screenplays, 35mm anamorphic cinematography, and original background scoring.
          </p>
        </div>

        {/* Display real projects if any exist; otherwise show the Perfect Coming Soon Slate Showcase */}
        {filteredProjects.length > 0 ? (
          <>
            <div className="filter-tabs" style={{ marginBottom: '36px' }}>
              {projectCategories.map((cat) => (
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
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                  gap: 'clamp(24px, 4vw, 36px)'
                }}
              >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenModal={(proj) => setActiveProject(proj)}
                />
              ))}
            </div>
          </>
        ) : (
          /* PERFECT CINEMATIC COMING SOON BANNER & UPCOMING SLATE */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Master Cinema Coming Soon Banner */}
            <div
              style={{
                position: 'relative',
                backgroundColor: '#101010',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderLeft: '4px solid var(--brand-red)',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9)'
              }}
            >
              {/* Background Cinema Visual with Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/images/hero-cinema-ai.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 40%',
                  opacity: 0.18,
                  filter: 'contrast(1.3) grayscale(60%)',
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
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
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
                    COMING SOON // PRE-PRODUCTION SLATE
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
                    2.39:1 ANAMORPHIC • KODAK 2383 DI • 24 FPS
                  </span>
                </div>

                {/* Banner Main Title */}
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
                  OFFICIAL INDEPENDENT CINEMA <span style={{ color: 'var(--brand-red)' }}>DROPPING SOON</span>
                </h3>

                <p
                  style={{
                    color: '#CCCCCC',
                    fontSize: 'clamp(0.95rem, 1.4vw, 1.12rem)',
                    lineHeight: 1.7,
                    maxWidth: '780px',
                    marginBottom: '28px'
                  }}
                >
                  The MC Squad core crew—<strong>Mani</strong> (Founder, Music &amp; AD), <strong>Ragesh K.R</strong> (DoP &amp; Directing), <strong>Nandha Kumar</strong> (Choreographer), <strong>Bharath Vaj</strong> (Chief Editor), and <strong>Kumaren</strong> (Singer &amp; Editor)—is actively staging independent feature narratives, 35mm widescreen shorts, and cinematic festival releases.
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
                      CINEMATOGRAPHY
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                      35mm Anamorphic Primes
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.66rem', color: 'var(--brand-red)', fontFamily: 'monospace', fontWeight: 800, letterSpacing: '0.12em', display: 'block' }}>
                      POST-PRODUCTION
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                      24.00 FPS Master Cut
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.66rem', color: 'var(--brand-red)', fontFamily: 'monospace', fontWeight: 800, letterSpacing: '0.12em', display: 'block' }}>
                      ORIGINAL SCORE
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                      24-Track Original Motifs
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.66rem', color: 'var(--brand-red)', fontFamily: 'monospace', fontWeight: 800, letterSpacing: '0.12em', display: 'block' }}>
                      PRODUCTION MODEL
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                      100% Independent
                    </span>
                  </div>
                </div>

                {/* Teaser Alert CTA */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
                  <button
                    onClick={() => setNotified(true)}
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    aria-label="Subscribe for premiere notifications"
                  >
                    {notified ? <Check size={16} /> : <Bell size={16} />}
                    {notified ? 'TEASER ALERT ACTIVATED!' : 'NOTIFY ME FOR FIRST SCREENINGS'}
                  </button>

                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'monospace' }}>
                    * Official trailers &amp; posters will premiere directly in this theater hub.
                  </span>
                </div>
              </div>
            </div>

            {/* UPCOMING SLATE CARDS (3 Titles in Staging) */}
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
                  PRE-PRODUCTION PIPELINE (UPCOMING RELEASES):
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--brand-red)', fontFamily: 'monospace', fontWeight: 700 }}>
                  SLATE 2026 ACTIVE
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '18px'
                }}
              >
                {upcomingSlate.map((film, idx) => (
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
                          {film.code}
                        </span>
                        <span
                          style={{
                            fontSize: '0.62rem',
                            fontFamily: 'monospace',
                            color: '#FFF',
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            padding: '2px 8px',
                            borderRadius: '2px'
                          }}
                        >
                          {film.status}
                        </span>
                      </div>

                      <h4
                        style={{
                          fontFamily: 'var(--font-headline)',
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          marginBottom: '8px',
                          letterSpacing: '0.04em'
                        }}
                      >
                        {film.title}
                      </h4>

                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '12px' }}>
                        {film.logline}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px' }}>
                      <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: 'var(--text-dim)', display: 'block' }}>
                        {film.aspect}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--brand-red)', fontWeight: 600, marginTop: '2px', display: 'block' }}>
                        {film.credits}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal for active project if opened */}
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </div>
    </section>
  );
}
