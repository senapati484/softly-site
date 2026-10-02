import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Download } from 'lucide-react';
import { playSoftChime } from '../utils/audio';

const ANDROID_URL = 'https://sourceforge.net/projects/softly/files/1.0.0/Softly.apk/download';
const IOS_URL = 'https://sourceforge.net/projects/softly/files/1.0.0/Softly.ipa/download';

export const WaitlistSection: React.FC = () => {
  return (
    <section
      id="waitlist"
      className="relative w-full py-24 sm:py-36 px-4 sm:px-6 overflow-hidden bg-white/70 border-t border-stone-200/50"
    >
      {/* High-blur floating gradients background */}
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-b from-[#FFE4E1]/50 via-[#E6E6FA]/40 to-[#E8EFE8]/40 rounded-full blur-3xl -z-10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-4 left-1/4 w-72 h-72 rounded-full bg-[#FFE4E1]/35 blur-3xl -z-10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-4 right-1/4 w-72 h-72 rounded-full bg-[#E6E6FA]/35 blur-3xl -z-10 pointer-events-none"
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* App icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#292524] mx-auto mb-8 flex items-center justify-center shadow-lg shadow-stone-900/10 group cursor-pointer"
          onClick={() => playSoftChime(660, 0.8)}
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFB7B2] flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#292524] tracking-tight mb-4"
        >
          Step into the{' '}
          <span className="font-cursive text-5xl sm:text-6xl md:text-7xl text-[#FFB7B2]">living room</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-[#78716C] max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Softly is now available to install. Download the free app for Android or iOS and start your gentle journey today.
        </motion.p>

        {/* Download Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          {/* Android */}
          <a
            id="waitlist-android-download"
            href={ANDROID_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSoftChime(528, 1.2)}
            className="group w-full sm:w-auto inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#292524] text-[#FDFCF8] hover:bg-stone-800 shadow-lg shadow-stone-900/15 hover:shadow-xl hover:shadow-stone-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline"
          >
            <svg className="w-8 h-8 shrink-0 text-[#3DDC84]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.523 15.341a5.5 5.5 0 0 1-1.249.096H7.726a5.5 5.5 0 0 1-1.249-.096C4.826 14.946 3.5 13.162 3.5 11c0-2.406 1.696-4.414 3.997-4.9L6.2 4.41a.5.5 0 0 1 .89-.454l1.38 2.702A7.34 7.34 0 0 1 12 6.25c1.258 0 2.44.32 3.47.91l1.38-2.703a.5.5 0 0 1 .89.454l-1.297 2.691C18.804 8.086 20.5 10.094 20.5 11c0 2.162-1.326 3.946-2.977 4.341ZM9.5 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
            </svg>
            <div className="text-left">
              <div className="text-[11px] text-stone-400 uppercase tracking-wider">Download for</div>
              <div className="text-base font-semibold leading-tight">Android</div>
              <div className="text-xs text-stone-400 mt-0.5">APK · 60.2 MB · v1.0.0</div>
            </div>
            <Download className="w-4 h-4 ml-auto text-stone-500 group-hover:text-stone-300 transition-colors" />
          </a>

          {/* iOS */}
          <a
            id="waitlist-ios-download"
            href={IOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSoftChime(440, 1.0)}
            className="group w-full sm:w-auto inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/90 hover:bg-white text-[#292524] border border-stone-200/80 hover:border-stone-300 shadow-lg shadow-stone-900/6 hover:shadow-xl hover:shadow-stone-900/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer no-underline"
          >
            <svg className="w-8 h-8 shrink-0 text-stone-800" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <div className="text-[11px] text-stone-400 uppercase tracking-wider">Download for</div>
              <div className="text-base font-semibold leading-tight">iOS</div>
              <div className="text-xs text-stone-400 mt-0.5">IPA · 11.6 MB · v1.0.0</div>
            </div>
            <Download className="w-4 h-4 ml-auto text-stone-400 group-hover:text-stone-600 transition-colors" />
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4 text-xs text-stone-400"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Free forever
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            No account required
          </span>
          <span>•</span>
          <span>Open source</span>
        </motion.div>
      </div>
    </section>
  );
};


