import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from './Icons';

export default function SocialSection() {
  const socials = [
    {
      name: 'INSTAGRAM',
      handle: '@mc_squad_offical',
      metric: 'Official Studio Hub',
      desc: 'Daily studio stories, guerrilla reels, music releases, and behind-the-scenes film stills.',
      url: 'https://www.instagram.com/mc_squad_offical/',
      icon: InstagramIcon,
      accent: '#E1306C'
    },
    {
      name: 'LINKEDIN',
      handle: 'Mani • MC Squad',
      metric: 'Production & Directing',
      desc: 'Creative direction, brand collaborations, film scoring and commercial inquiries.',
      url: 'https://linkedin.com',
      icon: LinkedinIcon,
      accent: '#0A66C2'
    }
  ];

  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: '#0A0A0A',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)'
      }}
      aria-label="Social Channels and Community"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '44px' }}>
          <div className="title-tag">THE COMMUNITY &amp; NETWORK</div>
          <h2 className="section-title">FOLLOW THE JOURNEY</h2>
          <p className="section-subtitle">
            Tune in to real-time releases, live concert announcements, and independent cinema workshops across our official hubs.
          </p>
        </div>

        {/* Large Social Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}
        >
          {socials.map((soc) => {
            const Icon = soc.icon;
            return (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cinematic-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '28px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  backgroundColor: '#121212',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all var(--transition-smooth)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '2px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--brand-red)'
                    }}
                    className="social-icon-box"
                  >
                    <Icon size={24} />
                  </div>

                  <ArrowUpRight size={20} color="var(--text-muted)" className="social-arrow" />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.9rem',
                    letterSpacing: '0.06em',
                    color: '#FFFFFF',
                    margin: '0 0 4px 0',
                    lineHeight: 1
                  }}
                >
                  {soc.name}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--brand-red)', fontWeight: 600, marginBottom: '12px' }}>
                  {soc.handle}
                </p>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px', flexGrow: 1 }}>
                  {soc.desc}
                </p>

                <div
                  style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: '#E0E0E0',
                    fontWeight: 600
                  }}
                >
                  <span>{soc.metric}</span>
                  <span style={{ color: 'var(--brand-red)', letterSpacing: '0.08em' }}>JOIN →</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        .cinematic-card:hover .social-icon-box {
          background-color: var(--brand-red) !important;
          color: #FFFFFF !important;
          box-shadow: 0 0 15px var(--brand-red-glow);
        }
        .cinematic-card:hover .social-arrow {
          color: var(--brand-red) !important;
          transform: translate(2px, -2px);
        }
      `}</style>
    </section>
  );
}
