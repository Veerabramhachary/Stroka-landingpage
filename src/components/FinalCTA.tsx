import React from 'react';
import { ArrowRight, Shield, Sparkles, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface FinalCTAProps {
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenAuth }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 bg-[#252922] text-[#FAF9F5] relative overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#667267]/25 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B18B58] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Expense & Tax Clarity in INR</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto text-balance">
          Stop losing money to forgotten subscriptions & unclaimed GST.
        </h2>

        <p className="text-base sm:text-lg text-[#EDEAE1] mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
          Join thousands of individuals, professionals, and growing businesses in India taking control of their recurring commitments with personal and business ledgers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold bg-[#B18B58] hover:bg-[#967346] text-white px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 group hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Tracking for Free</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="#cockpit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/15 text-[#FAF9F5] border border-[#E2DED4]/20 px-7 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Dual Ledgers</span>
          </a>
        </div>

        {/* Reassurances */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#CBC6BA]">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#E7EEE7]" />
            No credit card required for free plan
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#E7EEE7]" />
            Encrypted in transit and at rest
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#E7EEE7]" />
            Export CA-ready reports in CSV & PDF
          </span>
        </div>
      </motion.div>
    </section>
  );
};
