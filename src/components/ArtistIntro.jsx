import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Clapperboard,
  Camera,
  Disc,
  Scissors,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Award,
  Sparkles,
  Sliders,
  Film,
  Volume2,
  Mic2,
  Zap
} from 'lucide-react';

export default function ArtistIntro() {
  const [selectedMember, setSelectedMember] = useState(1);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const AUTO_SCROLL_DURATION = 4500; // 4.5 seconds per member
  const TICK_INTERVAL = 50; // update progress every 50ms

  // The 5 Core Members of MC Squad
  const teamMembers = [
    {
      id: 1,
      num: '01',
      name: 'MANI',
      title: 'FOUNDER OF MC SQUAD',
      primaryRole: 'FOUNDER • MUSIC PRODUCER & DIRECTOR',
      secondaryRole: 'Assistant Director (AD) & Sound Architect',
      tag: 'FOUNDER & AUDIO ARCHITECT',
      isFounder: true,
      image: '/Team/mani.png',
      imageAlt: 'Mani — Founder of MC Squad, Music Producer & Director, AD',
      icon: Disc,
      accentColor: 'var(--brand-red)',
      badges: ['FOUNDER OF MC SQUAD', '🏆 2026 BEST STORYTELLING AWARD', 'MUSIC PRODUCER & DIRECTOR', 'ASSISTANT DIRECTOR (AD)'],
      spec: '2026 STORYTELLING AWARDEE • 24-TRACK MASTER • ON-SET AD',
      bio: 'Founder and driving creative force behind MC Squad. Recipient of the prestigious 2026 Best Storytelling Award for raw narrative realism and uncompromising cinema. Directs the sonic identity through heavy 808 sub-bass, original cinematic scores, and high-fidelity audio engineering while anchoring directorial vision and on-set execution as Assistant Director (AD).',
      pipeline: 'Award-Winning Storytelling, Soundtrack Architecture & Directorial Command',
      gear: [
        { label: 'HONOUR', value: '2026 Best Storytelling Award Winner' },
        { label: 'DAW & SYNTHS', value: '24-Track Master Audio Engine' },
        { label: 'BASS FREQ', value: '32Hz Low-End Sub Foundation' },
        { label: 'ON-SET RIG', value: 'Directorial Monitor & AD Comms' }
      ],
      skills: [
        'Award-Winning Storytelling & Screenplay',
        'Original Music Production',
        '808 Sub-Bass & Beats',
        'Audio Engineering & Mastering',
        'On-Set Assistant Direction (AD)'
      ]
    },
    {
      id: 2,
      num: '02',
      name: 'RAGESH K.R',
      title: 'DIRECTOR & DoP',
      primaryRole: 'DIRECTOR OF PHOTOGRAPHY (DoP)',
      secondaryRole: 'Film Director & Colorist',
      tag: 'VISUAL CRAFT & DIRECTION',
      isFounder: false,
      image: '/Team/Ragesh.png',
      imageAlt: 'Ragesh K.R — Director of Photography (DoP), Director, Colorist',
      icon: Camera,
      accentColor: '#38bdf8',
      badges: ['DIRECTOR OF PHOTOGRAPHY (DoP)', 'DIRECTOR', 'COLORIST'],
      spec: '35MM ANAMORPHIC • ARRI / RED 4K • KODAK 2383 DI',
      bio: 'Visual architect of MC Squad cinema. Directs camera choreography, 35mm widescreen composition, and low-light street realism. Shapes overall directorial staging and crafts rich, high-contrast DI film color grading.',
      pipeline: 'Principal Cinematography, Directing & Color Science',
      gear: [
        { label: 'CAMERA RIG', value: 'Arri / RED 4K Cinema Package' },
        { label: 'LENS SET', value: 'T1.5 Master Anamorphic Primes' },
        { label: 'COLOR SUITE', value: 'DaVinci Resolve DI • Kodak 2383' },
        { label: 'LIGHTING', value: 'Low-Light High-Contrast Chiaroscuro' }
      ],
      skills: [
        '35mm Anamorphic Cinematography',
        'Film Direction & Staging',
        'DI Film Color Grading',
        'Low-Light Street Aesthetics'
      ]
    },
    {
      id: 3,
      num: '03',
      name: 'NANDHA KUMAR',
      title: 'LEAD CHOREOGRAPHER',
      primaryRole: 'LEAD CHOREOGRAPHER • DANCER',
      secondaryRole: 'Movement Director & Urban Staging',
      tag: 'CHOREOGRAPHY & URBAN MOVEMENT',
      isFounder: false,
      image: '/Team/Nandha.png',
      imageAlt: 'Nandha Kumar — Lead Choreographer & Dancer of MC Squad',
      icon: Zap,
      accentColor: '#f59e0b',
      badges: ['LEAD CHOREOGRAPHER', 'URBAN HIP-HOP DANCE', 'MOVEMENT DIRECTOR'],
      spec: 'HIP-HOP CYPHER • 808 BEAT LOCK • MOVEMENT DESIGN',
      bio: 'Lead choreographer and movement director of MC Squad. Crafts high-voltage street choreographies, tight cyphers, and bodily rhythmic flows synchronized down to the millisecond with 808 sub-bass drops and cinematic camera moves.',
      pipeline: 'Dance Choreography, Movement Direction & Stage Synchrony',
      gear: [
        { label: 'DANCE STYLES', value: 'Street Hip-Hop, Popping & Locking' },
        { label: 'BEAT SYNCHRONY', value: 'Low-End 808 Dynamic Accents' },
        { label: 'STAGE CRAFT', value: 'Cinematic On-Camera Movement' },
        { label: 'PERFORMANCE', value: 'High-Impact Music Video & Cyphers' }
      ],
      skills: [
        'Hip-Hop & Urban Choreography',
        '808 Beat-Synced Dance Design',
        'On-Camera Movement Direction',
        'Cyphers & Stage Performance'
      ]
    },
    {
      id: 4,
      num: '04',
      name: 'BHARATH VAJ',
      title: 'CHIEF FILM EDITOR',
      primaryRole: 'CHIEF FILM EDITOR',
      secondaryRole: 'Post-Production Lead & Narrative Assembly',
      tag: 'POST-PRODUCTION & CINEMATIC CUT',
      isFounder: false,
      image: '/Team/Bharath.png',
      imageAlt: 'Bharath Vaj — Chief Film Editor of MC Squad',
      icon: Scissors,
      accentColor: '#10b981',
      badges: ['CHIEF FILM EDITOR', 'POST-PRODUCTION LEAD', '24 FPS ASSEMBLY'],
      spec: '24 FPS CONTINUITY • NARRATIVE TIMELINE • SURGICAL CUTS',
      bio: 'Editorial architect of MC Squad cinema. Carves narrative momentum and dramatic tension through surgical cuts, seamless 24 FPS continuity, and visceral rhythmic pacing across films and music videos.',
      pipeline: 'Film Editorial Assembly & Narrative Rhythm',
      gear: [
        { label: 'EDIT SUITE', value: '4K DCI Precision Timeline' },
        { label: 'FRAME RATE', value: '24.000 FPS True Cinematic Sync' },
        { label: 'CUTTING STYLE', value: 'Rhythmic Momentum & Dramatic Tension' },
        { label: 'FINISHING', value: 'Multi-Track Master Film Assembly' }
      ],
      skills: [
        'Narrative Film Editing',
        '24 FPS Offline & Online Cut',
        'Pacing & Dramatic Rhythm',
        'Post-Production Assembly'
      ]
    }
    /* Temporarily removed: Kumaren (Singer & Editor)
    {
      id: 5,
      num: '05',
      name: 'KUMAREN',
      title: 'SINGER & FILM EDITOR',
      primaryRole: 'SINGER • VOCALIST & FILM EDITOR',
      secondaryRole: 'Playback Vocals & Timeline Assembly',
      tag: 'VOCALS & CINEMATIC CUT',
      isFounder: false,
      image: null,
      imageAlt: 'Kumaren — Singer & Film Editor of MC Squad',
      icon: Mic2,
      accentColor: '#ec4899',
      badges: ['SINGER & VOCALIST', 'FILM EDITOR', 'VOCAL CADENCE'],
      spec: 'TAMIL MELODIC VOCALS • CYPHER BARS • TIMELINE ASSEMBLY',
      bio: 'Dual creative powerhouse in MC Squad commanding expressive vocal performances and meticulous timeline editing.',
      pipeline: 'Vocal Performance, Melodic Delivery & Video Editorial Cut',
      gear: [
        { label: 'VOCAL PROFILE', value: 'Soulful Melody & High-Energy Hooks' },
        { label: 'EDITING ENGINE', value: 'Precision Video & Audio Timelines' },
        { label: 'TIMELINE STYLE', value: 'Lyrical Rhythm & Musical Continuity' },
        { label: 'COLLABORATION', value: 'MC Squad Studio Sessions & Direct Cut' }
      ],
      skills: [
        'Playback & Lead Tamil Vocals',
        'Vocal Harmonization & Hooks',
        'Creative Video Timeline Editing',
        'Rhythmic Narrative Assembly'
      ]
    }
    */
  ];

  // Auto-Scroll Loop
  useEffect(() => {
    if (!isAutoScrolling || isHovered) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_INTERVAL / AUTO_SCROLL_DURATION) * 100;
        if (next >= 100) {
          setSelectedMember((curr) => (curr % teamMembers.length) + 1);
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoScrolling, isHovered, teamMembers.length]);

  const handleSelectMember = (id) => {
    setSelectedMember(id);
    setProgress(0);
  };

  const handleNext = () => {
    setSelectedMember((prev) => (prev % teamMembers.length) + 1);
    setProgress(0);
  };

  const handlePrev = () => {
    setSelectedMember((prev) => (prev === 1 ? teamMembers.length : prev - 1));
    setProgress(0);
  };

  const active = teamMembers.find((m) => m.id === selectedMember) || teamMembers[0];
  const ActiveIcon = active.icon;

  return (
    <section
      id="team"
      className="section-padding"
      style={{
        backgroundColor: '#080808',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
      aria-label="Team of MC Squad — 4 Core Creators"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Anchor fallback for legacy links */}
      <div id="the-character" style={{ position: 'absolute', top: 0, left: 0 }} />

      {/* Atmospheric Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '460px',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header & Auto-Scroll Controller */}
        <div style={{ marginBottom: '40px', textAlign: 'center', maxWidth: '840px', margin: '0 auto 40px auto' }}>
          {/* Top Pill: Core Crew Badge + Auto-Scroll Toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
              padding: '6px 18px',
              backgroundColor: 'rgba(20, 20, 20, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '30px',
              marginBottom: '16px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={14} color="var(--brand-red)" />
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.22em',
                  color: '#FFFFFF',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase'
                }}
              >
                THE CORE CREW • 4 VISIONARY CREATORS
              </span>
            </div>

            <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>|</span>

            {/* Auto-Scroll Toggle Button */}
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: isAutoScrolling ? '#22c55e' : 'var(--text-muted)',
                fontSize: '0.7rem',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: '4px'
              }}
              title={isAutoScrolling ? 'Click to pause auto-scroll' : 'Click to resume auto-scroll'}
              aria-label="Toggle Team Auto-Scroll"
            >
              {isAutoScrolling ? (
                <>
                  <span className="pulsing-dot" style={{ backgroundColor: '#22c55e', width: '6px', height: '6px' }} />
                  <Pause size={11} /> AUTO-SCROLL ON
                </>
              ) : (
                <>
                  <Play size={11} color="var(--brand-red)" /> AUTO-SCROLL PAUSED
                </>
              )}
            </button>
          </div>

          <h2
            className="section-title"
            style={{
              fontSize: 'clamp(2.5rem, 5.8vw, 4.5rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '14px'
            }}
          >
            TEAM OF <span style={{ color: 'var(--brand-red)' }}>MC SQUAD</span>
          </h2>

          <p className="section-subtitle" style={{ margin: '0 auto', fontSize: '1.02rem', color: 'var(--text-muted)' }}>
            Four creative pillars commanding original sound, 35mm cinematography, high-voltage choreography, and surgical film editing. 100% independent.
          </p>

          {/* Auto-Scroll Progress Bar */}
          {isAutoScrolling && !isHovered && (
            <div
              style={{
                width: '180px',
                height: '3px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '2px',
                margin: '18px auto 0 auto',
                overflow: 'hidden'
              }}
              title="Auto-scroll countdown"
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: 'var(--brand-red)',
                  transition: 'width 0.05s linear'
                }}
              />
            </div>
          )}
        </div>

        {/* HEROIC 4-MEMBER CARDS LINEUP */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: 'clamp(18px, 2.8vw, 28px)',
            marginBottom: '40px'
          }}
        >
          {teamMembers.map((member) => {
            const isSelected = selectedMember === member.id;
            const Icon = member.icon;

            return (
              <div
                key={member.id}
                onClick={() => handleSelectMember(member.id)}
                style={{
                  backgroundColor: isSelected ? '#121212' : '#0B0B0B',
                  border: isSelected
                    ? `1px solid ${member.accentColor || 'var(--brand-red)'}`
                    : '1px solid rgba(255, 255, 255, 0.09)',
                  borderRadius: '6px',
                  padding: 'clamp(20px, 2.5vw, 28px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  boxShadow: isSelected
                    ? `0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px ${member.accentColor ? `${member.accentColor}33` : 'rgba(229, 9, 20, 0.2)'}`
                    : '0 10px 30px rgba(0, 0, 0, 0.6)',
                  transform: isSelected ? 'translateY(-6px)' : 'translateY(0)'
                }}
                className="team-card-hover"
              >
                {/* Active Member Top Progress Bar */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      backgroundColor: member.accentColor || 'var(--brand-red)',
                      borderTopLeftRadius: '6px',
                      borderTopRightRadius: '6px'
                    }}
                  />
                )}

                {/* Top Corner Badge: Number & Founder Star */}
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: isSelected ? (member.accentColor || 'var(--brand-red)') : 'var(--text-dim)'
                    }}
                  >
                    #{member.num} // PILLAR
                  </span>

                  {member.isFounder ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: 'rgba(229, 9, 20, 0.18)',
                        border: '1px solid var(--brand-red)',
                        color: '#FFF',
                        fontSize: '0.62rem',
                        fontFamily: 'monospace',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '12px',
                        letterSpacing: '0.08em'
                      }}
                    >
                      <Award size={11} color="var(--brand-red)" /> FOUNDER
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontFamily: 'monospace',
                        color: 'var(--text-dim)',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        letterSpacing: '0.08em'
                      }}
                    >
                      CORE CREW
                    </span>
                  )}
                </div>

                {/* Clean Circle Portrait / Fallback Avatar */}
                <div
                  style={{
                    width: 'clamp(115px, 14vw, 150px)',
                    height: 'clamp(115px, 14vw, 150px)',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: isSelected
                      ? `3px solid ${member.accentColor || 'var(--brand-red)'}`
                      : '2px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: isSelected
                      ? `0 12px 36px ${member.accentColor ? `${member.accentColor}44` : 'rgba(229, 9, 20, 0.35)'}`
                      : '0 8px 24px rgba(0, 0, 0, 0.7)',
                    marginBottom: '18px',
                    position: 'relative',
                    flexShrink: 0,
                    backgroundColor: '#0A0A0A',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.imageAlt}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                      className="team-circle-img"
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `radial-gradient(circle at 50% 40%, ${member.accentColor}33, #0a0a0a 85%)`,
                        padding: '12px',
                        textAlign: 'center'
                      }}
                      className="team-circle-img"
                    >
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          backgroundColor: `${member.accentColor}22`,
                          border: `1px solid ${member.accentColor}55`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '6px'
                        }}
                      >
                        <Icon size={24} color={member.accentColor} />
                      </div>
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontFamily: 'monospace',
                          fontWeight: 800,
                          letterSpacing: '0.12em',
                          color: '#FFFFFF'
                        }}
                      >
                        {member.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.52rem',
                          fontFamily: 'monospace',
                          color: member.accentColor,
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          marginTop: '2px'
                        }}
                      >
                        SINGER • EDITOR
                      </span>
                    </div>
                  )}
                </div>

                {/* Member Name */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.7rem, 2.3vw, 2.2rem)',
                    letterSpacing: '0.05em',
                    color: '#FFFFFF',
                    margin: '0 0 6px 0',
                    lineHeight: 1
                  }}
                >
                  {member.name}
                </h3>

                {/* Primary Role */}
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: isSelected ? (member.accentColor || 'var(--brand-red)') : 'var(--text-muted)',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    margin: '0 0 14px 0',
                    lineHeight: 1.4,
                    minHeight: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {member.primaryRole}
                </p>

                {/* Badges Strip */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '5px',
                    marginBottom: '20px',
                    width: '100%'
                  }}
                >
                  {member.badges.map((b, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                        fontSize: '0.64rem',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        padding: '3px 8px',
                        borderRadius: '2px'
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                {/* Bottom Technical Spec Footer */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '14px',
                    width: '100%',
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.68rem',
                    fontFamily: 'monospace',
                    color: isSelected ? '#FFFFFF' : 'var(--text-dim)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icon size={13} color="var(--brand-red)" />
                    <span>{member.tag.split('&')[0]}</span>
                  </div>

                  <span style={{ color: isSelected ? 'var(--brand-red)' : 'var(--text-dim)', fontWeight: 700 }}>
                    {isSelected ? 'IN FOCUS ●' : 'CLICK TO VIEW'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* DETAILED PRODUCTION DOSSIER DECK (Synchronized with Focused Member) */}
        <div
          key={active.id}
          style={{
            backgroundColor: '#0F0F0F',
            border: active.isFounder ? '1px solid rgba(229, 9, 20, 0.4)' : '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '6px',
            padding: 'clamp(24px, 4vw, 42px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'center',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.95)',
            position: 'relative',
            animation: 'fadeInTrio 0.4s ease-out'
          }}
        >
          {/* Left Column: Member Profile & Signature Role */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
              }}
            >
              <span
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  color: 'var(--brand-red)',
                  letterSpacing: '0.2em'
                }}
              >
                MEMBER {active.num} DOSSIER
              </span>
              <span style={{ color: 'var(--text-dim)' }}>•</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                {active.pipeline}
              </span>
            </div>

            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)',
                lineHeight: 1,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                margin: '0 0 14px 0'
              }}
            >
              {active.name} — <span style={{ color: 'var(--brand-red)' }}>{active.title}</span>
            </h4>

            <p
              style={{
                color: '#E0E0E0',
                fontSize: '0.98rem',
                lineHeight: 1.7,
                marginBottom: '24px'
              }}
            >
              {active.bio}
            </p>

            {/* Core Responsibilities Grid */}
            <div style={{ marginBottom: '20px' }}>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'monospace',
                  color: 'var(--text-dim)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                CORE DISCIPLINES &amp; LEADERSHIP:
              </span>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '8px'
                }}
              >
                {active.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '8px 12px',
                      borderRadius: '2px',
                      fontSize: '0.78rem',
                      color: '#FFF'
                    }}
                  >
                    <ChevronRight size={13} color="var(--brand-red)" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Technical Equipment & Pipeline Setup */}
          <div
            style={{
              backgroundColor: '#141414',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '4px',
              padding: '24px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '18px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={16} color="var(--brand-red)" />
                <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 800, color: '#FFF' }}>
                  TECHNICAL SPECIFICATION &amp; PIPELINE
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: 'var(--brand-red)' }}>
                {active.spec.split('•')[0]}
              </span>
            </div>

            {/* Gear List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {active.gear.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '2px',
                    fontSize: '0.76rem',
                    fontFamily: 'monospace'
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handlePrev}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  backgroundColor: '#1E1E1E',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFF',
                  padding: '10px',
                  borderRadius: '3px',
                  fontSize: '0.74rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                aria-label="Previous Team Member"
              >
                <ChevronLeft size={14} /> PREV MEMBER
              </button>

              <button
                onClick={handleNext}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--brand-red)',
                  border: '1px solid var(--brand-red)',
                  color: '#FFF',
                  padding: '10px',
                  borderRadius: '3px',
                  fontSize: '0.74rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                aria-label="Next Team Member"
              >
                NEXT MEMBER <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Trio Synergy Ribbon */}
        <div
          style={{
            marginTop: '32px',
            backgroundColor: '#0D0D0D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '12px 20px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.74rem',
            fontFamily: 'monospace',
            color: 'var(--text-muted)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="pulsing-dot" style={{ backgroundColor: 'var(--brand-red)' }} />
            <span style={{ color: '#FFF', fontWeight: 700 }}>MC SQUAD CREW FORMULA:</span>
            <span>MANI (MUSIC &amp; AD) + RAGESH K.R (DoP &amp; DIRECTING) + NANDHA KUMAR (CHOREOGRAPHER) + BHARATH VAJ (EDITOR)</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {teamMembers.map((m) => (
              <button
                key={m.id}
                onClick={() => handleSelectMember(m.id)}
                style={{
                  background: selectedMember === m.id ? 'var(--brand-red)' : '#1A1A1A',
                  color: selectedMember === m.id ? '#FFF' : 'var(--text-muted)',
                  border: selectedMember === m.id ? '1px solid var(--brand-red)' : '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '3px 8px',
                  fontSize: '0.64rem',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                #{m.num} {m.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .team-card-hover:hover {
          border-color: rgba(229, 9, 20, 0.6) !important;
        }
        .team-circle-img:hover {
          transform: scale(1.05);
        }
        @keyframes fadeInTrio {
          from {
            opacity: 0.35;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
