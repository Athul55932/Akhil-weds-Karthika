import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

export const MusicControl = ({ isPlaying, onTogglePlay, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  return (
    <motion.div
      drag
      dragConstraints={{
        left: -window.innerWidth + 80,
        right: 0,
        top: -window.innerHeight + 80,
        bottom: 0,
      }}
      dragElastic={0.1}
      dragMomentum={false}
      whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 touch-none cursor-grab"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={onTogglePlay}
        className="group relative flex items-center justify-center p-3 rounded-full bg-ivory-light/95 border border-blush/90 text-maroon shadow-card hover:shadow-maroon hover:border-maroon/40 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-maroon select-none overflow-hidden"
        aria-label={isPlaying ? "Pause background wedding music" : "Play background wedding music"}
        title={isPlaying ? "Pause music (Drag to move)" : "Play music (Drag to move)"}
      >
        {/* Animated Sound Wave Bars / Disc Icon */}
        <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
          {isPlaying ? (
            <div className="flex items-end justify-center gap-0.5 h-4 w-4">
              <span className="w-1 bg-maroon rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
              <span className="w-1 bg-gold rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-4" />
              <span className="w-1 bg-maroon rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-2" />
            </div>
          ) : (
            <Music className="w-5 h-5 text-charcoal-muted group-hover:text-maroon transition-colors" />
          )}
        </div>

        {/* Text Label on desktop: expands smoothly on hover */}
        <motion.div
          initial={false}
          animate={{
            width: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
            marginLeft: isHovered ? 10 : 0,
            marginRight: isHovered ? 8 : 0,
          }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="hidden md:flex flex-col text-left overflow-hidden whitespace-nowrap"
        >
          <span className="text-[11px] uppercase tracking-wider font-semibold text-maroon leading-tight">
            {isPlaying ? "Playing Music" : "Play Music"}
          </span>
          <span className="text-[10px] text-charcoal-light font-light leading-tight">
            Wedding Serenade
          </span>
        </motion.div>

        {/* Status Indicator Dot */}
        <span
          className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
            isPlaying ? "bg-emerald-500 animate-ping" : "bg-charcoal-light/40"
          }`}
        />
      </button>
    </motion.div>
  );
};

