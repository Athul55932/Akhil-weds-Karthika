import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Volume2, VolumeX } from 'lucide-react';

export const MusicControl = ({ isPlaying, onTogglePlay, isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <button
        onClick={onTogglePlay}
        className="group relative flex items-center gap-3 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-ivory-light/95 border border-blush/90 text-maroon shadow-card hover:shadow-maroon hover:border-maroon/40 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-maroon cursor-pointer hover:-translate-y-1"
        aria-label={isPlaying ? "Pause background wedding music" : "Play background wedding music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {/* Animated Sound Wave Bars / Disc Icon */}
        <div className="relative flex items-center justify-center w-6 h-6">
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

        {/* Text Label on desktop */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-maroon">
            {isPlaying ? "Playing Music" : "Play Music"}
          </span>
          <span className="text-[10px] text-charcoal-light font-light leading-tight">
            Wedding Serenade
          </span>
        </div>

        {/* Status Indicator Dot */}
        <span
          className={`w-2 h-2 rounded-full transition-colors ${
            isPlaying ? "bg-emerald-500 animate-ping" : "bg-charcoal-light/40"
          }`}
        />
      </button>
    </motion.div>
  );
};
