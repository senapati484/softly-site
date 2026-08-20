/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GrainOverlay } from './components/GrainOverlay';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ScenarioScroll } from './components/ScenarioScroll';
import { AppExperiencePreview } from './components/AppExperiencePreview';
import { DiaryTestimonials } from './components/DiaryTestimonials';
import { FaqAccordion } from './components/FaqAccordion';
import { WaitlistSection } from './components/WaitlistSection';
import { BreatheModal } from './components/BreatheModal';
import { Footer } from './components/Footer';

export default function App() {
  const [breatheModalOpen, setBreatheModalOpen] = useState(false);

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExperience = () => {
    const el = document.getElementById('experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#292524] relative font-sans-outfit selection:bg-[#FFB7B2] selection:text-[#292524]">
      {/* Global Grain Overlay Texture */}
      <GrainOverlay />

      {/* Floating Pill Navigation */}
      <Navbar
        onOpenBreatheModal={() => setBreatheModalOpen(true)}
        onScrollToWaitlist={scrollToWaitlist}
      />

      {/* Main Content Flow */}
      <main className="w-full">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenBreatheModal={() => setBreatheModalOpen(true)}
          onScrollToWaitlist={scrollToWaitlist}
          onScrollToExperience={scrollToExperience}
        />

        {/* 2. Horizontal Scenario Scroll */}
        <ScenarioScroll />

        {/* 3. Three-Mockup App Experience Preview */}
        <AppExperiencePreview onOpenBreatheModal={() => setBreatheModalOpen(true)} />

        {/* 4. Diary Entry Testimonials */}
        <DiaryTestimonials />

        {/* 5. Interactive FAQ Accordion */}
        <FaqAccordion />

        {/* 6. Waitlist Conversion Section */}
        <WaitlistSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Mindful Breathe Companion Modal */}
      <BreatheModal
        isOpen={breatheModalOpen}
        onClose={() => setBreatheModalOpen(false)}
      />
    </div>
  );
}
