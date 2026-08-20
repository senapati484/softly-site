import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface IPhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'cream' | 'sage' | 'lavender';
  activeTab?: 'breathe' | 'pebble' | 'sanctuary';
}

export const IPhoneMockup: React.FC<IPhoneMockupProps> = ({
  children,
  className = '',
  theme = 'cream',
}) => {
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
      {/* Left Action Button */}
      <div
        aria-hidden="true"
        className="absolute -left-[3.5px] top-[105px] w-[3.5px] h-[24px] bg-[#3a3533] rounded-l-xs border-l border-white/20 shadow-xs"
      />
      {/* Left Volume Up */}
      <div
        aria-hidden="true"
        className="absolute -left-[3.5px] top-[145px] w-[3.5px] h-[48px] bg-[#3a3533] rounded-l-xs border-l border-white/20 shadow-xs"
      />
      {/* Left Volume Down */}
      <div
        aria-hidden="true"
        className="absolute -left-[3.5px] top-[205px] w-[3.5px] h-[48px] bg-[#3a3533] rounded-l-xs border-l border-white/20 shadow-xs"
      />
      {/* Right Power / Lock Button */}
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
          {/* DISPLAY CANVAS (The App Content)                            */}
          {/* ============================================================ */}
          <div
            className={`w-full h-full rounded-[41px] ${bgClass} text-[#292524] flex flex-col justify-between overflow-hidden relative border border-stone-200/50`}
          >
            {/* Top Status Bar & Dynamic Island */}
            <div className="pt-3 px-6 flex items-center justify-between z-30 shrink-0 select-none">
              {/* Clock */}
              <span className="text-[12px] font-semibold tracking-tight text-stone-800 font-sans">
                9:41
              </span>

              {/* Dynamic Island */}
              <div className="w-[100px] h-[26px] bg-[#000000] rounded-full flex items-center justify-between px-3 shadow-md border border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400/90 animate-pulse" />
                  <span className="text-[9px] text-stone-300 font-mono tracking-wider font-semibold">
                    softly
                  </span>
                </div>
                {/* Camera lens glint */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#0a1826]" />
                </div>
              </div>

              {/* Status Icons: Cellular, Wifi, Battery */}
              <div className="flex items-center gap-1.5 text-stone-800">
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
