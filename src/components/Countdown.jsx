import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FloralOrnament, DoodleHeart } from './DecorativeElements';
import { weddingData } from '../data/weddingData';

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    // Target: January 24, 2027 11:00:00 GMT+0530
    const targetDate = new Date(weddingData.event.targetDateISO).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      className="relative py-16 md:py-24 bg-ivory-cream/70 overflow-hidden border-y border-blush/40"
      aria-label="Wedding Countdown"
    >
      {/* Background flourishes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-maroon/5 rounded-full blur-2xl" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-sage/10 rounded-full blur-2xl" />
        <DoodleHeart className="absolute top-8 left-12 w-6 h-6 text-maroon/20 -rotate-12" />
        <DoodleHeart className="absolute bottom-8 right-12 w-6 h-6 text-maroon/20 rotate-12" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Heading flanked by floral ornaments */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 sm:gap-6 mb-10"
        >
          <FloralOrnament className="w-8 h-8 sm:w-10 sm:h-10 text-maroon/40 -scale-x-100" />
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-maroon tracking-wider uppercase font-medium">
              The Countdown Begins
            </h2>
            <p className="font-script text-xl sm:text-2xl text-sage-dark font-medium mt-1">
              Counting every precious heartbeat until "I do"
            </p>
          </div>
          <FloralOrnament className="w-8 h-8 sm:w-10 sm:h-10 text-maroon/40" />
        </motion.div>

        {/* 4 Counter Panels */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="relative p-6 sm:p-8 rounded-3xl bg-ivory-light/95 border border-maroon/20 shadow-card hover:border-maroon/40 transition-all duration-300 group hover:-translate-y-1"
            >
              {/* Corner decorative notch */}
              <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-gold/40 group-hover:bg-maroon transition-colors" />

              {/* Number display */}
              <div className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-maroon tracking-tight mb-2">
                {String(unit.value).padStart(2, '0')}
              </div>

              {/* Label */}
              <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-charcoal-muted font-semibold">
                {unit.label}
              </div>

              {/* Subtle divider effect for desktop */}
              {index < timeUnits.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-blush text-xl font-light">
                  ·
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Target date reminder */}
        <p className="text-xs sm:text-sm text-charcoal-muted mt-8 font-light">
          Sunday, 24 January 2027 · 11:00 AM IST · Prince Convention Centre, Alappuzha
        </p>
      </div>
    </section>
  );
};
