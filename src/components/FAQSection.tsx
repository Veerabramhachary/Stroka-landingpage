import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How do Personal and Business Ledgers work in Stroka?',
    answer:
      'Stroka allows you to partition personal living subscriptions (like Netflix, Spotify, gym memberships) from your corporate SaaS and business software (AWS, Google Workspace, GitHub). Each ledger tracks its own expense totals, renewal dates, and category analytics so personal and business finances never intermingle.',
  },
  {
    question: 'What is the Tax Summary report and how does it help with filing?',
    answer:
      'Stroka provides structured Tax Summaries for all your subscriptions and recurring business expenses. For every expense, you can document the applicable GST rate (e.g. 18%), log vendor GSTINs, and categorize HSN/SAC codes. You can generate comprehensive Tax Summaries covering up to 400 days per request and up to 20,000 tagged rows per summary for seamless reconciliation with your Chartered Accountant.',
  },
  {
    question: 'How is my financial data protected without "private vault" complexity?',
    answer:
      'We focus strictly on expense and subscription tracking without unnecessary gimmicks. Your financial records are encrypted during transit using TLS 1.3 and stored securely encrypted at rest with AES-256 standards. We never sell, share, or broker your transaction details to advertisers or third-party marketing networks.',
  },
  {
    question: 'Can I track everything in Indian Rupees (INR)?',
    answer:
      'Yes. Stroka is built specifically with native Indian Rupee (₹ INR) accounting. All expense entries, renewal calculations, GST percentages, and export summaries are rendered cleanly in INR with standard Indian numeric formatting.',
  },
  {
    question: 'How does Subscription History and past invoice archiving work?',
    answer:
      'Whenever a renewal occurs or you pay a bill, Stroka records it in your Billing History archive. You can store invoice numbers, payment methods (UPI AutoPay, NetBanking, Corporate Credit Card), and historical payment dates for comprehensive auditing.',
  },
  {
    question: 'Can I export my data for tax filing and CA reconciliation?',
    answer:
      'Yes! At any time, with one click, you can export your complete personal or business ledger as a structured CSV or PDF. Reports include invoice reference numbers, GST breakdowns, and HSN/SAC codes tailored for Indian GST and Income Tax filing.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#F4F1E9] border-t border-[#E2DED4] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-widest text-[#B18B58] mb-2">
            Questions & Answers
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#252922] mb-4">
            Frequently Asked Questions.
          </h2>
          <p className="text-base text-[#65685F] leading-relaxed font-normal">
            Everything you need to know about Stroka, Personal & Business ledgers, and GST management.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.question}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="rounded-2xl border border-[#E2DED4] bg-[#FFFFFF] shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9AA697]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-[#252922]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-[#FAF9F5] flex items-center justify-center shrink-0 transition-transform duration-200 border border-[#E2DED4] ${
                      isOpen
                        ? 'rotate-180 bg-[#EDEAE1] text-[#667267]'
                        : 'text-[#898A80]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-[#65685F] leading-relaxed border-t border-[#E2DED4] mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
