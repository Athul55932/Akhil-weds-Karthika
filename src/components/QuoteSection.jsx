import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { BotanicalBranch, DoodleHeart, DoodleSparkle, FloralOrnament } from './DecorativeElements';

export const QuoteSection = () => {
  return (
    <section
      id="story"
      className="relative py-24 md:py-36 bg-ivory overflow-hidden flex items-center justify-center text-center"
      aria-label="Love Quote & Sentiment"
    >
      {/* Delicate floating ambient particles and branches */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-blush/25 blur-3xl" />
        <BotanicalBranch className="absolute top-12 left-1/4 w-28 h-auto text-maroon/15 -rotate-45" />
        <BotanicalBranch className="absolute bottom-12 right-1/4 w-32 h-auto text-sage/25 rotate-135" />
        <FloralOrnament className="absolute top-10 right-16 w-14 h-14 text-gold/40" />
        <FloralOrnament className="absolute bottom-10 left-16 w-14 h-14 text-maroon/20" />
        <DoodleSparkle className="absolute top-1/3 right-1/3 w-6 h-6 text-gold/70" />
        <DoodleHeart className="absolute bottom-1/3 left-1/3 w-7 h-7 text-maroon/25 rotate-6" />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Elegant quotation marks symbol */}
          <div className="font-serif text-6xl md:text-8xl text-maroon/30 leading-none select-none mb-2">
            “
          </div>

          {/* Core Love Quote */}
          <blockquote className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-maroon font-normal tracking-tight leading-tight md:leading-snug max-w-3xl mb-8">
            Two hearts, one beautiful beginning.
          </blockquote>

          {/* Hand-drawn heart accent */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-[1px] bg-gold/50" />
            <Heart className="w-5 h-5 fill-maroon text-maroon animate-pulse" />
            <div className="w-12 h-[1px] bg-gold/50" />
          </div>

          {/* Couple Signoff */}
          <p className="font-script text-2xl sm:text-3xl text-sage-dark font-medium mt-4">
            Akhil &amp; Karthika
          </p>
        </motion.div>
      </div>
    </section>
  );
};
