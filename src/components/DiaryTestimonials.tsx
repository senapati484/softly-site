import React from 'react';
import { motion } from 'motion/react';
import { TestimonialItem } from '../types';
import { Feather, Sparkles } from 'lucide-react';
import { playSoftChime } from '../utils/audio';

const testimonials: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'I was exhausted by meditation apps with streaks that shamed me when I took a day off. Softly feels like a warm ceramic mug on a quiet Sunday morning.',
    author: 'Maya Lin',
    city: 'San Francisco',
    savedHours: '12 hrs reclaimed weekly',
    rotationClass: 'md:rotate-[-1deg]',
  },
  {
    id: 't2',
    quote:
      'The 4-7-8 pulsing breathe animation on the home screen single-handedly saved me from panic spirals before executive presentations. No ads, no noise.',
    author: 'Julian Vance',
    city: 'London',
    savedHours: 'Deep focus restored',
    rotationClass: 'md:rotate-[1deg]',
  },
  {
    id: 't3',
    quote:
      'My screen time dropped from 6 hours to 2.5 hours without any painful restrictions. Just replacing sudden triggers with gentle analog pauses.',
    author: 'Hannah Davies',
    city: 'Melbourne',
    savedHours: 'Screen time cut by 55%',
    rotationClass: 'md:rotate-[1deg]',
  },
  {
    id: 't4',
    quote:
      'It really does feel like a digital living room. I open it, breathe for two minutes, read the daily pebble reflection, and gladly lock my phone.',
    author: 'Kiran Patel',
    city: 'Toronto',
    savedHours: 'Peaceful evenings',
    rotationClass: 'md:rotate-[-1deg]',
  },
];

export const DiaryTestimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-28 px-4 sm:px-6 relative bg-[#FAF8F3]/70 border-t border-stone-200/50 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
            <Feather className="w-3.5 h-3.5 text-[#FFB7B2]" />
            <span>Community Reflections</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#292524] tracking-tight mb-4">
            Notes from the{' '}
            <span className="font-cursive text-4xl sm:text-6xl text-[#FFB7B2]">slow room</span>
          </h2>
          <p className="max-w-md mx-auto text-sm sm:text-base text-[#78716C]">
            Real people who traded high-velocity notifications for quiet daily sanctuary.
          </p>
        </div>

        {/* Two-column grid for desktop, single for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              whileHover={{ rotate: 0, scale: 1.015 }}
              onMouseEnter={() => playSoftChime(480 + idx * 30, 0.4)}
              className={`bg-white rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 border border-stone-200/60 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 ${item.rotationClass} hover:shadow-[0_12px_28px_-4px_rgba(0,0,0,0.08)] flex flex-col justify-between`}
            >
              {/* Note Header / Meta */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                    {item.city}
                  </span>
                  <span className="text-[11px] font-medium text-stone-600 bg-[#E8EFE8] px-2.5 py-0.5 rounded-full">
                    {item.savedHours}
                  </span>
                </div>

                {/* Quote body text */}
                <p className="text-base sm:text-lg text-[#292524] leading-relaxed font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Signature style: 32px horizontal line followed by Reenie Beanie cursive text in 24px stone-500 */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-3">
                <div className="w-8 h-[1.5px] bg-stone-300" />
                <span className="font-cursive text-2xl text-[#78716C]">
                  {item.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
