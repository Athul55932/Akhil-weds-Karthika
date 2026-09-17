import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';

export const Lightbox = ({ image, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-dark/85 backdrop-blur-md cursor-zoom-out"
        role="dialog"
        aria-modal="true"
        aria-label="Photo Lightbox"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-ivory/10 hover:bg-ivory/20 text-ivory transition-colors focus:outline-none focus:ring-2 focus:ring-ivory"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl max-h-[90vh] bg-ivory-light rounded-3xl overflow-hidden shadow-2xl border border-blush/40 flex flex-col cursor-default"
        >
          {/* Image */}
          <div className="relative max-h-[72vh] overflow-hidden flex items-center justify-center bg-black/5">
            <img
              src={image.src}
              alt={image.alt}
              className="w-auto h-auto max-h-[72vh] max-w-full object-contain"
            />
          </div>

          {/* Caption Bar */}
          <div className="p-6 bg-ivory flex items-center justify-between border-t border-blush/40">
            <div>
              <p className="font-script text-2xl text-maroon font-medium">
                {image.caption}
              </p>
              <p className="text-xs uppercase tracking-widest text-charcoal-muted font-light mt-0.5">
                {image.note}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-gold">
              <Sparkles className="w-4 h-4" />
              <Heart className="w-4 h-4 fill-maroon text-maroon" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
