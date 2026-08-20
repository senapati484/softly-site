import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Wind,
  Moon,
  Volume2,
  BookOpen,
  Coffee,
  Play,
  Pause,
  Clock,
  Heart,
  ShieldCheck,
  Plus,
  Sun,
  Feather,
  Check
} from 'lucide-react';
import { playSoftChime } from '../utils/audio';

interface AppExperiencePreviewProps {
  onOpenBreatheModal: () => void;
}

type TabType = 'breathe' | 'pebble' | 'sanctuary';

export const AppExperiencePreview: React.FC<AppExperiencePreviewProps> = ({ onOpenBreatheModal }) => {
  const [activeTab, setActiveTab] = useState<TabType>('breathe');
  const [activeSound, setActiveSound] = useState<string>('Rain on Cedar');
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [amberLevel, setAmberLevel] = useState(85);
  const [breathePattern, setBreathePattern] = useState<'4-7-8' | 'box' | 'gentle'>('4-7-8');
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  const toggleSound = (sound: string) => {
    if (activeSound === sound && isPlayingSound) {
      setIsPlayingSound(false);
      playSoftChime(380, 0.8);
    } else {
      setActiveSound(sound);
      setIsPlayingSound(true);
      playSoftChime(540, 1.0);
    }
  };

  const handleTabSwitch = (tab: TabType) => {
    setActiveTab(tab);
    playSoftChime(tab === 'breathe' ? 440 : tab === 'pebble' ? 528 : 396, 0.6);
  };

  return (
    <section id="experience" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient halos */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[800px] h-[550px] sm:h-[800px] bg-gradient-to-tr from-[#FFE4E1]/30 via-[#EFEDF4]/40 to-[#E8EFE8]/30 rounded-full blur-3xl -z-10 pointer-events-none"
      />

      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 block">
          Interactive Application Mockup
        </span>
        <h2 className="text-3xl sm:text-5xl font-normal text-[#292524] tracking-tight mb-4">
          Explore the{' '}
          <span className="font-cursive text-4xl sm:text-6xl text-[#e8908a]">Softly</span>{' '}
          Interface
        </h2>
        <p className="max-w-xl mx-auto text-base sm:text-lg text-[#78716C]">
          No infinite feeds or red notification badges. Experience the exact 3-tab mindful sanctuary built for iOS and Android.
        </p>

        {/* Tab switch buttons for preview */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-stone-200 shadow-xs mt-6">
          <button
            onClick={() => handleTabSwitch('breathe')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'breathe'
                ? 'bg-[#FDEEEB] text-[#C04B43] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Quiet Room</span>
          </button>
          <button
            onClick={() => handleTabSwitch('pebble')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'pebble'
                ? 'bg-[#EAF1EA] text-[#2F522F] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Morning Pebble</span>
          </button>
          <button
            onClick={() => handleTabSwitch('sanctuary')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'sanctuary'
                ? 'bg-[#F0EEF7] text-[#4E4270] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Night Sanctuary</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Phone Mockup */}
      <div className="flex items-center justify-center max-w-4xl mx-auto pb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-[370px] h-[740px] rounded-[3rem] bg-[#1C1917] p-3.5 shadow-2xl relative border-4 border-[#292524] flex flex-col justify-between overflow-hidden"
        >
          {/* Inner Phone Screen */}
          <div className="w-full h-full rounded-[2.5rem] bg-[#FDFCF8] text-[#292524] flex flex-col justify-between overflow-hidden relative border border-stone-200/70">
            {/* Top Status Bar & Dynamic Island */}
            <div className="pt-3 px-6 flex items-center justify-between z-30 shrink-0">
              <span className="text-xs font-semibold text-stone-800 tracking-tight">9:41</span>
              {/* Dynamic Island */}
              <div className="w-24 h-5 bg-[#1C1917] rounded-full flex items-center justify-center gap-2 px-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                <span className="text-[9px] text-stone-300 font-mono tracking-widest">softly</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-800">
                <span className="text-[10px] font-bold">5G</span>
                <div className="w-4 h-2.5 rounded-xs border border-stone-800 p-0.5 flex items-center">
                  <div className="w-full h-full bg-stone-800 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Scrollable Screen Content */}
            <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">
              <AnimatePresence mode="wait">
                {/* TAB 1: BREATHE / QUIET ROOM */}
                {activeTab === 'breathe' && (
                  <motion.div
                    key="tab-breathe"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                          Quiet Room
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-700 shadow-2xs">
                        <div className="w-4 h-4 rounded-full bg-[#FFE4E1] flex items-center justify-center text-[10px] font-bold text-[#8A3B36]">
                          E
                        </div>
                        <span>Elena</span>
                      </div>
                    </div>

                    {/* Greeting */}
                    <div>
                      <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-0.5">
                        <Sparkles className="w-3 h-3 text-[#e07a74]" />
                        <span>Stillness & Stress Relief</span>
                      </div>
                      <h3 className="text-2xl font-light text-[#292524]">
                        Good afternoon, <span className="font-cursive text-2xl text-[#e07a74]">Elena</span>
                      </h3>
                      <p className="text-xs text-stone-500">Your space is calm and ready.</p>
                    </div>

                    {/* Pattern Selector */}
                    <div className="flex gap-2">
                      {(['4-7-8', 'box', 'gentle'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => {
                            setBreathePattern(p);
                            playSoftChime(480, 0.4);
                          }}
                          className={`flex-1 py-1.5 rounded-xl text-[11px] font-medium border transition-all ${
                            breathePattern === p
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-white/80 text-stone-600 border-stone-200/80 hover:bg-white'
                          }`}
                        >
                          {p === '4-7-8' ? '4-7-8 Relax' : p === 'box' ? 'Box Focus' : 'Gentle 3-3'}
                        </button>
                      ))}
                    </div>

                    {/* Interactive Breathing Circle */}
                    <div className="bg-white/70 p-6 rounded-3xl border border-stone-200/70 shadow-xs flex flex-col items-center justify-center text-center">
                      <button
                        onClick={() => {
                          setIsBreathingActive(!isBreathingActive);
                          playSoftChime(528, 1.2);
                        }}
                        className="relative group cursor-pointer my-2"
                      >
                        <div
                          className={`w-36 h-36 rounded-full bg-[#FFE4E1]/50 flex items-center justify-center transition-transform duration-1000 ${
                            isBreathingActive ? 'animate-breathe' : 'scale-100 group-hover:scale-105'
                          }`}
                        >
                          <div className="w-28 h-28 rounded-full bg-[#FFB7B2]/70 flex items-center justify-center shadow-inner">
                            <div className="w-20 h-20 rounded-full bg-[#FFB7B2] shadow-md flex flex-col items-center justify-center text-[#292524]">
                              <Wind className="w-6 h-6 animate-pulse" />
                              <span className="text-[11px] font-bold uppercase tracking-wider mt-1">
                                {isBreathingActive ? 'Inhale' : 'Breathe'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                      <span className="text-[11px] text-stone-500 font-medium mt-1">
                        {isBreathingActive ? 'Breathe in slowly through the nose...' : 'Tap to start breathing session'}
                      </span>
                    </div>

                    {/* Ambient Soundcard Quick Player */}
                    <div
                      onClick={() => toggleSound(activeSound)}
                      className="bg-white/90 p-3.5 rounded-2xl border border-stone-200/80 flex items-center justify-between cursor-pointer shadow-2xs hover:bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#FFE4E1]/60 flex items-center justify-center text-[#8A3B36]">
                          <Volume2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">{activeSound}</div>
                          <div className="text-[10px] text-stone-400">
                            {isPlayingSound ? 'Playing in background' : 'Tap to play ambient loop'}
                          </div>
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-800">
                        {isPlayingSound ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </div>
                    </div>

                    {/* Unplug Card */}
                    <div className="bg-[#F8F6F0] p-3.5 rounded-2xl border border-stone-200/70 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#E8EFE8] flex items-center justify-center text-[#3E5C3E]">
                          <Coffee className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">Unplug Window</div>
                          <div className="text-[10px] text-stone-400">Next mindful pause in 45 min</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E8EFE8] text-[11px] font-semibold text-[#3E5C3E]">
                        Active
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: PEBBLE / REFLECTIONS */}
                {activeTab === 'pebble' && (
                  <motion.div
                    key="tab-pebble"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          Daily Practice
                        </span>
                        <h3 className="text-xl font-light text-stone-900">Morning Pebble</h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#E8EFE8] text-xs font-semibold text-stone-800 border border-stone-200">
                        🌿 14 days calm
                      </span>
                    </div>

                    {/* Prompt Pebble Card */}
                    <div className="bg-[#E8EFE8] p-4 rounded-3xl border border-stone-300/60 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/80 text-[10px] font-bold text-stone-600 border border-stone-200">
                          Slow Note #142
                        </span>
                        <span className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#e07a74]" />
                          Daily Prompt
                        </span>
                      </div>
                      <p className="text-xs text-stone-800 italic leading-relaxed">
                        "Notice the way the light hits the floorboards. You do not have to conquer today; simply be in it."
                      </p>
                      <div className="pt-2 border-t border-stone-300/50 flex items-center justify-between text-[11px] text-stone-500">
                        <span>Curated for stillness</span>
                        <button
                          onClick={onOpenBreatheModal}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-xs font-semibold text-stone-900 shadow-2xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          Write Note
                        </button>
                      </div>
                    </div>

                    {/* Ambient Noise List */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                          <Volume2 className="w-3.5 h-3.5 text-stone-500" />
                          <span>Ambient Noise</span>
                        </div>
                        <span className="text-[10px] text-stone-400">Offline & Looping</span>
                      </div>

                      <div className="space-y-1.5">
                        {['Rain on Cedar', 'Forest Wind', 'Old Library'].map((sound) => (
                          <div
                            key={sound}
                            onClick={() => toggleSound(sound)}
                            className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                              activeSound === sound && isPlayingSound
                                ? 'bg-white border-[#FFB7B2] shadow-xs'
                                : 'bg-white/60 border-stone-200/80 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                                  activeSound === sound && isPlayingSound
                                    ? 'bg-[#FFE4E1] text-[#8A3B36]'
                                    : 'bg-stone-100 text-stone-500'
                                }`}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-medium text-stone-800">{sound}</span>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
                              {activeSound === sound && isPlayingSound ? (
                                <Pause className="w-3 h-3" />
                              ) : (
                                <Play className="w-3 h-3 ml-0.5" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Journal Preview */}
                    <div className="bg-white/80 p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1.5">
                      <div className="text-[10px] uppercase font-bold text-stone-400">Latest Journal Note</div>
                      <p className="text-xs text-stone-700 leading-snug">
                        "Took a morning walk before checking notifications. The cold crisp air cleared my head."
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="px-2 py-0.5 rounded-full bg-[#E8EFE8] text-[9.5px] font-medium text-[#3E5C3E]">
                          Grounded
                        </span>
                        <span className="text-[10px] text-stone-400">Aug 20</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: SANCTUARY / NIGHT */}
                {activeTab === 'sanctuary' && (
                  <motion.div
                    key="tab-sanctuary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          Evening Transition
                        </span>
                        <h3 className="text-xl font-light text-stone-900">Night Sanctuary</h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#EFEDF4] text-xs font-semibold text-[#4E4270] border border-[#C8C2D8]/60 flex items-center gap-1">
                        <Moon className="w-3 h-3" />
                        Sunset Mode
                      </span>
                    </div>

                    {/* Blue Light Card */}
                    <div className="bg-white/85 p-4 rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[#EFEDF4] flex items-center justify-center text-[#5A4E7A]">
                            <Sun className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-stone-900">Blue-Light Wind Down</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#EFEDF4] text-[10px] font-bold text-[#5A4E7A]">
                          8:30 PM
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-relaxed">
                        Screen temperature shifts to warm candle amber at 8:30 PM to preserve melatonin.
                      </p>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1 font-medium">
                          <span className="text-stone-500">Warm Amber Level</span>
                          <span className="text-stone-800">{amberLevel}%</span>
                        </div>
                        <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#C8C2D8] h-full rounded-full transition-all duration-300"
                            style={{ width: `${amberLevel}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        {[50, 70, 85, 100].map((val) => (
                          <button
                            key={val}
                            onClick={() => {
                              setAmberLevel(val);
                              playSoftChime(360, 0.4);
                            }}
                            className={`flex-1 py-1 rounded-xl text-[10.5px] font-semibold border transition-all ${
                              amberLevel === val
                                ? 'bg-[#EFEDF4] text-[#5A4E7A] border-[#C8C2D8]'
                                : 'bg-stone-50 text-stone-500 border-stone-200'
                            }`}
                          >
                            {val}%
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Screentime Peace Balance */}
                    <div className="bg-white/80 p-4 rounded-3xl border border-stone-200/80 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          Mindful Screentime Balance
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                          Active Protection
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-light text-stone-900">4.2h</span>
                        <span className="text-xs font-semibold text-emerald-700">Preserved this week</span>
                      </div>
                      <p className="text-[11px] text-stone-500">Zero late-night algorithmic doomscrolls detected.</p>
                    </div>

                    {/* Bedtime Principle */}
                    <div className="bg-[#EFEDF4]/70 p-3.5 rounded-2xl border border-[#C8C2D8]/50 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5A4E7A]">
                        <Feather className="w-3.5 h-3.5" />
                        <span>Bedtime Principle</span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        The hour before sleep belongs to you, not an algorithm. Leave your charging dock outside the bedroom.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* REAL FLOATING IVORY CAPSULE TAB BAR */}
            <div className="absolute bottom-4 left-4 right-4 z-40">
              <div className="flex items-center justify-between bg-white/95 backdrop-blur-md rounded-full py-1.5 px-2 border border-stone-200/90 shadow-lg">
                <button
                  onClick={() => handleTabSwitch('breathe')}
                  className="flex-1 flex items-center justify-center py-1 cursor-pointer"
                >
                  {activeTab === 'breathe' ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDEEEB] border border-[#FFB7B2]/40 text-[#C04B43]">
                      <Wind className="w-4 h-4" />
                      <span className="text-xs font-bold">Breathe</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-0.5 text-stone-500 hover:text-stone-800">
                      <Wind className="w-4 h-4" />
                      <span className="text-[10px] font-medium">Breathe</span>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => handleTabSwitch('pebble')}
                  className="flex-1 flex items-center justify-center py-1 cursor-pointer"
                >
                  {activeTab === 'pebble' ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAF1EA] border border-[#B7C9B7]/40 text-[#2F522F]">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-xs font-bold">Pebble</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-0.5 text-stone-500 hover:text-stone-800">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-[10px] font-medium">Pebble</span>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => handleTabSwitch('sanctuary')}
                  className="flex-1 flex items-center justify-center py-1 cursor-pointer"
                >
                  {activeTab === 'sanctuary' ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0EEF7] border border-[#C8C2D8]/40 text-[#4E4270]">
                      <Moon className="w-4 h-4" />
                      <span className="text-xs font-bold">Sanctuary</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-0.5 text-stone-500 hover:text-stone-800">
                      <Moon className="w-4 h-4" />
                      <span className="text-[10px] font-medium">Sanctuary</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
