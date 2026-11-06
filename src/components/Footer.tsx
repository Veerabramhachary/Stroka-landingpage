import React from 'react';
import { Shield } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuth }) => {
  return (
    <footer className="bg-[#FAF9F5] border-t border-[#E2DED4] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-2.5 text-[#252922]">
              <Logo size={24} />
              <span className="text-lg font-bold tracking-tight">STROKA</span>
            </a>
            <p className="text-xs sm:text-sm text-[#65685F] max-w-sm leading-relaxed">
              The expense, subscription, and tax management ledger for individuals and modern businesses in India. Partition personal living from corporate SaaS, tag 18% GST, and generate structured Tax Summaries.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#898A80] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#42634A]" />
              <span>Encrypted in transit & at rest · Zero ad telemetry</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#252922]">
              Ledger Platform
            </h4>
            <ul className="space-y-2 text-xs text-[#65685F]">
              <li>
                <a href="#ledgers" className="hover:text-[#667267] transition-colors">
                  Personal & Business Ledgers
                </a>
              </li>
              <li>
                <a href="#cockpit" className="hover:text-[#667267] transition-colors">
                  Interactive Cockpit
                </a>
              </li>
              <li>
                <a href="#tax-management" className="hover:text-[#667267] transition-colors">
                  Tax Summaries & Invoices
                </a>
              </li>
              <li>
                <a href="#history" className="hover:text-[#667267] transition-colors">
                  Billing History & Invoices
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#667267] transition-colors">
                  Pricing & Pro Upgrade
                </a>
              </li>
            </ul>
          </div>

          {/* Trust and Regional Notes */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#252922]">
              Compliance & Security
            </h4>
            <ul className="space-y-2 text-xs text-[#65685F]">
              <li>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="hover:text-[#667267] transition-colors text-left font-medium"
                >
                  Create Free Account
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#667267] transition-colors">
                  No Bank Login Required Policy
                </a>
              </li>
              <li>
                <span className="text-[#898A80]">
                  Accounting Standard: Indian Rupees (₹ INR)
                </span>
              </li>
              <li>
                <span className="text-[#898A80]">
                  Security: TLS 1.3 in Transit · AES-256 at Rest
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E2DED4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#898A80]">
          <div>
            © 2026 Stroka Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#252922] transition-colors">
              Privacy Policy
            </a>
            <a href="#pricing" className="hover:text-[#252922] transition-colors">
              Terms of Service
            </a>
            <a href="#tax-management" className="hover:text-[#252922] transition-colors">
              Tax & Invoicing Guidelines
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
