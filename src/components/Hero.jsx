import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronDown, Heart } from 'lucide-react';
import { BotanicalBranch, DoodleHeart, DoodleSparkle, FloralOrnament } from './DecorativeElements';
import { weddingData } from '../data/weddingData';

export const Hero = () => {
  const handleScrollDown = () => {
    const detailsSection = document.getElementById('details') || document.getElementById('story');
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 flex items-center overflow-hidden bg-ivory"
      aria-label="Hero - Akhil & Karthika Wedding Invitation"
    >
      {/* Background organic atmosphere blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-blush/35 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-sage-soft/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full bg-ivory-cream/80 blur-2xl" />

        {/* Botanical SVG accents */}
        <BotanicalBranch className="absolute top-20 left-2 sm:top-24 sm:left-10 w-20 sm:w-32 h-auto text-maroon/20 rotate-6" />
        <BotanicalBranch className="absolute bottom-10 right-2 sm:bottom-12 sm:right-16 w-24 sm:w-40 h-auto text-sage/35 -rotate-45" />
        <DoodleHeart className="absolute top-28 right-8 sm:top-36 sm:right-1/4 w-5 sm:w-6 h-5 sm:h-6 text-maroon/30 rotate-12" />
        <DoodleSparkle className="absolute bottom-24 left-8 sm:bottom-32 sm:left-1/4 w-4 sm:w-5 h-4 sm:h-5 text-gold/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Details & Typography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Handwritten script badge */}
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <span className="font-script text-2xl sm:text-3xl md:text-4xl text-maroon font-semibold tracking-wide">
                Together forever
              </span>
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-maroon text-maroon inline-block animate-pulse" />
            </div>

            {/* Couple Names in Grand Serif */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-maroon font-normal tracking-tight leading-[1.05] mb-4 sm:mb-6">
              AKHIL &amp; <br />
              <span className="italic font-light">KARTHIKA</span>
            </h1>

            {/* Subtext description */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-charcoal-muted max-w-xl mb-6 sm:mb-8 leading-relaxed">
              With joyous hearts and the blessings of our families, we invite you to stand beside us as we exchange vows and celebrate the sacred bond of marriage.
            </p>

            {/* Key Event Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-xl mb-8 sm:mb-10">
              {/* Date Card */}
              <div className="flex flex-col items-center lg:items-start p-3.5 sm:p-4 rounded-2xl bg-ivory-light/90 border border-blush/70 shadow-xs hover:border-maroon/40 transition-colors">
                <div className="flex items-center gap-2 text-maroon mb-1">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold">Date</span>
                </div>
                <span className="font-serif text-charcoal text-base font-medium">
                  {weddingData.event.date}
                </span>
                <span className="text-xs text-charcoal-light font-light">
                  {weddingData.event.day}
                </span>
              </div>

              {/* Time Card */}
              <div className="flex flex-col items-center lg:items-start p-3.5 sm:p-4 rounded-2xl bg-ivory-light/90 border border-blush/70 shadow-xs hover:border-maroon/40 transition-colors">
                <div className="flex items-center gap-2 text-maroon mb-1">
                  <Clock className="w-4 h-4 text-gold" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold">Time</span>
                </div>
                <span className="font-serif text-charcoal text-base font-medium">
                  11:00 AM – 11:30 AM
                </span>
                <span className="text-xs text-charcoal-light font-light">
                  Muhurtham
                </span>
              </div>

              {/* Venue Card */}
              <div className="flex flex-col items-center lg:items-start p-3.5 sm:p-4 rounded-2xl bg-ivory-light/90 border border-blush/70 shadow-xs hover:border-maroon/40 transition-colors">
                <div className="flex items-center gap-2 text-maroon mb-1">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold">Venue</span>
                </div>
                <span className="font-serif text-charcoal text-base font-medium truncate max-w-full">
                  Prince Convention
                </span>
                <span className="text-xs text-charcoal-light font-light truncate max-w-full">
                  Alappuzha, Kerala
                </span>
              </div>
            </div>

            {/* Secondary Action CTA */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={handleScrollDown}
                className="w-full sm:w-auto justify-center group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-maroon hover:bg-maroon-hover text-ivory text-xs sm:text-sm font-medium tracking-wider uppercase shadow-maroon transition-all duration-300 hover:translate-y-[-2px] cursor-pointer"
              >
                <span>Our Journey</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>

              <a
                href="#rsvp"
                className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-transparent hover:bg-blush/20 text-maroon border border-maroon/40 text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300"
              >
                <span>Reserve Attendance</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Organic Curved Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Layered decorative background shape */}
            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-tr from-maroon/15 via-blush/40 to-sage/20 rounded-[3.5rem] transform rotate-3 blur-sm -z-10" />

            {/* Organic curved frame */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-ivory shadow-polaroid bg-ivory-cream">
              <img
                src={weddingData.images.heroMain}
                alt="Akhil and Karthika in traditional attire"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
                fetchpriority="high"
              />
              
              {/* Subtle gradient shadow at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/40 via-transparent to-transparent opacity-60" />

              {/* Bottom-right photo overlay caption */}
              <div className="absolute bottom-6 left-6 right-6 text-ivory-light flex items-end justify-between">
                <div>
                  <p className="font-script text-2xl text-gold-light">Akhil &amp; Karthika</p>
                  <p className="text-xs uppercase tracking-widest text-ivory/80">Alappuzha, Kerala</p>
                </div>
                <FloralOrnament className="w-10 h-10 text-gold-light/60" />
              </div>
            </div>

            {/* Overlapping botanical leaf doodle */}
            <BotanicalBranch className="absolute -bottom-8 -left-6 md:-left-10 w-28 md:w-36 h-auto text-maroon/50 z-20 pointer-events-none drop-shadow-sm" />
            <FloralOrnament className="absolute -top-6 -right-6 w-16 h-16 text-gold/80 z-20 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
