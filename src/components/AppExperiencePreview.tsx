import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Wind,
  Moon,
  Sun,
  Shield,
  Volume2,
  BookOpen,
  Coffee,
  CheckCircle2,
  Play,
  Pause,
  Clock,
  Heart
} from 'lucide-react';
import { playSoftChime } from '../utils/audio';

interface AppExperiencePreviewProps {
  onOpenBreatheModal: () => void;
}

export const AppExperiencePreview: React.FC<AppExperiencePreviewProps> = ({ onOpenBreatheModal }) => {
  const [activeSound, setActiveSound] = useState<string>('Rain on Cedar');
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [unplugPace, setUnplugPace] = useState(72);

  const toggleSound = (sound: string) => {
    setActiveSound(sound);
    setIsPlayingSound(!isPlayingSound);
    playSoftChime(isPlayingSound ? 380 : 540, 1.0);
  };

  return (
    <section id="experience" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient halos */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[800px] h-[550px] sm:h-[800px] bg-gradient-to-tr from-[#FFE4E1]/30 via-[#EFEDF4]/40 to-[#E8EFE8]/30 rounded-full blur-3xl -z-10 pointer-events-none"
      />

      <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 block">
          Interface Design
        </span>
        <h2 className="text-3xl sm:text-5xl font-normal text-[#292524] tracking-tight mb-4">
          Tactile, gentle, and{' '}
          <span className="font-cursive text-4xl sm:text-6xl text-[#FFB7B2]">unhurried</span>
        </h2>
        <p className="max-w-xl mx-auto text-base sm:text-lg text-[#78716C]">
          No infinite scroll feeds or red notification dots. Every screen in Softly is designed to feel like stepping into a sunlit cedar room.
        </p>
      </div>

      {/* Three-mockup stacked layout container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-6 max-w-6xl mx-auto pb-12">
        
        {/* Left Phone: 280x580px, opacity 80%, translateY +48px, Sage (#E8EFE8) screen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          whileHover={{ opacity: 1, scale: 1.02 }}
          id="mockup-phone-left"
          className="w-[280px] h-[580px] rounded-[2.5rem] bg-[#292524] p-3 shadow-xl lg:translate-y-12 transition-all duration-300 relative group shrink-0"
        >
          {/* Outer Phone Shell */}
          <div className="w-full h-full rounded-[2rem] bg-[#E8EFE8] text-[#292524] p-5 flex flex-col justify-between overflow-hidden relative border border-stone-200/50">
            {/* Top Phone Speaker / Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-stone-300/40 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-400/50" />
            </div>

            {/* Content Top */}
            <div className="pt-5 space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>09:41</span>
                <span className="px-2 py-0.5 rounded-full bg-white/70 text-[10px]">Slow Note</span>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">Today's Reflection</span>
                <h3 className="text-lg font-medium text-[#292524] mt-0.5">Morning Pebble</h3>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-stone-200/60 shadow-xs space-y-2">
                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "Notice the way the light hits the floorboards. You do not have to conquer today; simply be in it."
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Entry #142</span>
                  <Heart className="w-3.5 h-3.5 text-[#FFB7B2] fill-[#FFB7B2]" />
                </div>
              </div>

              {/* Ambient Soundscape selector */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Ambient Noise</span>
                <div className="space-y-1.5">
                  {['Rain on Cedar', 'Forest Wind', 'Old Library'].map((sound) => (
                    <button
                      key={sound}
                      onClick={() => toggleSound(sound)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeSound === sound
                          ? 'bg-white text-[#292524] shadow-xs'
                          : 'bg-white/40 text-stone-600 hover:bg-white/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Volume2 className="w-3 h-3 text-stone-400" />
                        {sound}
                      </span>
                      {activeSound === sound && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFB7B2] animate-ping" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom mini indicator */}
            <div className="bg-white/60 p-2.5 rounded-xl text-center text-[11px] text-stone-600">
              <span>🌿 14 days of mindful mornings</span>
            </div>
          </div>
        </motion.div>

        {/* Center Phone: 300x620px, fully opaque, Coral (#FFB7B2) pulsing 'Breathe' button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          id="mockup-phone-center"
          className="w-[300px] h-[620px] rounded-[2.75rem] bg-[#292524] p-3.5 shadow-2xl z-20 relative shrink-0 transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* Inner Phone Screen */}
          <div className="w-full h-full rounded-[2.25rem] bg-[#FDFCF8] text-[#292524] p-6 flex flex-col justify-between overflow-hidden relative border border-stone-200/60">
            {/* Speaker Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-200/70 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-stone-400/40" />
            </div>

            {/* Screen Top Header */}
            <div className="pt-4">
              <div className="flex items-center justify-between text-xs text-stone-400 font-medium mb-4">
                <span>09:41</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Quiet Room
                </span>
              </div>

              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Living Room</span>
              <h3 className="text-2xl font-normal text-[#292524] mt-0.5">
                Good afternoon,{' '}
                <span className="font-cursive text-2xl text-[#e07a74]">Elena</span>
              </h3>
              <p className="text-xs text-stone-500 mt-1">Your space is quiet and ready.</p>
            </div>

            {/* Center Pulsing Breathe Button Interactive Container */}
            <div className="my-auto flex flex-col items-center justify-center py-4">
              <button
                id="interactive-phone-breathe-button"
                onClick={() => {
                  playSoftChime(528, 1.5);
                  onOpenBreatheModal();
                }}
                className="relative group cursor-pointer"
                title="Click to start 1-minute calming breath"
              >
                {/* Coral Pulsing Outer Rings */}
                <div className="w-36 h-36 rounded-full bg-[#FFB7B2]/30 animate-breathe flex items-center justify-center transition-all duration-500 group-hover:bg-[#FFB7B2]/45">
                  <div className="w-28 h-28 rounded-full bg-[#FFB7B2]/70 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {/* Inner Core */}
                    <div className="w-20 h-20 rounded-full bg-[#FFB7B2] shadow-lg flex flex-col items-center justify-center text-[#292524]">
                      <Wind className="w-6 h-6 text-[#292524] animate-pulse" />
                      <span className="text-xs font-semibold uppercase tracking-wider mt-1">Breathe</span>
                    </div>
                  </div>
                </div>
              </button>
              <span className="text-[11px] text-stone-400 mt-3 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FFB7B2]" />
                Tap to begin 4-7-8 calm
              </span>
            </div>

            {/* Screen Bottom Controls */}
            <div className="space-y-3">
              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-stone-800">Unplug Window</div>
                  <div className="text-[10px] text-stone-400">Next auto-pause in 45 min</div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8EFE8] text-stone-700">
                  Active
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Phone: 280x580px, opacity 80%, translateY +96px, Lavender (#EFEDF4) screen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ opacity: 1, scale: 1.02 }}
          id="mockup-phone-right"
          className="w-[280px] h-[580px] rounded-[2.5rem] bg-[#292524] p-3 shadow-xl lg:translate-y-24 transition-all duration-300 relative group shrink-0"
        >
          {/* Inner Screen */}
          <div className="w-full h-full rounded-[2rem] bg-[#EFEDF4] text-[#292524] p-5 flex flex-col justify-between overflow-hidden relative border border-stone-200/50">
            {/* Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-stone-300/40 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-400/50" />
            </div>

            {/* Content */}
            <div className="pt-5 space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>09:41</span>
                <span className="px-2 py-0.5 rounded-full bg-white/70 text-[10px]">Sunset Mode</span>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">Night Sanctuary</span>
                <h3 className="text-lg font-medium text-[#292524] mt-0.5">Dusk Transitions</h3>
              </div>

              {/* Sanctuary Card */}
              <div className="bg-white/80 p-4 rounded-2xl border border-stone-200/60 shadow-xs space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
                  <Moon className="w-4 h-4 text-purple-400" />
                  <span>Blue-Light Wind Down</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Screen temperature shifts to warm candle amber at 8:30 PM.
                </p>
                <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#A59AC2] h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Gentle Stats */}
              <div className="bg-white/70 p-3.5 rounded-2xl border border-stone-200/50 space-y-2">
                <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">This Week's Peace</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-medium text-stone-800">4.2h</span>
                  <span className="text-xs text-emerald-700 font-medium">Saved from feeds</span>
                </div>
                <div className="text-[11px] text-stone-500">Zero late-night doomscrolls</div>
              </div>
            </div>

            {/* Bottom indicator */}
            <div className="bg-white/60 p-2.5 rounded-xl text-center text-[11px] text-stone-600">
              <span>🌙 Sleep guard engaged at 10:00 PM</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
