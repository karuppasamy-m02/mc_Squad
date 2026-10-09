import React from 'react';
import { ArrowUp } from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from './Icons';

export default function Footer({ onOpenMusicWeb }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'TEAM OF MC SQUAD', href: '#team' },
    { name: 'FILMS', href: '#films' },
    { name: 'MUSIC WEB ↗', href: '#music' },
    { name: 'VIDEOS', href: '#videos' },
    { name: 'JOIN TEAM', href: '#join-team' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <footer
      style={{
        backgroundColor: '#050505',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '64px',
        paddingBottom: '100px',
        position: 'relative'
      }}
      aria-label="Footer"
    >
      <div className="container">
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '360px' }}>
            <div style={{ marginBottom: '18px' }}>
              <img
                src="/logo-white-rim.png"
                alt="MC Squad"
                style={{
                  height: '56px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              Independent Cinema, character-driven narratives, and original soundscapes created without corporate compromise.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://www.instagram.com/mc_squad_offical/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="Official Instagram @mc_squad_offical"
                title="Follow @mc_squad_offical on Instagram"
              >
                <InstagramIcon size={17} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
                <LinkedinIcon size={17} />
              </a>
            </div>
          </div>

          {/* Quick Nav Col (Without Gallery) */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '0.88rem',
                color: 'var(--brand-red)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '18px'
              }}
            >
              NAVIGATION
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      transition: 'color 0.2s ease'
                    }}
                    className="footer-nav-link"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Production Studio Col */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '0.88rem',
                color: 'var(--brand-red)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '18px'
              }}
            >
              CREATIVE DISCIPLINES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              <li>Directorial Vision &amp; Storyboards</li>
              <li>Lead Character &amp; Screen Presence</li>
              <li>Original Background Scoring</li>
              <li>Anamorphic 35mm Cinematography</li>
              <li>Street Rhythm &amp; Hip-Hop</li>
              <li>Guerrilla Post-Production &amp; Sound</li>
            </ul>
          </div>

          {/* Back to top & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '0.88rem',
                  color: 'var(--brand-red)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                STUDIO HEADQUARTERS
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                MC Squad Independent Studio<br />
                Chennai, India
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="btn-outline-red"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px' }}
              aria-label="Scroll back to top"
            >
              <ArrowUp size={16} /> BACK TO TOP
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', margin: 0 }}>
            © 2026 MC Squad. All Rights Reserved. Independent Film &amp; Music Production.
          </p>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', margin: 0 }}>
            Founded &amp; Directed by MC Squad Creator
          </p>
        </div>
      </div>

      <style>{`
        .footer-nav-link:hover {
          color: #FFFFFF !important;
        }
      `}</style>
    </footer>
  );
}
