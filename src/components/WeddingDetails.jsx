import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus, Heart, Sparkles } from 'lucide-react';
import { TapeCorner, BotanicalBranch, DoodleHeart, FloralOrnament } from './DecorativeElements';
import { weddingData } from '../data/weddingData';

export const WeddingDetails = () => {
  // Generate Google Calendar Link
  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Akhil & Karthika's Wedding Ceremony");
    const details = encodeURIComponent(
      "With the blessings of our families, we joyfully invite you to celebrate our wedding. Ceremony: 11:00 AM - 11:30 AM followed by traditional Kerala Sadya."
    );
    const location = encodeURIComponent("Prince Convention Centre, Alappuzha, Kerala");
    // 2027-01-24T11:00:00 to 14:00:00 IST (UTC+5:30 -> 05:30 to 08:30 UTC)
    const dates = "20270124T053000Z/20270124T083000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <section
      id="details"
      className="relative py-20 md:py-32 bg-ivory overflow-hidden"
      aria-label="Wedding Event Details"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-blush/30 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-sage-soft/35 blur-3xl" />
        <BotanicalBranch className="absolute top-10 right-8 w-28 md:w-36 h-auto text-maroon/20 -rotate-12" />
        <BotanicalBranch className="absolute bottom-10 left-8 w-32 md:w-40 h-auto text-sage/30 rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-sage-dark font-semibold">
            Sacred Celebrations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-maroon font-normal tracking-tight mt-2 mb-4">
            The Wedding
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mb-4" />
          <p className="font-sans text-charcoal-muted text-base">
            We invite you to witness our auspicious union and celebrate with us in the tranquil heart of Kerala's backwaters.
          </p>
        </div>

        {/* Main 2-Panel Card Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Panel: Event Text & Location Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-ivory-light/95 border border-blush/80 rounded-3xl p-6 sm:p-10 shadow-card relative"
          >
            {/* Top decorative badge */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-blush/40">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="font-script text-2xl text-maroon font-medium">
                  Muhurtham &amp; Feast
                </span>
              </div>
              <span className="text-xs uppercase tracking-widest text-charcoal-light font-medium bg-ivory px-3 py-1 rounded-full border border-blush/60">
                Kerala, India
              </span>
            </div>

            {/* Event Specs List */}
            <div className="space-y-6 mb-8">
              {/* Date */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-ivory border border-blush text-maroon mt-1 shadow-xs">
                  <Calendar className="w-5 h-5 text-maroon" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-charcoal font-medium">
                    Sunday, 24 January 2027
                  </h3>
                  <p className="text-sm text-charcoal-muted font-light mt-0.5">
                    Makaram Month · Auspicious Muhurtham Day
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-ivory border border-blush text-maroon mt-1 shadow-xs">
                  <Clock className="w-5 h-5 text-maroon" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-charcoal font-medium">
                    11:00 AM – 11:30 AM
                  </h3>
                  <p className="text-sm text-charcoal-muted font-light mt-0.5">
                    Wedding Ceremony followed by Grand Kerala Sadya at 12:00 PM
                  </p>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-ivory border border-blush text-maroon mt-1 shadow-xs">
                  <MapPin className="w-5 h-5 text-maroon" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-charcoal font-medium">
                    Prince Convention Centre
                  </h3>
                  <p className="text-sm text-charcoal-muted font-light mt-0.5 leading-relaxed">
                    NH 66, Kalavoor, Alappuzha, Kerala 688522
                  </p>
                </div>
              </div>
            </div>

            {/* Actions: View Location + Add to Calendar */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-blush/40">
              <a
                href={weddingData.event.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-maroon hover:bg-maroon-hover text-ivory text-sm font-medium tracking-wider uppercase shadow-sm transition-all duration-300 hover:shadow-maroon hover:-translate-y-0.5"
              >
                <span>View Location</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={createGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ivory hover:bg-blush/30 text-charcoal border border-blush/80 text-sm font-medium tracking-wider uppercase shadow-2xs transition-all duration-300 hover:-translate-y-0.5"
              >
                <CalendarPlus className="w-4 h-4 text-maroon" />
                <span>Add to Calendar</span>
              </a>
            </div>
          </motion.div>

          {/* Right Panel: Polaroid Taped Photo Card with Kerala Backwaters */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center relative"
          >
            {/* Polaroid Wrapper */}
            <div className="relative bg-ivory-light p-4 pb-8 rounded-2xl shadow-polaroid border border-blush/60 max-w-sm w-full transform hover:rotate-0 transition-transform duration-500">
              {/* Tape Sticker on top center */}
              <TapeCorner className="w-24 h-7 -top-3 left-1/2 -translate-x-1/2 -rotate-2" />

              {/* Destination Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-ivory-cream">
                <img
                  src={weddingData.images.venueLandscape}
                  alt="Kerala Backwaters Venue Destination"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
              </div>

              {/* Handwritten Note at Bottom */}
              <div className="text-center pt-2">
                <p className="font-script text-3xl text-maroon font-semibold tracking-wide flex items-center justify-center gap-2">
                  See you there! <Heart className="w-5 h-5 fill-maroon text-maroon inline" />
                </p>
                <p className="text-xs uppercase tracking-widest text-charcoal-light font-light mt-1">
                  Alappuzha · God's Own Country
                </p>
              </div>
            </div>

            {/* Supporting subtle branch */}
            <BotanicalBranch className="absolute -bottom-6 -right-6 w-24 h-auto text-sage/40 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
