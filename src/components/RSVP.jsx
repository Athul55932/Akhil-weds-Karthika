import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, CheckCircle2, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BotanicalBranch, DoodleHeart, FloralOrnament } from './DecorativeElements';

export const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'accept', // 'accept' | 'decline'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name';
    }
    if (!formData.attendance) {
      errs.attendance = 'Please let us know if you can attend';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate brief smooth interaction
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory gold and maroon confetti if accepted
      if (formData.attendance === 'accept') {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#7A1C28', '#D4AF37', '#E8D3D3', '#7D8B75', '#FAF7F2'],
          });
        } catch (e) {
          // graceful fallback
        }
      }
    }, 400);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', attendance: 'accept' });
    setErrors({});
  };

  return (
    <section
      id="rsvp"
      className="relative py-20 md:py-32 bg-ivory-cream/50 overflow-hidden"
      aria-label="RSVP Form"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 right-10 w-96 h-96 rounded-full bg-blush/30 blur-3xl" />
        <div className="absolute bottom-10 -left-10 w-96 h-96 rounded-full bg-sage-soft/30 blur-3xl" />
        <BotanicalBranch className="absolute top-12 left-10 w-28 md:w-36 h-auto text-maroon/20 -rotate-12" />
        <BotanicalBranch className="absolute bottom-12 right-10 w-32 md:w-44 h-auto text-sage/30 rotate-160" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main RSVP Card */}
        <div className="relative bg-ivory-light/95 border border-blush/80 rounded-3xl p-6 sm:p-10 md:p-12 shadow-card">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="rsvp-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header & Handwritten Badge */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-sage-dark font-semibold">
                      Your Presence Is Our Blessing
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-maroon font-normal tracking-tight mt-1">
                      We Would Love to Celebrate with You
                    </h2>
                    <p className="text-sm text-charcoal-muted mt-2 font-light">
                      Please respond by 10 January 2027 so we can make thoughtful arrangements for your presence.
                    </p>
                  </div>

                  {/* Handwritten Badge on the right */}
                  <div className="self-start md:self-auto px-5 py-2 rounded-2xl bg-ivory border border-blush/70 shadow-xs flex items-center gap-2 transform rotate-2">
                    <span className="font-script text-2xl sm:text-3xl text-maroon font-semibold">
                      Kindly RSVP
                    </span>
                    <Heart className="w-4 h-4 fill-maroon text-maroon" />
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="guest-name"
                      className="block text-sm uppercase tracking-wider font-semibold text-charcoal mb-2"
                    >
                      Your Name <span className="text-maroon">*</span>
                    </label>
                    <input
                      id="guest-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="Enter your full name"
                      className={`w-full px-5 py-3.5 rounded-2xl bg-ivory border text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? 'border-maroon focus:ring-maroon/30 bg-maroon/5'
                          : 'border-blush focus:border-maroon focus:ring-maroon/20'
                      }`}
                      aria-required="true"
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1.5 text-maroon text-xs mt-2 font-medium">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Attendance Radio Selection */}
                  <div>
                    <span className="block text-sm uppercase tracking-wider font-semibold text-charcoal mb-3">
                      Will you be attending? <span className="text-maroon">*</span>
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Joyfully Accept */}
                      <label
                        className={`relative flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                          formData.attendance === 'accept'
                            ? 'bg-ivory border-maroon shadow-xs text-maroon'
                            : 'bg-ivory/50 border-blush/80 text-charcoal hover:border-maroon/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="accept"
                          checked={formData.attendance === 'accept'}
                          onChange={() => setFormData({ ...formData, attendance: 'accept' })}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            formData.attendance === 'accept'
                              ? 'border-maroon'
                              : 'border-charcoal-light/40'
                          }`}
                        >
                          {formData.attendance === 'accept' && (
                            <div className="w-2.5 h-2.5 rounded-full bg-maroon" />
                          )}
                        </div>
                        <div>
                          <span className="font-serif text-base font-semibold block">
                            Joyfully Accept
                          </span>
                          <span className="text-xs text-charcoal-muted font-light">
                            Wouldn't miss it for the world
                          </span>
                        </div>
                      </label>

                      {/* Regretfully Decline */}
                      <label
                        className={`relative flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                          formData.attendance === 'decline'
                            ? 'bg-ivory border-maroon shadow-xs text-maroon'
                            : 'bg-ivory/50 border-blush/80 text-charcoal hover:border-maroon/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="decline"
                          checked={formData.attendance === 'decline'}
                          onChange={() => setFormData({ ...formData, attendance: 'decline' })}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            formData.attendance === 'decline'
                              ? 'border-maroon'
                              : 'border-charcoal-light/40'
                          }`}
                        >
                          {formData.attendance === 'decline' && (
                            <div className="w-2.5 h-2.5 rounded-full bg-maroon" />
                          )}
                        </div>
                        <div>
                          <span className="font-serif text-base font-semibold block">
                            Regretfully Decline
                          </span>
                          <span className="text-xs text-charcoal-muted font-light">
                            Will be celebrating in spirit
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-maroon hover:bg-maroon-hover text-ivory rounded-full font-medium tracking-wider uppercase shadow-maroon transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-70"
                    >
                      <span>{isSubmitting ? 'Submitting...' : 'Submit RSVP'}</span>
                      <Send className="w-4 h-4 text-gold-light" />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              /* Success Confirmation Card State */
              <motion.div
                key="rsvp-confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8 px-4"
              >
                <div className="w-16 h-16 rounded-full bg-maroon/10 text-maroon flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="font-script text-3xl sm:text-4xl text-maroon font-semibold block mb-2">
                  Thank You, {formData.name.trim()}!
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal mb-4">
                  {formData.attendance === 'accept'
                    ? "We Can't Wait to Celebrate with You!"
                    : "You Will Be Missed Dearly!"}
                </h3>

                <p className="text-base text-charcoal-muted max-w-lg mx-auto mb-8 leading-relaxed font-light">
                  {formData.attendance === 'accept'
                    ? "Your response has been saved. We are deeply honored to have you witness our vows on 24 January 2027 in Alappuzha, Kerala."
                    : "Thank you for letting us know. Though you cannot be physically present, your warm blessings and love mean the world to us."}
                </p>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-blush hover:border-maroon text-charcoal-muted hover:text-maroon text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Change Response</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};
