import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Mail, Heart } from 'lucide-react';
import { playSoftChime } from '../utils/audio';

export const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [waitlistNumber, setWaitlistNumber] = useState(418);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setWaitlistNumber(Math.floor(Math.random() * 80) + 420);
      playSoftChime(528, 2.0);
    }, 600);
  };

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
        {/* Dark stone #292524 rounded-square icon at the top with a coral dot */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#292524] mx-auto mb-8 flex items-center justify-center shadow-lg shadow-stone-900/10 group cursor-pointer"
          onClick={() => playSoftChime(660, 0.8)}
        >
          {/* Coral dot in center */}
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
          We're opening private batches every Sunday. Reserve your spot to receive the Founding Member calm edition.
        </motion.p>

        {/* Waitlist Form or Success State */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="waitlist-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2.5 p-1.5 sm:p-2 rounded-full bg-stone-50/90 backdrop-blur-md border border-stone-200/80 shadow-xs transition-all focus-within:border-stone-400 focus-within:shadow-md">
                <div className="flex items-center gap-2 pl-4 w-full sm:w-auto flex-1">
                  <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                  <input
                    id="waitlist-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full py-2.5 sm:py-3 bg-transparent text-sm sm:text-base text-[#292524] placeholder-stone-400 outline-none border-none"
                  />
                </div>

                {/* Black submit button that scales up on hover */}
                <button
                  id="waitlist-submit-button"
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#292524] text-[#FDFCF8] text-sm sm:text-base font-medium flex items-center justify-center gap-2 hover:bg-stone-800 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md cursor-pointer disabled:opacity-70 shrink-0"
                >
                  <span>{isLoading ? 'Reserving...' : 'Join Waitlist'}</span>
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-stone-400 mt-4">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                  No spam. Unsubscribe anytime.
                </span>
                <span>•</span>
                <span>Free forever tier included</span>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="waitlist-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-stone-200/80 shadow-lg max-w-md mx-auto text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#E8EFE8] text-stone-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#292524]">You're in the quiet queue</h3>
                <p className="text-sm text-stone-500 mt-1">
                  You are reserved as <strong className="text-[#292524] font-semibold">#{waitlistNumber}</strong> on the Founding List.
                </p>
              </div>

              <div className="bg-[#EFEDF4]/80 p-3.5 rounded-2xl border border-stone-200/50 text-xs text-stone-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  Founder Calm Wallpaper Pack
                </span>
                <span className="font-semibold text-stone-900">Sent to inbox</span>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                }}
                className="text-xs text-stone-400 hover:text-stone-700 underline cursor-pointer"
              >
                Register another email
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
