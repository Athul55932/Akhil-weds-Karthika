import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

export const Navbar = ({ isVisible }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'details', 'gallery', 'rsvp'];
      const scrollPos = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Details', href: '#details' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory/90 backdrop-blur-md shadow-sm border-b border-blush/60 py-3'
          : 'bg-ivory/60 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="group flex items-center gap-2 text-maroon hover:text-maroon-hover transition-colors"
          aria-label="Akhil and Karthika - Back to Top"
        >
          <div className="w-9 h-9 rounded-full border border-gold/50 flex items-center justify-center font-serif text-base font-semibold bg-ivory shadow-xs group-hover:scale-105 transition-transform">
            <span>A</span>
            <span className="text-[10px] text-gold mx-0.5">&</span>
            <span>K</span>
          </div>
          <span className="font-serif text-lg font-medium tracking-wide hidden sm:inline">
            Akhil &amp; Karthika
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm tracking-wider uppercase font-medium transition-colors relative py-1 ${
                  isActive
                    ? 'text-maroon font-semibold'
                    : 'text-charcoal-muted hover:text-maroon'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-maroon rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#rsvp"
            onClick={(e) => handleLinkClick(e, '#rsvp')}
            className="px-5 py-2 rounded-full bg-maroon hover:bg-maroon-hover text-ivory text-xs sm:text-sm font-medium tracking-wider uppercase shadow-sm hover:shadow transition-all duration-300 hover:-translate-y-0.5"
          >
            RSVP
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-maroon hover:bg-blush/30 transition-colors focus:outline-none focus:ring-2 focus:ring-maroon"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ivory-light border-b border-blush/60 px-6 py-4 shadow-lg"
          >
            <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-base text-charcoal hover:text-maroon font-medium py-2 border-b border-blush/30 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <Heart className="w-3.5 h-3.5 text-gold" />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
