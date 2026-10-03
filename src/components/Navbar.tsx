import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X, Download, ChevronDown, Smartphone, Apple } from 'lucide-react';
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
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Scenarios', href: '#scenarios' },
    { label: 'Experience', href: '#experience' },
    { label: 'Reflections', href: '#testimonials' },
    { label: 'Questions', href: '#faq' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setDownloadOpen(false);
    playSoftChime(660, 0.8);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Backdrop Scrim */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-stone-900/30 backdrop-blur-xs z-30 md:hidden pointer-events-auto"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className="fixed top-3 sm:top-5 left-0 right-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          id="main-navigation"
          className={`pointer-events-auto w-full max-w-4xl transition-[border-radius,box-shadow,background-color] duration-300 ease-out ${
            mobileMenuOpen
              ? 'rounded-[26px] bg-white/95 backdrop-blur-2xl border border-stone-200/90 shadow-2xl shadow-stone-900/10 px-3.5 sm:px-6 pt-2 pb-3.5 sm:pt-2.5 sm:pb-4 max-h-[calc(100dvh-2rem)] overflow-y-auto'
              : `rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 border border-stone-200/70 ${
                  scrolled
                    ? 'shadow-md shadow-stone-900/5 bg-white/90 backdrop-blur-xl'
                    : 'shadow-xs shadow-stone-900/2 bg-white/75 backdrop-blur-md'
                }`
          }`}
        >
          {/* Top Bar Row - Stable Height and Positioning */}
          <div className="flex items-center justify-between gap-2 h-8 sm:h-9">
            {/* Logo */}
            <a
              href="#"
              id="brand-logo"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                playSoftChime(528, 1.2);
              }}
              className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer shrink-0"
            >
              <img
                src="/logo.png"
                alt="Softly Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shadow-xs transition-transform duration-300 group-hover:scale-105 border border-stone-200/60"
              />
              <div className="flex items-baseline gap-1">
                <span className="text-[16px] sm:text-[17px] font-medium tracking-tight text-[#292524]">Softly</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium hidden sm:inline-block">app</span>
              </div>
            </a>

            {/* Desktop Links (Visible on md and larger) */}
            <div className="hidden md:flex items-center gap-5 lg:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-[13.5px] lg:text-[14px] font-medium text-[#78716C] hover:text-[#292524] transition-colors cursor-pointer py-1"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Desktop/Tablet Breathe Pill */}
              <button
                id="nav-breathe-button"
                onClick={() => {
                  playSoftChime(440, 1.0);
                  onOpenBreatheModal();
                }}
                title="Take a 1-minute mindful breath"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#E8EFE8] text-[#292524] hover:bg-[#dce6dc] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                <span>Breathe</span>
              </button>

              {/* Install Dropdown (Desktop & Tablet, and Mobile when drawer is closed) */}
              <AnimatePresence mode="popLayout">
                {!mobileMenuOpen && (
                  <motion.div
                    key="install-dropdown-wrapper"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.16 }}
                    ref={downloadRef}
                    className="relative"
                  >
                    <button
                      id="nav-install-cta"
                      onClick={() => {
                        playSoftChime(580, 1.0);
                        setDownloadOpen((o) => !o);
                      }}
                      className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13.5px] font-medium bg-[#292524] text-[#FDFCF8] hover:bg-stone-800 transition-all active:scale-95 shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Install</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${downloadOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {downloadOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.16 }}
                          className="absolute right-0 top-full mt-2 w-56 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-2xl border border-stone-200/80 rounded-2xl shadow-xl shadow-stone-900/10 overflow-hidden z-50"
                        >
                          <div className="px-3 pt-2.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                            Official Releases
                          </div>
                          <a
                            id="nav-android-download"
                            href={ANDROID_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              playSoftChime(528, 1.0);
                              setDownloadOpen(false);
                            }}
                            className="flex items-center gap-3 px-3.5 py-2.5 text-xs text-[#292524] hover:bg-stone-50 transition-colors no-underline"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#E8EFE8] flex items-center justify-center shrink-0">
                              <svg className="w-4 h-4 text-[#2E7D32]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M17.523 15.341a5.5 5.5 0 0 1-1.249.096H7.726a5.5 5.5 0 0 1-1.249-.096C4.826 14.946 3.5 13.162 3.5 11c0-2.406 1.696-4.414 3.997-4.9L6.2 4.41a.5.5 0 0 1 .89-.454l1.38 2.702A7.34 7.34 0 0 1 12 6.25c1.258 0 2.44.32 3.47.91l1.38-2.703a.5.5 0 0 1 .89.454l-1.297 2.691C18.804 8.086 20.5 10.094 20.5 11c0 2.162-1.326 3.946-2.977 4.341ZM9.5 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-stone-800">Android APK</div>
                              <div className="text-[11px] text-stone-400">60.2 MB · Direct Install</div>
                            </div>
                            <Download className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          </a>
                          <div className="h-px bg-stone-100 mx-3" />
                          <a
                            id="nav-ios-download"
                            href={IOS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              playSoftChime(440, 1.0);
                              setDownloadOpen(false);
                            }}
                            className="flex items-center gap-3 px-3.5 py-2.5 text-xs text-[#292524] hover:bg-stone-50 transition-colors no-underline"
                          >
                            <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
                              <svg className="w-4 h-4 text-stone-800" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-stone-800">iOS IPA</div>
                              <div className="text-[11px] text-stone-400">11.6 MB · Direct Install</div>
                            </div>
                            <Download className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Menu Toggle Button with 90deg smooth icon rotation */}
              <button
                id="mobile-menu-toggle"
                onClick={() => {
                  playSoftChime(mobileMenuOpen ? 420 : 540, 0.6);
                  setMobileMenuOpen(!mobileMenuOpen);
                  setDownloadOpen(false);
                }}
                className="md:hidden w-8 h-8 flex items-center justify-center text-stone-700 hover:text-stone-900 rounded-full border border-stone-200/80 bg-stone-50/70 hover:bg-stone-100 active:scale-90 transition-all cursor-pointer shadow-2xs"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close-icon"
                      initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu-icon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile Expanded Menu Drawer with Smooth Physics & Staggered Reveal */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                key="mobile-drawer"
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                  transition: {
                    height: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.22, ease: 'easeOut' },
                  },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.14, ease: 'easeIn' },
                  },
                }}
                className="md:hidden overflow-hidden pt-2.5 border-t border-stone-200/60 mt-2.5"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.035,
                        delayChildren: 0.04,
                      },
                    },
                  }}
                >
                  {/* Navigation Links */}
                  <div className="flex flex-col gap-1 pb-2.5">
                    {navLinks.map((link) => (
                      <motion.button
                        key={link.label}
                        variants={{
                          hidden: { opacity: 0, y: -6 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                          },
                        }}
                        onClick={() => handleLinkClick(link.href)}
                        className="flex items-center justify-between text-left text-[15px] font-medium text-stone-700 hover:text-stone-950 px-3 py-2 rounded-xl hover:bg-stone-100/60 active:bg-stone-100 transition-colors"
                      >
                        <span>{link.label}</span>
                        <span className="text-xs text-stone-400">→</span>
                      </motion.button>
                    ))}

                    {/* Mindful Breath Button */}
                    <motion.button
                      variants={{
                        hidden: { opacity: 0, y: -6 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        playSoftChime(440, 1.0);
                        onOpenBreatheModal();
                      }}
                      className="flex items-center gap-2.5 text-left text-[14px] font-medium text-stone-800 px-3 py-2.5 rounded-xl bg-[#E8EFE8]/70 hover:bg-[#E8EFE8] transition-colors mt-1"
                    >
                      <Sparkles className="w-4 h-4 text-[#e07a74]" />
                      <span>Take a Mindful Breath</span>
                      <span className="ml-auto text-[11px] font-semibold text-stone-500 bg-white/80 px-2 py-0.5 rounded-full">
                        1 min
                      </span>
                    </motion.button>
                  </div>

                  {/* Mobile Install App Cards */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -6 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="pt-2.5 border-t border-stone-200/60 space-y-2 pb-1"
                  >
                    <div className="px-1 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      Install Softly App
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={ANDROID_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          playSoftChime(528, 1.0);
                          setMobileMenuOpen(false);
                        }}
                        className="flex flex-col justify-between p-3 rounded-2xl bg-[#292524] text-white hover:bg-stone-800 transition-all no-underline shadow-xs"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <svg className="w-5 h-5 text-[#3DDC84]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.523 15.341a5.5 5.5 0 0 1-1.249.096H7.726a5.5 5.5 0 0 1-1.249-.096C4.826 14.946 3.5 13.162 3.5 11c0-2.406 1.696-4.414 3.997-4.9L6.2 4.41a.5.5 0 0 1 .89-.454l1.38 2.702A7.34 7.34 0 0 1 12 6.25c1.258 0 2.44.32 3.47.91l1.38-2.703a.5.5 0 0 1 .89.454l-1.297 2.691C18.804 8.086 20.5 10.094 20.5 11c0 2.162-1.326 3.946-2.977 4.341ZM9.5 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
                          </svg>
                          <Download className="w-3.5 h-3.5 text-stone-400" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold">Android</div>
                          <div className="text-[10px] text-stone-400">APK · 60.2 MB</div>
                        </div>
                      </a>

                      <a
                        href={IOS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          playSoftChime(440, 1.0);
                          setMobileMenuOpen(false);
                        }}
                        className="flex flex-col justify-between p-3 rounded-2xl bg-white border border-stone-200/90 text-stone-900 hover:bg-stone-50 transition-all no-underline shadow-xs"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <svg className="w-5 h-5 text-stone-800" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                          </svg>
                          <Download className="w-3.5 h-3.5 text-stone-400" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold">iOS</div>
                          <div className="text-[10px] text-stone-500">IPA · 11.6 MB</div>
                        </div>
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>
    </>
  );
};

