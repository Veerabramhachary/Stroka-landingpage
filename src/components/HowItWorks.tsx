import React, { useState } from 'react';
import { PlusCircle, Bell, Receipt, Check, ArrowRight, Layers } from 'lucide-react';

interface HowItWorksProps {
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenAuth }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      number: '01',
      title: 'Log Personal & Business Expenses',
      short: 'Categorize Ledgers',
      description:
        'Add and manage your recurring services with a single click. Keep personal entertainment subscriptions strictly partitioned from corporate SaaS and vendor retainers in dedicated INR ledgers.',
      icon: Layers,
      detail:
        'Presets for AWS, Google Workspace, GitHub, Netflix, Spotify, and 200+ local Indian services.',
    },
    {
      number: '02',
      title: 'Tag GST & Schedule Renewal Alarms',
      short: 'Tax & Renewal Alerts',
      description:
        'Tag 18% GST, categorize deductible business software, and set proactive alerts so you are notified before renewals hit your card.',
      icon: Bell,
      detail:
        'Customizable lead times (1, 3, or 7 days in advance) prevent unexpected auto-debits.',
    },
    {
      number: '03',
      title: 'Audit History & Export Tax Summaries',
      short: 'CA-Ready Tax Summary',
      description:
        'Review complete billing history and invoice archives. Export clean CSV and PDF Tax Summaries (up to 400 days and 20,000 tagged rows per request) formatted for your Chartered Accountant.',
      icon: Receipt,
      detail:
        'Save hours during month-end reconciliation with clean tax-deductible expense summaries (up to 400 days and 20,000 tagged rows).',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#EDEAE1] border-t border-[#E2DED4] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#B18B58] mb-2">
            Simplicity at its Core
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#252922] mb-4">
            Three simple steps to total clarity.
          </h2>
          <p className="text-base sm:text-lg text-[#65685F] leading-relaxed font-normal">
            No invasive bank credentials, no telemetry selling. Just clear financial organization with tax intelligence.
          </p>
        </div>

        {/* 3 Step Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting hairline for desktop */}
          <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-px bg-[#CBC6BA] pointer-events-none" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isSelected = activeStep === index + 1;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(index + 1)}
                className={`relative rounded-3xl p-8 bg-[#FFFFFF] border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#667267] shadow-lg ring-1 ring-[#667267]/20'
                    : 'border-[#E2DED4] hover:border-[#CBC6BA] shadow-2xs'
                }`}
              >
                {/* Step Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#EDEAE1] border border-[#E2DED4] flex items-center justify-center text-[#667267] font-bold text-sm shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#898A80]">
                    STEP {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#252922] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#65685F] leading-relaxed mb-6">
                  {step.description}
                </p>

                <div className="pt-4 border-t border-[#E2DED4] text-xs text-[#65685F] flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#42634A] shrink-0 mt-0.5" />
                  <span>{step.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenAuth('signup')}
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-[#667267] hover:bg-[#505D52] rounded-xl transition-all shadow-xs"
          >
            <span>Set Up Your Dual Ledgers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
