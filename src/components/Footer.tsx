import React from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { playSoftChime } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-4 sm:px-6 bg-[#FDFCF8] border-t border-stone-200/60 text-xs text-stone-500">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* Brand Column */}
        <div className="space-y-2 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#FFB7B2] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white"></span>
            </div>
            <span className="text-lg font-medium text-[#292524] tracking-tight">Softly</span>
          </div>
          <p className="max-w-xs text-stone-400 leading-relaxed text-xs">
            A digital sanctuary designed for intentional living, deep focus, and analog peace.
          </p>
        </div>

        {/* Center Mindful Quote */}
        <div className="text-center py-2 px-6 rounded-2xl bg-stone-50 border border-stone-100 max-w-sm">
          <span className="font-cursive text-2xl text-stone-600 block">
            "Go gently today, there is nothing to rush."
          </span>
        </div>

        {/* Color Palette Indicators & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-2" title="Softly Color Palette">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FDFCF8] border border-stone-300" title="Canvas #FDFCF8" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#E8EFE8]" title="Sage #E8EFE8" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#EFEDF4]" title="Lavender #EFEDF4" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFB7B2]" title="Coral #FFB7B2" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#292524]" title="Dark #292524" />
          </div>
          <div className="text-[11px] text-stone-400">
            © {new Date().getFullYear()} Softly. Made with intention and slow rhythms.
          </div>
        </div>

      </div>
    </footer>
  );
};
