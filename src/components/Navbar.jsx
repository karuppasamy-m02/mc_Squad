import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Navbar({ onOpenMusicWeb }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section spy without gallery
      const sections = ['home', 'team', 'the-character', 'films', 'music', 'videos', 'join-team', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section === 'the-character' ? 'team' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home', id: 'home' },
    { name: 'TEAM', href: '#team', id: 'team' },
    { name: 'FILMS', href: '#films', id: 'films' },
    { name: 'MUSIC WEB ↗', href: '#music', id: 'music' },
    { name: 'VIDEOS', href: '#videos', id: 'videos' },
    { name: 'JOIN TEAM', href: '#join-team', id: 'join-team' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#music' && onOpenMusicWeb) {
      onOpenMusicWeb();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-2' : 'bg-transparent py-4'
          }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          transition: 'all 0.3s ease',
          backgroundColor: isScrolled ? 'rgba(8, 8, 8, 0.95)' : 'rgba(8, 8, 8, 0.65)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(6px)',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'blur(6px)',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          padding: isScrolled ? '10px 0' : '18px 0'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Top ONLY Logo: Enlarged, Crisp, Clean, NOT Glowing, No Text */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              lineHeight: 0
            }}
            aria-label="MC Squad Home"
          >
            <img
              src="/logo-darkmode.png"
              alt="MC Squad"
              style={{
                height: 'clamp(46px, 5.5vw, 58px)',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
                // No glow, no drop-shadow, perfectly clean and visible
              }}
            />
          </a>

          {/* Desktop Nav */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '28px'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textDecoration: 'none',
                  color: activeSection === link.id ? '#FFFFFF' : 'var(--text-muted)',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 0.2s ease'
                }}
                className="nav-link-item"
              >
                {link.name}
                {activeSection === link.id && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--brand-red)'
                    }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Social Icons & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              className="desktop-socials"
              style={{ display: 'none', alignItems: 'center', gap: '10px' }}
            >
              <a
                href="https://www.instagram.com/mc_squad_offical/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                style={{ width: '38px', height: '38px' }}
                aria-label="Official Instagram @mc_squad_offical"
                title="Follow @mc_squad_offical on Instagram"
              >
                <InstagramIcon size={16} />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn"
              style={{
                background: 'transparent',
                border: '1px solid var(--border-subtle)',
                color: '#F5F5F5',
                width: '42px',
                height: '42px',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Cinematic Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(8, 8, 8, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '32px 24px',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {/* Header in Overlay: Only Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <img
              src="/logo-white-rim.png"
              alt="MC Squad"
              style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                background: 'none',
                border: '1px solid var(--border-subtle)',
                color: '#FFF',
                width: '42px',
                height: '42px',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Close navigation"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '18px', margin: '30px 0' }}>
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.7rem, 6vw, 2.4rem)',
                  textDecoration: 'none',
                  color: activeSection === link.id ? 'var(--brand-red)' : '#F5F5F5',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'transform 0.2s ease, color 0.2s ease'
                }}
              >
                <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-body)', color: 'var(--brand-red)', fontWeight: 700 }}>
                  0{idx + 1}
                </span>
                {link.name}
              </a>
            ))}
          </nav>

          {/* Footer in Overlay */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>
              Independent Cinema &amp; Original Sound
            </p>
            <div style={{ display: 'flex', gap: '14px' }}>
              <a
                href="https://www.instagram.com/mc_squad_offical/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="Official Instagram @mc_squad_offical"
                title="Follow @mc_squad_offical on Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Media query styling for responsive desktop nav */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-socials {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
        .nav-link-item:hover {
          color: #FFFFFF !important;
        }
      `}</style>
    </>
  );
}
