import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, HelpCircle } from 'lucide-react';
import { FaqItem } from '../types';
import { playSoftChime } from '../utils/audio';

const faqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How is Softly different from traditional meditation or focus apps?',
    answer:
      'Most wellness apps borrow the same dopamine-hacking mechanics as social media: red badge notifications, guilt-inducing streaks, and gamified charts. Softly is deliberately slow. There are no levels, no alarms, and no leaderboards—only analog-inspired calming spaces designed to help you leave your phone and return to the real world.',
  },
  {
    id: 'faq-2',
    question: 'Will Softly shame or punish me if I skip a day?',
    answer:
      'Never. We have zero streak counters. We believe true digital wellness means using the app when you need a mindful sanctuary, without feeling bad when you are busy enjoying life away from your screen.',
  },
  {
    id: 'faq-3',
    question: 'How does the 4-7-8 pulsing Breathe companion work?',
    answer:
      'The breathing widget follows the scientifically backed 4-7-8 cadence (4s gentle inhale, 7s peaceful hold, 8s slow release). The visual ring smoothly expands and contracts with soothing micro-haptics and audio chimes to guide your parasympathetic nervous system into deep rest.',
  },
  {
    id: 'faq-4',
    question: 'Is my personal reflection and journal data private?',
    answer:
      'Yes, 100%. All your diary notes, unplug hours, and personal reflections are encrypted on-device. We do not sell user data, track ad identifiers, or train models on your private writing.',
  },
  {
    id: 'faq-5',
    question: 'When is the public launch and what platforms are supported?',
    answer:
      'Early access begins next month on iOS and Android with tablet support. Joining the waitlist gives you priority access, a complimentary lifetime "Founding Member" calm badge, and our curated mindfulness wallpaper pack.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleItem = (id: string) => {
    const isOpening = openId !== id;
    setOpenId(isOpening ? id : null);
    playSoftChime(isOpening ? 560 : 420, 0.4);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-14 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#FFB7B2]" />
          <span>Curious Inquiries</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-normal text-[#292524] tracking-tight mb-4">
          Common{' '}
          <span className="font-cursive text-4xl sm:text-6xl text-[#FFB7B2]">questions</span>
        </h2>
        <p className="max-w-md mx-auto text-sm sm:text-base text-[#78716C]">
          Everything you need to know about slowing down with Softly.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-stone-100/90 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:border-stone-200"
            >
              {/* Header: 24px padding, 500 weight text, plus icon rotating 45 deg */}
              <button
                id={`faq-toggle-${faq.id}`}
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-medium text-[#292524] text-base sm:text-lg cursor-pointer select-none group"
              >
                <span className="group-hover:text-stone-700 transition-colors">
                  {faq.question}
                </span>
                <span
                  className={`w-8 h-8 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0 text-stone-600 transition-transform duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 bg-[#FFB7B2]/30 text-[#292524] border-[#FFB7B2]/40' : 'group-hover:bg-stone-100'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </span>
              </button>

              {/* Content: Transition height 0 to auto duration-500ms ease-in-out */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 px-6 pt-0 text-sm sm:text-base text-[#78716C] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
