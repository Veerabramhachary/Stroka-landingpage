import React, { useState } from 'react';
import { Check, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { formatINR } from '../data/subscriptions';

interface PricingSectionProps {
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenAuth }) => {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  // INR pricing
  const starterMonthlyINR = isAnnual ? 99 : 129;
  const starterAnnualTotalINR = isAnnual ? 1188 : 1548;

  const proMonthlyINR = isAnnual ? 240 : 299;
  const proAnnualTotalINR = isAnnual ? 2880 : 3588;

  const freeFeatures = [
    'Track up to 10 active subscriptions in INR',
    'Personal and Business ledger partitioning',
    '10 CSV exports per month',
    'Standard 3-day renewal alerts',
    'Monthly expense summary report',
    'Encrypted in transit (TLS 1.3) and at rest (AES-256)',
  ];

  const starterFeatures = [
    'Track up to 50 subscriptions',
    'Personal and Business ledger partitioning',
    'Expense vs subscription breakdown',
    'Custom categories and renewal reminders',
    'Full billing history & past invoice registry',
    '100 CSV exports per month',
    'Basic PDF exports per month',
    'Encrypted in transit (TLS 1.3) and at rest (AES-256)',
  ];

  const proFeatures = [
    'Unlimited personal & business subscriptions',
    'Tax Summary Engine (Up to 400 days per request)',
    'High capacity: Up to 20,000 tagged rows per summary',
    '18% GST expense breakdown & Tax Summaries',
    'HSN/SAC code categorization & invoice attachment',
    'Full billing history and past invoice registry',
    'Chartered Accountant-ready PDF & CSV tax exports',
    'Customizable alert lead times (1, 3, 7, or 14 days)',
    'Advanced charts',
    '1,000 CSV exports per month',
    'Advanced PDF exports per month',
    'Saved views (coming soon)',
    'Monthly report (coming soon)',
    'XLSX exports (coming soon)',
  ];

  const renderFeatureItem = (feat: string, isDark: boolean = false) => {
    const isComingSoon = feat.includes('(coming soon)');
    const cleanText = feat.replace('(coming soon)', '').trim();

    return (
      <div key={feat} className="flex items-start gap-2.5">
        <Check
          className={`w-4 h-4 shrink-0 mt-0.5 ${
            isDark ? 'text-[#B18B58]' : 'text-[#42634A]'
          }`}
        />
        <div className="flex-1 leading-relaxed">
          <span>{cleanText}</span>
          {isComingSoon && (
            <span
              className={`text-[10px] font-mono font-medium ml-1.5 px-1.5 py-0.5 rounded-md ${
                isDark
                  ? 'bg-[#B18B58]/20 text-[#B18B58]'
                  : 'bg-[#EDEAE1] text-[#89632F]'
              }`}
            >
              Coming soon
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="pricing" className="py-24 bg-[#EDEAE1] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-[#B18B58] mb-2">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#252922] mb-4">
            Simple, honest plans in INR.
          </h2>
          <p className="text-base sm:text-lg text-[#65685F] leading-relaxed font-normal">
            Choose the tier that fits your tracking needs. Start free and scale seamlessly to Starter or Pro.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center p-1 bg-[#FAF9F5] rounded-xl border border-[#CBC6BA]">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                !isAnnual
                  ? 'bg-[#667267] text-white shadow-xs'
                  : 'text-[#65685F] hover:text-[#252922]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                isAnnual
                  ? 'bg-[#667267] text-white shadow-xs'
                  : 'text-[#65685F] hover:text-[#252922]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold text-[#89632F] bg-[#F4EBDD] px-1.5 py-0.5 rounded-md">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3-Column Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {/* Card 1: Free */}
          <div className="rounded-3xl p-7 sm:p-8 bg-[#FFFFFF] border border-[#E2DED4] shadow-xs flex flex-col justify-between transition-transform hover:-translate-y-1 duration-200">
            <div>
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#667267] block mb-1">
                  Essential
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#252922]">
                  Free
                </h3>
                <p className="text-xs text-[#65685F] mt-1 leading-relaxed">
                  For individuals organizing everyday personal apps and essential subscriptions.
                </p>
              </div>

              {/* Price display */}
              <div className="my-6">
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-4xl font-bold text-[#252922]">₹0</span>
                  <span className="text-xs text-[#65685F] font-sans">/ forever</span>
                </div>
                <div className="text-xs text-[#898A80] mt-1 font-sans">
                  No credit card required. Free forever.
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-6 border-t border-[#E2DED4] text-xs text-[#65685F]">
                {freeFeatures.map((feat) => renderFeatureItem(feat, false))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenAuth('signup')}
              className="mt-8 w-full py-3 px-4 rounded-xl border border-[#CBC6BA] hover:bg-[#FAF9F5] text-[#252922] font-semibold text-xs transition-colors shadow-2xs text-center"
            >
              Start Free
            </button>
          </div>

          {/* Card 2: Starter */}
          <div className="rounded-3xl p-7 sm:p-8 bg-[#FAF9F5] border border-[#CBC6BA] shadow-xs flex flex-col justify-between transition-transform hover:-translate-y-1 duration-200">
            <div>
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#667267] block mb-1">
                  Growth
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#252922]">
                  Starter
                </h3>
                <p className="text-xs text-[#65685F] mt-1 leading-relaxed">
                  For growing collections, invoice archives, and detailed category breakdowns.
                </p>
              </div>

              {/* Price display */}
              <div className="my-6">
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-4xl font-bold text-[#252922]">
                    {formatINR(starterMonthlyINR)}
                  </span>
                  <span className="text-xs text-[#65685F] font-sans">/ month</span>
                </div>
                <div className="text-xs text-[#667267] mt-1 font-mono">
                  {isAnnual
                    ? `Billed annually (${formatINR(starterAnnualTotalINR)}/yr)`
                    : 'Billed monthly, cancel anytime'}
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-6 border-t border-[#E2DED4] text-xs text-[#65685F]">
                {starterFeatures.map((feat) => renderFeatureItem(feat, false))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenAuth('signup')}
              className="mt-8 w-full py-3 px-4 rounded-xl bg-[#667267] hover:bg-[#505D52] active:bg-[#414C43] text-white font-semibold text-xs transition-colors shadow-2xs text-center"
            >
              Choose Starter
            </button>
          </div>

          {/* Card 3: Stroka Pro (Featured) */}
          <div className="rounded-3xl p-7 sm:p-8 bg-[#252922] text-[#FAF9F5] border-2 border-[#B18B58] shadow-xl flex flex-col justify-between relative overflow-hidden transition-transform hover:-translate-y-1 duration-200">
            {/* Background accent aura */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B18B58]/15 blur-3xl pointer-events-none" />

            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#B18B58] uppercase tracking-widest mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> Recommended for Businesses & Freelancers
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Stroka Pro
                  </h3>
                  <p className="text-xs text-[#CBC6BA] mt-1 leading-relaxed">
                    For professionals, agencies, and businesses managing GST & taxes.
                  </p>
                </div>
              </div>

              {/* Price display */}
              <div className="my-6">
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-4xl font-bold text-white">
                    {formatINR(proMonthlyINR)}
                  </span>
                  <span className="text-xs text-[#CBC6BA] font-sans">/ month</span>
                </div>
                <div className="text-xs text-[#B18B58] mt-1 font-mono">
                  {isAnnual
                    ? `Billed annually (${formatINR(proAnnualTotalINR)}/yr)`
                    : 'Billed monthly, cancel anytime'}
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-6 border-t border-white/10 text-xs text-[#EDEAE1]">
                {proFeatures.map((feat) => renderFeatureItem(feat, true))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenAuth('signup')}
              className="mt-8 w-full py-3.5 px-4 rounded-xl bg-[#B18B58] hover:bg-[#967346] active:bg-[#89632F] text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 group text-center"
            >
              <span>Upgrade to Stroka Pro</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Reassurance strip */}
        <div className="mt-12 text-center text-xs text-[#65685F] flex flex-wrap items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-[#42634A]" />
          <span>GST tax summaries provided · Encrypted in transit & at rest · Cancel anytime with 1 click</span>
        </div>
      </div>
    </section>
  );
};
