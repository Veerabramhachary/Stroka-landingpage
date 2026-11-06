import React from 'react';
import { Shield, CheckCircle2, Lock, FileCheck2, IndianRupee, Layers } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { formatINR } from '../data/subscriptions';

interface PrivacyDoctrineProps {
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
}

export const PrivacyDoctrine: React.FC<PrivacyDoctrineProps> = ({ onOpenAuth }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="privacy" className="py-24 bg-[#252922] text-[#FAF9F5] relative overflow-hidden transition-colors">
      {/* Background warm light reflection */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#667267]/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[450px] h-[450px] bg-[#B18B58]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B18B58] mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Encrypted Data Protection</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
            We only track your expenses.{' '}
            <span className="text-[#B18B58]">
              Encrypted in transit and at rest.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#EDEAE1]/80 leading-relaxed">
            Most finance apps monetize by packaging and selling your personal transaction history to advertisers and credit broker networks. Stroka operates on a straightforward model: we provide clean expense tracking and tax management, protected with robust encryption.
          </p>
        </motion.div>

        {/* 2-Column Split: Image / Visual + Comparative Architecture */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Sculpture concept card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#667267]/30 shadow-2xl bg-[#414C43] group">
              <img
                src="/src/assets/images/truvora_security_vault_1793856416433.jpg"
                alt="Stroka encryption and security architecture"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#252922] via-[#252922]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#252922]/90 backdrop-blur-md border border-[#E2DED4]/20">
                <div className="flex items-center justify-between text-xs font-mono text-[#EDEAE1] mb-1">
                  <span>ENCRYPTION STANDARDS</span>
                  <span className="text-[#E7EEE7] font-semibold">TLS 1.3 · AES-256</span>
                </div>
                <p className="text-xs text-[#CBC6BA] leading-relaxed">
                  All subscription records, invoice attachments, and GST tax codes are encrypted during transmission and securely stored encrypted at rest.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Commitments */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.14 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Card 1: Traditional Trackers */}
              <div className="p-6 rounded-2xl bg-[#FFFFFF]/5 border border-[#E2DED4]/15">
                <div className="text-[#B18B58] text-xs font-bold uppercase tracking-wider mb-4">
                  The Ad-Supported Model
                </div>
                <ul className="space-y-3.5 text-xs text-[#EDEAE1]/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#A34F43] font-bold">×</span>
                    <span>Sells aggregated purchase patterns to marketing firms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#A34F43] font-bold">×</span>
                    <span>Clutters your experience with credit card promotions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#A34F43] font-bold">×</span>
                    <span>Mixes personal subscriptions with corporate invoices.</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: The Stroka Commitment */}
              <div className="p-6 rounded-2xl bg-[#667267]/20 border border-[#667267]/40 shadow-lg">
                <div className="text-[#FAF9F5] text-xs font-bold uppercase tracking-wider mb-4">
                  The Stroka Standard
                </div>
                <ul className="space-y-3.5 text-xs text-[#EDEAE1] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E7EEE7] shrink-0 mt-0.5" />
                    <span>Strictly encrypted in transit and at rest.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E7EEE7] shrink-0 mt-0.5" />
                    <span>Zero data selling or third-party ad telemetry.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E7EEE7] shrink-0 mt-0.5" />
                    <span>Dedicated Personal & Business Ledgers with tax tracking.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Ledger Pillar Strip */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF]/5 border border-[#E2DED4]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#667267]/40 text-[#FAF9F5] flex items-center justify-center shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#FAF9F5]">
                    GST Compliance & Financial Portability
                  </h4>
                  <p className="text-xs text-[#CBC6BA]">
                    Export your complete INR ledger with HSN/SAC codes and invoices anytime for Indian CA & tax filing.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onOpenAuth('signup')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#B18B58] hover:bg-[#967346] text-white font-semibold text-xs transition-colors shrink-0 whitespace-nowrap shadow-xs"
              >
                Create Encrypted Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
