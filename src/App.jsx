import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArtistIntro from './components/ArtistIntro';
import FilmSection from './components/FilmSection';
import MusicSection from './components/MusicSection';
import VideoSection from './components/VideoSection';
import About from './components/About';
import SocialSection from './components/SocialSection';
import JoinTeamSection from './components/JoinTeamSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MusicPage from './components/MusicPage';
import { musicData } from './data/music';

export default function App() {
  const [currentView, setCurrentView] = useState('cinema'); // 'cinema' | 'music'
  const [initialSongForMusicWeb, setInitialSongForMusicWeb] = useState(null);

  // Sync hash routing (#music-web)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#music-web' || window.location.hash === '#music-app') {
        setCurrentView('music');
      } else if (
        window.location.hash === '#home' ||
        window.location.hash === '#films' ||
        window.location.hash === '#team' ||
        window.location.hash === '#videos' ||
        window.location.hash === '#about' ||
        window.location.hash === '#contact'
      ) {
        setCurrentView('cinema');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openMusicWeb = (songToPlay = null) => {
    if (songToPlay) {
      setInitialSongForMusicWeb(songToPlay);
    }
    setCurrentView('music');
    window.location.hash = '#music-web';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToCinema = () => {
    setCurrentView('cinema');
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user is on the Separate Music Page (Spotify-level Full Music Experience)
  // Audio playback is self-contained exclusively here.
  if (currentView === 'music') {
    return (
      <MusicPage
        onBackToCinema={backToCinema}
        initialSong={initialSongForMusicWeb}
      />
    );
  }

  // Otherwise render the Main Cinema Portfolio (Dark Obsidian Theme)
  // Clean: No music player floating on the cinema site.
  return (
    <div className="relative min-h-screen bg-black text-light">
      {/* 35mm Subtle Film Grain Overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* Main Navigation Bar */}
      <Navbar onOpenMusicWeb={() => openMusicWeb()} />

      {/* Main Content Sections */}
      <main>
        {/* Cinematic Hero */}
        <Hero onOpenMusicWeb={() => openMusicWeb()} />

        {/* Team of MC Squad (3 Core Members) */}
        <ArtistIntro />

        {/* Film Production Showcase */}
        <FilmSection />

        {/* Music Vault Section (Clicking any song opens Music Web & plays there) */}
        <MusicSection
          onPlayToggle={(song) => openMusicWeb(song)}
          onOpenMusicWeb={() => openMusicWeb()}
        />

        {/* Motion Pictures & Video Gallery */}
        <VideoSection />

        {/* About Manifesto */}
        <About />

        {/* Join the Team / Recruitment Form */}
        <JoinTeamSection />

        {/* Social Network & Community */}
        <SocialSection />

        {/* Contact & Proposals */}
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer onOpenMusicWeb={() => openMusicWeb()} />
    </div>
  );
}
