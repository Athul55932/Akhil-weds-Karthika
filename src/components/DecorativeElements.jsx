import React from 'react';

// Delicate hand-drawn botanical branch
export const BotanicalBranch = ({ className = "w-24 h-24 text-maroon/40", flip = false }) => (
  <svg
    viewBox="0 0 100 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${flip ? "-scale-x-100" : ""}`}
    aria-hidden="true"
  >
    <path
      d="M50 115C48 90 45 60 52 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path
      d="M51 25C42 18 35 22 38 29C41 34 49 32 51 25Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M52 42C62 36 68 41 65 48C62 53 53 50 52 42Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M49 58C38 52 32 58 35 65C38 71 47 67 49 58Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M50 78C60 72 67 78 64 85C60 91 51 87 50 78Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M47 95C36 90 31 97 34 103C37 108 45 104 47 95Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.1"
    />
  </svg>
);

// Flower line-art ornament
export const FloralOrnament = ({ className = "w-16 h-16 text-maroon/50" }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="40" cy="40" r="4" fill="currentColor" />
    <path
      d="M40 36C40 22 47 16 40 8C33 16 40 22 40 36Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <path
      d="M40 44C40 58 47 64 40 72C33 64 40 58 40 44Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <path
      d="M36 40C22 40 16 47 8 40C16 33 22 40 36 40Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <path
      d="M44 40C58 40 64 47 72 40C64 33 58 40 44 40Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.08"
    />
    {/* Diagonals */}
    <path
      d="M37 37C27 27 25 20 20 20C20 25 27 27 37 37Z"
      stroke="currentColor"
      strokeWidth="1"
      fill="currentColor"
      fillOpacity="0.05"
    />
    <path
      d="M43 43C53 53 55 60 60 60C60 55 53 53 43 43Z"
      stroke="currentColor"
      strokeWidth="1"
      fill="currentColor"
      fillOpacity="0.05"
    />
    <path
      d="M43 37C53 27 60 25 60 20C55 20 53 27 43 37Z"
      stroke="currentColor"
      strokeWidth="1"
      fill="currentColor"
      fillOpacity="0.05"
    />
    <path
      d="M37 43C27 53 20 55 20 60C25 60 27 53 37 43Z"
      stroke="currentColor"
      strokeWidth="1"
      fill="currentColor"
      fillOpacity="0.05"
    />
  </svg>
);

// Hand-drawn playful doodle heart
export const DoodleHeart = ({ className = "w-6 h-6 text-maroon" }) => (
  <svg
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M25 43C24 43 11 32 7 23C3 14 8 5 17 6C22 7 24 11 25 13C26 11 28 7 33 6C42 5 47 14 43 23C39 32 26 43 25 43Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.15"
    />
  </svg>
);

// Sparkle / star doodle
export const DoodleSparkle = ({ className = "w-5 h-5 text-gold" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

// Realistic translucent washi-tape sticker
export const TapeCorner = ({ className = "w-16 h-6 -top-3 left-1/2 -translate-x-1/2 -rotate-2" }) => (
  <div
    className={`absolute z-20 bg-amber-50/80 backdrop-blur-[1px] border-t border-b border-amber-200/50 shadow-sm pointer-events-none ${className}`}
    style={{
      boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
      clipPath: "polygon(0% 0%, 5% 40%, 0% 80%, 3% 100%, 97% 100%, 100% 60%, 96% 20%, 100% 0%)",
    }}
    aria-hidden="true"
  />
);

// Elegant couple Monogram Logo
export const Monogram = ({ className = "w-10 h-10 text-maroon" }) => (
  <div className={`flex items-center justify-center font-serif font-semibold tracking-tighter ${className}`}>
    <span className="text-xl">A</span>
    <span className="text-xs mx-0.5 text-gold font-sans font-light">&</span>
    <span className="text-xl">K</span>
  </div>
);
