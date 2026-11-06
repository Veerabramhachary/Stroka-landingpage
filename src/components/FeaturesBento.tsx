import React, { useState } from 'react';
import {
  Briefcase,
  User,
  BellRing,
  History,
  Receipt,
  Download,
  Check,
  Shield,
  FileSpreadsheet,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { formatINR } from '../data/subscriptions';

interface FeaturesBentoProps {
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
}

export const FeaturesBento: React.FC<FeaturesBentoProps> = ({ onOpenAuth }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [selectedLeadTime, setSelectedLeadTime] = useState<'1' | '3' | '7'>('3');
  const shouldReduceMotion = useReducedMotion();

  const handleSimulateExport = (format: string) => {
    setDownloadSuccess(true);
    const csvContent =
      'data:text/csv;charset=utf-8,Service,Ledger,GST Rate,HSN/SAC,Monthly INR,Tax Paid INR,Tax Deductible\nAWS Cloud,Business,18%,998315,4200,756,Yes\nFigma Org,Business,18%,998314,1350,243,Yes\nGoogle Workspace,Business,18%,998313,2850,513,Yes\nNetflix 4K,Personal,18%,N/A,649,117,No\nSpotify Family,Personal,18%,N/A,179,32,No';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `stroka_ledger_tax_report.${format.toLowerCase()}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="capabilities" className="py-24 bg-[#F4F1E9] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#B18B58] mb-2">
            Structured Financial Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#252922] mb-4">
            Everything you need. Nothing you don't.
          </h2>
          <p className="text-base sm:text-lg text-[#65685F] leading-relaxed font-normal">
            Designed specifically for individuals and modern businesses in India. Dual ledgers, automated GST tagging, and renewal defense without bloated clutter.
          </p>
        </div>

        {/* Asymmetric Bento Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Personal & Business Dual Ledgers (Double Column Marquee) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-2 rounded-3xl border border-[#E2DED4] bg-[#FFFFFF] overflow-hidden shadow-xs flex flex-col justify-between group hover:border-[#CBC6BA] transition-colors"
          >
            <div className="p-7 sm:p-8">
              <div className="w-10 h-10 rounded-xl bg-[#EDEAE1] text-[#667267] flex items-center justify-center mb-5 border border-[#E2DED4]">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#252922] mb-2">
                Personal & Business Dual Ledgers
              </h3>
              <p className="text-sm text-[#65685F] leading-relaxed max-w-xl mb-6">
                Never mix lifestyle entertainment subscriptions with business software expenses. Maintain two distinct ledgers under one roof with independent category analytics and reporting.
              </p>
            </div>

            {/* Visual Screen Crop */}
            <div className="px-6 pb-6 pt-0">
              <div className="rounded-2xl overflow-hidden border border-[#E2DED4] shadow-sm relative">
                <img
                  src="/src/assets/images/truvora_spend_analytics_1793856416275.jpg"
                  alt="Stroka dual ledger and financial analytics"
                  referrerPolicy="no-referrer"
                  className="w-full h-52 sm:h-64 object-cover object-top group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252922]/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FAF9F5]">
                  <span className="font-mono bg-[#252922]/85 px-3 py-1 rounded-md backdrop-blur-md">
                    Business SaaS: {formatINR(10050)}/mo · Personal: {formatINR(2626)}/mo
                  </span>
                  <span className="text-[#E7EEE7] font-semibold flex items-center gap-1 font-mono">
                    Dual Ledger Split Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Smart Predictive Reminders */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="rounded-3xl border border-[#E2DED4] bg-[#FFFFFF] p-7 sm:p-8 shadow-xs flex flex-col justify-between hover:border-[#CBC6BA] transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F4EBDD] text-[#89632F] flex items-center justify-center mb-5 border border-[#E2DED4]">
                <BellRing className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#252922] mb-2">
                Smart Reminders
              </h3>
              <p className="text-sm text-[#65685F] leading-relaxed mb-6">
                Customizable notifications before renewals or free trials conclude. Never get caught off guard by an auto-renewing yearly subscription again.
              </p>
            </div>

            {/* Lead-Time Selector Demo */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E2DED4]">
              <span className="text-xs font-semibold text-[#252922] block mb-2">
                Notification Advance Notice:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(['1', '3', '7'] as const).map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setSelectedLeadTime(days)}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      selectedLeadTime === days
                        ? 'bg-[#667267] text-white shadow-xs'
                        : 'bg-[#EDEAE1] text-[#65685F] hover:bg-[#E2DED4]'
                    }`}
                  >
                    {days} {days === '1' ? 'day' : 'days'}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-[11px] text-[#898A80]">
                Dispatches alert via email or calendar before auto-charge execution.
              </div>
            </div>
          </motion.div>

          {/* Card 3: Tax & GST Summary Engine */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="rounded-3xl border border-[#E2DED4] bg-[#FFFFFF] p-7 sm:p-8 shadow-xs flex flex-col justify-between hover:border-[#CBC6BA] transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E7EEE7] text-[#42634A] flex items-center justify-center mb-5 border border-[#E2DED4]">
                <Receipt className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-[#252922]">
                  Tax Summary Engine
                </h3>
              </div>
              <p className="text-sm text-[#65685F] leading-relaxed mb-6">
                We provide structured Tax Summaries—supporting up to 400 days per request and 20,000 tagged rows per summary. Categorize 18% GST and export clean statements directly for your CA.
              </p>
            </div>

            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E2DED4] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#252922]">AWS Cloud (HSN 998315)</span>
                <span className="font-mono text-[#42634A] font-bold">18% GST Tagged</span>
              </div>
              <div className="flex items-center justify-between text-[#65685F] text-[11px] font-mono">
                <span>Base: {formatINR(4200)}</span>
                <span className="text-[#42634A]">Tax Paid: {formatINR(756)} logged</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Subscription & Expense History */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className="rounded-3xl border border-[#E2DED4] bg-[#FFFFFF] p-7 sm:p-8 shadow-xs flex flex-col justify-between hover:border-[#CBC6BA] transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EDEAE1] text-[#667267] flex items-center justify-center mb-5 border border-[#E2DED4]">
                <History className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#252922] mb-2">
                Subscription & Expense History
              </h3>
              <p className="text-sm text-[#65685F] leading-relaxed mb-6">
                Complete historical record of all past billing cycles, invoice numbers, payment modes, and statements archived across both ledgers.
              </p>
            </div>

            <div className="space-y-1.5 p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#E2DED4] text-xs">
              <div className="flex items-center justify-between text-[#252922] font-medium">
                <span>Oct 19: Google Workspace</span>
                <span className="font-mono font-bold">{formatINR(2850)}</span>
              </div>
              <div className="flex items-center justify-between text-[#898A80] text-[11px] font-mono">
                <span>Invoice GGL-IN-49210</span>
                <span className="text-[#42634A] font-semibold">Archived</span>
              </div>
            </div>
          </motion.div>

          {/* Card 5: One-Click Export to CA / Excel */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="rounded-3xl border border-[#E2DED4] bg-[#FFFFFF] p-7 sm:p-8 shadow-xs flex flex-col justify-between hover:border-[#CBC6BA] transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] text-[#252922] flex items-center justify-center mb-5 border border-[#E2DED4]">
                <FileSpreadsheet className="w-5 h-5 text-[#667267]" />
              </div>
              <h3 className="text-xl font-bold text-[#252922] mb-2">
                CA-Ready Tax Exports
              </h3>
              <p className="text-sm text-[#65685F] leading-relaxed mb-6">
                Generate clean CSV spreadsheets or structured PDF reports ready for accountant audit and GST input review.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulateExport('CSV')}
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-[#EDEAE1] hover:bg-[#E2DED4] text-[#252922] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#667267]" />
                  <span>Download Sample CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulateExport('PDF')}
                  className="py-2 px-3 text-xs font-semibold rounded-xl bg-[#EDEAE1] hover:bg-[#E2DED4] text-[#252922] transition-colors"
                >
                  PDF
                </button>
              </div>
              {downloadSuccess && (
                <div className="text-[11px] font-semibold text-[#42634A] text-center bg-[#E7EEE7] py-1 rounded-lg">
                  Report generated successfully!
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
