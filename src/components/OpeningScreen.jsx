import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ArrowRight, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import landingBg from '../assets/envelope-landing.png';

export const OpeningScreen = ({ isOpen, onOpen, isPlayingMusic, onToggleMusic }) => {
  // Animation stages:
  // 0: Initial exact landing page view
  // 1: Wax seal crack + golden & rose petal explosion + music begins
  // 2: 3D Envelope flap opens upwards
  // 3: Royal gold-foiled wedding invitation letter glides up
  // 4: Cinematic camera zoom into letter transitioning to inner website
  const [animStage, setAnimStage] = useState(0);

  const handleOpen = () => {
    if (animStage > 0) return;

    // Start background music immediately on user gesture
    if (onToggleMusic && !isPlayingMusic) {
      onToggleMusic();
    }

    // Stage 1: Burst of gold & rose petals from wax seal
    setAnimStage(1);

    try {
      // Golden foil and velvet petal confetti explosion centered on envelope
      confetti({
        particleCount: 65,
        spread: 90,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#7A1C28', '#8B2635', '#D4AF37', '#FEE180', '#E8D3D3'],
        shapes: ['circle'],
        scalar: 1.2,
      });

      setTimeout(() => {
        confetti({
          particleCount: 35,
          spread: 120,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#D4AF37', '#9E3240', '#FAF7F2'],
        });
      }, 300);
    } catch (e) {
      // graceful fallback
    }

    // Stage 2: Flap lifts up
    setTimeout(() => {
      setAnimStage(2);
    }, 350);

    // Stage 3: Invitation letter card slides up
    setTimeout(() => {
      setAnimStage(3);
    }, 650);

    // Stage 4: Cinematic zoom towards camera
    setTimeout(() => {
      setAnimStage(4);
    }, 1650);

    // Stage 5: Transition complete, unveil inner site
    setTimeout(() => {
      if (onOpen) onOpen();
    }, 2200);
  };

  const handleSkip = (e) => {
    e.stopPropagation();
    if (onToggleMusic && !isPlayingMusic) {
      onToggleMusic();
    }
    if (onOpen) onOpen();
  };

  const handleToggleAudio = (e) => {
    e.stopPropagation();
    if (onToggleMusic) {
      onToggleMusic();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="envelope-opening-modal"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F7F3EB] select-none overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Akhil and Karthika Wedding Invitation Envelope"
        >
          {/* Main 1024x471 Composition Box */}
          <div className="relative w-full max-w-[1400px] max-h-[100dvh] aspect-[1024/471] flex items-center justify-center">
            
            {/* The exact background artwork image */}
            <img
              src={landingBg}
              alt="Akhil and Karthika Wedding Invitation Envelope"
              className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
              fetchpriority="high"
            />

            {/* =========================================
                HOTSPOT 1: TOP-RIGHT MUSIC CONTROLLER
               ========================================= */}
            <div
              className="absolute top-[4.5%] right-[4.5%] w-[4.5%] aspect-square flex items-center justify-center cursor-pointer z-20 group"
              onClick={handleToggleAudio}
              title={isPlayingMusic ? "Pause background music" : "Play background music"}
              role="button"
              aria-label="Toggle background music"
            >
              {/* Subtle hover feedback over the original button */}
              <div className="w-full h-full rounded-full border border-maroon/20 bg-ivory/10 hover:bg-maroon/10 transition-colors flex items-center justify-center">
                {isPlayingMusic && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                  </span>
                )}
              </div>
            </div>

            {/* =========================================
                HOTSPOT 2: BOTTOM-RIGHT "SKIP →" LINK
               ========================================= */}
            <div
              className="absolute bottom-[4%] right-[3.5%] px-3 py-1 cursor-pointer z-20 group flex items-center"
              onClick={handleSkip}
              role="button"
              aria-label="Skip to website"
            >
              {/* Subtle hover aura over original text */}
              <div className="text-[11px] sm:text-xs text-transparent hover:text-maroon/70 font-semibold tracking-wider transition-colors">
                SKIP →
              </div>
            </div>

            {/* =========================================
                HOTSPOT 3: ENVELOPE & "TAP TO OPEN" AREA
               ========================================= */}
            <div
              className="absolute top-[28%] left-[36%] w-[28%] h-[68%] cursor-pointer z-20"
              onClick={handleOpen}
              role="button"
              aria-label="Tap to open invitation"
            >
              {/* Hover effect glow */}
              <div className="w-full h-full relative group">
                {/* Gentle pulsing aura around wax seal while idle */}
                {animStage === 0 && (
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      ease: "easeInOut",
                    }}
                    className="absolute top-[32%] left-[49%] -translate-x-1/2 -translate-y-1/2 w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gold/30 blur-xs pointer-events-none"
                  />
                )}

                {/* Gentle pulse animation on TAP TO OPEN */}
                {animStage === 0 && (
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                    className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-28 h-8 rounded-full border border-maroon/15 hover:border-maroon/40 bg-ivory/20 hover:bg-blush/20 transition-all flex items-center justify-center pointer-events-none"
                  >
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] text-maroon opacity-0 group-hover:opacity-100 transition-opacity">
                      Open ✦
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* =========================================
                EXCITING & EXCELLENT OPENING ANIMATION OVERLAY
               ========================================= */}
            {animStage >= 1 && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
                
                {/* Envelope Region Animation Anchor */}
                <div
                  className="relative"
                  style={{
                    width: '27.4%', // Matches exact envelope width in image
                    height: '42%',  // Matches exact envelope height in image
                    top: '-2.5%',   // Centered with the envelope
                    perspective: '1200px',
                  }}
                >
                  {/* 1. Golden Wax Seal Break Shockwave */}
                  <AnimatePresence>
                    {animStage === 1 && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 1 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold shadow-gold z-40"
                      />
                    )}
                  </AnimatePresence>

                  {/* 2. Realistic 3D Opening Envelope Top Flap */}
                  <motion.div
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: animStage >= 2 ? -180 : 0 }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-x-0 top-0 h-full origin-top z-35"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, 50% 53%)',
                        background: 'linear-gradient(180deg, #F8F3EA 0%, #EFE5D4 100%)',
                        boxShadow: '0 6px 12px rgba(70,40,30,0.15)',
                      }}
                    />
                  </motion.div>

                  {/* 3. The Royal Golden Embossed Wedding Invitation Card */}
                  <motion.div
                    initial={{ y: 0, scale: 0.95, opacity: 0 }}
                    animate={{
                      y: animStage >= 4 ? -70 : animStage >= 3 ? -100 : 0,
                      scale: animStage >= 4 ? 2.4 : animStage >= 3 ? 1.06 : 0.95,
                      opacity: animStage >= 4 ? 0 : animStage >= 2 ? 1 : 0,
                    }}
                    transition={{
                      y: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                      scale: {
                        duration: animStage >= 4 ? 0.6 : 0.8,
                        ease: animStage >= 4 ? [0.4, 0, 0.2, 1] : [0.22, 1, 0.36, 1],
                      },
                      opacity: { duration: animStage >= 4 ? 0.5 : 0.3 },
                    }}
                    className="absolute inset-x-2 top-2 bottom-2 z-25 bg-[#FFFDF9] rounded-xl border-2 border-gold/60 shadow-2xl p-3 sm:p-5 flex flex-col items-center justify-between text-center overflow-hidden"
                  >
                    {/* Delicate Gold Foil Border */}
                    <div className="absolute inset-1.5 border border-gold/40 rounded-lg pointer-events-none" />
                    <div className="absolute inset-2.5 border border-gold/20 rounded-md pointer-events-none" />

                    {/* Royal Monogram Header */}
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-gold bg-ivory flex items-center justify-center shadow-xs">
                        <span className="font-serif text-maroon font-bold text-[10px] sm:text-xs">A &amp; K</span>
                      </div>
                      <p className="font-script text-xs sm:text-sm text-maroon/90 mt-0.5">
                        With the blessings of our families
                      </p>
                    </div>

                    {/* Couple Names in Grand Serif */}
                    <div className="my-auto py-1">
                      <h2 className="font-serif text-sm sm:text-lg md:text-xl text-maroon font-semibold tracking-wide leading-tight">
                        AKHIL &amp; KARTHIKA
                      </h2>
                      <p className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-charcoal-light mt-0.5">
                        Are Getting Married
                      </p>
                    </div>

                    {/* Auspicious Date & Location */}
                    <div className="pb-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-ivory border border-blush text-maroon text-[9px] sm:text-[10px] font-medium shadow-2xs">
                        <span>24 January 2027</span>
                        <span className="text-gold">✦</span>
                        <span>Alappuzha, Kerala</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* 4. Envelope Front Pocket (Hides bottom part of letter as it emerges) */}
                  <div
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                      clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%, 0% 100%)',
                      background: 'linear-gradient(0deg, #F0E6D5 0%, #F5EDE0 100%)',
                      boxShadow: '0 -4px 10px rgba(0,0,0,0.06)',
                    }}
                  />
                  <div
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                      clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
                      background: 'linear-gradient(135deg, #F3EBDD 0%, #EFE5D4 100%)',
                    }}
                  />
                  <div
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                      clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
                      background: 'linear-gradient(-135deg, #F3EBDD 0%, #EFE5D4 100%)',
                    }}
                  />

                </div>
              </div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
