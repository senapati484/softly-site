import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, Download } from 'lucide-react';
import { playSoftChime } from '../utils/audio';

const ANDROID_URL = 'https://sourceforge.net/projects/softly/files/1.0.0/Softly.apk/download';
const IOS_URL = 'https://sourceforge.net/projects/softly/files/1.0.0/Softly.ipa/download';

interface HeroSectionProps {
  onOpenBreatheModal: () => void;
  onScrollToWaitlist: () => void;
  onScrollToExperience: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBreatheModal,
  onScrollToWaitlist,
  onScrollToExperience,
}) => {
  return (
    <section
      id="hero-section"
      className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Two large blurred background blobs at 60% opacity */}
      <div
        aria-hidden="true"
        className="absolute top-12 -left-20 sm:left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#FFE4E1] opacity-60 blur-3xl -z-10 animate-float pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-28 -right-20 sm:right-1/4 w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full bg-[#E6E6FA] opacity-60 blur-3xl -z-10 animate-float-alt pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/3 w-64 h-64 rounded-full bg-[#E8EFE8] opacity-40 blur-3xl -z-10 pointer-events-none"
      />

      {/* Gentle Tagline Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#E8EFE8]/80 backdrop-blur-md border border-stone-200/60 mb-6 text-xs sm:text-sm font-medium text-[#292524] max-w-[92vw] text-center"
      >
        <span className="w-2 h-2 rounded-full bg-[#FFB7B2] animate-pulse shrink-0"></span>
        <span className="tracking-wide">A digital living room for mindful living</span>
      </motion.div>

      {/* Primary Headline in Outfit with handwritten Reenie Beanie cursive */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-[32px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-[72px] font-normal tracking-[-0.025em] text-[#292524] max-w-4xl leading-[1.12] sm:leading-[1.12] mb-6"
      >
        Reclaim your mind,{' '}
        <span className="font-cursive text-[44px] xs:text-5xl sm:text-7xl md:text-8xl text-[#e8908a] inline-block font-normal transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          softly
        </span>{' '}
        and without the urgency.
      </motion.h1>

      {/* Sub-headline */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[500px] text-[15px] sm:text-lg text-[#78716C] leading-relaxed font-normal mb-8 sm:mb-10 px-2"
      >
        No toxic streaks, flashing red badges, or dopamine loops. An intentional companion that lets you breathe, reflect, and put your phone down.
      </motion.p>

      {/* Install CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 w-full max-w-[320px] sm:max-w-md sm:justify-center mb-6 sm:mb-8"
      >
        {/* Android APK Download */}
        <a
          id="hero-android-download"
          href={ANDROID_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSoftChime(528, 1.2)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full text-[14.5px] sm:text-[15px] font-medium bg-[#292524] text-[#FDFCF8] shadow-[0_4px_20px_-2px_rgba(41,37,36,0.35)] hover:shadow-[0_8px_28px_-2px_rgba(41,37,36,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline"
        >
          {/* Android robot icon */}
          <svg className="w-5 h-5 shrink-0 text-[#3DDC84]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.523 15.341a5.5 5.5 0 0 1-1.249.096H7.726a5.5 5.5 0 0 1-1.249-.096C4.826 14.946 3.5 13.162 3.5 11c0-2.406 1.696-4.414 3.997-4.9L6.2 4.41a.5.5 0 0 1 .89-.454l1.38 2.702A7.34 7.34 0 0 1 12 6.25c1.258 0 2.44.32 3.47.91l1.38-2.703a.5.5 0 0 1 .89.454l-1.297 2.691C18.804 8.086 20.5 10.094 20.5 11c0 2.162-1.326 3.946-2.977 4.341ZM9.5 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
          </svg>
          <span>Install for Android</span>
        </a>

        {/* iOS IPA Download */}
        <a
          id="hero-ios-download"
          href={IOS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSoftChime(440, 1.0)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full text-[14.5px] sm:text-[15px] font-medium bg-white/90 hover:bg-white text-[#292524] border border-stone-200 hover:border-stone-300 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline"
        >
          {/* Apple logo */}
          <svg className="w-5 h-5 shrink-0 text-stone-800" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <span>Install for iOS</span>
        </a>
      </motion.div>

      {/* Breathe secondary action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 sm:mb-14"
      >
        <button
          id="hero-breathe-cta"
          onClick={() => {
            playSoftChime(440, 1.0);
            onOpenBreatheModal();
          }}
          className="inline-flex items-center gap-2 text-sm text-[#78716C] hover:text-[#292524] transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-stone-400" />
          <span className="underline underline-offset-2 decoration-stone-300">or try the 3-minute mindful pause first</span>
        </button>
      </motion.div>

      {/* Gentle Proof Micro-Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-10 text-xs text-[#78716C] pt-2 px-3"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
          <span>Zero notifications during sleep</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
          <span>No social comparison feeds</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
          <span>Tactile haptics & analog pacing</span>
        </div>
      </motion.div>

      {/* Subtle Down Indicator */}
      <motion.button
        onClick={onScrollToExperience}
        aria-label="Scroll down to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1, y: 3 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-14 sm:mt-16 p-2 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </motion.button>
    </section>
  );
};
