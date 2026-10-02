import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X, Download, ChevronDown } from 'lucide-react';
import { playSoftChime } from '../utils/audio';

const ANDROID_URL = 'https://sourceforge.net/projects/softly/files/1.0.0/Softly.apk/download';
const IOS_URL = 'https://sourceforge.net/projects/softly/files/1.0.0/Softly.ipa/download';

interface NavbarProps {
  onOpenBreatheModal: () => void;
  onScrollToWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBreatheModal, onScrollToWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (downloadRef.current && !downloadRef.current.contains(e.target as Node)) {
        setDownloadOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
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

            {/* Install Dropdown */}
            <div ref={downloadRef} className="relative">
              <button
                id="nav-install-cta"
                onClick={() => {
                  playSoftChime(580, 1.0);
                  setDownloadOpen((o) => !o);
                }}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-medium bg-[#292524] text-[#FDFCF8] hover:bg-stone-800 transition-all active:scale-95 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${downloadOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {downloadOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white/95 backdrop-blur-xl border border-stone-200/80 rounded-2xl shadow-xl shadow-stone-900/10 overflow-hidden z-50"
                  >
                    <a
                      id="nav-android-download"
                      href={ANDROID_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => { playSoftChime(528, 1.0); setDownloadOpen(false); }}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#292524] hover:bg-stone-50 transition-colors no-underline"
                    >
                      <svg className="w-5 h-5 shrink-0 text-[#3DDC84]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.523 15.341a5.5 5.5 0 0 1-1.249.096H7.726a5.5 5.5 0 0 1-1.249-.096C4.826 14.946 3.5 13.162 3.5 11c0-2.406 1.696-4.414 3.997-4.9L6.2 4.41a.5.5 0 0 1 .89-.454l1.38 2.702A7.34 7.34 0 0 1 12 6.25c1.258 0 2.44.32 3.47.91l1.38-2.703a.5.5 0 0 1 .89.454l-1.297 2.691C18.804 8.086 20.5 10.094 20.5 11c0 2.162-1.326 3.946-2.977 4.341ZM9.5 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
                      </svg>
                      <div>
                        <div className="font-medium">Android APK</div>
                        <div className="text-xs text-stone-400">60.2 MB · v1.0.0</div>
                      </div>
                    </a>
                    <div className="h-px bg-stone-100 mx-3" />
                    <a
                      id="nav-ios-download"
                      href={IOS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => { playSoftChime(440, 1.0); setDownloadOpen(false); }}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#292524] hover:bg-stone-50 transition-colors no-underline"
                    >
                      <svg className="w-5 h-5 shrink-0 text-stone-800" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div>
                        <div className="font-medium">iOS IPA</div>
                        <div className="text-xs text-stone-400">11.6 MB · v1.0.0</div>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
