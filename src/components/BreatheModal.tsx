import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { playBreathChime, playSoftChime } from '../utils/audio';

interface BreatheModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BreathPhase = 'inhale' | 'hold' | 'exhale';

export const BreatheModal: React.FC<BreatheModalProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [isActive, setIsActive] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    if (!isOpen || !isActive) return;

    // 4-7-8 Cadence: Inhale 4s, Hold 7s, Exhale 8s
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Transition to next phase
        if (phase === 'inhale') {
          setPhase('hold');
          if (soundEnabled) playBreathChime('hold');
          return 7;
        } else if (phase === 'hold') {
          setPhase('exhale');
          if (soundEnabled) playBreathChime('exhale');
          return 8;
        } else {
          setPhase('inhale');
          setCompletedCycles((c) => c + 1);
          if (soundEnabled) playBreathChime('inhale');
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isActive, phase, soundEnabled]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setPhase('inhale');
      setSecondsLeft(4);
      setIsActive(true);
      if (soundEnabled) playBreathChime('inhale');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const phaseInstructions = {
    inhale: 'Breathe in gently through the nose',
    hold: 'Hold with stillness and soft shoulders',
    exhale: 'Release slowly through the mouth',
  };

  const scaleByPhase = {
    inhale: 1.28,
    hold: 1.28,
    exhale: 0.9,
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSoftChime(400, 0.4);
            onClose();
          }}
          className="fixed inset-0 bg-[#292524]/40 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#FDFCF8] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 border border-stone-200/80 shadow-2xl overflow-hidden z-10 text-center"
        >
          {/* Ambient Blob */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-64 h-64 bg-[#FFE4E1]/40 rounded-full blur-3xl -z-10 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-64 h-64 bg-[#E8EFE8]/50 rounded-full blur-3xl -z-10 pointer-events-none"
          />

          {/* Close button */}
          <button
            onClick={() => {
              playSoftChime(400, 0.4);
              onClose();
            }}
            aria-label="Close modal"
            className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top meta */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FFB7B2] animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              4-7-8 Parasympathetic Reset
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-normal text-[#292524] tracking-tight mb-2">
            A Mindful Pause
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xs mx-auto mb-8">
            Follow the gentle breathing circle to slow your pulse and calm your thoughts.
          </p>

          {/* Dynamic Breathing Circle */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-8 flex items-center justify-center">
            {/* Outer animated soft rings */}
            <motion.div
              animate={{
                scale: scaleByPhase[phase],
                backgroundColor:
                  phase === 'inhale' ? '#FFE4E1' : phase === 'hold' ? '#EFEDF4' : '#E8EFE8',
              }}
              transition={{
                duration: phase === 'inhale' ? 4 : phase === 'hold' ? 0.3 : 8,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full opacity-60 filter blur-sm"
            />

            {/* Middle pulsating core */}
            <motion.div
              animate={{
                scale: scaleByPhase[phase],
              }}
              transition={{
                duration: phase === 'inhale' ? 4 : phase === 'hold' ? 0.3 : 8,
                ease: 'easeInOut',
              }}
              className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-[#FFB7B2]/40 backdrop-blur-xs border border-[#FFB7B2]/60 flex flex-col items-center justify-center shadow-lg relative z-10"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#FFB7B2] text-[#292524] flex flex-col items-center justify-center shadow-md">
                <span className="text-xs uppercase font-semibold tracking-widest opacity-80">
                  {phase}
                </span>
                <span className="text-3xl font-medium mt-0.5">{secondsLeft}s</span>
              </div>
            </motion.div>
          </div>

          {/* Phase instruction text */}
          <p className="text-base sm:text-lg font-medium text-[#292524] mb-8 h-8 flex items-center justify-center">
            {phaseInstructions[phase]}
          </p>

          {/* Bottom Bar: Pause/Resume, Sound Toggle, Cycle counter */}
          <div className="flex items-center justify-between pt-6 border-t border-stone-200/60 text-xs text-stone-500">
            <button
              onClick={() => {
                setIsActive(!isActive);
                playSoftChime(480, 0.4);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors cursor-pointer"
            >
              {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isActive ? 'Pause' : 'Resume'}</span>
            </button>

            <span className="font-medium text-stone-600">
              {completedCycles} {completedCycles === 1 ? 'cycle' : 'cycles'} complete
            </span>

            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playSoftChime(528, 0.6);
              }}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
              title={soundEnabled ? 'Mute tone' : 'Enable audio tone'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
