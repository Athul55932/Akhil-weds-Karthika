import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Maximize2, Sparkles } from 'lucide-react';
import { TapeCorner, BotanicalBranch, DoodleHeart, FloralOrnament } from './DecorativeElements';
import { Lightbox } from './Lightbox';
import { weddingData } from '../data/weddingData';

export const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section
      id="gallery"
      className="relative py-20 md:py-32 bg-ivory-cream/40 overflow-hidden"
      aria-label="Couple Moments Photo Gallery"
    >
      {/* Ambient background sketches */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-blush/30 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-sage-soft/30 blur-3xl" />
        <BotanicalBranch className="absolute top-16 left-6 w-24 md:w-32 h-auto text-maroon/20 rotate-12" />
        <BotanicalBranch className="absolute bottom-20 right-8 w-28 md:w-40 h-auto text-sage/30 -rotate-30" />
        <DoodleHeart className="absolute top-40 right-20 w-7 h-7 text-maroon/25 rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-sage-dark font-semibold">
            Visual Memories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-maroon font-normal tracking-tight mt-2 mb-4">
            Our Moments
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mb-4" />
          <p className="font-sans text-charcoal-muted text-base">
            Every glance, every smile, every quiet moment leading to our forever.
          </p>
        </div>

        {/* Asymmetric Staggered Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-6 md:gap-8 items-start">
          {weddingData.images.gallery.map((photo, index) => {
            // Alternating tape positions
            const tapeClass =
              index % 2 === 0
                ? 'w-16 sm:w-20 h-5 sm:h-6 -top-2.5 sm:-top-3 left-6 sm:left-8 -rotate-3'
                : 'w-16 sm:w-20 h-5 sm:h-6 -top-2.5 sm:-top-3 right-6 sm:right-8 rotate-2';

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className={`${photo.span} relative group w-full`}
              >
                {/* Photo Card with Polaroid Border and Tape */}
                <div
                  onClick={() => setSelectedPhoto(photo)}
                  className={`cursor-pointer relative bg-ivory-light p-3 sm:p-4 pb-5 sm:pb-8 rounded-2xl shadow-card hover:shadow-polaroid border border-blush/70 transition-all duration-500 transform sm:${photo.rotation} hover:rotate-0 hover:-translate-y-1.5`}
                >
                  {/* Washi Tape Corner Detail */}
                  <TapeCorner className={tapeClass} />

                  {/* Image Container */}
                  <div className={`relative ${photo.aspect} rounded-xl overflow-hidden bg-ivory-cream mb-3`}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Hover Overlay with expand icon */}
                    <div className="absolute inset-0 bg-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ivory/90 text-maroon flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Handwritten Caption & Tag */}
                  <div className="flex items-center justify-between px-1">
                    <p className="font-script text-xl sm:text-2xl text-maroon font-semibold tracking-wide">
                      {photo.caption}
                    </p>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-charcoal-light font-light flex items-center gap-1">
                      <Heart className="w-3 h-3 text-gold fill-gold" />
                      {photo.note}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Gallery bottom footnote */}
        <div className="text-center mt-12 text-xs text-charcoal-light font-light">
          Tip: Click any photograph to view in full resolution
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox image={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  );
};
