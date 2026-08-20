import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Play, Sparkles, Feather, ShieldCheck } from 'lucide-react';
import { playSoftChime } from '../utils/audio';

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
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8EFE8]/80 backdrop-blur-md border border-stone-200/60 mb-6 text-xs sm:text-sm font-medium text-[#292524]"
      >
        <span className="w-2 h-2 rounded-full bg-[#FFB7B2] animate-pulse"></span>
        <span className="tracking-wide">A digital living room for mindful living</span>
      </motion.div>

      {/* Primary Headline in Outfit with handwritten Reenie Beanie cursive */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl md:text-7xl lg:text-[72px] font-normal tracking-[-0.025em] text-[#292524] max-w-4xl leading-[1.1] sm:leading-[1.12] mb-6"
      >
        Reclaim your mind,{' '}
        <span className="font-cursive text-5xl sm:text-7xl md:text-8xl text-[#e8908a] inline-block font-normal transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          softly
        </span>{' '}
        and without the urgency.
      </motion.h1>

      {/* Sub-headline max-width 500px */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[500px] text-base sm:text-lg text-[#78716C] leading-relaxed font-normal mb-8 sm:mb-10 px-2"
      >
        No toxic streaks, flashing red badges, or dopamine loops. An intentional companion that lets you breathe, reflect, and put your phone down.
      </motion.p>

      {/* Dual CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-md sm:justify-center mb-12 sm:mb-14"
      >
        {/* Primary Coral CTA Button */}
        <button
          id="hero-primary-cta"
          onClick={() => {
            playSoftChime(528, 1.2);
            onScrollToWaitlist();
          }}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full text-[15px] font-medium bg-[#FFB7B2] text-[#292524] shadow-[0_4px_20px_-2px_rgba(255,183,178,0.6)] hover:shadow-[0_8px_28px_-2px_rgba(255,183,178,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          Join the Quiet Waitlist
        </button>

        {/* Secondary White Button with 1px stone-200 border */}
        <button
          id="hero-secondary-cta"
          onClick={() => {
            playSoftChime(440, 1.0);
            onOpenBreatheModal();
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-medium bg-white/90 hover:bg-white text-[#292524] border border-stone-200 hover:border-stone-300 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-stone-500" />
          <span>Try 3-Minute Pause</span>
        </button>
      </motion.div>

      {/* Gentle Proof Micro-Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#78716C] pt-2"
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
