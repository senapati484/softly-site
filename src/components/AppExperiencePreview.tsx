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
  Heart,
  Sun,
  Feather,
  Bell,
  Smartphone,
  Check,
  ShieldCheck
} from 'lucide-react';
import { IPhoneMockup } from './IPhoneMockup';
import { playSoftChime } from '../utils/audio';

interface AppExperiencePreviewProps {
  onOpenBreatheModal: () => void;
}

interface NotificationDemo {
  id: string;
  title: string;
  message: string;
  tag: string;
}

const NOTIFICATIONS: NotificationDemo[] = [
  {
    id: 'unplug',
    title: '🌿 Unplug Window Active',
    message: 'Time for a 5-minute pause without screens. Step outside or brew warm tea.',
    tag: 'Mindful Break',
  },
  {
    id: 'pebble',
    title: '📖 Morning Pebble',
    message: 'Notice the way the light hits the floorboards. Simply be in today.',
    tag: 'Daily Prompt',
  },
  {
    id: 'dusk',
    title: '🌙 Sunset Shift',
    message: 'Evening sanctuary engaged. Screen shifting to warm candle amber.',
    tag: 'Bedtime',
  },
];

export const AppExperiencePreview: React.FC<AppExperiencePreviewProps> = ({ onOpenBreatheModal }) => {
  const [activeSound, setActiveSound] = useState<string>('Rain on Cedar');
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [amberLevel, setAmberLevel] = useState(85);
  const [breathePattern, setBreathePattern] = useState<'4-7-8' | 'box' | 'gentle'>('4-7-8');
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // Notification & OS Mode States
  const [selectedOS, setSelectedOS] = useState<'ios' | 'android'>('ios');
  const [activeNotification, setActiveNotification] = useState<NotificationDemo | null>(null);

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

  const triggerNotification = (notif: NotificationDemo) => {
    setActiveNotification(notif);
    playSoftChime(528, 1.2);
    // Auto dismiss after 7 seconds if not manually closed
    setTimeout(() => {
      setActiveNotification((curr) => (curr?.id === notif.id ? null : curr));
    }, 7000);
  };

  return (
    <section id="experience" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient lighting halos */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-gradient-to-tr from-[#FFE4E1]/30 via-[#EFEDF4]/40 to-[#E8EFE8]/30 rounded-full blur-3xl -z-10 pointer-events-none"
      />

      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 block">
          Dynamic Island & Gentle Notifications
        </span>
        <h2 className="text-3xl sm:text-5xl font-normal text-[#292524] tracking-tight mb-4">
          Unobtrusive, calm, and{' '}
          <span className="font-cursive text-4xl sm:text-6xl text-[#e8908a]">respectful</span>
        </h2>
        <p className="max-w-xl mx-auto text-base sm:text-lg text-[#78716C] mb-8">
          No flashing red badges or urgency prompts. See how Softly communicates through iOS Dynamic Island live activities and Android ambient lockscreens.
        </p>

        {/* Interactive Notification Testing Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto p-2 rounded-2xl sm:rounded-full bg-white/90 backdrop-blur-md border border-stone-200 shadow-sm">
          <div className="flex items-center gap-1.5 px-3 text-xs font-bold uppercase tracking-wider text-stone-400">
            <Bell className="w-3.5 h-3.5 text-[#e07a74]" />
            <span>Test Alerts:</span>
          </div>

          {NOTIFICATIONS.map((notif) => (
            <button
              key={notif.id}
              onClick={() => triggerNotification(notif)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                activeNotification?.id === notif.id
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-[#FDFCF8] text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              {notif.tag}
            </button>
          ))}

          {/* OS Switcher */}
          <div className="flex items-center bg-stone-100 p-1 rounded-full border border-stone-200/80 ml-1">
            <button
              onClick={() => {
                setSelectedOS('ios');
                playSoftChime(440, 0.4);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedOS === 'ios'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              iOS Dynamic Island
            </button>
            <button
              onClick={() => {
                setSelectedOS('android');
                playSoftChime(440, 0.4);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedOS === 'android'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Android Material You
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ANDROID NOTIFICATION BANNER (When Android selected)       */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedOS === 'android' && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-md mx-auto mb-10 bg-[#292524] text-white p-4 rounded-3xl border border-stone-700 shadow-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FFE4E1] flex items-center justify-center text-[10px] text-[#8A3B36] font-bold">
                  S
                </div>
                <span className="text-xs font-medium text-stone-300">Softly • Calm Service</span>
              </div>
              <span className="text-[10px] text-stone-400 font-mono">Just now</span>
            </div>
            <h4 className="text-sm font-semibold text-stone-100">
              {activeNotification?.title || '🌿 Living Room Sanctuary Active'}
            </h4>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              {activeNotification?.message ||
                'Unplug timer active: Your afternoon space is calm and free of notification urgency.'}
            </p>
            <div className="flex gap-2 mt-3 pt-2 border-t border-stone-800">
              <button
                onClick={() => setActiveNotification(null)}
                className="px-3 py-1 rounded-xl bg-stone-800 text-[11px] font-medium text-stone-200 hover:bg-stone-700"
              >
                Dismiss
              </button>
              <button
                onClick={onOpenBreatheModal}
                className="px-3 py-1 rounded-xl bg-[#FFE4E1] text-[11px] font-semibold text-[#8A3B36] hover:bg-[#FFB7B2]"
              >
                Start Breathwork
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3 Side-by-Side iPhone 16 Pro Mockups */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-6 max-w-7xl mx-auto pb-12">
        
        {/* ========================================================= */}
        {/* LEFT IPHONE: Morning Pebble (Reflections & Soundscapes)    */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          whileHover={{ y: -8, scale: 1.01 }}
          className="w-full max-w-[320px] lg:translate-y-10 transition-all duration-300 relative group shrink-0"
        >
          <IPhoneMockup
            theme="sage"
            className="h-[670px]"
            activeSound={activeSound}
            isPlayingSound={isPlayingSound}
            bannerNotification={activeNotification}
            onDismissNotification={() => setActiveNotification(null)}
          >
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 pt-2 space-y-3 pb-16 no-scrollbar">
              {/* Screen Header */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-stone-500 block">
                    Daily Practice
                  </span>
                  <h3 className="text-base font-light text-stone-900 leading-tight">Morning Pebble</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/85 text-[10px] font-semibold text-stone-700 border border-stone-300/60 shadow-2xs">
                  🌿 14d calm
                </span>
              </div>

              {/* Prompt Card */}
              <div className="bg-white/90 p-3.5 rounded-2xl border border-stone-300/70 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-stone-100 text-[9px] font-bold text-stone-600">
                    Slow Note #142
                  </span>
                  <span className="text-[10px] text-stone-500 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[#e07a74]" />
                    Daily Prompt
                  </span>
                </div>
                <p className="text-[11.5px] text-stone-800 italic leading-relaxed">
                  "Notice the way the light hits the floorboards. You do not have to conquer today; simply be in it."
                </p>
                <div className="pt-1.5 border-t border-stone-200/80 flex items-center justify-between text-[10px] text-stone-500">
                  <span>Curated for stillness</span>
                  <Heart className="w-3.5 h-3.5 text-[#FFB7B2] fill-[#FFB7B2]" />
                </div>
              </div>

              {/* Ambient Noise Selection */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    Ambient Noise
                  </span>
                  <span className="text-[9px] text-stone-400">Offline & Looping</span>
                </div>
                {['Rain on Cedar', 'Forest Wind', 'Old Library'].map((sound) => (
                  <div
                    key={sound}
                    onClick={() => toggleSound(sound)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      activeSound === sound && isPlayingSound
                        ? 'bg-white border-[#FFB7B2] shadow-2xs'
                        : 'bg-white/60 border-stone-300/60 hover:bg-white/90'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          activeSound === sound && isPlayingSound
                            ? 'bg-[#FFE4E1] text-[#8A3B36]'
                            : 'bg-stone-200/70 text-stone-600'
                        }`}
                      >
                        <Volume2 className="w-3 h-3" />
                      </div>
                      <span className="text-[11.5px] font-medium text-stone-800">{sound}</span>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
                      {activeSound === sound && isPlayingSound ? (
                        <Pause className="w-2.5 h-2.5" />
                      ) : (
                        <Play className="w-2.5 h-2.5 ml-0.5" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Journal Note Preview */}
              <div className="bg-white/85 p-3 rounded-xl border border-stone-300/60 space-y-1">
                <div className="text-[9px] font-bold uppercase text-stone-400">Recent Entry</div>
                <p className="text-[11px] text-stone-700 leading-snug">
                  "Took a morning walk before checking notifications. The cold crisp air cleared my head."
                </p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="px-1.5 py-0.5 rounded-full bg-[#E8EFE8] text-[9px] font-medium text-[#3E5C3E]">
                    Grounded
                  </span>
                  <span className="text-[9px] text-stone-400">Aug 20</span>
                </div>
              </div>
            </div>

            {/* Bottom Floating Capsule Tab Bar (Pebble Active) */}
            <div className="absolute bottom-2 left-3 right-3 z-30">
              <div className="flex items-center justify-between bg-white/95 backdrop-blur-md rounded-full py-1.5 px-2 border border-stone-300/80 shadow-lg">
                <div className="flex-1 flex justify-center text-stone-400">
                  <Wind className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EAF1EA] border border-[#B7C9B7]/50 text-[#2F522F]">
                    <BookOpen className="w-3 h-3" />
                    <span className="text-[10.5px] font-bold">Pebble</span>
                  </div>
                </div>
                <div className="flex-1 flex justify-center text-stone-400">
                  <Moon className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </IPhoneMockup>
        </motion.div>

        {/* ========================================================= */}
        {/* CENTER IPHONE: Quiet Room (Living Room & Breathing)       */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="w-full max-w-[350px] z-20 relative shrink-0"
        >
          <IPhoneMockup
            theme="cream"
            className="h-[710px]"
            activeSound={activeSound}
            isPlayingSound={isPlayingSound}
            isBreathingActive={isBreathingActive}
            bannerNotification={activeNotification}
            onDismissNotification={() => setActiveNotification(null)}
          >
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 pt-2 space-y-3.5 pb-16 no-scrollbar">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-400">
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
                  Good afternoon, <span className="font-cursive text-3xl sm:text-4xl text-[#e8908a] inline-block font-normal transform -rotate-2">Elena</span>
                </h3>
                <p className="text-xs text-stone-500">Your space is calm and ready.</p>
              </div>

              {/* Pattern Selector */}
              <div className="flex gap-1.5">
                {(['4-7-8', 'box', 'gentle'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setBreathePattern(p);
                      playSoftChime(480, 0.4);
                    }}
                    className={`flex-1 py-1 rounded-xl text-[10.5px] font-medium border transition-all ${
                      breathePattern === p
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white/80 text-stone-600 border-stone-200 hover:bg-white'
                    }`}
                  >
                    {p === '4-7-8' ? '4-7-8 Relax' : p === 'box' ? 'Box Focus' : 'Gentle 3-3'}
                  </button>
                ))}
              </div>

              {/* Interactive Breathing Circle */}
              <div className="bg-white/80 p-5 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col items-center justify-center text-center">
                <button
                  onClick={() => {
                    setIsBreathingActive(!isBreathingActive);
                    playSoftChime(528, 1.2);
                  }}
                  className="relative group cursor-pointer my-1"
                >
                  <div
                    className={`w-32 h-32 rounded-full bg-[#FFE4E1]/50 flex items-center justify-center transition-transform duration-1000 ${
                      isBreathingActive ? 'animate-breathe' : 'scale-100 group-hover:scale-105'
                    }`}
                  >
                    <div className="w-24 h-24 rounded-full bg-[#FFB7B2]/70 flex items-center justify-center shadow-inner">
                      <div className="w-16 h-16 rounded-full bg-[#FFB7B2] shadow-md flex flex-col items-center justify-center text-[#292524]">
                        <Wind className="w-5 h-5 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
                          {isBreathingActive ? 'Inhale' : 'Breathe'}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
                <span className="text-[10.5px] text-stone-500 font-medium mt-1">
                  {isBreathingActive ? 'Breathe in slowly through the nose...' : 'Tap circle to begin calm cycle'}
                </span>
              </div>

              {/* Ambient Quick Player */}
              <div
                onClick={() => toggleSound(activeSound)}
                className="bg-white/95 p-3 rounded-2xl border border-stone-200/80 flex items-center justify-between cursor-pointer shadow-2xs hover:bg-white"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FFE4E1]/60 flex items-center justify-center text-[#8A3B36]">
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11.5px] font-semibold text-stone-900">{activeSound}</div>
                    <div className="text-[9.5px] text-stone-400">
                      {isPlayingSound ? 'Playing in background' : 'Tap to play ambient loop'}
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-800">
                  {isPlayingSound ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                </div>
              </div>

              {/* Unplug Window */}
              <div className="bg-[#F8F6F0] p-3 rounded-2xl border border-stone-200/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E8EFE8] flex items-center justify-center text-[#3E5C3E]">
                    <Coffee className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11.5px] font-semibold text-stone-900">Unplug Window</div>
                    <div className="text-[9.5px] text-stone-400">Next mindful pause in 45 min</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#E8EFE8] text-[10px] font-semibold text-[#3E5C3E]">
                  Active
                </span>
              </div>
            </div>

            {/* Bottom Floating Capsule Tab Bar (Breathe Active) */}
            <div className="absolute bottom-2 left-3 right-3 z-30">
              <div className="flex items-center justify-between bg-white/95 backdrop-blur-md rounded-full py-1.5 px-2 border border-stone-200/90 shadow-lg">
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FDEEEB] border border-[#FFB7B2]/40 text-[#C04B43]">
                    <Wind className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">Breathe</span>
                  </div>
                </div>
                <div className="flex-1 flex justify-center text-stone-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex-1 flex justify-center text-stone-400">
                  <Moon className="w-4 h-4" />
                </div>
              </div>
            </div>
          </IPhoneMockup>
        </motion.div>

        {/* ========================================================= */}
        {/* RIGHT IPHONE: Night Sanctuary (Dusk Shift & Sleep Guard)   */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ y: -8, scale: 1.01 }}
          className="w-full max-w-[320px] lg:translate-y-10 transition-all duration-300 relative group shrink-0"
        >
          <IPhoneMockup
            theme="lavender"
            className="h-[670px]"
            activeSound={activeSound}
            isPlayingSound={isPlayingSound}
            bannerNotification={activeNotification}
            onDismissNotification={() => setActiveNotification(null)}
          >
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 pt-2 space-y-3 pb-16 no-scrollbar">
              {/* Header */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-stone-500 block">
                    Evening Transition
                  </span>
                  <h3 className="text-base font-light text-stone-900 leading-tight">Night Sanctuary</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/85 text-[10px] font-semibold text-[#4E4270] border border-[#C8C2D8]/60 flex items-center gap-1 shadow-2xs">
                  <Moon className="w-2.5 h-2.5" />
                  Sunset
                </span>
              </div>

              {/* Blue Light Card */}
              <div className="bg-white/90 p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-[#EFEDF4] flex items-center justify-center text-[#5A4E7A]">
                      <Sun className="w-3 h-3" />
                    </div>
                    <span className="text-[11.5px] font-semibold text-stone-900">Blue-Light Shift</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#EFEDF4] text-[9px] font-bold text-[#5A4E7A]">
                    8:30 PM
                  </span>
                </div>
                <p className="text-[10.5px] text-stone-500 leading-relaxed">
                  Screen temperature shifts to warm candle amber to preserve melatonin.
                </p>

                <div>
                  <div className="flex justify-between text-[10px] mb-1 font-medium">
                    <span className="text-stone-500">Amber Warmth</span>
                    <span className="text-stone-800">{amberLevel}%</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#C8C2D8] h-full rounded-full transition-all duration-300"
                      style={{ width: `${amberLevel}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-1.5 pt-0.5">
                  {[50, 70, 85, 100].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        setAmberLevel(val);
                        playSoftChime(360, 0.4);
                      }}
                      className={`flex-1 py-0.5 rounded-lg text-[9.5px] font-semibold border transition-all ${
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
              <div className="bg-white/85 p-3 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400">
                    Screentime Balance
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-[9px] font-bold text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-light text-stone-900">4.2h</span>
                  <span className="text-[10px] font-semibold text-emerald-700">Preserved this week</span>
                </div>
                <p className="text-[10px] text-stone-500">Zero late-night doomscrolls detected.</p>
              </div>

              {/* Bedtime Principle */}
              <div className="bg-white/80 p-3 rounded-xl border border-[#C8C2D8]/50 space-y-0.5">
                <div className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-[#5A4E7A]">
                  <Feather className="w-3 h-3" />
                  <span>Bedtime Principle</span>
                </div>
                <p className="text-[10.5px] text-stone-600 leading-snug">
                  The hour before sleep belongs to you, not an algorithm. Leave your charger outside.
                </p>
              </div>
            </div>

            {/* Bottom Floating Capsule Tab Bar (Sanctuary Active) */}
            <div className="absolute bottom-2 left-3 right-3 z-30">
              <div className="flex items-center justify-between bg-white/95 backdrop-blur-md rounded-full py-1.5 px-2 border border-stone-300/80 shadow-lg">
                <div className="flex-1 flex justify-center text-stone-400">
                  <Wind className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 flex justify-center text-stone-400">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0EEF7] border border-[#C8C2D8]/50 text-[#4E4270]">
                    <Moon className="w-3 h-3" />
                    <span className="text-[10.5px] font-bold">Sanctuary</span>
                  </div>
                </div>
              </div>
            </div>
          </IPhoneMockup>
        </motion.div>
      </div>
    </section>
  );
};
