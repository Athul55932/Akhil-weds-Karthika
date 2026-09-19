import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

/* ─── Petal shape component ──────────────────────────────────────── */
const RosePetal = ({ style, className = '' }) => (
  <div
    className={`absolute pointer-events-none ${className}`}
    style={{
      background: 'radial-gradient(ellipse at 38% 30%, #C4384A 0%, #8B1C2A 55%, #4A0A12 100%)',
      boxShadow: '0 4px 12px rgba(80,15,20,0.28), inset 0 1px 2px rgba(255,180,180,0.18)',
      ...style,
    }}
  />
);

/* ─── Doodle heart SVG ────────────────────────────────────────────── */
const HeartDoodle = ({ className = '' }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 50 50" fill="none">
    <path
      d="M25 43C24 43 11 32 7 23C3 14 8 5 17 6C22 7 24 11 25 13C26 11 28 7 33 6C42 5 47 14 43 23C39 32 26 43 25 43Z"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

export const OpeningScreen = ({ isOpen, onOpen, isPlayingMusic, onToggleMusic }) => {
  // 0 = idle | 1 = seal burst | 2 = flap lifts | 3 = letter rises | 4 = zoom exit
  const [stage, setStage] = useState(0);

  const handleOpen = () => {
    if (stage > 0) return;
    if (onToggleMusic && !isPlayingMusic) onToggleMusic();

    setStage(1);
    try {
      confetti({ particleCount: 55, spread: 80, origin: { x: 0.5, y: 0.54 },
        colors: ['#7A1C28','#9E3240','#D4AF37','#FEE180','#E8D3D3','#54121A'], shapes: ['circle'], scalar: 1.1 });
      setTimeout(() => confetti({ particleCount: 30, spread: 110, origin: { x: 0.5, y: 0.5 },
        colors: ['#D4AF37','#8B2635','#FAF7F2'] }), 280);
    } catch (_) {}

    setTimeout(() => setStage(2), 380);
    setTimeout(() => setStage(3), 780);
    setTimeout(() => setStage(4), 1750);
    setTimeout(() => { if (onOpen) onOpen(); }, 2350);
  };

  const handleSkip = (e) => {
    e.stopPropagation();
    if (onToggleMusic && !isPlayingMusic) onToggleMusic();
    if (onOpen) onOpen();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="envelope-landing"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.75, ease: [0.22,1,0.36,1] } }}
          className="fixed inset-0 z-50 flex flex-col bg-[#FAF7F2] select-none overflow-hidden"
          role="dialog" aria-modal="true" aria-label="Wedding Invitation Envelope"
        >

          {/* ══════════════════════════════════════════
               AMBIENT BACKGROUND BLOBS
             ══════════════════════════════════════════ */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -left-20 w-[360px] h-[360px] rounded-full bg-[#EDD5CD]/50 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full bg-[#E8D3D3]/40 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 w-[300px] h-[300px] rounded-full bg-[#F0E4DE]/55 blur-3xl" />
            <div className="absolute -top-16 -right-16 w-[280px] h-[280px] rounded-full bg-[#EDD8D0]/45 blur-3xl" />
          </div>

          {/* ══════════════════════════════════════════
               CORNER BOTANICAL ILLUSTRATIONS
             ══════════════════════════════════════════ */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">

            {/* TOP-LEFT — sage stem with small round buds */}
            <svg className="absolute top-0 left-0 w-[130px] sm:w-[190px]" viewBox="0 0 180 200" fill="none">
              <path d="M12 195 C 30 155, 55 110, 85 55 C 100 28, 118 12, 135 8"
                stroke="#687661" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
              {/* buds */}
              <circle cx="68" cy="75" r="6.5" fill="#E8D3D3" stroke="#8B1C2A" strokeWidth="1.1" />
              <circle cx="68" cy="75" r="2.5" fill="#7A1C28" />
              <circle cx="90" cy="48" r="5.5" fill="#F8F1F1" stroke="#8B1C2A" strokeWidth="1.1" />
              <circle cx="90" cy="48" r="2" fill="#7A1C28" />
              <circle cx="118" cy="22" r="7" fill="#F2DFDF" stroke="#7A1C28" strokeWidth="1.2" />
              <circle cx="118" cy="22" r="2.8" fill="#7A1C28" />
              {/* leaves */}
              <path d="M52 95 C 36 88, 40 74, 52 82 Z" fill="#7D8B75" fillOpacity="0.35" stroke="#586551" strokeWidth="0.9" />
              <path d="M76 62 C 88 50, 95 62, 80 67 Z" fill="#7D8B75" fillOpacity="0.35" stroke="#586551" strokeWidth="0.9" />
              <path d="M104 35 C 118 24, 124 38, 108 40 Z" fill="#7D8B75" fillOpacity="0.3" stroke="#586551" strokeWidth="0.9" />
            </svg>

            {/* TOP-RIGHT — stem with pink blossoms */}
            <svg className="absolute top-0 right-0 w-[130px] sm:w-[195px]" viewBox="0 0 190 200" fill="none">
              <path d="M178 195 C 155 155, 125 108, 90 55 C 72 28, 55 12, 38 8"
                stroke="#687661" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
              <circle cx="105" cy="80" r="6.5" fill="#E8D3D3" stroke="#8B2635" strokeWidth="1.1" />
              <circle cx="105" cy="80" r="2.5" fill="#7A1C28" />
              <circle cx="85" cy="50" r="5" fill="#F8F1F1" stroke="#8B2635" strokeWidth="1.1" />
              <circle cx="85" cy="50" r="2" fill="#7A1C28" />
              <circle cx="58" cy="22" r="7" fill="#F2DFDF" stroke="#7A1C28" strokeWidth="1.2" />
              <circle cx="58" cy="22" r="2.8" fill="#7A1C28" />
              <path d="M120 100 C 136 90, 132 76, 120 85 Z" fill="#7D8B75" fillOpacity="0.35" stroke="#586551" strokeWidth="0.9" />
              <path d="M98 65 C 82 55, 80 70, 96 72 Z" fill="#7D8B75" fillOpacity="0.35" stroke="#586551" strokeWidth="0.9" />
              <path d="M70 38 C 54 26, 52 40, 68 44 Z" fill="#7D8B75" fillOpacity="0.3" stroke="#586551" strokeWidth="0.9" />
            </svg>

            {/* BOTTOM-LEFT — taller fuller botanical */}
            <svg className="absolute bottom-0 left-0 w-[140px] sm:w-[210px]" viewBox="0 0 200 230" fill="none">
              <path d="M10 225 C 35 185, 65 140, 95 85 C 115 48, 130 22, 148 10"
                stroke="#687661" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
              <circle cx="72" cy="115" r="7" fill="#E8D3D3" stroke="#7A1C28" strokeWidth="1.2" />
              <circle cx="72" cy="115" r="2.8" fill="#7A1C28" />
              <circle cx="95" cy="80" r="6" fill="#F2DFDF" stroke="#7A1C28" strokeWidth="1.1" />
              <circle cx="95" cy="80" r="2.2" fill="#7A1C28" />
              <circle cx="118" cy="48" r="5.5" fill="#F8F1F1" stroke="#7A1C28" strokeWidth="1.1" />
              <circle cx="140" cy="20" r="6.5" fill="#E8D3D3" stroke="#7A1C28" strokeWidth="1.1" />
              <circle cx="140" cy="20" r="2.5" fill="#7A1C28" />
              <path d="M55 138 C 36 128, 40 112, 55 122 Z" fill="#7D8B75" fillOpacity="0.38" stroke="#586551" strokeWidth="0.9" />
              <path d="M82 102 C 97 90, 102 106, 84 108 Z" fill="#7D8B75" fillOpacity="0.35" stroke="#586551" strokeWidth="0.9" />
              <path d="M108 68 C 125 56, 128 72, 110 74 Z" fill="#7D8B75" fillOpacity="0.3" stroke="#586551" strokeWidth="0.9" />
            </svg>

            {/* BOTTOM-RIGHT — softer leaf branch */}
            <svg className="absolute bottom-0 right-0 w-[120px] sm:w-[180px]" viewBox="0 0 180 210" fill="none">
              <path d="M168 205 C 148 168, 118 125, 88 78 C 68 44, 50 22, 30 10"
                stroke="#7D8B75" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
              <path d="M70 120 C 50 108, 56 92, 70 104 Z" fill="#7D8B75" fillOpacity="0.32" stroke="#686551" strokeWidth="0.9" />
              <path d="M95 85 C 112 72, 116 88, 97 90 Z" fill="#7D8B75" fillOpacity="0.3" stroke="#686551" strokeWidth="0.9" />
              <path d="M115 52 C 132 40, 136 56, 118 58 Z" fill="#7D8B75" fillOpacity="0.28" stroke="#686551" strokeWidth="0.9" />
            </svg>
          </div>

          {/* ══════════════════════════════════════════
               HEADER — MONOGRAM & MUSIC
             ══════════════════════════════════════════ */}
          <header className="relative z-20 flex items-center justify-between px-5 sm:px-10 pt-5 sm:pt-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/70 bg-[#FFFDF9] flex items-center justify-center shadow-sm flex-shrink-0">
                <span className="font-serif text-[#7A1C28] font-bold text-sm leading-none">A</span>
                <span className="text-[10px] text-[#D4AF37] font-light mx-px">&amp;</span>
                <span className="font-serif text-[#7A1C28] font-bold text-sm leading-none">K</span>
              </div>
              <span className="font-serif text-[#7A1C28] text-lg sm:text-xl font-normal tracking-wide">
                Akhil &amp; Karthika
              </span>
            </div>

            <button
              onClick={onToggleMusic}
              type="button"
              className="w-10 h-10 rounded-full bg-[#FFFDF9] border border-[#E8D3D3] hover:border-[#7A1C28]/40 shadow-sm flex items-center justify-center transition-all duration-250 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Toggle music"
            >
              <Music className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${isPlayingMusic ? 'text-[#7A1C28]' : 'text-[#85756E]'}`} />
              {isPlayingMusic && (
                <span className="absolute w-2 h-2 rounded-full bg-[#D4AF37] top-0.5 right-0.5 animate-ping" />
              )}
            </button>
          </header>

          {/* ══════════════════════════════════════════
               MAIN — HEADLINE + ENVELOPE
             ══════════════════════════════════════════ */}
          <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">

            {/* Script headline */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
              className="text-center mb-6 sm:mb-8"
            >
              <p className="font-script text-4xl sm:text-5xl text-[#7A1C28] leading-snug">With love,</p>
              <div className="flex items-center justify-center gap-2 mt-0.5">
                <p className="font-script text-4xl sm:text-5xl text-[#7A1C28] leading-snug">
                  an invitation awaits...
                </p>
                <HeartDoodle className="w-5 h-5 sm:w-6 sm:h-6 text-[#7A1C28]/65 rotate-12 mt-1" />
              </div>
            </motion.div>

            {/* ── Envelope stage ── */}
            <div className="relative flex items-center justify-center w-full">

              {/* Twine ribbons */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible" style={{ zIndex: 1 }}>
                <svg
                  className="w-full max-w-[1000px] overflow-visible"
                  style={{ height: '60px' }}
                  viewBox="0 0 1000 60"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Left ribbon with loop */}
                  <path d="M0 38 C 80 38, 150 22, 220 34 C 252 40, 254 56, 222 56 C 190 56, 200 32, 268 28 C 320 24, 370 30, 410 30"
                    stroke="#D8BABA" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
                  {/* Right ribbon with loop */}
                  <path d="M590 30 C 630 30, 670 22, 718 30 C 748 36, 752 54, 720 54 C 688 54, 696 30, 750 24 C 810 18, 880 36, 1000 30"
                    stroke="#D8BABA" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
                </svg>

                {/* Heart doodles on twine */}
                <HeartDoodle className="absolute left-[10%] w-5 h-5 text-[#D8BABA] -rotate-15" />
                <HeartDoodle className="absolute right-[10%] w-5 h-5 text-[#D8BABA] rotate-15" />
              </div>

              {/* Rose petals scattered around envelope */}
              {/* Top-left cluster */}
              <RosePetal style={{ top: '-18px', left: '18%', width: 24, height: 32,
                borderRadius: '72% 28% 60% 40% / 58% 42% 62% 38%', transform: 'rotate(-42deg)' }} />
              <RosePetal style={{ top: '-8px', left: '25%', width: 18, height: 24,
                borderRadius: '60% 40% 70% 30% / 55% 45% 55% 45%', transform: 'rotate(-18deg)', opacity: 0.85 }} />

              {/* Top-right cluster */}
              <RosePetal style={{ top: '-20px', right: '18%', width: 26, height: 34,
                borderRadius: '40% 60% 48% 52% / 42% 52% 48% 58%', transform: 'rotate(38deg)' }} />
              <RosePetal style={{ top: '-6px', right: '26%', width: 19, height: 25,
                borderRadius: '65% 35% 58% 42% / 52% 48% 58% 42%', transform: 'rotate(15deg)', opacity: 0.88 }} />

              {/* Left side */}
              <RosePetal style={{ top: '35%', left: '8%', width: 28, height: 36,
                borderRadius: '58% 42% 66% 34% / 50% 60% 40% 50%', transform: 'rotate(14deg)' }} />
              <RosePetal style={{ bottom: '12%', left: '14%', width: 20, height: 26,
                borderRadius: '52% 48% 60% 40% / 55% 45% 55% 45%', transform: 'rotate(42deg)', opacity: 0.82 }} />

              {/* Right side */}
              <RosePetal style={{ top: '28%', right: '7%', width: 24, height: 30,
                borderRadius: '62% 38% 58% 42% / 48% 58% 42% 52%', transform: 'rotate(-22deg)' }} />
              <RosePetal style={{ bottom: '14%', right: '15%', width: 28, height: 36,
                borderRadius: '45% 55% 52% 48% / 58% 42% 58% 42%', transform: 'rotate(52deg)' }} />

              {/* Bottom centre */}
              <RosePetal style={{ bottom: '-10px', left: '44%', width: 22, height: 28,
                borderRadius: '60% 40% 65% 35% / 52% 48% 52% 48%', transform: 'rotate(-5deg)', opacity: 0.9 }} />

              {/* ── THE ENVELOPE ── */}
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 18 }}
                animate={{
                  scale: stage === 4 ? 2.5 : 1,
                  opacity: stage === 4 ? 0 : 1,
                  y: stage === 4 ? -50 : 0,
                }}
                transition={{ duration: stage === 4 ? 0.65 : 0.7, ease: stage === 4 ? [0.4,0,0.6,1] : [0.22,1,0.36,1] }}
                className="relative cursor-pointer z-10"
                style={{
                  width: 'clamp(280px, 42vw, 520px)',
                  height: 'clamp(185px, 27vw, 335px)',
                  perspective: '1200px',
                }}
                onClick={handleOpen}
              >
                {/* Drop shadow layer */}
                <div className="absolute inset-0 rounded-2xl"
                  style={{ boxShadow: '0 22px 55px -8px rgba(70,30,20,0.22), 0 8px 20px rgba(70,30,20,0.09)', background: '#EFE7D8' }} />

                {/* Envelope body */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{ background: 'linear-gradient(155deg, #FAF5EE 0%, #F5EDE0 55%, #EEE2CE 100%)', border: '1px solid #DDD0B2' }}>
                  {/* Paper grain */}
                  <div className="absolute inset-0 opacity-[0.18]"
                    style={{ backgroundImage: 'radial-gradient(#B8A080 0.8px, transparent 0.8px)', backgroundSize: '9px 9px' }} />
                </div>

                {/* Royal invitation letter — slides up */}
                <motion.div
                  animate={{ y: stage >= 3 ? '-58%' : 0, scale: stage >= 3 ? 1.03 : 1 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute z-10 flex flex-col items-center justify-between text-center overflow-hidden"
                  style={{
                    inset: '10px 12px 12px 12px',
                    background: 'linear-gradient(160deg, #FFFEF9 0%, #FFF9F0 100%)',
                    border: '1.5px solid rgba(212,175,55,0.45)',
                    borderRadius: 14,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    padding: 'clamp(12px,3vw,28px)',
                  }}
                >
                  {/* Double gold border */}
                  <div className="absolute inset-2 border border-[#D4AF37]/30 rounded-xl pointer-events-none" />
                  <div className="absolute inset-3.5 border border-[#D4AF37]/15 rounded-lg pointer-events-none" />

                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full border-2 border-[#D4AF37]/80 flex items-center justify-center font-serif text-[#7A1C28] font-bold text-xs bg-[#FAF7F2] shadow-sm">
                      A &amp; K
                    </div>
                    <p className="font-script text-base sm:text-xl text-[#7A1C28]/90 mt-1.5 leading-tight">
                      Together with our families
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-3xl text-[#7A1C28] font-normal tracking-wider">
                      AKHIL &amp; KARTHIKA
                    </h3>
                    <p className="text-[10px] sm:text-xs text-[#5F514B] uppercase tracking-[0.22em] mt-1">
                      Joyfully Invite You to Our Wedding
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8D3D3] text-[#7A1C28] text-[11px] sm:text-xs font-medium">
                    <span>Sunday, 24 Jan 2027</span>
                    <span className="text-[#D4AF37]">✦</span>
                    <span>Alappuzha, Kerala</span>
                  </div>
                </motion.div>

                {/* Envelope pocket folds */}
                {/* Left fold */}
                <div className="absolute inset-0 z-20 pointer-events-none"
                  style={{ clipPath: 'polygon(0% 0%, 50.5% 50.5%, 0% 100%)',
                    background: 'linear-gradient(128deg, #F8F0E2 0%, #EBE0CA 100%)' }} />
                {/* Right fold */}
                <div className="absolute inset-0 z-20 pointer-events-none"
                  style={{ clipPath: 'polygon(100% 0%, 49.5% 50.5%, 100% 100%)',
                    background: 'linear-gradient(-128deg, #F8F0E2 0%, #EBE0CA 100%)' }} />
                {/* Bottom fold */}
                <div className="absolute inset-0 z-20 pointer-events-none"
                  style={{ clipPath: 'polygon(0% 100%, 50% 47%, 100% 100%)',
                    background: 'linear-gradient(0deg, #E8DCCA 0%, #F5ECDB 100%)',
                    boxShadow: '0 -3px 10px rgba(60,30,20,0.06)' }} />

                {/* Floral sprigs on envelope */}
                {/* Bottom-left */}
                <div className="absolute bottom-1 left-1 z-[22] pointer-events-none"
                  style={{ width: 'clamp(70px,13vw,110px)' }}>
                  <svg viewBox="0 0 110 110" fill="none" className="w-full h-auto">
                    <path d="M8 102 C 25 78, 40 50, 55 18" stroke="#586551" strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M18 85 C 28 74, 32 86, 25 92 Z" fill="#7D8B75" fillOpacity="0.5" stroke="#586551" strokeWidth="0.8" />
                    <path d="M36 58 C 48 46, 54 60, 43 65 Z" fill="#7D8B75" fillOpacity="0.45" stroke="#586551" strokeWidth="0.8" />
                    <circle cx="55" cy="18" r="4.5" fill="#7A1C28" />
                    <circle cx="44" cy="38" r="4" fill="#9E3240" />
                    <circle cx="33" cy="58" r="3.5" fill="#7A1C28" />
                    <circle cx="24" cy="76" r="3" fill="#8B2635" />
                  </svg>
                </div>
                {/* Top-right */}
                <div className="absolute top-1 right-1 z-[22] pointer-events-none"
                  style={{ width: 'clamp(70px,13vw,110px)' }}>
                  <svg viewBox="0 0 110 110" fill="none" className="w-full h-auto">
                    <path d="M102 8 C 82 32, 68 60, 55 92" stroke="#586551" strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M92 25 C 82 36, 78 25, 84 19 Z" fill="#7D8B75" fillOpacity="0.5" stroke="#586551" strokeWidth="0.8" />
                    <circle cx="55" cy="92" r="4.5" fill="#7A1C28" />
                    <circle cx="66" cy="70" r="4" fill="#9E3240" />
                    <circle cx="76" cy="50" r="3.5" fill="#7A1C28" />
                    <circle cx="86" cy="30" r="3" fill="#8B2635" />
                  </svg>
                </div>

                {/* Gold stitched fold line on top flap + 3D Flap */}
                <motion.div
                  animate={{ rotateX: stage >= 2 ? -175 : 0, zIndex: stage >= 2 ? 4 : 28 }}
                  transition={{ duration: 0.75, ease: [0.4,0,0.2,1] }}
                  className="absolute inset-0 origin-top pointer-events-none"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="w-full h-full"
                    style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 50% 54%)',
                      background: 'linear-gradient(175deg, #FAF4EB 0%, #EDE2CE 100%)',
                      boxShadow: '0 6px 14px rgba(65,35,20,0.1)',
                    }} />
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 335" fill="none">
                    <path d="M22 16 L260 172 L498 16" stroke="#D4AF37" strokeWidth="1.1" strokeOpacity="0.4" strokeDasharray="5 5" />
                  </svg>
                </motion.div>

                {/* Wax Seal */}
                <AnimatePresence>
                  {stage === 0 && (
                    <motion.div
                      key="seal"
                      initial={{ scale: 0.88, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
                      exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute left-1/2 -translate-x-1/2 z-40 cursor-pointer"
                      style={{
                        top: '48%', translateY: '-50%',
                        width: 'clamp(56px, 9vw, 84px)',
                        height: 'clamp(56px, 9vw, 84px)',
                      }}
                    >
                      {/* Wax body */}
                      <div className="w-full h-full relative flex items-center justify-center"
                        style={{
                          background: 'radial-gradient(circle at 34% 32%, #C4384A 0%, #7A1C28 52%, #3D080E 100%)',
                          borderRadius: '47% 53% 50% 50% / 52% 48% 52% 48%',
                          boxShadow: '0 8px 22px rgba(60,8,14,0.5), inset 0 2px 4px rgba(255,180,180,0.3), inset 0 -3px 6px rgba(0,0,0,0.45)',
                        }}>
                        {/* Inner gold ring */}
                        <div className="w-[80%] h-[80%] rounded-full flex flex-col items-center justify-center"
                          style={{ border: '1.5px solid rgba(212,175,55,0.6)' }}>
                          <div className="font-serif text-[#FBF5B7] font-bold tracking-tight flex items-center leading-none"
                            style={{ fontSize: 'clamp(9px,1.4vw,14px)', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                            <span>A</span>
                            <span className="text-[#D4AF37] mx-px" style={{ fontSize: '0.75em' }}>&amp;</span>
                            <span>K</span>
                          </div>
                          <div className="text-[#D4AF37] leading-none mt-0.5" style={{ fontSize: 'clamp(7px,1.1vw,11px)' }}>❦</div>
                        </div>
                        {/* Wax drips */}
                        <div className="absolute -top-1 left-2 w-3 h-3 rounded-full bg-[#7A1C28] opacity-90" style={{ filter: 'blur(1px)' }} />
                        <div className="absolute -bottom-1 right-2 w-3.5 h-3.5 rounded-full bg-[#3D080E] opacity-90" style={{ filter: 'blur(1px)' }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* TAP TO OPEN */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: stage >= 1 ? 0 : 1, y: 0, pointerEvents: stage >= 1 ? 'none' : 'auto' }}
              transition={{ duration: 0.5, delay: 0.25 }}
              onClick={handleOpen}
              className="flex flex-col items-center mt-5 sm:mt-7 cursor-pointer group"
              role="button" tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
              aria-label="Tap to open invitation"
            >
              <div className="flex flex-col items-center gap-0.5 mb-1">
                {/* Tap rays */}
                <div className="flex items-center gap-1 text-[#7A1C28]/60 mb-0.5">
                  <div className="w-px h-3 bg-current rotate-[-30deg]" />
                  <div className="w-px h-4 bg-current" />
                  <div className="w-px h-3 bg-current rotate-[30deg]" />
                </div>
                {/* Animated hand */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                  className="text-[#7A1C28] group-hover:text-[#54121A] transition-colors"
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 11V6a2 2 0 0 0-4 0" />
                    <path d="M14 10V4a2 2 0 0 0-4 0v2" />
                    <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                  </svg>
                </motion.div>
              </div>

              <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.28em] text-[#7A1C28] uppercase group-hover:text-[#54121A] transition-colors">
                TAP TO OPEN
              </span>

              <div className="flex items-center gap-2.5 mt-2 text-[#7A1C28]/45">
                <div className="w-12 h-px bg-current" />
                <Heart className="w-3 h-3 fill-[#7A1C28]/60 text-[#7A1C28]/60" />
                <div className="w-12 h-px bg-current" />
              </div>
            </motion.div>
          </main>

          {/* SKIP */}
          <footer className="relative z-20 flex justify-end px-6 sm:px-10 pb-5 sm:pb-6">
            <button
              onClick={handleSkip}
              type="button"
              className="group inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-[#85756E]/70 hover:text-[#7A1C28] uppercase tracking-widest font-medium transition-colors cursor-pointer"
              aria-label="Skip to website"
            >
              <span>SKIP</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
