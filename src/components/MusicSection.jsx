import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Music, Disc, UploadCloud, Info, Play, PlusCircle } from 'lucide-react';
import { musicData, genresList } from '../data/music';
import MusicCard from './MusicCard';

export default function MusicSection({ currentSong, isPlaying, onPlayToggle, onOpenMusicWeb }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [showUploadGuide, setShowUploadGuide] = useState(false);

  // Dynamically extract unique years from data
  const availableYears = useMemo(() => {
    if (musicData.length === 0) return ['All', '2026'];
    const years = Array.from(new Set(musicData.map((s) => s.year))).sort((a, b) => b - a);
    return ['All', ...years];
  }, []);

  // Filtered music list
  const filteredSongs = useMemo(() => {
    return musicData.filter((song) => {
      const matchesSearch =
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (song.tagline && song.tagline.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesGenre =
        selectedGenre === 'All' || song.genre.toLowerCase() === selectedGenre.toLowerCase();

      const matchesYear = selectedYear === 'All' || song.year === selectedYear;

      return matchesSearch && matchesGenre && matchesYear;
    });
  }, [searchQuery, selectedGenre, selectedYear]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedYear('All');
  };

  return (
    <section
      id="music"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)'
      }}
      aria-label="MC Squad Music Catalog"
    >
      <div className="container">
        {/* Section Header with Direct Launch Button to Music Web */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          <div>
            <div className="title-tag">DISCOGRAPHY &amp; SOUNDTRACKS</div>
            <h2 className="section-title" style={{ marginBottom: '8px' }}>MUSIC VAULT</h2>
            <p className="section-subtitle" style={{ margin: 0 }}>
              Original music, soulful melodies, heavy 808 street beats, and horror/thriller background scores produced by Mani.
            </p>
          </div>

          {onOpenMusicWeb && (
            <button
              onClick={onOpenMusicWeb}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                fontSize: '0.82rem',
                letterSpacing: '0.08em'
              }}
            >
              <Music size={16} />
              OPEN FULL MUSIC VAULT &amp; SPOTIFY STREAM ↗
            </button>
          )}
        </div>

        {/* Catalog Content: If tracks exist, show filters + grid; if empty, show cinematic upload-ready state */}
        {musicData.length > 0 ? (
          <>
            {/* Controls Bar: Search + Genre + Year Filter */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '40px',
                backgroundColor: '#0F0F0F',
                border: '1px solid var(--border-subtle)',
                padding: '24px',
                borderRadius: '2px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                {/* Search Input */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 16px',
                    borderRadius: '2px',
                    flexGrow: 1,
                    maxWidth: '480px'
                  }}
                >
                  <Search size={18} color="var(--brand-red)" />
                  <input
                    type="text"
                    placeholder="Search tracks, lyrics, mood..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      width: '100%'
                    }}
                    aria-label="Search music catalog"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                      aria-label="Clear search"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                {/* Year Selector & Counter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <SlidersHorizontal size={16} color="var(--text-muted)" />
                    <label htmlFor="year-select" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      YEAR:
                    </label>
                    <select
                      id="year-select"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        padding: '8px 12px',
                        borderRadius: '2px',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {availableYears.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr === 'All' ? 'All Years' : yr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
                    {filteredSongs.length} {filteredSongs.length === 1 ? 'TRACK' : 'TRACKS'}
                  </span>
                </div>
              </div>

              {/* Genre Pills */}
              <div className="filter-tabs">
                {genresList.map((genre) => (
                  <button
                    key={genre}
                    className={`filter-tab ${selectedGenre === genre ? 'active' : ''}`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Music Catalog Grid */}
            {filteredSongs.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 'clamp(20px, 3vw, 32px)'
                }}
              >
                {filteredSongs.map((song) => (
                  <MusicCard
                    key={song.id}
                    song={song}
                    isPlaying={isPlaying}
                    isCurrentSong={currentSong?.id === song.id}
                    onPlayToggle={onPlayToggle}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: '60px 24px',
                  textAlign: 'center',
                  backgroundColor: '#0F0F0F',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px'
                }}
              >
                <p style={{ fontFamily: 'var(--font-headline)', fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '8px' }}>
                  No tracks found matching your filters.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                  Try resetting the search keyword or genre filter.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="btn-outline-red"
                  style={{ display: 'inline-flex' }}
                >
                  <RotateCcw size={16} /> RESET FILTERS
                </button>
              </div>
            )}
          </>
        ) : (
          /* High-End Empty / Staging State Ready for User's Uploads */
          <div
            style={{
              backgroundColor: '#0E0E0E',
              border: '1px solid var(--border-subtle)',
              borderLeft: '4px solid var(--brand-red)',
              borderRadius: '2px',
              padding: 'clamp(32px, 6vw, 56px)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Watermark Disc in Background */}
            <div
              style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                opacity: 0.04,
                pointerEvents: 'none'
              }}
            >
              <Disc size={280} color="#FFFFFF" />
            </div>

            <div style={{ maxWidth: '720px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(229, 9, 20, 0.12)',
                  border: '1px solid var(--brand-red)',
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: '2px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '18px'
                }}
              >
                <Disc size={14} color="var(--brand-red)" />
                TRACK RELEASES DROPPING SOON
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                  marginBottom: '16px'
                }}
              >
                ALL SAMPLE SONGS REMOVED — READY FOR YOUR REAL MUSIC
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '28px' }}>
                All mock songs have been removed as requested. The audio player and music grid are completely clean and ready to play your real audio files, album covers, and lyrics the moment you upload them into React data!
              </p>

              {/* Studio Parameters Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '32px',
                  backgroundColor: '#141414',
                  padding: '20px',
                  borderRadius: '2px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--brand-red)', letterSpacing: '0.12em', fontWeight: 700 }}>
                    SUPPORTED FORMATS
                  </span>
                  <p style={{ fontSize: '0.92rem', color: '#FFFFFF', fontWeight: 600, margin: '2px 0 0 0' }}>
                    MP3, WAV, AAC
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--brand-red)', letterSpacing: '0.12em', fontWeight: 700 }}>
                    STREAMING & SOCIAL
                  </span>
                  <p style={{ fontSize: '0.92rem', color: '#FFFFFF', fontWeight: 600, margin: '2px 0 0 0' }}>
                    Official Instagram &amp; Vault
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--brand-red)', letterSpacing: '0.12em', fontWeight: 700 }}>
                    INTEGRATED PLAYER
                  </span>
                  <p style={{ fontSize: '0.92rem', color: '#FFFFFF', fontWeight: 600, margin: '2px 0 0 0' }}>
                    HTML5 Seamless Playback
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowUploadGuide(!showUploadGuide)}
                className="btn-outline-red"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <PlusCircle size={16} />
                {showUploadGuide ? 'HIDE UPLOAD STEPS' : 'HOW TO UPLOAD YOUR SONGS TO REACT'}
              </button>

              {/* Upload steps expansion */}
              {showUploadGuide && (
                <div
                  style={{
                    marginTop: '24px',
                    padding: '20px',
                    backgroundColor: '#121212',
                    border: '1px solid rgba(229, 9, 20, 0.35)',
                    borderRadius: '2px'
                  }}
                  className="animate-slide-up"
                >
                  <h4 style={{ fontFamily: 'var(--font-headline)', color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '8px' }}>
                    Step-by-Step: Adding Real Music
                  </h4>
                  <ol style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                    <li>Copy your audio files (e.g. <code>my-song.mp3</code>) into <code style={{ color: 'var(--brand-red)' }}>/public/music/</code></li>
                    <li>Copy your square cover artwork (e.g. <code>my-cover.jpg</code>) into <code style={{ color: 'var(--brand-red)' }}>/public/music/</code></li>
                    <li>Open <code style={{ color: 'var(--brand-red)' }}>src/data/music.js</code> in your editor</li>
                    <li>Add your track object inside the <code style={{ color: 'var(--brand-red)' }}>musicData = [...]</code> array with title, artist, audio path, and cover path.</li>
                    <li>The web UI and bottom audio player will immediately load and play your real track!</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
