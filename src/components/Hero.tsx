import React from 'react';
import { ArrowRight, Shield, BellRing, ArrowUpRight, Receipt, Briefcase } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { formatINR } from '../data/subscriptions';

interface HeroProps {
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative pt-32 pb-20 md:pt-42 md:pb-30 overflow-hidden bg-[#F4F1E9] transition-colors">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-[#667267]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-36 right-[-5%] w-[450px] h-[350px] bg-[#B18B58]/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      {/* Centered inner container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Unboxed editorial kicker */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#65685F] mb-6 tracking-wide"
          >
            <span className="text-[#667267] font-bold">Stroka 2.0</span>
            <span aria-hidden="true">·</span>
            <span>Personal & Business Ledgers</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#B18B58] font-semibold">GST & Tax Management</span>
            <span aria-hidden="true">·</span>
            <span>Native INR (₹)</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#252922] leading-[1.08] mb-6 text-balance"
          >
            Track Expenses & Subscriptions.{' '}
            <span className="text-[#B18B58]">
              Personal & Business Ledgers.
            </span>
          </motion.h1>

          {/* Supporting description */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="text-base sm:text-lg lg:text-xl text-[#65685F] mb-10 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Track personal living subscriptions and business software in one unified INR system. Generate audit-ready Tax Summaries (up to 400 days and 20,000 tagged rows per request) and receive pre-renewal alerts — encrypted in transit and at rest.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <button
              type="button"
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto text-sm font-semibold bg-[#667267] hover:bg-[#505D52] active:bg-[#414C43] text-white px-8 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Tracking Free</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#cockpit"
              className="w-full sm:w-auto text-sm font-semibold bg-[#FFFFFF] text-[#252922] border border-[#E2DED4] hover:bg-[#EDEAE1] px-7 py-3.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Dual Ledger Cockpit</span>
              <ArrowUpRight className="w-4 h-4 text-[#898A80]" />
            </a>
          </motion.div>

          {/* Proof indicators adjacent to CTA */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#65685F]">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#667267]" />
              <span>Encrypted in transit and at rest</span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-[#B18B58]" />
              <span>Comprehensive Tax Summaries</span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <BellRing className="w-3.5 h-3.5 text-[#B18B58]" />
              <span>Timely renewal alerts</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Showcase */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2DED4] shadow-xl bg-[#252922]"
          >
            <img
              src="/src/assets/images/truvora_app_workspace_1793856417064.jpg"
              alt="Stroka expense and subscription ledger workspace"
              referrerPolicy="no-referrer"
              className="w-full h-[320px] sm:h-[480px] lg:h-[520px] object-cover object-center opacity-90"
            />
            {/* Measured Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#252922]/85 via-[#252922]/30 to-transparent pointer-events-none" />

            {/* Floating Live Alert & Tax Ledger Preview Card with Motion */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-md bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-[#E2DED4] shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E7EEE7] text-[#42634A] flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#252922] block">
                      Business Ledger · Renewal Alert
                    </span>
                    <span className="text-[11px] text-[#65685F]">
                      Auto-renews in 3 days (Nov 8)
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#252922] bg-[#EDEAE1] px-2 py-0.5 rounded-md">
                  {formatINR(4200)}
                </span>
              </div>
              <p className="text-xs text-[#65685F] mb-3 leading-relaxed">
                <strong className="text-[#252922]">AWS Cloud Infrastructure</strong> · Categorized as Tax Deductible (HSN/SAC 998315) with ₹756 GST paid logged into your Tax Summary.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenAuth('signup')}
                  className="flex-1 py-1.5 px-3 bg-[#667267] hover:bg-[#505D52] text-white font-semibold text-xs rounded-lg transition-colors text-center"
                >
                  View in Business Ledger
                </button>
                <a
                  href="#cockpit"
                  className="py-1.5 px-3 bg-[#EDEAE1] hover:bg-[#E2DED4] text-[#252922] font-medium text-xs rounded-lg transition-colors text-center"
                >
                  Cockpit Overview
                </a>
              </div>
            </motion.div>

            {/* Quick Top Right Marker */}
            <div className="hidden md:flex absolute top-6 right-6 bg-[#252922]/90 backdrop-blur-md rounded-xl p-3 border border-[#E2DED4]/20 text-[#FAF9F5] items-center gap-3 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E7EEE7]" />
              <span>Data Protection: Encrypted in Transit & at Rest</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
