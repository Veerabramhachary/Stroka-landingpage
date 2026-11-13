/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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

export default function App() {
  const handleOpenAuth = (mode: 'signup' | 'signin' = 'signup') => {
    const envKey = mode === 'signup' ? 'VITE_SIGNUP_URL' : 'VITE_SIGNIN_URL';
    const authUrl =
      mode === 'signup'
        ? import.meta.env.VITE_SIGNUP_URL || 'https://truvora-sigma.vercle.app/auth/sign-up'
        : import.meta.env.VITE_SIGNIN_URL || 'https://truvora-sigma.vercle.app/auth/sign-in';

    if (!authUrl) {
      const message = `${envKey} is not configured. Set it in the environment to enable ${mode}.`;
      console.error(message);
      window.alert(message);
      return;
    }

    let destination: URL;
    try {
      destination = new URL(authUrl);
    } catch {
      const message = `${envKey} must be a valid absolute URL.`;
      console.error(message);
      window.alert(message);
      return;
    }

    if (destination.protocol !== 'https:' && destination.protocol !== 'http:') {
      const message = `${envKey} must use HTTP or HTTPS.`;
      console.error(message);
      window.alert(message);
      return;
    }

    window.location.assign(destination.href);
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

    </div>
  );
}
