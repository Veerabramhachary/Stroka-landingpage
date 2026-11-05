import React, { useState } from 'react';
import { Calculator, ArrowRight, Receipt, Sparkles } from 'lucide-react';
import { formatINR } from '../data/subscriptions';

interface SavingsCalculatorProps {
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ onOpenAuth }) => {
  const [subCount, setSubCount] = useState<number>(8);
  const [avgCostINR, setAvgCostINR] = useState<number>(1400);
  const [businessPercent, setBusinessPercent] = useState<number>(60);
  const [unusedPercent, setUnusedPercent] = useState<number>(20);

  const monthlyTotalINR = subCount * avgCostINR;
  const annualTotalINR = monthlyTotalINR * 12;

  // Business portion and Tax Summary calculation
  const businessMonthlyINR = monthlyTotalINR * (businessPercent / 100);
  const annualBusinessINR = businessMonthlyINR * 12;
  const annualDocumentedTax = Math.round(annualBusinessINR * 0.18); // 18% GST documented in Tax Summary

  // Unused subscription savings
  const annualUnusedSavings = Math.round(annualTotalINR * (unusedPercent / 100));

  // Total annual financial clarity & savings
  const totalAnnualAdvantage = annualDocumentedTax + annualUnusedSavings;

  return (
    <section className="py-24 bg-[#F4F1E9] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-[#252922] text-[#FAF9F5] shadow-2xl border border-[#667267]/30 relative overflow-hidden">
          {/* Subtle warm accent aura */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B18B58]/15 blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="mb-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B18B58] mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>INR Subscription & Tax Summary Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Calculate your tax documentation & subscription optimization.
            </h2>
            <p className="text-sm text-[#CBC6BA] leading-relaxed max-w-xl">
              See how combining dedicated personal & business ledgers with automated 18% GST Tax Summary reports (up to 400 days and 20,000 tagged rows) maximizes your financial clarity in INR.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Sliders */}
            <div className="md:col-span-7 space-y-6">
              {/* Slider 1: Total Subscriptions */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium mb-2">
                  <span className="text-[#EDEAE1]">Active Subscriptions (Total)</span>
                  <span className="font-mono text-sm font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-md">
                    {subCount} services
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="30"
                  value={subCount}
                  onChange={(e) => setSubCount(parseInt(e.target.value))}
                  className="w-full accent-[#B18B58] cursor-pointer h-2 bg-[#414C43] rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-[#898A80] mt-1 font-mono">
                  <span>3 services</span>
                  <span>15</span>
                  <span>30 services</span>
                </div>
              </div>

              {/* Slider 2: Average monthly spend in INR */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium mb-2">
                  <span className="text-[#EDEAE1]">Average Spend per Service</span>
                  <span className="font-mono text-sm font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-md">
                    {formatINR(avgCostINR)} /mo
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={avgCostINR}
                  onChange={(e) => setAvgCostINR(parseInt(e.target.value))}
                  className="w-full accent-[#B18B58] cursor-pointer h-2 bg-[#414C43] rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-[#898A80] mt-1 font-mono">
                  <span>₹200</span>
                  <span>₹2,500</span>
                  <span>₹5,000</span>
                </div>
              </div>

              {/* Slider 3: Business ledger proportion */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium mb-2">
                  <span className="text-[#EDEAE1]">Business Software Proportion (Included in Tax Summary)</span>
                  <span className="font-mono text-sm font-bold text-[#E7EEE7] bg-[#42634A]/40 px-2.5 py-0.5 rounded-md">
                    {businessPercent}% Business
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={businessPercent}
                  onChange={(e) => setBusinessPercent(parseInt(e.target.value))}
                  className="w-full accent-[#667267] cursor-pointer h-2 bg-[#414C43] rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-[#898A80] mt-1 font-mono">
                  <span>0% (All Personal)</span>
                  <span>50%</span>
                  <span>100% (All Business)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated Results Box */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center flex flex-col justify-between h-full">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#CBC6BA] font-semibold block mb-1">
                  Est. Annual Financial Clarity
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#B18B58] mb-2">
                  {formatINR(totalAnnualAdvantage)}
                  <span className="text-xs text-[#EDEAE1] font-normal"> /year</span>
                </div>
                <p className="text-xs text-[#EDEAE1]/80 mb-6 leading-relaxed">
                  Includes 18% documented business tax summary plus eliminated zombie subscriptions. <span className="text-[#E7EEE7] font-semibold block mt-1">Tax Summary capacity: Up to 400 days and 20,000 tagged rows per report.</span>
                </p>

                <div className="p-3 bg-black/25 rounded-xl space-y-1.5 text-xs font-mono text-left mb-6">
                  <div className="flex justify-between text-[#EDEAE1]">
                    <span>18% Documented Tax Summary:</span>
                    <span className="text-[#E7EEE7] font-bold">+{formatINR(annualDocumentedTax)}/yr</span>
                  </div>
                  <div className="flex justify-between text-[#EDEAE1]">
                    <span>Unused Subscriptions Cut:</span>
                    <span className="text-[#E7EEE7] font-bold">+{formatINR(annualUnusedSavings)}/yr</span>
                  </div>
                  <div className="flex justify-between text-[#EDEAE1] pt-1 border-t border-white/10">
                    <span>Total Annual Outflow:</span>
                    <span className="text-white">{formatINR(annualTotalINR)}/yr</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenAuth('signup')}
                className="w-full py-3 px-4 bg-[#667267] hover:bg-[#505D52] active:bg-[#414C43] text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Start Tracking in INR</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
