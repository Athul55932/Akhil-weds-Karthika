import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { BotanicalBranch, DoodleHeart, DoodleSparkle, FloralOrnament } from './DecorativeElements';

export const OpeningScreen = ({ isOpen, onOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="opening-screen"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0,
            transition: {
              duration: 1.1,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ivory text-charcoal overflow-y-auto overscroll-contain select-none p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Digital Wedding Invitation Opening Screen"
        >
          {/* Subtle warm watercolor wash background flourishes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Top-left maroon organic curve */}
            <div className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-maroon/10 blur-3xl" />
            {/* Bottom-right blush wash */}
            <div className="absolute -bottom-24 -right-24 w-80 sm:w-[30rem] h-80 sm:h-[30rem] rounded-full bg-blush/40 blur-3xl" />
            {/* Center subtle warm glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] sm:w-[40rem] h-[28rem] sm:h-[40rem] rounded-full bg-ivory-cream/70 blur-2xl" />

            {/* Floating botanical SVG doodles */}
            <BotanicalBranch className="absolute top-3 left-3 sm:top-6 sm:left-6 md:top-12 md:left-12 w-20 sm:w-28 md:w-36 h-auto text-maroon/20 sm:text-maroon/25 -rotate-12 animate-float-slow" />
            <BotanicalBranch className="absolute bottom-4 right-3 sm:bottom-8 sm:right-6 md:bottom-12 md:right-12 w-24 sm:w-32 md:w-44 h-auto text-sage/35 sm:text-sage/40 rotate-180 animate-float-slow" />
            <FloralOrnament className="absolute top-6 right-6 sm:top-12 sm:right-12 md:top-20 md:right-24 w-12 sm:w-16 md:w-20 h-auto text-maroon/25" />
            <DoodleHeart className="absolute top-1/4 right-8 sm:right-1/4 w-5 sm:w-7 h-5 sm:h-7 text-maroon/30 rotate-12" />
            <DoodleHeart className="absolute bottom-1/4 left-8 sm:left-1/4 w-6 sm:w-8 h-6 sm:h-8 text-maroon/25 -rotate-12" />
            <DoodleSparkle className="absolute top-1/3 left-6 sm:left-16 w-4 sm:w-5 h-4 sm:h-5 text-gold/60" />
            <DoodleSparkle className="absolute bottom-1/3 right-6 sm:right-16 w-5 sm:w-6 h-5 sm:h-6 text-gold/70" />
          </div>

          {/* Invitation Card Content */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-4xl w-full my-auto bg-ivory-light/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-blush/60 shadow-2xl p-5 sm:p-8 md:p-12 text-center"
          >
            {/* Top Monogram and blessings */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col items-center mb-3 sm:mb-6"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold/40 flex items-center justify-center text-maroon font-serif font-bold text-base sm:text-lg mb-2 sm:mb-4 bg-ivory shadow-xs">
                <span>A</span>
                <span className="text-[10px] sm:text-xs text-gold mx-0.5">&</span>
                <span>K</span>
              </div>
              <p className="font-script text-xl sm:text-2xl md:text-3xl text-maroon/90 font-medium tracking-wide">
                With the blessings of our families
              </p>
            </motion.div>

            {/* Two-column layout on desktop: couple portrait preview + typography */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center my-2 sm:my-4 md:my-6">
              {/* Romantic framed photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="md:col-span-5 relative mx-auto w-full max-w-[190px] sm:max-w-[240px] md:max-w-none"
              >
                {/* Handwritten sticky note */}
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 z-20 bg-ivory-cream/95 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md shadow-xs border border-blush -rotate-6">
                  <span className="font-script text-base sm:text-lg md:text-xl text-maroon font-semibold flex items-center gap-1">
                    Better Together <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-maroon text-maroon inline" />
                  </span>
                </div>

                {/* Organic curved portrait */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border-2 sm:border-4 border-ivory shadow-polaroid aspect-[4/4.5] sm:aspect-[4/5] bg-ivory-cream">
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
                    alt="Akhil and Karthika"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    fetchpriority="high"
                  />
                  {/* Subtle maroon glow border */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-maroon/10 rounded-2xl sm:rounded-[2.5rem]" />
                </div>
              </motion.div>

              {/* Typography & CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="md:col-span-7 text-center md:text-left flex flex-col items-center md:items-start justify-center"
              >
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-sage-dark font-medium mb-1.5 sm:mb-2">
                  Wedding Invitation
                </span>

                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-maroon tracking-tight leading-[1.1] mb-2 sm:mb-4">
                  AKHIL <span className="font-script text-2xl sm:text-3xl md:text-4xl text-gold font-normal">&</span> KARTHIKA
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-charcoal-muted max-w-md mb-4 sm:mb-6 leading-relaxed">
                  We invite you to celebrate love, laughter, and lifelong togetherness as we begin our new journey.
                </p>

                {/* Date display */}
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-ivory border border-blush text-maroon font-medium text-sm sm:text-base md:text-lg mb-5 sm:mb-7 shadow-xs">
                  <span className="tracking-widest font-semibold">24</span>
                  <span className="text-gold font-bold">·</span>
                  <span className="tracking-widest font-semibold">01</span>
                  <span className="text-gold font-bold">·</span>
                  <span className="tracking-widest font-semibold">2027</span>
                </div>

                {/* Main Action Button */}
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpen}
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-maroon hover:bg-maroon-hover text-ivory-light rounded-full font-medium tracking-wide shadow-maroon transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-maroon/30 active:bg-maroon-hover"
                  aria-label="Open wedding invitation"
                >
                  <span className="text-sm sm:text-base tracking-wider font-semibold">OPEN INVITATION</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300 text-gold-light" />
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom footnote */}
            <p className="text-[11px] sm:text-xs text-charcoal-light font-light mt-3 sm:mt-4">
              Tap anywhere or click button to enter with audio experience bla.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
