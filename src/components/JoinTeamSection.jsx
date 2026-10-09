import React, { useState } from 'react';
import { Send, CheckCircle2, User, Phone, MapPin, Briefcase, Award, Link as LinkIcon, MessageSquare, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './Icons';

const AVAILABLE_ROLES = [
  { id: 'junior-artist', label: 'Junior Artist / Actor', tamil: 'ஜூனியர் ஆர்ட்டிஸ்ட் / நடிகர்', icon: '🎭' },
  { id: 'singer', label: 'Singer / Vocalist', tamil: 'பாடகர் / பாடகி', icon: '🎤' },
  { id: 'lyricist', label: 'Lyricist / Songwriter', tamil: 'பாடலாசிரியர்', icon: '✍️' },
  { id: 'music-composer', label: 'Music Composer / Beat Producer', tamil: 'இசையமைப்பாளர் / பீட் மேக்கர்', icon: '🎹' },
  { id: 'cinematographer', label: 'Cinematographer / DOP', tamil: 'ஒளிப்பதிவாளர் (DOP)', icon: '🎥' },
  { id: 'video-editor', label: 'Video Editor / Colorist', tamil: 'வீடியோ எடிட்டர் / கலரிஸ்ட்', icon: '🎬' },
  { id: 'scriptwriter', label: 'Scriptwriter / Dialogue Writer', tamil: 'திரைக்கதை / வசனம்', icon: '📝' },
  { id: 'sound-engineer', label: 'Sound Designer / Audio Mixing', tamil: 'ஒலி வடிவமைப்பாளர்', icon: '🔊' },
  { id: 'production-crew', label: 'Assistant Director / Crew', tamil: 'உதவி இயக்குநர் / தயாரிப்பு', icon: '📽️' },
  { id: 'other', label: 'Other Talents / All-Rounder', tamil: 'இதர கலைத் திறமைகள்', icon: '⭐' },
];

const EXPERIENCE_LEVELS = [
  { id: 'fresher', label: 'Fresher / Beginner', tamil: 'ஆரம்ப நிலை / புதியவர்' },
  { id: '1-2-years', label: '1 - 2 Years Experience', tamil: '1 - 2 ஆண்டுகள் அனுபவம்' },
  { id: 'experienced', label: '3+ Years / Professional', tamil: 'அனுபவம் வாய்ந்தவர்' },
];

export default function JoinTeamSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    experience: 'fresher',
    portfolio: '',
    message: '',
  });

  const [selectedRoles, setSelectedRoles] = useState(['junior-artist']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const targetWhatsApp = '918270374293'; // +91 8270374293

  const handleRoleToggle = (roleId) => {
    setSelectedRoles((prev) => {
      if (prev.includes(roleId)) {
        if (prev.length === 1) return prev; // Keep at least one role
        return prev.filter((r) => r !== roleId);
      }
      return [...prev, roleId];
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name (உங்கள் பெயரை உள்ளிடவும்)');
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your WhatsApp phone number (உங்கள் வாட்ஸ்அப் எண்ணை உள்ளிடவும்)');
      return;
    }

    if (!formData.city.trim()) {
      setErrorMessage('Please enter your city/location (உங்கள் ஊரை உள்ளிடவும்)');
      return;
    }

    if (selectedRoles.length === 0) {
      setErrorMessage('Please select at least one role you are interested in.');
      return;
    }

    // Map role IDs to human readable labels
    const roleLabels = selectedRoles.map((rId) => {
      const match = AVAILABLE_ROLES.find((r) => r.id === rId);
      return match ? `${match.icon} ${match.label} (${match.tamil})` : rId;
    });

    const expLabel = EXPERIENCE_LEVELS.find((e) => e.id === formData.experience)?.label || formData.experience;

    // Compose formatted WhatsApp Message
    const textLines = [
      '🎬 *NEW MC SQUAD CREW APPLICATION* 🎬',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `👤 *Candidate Name:* ${formData.name.trim()}`,
      `📱 *WhatsApp Contact:* ${formData.phone.trim()}`,
      `📍 *Location / City:* ${formData.city.trim()}`,
      '',
      `🎭 *Interested Role(s):*`,
      ...roleLabels.map((rl) => `  • ${rl}`),
      '',
      `⭐ *Experience Level:* ${expLabel}`,
      formData.portfolio.trim() ? `🔗 *Portfolio / Demo Link:* ${formData.portfolio.trim()}` : null,
      formData.message.trim() ? `💬 *About / Message:* ${formData.message.trim()}` : null,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '📩 _Submitted via MC Squad Official Website_',
      `🕒 _Time: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}_`
    ].filter(Boolean);

    const fullMessage = textLines.join('\n');
    const waUrl = `https://wa.me/${targetWhatsApp}?text=${encodeURIComponent(fullMessage)}`;

    setIsSubmitted(true);

    // Open WhatsApp in new tab/app
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <section
      id="join-team"
      className="section-padding"
      style={{
        position: 'relative',
        backgroundColor: '#070709',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        overflow: 'hidden'
      }}
    >
      {/* Background Cinematic Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
          <div className="title-tag">
            <span>MC SQUAD TALENT RECRUITMENT • இணைந்திடுங்கள்</span>
          </div>
          <h2 className="section-title">
            JOIN THE <span style={{ color: 'var(--brand-red)' }}>CREW</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We are actively scouting passionate artists, singers, lyricists, actors & technicians for MC Squad's upcoming indie feature films, original music videos, and cinematic projects. Fill out the application below — it will be delivered directly to our founder Mani on WhatsApp!
          </p>
        </div>

        {/* Form Container */}
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            backgroundColor: '#0F1015',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: 'clamp(20px, 4vw, 44px)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(229, 9, 20, 0.15)'
          }}
        >
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10B981',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto'
                }}
              >
                <CheckCircle2 size={40} />
              </div>
              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '10px'
                }}
              >
                Application Formatted!
              </h3>
              <p style={{ color: '#A1A1AA', fontSize: '0.98rem', maxWidth: '520px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
                Your details have been compiled and sent to founder <strong style={{ color: '#FFFFFF' }}>Mani (+91 8270374293)</strong> via WhatsApp. If WhatsApp did not open automatically, tap the button below.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
                <a
                  href={`https://wa.me/${targetWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    backgroundColor: '#25D366',
                    borderColor: '#25D366',
                    borderRadius: '8px',
                    padding: '12px 28px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    fontWeight: 700
                  }}
                >
                  <WhatsAppIcon size={20} />
                  <span>OPEN WHATSAPP CHAT</span>
                </a>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary"
                  style={{ borderRadius: '8px', padding: '12px 24px' }}
                >
                  SUBMIT ANOTHER FORM
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <div
                  style={{
                    backgroundColor: 'rgba(229, 9, 20, 0.15)',
                    border: '1px solid var(--brand-red)',
                    color: '#FF8A8A',
                    padding: '12px 18px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span>⚠️</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Basic Details Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '20px',
                  marginBottom: '28px'
                }}
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="team-name"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#E4E4E7',
                      letterSpacing: '0.04em',
                      marginBottom: '8px'
                    }}
                  >
                    <User size={15} color="var(--brand-red)" />
                    FULL NAME (பெயர்) <span style={{ color: 'var(--brand-red)' }}>*</span>
                  </label>
                  <input
                    id="team-name"
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      backgroundColor: '#161820',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#FFFFFF',
                      fontSize: '0.94rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--brand-red)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                  />
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label
                    htmlFor="team-phone"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#E4E4E7',
                      letterSpacing: '0.04em',
                      marginBottom: '8px'
                    }}
                  >
                    <Phone size={15} color="#25D366" />
                    WHATSAPP NUMBER (வாட்ஸ்அப் எண்) <span style={{ color: 'var(--brand-red)' }}>*</span>
                  </label>
                  <input
                    id="team-phone"
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      backgroundColor: '#161820',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#FFFFFF',
                      fontSize: '0.94rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#25D366')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                  />
                </div>

                {/* City / Location */}
                <div>
                  <label
                    htmlFor="team-city"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#E4E4E7',
                      letterSpacing: '0.04em',
                      marginBottom: '8px'
                    }}
                  >
                    <MapPin size={15} color="var(--brand-red)" />
                    CITY / HOMETOWN (வசிக்கும் ஊர்) <span style={{ color: 'var(--brand-red)' }}>*</span>
                  </label>
                  <input
                    id="team-city"
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Chennai / Madurai / Coimbatore"
                    value={formData.city}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      backgroundColor: '#161820',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#FFFFFF',
                      fontSize: '0.94rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--brand-red)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                  />
                </div>
              </div>

              {/* 2. Role Selector (Multi-Select Chips) */}
              <div style={{ marginBottom: '28px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#E4E4E7',
                    letterSpacing: '0.04em',
                    marginBottom: '10px'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Briefcase size={15} color="var(--brand-red)" />
                    INTERESTED ROLE / FIELD (ஆர்வமுள்ள துறை) <span style={{ color: 'var(--brand-red)' }}>*</span>
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#71717A', fontWeight: 500 }}>
                    (Select one or multiple)
                  </span>
                </label>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '10px'
                  }}
                >
                  {AVAILABLE_ROLES.map((role) => {
                    const isSelected = selectedRoles.includes(role.id);
                    return (
                      <button
                        type="button"
                        key={role.id}
                        onClick={() => handleRoleToggle(role.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? 'rgba(229, 9, 20, 0.16)' : '#14161E',
                          border: isSelected ? '1px solid var(--brand-red)' : '1px solid rgba(255, 255, 255, 0.08)',
                          color: isSelected ? '#FFFFFF' : '#A1A1AA',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ fontSize: '1.15rem' }}>{role.icon}</span>
                        <div style={{ overflow: 'hidden' }}>
                          <span
                            style={{
                              display: 'block',
                              fontSize: '0.84rem',
                              fontWeight: isSelected ? 700 : 500,
                              color: isSelected ? '#FFFFFF' : '#E4E4E7'
                            }}
                          >
                            {role.label}
                          </span>
                          <span
                            style={{
                              display: 'block',
                              fontSize: '0.72rem',
                              color: isSelected ? 'var(--brand-red)' : '#71717A'
                            }}
                          >
                            {role.tamil}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Experience & Portfolio Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '20px',
                  marginBottom: '28px'
                }}
              >
                {/* Experience */}
                <div>
                  <label
                    htmlFor="team-experience"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#E4E4E7',
                      letterSpacing: '0.04em',
                      marginBottom: '8px'
                    }}
                  >
                    <Award size={15} color="var(--brand-red)" />
                    EXPERIENCE LEVEL (அனுபவம்)
                  </label>
                  <select
                    id="team-experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      backgroundColor: '#161820',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#FFFFFF',
                      fontSize: '0.92rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {EXPERIENCE_LEVELS.map((exp) => (
                      <option key={exp.id} value={exp.id} style={{ backgroundColor: '#161820', color: '#FFF' }}>
                        {exp.label} ({exp.tamil})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Portfolio Link */}
                <div>
                  <label
                    htmlFor="team-portfolio"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#E4E4E7',
                      letterSpacing: '0.04em',
                      marginBottom: '8px'
                    }}
                  >
                    <LinkIcon size={15} color="var(--brand-red)" />
                    DEMO / PORTFOLIO LINK (ஆடியோ/வீடியோ லிங்க்)
                  </label>
                  <input
                    id="team-portfolio"
                    type="url"
                    name="portfolio"
                    placeholder="YouTube / Google Drive / Instagram Link"
                    value={formData.portfolio}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      backgroundColor: '#161820',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#FFFFFF',
                      fontSize: '0.94rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--brand-red)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                  />
                </div>
              </div>

              {/* 4. Message / Intro Note */}
              <div style={{ marginBottom: '28px' }}>
                <label
                  htmlFor="team-message"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#E4E4E7',
                    letterSpacing: '0.04em',
                    marginBottom: '8px'
                  }}
                >
                  <MessageSquare size={15} color="var(--brand-red)" />
                  ABOUT YOURSELF / SHORT NOTE (உங்களைப் பற்றி சுருக்கமாக)
                </label>
                <textarea
                  id="team-message"
                  name="message"
                  rows={3}
                  placeholder="Share a few words about your passion, previous projects, or how you want to contribute..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    backgroundColor: '#161820',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#FFFFFF',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '80px',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--brand-red)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                />
              </div>

              {/* 5. Submit Button & Target Notice */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  paddingTop: '8px'
                }}
              >
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    maxWidth: '460px',
                    backgroundColor: '#25D366',
                    border: 'none',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    padding: '16px 28px',
                    fontSize: '0.96rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1EBE5D')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
                >
                  <WhatsAppIcon size={22} />
                  <span>SUBMIT APPLICATION VIA WHATSAPP</span>
                  <Send size={16} />
                </button>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.8rem',
                    color: '#A1A1AA',
                    textAlign: 'center'
                  }}
                >
                  <Sparkles size={14} color="#E50914" />
                  <span>
                    Direct application sent to Founder <strong style={{ color: '#FFFFFF' }}>Mani (+91 8270374293)</strong>
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
