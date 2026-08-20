import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Moon, Sun, Coffee, Sunset, Sparkles, Wind } from 'lucide-react';
import { ScenarioItem } from '../types';
import { playSoftChime } from '../utils/audio';

const scenarios: ScenarioItem[] = [
  {
    id: 's1',
    time: '07:15 AM',
    scenario: 'Leaving the group chat muted until you finish morning tea.',
    tag: 'Morning Ritual',
    accentColor: '#FFB7B2',
  },
  {
    id: 's2',
    time: '10:45 AM',
    scenario: 'Taking three deep breaths before replying to a tense email.',
    tag: 'Mindful Pace',
    accentColor: '#93B593',
  },
  {
    id: 's3',
    time: '01:30 PM',
    scenario: 'Replacing lunch doomscrolling with 10 quiet minutes outdoors.',
    tag: 'Midday Unplug',
    accentColor: '#A59AC2',
  },
  {
    id: 's4',
    time: '05:40 PM',
    scenario: 'Gentle chime signals work is done. No evening work notifications.',
    tag: 'Sanctuary Window',
    accentColor: '#FFB7B2',
  },
  {
    id: 's5',
    time: '08:15 PM',
    scenario: 'Flipping through a physical book with low-warmth amber light.',
    tag: 'Tactile Living',
    accentColor: '#93B593',
  },
  {
    id: 's6',
    time: '10:50 PM',
    scenario: 'Tucking phone into its felt bed outside the bedroom.',
    tag: 'Sleep Sanctuary',
    accentColor: '#A59AC2',
  },
];

export const ScenarioScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      playSoftChime(600, 0.5);
    }
  };

  return (
    <section id="scenarios" className="py-16 sm:py-24 overflow-hidden border-t border-b border-stone-200/40 bg-[#FBF9F4]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 block">
            Everyday Rhythms
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#292524] tracking-tight">
            How your day feels with{' '}
            <span className="font-cursive text-4xl sm:text-5xl text-[#FFB7B2]">Softly</span>
          </h2>
        </div>

        {/* Scroll navigation arrows */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => scrollBy(-320)}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full bg-white border border-stone-200/80 flex items-center justify-center text-stone-600 hover:bg-stone-50 hover:text-stone-900 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBy(320)}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full bg-white border border-stone-200/80 flex items-center justify-center text-stone-600 hover:bg-stone-50 hover:text-stone-900 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        id="scenario-scroll-container"
        className="flex gap-5 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 py-4 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
      >
        {scenarios.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            className="w-[288px] min-w-[288px] max-w-[288px] h-[160px] bg-white rounded-3xl p-5 flex flex-col justify-between border border-stone-200/60 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group snap-start select-none"
            onMouseEnter={() => playSoftChime(500 + idx * 40, 0.4)}
          >
            {/* Top row: Timestamp & Tag */}
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-stone-400 font-medium tracking-tight">
                {item.time}
              </span>
              <span className="text-[11px] font-medium text-stone-500 bg-stone-100/80 px-2.5 py-0.5 rounded-full">
                {item.tag}
              </span>
            </div>

            {/* Bottom text in 20px stone-800, changing to pastel accent on hover */}
            <p className="text-[19px] sm:text-[20px] font-medium text-[#292524] leading-snug group-hover:text-[#e07a74] transition-colors duration-300 line-clamp-3">
              {item.scenario}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Gentle helper caption */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 text-xs text-stone-400 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#FFB7B2]" />
        <span>Swipe horizontally to explore mindful daily transitions</span>
      </div>
    </section>
  );
};
