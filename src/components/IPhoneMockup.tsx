import React, { useState } from 'react';
import { Wifi, Volume2, Wind, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IPhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'cream' | 'sage' | 'lavender';
  activeSound?: string;
  isPlayingSound?: boolean;
  isBreathingActive?: boolean;
  bannerNotification?: {
    title: string;
    message: string;
    icon?: string;
  } | null;
  onDismissNotification?: () => void;
}

export const IPhoneMockup: React.FC<IPhoneMockupProps> = ({
  children,
  className = '',
  theme = 'cream',
  activeSound,
  isPlayingSound = false,
  isBreathingActive = false,
  bannerNotification = null,
  onDismissNotification,
}) => {
  const [isIslandExpanded, setIsIslandExpanded] = useState(false);

  const bgClass =
    theme === 'sage'
      ? 'bg-[#E8EFE8]'
      : theme === 'lavender'
      ? 'bg-[#EFEDF4]'
      : 'bg-[#FDFCF8]';

  return (
    <div className={`relative select-none ${className}`}>
      {/* ============================================================ */}
      {/* HARDWARE BUTTONS (Left: Action + Vol Up/Down, Right: Power)  */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute -left-[3.5px] top-[105px] w-[3.5px] h-[24px] bg-[#3a3533] rounded-l-xs border-l border-white/20 shadow-xs"
      />
      <div
        aria-hidden="true"
        className="absolute -left-[3.5px] top-[145px] w-[3.5px] h-[48px] bg-[#3a3533] rounded-l-xs border-l border-white/20 shadow-xs"
      />
      <div
        aria-hidden="true"
        className="absolute -left-[3.5px] top-[205px] w-[3.5px] h-[48px] bg-[#3a3533] rounded-l-xs border-l border-white/20 shadow-xs"
      />
      <div
        aria-hidden="true"
        className="absolute -right-[3.5px] top-[165px] w-[3.5px] h-[72px] bg-[#3a3533] rounded-r-xs border-r border-white/20 shadow-xs"
      />

      {/* ============================================================ */}
      {/* TITANIUM FRAME (Outer Chassis & Bezel)                      */}
      {/* ============================================================ */}
      <div className="w-full h-full rounded-[52px] bg-gradient-to-b from-[#383330] via-[#1E1B19] to-[#12100F] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.08)_inset]">
        {/* Inner Black Screen Bezel */}
        <div className="w-full h-full rounded-[44px] bg-[#0A0A09] p-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden relative">
          
          {/* ============================================================ */}
          {/* DISPLAY CANVAS                                              */}
          {/* ============================================================ */}
          <div
            className={`w-full h-full rounded-[41px] ${bgClass} text-[#292524] flex flex-col justify-between overflow-hidden relative border border-stone-200/50`}
          >
            {/* Top Status Bar */}
            <div className="pt-2.5 px-6 flex items-center justify-between z-30 shrink-0 select-none relative">
              {/* Clock */}
              <span className="text-[12px] font-semibold tracking-tight text-stone-800 font-sans w-8">
                9:41
              </span>

              {/* ============================================================ */}
              {/* DYNAMIC ISLAND & LIVE ACTIVITY                               */}
              {/* ============================================================ */}
              <div
                onClick={() => setIsIslandExpanded(!isIslandExpanded)}
                className={`transition-all duration-300 ease-out bg-[#000000] text-white rounded-full flex items-center justify-between cursor-pointer shadow-md border border-white/10 z-40 ${
                  bannerNotification
                    ? 'w-[210px] h-[32px] px-3'
                    : isPlayingSound
                    ? 'w-[155px] h-[26px] px-2.5'
                    : isBreathingActive
                    ? 'w-[145px] h-[26px] px-2.5'
                    : 'w-[80px] h-[24px] px-2'
                }`}
              >
                {/* Left Live Content */}
                {bannerNotification ? (
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="text-xs">🌿</span>
                    <span className="text-[10px] font-medium truncate max-w-[130px] text-stone-200">
                      {bannerNotification.title}
                    </span>
                  </div>
                ) : isPlayingSound ? (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFB7B2] animate-ping" />
                    <span className="text-[9.5px] font-medium text-stone-200 truncate max-w-[85px]">
                      {activeSound || 'Rain on Cedar'}
                    </span>
                  </div>
                ) : isBreathingActive ? (
                  <div className="flex items-center gap-1.5">
                    <Wind className="w-3 h-3 text-[#FFB7B2] animate-pulse" />
                    <span className="text-[9.5px] font-medium text-stone-200">
                      Inhale 4s
                    </span>
                  </div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-pulse ml-0.5" />
                )}

                {/* Right Waveform or Camera Lens */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {isPlayingSound && (
                    <div className="flex items-end gap-[1.5px] h-2.5 mr-1">
                      <div className="w-[1.5px] h-2 bg-[#FFB7B2] animate-pulse" />
                      <div className="w-[1.5px] h-3 bg-[#FFB7B2] animate-pulse delay-75" />
                      <div className="w-[1.5px] h-1.5 bg-[#FFB7B2] animate-pulse delay-150" />
                    </div>
                  )}
                  {/* Camera aperture glint */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/15 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#0a1826]" />
                  </div>
                </div>
              </div>

              {/* Status Icons: Cellular, Wifi, Battery */}
              <div className="flex items-center gap-1.5 text-stone-800 w-12 justify-end">
                {/* 4 Cellular Signal Bars */}
                <div className="flex items-end gap-[1.5px] h-3">
                  <div className="w-[2.5px] h-[3px] bg-stone-800 rounded-2xs" />
                  <div className="w-[2.5px] h-[5.5px] bg-stone-800 rounded-2xs" />
                  <div className="w-[2.5px] h-[8px] bg-stone-800 rounded-2xs" />
                  <div className="w-[2.5px] h-[11px] bg-stone-800 rounded-2xs" />
                </div>
                {/* Wifi */}
                <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
                {/* Battery */}
                <div className="flex items-center">
                  <div className="w-[18px] h-[9.5px] rounded-[3px] border border-stone-800 p-[1.5px] flex items-center">
                    <div className="w-full h-full bg-stone-800 rounded-[1.5px]" />
                  </div>
                  <div className="w-[1.5px] h-[3.5px] bg-stone-800 rounded-r-2xs -ml-[0.5px]" />
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* GENTLE NOTIFICATION DROP-DOWN BANNER                        */}
            {/* ============================================================ */}
            <AnimatePresence>
              {bannerNotification && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={onDismissNotification}
                  className="absolute top-12 left-3 right-3 z-50 bg-[#1C1917]/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-white/10 shadow-xl cursor-pointer"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#FFE4E1]/20 flex items-center justify-center text-[#FFB7B2] shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-stone-200 tracking-wide">
                          {bannerNotification.title}
                        </span>
                        <span className="text-[9px] text-stone-400 font-mono">Now</span>
                      </div>
                      <p className="text-[11px] text-stone-300 leading-snug mt-0.5">
                        {bannerNotification.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Screen Content */}
            <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
              {children}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="pb-2 pt-1 flex justify-center z-30 shrink-0 pointer-events-none">
              <div className="w-32 h-1 bg-stone-800/35 rounded-full" />
            </div>

            {/* Photorealistic Curved Screen Glare Overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] rounded-[41px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
