import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X, Heart } from 'lucide-react';
import { playSoftChime } from '../utils/audio';

interface NavbarProps {
  onOpenBreatheModal: () => void;
  onScrollToWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBreatheModal, onScrollToWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Scenarios', href: '#scenarios' },
    { label: 'Experience', href: '#experience' },
    { label: 'Reflections', href: '#testimonials' },
    { label: 'Questions', href: '#faq' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    playSoftChime(660, 0.8);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        id="main-navigation"
        className={`pointer-events-auto w-[calc(100%-2rem)] max-w-4xl bg-white/70 backdrop-blur-xl border border-stone-200/70 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 ${
          scrolled ? 'shadow-md shadow-stone-900/5 bg-white/85' : 'shadow-sm shadow-stone-900/2'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            id="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              playSoftChime(528, 1.2);
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            {/* Softly App Logo */}
            <img
              src="/logo.png"
              alt="Softly Logo"
              className="w-8 h-8 rounded-full object-cover shadow-xs transition-transform duration-300 group-hover:scale-105 border border-stone-200/60"
            />
            <div className="flex items-baseline gap-1">
              <span className="text-[17px] font-medium tracking-tight text-[#292524]">Softly</span>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium hidden sm:inline-block">app</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                id={`nav-link-${link.label.toLowerCase()}`}
                onClick={() => handleLinkClick(link.href)}
                className="text-[14px] font-medium text-[#78716C] hover:text-[#292524] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="nav-breathe-button"
              onClick={() => {
                playSoftChime(440, 1.0);
                onOpenBreatheModal();
              }}
              title="Take a 1-minute mindful breath"
              className="hidden xs:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#E8EFE8] text-[#292524] hover:bg-[#dce6dc] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-600" />
              <span>Breathe</span>
            </button>

            <button
              id="nav-join-waitlist-cta"
              onClick={() => {
                playSoftChime(580, 1.0);
                onScrollToWaitlist();
              }}
              className="px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-medium bg-[#292524] text-[#FDFCF8] hover:bg-stone-800 transition-all active:scale-95 shadow-xs cursor-pointer"
            >
              Get Softly
            </button>

            {/* Mobile Menu Trigger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-stone-700 hover:text-stone-900 rounded-full"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden pt-4 pb-2 border-t border-stone-200/60 mt-3"
            >
              <div className="flex flex-col gap-3 px-2">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.href)}
                    className="text-left text-sm font-medium text-[#78716C] hover:text-[#292524] py-1"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBreatheModal();
                  }}
                  className="flex items-center gap-2 text-left text-sm font-medium text-stone-700 py-1"
                >
                  <Sparkles className="w-4 h-4 text-[#FFB7B2]" />
                  <span>Take a Mindful Breath</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};
