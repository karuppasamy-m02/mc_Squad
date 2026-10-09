import React, { useState } from 'react';
import { Mail, Copy, Check, Send, MapPin, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Contact() {
  const contactEmail = 'contact@mcsquad.in';
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Music Feature / Verse',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const subject = encodeURIComponent(`[MC Squad Inquiries: ${formData.projectType}] From ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Mani & MC Squad Team,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}\n\nSent via MC Squad Portfolio.`
    );

    // Open default email client with pre-filled draft
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)'
      }}
      aria-label="Contact and Collaboration Inquiries"
    >
      <div className="container">
        {/* Section Heading */}
        <div style={{ marginBottom: '48px' }}>
          <div className="title-tag">INITIATE COLLABORATION</div>
          <h2 className="section-title">LET'S CREATE.</h2>
          <p className="section-subtitle">
            For music, film, collaboration and creative projects. We are open for selective independent productions and visionary partnerships.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Direct Contact Cards & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email Contact Card */}
            <div
              style={{
                backgroundColor: '#111111',
                border: '1px solid var(--border-subtle)',
                padding: '28px',
                borderRadius: '2px',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '2px',
                    backgroundColor: 'rgba(229, 9, 20, 0.1)',
                    border: '1px solid var(--brand-red)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-red)'
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                    OFFICIAL DIRECT INBOX
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>
                    {contactEmail}
                  </h4>
                </div>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                Direct channel to Mani and the executive production crew. Inquiries are reviewed within 48 hours.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: copied ? '#1e3820' : '#1c1c1c',
                    border: copied ? '1px solid #4ade80' : '1px solid var(--border-subtle)',
                    color: copied ? '#4ade80' : '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '10px 18px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  aria-label="Copy contact email"
                >
                  {copied ? (
                    <>
                      <Check size={16} /> COPIED TO CLIPBOARD
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> COPY EMAIL
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${contactEmail}`}
                  className="btn-outline-red"
                  style={{ fontSize: '0.8rem', padding: '10px 18px' }}
                >
                  SEND EMAIL DIRECTLY
                </a>
              </div>
            </div>

            {/* Social Direct Touchpoint */}
            <div>
              <a
                href="https://www.instagram.com/mc_squad_offical/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#111111',
                  border: '1px solid var(--border-subtle)',
                  padding: '20px 24px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'border-color 0.2s ease, transform 0.2s ease'
                }}
                className="contact-card-sub"
                title="Follow @mc_squad_offical on Instagram"
                aria-label="Official Instagram @mc_squad_offical"
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '2px',
                    backgroundColor: 'rgba(229, 9, 20, 0.08)',
                    border: '1px solid rgba(229, 9, 20, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <InstagramIcon size={22} color="var(--brand-red)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--brand-red)', letterSpacing: '0.12em', fontWeight: 700 }}>
                      OFFICIAL INSTAGRAM
                    </span>
                    <span style={{ fontSize: '0.65rem', color: '#10B981', fontFamily: 'monospace' }}>● ACTIVE</span>
                  </div>
                  <p style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: 700, margin: '2px 0 0 0', letterSpacing: '0.02em' }}>
                    @mc_squad_offical
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                    Direct message for features, score inquiries &amp; behind-the-scenes
                  </p>
                </div>
                <ArrowRight size={18} color="var(--brand-red)" />
              </a>
            </div>

            {/* Base Location */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                padding: '16px 20px',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <MapPin size={20} color="var(--brand-red)" />
              <div>
                <p style={{ fontSize: '0.88rem', color: '#FFFFFF', fontWeight: 600, margin: 0 }}>
                  Chennai, India
                </p>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Underground Studio • Available for global location shoots &amp; scoring
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Frontend Contact Form */}
          <div
            style={{
              backgroundColor: '#111111',
              border: '1px solid var(--border-subtle)',
              padding: 'clamp(24px, 4vw, 36px)',
              borderRadius: '2px'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '6px',
                letterSpacing: '0.04em'
              }}
            >
              SEND PROJECT PROPOSAL
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Fill in your details below. Clicking send opens your default mail client with your pre-formatted brief ready to dispatch.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '8px' }}
                >
                  YOUR NAME / PRODUCTION HOUSE *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Karthik Raj / Studio Wave"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    padding: '12px 16px',
                    borderRadius: '2px',
                    outline: 'none'
                  }}
                  className="form-input"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '8px' }}
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    padding: '12px 16px',
                    borderRadius: '2px',
                    outline: 'none'
                  }}
                  className="form-input"
                />
              </div>

              {/* Project Type */}
              <div>
                <label
                  htmlFor="contact-project-type"
                  style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '8px' }}
                >
                  PROJECT CATEGORY
                </label>
                <select
                  id="contact-project-type"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    padding: '12px 16px',
                    borderRadius: '2px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  className="form-input"
                >
                  <option value="Music Feature / Verse">Music Feature / Verse Collaboration</option>
                  <option value="Film Direction / Cinematography">Film Direction / Cinematography</option>
                  <option value="Full Music Video Production">Full Music Video Production</option>
                  <option value="Film Scoring / Soundtrack">Film Scoring / Original Soundtrack</option>
                  <option value="Live Concert Booking">Live Concert Booking / Cypher Host</option>
                  <option value="Independent Creative Workshop">Independent Creative Workshop</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '8px' }}
                >
                  PROJECT DETAILS &amp; TIMELINE *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Outline your vision, reference sounds/films, dates, and budget parameters..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    padding: '12px 16px',
                    borderRadius: '2px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  className="form-input"
                />
              </div>

              {/* Submit / Mailto Button */}
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '14px', marginTop: '8px' }}
              >
                <Send size={16} /> DISPATCH VIA MAIL CLIENT
              </button>

              {formSubmitted && (
                <div
                  style={{
                    backgroundColor: 'rgba(229, 9, 20, 0.1)',
                    border: '1px solid var(--brand-red)',
                    padding: '12px 16px',
                    borderRadius: '2px',
                    fontSize: '0.82rem',
                    color: '#FFFFFF',
                    lineHeight: 1.5
                  }}
                >
                  Your email client has been summoned with your formatted proposal. If it didn't open automatically, click <strong>"COPY EMAIL"</strong> above to send directly to <code>{contactEmail}</code>.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .form-input:focus {
          border-color: var(--brand-red) !important;
          box-shadow: 0 0 10px rgba(229, 9, 20, 0.2);
        }
        .contact-card-sub:hover {
          border-color: var(--brand-red) !important;
        }
      `}</style>
    </section>
  );
}
