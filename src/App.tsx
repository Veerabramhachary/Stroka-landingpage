/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveCockpit } from './components/InteractiveCockpit';
import { PrivacyDoctrine } from './components/PrivacyDoctrine';
import { FeaturesBento } from './components/FeaturesBento';
import { HowItWorks } from './components/HowItWorks';
import { SavingsCalculator } from './components/SavingsCalculator';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signup' | 'signin'>('signup');

  const handleOpenAuth = (mode: 'signup' | 'signin' = 'signup') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F1E9] text-[#252922] flex flex-col font-sans transition-colors duration-200">
      {/* 01. Navigation */}
      <Navbar onOpenAuth={handleOpenAuth} />

      <main className="flex-1">
        {/* 02. Hero Section */}
        <Hero onOpenAuth={handleOpenAuth} />

        {/* 03. Encrypted Data Protection & Anti-Ad Model */}
        <PrivacyDoctrine onOpenAuth={handleOpenAuth} />

        {/* 04. Unified Ledger Cockpit (Personal & Business + Tax Management) */}
        <InteractiveCockpit onOpenAuth={handleOpenAuth} />

        {/* 05. Capabilities Bento Grid */}
        <FeaturesBento onOpenAuth={handleOpenAuth} />

        {/* 06. How It Works (3 Steps) */}
        <HowItWorks onOpenAuth={handleOpenAuth} />

        {/* 07. INR Subscription & GST Tax Benefit Estimator */}
        <SavingsCalculator onOpenAuth={handleOpenAuth} />

        {/* 08. Simple, Honest Pricing in INR */}
        <PricingSection onOpenAuth={handleOpenAuth} />

        {/* 09. Frequently Asked Questions */}
        <FAQSection />

        {/* 10. High-Impact Closing CTA */}
        <FinalCTA onOpenAuth={handleOpenAuth} />
      </main>

      {/* 11. Footer */}
      <Footer onOpenAuth={handleOpenAuth} />

      {/* Account & Free Sign-up Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </div>
  );
}
