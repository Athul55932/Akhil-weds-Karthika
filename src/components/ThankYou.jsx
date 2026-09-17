import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { DoodleHeart, FloralOrnament, BotanicalBranch } from './DecorativeElements';
import { weddingData } from '../data/weddingData';

export const ThankYou = () => {
  return (
    <footer
      className="relative overflow-hidden bg-charcoal-dark text-ivory select-none"
      aria-label="Thank You and Farewell"
    >
      {/* Cinematic Full-Width Sunset Banner */}
      <div className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">
        {/* Background Sunset Silhouette Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={weddingData.images.closingBanner}
            alt="Akhil and Karthika Kerala Sunset Silhouette"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
            loading="lazy"
            decoding="async"
          />
          {/* Deep Maroon & Charcoal Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-maroon-dark/85 to-charcoal-dark/75 backdrop-blur-[0.5px]" />
        </div>

        {/* Ambient Floral Overlays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <BotanicalBranch className="absolute top-10 left-8 md:left-20 w-32 md:w-44 h-auto text-ivory/15 rotate-12" />
          <BotanicalBranch className="absolute bottom-12 right-8 md:right-20 w-36 md:w-48 h-auto text-gold/20 -rotate-45" />
          <FloralOrnament className="absolute top-12 right-12 md:right-32 w-16 h-16 text-gold/30" />
          <FloralOrnament className="absolute bottom-16 left-12 md:left-32 w-16 h-16 text-maroon-light/40" />
        </div>

        {/* Central Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
          {/* Monogram Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-14 h-14 rounded-full border border-gold/60 flex items-center justify-center font-serif text-xl font-bold text-gold-light bg-black/20 backdrop-blur-sm mb-8 shadow-gold"
          >
            <span>A</span>
            <span className="text-xs text-gold mx-0.5">&</span>
            <span>K</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl md:text-5xl font-light tracking-wide uppercase text-ivory-light max-w-3xl leading-snug md:leading-normal mb-6"
          >
            Thank You for Being Part of Our Special Day
          </motion.h2>

          {/* Decorative Heart Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold/70" />
            <Heart className="w-5 h-5 fill-gold text-gold animate-pulse" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold/70" />
          </motion.div>

          {/* Couple Names */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold-light tracking-wider font-normal mb-3"
          >
            AKHIL &amp; KARTHIKA
          </motion.p>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base tracking-[0.3em] text-ivory/80 uppercase font-light"
          >
            24 · 01 · 2027
          </motion.p>

          <p className="font-script text-2xl text-blush mt-4">
            Alappuzha, Kerala
          </p>
        </div>
      </div>

      {/* Very Bottom Minimal Footer Credits */}
      <div className="border-t border-white/10 bg-charcoal-dark py-6 px-4 text-center text-xs text-ivory/50 font-light flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto">
        <p>© 2027 Akhil &amp; Karthika. All blessings cherished.</p>
        <p className="flex items-center gap-1.5 mt-2 sm:mt-0">
          Handcrafted with <Heart className="w-3 h-3 fill-maroon text-maroon" /> for our celebration
        </p>
      </div>
    </footer>
  );
};
