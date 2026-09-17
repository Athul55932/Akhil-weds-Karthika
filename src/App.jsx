import React, { useState, useRef, useEffect } from 'react';
import { OpeningScreen } from './components/OpeningScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { WeddingDetails } from './components/WeddingDetails';
import { Gallery } from './components/Gallery';
import { QuoteSection } from './components/QuoteSection';
import { RSVP } from './components/RSVP';
import { ThankYou } from './components/ThankYou';
import { MusicControl } from './components/MusicControl';
import { weddingData } from './data/weddingData';

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(weddingData.audio.src);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handleEnded = () => setIsPlayingMusic(false);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // Lock body scroll while opening screen is active
  useEffect(() => {
    if (!isInvitationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isInvitationOpen]);

  // Handle invitation opening
  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);

    // Play music on user gesture
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingMusic(true);
        })
        .catch((err) => {
          console.warn("Audio autoplay blocked by browser policy:", err);
          setIsPlayingMusic(false);
        });
    }
  };

  // Toggle music playback
  const handleToggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingMusic(true);
        })
        .catch((err) => {
          console.warn("Audio play error:", err);
          setIsPlayingMusic(false);
        });
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal relative selection:bg-blush selection:text-maroon">
      {/* 01: Fullscreen Opening Screen Overlay */}
      <OpeningScreen
        isOpen={!isInvitationOpen}
        onOpen={handleOpenInvitation}
      />

      {/* Sticky Navigation Header */}
      <Navbar isVisible={isInvitationOpen} />

      {/* Main Page Flow */}
      <main>
        {/* 02: Hero Section */}
        <Hero />

        {/* 03: Live Countdown Counter */}
        <Countdown />

        {/* 04: Wedding Event Details */}
        <WeddingDetails />

        {/* 05: Asymmetric Photo Gallery & Lightbox */}
        <Gallery />

        {/* 06: Love Quote Pause */}
        <QuoteSection />

        {/* 07: RSVP Section */}
        <RSVP />

        {/* 08: Thank You / Closing Banner */}
        <ThankYou />
      </main>

      {/* Floating Ambient Music Controller */}
      <MusicControl
        isVisible={isInvitationOpen}
        isPlaying={isPlayingMusic}
        onTogglePlay={handleToggleMusic}
      />
    </div>
  );
}

export default App;
